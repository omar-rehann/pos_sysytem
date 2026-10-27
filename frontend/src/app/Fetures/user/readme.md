# User

The User is the customer who browses and buys from the shops.

---

## Pages

| Page | Description |
|------|-------------|
| Home | Hero section + all categories |
| Category | Products of a specific category |
| Product | Product details |
| Cart / Checkout | Cart and completing the purchase |
| Orders | The user's orders |
| Services | Available services |
| About | About the site |
| Contact | Contact page |

---

## User Journey

```
Register / Login
      ↓
Home (Hero + Categories)
      ↓
Pick a Category  ←  its products appear
      ↓
Pick a product + choose quantity
      ↓
Checkout + choose payment method
      ↓
Invoice saved (paid)
      ↓
Appears in the User's Orders
and for the Manager (profit) and the Admin (monitoring)
```

---

## 1) Home Page

- **Hero section**: main banner with a call to action.
- **Categories**: shows all categories. Clicking one opens its products.

Link:

```jsx
<Link href={`/Fetures/categorey/${e._id}`}>
```

## 2) Products and Buying

- View all available products in a category.
- Choose a **quantity**, which must not exceed the available stock.
- A product with zero quantity shows "Unavailable" and can't be bought.

## 3) Payment (Simulation)

Available payment methods:

- Visa
- InstaPay
- Any other method you want to add

> There is no real payment. The UI collects the data and saves the transaction in the database only.

**Warning:** never store the full card number or CVV, even in a simulation. Store only the last 4 digits.

## 4) Orders

The User can track their orders, with a **filter** showing payment details:

- Payment status (paid / pending / failed)
- Payment method
- Date
- Total

When the transaction completes (`paid`), it appears for the Manager so they can calculate profit.

---

## Invoice Created on Purchase

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

If the cart contains products from more than one shop, create a separate invoice for each Manager.

---

## Notes

- A User sees only their own orders. The backend filters by `user._id`.
- Protect the checkout and Orders pages so unauthenticated users are redirected to login.
- Images: if the backend returns only a file name, prepend the base URL.
- Each page should have its own `metadata` (for example `Orders` and `Contact`).