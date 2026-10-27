<!-- Animated Header -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,50:7C3AED,100:EC4899&height=220&section=header&text=POS%20System&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Admin%20%7C%20Manager%20%7C%20User%20Platforms&descAlignY=58&descSize=18" width="100%" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&pause=1000&color=7C3AED&center=true&vCenter=true&width=600&lines=Multi-Shop+Mall+Point+of+Sale;Three+Roles%2C+One+Backend;JWT+Auth+%7C+Role-Based+Access;Simulated+Payments+%2B+Smart+Invoices" alt="Typing animation" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Recharts" />
</p>

<p align="center">
  <a href="https://YOUR-LIVE-DEMO-URL"><img src="https://img.shields.io/badge/Live_Demo-Visit_Project-7C3AED?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
  <a href="https://github.com/YOUR-USERNAME/YOUR-REPO"><img src="https://img.shields.io/badge/Source_Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Source Code" /></a>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#%EF%B8%8F-tech-stack">Tech Stack</a> •
  <a href="#%EF%B8%8F-architecture">Architecture</a> •
  <a href="#-api">API</a> •
  <a href="#%EF%B8%8F-installation">Installation</a>
</p>

---

## 📖 Overview

A full-stack **Point of Sale system that simulates a shopping mall with multiple shops**. It has three roles, each with its own dashboard and permissions.

> 💳 Payment is a **simulation** only: a UI plus saving the data in the database, with no real payment processing.

Imagine a mall with 5 phone shops:

| 👨‍💼 Admin | 🏪 Manager | 👤 User |
| --- | --- | --- |
| The **mall owner**. Adds sections (Stores) such as Phones, Tablets, and Laptops, and adds the owner of each shop | The **shop owner**. Adds their own categories and products, and tracks sales and profit | The **customer**. Browses products, buys, and tracks their orders |

**Example:** a shop lists 10 products and a customer buys 3. The invoice is recorded under the customer's name and appears for the Manager (profit) and the Admin (monitoring).

---

## 🚀 Features

### 🔐 Authentication & Authorization

- Registration and login
- JWT authentication
- Role-based authorization (`admin` / `manager` / `user`)
- Protected routes (verified on the **backend**, not just the frontend)
- Logout

### 👥 Features by Role

| 👨‍💼 Admin | 🏪 Manager | 👤 User |
| --- | --- | --- |
| Add, view, edit, delete **stores** | Log in to own dashboard | Register, log in, log out |
| Add, view, edit, delete **services** | Add, edit, delete **categories** | Browse stores, categories, and products |
| Add, view, edit, delete **managers** | Add, edit, delete **products** | Add products to cart in any quantity |
| View and manage **users** | View customers who bought from the shop | **Pay** (simulated) |
| View **all invoices** | View shop **invoices** | Track own orders and invoices |
| Analytics dashboard with charts | View sales and **profit** | About, Contact, and Services pages |

### 🧾 Purchase Flow

```mermaid
flowchart LR
  A[Browse Stores] --> B[Pick Category] --> C[Select Product] --> D[Choose Quantity] --> E[Pay - Simulated] --> F[Invoice Saved]
```

- **Managers** see the invoice and their profit.
- **Admins** can monitor every invoice across all shops.
- **Users** track their orders by payment status.

### 🔁 CRUD Operations

Full Create / Read / Update / Delete for **Stores, Services, Managers, Categories, and Products**.

---

## 📸 Screenshots

> Put your images inside a `screenshots/` folder with these names (or change the paths below).

### 👤 User Platform

| Home | Products | Checkout |
| :---: | :---: | :---: |
| <img src="./screenshots/user-home.png" width="280" /> | <img src="./screenshots/user-products.png" width="280" /> | <img src="./screenshots/user-checkout.png" width="280" /> |

### 👨‍💼 Admin Dashboard

| Analytics | Stores | Invoices |
| :---: | :---: | :---: |
| <img src="./screenshots/admin-analytics.png" width="280" /> | <img src="./screenshots/admin-stores.png" width="280" /> | <img src="./screenshots/admin-invoices.png" width="280" /> |

### 🏪 Manager Dashboard

| Dashboard | Products |
| :---: | :---: |
| <img src="./screenshots/manager-dashboard.png" width="400" /> | <img src="./screenshots/manager-products.png" width="400" /> |

---

## 🛠️ Tech Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | <img src="https://skillicons.dev/icons?i=react,nextjs,tailwind" alt="Frontend" /><br/><sub>Next.js App Router • Recharts • Font Awesome</sub> |
| **Backend** | <img src="https://skillicons.dev/icons?i=nodejs,express" alt="Backend" /><br/><sub>REST APIs • JWT • bcrypt</sub> |
| **Database** | <img src="https://skillicons.dev/icons?i=mongodb" alt="Database" /><br/><sub>MongoDB (ObjectId `_id`)</sub> |

> Edit this table if your stack is different.

---

## 🏗️ Architecture

```mermaid
flowchart TB
  A[Admin Dashboard] --> API
  B[Manager Dashboard] --> API
  C[User Pages] --> API
  API[REST API: Node.js + Express :4000] --> DB[(MongoDB)]
```

### 🔑 Authentication Flow

```mermaid
sequenceDiagram
  participant C as Client
  participant S as Backend
  C->>S: Login (credentials)
  S->>S: Validate credentials
  S-->>C: JWT token + role
  C->>C: Redirect by role
  C->>S: Protected request + token
  S->>S: Verify token and role
  S-->>C: Access granted / denied
```

```text
role = admin    →  Admin Dashboard
role = manager  →  Manager Dashboard
role = user     →  User Home
```

> ⚠️ **Important:** the backend must verify the role on every protected route, not just the frontend, because anyone can open a URL manually.

### 🗄️ Database Schema

```mermaid
erDiagram
  USER ||--o{ INVOICE : places
  MANAGER ||--o{ INVOICE : receives
  STORE ||--o{ MANAGER : has
  MANAGER ||--o{ CATEGORY : owns
  CATEGORY ||--o{ PRODUCT : contains
  INVOICE ||--|{ ITEM : includes
  PRODUCT ||--o{ ITEM : "sold as"
```

<details>
<summary><b>Show full schema</b></summary>

```text
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

Passwords are stored **hashed** (bcrypt), never as plain text.

</details>

---

## 📁 Project Structure

<details>
<summary><b>Show structure</b></summary>

```text
POS-System/
├── backend/
│   ├── controller/
│   ├── model/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── frontend/
    └── src/app/
        ├── Fetures/
        │   ├── Admin/
        │   │   ├── Homepage/        ← analytics and charts
        │   │   └── components/      ← Sidebar, Analysis, etc.
        │   ├── Manager/
        │   ├── user/
        │   │   └── product/[id]/
        │   └── categorey/
        │       └── [id]/
        ├── layout.jsx
        └── page.jsx
```

</details>

---

## 🔌 API

Base URL: `http://localhost:4000`

| Purpose | Method | Endpoint |
| --- | :---: | --- |
| List users | `GET` | `/possysytem/userAuth/showuser` |
| List stores | `GET` | `/posystem/project/showstore` |
| List managers | `GET` | `/posystem/project/showmanger` |
| List categories | `GET` | `/posystem/project/showcategorey` |
| List products | `GET` | `/posystem/project/showproduct` |
| List all invoices | `GET` | `/posystem/project/showallinvoices` |

Response shape:

```json
{ "success": true, "data": [] }
```

> The data key varies by route: `user`, `data`, `products`, or `invoices`.

### 🧩 Centralized API Config

All URLs live in one file instead of being repeated across components:

```javascript
// config/api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const API = `${BASE_URL}/posystem/project`;
export const AUTH_API = `${BASE_URL}/possysytem/userAuth`;

export const ENDPOINTS = {
  showStore: `${API}/showstore`,
  showManager: `${API}/showmanger`,
  showCategory: `${API}/showcategorey`,
  showProduct: `${API}/showproduct`,
  showAllInvoices: `${API}/showallinvoices`,
  showUser: `${AUTH_API}/showuser`,
};
```

---

## ⚙️ Installation

**1. Clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
```

**2. Backend**

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/possystem
JWT_SECRET=your_secret
```

```bash
npm start            # http://localhost:4000
```

**3. Frontend**

```bash
cd frontend
npm install
npm install recharts
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

```bash
npm run dev          # http://localhost:3000
```

> ⚠️ **Never upload your `.env` file to GitHub.** Add this to `.gitignore`:
>
> ```text
> .env
> .env.local
> node_modules
> .next
> ```

---

## 🧑‍💻 Development Notes

- Keep the API base URL in `NEXT_PUBLIC_API_URL` instead of hardcoding `localhost:4000`.
- Keep all fetch logic in a single `api.js` instead of repeating it.
- Use `Promise.allSettled` when fetching several endpoints at once (like the analytics page).
- Any component using `useState` or `useEffect` needs `"use client"` on the first line.
- Every page has its own `metadata` (title and description) via `export const metadata` in `page.jsx`.

---

## 🔒 Security

- JWT authentication
- Passwords hashed with bcrypt
- Role verified on every protected backend route
- Environment variables for sensitive configuration

---

## 🚧 Roadmap

- [ ] 🔐 Full auth (JWT + role-based route protection)
- [ ] 📊 Admin dashboard with charts
- [ ] 💰 Manager dashboard with profit
- [ ] 🛒 User product and cart pages
- [ ] 💳 Payment simulation and invoice saving


---

## 👨‍💻 Author

<p align="center">
  <b>Your Name</b><br/>
  Full-Stack Developer
</p>

<p align="center">
  <a href="https://github.com/YOUR-USERNAME"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://www.linkedin.com/in/YOUR-USERNAME"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://YOUR-PORTFOLIO-URL"><img src="https://img.shields.io/badge/Portfolio-7C3AED?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" /></a>
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,50:7C3AED,100:EC4899&height=100&section=footer" width="100%" />
</p>