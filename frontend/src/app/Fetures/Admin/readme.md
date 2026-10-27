# Admin

The Admin has full control of the system (the mall owner).

---

## Permissions

### 1) Manage Stores (sections)

A Store is a main section such as Phones, Tablets, or Laptops.

| Action | Description |
|--------|-------------|
| Add | Add a new Store (name + image) |
| Show | View all Stores |
| Edit | Update a Store |
| Delete | Delete a Store |

### 2) Manage Services

Services available on the site.

| Action | Description |
|--------|-------------|
| Add | Add a service |
| Show | View all services |
| Edit | Update a service |
| Delete | Delete a service |

### 3) Manage Managers (shop owners)

Each Manager has:

- Name
- Email
- Password
- Address
- Phone number
- Image
- The Store they belong to

For example, if the mall has 5 phone shops, each shop has its own Manager, and all of them belong to the "Phones" Store.

| Action | Description |
|--------|-------------|
| Add | Add a Manager and link them to a Store |
| Show | View all Managers |
| Edit | Update their data |
| Delete | Delete them |

### 4) View Users

- View all users registered in the system.

### 5) View Invoices

- View **all** purchases made by any user on the site.
- Each invoice shows: user name, products, quantities, total, payment method, payment status, and date.

---

## Home Page (Analytics)

The Admin home page shows statistic cards:

| Card | Source |
|------|--------|
| Number of Users | `showuser` |
| Number of Managers | `showmanger` |
| Number of Stores | `showstore` |
| Number of Categories | `showcategorey` |
| Number of Products | `showproduct` |
| Number of Orders | `showallinvoices` |

Below the cards is a **dynamic chart** (Bar or Pie) that updates automatically as the data changes.

### Extra Chart Ideas

- **Line chart**: sales per month (from `createdAt` and `total` in invoices).
- **Pie chart**: payment method distribution (Visa / InstaPay / ...).
- **Bar chart**: top-selling Stores.
- **Bar chart**: top-selling Managers.

---

## Pages

| Page | Title |
|------|-------|
| Home (Analysis) | Dashboard |
| Add Store | Add Store |
| Show Stores | All Stores |
| Add Service | Add Service |
| Show Services | All Services |
| Add Manager | Add Manager |
| Show Managers | Managers |
| Show Users | Users |
| Invoices | Invoices |

---

## Notes

- The backend must check `role === "admin"` on every route above.
- When deleting a Store, decide what happens to its Managers and categories: block the deletion, or delete them too?
- When deleting a Manager, decide what happens to their products.