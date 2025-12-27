This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

# Rick & Morty API Docs

Interactive documentation and explorer for the **Rick & Morty public API**, built with **Next.js (App Router)**.  
The application allows browsing characters, viewing detailed information, testing API endpoints, and generating **AI-powered summaries using Google Gemini**.

---

## Main Features

### 1. Character Explorer
- Paginated character list
- Search by character name
- Clean and responsive UI
- Try the APi section

### 2. Character Detail Page
- Full character information
- Origin, location, and episode count
- Raw API response viewer

### 3. AI Generated Summary
- Uses Google Gemini API (gemini-2.5-flash model)
- Generates a short, fun, in-universe summary for each character
- Triggered on demand (button-based)

### 4. Try the API Panel
- Test character fetching by ID
- Preview result and raw JSON response

### Server-first Architecture
- Uses Next.js Server Components
- URL-based state (`searchParams`) for pagination and search
- No unnecessary client-side state for data fetching

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom + shadcn/ui
- **API:** Rick & Morty Public API
- **AI Integration:** Google Gemini API
- **Deployment:** Vercel

This project uses Next.js with the App Router to leverage server-side rendering, clean routing, and scalable architecture. Tailwind CSS enables rapid, consistent UI development, while Google Gemini integration demonstrates secure, modern AI usage through server-side API routes.

---

## 📁 Project Structure

```txt
app/
├─ api/
│  └─ gemini/
│     └─ summary/
│        └─ route.ts        # Server API route for Gemini summaries
│
├─ character/
│  └─ [id]/
│     ├─ page.tsx           # Character detail page
│     └─ not-found.tsx
│
├─ page.tsx                 # Main dashboard (pagination + search)
├─ layout.tsx
├─ globals.css
│
components/
├─ characters/              # Character-related UI components
││  ├─ CharacterCard.tsx
││  ├─ CharacterDetails.tsx
││  ├─ AiSummary.tsx
││  ├─ Pagination.tsx
││  └─ TryItOutPanel.tsx
│
├─ layout/
│  ├─ AppHeader.tsx
│  └─ Container.tsx
│
lib/
├─ rickmorty/
│  ├─ client.ts             # Rick & Morty API client
│  └─ types.ts              # API TypeScript models
│
├─ gemini/
│  └─ prompt.ts             # Prompt helpers (not applied)

```

## Getting Started (Local Setup)
### 1. Character Explorer
  git clone https://github.com/NicoJRM/rickmorty-api-docs.git
  cd rickmorty-api-docs
  
### 2. Install dependencies (This project uses npm.)
  npm install

### 3. Environment Variables
  Create a .env.local file in the root of the project.
  You can use the provided env.example as a reference (GEMINI_API_KEY=):
  Add your own Google Gemini API Key (GEMINI_API_KEY=your_api_key_here):
  IMPORTANT: The deployed project will run without this key, but AI summaries will not work until it is configured in local.

### 4. Run the development server
  npm run dev
  Open http://localhost:3000


## Deployment
### a) The application has been deployed on Vercel.
https://rickmorty-api-docs-vercel.vercel.app/

### b) CodeSandbox.
https://codesandbox.io/p/github/NicoJRM/rickmorty-api-docs/main


## Questions

### 1. Lazy Loading & Partial Hydration
To scale under heavy traffic, I would mainly lazy-load and partially hydrate non-critical, interaction-heavy sections. A good example is the AI Summary and the Raw JSON viewer, those can render as static HTML first and only hydrate when the user interacts with the functionality. This feature reduces the initial JavaScript bundle, speeds up first paint of the interface, and keeps the dashboard and character details fast.

### 2. SSR vs SSG
I would use SSR for the dashboard with search and pagination because results depend on query parameters and should respond quickly to user input while remaining shareable via URL. For character detail pages, I would combine SSG with ISR, using pre-generate popular character pages and revalidate periodically. This solution improves performance and caching while still keeping content reasonably fresh.


