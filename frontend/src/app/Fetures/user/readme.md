<!-- Animated Header -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,50:7C3AED,100:EC4899&height=200&section=header&text=User%20Platform&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=The%20Customer%20%7C%20Browse%2C%20Buy%20%26%20Track&descAlignY=58&descSize=18" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Role-user-EC4899?style=for-the-badge&logo=shield&logoColor=white" alt="Role" />
  <img src="https://img.shields.io/badge/Payment-Simulation-4F46E5?style=for-the-badge" alt="Payment" />
  <img src="https://img.shields.io/badge/Scope-Own_Orders_Only-7C3AED?style=for-the-badge" alt="Scope" />
</p>

<p align="center">
  <a href="./README.md">🏠 Main README</a> •
  <a href="./ADMIN.md">👨‍💼 Admin</a> •
  <a href="./MANAGER.md">🏪 Manager</a>
</p>

---

## 📖 Overview

The **User** is the customer who browses and buys from the shops.

---

## 📄 Pages

| Page | Description |
| --- | --- |
| 🏠 Home | Hero section + all categories |
| 🗂️ Category | Products of a specific category |
| 📦 Product | Product details |
| 🛒 Cart / Checkout | Cart and completing the purchase |
| 🧾 Orders | The user's orders |
| 🛎️ Services | Available services |
| ℹ️ About | About the site |
| ✉️ Contact | Contact page |

---

## 🧭 User Journey

```mermaid
flowchart TD
  A[Register / Login] --> B[Home: Hero + Categories]
  B --> C[Pick a Category]
  C --> D[Pick a product + choose quantity]
  D --> E[Checkout + choose payment method]
  E --> F[Invoice saved: paid]
  F --> G[User's Orders]
  F --> H[Manager: profit]
  F --> I[Admin: monitoring]
```

---

## 1️⃣ Home Page

- **Hero section**: main banner with a call to action.
- **Categories**: shows all categories. Clicking one opens its products.

Link:

```jsx
<Link href={`/Fetures/categorey/${e._id}`}>
```

## 2️⃣ Products and Buying

- View all available products in a category.
- Choose a **quantity**, which must not exceed the available stock.
- A product with zero quantity shows **"Unavailable"** and can't be bought.

## 3️⃣ Payment (Simulation)

Available payment methods:

| Method | Status |
| --- | --- |
| 💳 Visa | Available |
| 📱 InstaPay | Available |
| ➕ Any other | Add as needed |

> 💳 There is no real payment. The UI collects the data and saves the transaction in the database only.

> ⚠️ **Warning:** never store the full card number or CVV, even in a simulation. Store only the **last 4 digits**.

## 4️⃣ Orders

The User can track their orders, with a **filter** showing payment details:

| Detail | Values |
| --- | --- |
| Payment status | `paid` / `pending` / `failed` |
| Payment method | Visa / InstaPay / ... |
| Date | Day / month / range |
| Total | Order total |

When the transaction completes (`paid`), it appears for the Manager so they can calculate profit.

---

## 🧾 Invoice Created on Purchase

```json
{
  "user": "userId",
  "manager": "managerId",
  "items": [
    { "product": "productId", "quantity": 3, "price": 1500 }
  ],
  "total": 4500,
  "paymentMethod": "visa",
  "paymentStatus": "paid"
}
```

> 🏬 If the cart contains products from more than one shop, create a **separate invoice for each Manager**.

<details>
<summary><b>💡 Example: splitting a cart into one invoice per Manager</b></summary>

```js
function splitCartByManager(cartItems) {
  const groups = {};

  cartItems.forEach((item) => {
    const managerId = item.product.manager;
    if (!groups[managerId]) groups[managerId] = [];
    groups[managerId].push({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    });
  });

  return Object.entries(groups).map(([manager, items]) => ({
    manager,
    items,
    total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  }));
}
```

</details>

---

## ⚠️ Notes

- 🔒 A User sees only their own orders. The backend filters by `user._id`.
- 🚪 Protect the checkout and Orders pages so unauthenticated users are redirected to login.
- 🖼️ Images: if the backend returns only a file name, prepend the base URL.
- 🏷️ Each page should have its own `metadata` (for example `Orders` and `Contact`).

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,50:7C3AED,100:EC4899&height=100&section=footer" width="100%" />
</p>