## Overview

This project is a single-page application for **Maison Saney**, a premium nail salon in Béziers.  
It provides:
- A public marketing site (home, services, gallery, formations, products, contact, legal).
- A client space for viewing orders and messages.
- An admin panel for managing services, products, formations, gallery, orders, messages, and users.

The stack is **React 19 + Vite + TypeScript + Tailwind CSS**, with all data stored in **localStorage** and managed via React Contexts. There is **no separate backend server or external database**; all “backend” logic lives in the frontend.

Use this documentation as a blueprint to:
- Understand the current implementation end‑to‑end.
- Safely modify or extend features.
- Rebuild the same architecture for another business (white‑label).

---

## Documentation Files & How to Use Them

### 1. 00_Doc_Index.md (this file)
- **Purpose:** Entry point for the documentation.
- **Contents:**
  - Short description of the project.
  - Directory of all other docs with guidance on when to read which file.
- **When to read:** First contact with the codebase; share this with any new developer or AI agent.

### 2. 01_Architecture_Overview.md
- **Purpose:** High‑level system view.
- **Contents:**
  - Overall architecture (React SPA, contexts, routing, data flow).
  - Full tech stack (languages, tools, libraries, versions).
  - Environment setup and build commands.
  - Notes on deployment (e.g., Vite output, Cloudflare Pages).
- **When to read:** Before any major refactor or migration (e.g., moving to a real backend, switching hosting).

### 3. 02_Frontend_Structure.md
- **Purpose:** Detailed guide to the frontend implementation.
- **Contents:**
  - Folder structure and responsibilities.
  - Routing strategy using React Router.
  - State management via `AuthContext`, `DataContext`, `CartContext`.
  - Styling with Tailwind and how brand design is encoded.
  - Core components and how they interact (Navbar, Hero, CartSidebar, AdminLayout, etc.).
  - Step‑by‑step guidance for adding, modifying, or deleting UI components and pages.
- **When to read:** For any UI work, navigation updates, or design system changes.

### 4. 03_Backend_and_Data.md
- **Purpose:** Explain the “backend‑like” logic that lives in the frontend.
- **Contents:**
  - Explanation that there is **no real backend server**; all logic runs in the browser.
  - Data model definitions (`types.ts`) and their relationships.
  - How `DataContext` uses localStorage as a persistence layer.
  - “API‑like” operations: CRUD functions for services, products, formations, gallery, orders, users, contact messages, questionnaires.
  - Authentication and authorization flows: `AuthContext`, `ProtectedRoute`, and role‑based access.
  - How to add or modify data operations in a safe, consistent way.
- **When to read:** When changing data structures, adding new entity types, or preparing to plug in a real backend or database.

### 5. 04_Payment_Integration.md
- **Purpose:** Document payment behavior if/when it exists.
- **Current state:** There is **no payment gateway integration** in this project. Orders are created and managed entirely on the client side, with no card capture or external payment API calls.
- **Contents:**
  - Current non‑payment “checkout” behavior.
  - Placeholder sections describing how to add a payment provider (Stripe/PayPal/other) in the future.
  - Guidance on where to hook payment flows into the existing cart and order logic.
- **When to read:** If you plan to integrate a real payment system or need to confirm that none currently exists.

### 6. 05_Rebuild_Template.md
- **Purpose:** White‑label blueprint to clone this architecture for any other business.
- **Contents:**
  - Fill‑in‑the‑blank variables for:
    - Business identity (name, domain, addresses, emails).
    - Brand assets (logo, images, brand colors).
    - Content constants (services, products, testimonials, gallery, legal texts).
  - Checklist of all places to swap values (constants, metadata, favicon, etc.).
  - Step‑by‑step process for spinning up a new project from scratch using this repo as a template.
- **When to read:** When adapting this project to a new brand (e.g., hair salon, spa, barbershop) or migrating it to a new domain.

---

## Recommended Reading Order

1. **01_Architecture_Overview.md** – understand the overall system and stack.
2. **02_Frontend_Structure.md** – learn how pages, components, and contexts are wired together.
3. **03_Backend_and_Data.md** – understand how data is modeled and persisted.
4. **04_Payment_Integration.md** – only if you intend to add real payments.
5. **05_Rebuild_Template.md** – when you are ready to clone or white‑label the project.

Use this index as your navigation map. Every file is intentionally self‑contained but cross‑referenced, so you can jump directly to what you need.

