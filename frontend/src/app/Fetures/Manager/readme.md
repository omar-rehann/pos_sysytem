<!-- Animated Header -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,50:7C3AED,100:EC4899&height=200&section=header&text=Manager%20Dashboard&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=The%20Shop%20Owner%20%7C%20Products%20%26%20Profit&descAlignY=58&descSize=18" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Role-manager-7C3AED?style=for-the-badge&logo=shield&logoColor=white" alt="Role" />
  <img src="https://img.shields.io/badge/Scope-Own_Shop_Only-EC4899?style=for-the-badge" alt="Scope" />
  <img src="https://img.shields.io/badge/Profit-Paid_Invoices-47A248?style=for-the-badge" alt="Profit" />
</p>

<p align="center">
  <a href="./README.md">🏠 Main README</a> •
  <a href="./ADMIN.md">👨‍💼 Admin</a> •
  <a href="./USER.md">👤 User</a>
</p>

---

## 📖 Overview

The **Manager** is the shop owner. The Admin creates them and links them to a Store. They manage their own categories and products, and track their shop's invoices and profit.

```mermaid
flowchart LR
  M[Manager] --> C[Categories]
  C --> P[Products]
  M --> U[View Users]
  M --> I[Shop Invoices]
  I --> PR[Profit]
```

---

## 🔑 Permissions

### 1️⃣ Manage Categories

Each Manager adds the categories for their own shop.

> 📌 Example (phone shop): **Samsung** / **iPhone** / **Xiaomi**.

| Action | Description |
| --- | --- |
| ➕ Add | Add a category (name + image) |
| 👁️ Show | View the shop's categories |
| ✏️ Edit | Update |
| 🗑️ Delete | Delete |

### 2️⃣ Manage Products

Each category has its own products.

Product fields:

- Name
- Price
- Available quantity
- Image
- The category it belongs to

| Action | Description |
| --- | --- |
| ➕ Add | Add a product |
| 👁️ Show | View products |
| ✏️ Edit | Update (price / quantity / ...) |
| 🗑️ Delete | Delete |

### 3️⃣ View Users

- View the users available in the system.

### 4️⃣ Invoices and Profit

- Sees the invoices for **their shop only**.
- Each invoice shows the name of the user who bought.
- Can see how much profit they made from invoices.

> 📌 Example: the shop lists 10 products and a customer buys 3. The invoice records the 3 products, their quantities, and the total price.

---

## 💰 Profit Calculation

Profit is calculated from invoices with status `paid` only:

```js
const totalProfit = invoices
  .filter((inv) => inv.paymentStatus === "paid")
  .reduce((sum, inv) => sum + inv.total, 0);
```

> 💡 For **net profit** (not just revenue), add a `costPrice` field to the product.
> Profit = (selling price − cost price) × quantity.

### 📊 Suggested Dashboard Cards

| Card | Description |
| --- | --- |
| 💵 Total profit | Sum of paid invoices |
| 🧾 Number of orders | Number of invoices |
| 📦 Number of products | The shop's products |
| 🏆 Best-selling product | From invoice items |
| ⚠️ Low stock | Quantity below a threshold |

<details>
<summary><b>💡 Example: best-selling product and low stock</b></summary>

```js
// Best-selling product (from paid invoices)
const sales = {};
invoices
  .filter((inv) => inv.paymentStatus === "paid")
  .forEach((inv) =>
    inv.items.forEach((item) => {
      const id = item.product._id || item.product;
      sales[id] = (sales[id] || 0) + item.quantity;
    })
  );

const bestSellingId = Object.keys(sales).sort((a, b) => sales[b] - sales[a])[0];

// Low stock (threshold = 5)
const lowStock = products.filter((p) => p.quantity < 5);
```

</details>

---

## 💳 Payments as Seen by the Manager

When a User pays (simulated) and the transaction completes (`paid`), it appears for the Manager so they can calculate profit.

```mermaid
flowchart LR
  A[User pays] --> B{paymentStatus}
  B -->|paid| C[Counted in profit]
  B -->|pending| D[Waiting]
  B -->|failed| E[Ignored]
```

Available filters:

| Filter | Values |
| --- | --- |
| By payment status | `paid` / `pending` / `failed` |
| By payment method | Visa / InstaPay / ... |
| By date | Day / month / range |

---

## ⚠️ Notes

- 🔒 The backend must filter data by `manager._id` so a Manager never sees another shop's invoices or products.
- 📉 When a User buys, the product quantity should decrease. If it reaches zero, show the product as unavailable.
- 🧾 Once the transaction completes, the invoice is saved **once** and appears for both the Manager and the Admin.

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,50:7C3AED,100:EC4899&height=100&section=footer" width="100%" />
</p>