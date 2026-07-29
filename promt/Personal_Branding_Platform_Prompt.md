# Personal Branding Website

Build a modern, clean, and professional personal branding website that showcases my profile, projects, experience, and technical skills. The website should be lightweight, responsive, scalable, and easy to maintain. Design it with future expansion in mind while implementing only the essential features.

The goal is to create a professional online presence for recruiters, clients, and collaborators.

---

# Tech Stack

Use the following technologies:

- Next.js 15 (App Router)
- React 19
- TypeScript (Strict Mode)
- Tailwind CSS
- shadcn/ui
- Lucide React
- Framer Motion (subtle animations only)
- Supabase PostgreSQL
- Supabase Authentication
- Supabase Storage
- next-themes

Deployment:

- Vercel

Guidelines:

- Do not use Express, Fastify, or any custom backend.
- Use Server Actions whenever appropriate.
- Follow modern Next.js best practices.

---

# Project Structure

Organize the project with a clean and scalable architecture.

```

app/
components/
components/ui/
lib/
hooks/
types/
utils/
supabase/
public/
middleware.ts

```

Write maintainable, modular, and reusable code.

---

# Design Direction

Create a premium, minimalist, and trustworthy design inspired by modern SaaS products.

Design principles:

- Clean layout
- Spacious whitespace
- Rounded corners
- Soft shadows
- Smooth and subtle animations
- Consistent spacing
- Professional typography
- Mobile-first responsive design

Avoid:

- Hacker themes
- Cyberpunk
- Neon colors
- Gaming aesthetics
- Excessive animations

---

# Theme

Support:

- Light Mode
- Dark Mode
- System Mode

Persist the selected theme using next-themes.

---

# Color Palette

Primary

- #2563EB

Primary Hover

- #1D4ED8

Secondary

- #60A5FA

Light Theme

- Background: #F8FAFC
- Surface: #FFFFFF
- Text: #0F172A

Dark Theme

- Background: #0F172A
- Surface: #1E293B
- Text: #F8FAFC

Font:

- Poppins

---

# Website Structure

Create the following pages:

- Home
- Projects
- Resume
- Contact
- 404

Keep navigation simple and intuitive.

---

# Home Page

The Home page should contain these sections:

## Hero

Include:

- Professional introduction
- Short tagline
- Profile photo
- CTA buttons:
  - View Projects
  - Download Resume
  - Contact Me

---

## About

Brief professional summary.

---

## Skills

Display technical skills using clean cards or badges.

Example:

- Front-End
- Back-End
- Mobile Development
- Database
- Tools

---

## Experience

Display work experience in a simple vertical timeline.

---

## Education

Display education history.

---

## Certifications

Display certificates in card format.

---

## Featured Projects

Show only featured projects.

Each card includes:

- Thumbnail
- Title
- Short description
- Technologies
- GitHub link
- Live Demo (optional)

Provide a button to view all projects.

---

## Contact CTA

Simple section encouraging visitors to get in touch.

---

## Footer

Include:

- Copyright
- Social Links
- Email

---

# Projects Page

Display all projects.

Each project contains:

- Title
- Description
- Thumbnail
- Technologies
- GitHub URL
- Live Demo URL (optional)
- Featured

Use responsive cards with filtering by technology.

---

# Resume Page

Display:

- Experience
- Education
- Skills
- Certifications

Provide a button to download the latest Resume PDF stored in Supabase Storage.

---

# Contact Page

Display:

- Email
- LinkedIn
- GitHub

Include a simple contact form.

Store submitted messages in Supabase.

---

# Admin Dashboard

The Admin Dashboard must only be accessible through:

```

/admin

```

Never expose an Admin button on the public website.

Authentication:

- Supabase Authentication
- Protected Routes
- Middleware

---

# Admin Features

Create a clean dashboard with these modules:

- Dashboard
- Profile
- Projects
- Resume
- Messages

Each module should support Create, Read, Update, and Delete (CRUD).

Dashboard should display simple statistics:

- Total Projects
- Total Messages
- Featured Projects

---

# Database

Use Supabase PostgreSQL.

Suggested tables:

- profiles
- projects
- experiences
- education
- certifications
- skills
- messages

Each table should contain:

- id
- created_at
- updated_at

Use UUID as primary keys.

---

# File Storage

Use Supabase Storage for:

- Profile Photo
- Project Images
- Resume PDF

---

# Security

Implement:

- Supabase Authentication
- Row Level Security (RLS)
- Protected Admin Routes
- Middleware

Permissions:

Public Users

- Read public content only

Administrator

- Full CRUD access

---

# SEO

Implement:

- Metadata API
- Open Graph
- robots.txt
- sitemap.xml

Use semantic HTML and clean URLs.

---

# Performance

Target Lighthouse scores:

- Performance > 95
- Accessibility > 95
- Best Practices > 95
- SEO > 95

Use:

- next/image
- next/font
- Lazy Loading
- Dynamic Imports where appropriate

---

# Coding Standards

Follow clean code principles.

Requirements:

- Reusable components
- Type-safe code
- Strict TypeScript
- Consistent folder structure
- Responsive design
- Accessible UI
- Maintainable architecture

---

# Final Goal

My name is Achmad Hasanudin

Build a fast, elegant, and professional personal branding website that represents my professional profile. The website should be responsive, secure, SEO-friendly, easy to maintain, and manageable through a hidden admin dashboard. The architecture should be scalable for future features without introducing unnecessary complexity.