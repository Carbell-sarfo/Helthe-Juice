# Helthe Juice — Astro Components

## Files Delivered

```
src/
  data/
    menu.js              ← ALL prices, flavours, packages live here
  components/
    MenuListing.astro    ← full menu with tabs + pricing cards
    BlendBuilder.astro   ← interactive flavour picker
    OrderForm.astro      ← package selector, qty, details, submit
  pages/
    menu.astro           ← menu page
    order.astro          ← full order page (assembles all components)
```

---

## How the Components Talk to Each Other

They communicate via **custom DOM events** — no props needed between them.

```
User picks a package in OrderForm
  → dispatches "helthe:packageSelected" with { maxFlavours, label }
  → BlendBuilder listens, updates max selectable flavours

User selects flavours in BlendBuilder
  → dispatches "helthe:flavoursUpdated" with { flavours: [...] }
  → OrderForm listens, updates summary + WhatsApp message
```

This means the two components are fully independent — you can place them
anywhere on the page and they'll still communicate correctly.

---

## How to Add to Your Existing Setup

### 1. Drop the data file
Copy `src/data/menu.js` into your project. This is your single source of truth.
Update prices or flavours here only — everything else updates automatically.

### 2. Drop the components
Copy the three `.astro` files into your `src/components/` folder.

### 3. Add to your pages
```astro
---
import MenuListing from "../components/MenuListing.astro";
import BlendBuilder from "../components/BlendBuilder.astro";
import OrderForm from "../components/OrderForm.astro";
---

<!-- Menu page -->
<MenuListing />

<!-- Order page — BlendBuilder must come BEFORE OrderForm on the page -->
<BlendBuilder />
<OrderForm />
```

> **Important:** BlendBuilder must appear in the DOM before OrderForm
> because OrderForm's script listens for events that BlendBuilder dispatches.

### 4. Connect your CSS variables
The components use these CSS variables from your `global.css`:
```css
--green       /* primary green */
--green-lite  /* light green background */
--gold        /* gold accent */
--gold-lite   /* light gold background */
--cream       /* main background */
--cream-dark  /* slightly darker cream */
--dark        /* text colour */
--muted       /* muted text */
--border      /* border colour */
--white       /* white */
--font-serif  /* your serif font family */
```
Add any missing ones to your `global.css`. The components will inherit them.

### 5. Update the Apps Script URL
In `src/data/menu.js`, the `SHEET_URL` is already set to your deployed
Google Apps Script URL. If you redeploy the script, update it here.

---

## Updating Products

Everything lives in `src/data/menu.js`.

**Add a new package:**
```js
{
  id: "pkg-new",
  size: "500ml",
  label: "500ml · Set of 20",
  description: "Up to 3 flavours",
  price: 800,
  bottleCount: 20,
  maxFlavours: 3,
  badge: null,
  featured: false,
}
```

**Add a new flavour:**
Find the right category in `CATEGORIES` and add to its `flavours` array:
```js
{ id: "new-flavour", name: "Passion Fruit Lime", seasonal: false, custom: false }
```

**Change a price:**
Update the `price` field on the relevant package in `PACKAGES`.

---

## The Order Flow

1. User selects a package → qty selector appears → live GHS total updates
2. User picks flavours in BlendBuilder → chips appear in the form summary
3. User fills in name, phone, location
4. User clicks submit:
   - Order logs silently to Google Sheets CRM
   - WhatsApp opens with full order pre-filled
   - Success state shown
5. User can reset and place another order

---

## CSS Scoping

All component styles are **scoped** using Astro's built-in `<style>` blocks.
They won't leak into the rest of your site. If you want to override any styles,
target them from your `components.css` using `:global()` or increase specificity.