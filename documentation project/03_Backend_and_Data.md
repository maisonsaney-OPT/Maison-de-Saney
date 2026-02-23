## 1. No Traditional Backend – Architecture Clarification

This project does **not** have a separate backend server (no Node/Express, no API routes, no database server).  
Instead, all “backend‑like” logic is implemented **inside the frontend**, using:

- **React Contexts** for domain logic.
- **TypeScript interfaces** in `types.ts` for data models.
- **localStorage** as a persistence layer in the browser.

From an architectural point of view:

- `DataContext` behaves like a **client‑side repository/API**.
- Components and pages call context methods instead of HTTP endpoints.
- Data is stored and retrieved from localStorage instead of a database.

This file documents that behavior in a backend‑style way so you can migrate to a real backend later.

---

## 2. Data Models (Types)

All domain models are defined in `types.ts`.

### 2.1 Core Entities

- **ServiceItem**
  - `id: string`
  - `title: string`
  - `description: string`
  - `benefits: string[]`
  - `duration?: string`
  - `price?: string` (formatted string, not numeric)
  - `iconName?: string` (Lucide icon name)
  - `image?: string` (URL or path)

- **Product**
  - `id: string`
  - `name: string`
  - `description: string`
  - `price: number`
  - `image: string`
  - `category: string`

- **CartItem**
  - Extends `Product`:
    - All `Product` fields +
    - `quantity: number`

- **User**
  - `id: string`
  - `name: string`
  - `email: string`
  - `role: 'admin' | 'client'`
  - `phone?: string`
  - `avatar?: string`
  - `createdAt: string` (ISO date string)

- **Formation**
  - `id: string`
  - `title: string`
  - `description: string`
  - `price: number`
  - `duration: string`
  - `image: string`
  - `program: string[]`

- **QuestionnaireAnswer**
  - `id: string`
  - `formationId: string`
  - `userId?: string`
  - `userEmail: string`
  - `userName: string`
  - `answers: Record<string, string>`
  - `submittedAt: string` (ISO date string)

- **ContactMessage**
  - `id: string`
  - `name: string`
  - `email: string`
  - `subject: string`
  - `message: string`
  - `createdAt: string`
  - `read: boolean`

- **GalleryImage**
  - `id: string`
  - `url: string`
  - `category: string`
  - `title?: string`

- **Order**
  - `id: string`
  - `userId: string`
  - `items: CartItem[]`
  - `total: number`
  - `status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'`
  - `createdAt: string`

### 2.2 Relationships

- **User ↔ Orders**
  - `Order.userId` references `User.id`.
  - Client space filters orders by current `user.id`.

- **Formation ↔ QuestionnaireAnswer**
  - `QuestionnaireAnswer.formationId` references `Formation.id`.

- **User ↔ QuestionnaireAnswer**
  - Optional `QuestionnaireAnswer.userId` references `User.id` if the user is logged in.

- **User ↔ ContactMessage**
  - `ContactMessage.email` is used to associate messages with user (in `ClientSpacePage`).

---

## 3. Data Persistence & “Repository” Layer

### 3.1 DataContext as a Repository

File: `context/DataContext.tsx`

Responsibilities:
- Initialize data from:
  - LocalStorage (if available).
  - Static constants (fallback).
- Expose typed CRUD operations.
- Persist mutations back to localStorage.

### 3.2 LocalStorage Keys

- `saney_services` → `ServiceItem[]`
- `saney_products` → `Product[]`
- `saney_gallery` → `GalleryImage[]`
- `saney_formations` → `Formation[]`
- `saney_questionnaires` → `QuestionnaireAnswer[]`
- `saney_messages` → `ContactMessage[]`
- `saney_users_list` → `User[]`
- `saney_orders` → `Order[]`

Initialization pattern:
- `useState` with lazy initializer:
  - Try `localStorage.getItem(key)` and `JSON.parse`.
  - If missing, fallback to constants or `[]`.

Persistence:
- `useEffect` per data slice:
  - `localStorage.setItem(key, JSON.stringify(value))` whenever the state changes.

---

## 4. Exposed “API‑Like” Operations

`DataContextType` defines the interface for all operations. These behave like client‑side API endpoints.

### 4.1 Services

- `addService(service: ServiceItem)`
  - Pushes a new service to `services`.

- `updateService(service: ServiceItem)`
  - Maps over `services` and replaces the item with matching `id`.

- `deleteService(id: string)`
  - Filters out the service with given `id`.

**Used by:**
- `AdminServicesPage` for CRUD operations on services.
- `ServicesPage` / homepage sections reading from `services`.

### 4.2 Products

- `addProduct(product: Product)`
- `updateProduct(product: Product)`
- `deleteProduct(id: string)`

Implementation:
- Same patterns as services, acting on `products`.

**Used by:**
- `AdminProductsPage` for managing the product catalog.
- `ProductsPage` for listing products.
- `CartContext` indirectly via `ProductsPage` adding products to cart.

### 4.3 Gallery

- `addGalleryImage(image: GalleryImage)`
  - Adds a manually defined gallery item.

- `deleteGalleryImage(id: string)`
  - Removes gallery item by id.

Initial data:
- Derived from `GALLERY_IMAGES` constant:
  - Mapped into `GalleryImage` objects with generated IDs and default category/title.

**Used by:**
- `AdminGalleryPage` for managing images.
- `GalleryPage`, home `Gallery` component for display.

### 4.4 Formations

- `addFormation(formation: Formation)`
- `updateFormation(formation: Formation)`
- `deleteFormation(id: string)`

**Used by:**
- `AdminFormationsPage`.
- `FormationsPage` to display formation offers.
- Questionnaire flow to associate answers with a formation.

### 4.5 Questionnaire Answers

- `addQuestionnaireAnswer(answer: QuestionnaireAnswer)`
  - Appends the answer to `questionnaires`.

**Used by:**
- The formations questionnaire flow (inside `FormationsPage` or related components).

### 4.6 Contact Messages

- `addContactMessage(message: ContactMessage)`
  - Adds a new message.

- `markMessageAsRead(id: string)`
  - Maps `contactMessages` and toggles `read` to `true` for the matching id.

**Used by:**
- Contact form to send messages.
- `AdminMessagesPage` to review and mark messages as read.
- `ClientSpacePage` to display messages sent by the logged‑in user (filtered by email).

### 4.7 Orders

- `addOrder(order: Order)`
  - Adds a new order to `orders`.

- `updateOrderStatus(id: string, status: Order['status'])`
  - Finds order by id and updates the `status` field.

**Used by:**
- `CartSidebar` for creating orders when user “checks out”.
- `AdminOrdersPage` for order management.
- `ClientSpacePage` to show order history per user.

### 4.8 Users

- `addUser(user: User)`
  - Adds a user only if no existing user with the same email.

- `deleteUser(id: string)`
  - Removes user from `users`.

**Used by:**
- `AdminUsersPage` to manage user list.
- Potentially in extended flows (e.g., manual client creation by admin).

---

## 5. Authentication & Authorization

### 5.1 AuthContext Overview

File: `context/AuthContext.tsx`

State:
- `user: User | null`

Methods:
- `login(email: string, role: 'admin' | 'client'): User`
  - Creates a new `User` object:
    - Random `id` using `Math.random().toString(36).substr(2, 9)`.
    - `name` based on role (`Admin Saney` or `Client Test`).
    - Stores avatar URL via `ui-avatars.com`.
    - Saves to localStorage as `saney_user`.
  - Updates React state and returns the user.

- `logout()`
  - Clears `user` and removes `saney_user` from localStorage.

Derived:
- `isAuthenticated: boolean`
- `isAdmin: boolean`

Initialization:
- On mount, reads `saney_user` from localStorage and restores `user` if present.

### 5.2 How Login Is Used

- `LoginPage.tsx`
  - Has form inputs for email and password (password is not validated against any backend).
  - On submit, chooses a role (e.g., admin if email matches test admin email).
  - Calls `login(email, role)` from `useAuth()`.
  - Redirects based on role (to `/admin` or `/client`).

### 5.3 Route Protection

- `ProtectedRoute.tsx`
  - Uses `useAuth()` to check:
    - `isAuthenticated`
    - `isAdmin` when `requireAdmin` is true.
  - If unauthorized:
    - Redirects (`Navigate`) to `/login`.
  - If authorized:
    - Renders `<Outlet />` for nested routes.

### 5.4 Current Limitations

- No password hashing or real credential checks.
- No token or session management beyond localStorage.
- No multi‑user concurrency; everything is browser‑local.

**To migrate to real auth:**
- Replace `login` with a call to a backend endpoint.
- Store tokens securely (cookies or secure storage).
- Derive roles from backend claims rather than local state.

---

## 6. “Endpoints” Mapping (Conceptual)

To help you move to a real backend, here is a mapping of client‑side operations to hypothetical REST endpoints.

### 6.1 Services

- `GET /services` → read `services` state.
- `POST /services` → `addService`.
- `PUT /services/:id` → `updateService`.
- `DELETE /services/:id` → `deleteService`.

### 6.2 Products

- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

### 6.3 Gallery

- `GET /gallery`
- `POST /gallery`
- `DELETE /gallery/:id`

### 6.4 Formations

- `GET /formations`
- `POST /formations`
- `PUT /formations/:id`
- `DELETE /formations/:id`

### 6.5 Questionnaire Answers

- `GET /formations/:id/questionnaires`
- `POST /formations/:id/questionnaires`

### 6.6 Contact Messages

- `GET /messages`
- `POST /messages`
- `PUT /messages/:id/read` (mark as read)

### 6.7 Orders

- `GET /orders`
- `GET /users/:id/orders`
- `POST /orders`
- `PUT /orders/:id/status`

### 6.8 Users

- `GET /users`
- `POST /users`
- `DELETE /users/:id`

### 6.9 Auth

- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

Currently, all these behaviors are in React Contexts. When you build a backend, these conceptual endpoints should guide which routes you implement.

---

## 7. How to Add or Modify an “Endpoint” and Data Model

### 7.1 Adding a New Entity (e.g., GiftCard)

1. **Define the type**
   - In `types.ts`, add:
     - `export interface GiftCard { id: string; code: string; amount: number; used: boolean; createdAt: string; }`

2. **Extend DataContext state**
   - Add:
     - `const [giftCards, setGiftCards] = useState<GiftCard[]>(() => { ... });`
   - Use a localStorage key, e.g., `saney_giftcards`.
   - Add a `useEffect` to persist `giftCards`.

3. **Extend DataContext interface**
   - In `DataContextType`, add:
     - `giftCards: GiftCard[];`
     - `addGiftCard`, `updateGiftCard`, `deleteGiftCard`, etc.

4. **Implement CRUD functions**
   - Follow patterns used for services/products.

5. **Expose via UI**
   - Add admin pages (e.g., `AdminGiftCardsPage.tsx`) to manage gift cards.
   - Use `useData()` to access `giftCards` and operations.

### 7.2 Modifying an Existing Model

Example: Add `phone` to `ContactMessage`.

1. **Update the type in `types.ts`**
   - Add `phone?: string`.

2. **Update forms and UI**
   - Update contact form to include phone field.
   - Pass the phone value when calling `addContactMessage`.

3. **Handle backward compatibility**
   - Existing stored messages in localStorage won’t have `phone`; treat it as optional.

4. **Update any admin displays**
   - Show phone in `AdminMessagesPage`.

### 7.3 Migrating to a Real Backend

When introducing an API server:

1. **Create a service layer on the frontend**
   - Example: `services/api.ts` with functions like `fetchServices()`, `createOrder()`.

2. **Replace DataContext internal logic**
   - Instead of directly mutating localStorage, call the service layer.
   - Keep `DataContext` as a caching layer or remove it in favor of React Query / SWR.

3. **Keep `types.ts` as the shared contract**
   - Align backend DTOs with these interfaces.

4. **Gradual migration**
   - Start with read operations (GET) from backend.
   - Then move create/update/delete operations.
   - Finally, turn off localStorage usage or only use it for short‑term caching.

---

## 8. Summary

- There is **no backend server**; all logic lives in the browser.
- `DataContext` + localStorage acts as a **mini in‑browser database and API**.
- `AuthContext` provides a **mock authentication** with role handling based on localStorage.
- `CartContext` models cart behavior and is tied into orders via `DataContext`.
- All entities are well‑typed in `types.ts`, making it straightforward to:
  - Add new models.
  - Migrate to a real backend while preserving the data contracts.

Use this file as the bridge when moving from the current localStorage architecture to a more traditional backend and database stack.

