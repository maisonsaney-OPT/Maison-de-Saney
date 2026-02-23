## 1. Current Payment State

As of the current codebase, **there is no real payment provider integration**.

- No Stripe, PayPal, or card processor SDKs are imported.
- No cryptographic signing, HMAC, or token verification is implemented.
- No webhook or callback endpoints exist (because there is no backend).
- All “orders” are simulated and stored in **localStorage** via `DataContext`.

The checkout flow is **UI‑only**:

- The user fills their cart.
- Clicks the “Commander” button in the cart sidebar.
- An `Order` object is created and stored in localStorage through `addOrder`.
- Admins manage order statuses in `AdminOrdersPage`.
- Clients view their orders in `ClientSpacePage`.

There is **no card capture, no bank redirect, and no payment status confirmation**.

---

## 2. Where Checkout Lives in the UI

Key components and pages:

- `components/CartSidebar.tsx`
  - Shows the slide‑in cart with items and total.
  - Contains the “Commander” (checkout) button.
  - On click:
    - Uses `useCart()` to read the current items and total.
    - Uses `useAuth()` (if needed) to associate order with the logged‑in user.
    - Uses `useData()` → `addOrder` to persist the order.

- `pages/admin/AdminOrdersPage.tsx`
  - Lists all orders.
  - Allows updating `Order.status` (pending, processing, shipped, delivered, cancelled).

- `pages/ClientSpacePage.tsx`
  - Lists orders belonging to the current user (`Order.userId` matching `user.id`).

These places are your **natural anchor points** for integrating a real payment flow.

---

## 3. Designing a Real Payment Integration (Future)

The rest of this file provides a blueprint for how to wire in a payment provider when you introduce a backend. Adjust names and details to match your actual provider (Stripe, PayPal, Mollie, etc.).

### 3.1 High‑Level Flow

Typical card payment flow:

1. Client builds cart in the SPA.
2. Client clicks **Commander**.
3. SPA sends order draft to backend:
   - e.g. `POST /checkout/session` with items and user info.
4. Backend:
   - Validates prices and products.
   - Creates a payment session with the provider (e.g. Stripe Checkout Session).
   - Stores a pending `Order` record in the database.
   - Returns the provider’s redirect URL or client secret.
5. SPA:
   - Redirects the user to the provider (hosted payment page) or uses JS SDK for inline checkout.
6. User completes payment.
7. Provider calls backend webhook:
   - Confirms payment success/failure.
   - Backend updates the order status (`paid`, `failed`, etc.).
8. Backend redirects user back to SPA thank‑you page with an identifier:
   - e.g. `/order/confirmation?orderId=...`.
9. SPA fetches order from backend and displays confirmation.

---

## 4. Cryptographic & Security Requirements (Conceptual)

In the current codebase, **no cryptographic operations** are present because there is no payment integration. When adding one, you typically need:

- **Secret keys**:
  - Provided by your payment processor (e.g. `STRIPE_SECRET_KEY`).
  - Stored only on the backend (never in the browser).

- **Signing or MAC verification**:
  - Payment providers sign webhook payloads.
  - You verify signatures using HMAC (e.g. HMAC‑SHA256) or public key verification.
  - Example (Stripe):
    - Construct a signed payload using timestamp and body.
    - Compute HMAC with your endpoint secret.
    - Compare to signature header.

- **Hashing algorithms**:
  - Occasionally required for anti‑fraud or if using legacy gateways.
  - Common algorithms:
    - HMAC‑SHA256
    - SHA‑1 (legacy, not recommended for new designs)

**Important:** All such operations must happen on the server; the SPA should never have access to secret keys or MAC secrets.

---

## 5. Example Request/Response Contracts (Template)

These are **templates** to help you design your integration; they are not implemented yet.

### 5.1 Create Checkout Session (Client → Backend)

Endpoint (example):
- `POST /checkout/session`

Request body (example):
```json
{
  "userId": "user_123",
  "items": [
    { "productId": "p1", "name": "Vernis semi-permanent", "quantity": 2, "unitPrice": 25.0 },
    { "productId": "p2", "name": "Kit soin mains", "quantity": 1, "unitPrice": 40.0 }
  ],
  "currency": "EUR",
  "successUrl": "https://maison-saney.fr/order/success",
  "cancelUrl": "https://maison-saney.fr/cart"
}
```

Response body (example):
```json
{
  "checkoutUrl": "https://payment.provider/redirect/XYZ",
  "orderId": "ord_abc123"
}
```

### 5.2 Webhook (Provider → Backend)

Endpoint:
- `POST /webhooks/payment`

Raw body:
- Signed by provider (HMAC or similar).

Parsed event (example):
```json
{
  "type": "payment.succeeded",
  "data": {
    "orderId": "ord_abc123",
    "amount": 90.0,
    "currency": "EUR",
    "providerPaymentId": "pi_12345",
    "customerEmail": "client@example.com"
  }
}
```

Backend behavior:
- Verify signature.
- Mark `Order` as `paid` or equivalent status.
- Optionally send confirmation email.

### 5.3 Client Confirmation Page (Client → Backend)

SPA route:
- `/order/success?orderId=ord_abc123`

Backend endpoint:
- `GET /orders/ord_abc123`

Response (example):
```json
{
  "id": "ord_abc123",
  "userId": "user_123",
  "items": [...],
  "total": 90.0,
  "status": "paid",
  "createdAt": "2026-02-21T10:00:00.000Z"
}
```

SPA renders:
- A thank‑you page with the order summary.

---

## 6. Integrating Payment into the Existing Code

### 6.1 Modifying CartSidebar Checkout

When you introduce a backend:

1. Replace the current `handleCheckout` logic in `CartSidebar.tsx`:
   - Instead of directly calling `addOrder`, call your new **API service**:
     - e.g. `createCheckoutSession({ items, user })`.

2. On success:
   - Redirect to `checkoutUrl` returned by backend.

3. After payment:
   - The user lands on a success/cancel URL handled by the SPA.
   - Those pages fetch order/payment status from backend.

### 6.2 Order Statuses

Currently:
- `status` enum: `'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'`.

With payments:
- You might extend statuses to include:
  - `awaiting_payment`
  - `paid`
  - `payment_failed`

Update:
- `Order` type in `types.ts`.
- Admin and client views to handle new statuses.

---

## 7. Sandbox & Testing (To Be Defined)

Since no payment provider is currently configured, there are no actual sandbox credentials in this codebase.

When you choose a provider (example: Stripe), you will typically need:

- **Test API keys**:
  - `STRIPE_SECRET_KEY` (backend only).
  - `STRIPE_PUBLISHABLE_KEY` (frontend, via Vite env variables).

- **Webhook secret**:
  - e.g. `STRIPE_WEBHOOK_SECRET` for verifying incoming events.

- **Testing cards**:
  - Providers supply test card numbers (e.g. `4242 4242 4242 4242` for Stripe).

- **Test flow:**
  1. Run backend in test mode with test keys.
  2. Run SPA with test publishable key.
  3. Use test cards only.
  4. Confirm that webhooks update order statuses correctly.

---

## 8. Summary

- The current project **does not process real payments**.
- Orders are stored in localStorage and manipulated via `DataContext`.
- To add real payments:
  - Introduce a backend.
  - Securely store secrets and perform cryptographic checks there.
  - Hook the checkout button in `CartSidebar` into a `/checkout/session` API.
  - Handle provider webhooks to update order status.
  - Use the templates in this document to guide request/response design.

Use this file as the reference when you are ready to move from “virtual” orders to actual payment processing.

