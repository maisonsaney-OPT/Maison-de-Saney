## 1. Frontend Framework & Entry Points

### 1.1 Framework

- **React 19** with **TypeScript**.
- **Vite** as the dev server and bundler.
- **React Router DOM v6** for routing.
- **Tailwind CSS** for styling and layout.
- **Lucide React** for icons.

### 1.2 Entry Files

- `index.html`
  - Root HTML document.
  - Sets `lang="fr"` and page `<title>` for SEO.
  - Contains a `<div id="root"></div>` where React mounts.

- `index.tsx`
  - Imports global CSS (`index.css`).
  - Renders `<App />` into `#root` using `ReactDOM.createRoot`.

- `App.tsx`
  - Wraps the entire app with:
    - `<AuthProvider>`
    - `<DataProvider>`
    - `<CartProvider>`
  - Creates the router using `BrowserRouter`.
  - Defines all routes and layout composition.

---

## 2. Folder Structure (Frontend)

From project root:

- `components/`
  - Reusable UI blocks and layout components.
  - Examples:
    - `Navbar.tsx` – top navigation, logo, cart icon, auth links.
    - `Footer.tsx` – site footer with links and contact info.
    - `Hero.tsx` – home hero section with main branding.
    - `Services.tsx` – home services teaser.
    - `Gallery.tsx` – preview gallery section.
    - `Contact.tsx` – contact section for the home page.
    - `CartSidebar.tsx` – slide‑in cart and checkout button.
    - `ProtectedRoute.tsx` – guards routes based on auth.

- `pages/`
  - **Public pages:**
    - `HomePage.tsx`
    - `AboutPage.tsx`
    - `ServicesPage.tsx`
    - `GalleryPage.tsx`
    - `FormationsPage.tsx`
    - `ProductsPage.tsx`
    - `ContactPage.tsx`
    - `ClientSpacePage.tsx`
    - `LoginPage.tsx`
  - **Admin pages (`pages/admin/`):**
    - `AdminLayout.tsx`
    - `AdminDashboard.tsx`
    - `AdminServicesPage.tsx`
    - `AdminProductsPage.tsx`
    - `AdminOrdersPage.tsx`
    - `AdminFormationsPage.tsx`
    - `AdminGalleryPage.tsx`
    - `AdminMessagesPage.tsx`
    - `AdminUsersPage.tsx`
  - **Legal pages (`pages/legal/`):**
    - `LegalMentions.tsx`
    - `TermsOfSale.tsx`
    - `PrivacyPolicy.tsx`

- `context/`
  - `AuthContext.tsx` – authentication and roles.
  - `DataContext.tsx` – domain data and CRUD operations.
  - `CartContext.tsx` – shopping cart behavior.

- `src/`
  - Static images:
    - `logo.jpeg` – main logo.
    - Salon and vitrine pictures.
    - 4‑image collages for gallery/hero.

- Root TypeScript & config:
  - `types.ts` – shared TypeScript interfaces.
  - `constants.ts` – brand constants, navigation links, seed data.
  - `index.css` – Tailwind base imports + custom utility classes.
  - `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`, `vite.config.ts`.

---

## 3. Routing Strategy

### 3.1 Router Definition (`App.tsx`)

- Uses `BrowserRouter` with nested `Routes`.
- Defines `PublicLayout`:
  - Contains `<Navbar />`, `<CartSidebar />`, `<Footer />`.
  - Wraps main public routes using `<Outlet />`.

Public routes under `PublicLayout`:
- `/` → `HomePage`
- `/about` → `AboutPage`
- `/services` → `ServicesPage`
- `/gallery` → `GalleryPage`
- `/formations` → `FormationsPage`
- `/products` → `ProductsPage`
- `/contact` → `ContactPage`
- `/mentions-legales` → `LegalMentions`
- `/cgv` → `TermsOfSale`
- `/politique-confidentialite` → `PrivacyPolicy`

Auth routes:
- `/login` → `LoginPage`
- `/client` → `ClientSpacePage` (wrapped by `ProtectedRoute`).

Admin routes:
- `/admin` → `AdminLayout` (wrapped by `ProtectedRoute requireAdmin={true}`).
  - Nested:
    - `/admin` (index) → `AdminDashboard`
    - `/admin/orders` → `AdminOrdersPage`
    - `/admin/services` → `AdminServicesPage`
    - `/admin/products` → `AdminProductsPage`
    - `/admin/formations` → `AdminFormationsPage`
    - `/admin/gallery` → `AdminGalleryPage`
    - `/admin/messages` → `AdminMessagesPage`
    - `/admin/users` → `AdminUsersPage`

Fallback:
- `*` → `HomePage`

### 3.2 Route Guards (`ProtectedRoute.tsx`)

- Reads auth state from `useAuth()`.
- Props:
  - `requireAdmin?: boolean`
- Behavior:
  - If not authenticated → redirects to `/login`.
  - If `requireAdmin` and user is not admin → redirects to `/login`.
  - Otherwise renders `<Outlet />` for nested routes.

---

## 4. State Management

### 4.1 AuthContext

- Tracks `user` and role (`admin` or `client`).
- Methods:
  - `login(email, role)` – mock login:
    - Creates `User` object with random id.
    - Derives display name from role.
    - Saves to localStorage (`saney_user`).
  - `logout()` – clears user and localStorage.
- Derived booleans:
  - `isAuthenticated` – true if `user` is set.
  - `isAdmin` – true if `user.role === 'admin'`.

Usage:
- `LoginPage` – to log in as admin/client using test emails.
- `Navbar` – shows different menu items based on auth.
- `ProtectedRoute` – gating `/client` and `/admin/*`.
- `ClientSpacePage`, `AdminLayout` – to access user info and enforce roles.

### 4.2 DataContext

Data shapes are defined in `types.ts`:
- `ServiceItem`, `Product`, `GalleryImage`, `Formation`,
  `QuestionnaireAnswer`, `ContactMessage`, `User`, `Order`.

Initialization:
- Reads localStorage keys (`saney_services`, etc.).
- Falls back to static data in `constants.ts`:
  - `SERVICES`
  - `PRODUCTS`
  - `GALLERY_IMAGES`

CRUD operations:
- Services:
  - `addService`, `updateService`, `deleteService`
- Products:
  - `addProduct`, `updateProduct`, `deleteProduct`
- Gallery:
  - `addGalleryImage`, `deleteGalleryImage`
- Formations:
  - `addFormation`, `updateFormation`, `deleteFormation`
- Questionnaires:
  - `addQuestionnaireAnswer`
- Messages:
  - `addContactMessage`, `markMessageAsRead`
- Orders:
  - `addOrder`, `updateOrderStatus`
- Users:
  - `addUser`, `deleteUser`

Persistence:
- Each state slice has a `useEffect` that:
  - `localStorage.setItem(key, JSON.stringify(value))` when the value changes.

Usage:
- Public pages read from `useData()` to display services, products, gallery, etc.
- Contact and formations forms call `addContactMessage`, `addQuestionnaireAnswer`.
- Cart checkout and client/admin spaces use `addOrder`, `updateOrderStatus`.
- Admin pages are the primary consumers for CRUD operations.

### 4.3 CartContext

Responsible for:
- `items: CartItem[]`
- `isCartOpen: boolean`
- `total: number`
- `itemCount: number`

Initialization:
- Reads localStorage `cart` on first render.

Behavior:
- `addToCart(product)`:
  - Increments quantity if item exists.
  - Adds new item otherwise.
  - Automatically opens the cart sidebar.
- `removeFromCart(productId)`:
  - Removes item from list.
- `updateQuantity(productId, quantity)`:
  - Updates quantity (if `quantity >= 1`).
- `clearCart()`:
  - Empties cart.

Usage:
- `ProductsPage` adds products via `addToCart`.
- `CartSidebar` reads items, total, itemCount and calls cart methods.

---

## 5. Styling Approach

### 5.1 Tailwind Setup

- `index.css` imports Tailwind base, components, utilities and defines custom CSS classes (e.g., fonts, background gradients, brand colors).
- `tailwind.config.js`:
  - Configures content paths (e.g., `./index.html`, `./**/*.{ts,tsx}`).
  - Extends theme with custom colors:
    - e.g., `saney-dark`, `saney-gold` for brand identity.

### 5.2 Component Styling

- All components use Tailwind utility classes:
  - Layout: `flex`, `grid`, `mx-auto`, `max-w-7xl`, `space-y-*`, `gap-*`.
  - Typography: `font-serif`, `text-xl`, `tracking-widest`, etc.
  - Effects: `shadow-lg`, `hover:bg-*`, `transition`, `rounded-xl`, etc.

Brand visuals:
- Images imported from `src/` (salon pictures, vitrine, collages).
- Logo imported from `src/logo.jpeg` via `constants.ts` → `BRAND_LOGO`.

---

## 6. Core Components & Their Interactions

### 6.1 Layout Components

- **Navbar**
  - Uses `NAV_LINKS` from `constants.ts`.
  - Shows brand logo (`BRAND_LOGO`) and name (`APP_NAME`).
  - Contains links to main routes and the cart toggle.
  - May show login/logout / client space link based on `useAuth()`.

- **Footer**
  - Displays contact info, social links, and legal links.
  - Uses constants such as address, opening hours, social handles.

- **PublicLayout** (defined inside `App.tsx`)
  - Wraps public routes with:
    - `<Navbar />`
    - `<CartSidebar />`
    - `<Footer />`
  - Uses `<Outlet />` to render the active page between Navbar and Footer.

- **AdminLayout**
  - Used under `/admin`.
  - Provides sidebar navigation for all admin subpages.
  - Uses `<Outlet />` to display each admin page.

### 6.2 Feature Components

- **Hero**
  - Used on `HomePage`.
  - Displays main marketing message, brand name (`APP_NAME`), and call‑to‑action buttons.

- **Services (home section)**
  - Shows a subset of `SERVICES` from `constants.ts` or from `useData()`.
  - Links to `/services`.

- **Gallery (home section)**
  - Displays a curated subset of gallery images.
  - Links to `/gallery`.

- **Contact (home section)**
  - Contact info + small form or CTA to `ContactPage`.

- **CartSidebar**
  - Displays cart items from `useCart()`.
  - Shows total and checkout button.
  - On “Commander”, interacts with `DataContext` (orders) and maybe `AuthContext` to associate orders with the logged‑in user.

---

## 7. Adding / Modifying / Deleting UI Components

### 7.1 Adding a New Component

**Example: Add a “Team” section as a component and route.**

1. **Define the component**
   - Create a file in `components/`, e.g. `Team.tsx`.
   - Export a React component:
     - Use Tailwind classes for styling.
     - Optionally read data from `constants.ts` or `useData()`.

2. **Use the component in a page**
   - Option A: Embed into an existing page:
     - Import `Team` in `HomePage.tsx` and render it where appropriate.
   - Option B: Create a dedicated page:
     - Create `pages/TeamPage.tsx` that composes `Team`.

3. **Add a route (if needed)**
   - In `App.tsx`, import `TeamPage` and add:
     - `<Route path="/team" element={<TeamPage />} />` under `PublicLayout`.

4. **Add navigation**
   - Update `NAV_LINKS` in `constants.ts` to include:
     - `{ label: 'Equipe', href: '/team' }`.
   - Navbar will automatically render it.

5. **Verify styling and behavior**
   - Run `npm run dev` and navigate to `/team`.

### 7.2 Deleting a Component

1. **Remove usages**
   - Search for imports and usage of the component.
   - Remove from pages, layouts, and routes.

2. **Remove exports and navigation**
   - If it is a route:
     - Remove its `<Route>` from `App.tsx`.
     - Remove its link from `NAV_LINKS` in `constants.ts`.

3. **Delete the file**
   - Delete the component file from `components/` or `pages/`.

4. **Run dev server**
   - Confirm there are no TypeScript or runtime errors.

### 7.3 Modifying a Component Safely

When editing any component:

1. **Check its props and data sources**
   - Does it receive props from a parent?
   - Does it rely on contexts (`useAuth`, `useData`, `useCart`)?

2. **Preserve contracts**
   - If you change the props signature, update all usages.
   - If you change data shape, also update `types.ts` and any relevant `DataContext` logic.

3. **Respect Tailwind and brand design**
   - Reuse existing color tokens and fonts.
   - Keep consistent spacing and typography with other sections.

4. **Update navigation or links if the behavior changes**
   - For example, if you rename `/services` to `/prestations`, update `NAV_LINKS` and any direct links.

---

## 8. Pattern Summary

- **Routing:** Centralized in `App.tsx` with `PublicLayout` + `AdminLayout` and `ProtectedRoute`.
- **State:** All global state via React Contexts:
  - Auth, Data, Cart.
- **Styling:** Tailwind CSS with a small set of custom brand tokens and utility classes.
- **Data:** Shared `types.ts` as the contract between UI and data operations.
- **Navigation:** Defined in `constants.ts` and rendered by `Navbar` / `Footer`.

Follow these patterns when adding new features to keep the frontend consistent and maintainable.

