# TRENDLAMA

A modern e-commerce web application for browsing and purchasing fashion, electronics, and home & living products.

🔗 **Live Demo:** https://client-e-commerce-ui.vercel.app/

## Overview

TRENDLAMA is a responsive e-commerce frontend built with modern React and Next.js technologies.

The project focuses on providing a clean shopping experience with product browsing, product customization, shopping cart management, checkout steps, and responsive UI.

## Features

* 🛍️ Browse products
* 🔎 Product details
* 🎨 Select product colors
* 📏 Select product sizes
* 🛒 Add products to cart
* ➕ Increase/decrease product quantity
* 🗑️ Remove products from cart
* 💾 Persist cart data using Local Storage
* 📦 Multi-step checkout flow
* 👤 Customer information form
* 💳 Payment form with validation
* ✅ Order completion page
* 🔔 Toast notifications
* 📱 Fully responsive design
* ✨ Smooth animations and transitions
* ⚡ Optimized images with Next.js Image
* 🧩 Reusable components

## Checkout Flow

The checkout process is divided into multiple steps:

```text
Shopping Cart
      ↓
Shipping Address
      ↓
Payment Method
      ↓
Order Completed
```

Each step is handled through URL search parameters:

```text
/cart?step=cart
/cart?step=shipping
/cart?step=payment
/cart?step=completed
```

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* JavaScript

### State Management

* Redux Toolkit
* React Redux
* Local Storage

### Forms & Validation

* React Hook Form
* Zod
* @hookform/resolvers

### UI & Animation

* Lucide React
* Motion
* Sonner

## Project Structure

```text
src/
├── app/
│   ├── cart/
│   │   ├── completed/
│   │   ├── customer-details/
│   │   ├── payment/
│   │   ├── products/
│   │   ├── client.tsx
│   │   └── page.tsx
│   │
│   ├── products/
│   │   └── [id]/
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   ├── products/
│   └── ui/
│
├── data/
│   ├── products.ts
│   ├── types.ts
│   └── schemas.ts
│
└── lib/
    ├── features/
    │   └── cart/
    │       └── cart.ts
    │
    ├── hooks.ts
    └── store.ts
```

> The exact folder structure may change as the project evolves.

## State Management

Redux Toolkit is used to manage the shopping cart.

Each cart item contains the selected product options:

```ts
{
  product,
  selectedColor,
  selectedSize,
  selectedQuantity
}
```

The cart also supports persistence using `localStorage`, allowing users to keep their cart items after refreshing the page.

## Form Validation

The checkout forms use **React Hook Form** together with **Zod**.

For example, the payment form validates:

* Cardholder name
* Card number
* Expiry date
* CVV

The **Place Order** button remains disabled until the form passes validation.

## Responsive Design

TRENDLAMA is designed to work across different screen sizes:

* 📱 Mobile
* 📱 Tablet
* 💻 Desktop

Tailwind CSS responsive utilities are used throughout the application.

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to the project:

```bash
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

## Environment Variables

If environment variables are required in the future, create a `.env.local` file:

```env
# Example
NEXT_PUBLIC_API_URL=
```

Never commit sensitive environment variables or API keys to GitHub.

## Future Improvements

* Real backend API
* Database integration
* User authentication
* Real payment processing
* Order history
* Product search
* Product filtering
* Product reviews
* Wishlist
* Admin dashboard
* Inventory management

## Disclaimer

This project is a frontend e-commerce project created for learning and portfolio purposes.

The payment form currently demonstrates the checkout UI and validation flow. It does not process real payments.

## Author

**Ahmed Reda**

Frontend Developer — React / Next.js

* GitHub: [ahmed-dev-reda](https://github.com/ahmed-dev-reda)
* Live Project: https://client-e-commerce-ui.vercel.app/

---

⭐ If you find this project useful, feel free to give it a star.
