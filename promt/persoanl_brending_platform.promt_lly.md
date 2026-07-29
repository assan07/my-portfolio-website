# 🌸 Personal Branding Website

Build a modern, elegant, and professional personal branding website that represents my profile as an **Informatics Engineering graduate** with interests in **Data Analysis, Bioinformatics, and Information Technology**.

The website should be lightweight, responsive, scalable, and easy to maintain. Focus on simplicity, readability, and professionalism while allowing future expansion.

The goal is to create a memorable online presence for recruiters, companies, collaborators, and academic professionals.

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
- Prioritize reusable and maintainable components.

---

# Project Structure

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

Organize code using clean architecture and reusable components.

---

# Design Direction

Create a premium, minimalist, elegant, and trustworthy design inspired by modern SaaS products.

Inspired by:

- Apple
- Vercel
- Linear
- Stripe
- Framer
- Notion

Design Principles:

- Spacious whitespace
- Rounded corners (12–20px)
- Soft shadows
- Elegant cards
- Clean grids
- Consistent spacing
- Premium typography
- Mobile-first responsive design
- Warm and welcoming visual appearance
- Smooth and subtle animations only

Avoid:

- Hacker themes
- Cyberpunk
- Neon colors
- Gaming aesthetics
- Heavy gradients
- Glassmorphism overload
- Excessive animations

The design should feel feminine through color and typography—not through decorative elements.

---

# Theme

Support:

- Light Mode
- Dark Mode
- System Mode

Persist the selected theme using next-themes.

---

# Color Palette

## Light Theme

Background

```
#FAF7F5
```

Surface

```
#FFFFFF
```

Primary

```
#C97C8A
```

Primary Hover

```
#B86475
```

Secondary

```
#6B8E7A
```

Accent

```
#E8CFC5
```

Text

```
#2D2D2D
```

Border

```
#E8E4E1
```

Muted Text

```
#6B7280
```

---

## Dark Theme

Background

```
#18181B
```

Surface

```
#27272A
```

Primary

```
#D89AA5
```

Secondary

```
#8DB49B
```

Accent

```
#3B2F33
```

Text

```
#FAFAFA
```

Border

```
#3F3F46
```

Muted Text

```
#A1A1AA
```

---

# Typography

Primary Font

- Poppins

Optional Heading Font

- Playfair Display

Typography should be modern, elegant, and easy to read.

---

# Website Structure

Create these pages:

- Home
- Projects
- Resume
- Contact
- 404

Navigation should remain simple and intuitive.

---

# Home Page

## Hero Section

Include:

- Professional profile photo
- Greeting
- Name
- Professional title
- Short personal introduction

Example:

> Hi, I'm **Lolly** 👋  
> Informatics Engineering Graduate passionate about **Data Analysis**, **Bioinformatics**, and **Information Technology**.

Primary CTA

- View Projects

Secondary CTA

- Download Resume

Outline CTA

- Contact Me

Add subtle entrance animations.

---

## About Me

Brief professional summary highlighting:

- Educational background
- Career interests
- Professional values
- Current career objective

Keep it concise (2–3 paragraphs).

---

## Skills

Display categorized skill cards.

### Data & Bioinformatics

- Data Analysis
- Bioinformatics
- Cytoscape
- STRING Database
- MCL Algorithm
- Data Visualization

### Programming

- Java
- PHP
- JavaScript
- TypeScript
- SQL

### Tools

- Git
- GitHub
- VS Code
- Microsoft Office
- Figma

### Soft Skills

- Leadership
- Communication
- Teamwork
- Critical Thinking
- Problem Solving
- Time Management

Use badges or clean cards.

---

## Experience

Display experience in a vertical timeline.

Include:

- Work Experience
- Internship (future-ready)
- Organization Experience

---

## Education

Display:

- University
- Degree
- Major
- Study Period

---

## Certifications

Display certificate cards.

Each card includes:

- Image
- Title
- Issuer
- Year

Show only the latest or featured certificates.

---

## Featured Projects

Show only selected projects.

One of the featured projects should be:

**Research Project**

"Studi Bioinformatika Target Protein Senyawa Kelor terhadap Stunting Melalui Analisis Clustering MCL"

Display a small badge:

Research

Each project card includes:

- Thumbnail
- Title
- Short Description
- Technologies
- GitHub
- Live Demo (optional)

Provide a button:

View All Projects

---

## Contact CTA

Simple section encouraging visitors to connect.

Example:

"Interested in working together or discussing a project?"

Button:

Contact Me

---

## Footer

Include:

- Copyright
- GitHub
- LinkedIn
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
- Featured Badge

Support filtering by technology.

Support searching projects.

Use responsive cards.

---

# Resume Page

Display:

- Professional Summary
- Experience
- Education
- Skills
- Certifications

Provide:

Download Resume PDF

Resume should be dynamically generated from database content where possible.

---

# Contact Page

Display:

- Email
- LinkedIn
- GitHub

Include a clean contact form.

Fields:

- Name
- Email
- Subject
- Message

Store submitted messages in Supabase.

Display success notifications after submission.

---

# Admin Dashboard

Accessible ONLY from:

```
/admin
```

Never expose an Admin button publicly.

Authentication:

- Supabase Authentication
- Protected Routes
- Middleware

---

# Admin Features

Modules:

- Dashboard
- Profile
- Projects
- Resume
- Messages

Support full CRUD.

Dashboard Statistics:

- Total Projects
- Featured Projects
- Total Messages

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

Each table contains:

- id (UUID)
- created_at
- updated_at

Use UUID as primary keys.

---

# File Storage

Use Supabase Storage.

Support:

- Profile Photo
- Project Images
- Certificate Images
- Resume PDF

---

# Security

Implement:

- Supabase Authentication
- Row Level Security (RLS)
- Protected Admin Routes
- Middleware

Permissions

Public Users

- Read published content only

Administrator

- Full CRUD access

---

# SEO

Implement:

- Metadata API
- Open Graph
- robots.txt
- sitemap.xml

Use:

- Semantic HTML
- Clean URLs
- Proper heading hierarchy
- Optimized metadata

---

# Performance

Target Lighthouse Score

- Performance > 95
- Accessibility > 95
- Best Practices > 95
- SEO > 95

Optimize using:

- next/image
- next/font
- Lazy Loading
- Dynamic Imports
- Optimized assets

---

# Coding Standards

Requirements:

- Strict TypeScript
- Clean Architecture
- Reusable Components
- Mobile First
- Accessible UI
- Responsive Layout
- Maintainable Code
- Consistent Naming Convention
- Avoid duplicated code

Prefer:

- Server Components
- Server Actions
- Composition over duplication

---

# Nice-to-Have Features

Implement if appropriate without overcomplicating the project:

- Dark Mode Toggle
- Scroll Progress Indicator
- Smooth Scroll
- Back-to-Top Button
- Skeleton Loading
- Empty States
- Toast Notifications
- Copy Email Button
- Animated Statistics
- Social Media Icons
- Favicon
- Custom 404 Page

---

# Final Goal

Build a fast, elegant, responsive, and professional personal branding website that reflects the identity of an **Informatics Engineering graduate** with interests in **Data Analysis**, **Bioinformatics**, and **Information Technology**.

The website should feel warm, modern, trustworthy, and timeless while remaining lightweight and easy to maintain.

It must:

- Be fully responsive.
- Be SEO-friendly.
- Be secure.
- Achieve Lighthouse scores above 95.
- Use a clean and scalable architecture.
- Be deployable on Vercel.
- Store data using Supabase.
- Be manageable through a hidden Admin Dashboard.

The final result should resemble a premium SaaS website while maintaining a unique personal identity suitable for recruiters, companies, and future career growth.
