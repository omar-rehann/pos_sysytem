# POS System

A Point of Sale system that simulates a shopping mall with multiple shops. It has 3 roles: **Admin**, **Manager**, and **User**. Each role has its own dashboard and permissions.

> Payment is a **simulation** only: a UI plus saving the data in the database, with no real payment processing.

---

## Overview

Imagine a mall with 5 phone shops:

- The **Admin** is the mall owner. They add sections (Stores) such as Phones, Tablets, and Laptops, and add the owner of each shop (Manager).
- The **Manager** is the shop owner. They add their own categories and products, and track sales and profit.
- The **User** is the customer. They browse products, buy, and track their orders.

Example: a shop lists 10 products and a customer buys 3. The invoice is recorded under the customer's name and appears for the Manager (profit) and the Admin (monitoring).

---

## Roles at a Glance

| Role | What they can do |
|------|------------------|
| **Admin** | Manage Stores, Services, Managers, and Users; view analytics and all invoices |
| **Manager** | Manage categories and products; view users, invoices, and profit |
| **User** | Browse, buy in quantities, pay (simulated), and track orders |

Full details:

- [`ADMIN.md`](./ADMIN.md)
- [`MANAGER.md`](./MANAGER.md)
- [`USER.md`](./USER.md)

---

## Tech Stack

| Part | Technology |
|------|------------|
| Frontend | Next.js (App Router) + React |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Backend | Node.js + Express (port `4000`) |
| Database | MongoDB (ObjectId `_id`) |
| Icons | Font Awesome |

> Edit this table if your stack is different.

---

## Authentication and Roles

1. The user **registers** or **logs in**.
2. The backend returns the user data including the `role` (`admin` / `manager` / `user`).
3. The frontend redirects to the matching dashboard:

```
role = admin    →  Admin Dashboard
role = manager  →  Manager Dashboard
role = user     →  User Home
```

**Important:** the backend must verify the role on every protected route, not just the frontend, because anyone can open a URL manually.

---

## Suggested Project Structure

```
src/app/
├── Fetures/
│   ├── Admin/
│   │   ├── Homepage/        ← analytics and charts
│   │   ├── components/      ← Sidebar, Analysis, etc.
│   │   └── ...
│   ├── Manager/
│   ├── user/
│   │   └── product/[id]/
│   └── categorey/
│       └── [id]/
├── layout.jsx
└── page.jsx
```

---

## API

Base URL: `http://localhost:4000`

| Purpose | Endpoint |
|---------|----------|
| List users | `GET /possysytem/userAuth/showuser` |
| List stores | `GET /posystem/project/showstore` |
| List managers | `GET /posystem/project/showmanger` |
| List categories | `GET /posystem/project/showcategorey` |
| List products | `GET /posystem/project/showproduct` |
| List all invoices | `GET /posystem/project/showallinvoices` |

Response shape:

```json
{ "success": true, "data": [] }
```

> The data key varies by route: `user`, `data`, `products`, or `invoices`.

---

## Suggested Database Schema

```
User      { name, email, password, role, phone, address, img }
Store     { name, img }
Manager   { name, email, password, address, phone, img, store → Store }
Service   { name, description, img }
Category  { name, img, manager → Manager }
Product   { name, price, quantity, img, category → Category, manager → Manager }
Invoice   {
  user → User,
  manager → Manager,
  items: [{ product → Product, quantity, price }],
  total,
  paymentMethod,     // visa | instapay | ...
  paymentStatus,     // pending | paid | failed
  createdAt
}
```

Passwords must be stored **hashed** (bcrypt), never as plain text.

---

## Running the Project

```bash
# 1) Backend
cd backend
npm install
npm start            # http://localhost:4000

# 2) Frontend
cd frontend
npm install
npm install recharts
npm run dev          # http://localhost:3000
```

Environment variables (`.env`):

```
MONGO_URI=mongodb://localhost:27017/possystem
JWT_SECRET=your_secret
PORT=4000
```

---

## Shared Pages

- **About**, **Contact**, and **Services** are available to the User.
- Every page has its own `metadata` (title and description) via `export const metadata` in `page.jsx`.

---

## Development Notes

- Put the API base URL in an environment variable (`NEXT_PUBLIC_API_URL`) instead of hardcoding `localhost:4000`.
- Create a single `api.js` containing all fetch functions instead of repeating them.
- Use `Promise.allSettled` when fetching several endpoints at once (like the analytics page).
- Any component using `useState` or `useEffect` needs `"use client"` on the first line.

---

## Roadmap

- [ ] Full auth (JWT + role-based route protection)
- [ ] Admin dashboard with charts
- [ ] Manager dashboard with profit
- [ ] User product and cart pages
- [ ] Payment simulation and invoice saving
- [ ] Order filtering by payment status
- [ ] Pagination for large tables
- [ ] Dark mode (optional)