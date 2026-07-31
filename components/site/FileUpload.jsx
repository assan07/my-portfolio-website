'use client'

import { useRef, useState } from 'react'
import { UploadCloud, Loader2, X, FileText, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const IMAGE_MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const FILE_MAX_SIZE = 10 * 1024 * 1024 // 10 MB

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const ALLOWED_FILE_TYPES = ['application/pdf']

/**
 * Extract the storage object path from a Supabase public URL.
 * Example: https://<proj>.supabase.co/storage/v1/object/public/<bucket>/<path>
 */
function extractStoragePath(url, bucket) {
  if (!url || typeof url !== 'string') return null
  const marker = `/storage/v1/object/public/${bucket}/`
  const i = url.indexOf(marker)
  if (i === -1) return null
  return decodeURIComponent(url.slice(i + marker.length).split('?')[0])
}

/**
 * Client-side resize + re-encode for images. Skips if the file isn't an image
 * or if optimization is disabled. Returns a File (JPEG or WebP) or the original.
 */
async function optimizeImage(
  file,
  { maxWidth = 1600, maxHeight = 1600, quality = 0.85, mime = 'image/jpeg' } = {}
) {
  if (!file || !file.type || !file.type.startsWith('image/')) return file
  if (file.type === 'image/gif' || file.type === 'image/svg+xml') return file

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

  const img = await new Promise((resolve, reject) => {
    const el = new window.Image()
    el.onload = () => resolve(el)
    el.onerror = reject
    el.src = dataUrl
  })

  let { width, height } = img
  const scale = Math.min(1, maxWidth / width, maxHeight / height)
  width = Math.round(width * scale)
  height = Math.round(height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  // Better downscaling quality
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(img, 0, 0, width, height)

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, mime, quality))
  if (!blob) return file
  // Only replace if smaller
  if (blob.size >= file.size && scale === 1) return file

  const ext = mime === 'image/webp' ? 'webp' : 'jpg'
  const baseName = (file.name || 'image').replace(/\.[^.]+$/, '')
  return new File([blob], `${baseName}.${ext}`, { type: mime })
}

/**
 * FileUpload — drag & drop uploader to a public Supabase Storage bucket.
 * Automatically:
 *   • Client-side resizes images to sensible dimensions before upload
 *   • Deletes the previous file when it's replaced by a new upload
 */
export function FileUpload({
  name,
  bucket,
  accept = 'image/*',
  defaultValue = '',
  kind = 'image',
  label,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.85,
}) {
  const supabase = createClient()
  const inputRef = useRef(null)
  const [url, setUrl] = useState(defaultValue || '')
  const [busy, setBusy] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  async function deletePrevious(previousUrl) {
    const path = extractStoragePath(previousUrl, bucket)
    if (!path) return
    try {
      await supabase.storage.from(bucket).remove([path])
    } catch (e) {
      // Non-fatal — just log
      console.warn('Failed to remove old file:', e?.message)
    }
  }

  const upload = async (rawFile) => {
    if (!rawFile) return

    const allowedTypes = kind === 'image' ? ALLOWED_IMAGE_TYPES : ALLOWED_FILE_TYPES

    if (!allowedTypes.includes(rawFile.type)) {
      toast.error(
        kind === 'image'
          ? 'Only JPG, PNG, and WebP images are allowed.'
          : 'Only PDF files are allowed.'
      )
      return
    }

    const maxSize = kind === 'image' ? IMAGE_MAX_SIZE : FILE_MAX_SIZE

    if (rawFile.size > maxSize) {
      toast.error(
        kind === 'image' ? 'Image size must not exceed 5 MB.' : 'File size must not exceed 10 MB.'
      )
      return
    }

    setBusy(true)
    const previousUrl = url

    try {
      // 1) Optimize (images only)
      const file =
        kind === 'image'
          ? await optimizeImage(rawFile, {
              maxWidth,
              maxHeight,
              quality,
            })
          : rawFile

      // 2) Upload new file
      const ext = (file.name.split('.').pop() || 'bin').toLowerCase()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

      const { error } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: '31536000',
        upsert: false,
        contentType: file.type || undefined,
      })

      if (error) throw error

      const { data } = supabase.storage.from(bucket).getPublicUrl(path)

      setUrl(data.publicUrl)

      if (previousUrl) {
        await deletePrevious(previousUrl)
      }

      const sizeKB = Math.round(file.size / 1024)

      toast.success(
        kind === 'image' ? `Uploaded (optimized, ${sizeKB} KB)` : `Uploaded (${sizeKB} KB)`
      )
    } catch (e) {
      toast.error(e.message || 'Upload failed. Make sure the bucket exists and is public.')
    } finally {
      setBusy(false)
    }
  }

  function onDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) upload(file)
  }

  const isImage = kind === 'image' && url

  return (
    <div className="space-y-2">
      {label && <div className="text-sm font-medium">{label}</div>}
      <input type="hidden" name={name} value={url} />
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors',
          dragOver ? 'border-primary bg-primary/5' : 'border-border bg-muted/30 hover:bg-muted/60'
        )}
      >
        {busy ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              {kind === 'image' ? 'Optimizing & uploading...' : 'Uploading...'}
            </div>
          </>
        ) : isImage ? (
          <div className="relative h-32 w-full flex items-center justify-center">
            <Image src={url} alt="preview" fill className="object-contain rounded-md" unoptimized />
          </div>
        ) : url ? (
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-primary" />
            <a
              href={url}
              target="_blank"
              rel="noopener"
              onClick={(e) => e.stopPropagation()}
              className="underline truncate max-w-[280px]"
            >
              {url.split('/').pop()}
            </a>
          </div>
        ) : (
          <>
            {kind === 'image' ? (
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            ) : (
              <UploadCloud className="h-6 w-6 text-muted-foreground" />
            )}
            <div className="text-sm">
              <span className="font-medium text-primary">Click to upload</span>{' '}
              <span className="text-muted-foreground">or drag &amp; drop</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Bucket: {bucket}
              {kind === 'image' ? ` · max ${maxWidth}×${maxHeight}` : ''}
            </div>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => upload(e.target.files?.[0])}
        />
      </div>
      {url && !busy && (
        <div className="flex items-center justify-between gap-2">
          <div className="text-xs text-muted-foreground truncate">{url}</div>
          <button
            type="button"
            onClick={async () => {
              const prev = url
              setUrl('')
              // Also delete the underlying storage object when user explicitly clears.
              await deletePrevious(prev)
            }}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        </div>
      )}
    </div>
  )
}
