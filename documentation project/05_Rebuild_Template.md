## 1. Purpose of This Template

This file is a **white‑label blueprint** for cloning the Maison Saney architecture for another business (e.g. hair salon, spa, barbershop, tattoo studio).

Use it as a **fill‑in‑the‑blank checklist**:
- Replace brand identity (name, logo, colors, contact info).
- Replace business‑specific content (services, products, formations, legal texts).
- Configure any future API keys or payment providers.

If you follow this guide step by step, you can rebuild the project with a different brand while keeping the same technical architecture.

---

## 2. Business Identity Variables

Fill these in for your new business.

```text
BUSINESS_NAME: ________________________________
BUSINESS_TAGLINE: _____________________________
BUSINESS_DESCRIPTION_SHORT: ___________________
BUSINESS_DESCRIPTION_LONG:  ___________________

BUSINESS_TYPE (e.g. nail salon, spa, barber): ______________________

BUSINESS_ADDRESS_LINE1: _______________________
BUSINESS_ADDRESS_LINE2: _______________________
BUSINESS_CITY: ________________________________
BUSINESS_POSTAL_CODE: _________________________
BUSINESS_COUNTRY: _____________________________

BUSINESS_PHONE: _______________________________
BUSINESS_EMAIL_CONTACT: _______________________
BUSINESS_WEBSITE_DOMAIN: ______________________

BUSINESS_OPENING_HOURS_SUMMARY: _______________
```

Social accounts:

```text
INSTAGRAM_HANDLE: _____________________________
FACEBOOK_PAGE_NAME: ___________________________
TIKTOK_HANDLE (optional): _____________________
OTHER_SOCIAL_LINKS: ___________________________
```

---

## 3. Brand Assets & Design Variables

### 3.1 Logo & Images

```text
LOGO_FILE_NAME (in /src): _____________________
FAVICON_FILE_NAME (if different): _____________

HERO_MAIN_IMAGE: _____________________________
GALLERY_IMAGES (list of file names or URLs):
  - ____________________________________
  - ____________________________________
  - ____________________________________
  - ____________________________________
```

Steps:
1. Place your logo and images into `src/`.
2. Update imports in `constants.ts`:
   - `import brandLogo from './src/YOUR_LOGO_FILE.ext';`
   - Update other imported images (salon, gallery, vitrine) as needed.
3. Update `<link rel="icon" ...>` in `index.html` if favicon differs.

### 3.2 Colors & Typography

Tailwind config and CSS encode brand identity:

```text
PRIMARY_COLOR (e.g. saney-dark): ______________
ACCENT_COLOR (e.g. saney-gold): _______________
BACKGROUND_GRADIENTS: _________________________
FONT_FAMILY_PRIMARY (sans): ___________________
FONT_FAMILY_SECONDARY (serif): ________________
```

Where to change:
- `tailwind.config.js`:
  - Update custom colors (`saney-dark`, `saney-gold`) or define new names.
- `index.css`:
  - Update font families if you change typography.
  - Adjust any custom gradient classes if required.

---

## 4. Content & Data Variables

### 4.1 Navigation Links

In `constants.ts`, `NAV_LINKS` defines main navigation:

```ts
export const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'A propos', href: '/about' },
  { label: 'Prestations', href: '/services' },
  { label: 'Formations', href: '/formations' },
  { label: 'Boutique', href: '/products' },
  { label: 'Galerie', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];
```

For a new business:
- Decide which sections you need.
- Update labels and `href` routes accordingly.
- Ensure you have corresponding pages under `pages/` and routes in `App.tsx`.

### 4.2 Services

The `SERVICES` constant seeds the list of services:

```text
SERVICE_1_ID: __________
SERVICE_1_TITLE: _______
SERVICE_1_DESCRIPTION: _
SERVICE_1_BENEFITS: [__, __, __]
SERVICE_1_DURATION: ____
SERVICE_1_PRICE_LABEL: _
SERVICE_1_ICON_NAME: ___
SERVICE_1_IMAGE: _______

SERVICE_2_ID: __________
...
```

To rebrand:
1. Open `constants.ts`.
2. Replace every `ServiceItem` in `SERVICES` with your own services.
3. Match icons to relevant Lucide icon names (or leave empty).
4. Adjust images to match your assets.

### 4.3 Products

`PRODUCTS` seeds the boutique:

For each product:

```text
PRODUCT_ID: ____________
PRODUCT_NAME: __________
PRODUCT_DESCRIPTION: ___
PRODUCT_PRICE (number): _
PRODUCT_CATEGORY: ______
PRODUCT_IMAGE: _________
```

Update `PRODUCTS` in `constants.ts` to match your catalog:
- For physical items (kits, cosmetics).
- For digital goods (vouchers, courses).

### 4.4 Formations (Training)

`formations` are managed at runtime via the admin interface, but you can preseed them:

For each formation:

```text
FORMATION_ID: __________
FORMATION_TITLE: _______
FORMATION_DESCRIPTION: _
FORMATION_PRICE: _______
FORMATION_DURATION: _____
FORMATION_IMAGE: ________
FORMATION_PROGRAM: [__, __, __]
```

You can:
- Seed initial values in `DataContext` if desired.
- Or create them through `AdminFormationsPage` once the app is running.

### 4.5 Legal & Policy Texts

Legal pages:
- `pages/legal/LegalMentions.tsx`
- `pages/legal/TermsOfSale.tsx`
- `pages/legal/PrivacyPolicy.tsx`

Variables to replace:

```text
LEGAL_BUSINESS_NAME: _________________________
LEGAL_COMPANY_FORM (e.g. SARL, SASU): ________
LEGAL_SIRET_OR_EQUIVALENT: __________________
LEGAL_ADDRESS: _______________________________
LEGAL_HOSTING_PROVIDER_NAME: _________________
LEGAL_HOSTING_PROVIDER_ADDRESS: ______________

TERMS_OF_SALE_SPECIFICS (delivery, refunds, etc.): _________
PRIVACY_POLICY_CONTACT_EMAIL: _____________________________
```

Replace all mentions of the old brand and company information with your new business data in those files.

---

## 5. Authentication & Roles for a New Business

Current auth is **mocked**:
- No real password or identity provider.
- LocalStorage stores a simple `User` with role `admin` or `client`.

For a new deployment, you may either:

### 5.1 Keep Mock Auth (Quick Demo Mode)

Variables to decide:

```text
ADMIN_TEST_EMAIL: ____________________________
CLIENT_TEST_EMAIL: ___________________________
DEFAULT_ADMIN_DISPLAY_NAME: _________________
DEFAULT_CLIENT_DISPLAY_NAME: ________________
```

Where to adjust:
- `LoginPage.tsx`: logic that maps specific emails to roles.
- `AuthContext.tsx`: default names for admin/client.

### 5.2 Plug in Real Auth (Advanced)

If you integrate a real provider, define:

```text
AUTH_BACKEND_BASE_URL: _______________________
AUTH_PROVIDER_NAME (e.g. Auth0, custom): _____
AUTH_TOKEN_STORAGE_STRATEGY: _________________
AUTH_ROLES (admin, staff, client...): ________
```

See `03_Backend_and_Data.md` for guidance on migrating `AuthContext` to a real auth system.

---

## 6. Payment & External Services Variables

If you add a payment provider (not present yet in this codebase), define:

```text
PAYMENT_PROVIDER_NAME: _______________________
PAYMENT_CURRENCY_DEFAULT: ____________________

VITE_PAYMENT_PUBLIC_KEY: _____________________
PAYMENT_SECRET_KEY (backend only): ___________
PAYMENT_WEBHOOK_SECRET (backend only): _______

CHECKOUT_SUCCESS_URL: ________________________
CHECKOUT_CANCEL_URL: _________________________
```

Configure:
- Frontend: use `VITE_PAYMENT_PUBLIC_KEY` via `import.meta.env`.
- Backend: use secret keys and webhook secret.

For detailed wiring, see `04_Payment_Integration.md`.

---

## 7. Project & Environment Variables

General project‑level variables:

```text
PROJECT_REPO_NAME: ___________________________
PROJECT_PACKAGE_NAME (package.json name): ____
PROJECT_DESCRIPTION: _________________________

NODE_VERSION_TARGET: _________________________
VITE_BASE_URL (if not root): _________________
```

Update:
- `package.json`:
  - `"name"`, `"version"`, `"description"` if needed.
- `metadata.json`:
  - `name`, `description` for deployment platforms.

---

## 8. Step‑by‑Step Rebuild Checklist

Use this as a **checklist** when cloning the project to a new brand.

### Step 1 – Clone the Repo

1. Copy the project directory or fork the repository.
2. In the new folder:
   - Run `npm install`.

### Step 2 – Rename Project Metadata

1. Open `package.json`:
   - Update `"name"` to your new project name (kebab‑case).
   - Optionally update `"version"` and `"description"`.
2. Open `metadata.json`:
   - Set `"name"` and any other metadata to new brand.

### Step 3 – Replace Brand Identity

1. Choose your `BUSINESS_NAME`, tagline, description, and contact info (Section 2).
2. Open `constants.ts`:
   - Set `APP_NAME` to the new business name.
   - Update any brand text constants (social names, etc.).
3. Open `index.html`:
   - Update `<title>` to `BUSINESS_NAME - <short tagline>`.
   - Update meta description if present.

### Step 4 – Swap Logo & Images

1. Place new logo and images into `src/`.
2. Update imports in `constants.ts`:
   - Change `brandLogo` import path to your new logo file.
   - Update any `salon` / `vitrine` / collage images to match new assets.
3. Update favicon:
   - Replace existing image file or adjust `<link rel="icon" ...>` in `index.html`.

### Step 5 – Reconfigure Navigation & Pages

1. Decide which pages you need:
   - Home, About, Services, Products, Gallery, Contact, Formations, etc.
2. Update `NAV_LINKS` in `constants.ts` to match your menu.
3. Ensure all routes exist in `App.tsx`:
   - Add/remove routes as needed.
4. Adjust copy in:
   - `HomePage.tsx`, `AboutPage.tsx`, `ServicesPage.tsx`, `FormationsPage.tsx`, `ProductsPage.tsx`, `ContactPage.tsx`.

### Step 6 – Replace Business Content (Services, Products, Formations)

1. Edit `SERVICES` and `PRODUCTS` in `constants.ts`:
   - Replace all Maison Saney‑specific data with new services/products.
2. Run the app and:
   - Use Admin pages (Services, Products, Formations) to refine content dynamically.

### Step 7 – Update Legal Pages

1. Open:
   - `pages/legal/LegalMentions.tsx`
   - `pages/legal/TermsOfSale.tsx`
   - `pages/legal/PrivacyPolicy.tsx`
2. Replace:
   - Business name.
   - Legal identifiers (SIRET, VAT, etc.).
   - Address and contact email.
   - Any references to Maison Saney or Béziers that no longer apply.

### Step 8 – Adjust Auth & Client/Admin Behavior

1. Decide how you want to log in:
   - Keep simple mock accounts.
   - Or connect to a real auth backend.
2. Update:
   - `LoginPage.tsx` – emails/roles and UI copy.
   - `AuthContext.tsx` – default user names and avatar logic.

### Step 9 – (Optional) Add Payment Integration

1. Choose a provider and define variables in Section 6.
2. Implement a backend with endpoints described in:
   - `03_Backend_and_Data.md`
   - `04_Payment_Integration.md`
3. Hook `CartSidebar` checkout into the new flow.

### Step 10 – Test & Deploy

1. Run `npm run dev`:
   - Test navigation, admin flows, client space, and forms.
2. Build:
   - `npm run build`
3. Deploy `dist/` to your hosting provider (e.g., Cloudflare Pages):
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

---

## 9. Summary

To white‑label this project successfully:
- Treat `constants.ts`, `types.ts`, and the legal pages as your primary configuration and content hubs.
- Swap brand identity, images, and copy while preserving the React/Context architecture.
- Optionally introduce real auth and payments as you scale.

Once you fill in all the blanks and follow the checklist, you will have a new, fully branded SPA reusing the proven architecture of the Maison Saney project.

