## 1. High‑Level Architecture

This project is a **single‑page application (SPA)** built with **React + Vite + TypeScript**, served as static assets.  
All business logic and state live in the browser, with **localStorage** as the persistence layer. There is **no separate backend server** and **no external database**.

At a high level:

- **Entry point:** `index.html` → `index.tsx` mounts React into `#root`.
- **Root component:** `App.tsx` wires:
  - **Providers:** `AuthProvider`, `DataProvider`, `CartProvider`.
  - **Routing:** React Router v6 (`BrowserRouter`, nested routes).
  - **Layouts:** `PublicLayout` (Navbar + CartSidebar + Footer around public pages), `AdminLayout` (sidebar + admin content).
- **State management:** Custom React Contexts:
  - `AuthContext` – authentication and roles (admin/client) with localStorage.
  - `DataContext` – all business data (services, products, gallery, formations, orders, users, messages).
  - `CartContext` – shopping cart with localStorage persistence.
- **UI:** Tailwind CSS for styling; component‑based layout (Navbar, Hero, Services, Gallery, Contact, etc.).
- **Persistence:** LocalStorage keys (`saney_*`, `cart`) for data, `saney_user` for auth.
- **Hosting:** Built output (`dist`) can be deployed to any static host (e.g., Cloudflare Pages).

There is an **admin panel** that behaves like a lightweight CMS on top of localStorage.

---

## 2. Tech Stack

### 2.1 Languages & Core Frameworks

- **Language:** TypeScript (strictly typed React code).
- **UI Framework:** React 19.
- **Build Tool:** Vite 6.
- **Routing:** React Router DOM v6.
- **Styling:** Tailwind CSS 3 + some custom classes in `index.css`.

### 2.2 Dependencies (from `package.json`)

- **Runtime dependencies**
  - `react`
  - `react-dom`
  - `react-router-dom`
  - `lucide-react` – icon library used across the UI (Navbar icons, admin icons, etc.).

- **Dev dependencies**
  - `vite`
  - `@vitejs/plugin-react`
  - `typescript`
  - `tailwindcss`
  - `postcss`
  - `autoprefixer`
  - `@types/react`, `@types/react-dom`, `@types/node`

### 2.3 Vite Configuration

File: `vite.config.ts`

- Uses `@vitejs/plugin-react`.
- Sets dev server:
  - `port: 3000`
  - `host: '0.0.0.0'`
- Defines alias:
  - `'@'` → project root (`path.resolve(__dirname, '.')`).

Vite output:
- **Build command:** `vite build` (via `npm run build`).
- **Output directory:** `dist` (default, not overridden).

---

## 3. Environments & Setup

### 3.1 Local Development Setup

1. **Install Node.js**
   - Recommended: Node 18+.

2. **Install dependencies**
   - From project root:
     - `npm install`

3. **Run dev server**
   - `npm run dev`
   - Vite will start on port 3000 or the next free port (e.g., 3001).

4. **Open in browser**
   - Visit the URL printed by Vite (e.g., `http://localhost:3000/` or `http://localhost:3001/`).

### 3.2 Build & Preview

- **Build for production**
  - `npm run build`
  - Outputs static assets to `dist/`.

- **Preview the production build locally**
  - `npm run preview`

### 3.3 Environment Variables

**Current state:**  
This project does **not** use environment variables.  
All configuration (brand identity, URLs, etc.) is in:
- `constants.ts`
- `index.html` (document title, favicon)
- `metadata.json` (name/description)

If you add environment variables later (e.g., for a real backend or payment keys), use the standard Vite pattern:
- `.env` files
- Access via `import.meta.env.VITE_SOME_KEY`

---

## 4. Data Flow & State

### 4.1 Core Contexts

1. **AuthContext (`context/AuthContext.tsx`)**
   - Responsible for:
     - `user: User | null`
     - `login(email, role)` – creates a mock user, stores in localStorage (`saney_user`).
     - `logout()` – clears user and removes from localStorage.
     - Derived flags:
       - `isAuthenticated`
       - `isAdmin`
   - Used by:
     - `Navbar` (login link, user icon).
     - `LoginPage` (mock login).
     - `ClientSpacePage` (requires authenticated client).
     - `AdminLayout` and admin pages (via `ProtectedRoute` with `requireAdmin`).

2. **DataContext (`context/DataContext.tsx`)**
   - Holds all business data arrays:
     - `services`, `products`, `galleryImages`, `formations`
     - `questionnaires`, `contactMessages`, `users`, `orders`
   - Initializes from:
     - LocalStorage keys: `saney_services`, `saney_products`, `saney_gallery`, `saney_formations`, `saney_questionnaires`, `saney_messages`, `saney_users_list`, `saney_orders`.
     - Fallback constants: `SERVICES`, `PRODUCTS`, `GALLERY_IMAGES`.
   - Exposes CRUD‑style functions:
     - `addService`, `updateService`, `deleteService`
     - `addProduct`, `updateProduct`, `deleteProduct`
     - `addGalleryImage`, `deleteGalleryImage`
     - `addFormation`, `updateFormation`, `deleteFormation`
     - `addQuestionnaireAnswer`
     - `addContactMessage`, `markMessageAsRead`
     - `addOrder`, `updateOrderStatus`
     - `addUser`, `deleteUser`
   - Persists any change back to localStorage via `useEffect`.
   - Used by:
     - Public pages (Services, Products, Gallery, Formations).
     - Contact form (Contact page).
     - Client space (orders, messages).
     - Admin pages for CRUD operations.

3. **CartContext (`context/CartContext.tsx`)**
   - Holds shopping cart state:
     - `items: CartItem[]`
     - `isCartOpen`, `setIsCartOpen`
     - Derived: `total`, `itemCount`
   - Persists `items` in localStorage under `cart`.
   - Functions:
     - `addToCart(product)`
     - `removeFromCart(productId)`
     - `updateQuantity(productId, quantity)`
     - `clearCart()`
   - Used by:
     - `ProductsPage` to add items.
     - `CartSidebar` to view and manage cart.

### 4.2 Routing & Access Control

- **Router:** In `App.tsx`:
  - Uses `BrowserRouter` with:
    - Public routes under `PublicLayout`:
      - `/`, `/about`, `/services`, `/gallery`, `/formations`, `/products`, `/contact`, legal pages.
    - `/login` – login toggle for admin/client.
    - Protected routes (`ProtectedRoute`):
      - `/client` → `ClientSpacePage` (requires any authenticated user).
      - `/admin` and nested admin routes (require `isAdmin`).

- **ProtectedRoute (`components/ProtectedRoute.tsx`)**
  - Checks `useAuth()`:
    - If `requireAdmin` and user is not admin → redirects to `/login`.
    - If not authenticated → redirects to `/login`.
  - Wraps routes requiring auth and/or admin.

### 4.3 UI/Data Flow Example

Example: **Creating an order**
1. User adds products in `ProductsPage` → `CartContext.addToCart`.
2. User opens cart (`CartSidebar`) and clicks “Commander”.
3. `CartSidebar` assembles an `Order` object and calls `addOrder` from `DataContext`.
4. `DataContext`:
   - Appends order to `orders` array.
   - Writes `orders` to `localStorage`.
5. Admin views orders in `AdminOrdersPage`:
   - Reads `orders` from `DataContext`.
   - Can update `status` → `updateOrderStatus`.
6. Client views personal orders in `ClientSpacePage`:
   - Filters `orders` by `userId` of authenticated user.

---

## 5. Deployment & Hosting Notes

### 5.1 Static Hosting

Because this is a Vite/React SPA without a backend, deployment is straightforward:

- Build with `npm run build`.
- Deploy the `dist/` directory to any static host.

Example: **Cloudflare Pages**
- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** project root

Ensure you configure SPA routing so that URLs like `/about` or `/admin/orders` are served by `index.html`:
- On Cloudflare Pages, enable “SPA” / “History API fallback” behavior in the project settings (or via `_redirects` when using compatible hosts).

---

## 6. How to Evolve the Architecture

### 6.1 Adding a Real Backend

When you’re ready to move beyond localStorage:
- Introduce a backend (Node/Express, NestJS, Laravel, Rails, etc.).
- Replace `DataContext` operations with API calls (REST or GraphQL).
- Migrate localStorage data to a real database.
- Keep the data model interfaces in `types.ts` as the shared contract between frontend and backend.

### 6.2 Adding Real Authentication

Currently:
- `AuthContext` uses mock login and localStorage only.

To integrate a real auth provider:
- Replace `login()` with calls to your auth API (JWT, OAuth, Supabase, Auth0, etc.).
- Store tokens securely (httpOnly cookies preferred).
- Derive `isAdmin` and user roles from backend claims.
- Update `ProtectedRoute` to check real auth statuses.

### 6.3 Adding Payment

Currently:
- No payment provider integrated.

To add one (Stripe/PayPal/etc.):
- See `04_Payment_Integration.md` for the conceptual wiring.
- Typical flow:
  - From `CartSidebar`, call backend `/create-checkout-session`.
  - Redirect to provider’s hosted payment page.
  - Use webhook to confirm payment and create/update `Order` records.

