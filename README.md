# Product Listing Page

A responsive e-commerce product listing page built with React, featuring category filtering, rating filtering, price sorting, favourites management, and paginated product browsing.

---

## Live Preview

```bash
pnpm  install
pnpm  dev
```

Runs at `http://localhost:5173`

---

## Project Overview

 This is a frontend-only product listing interface that fetches real product data from the DummyJSON public API. Users can browse products across categories, filter by rating, sort by price, save favourites (persisted across sessions), and paginate through results — all with the filter/sort/page state reflected in the URL for shareability.

---

## Tech Stack

| Layer | Library | Version | Purpose |
|---|---|---|---|
| Framework | React | 18 | UI rendering |
| Language | TypeScript | 5 | Type safety |
| Build tool | Vite | 5 | Dev server and bundler |
| Styling | Tailwind CSS | v4 | Utility-first styling |
| UI Components | shadcn/ui | latest | Select, Button, Skeleton, Pagination, Separator |
| Data fetching | TanStack Query (React Query) | v5 | Server state, caching, deduplication |
| Client state | Zustand | v4 | Favourites store with localStorage persistence |
| URL state | nuqs | v2 | Filter/sort/page params synced to URL |
| Icons | Lucide React | latest | Heart, chevron, cart icons |
| Notifications | Sonner | latest | Toast on favourite/unfavourite |

---

## API

**Base URL:** `https://dummyjson.com`

Three endpoints are used depending on the active filters:

### 1. All products (default)
```
GET /products?limit=12&skip={skip}&sortBy=price&order=asc
```
Used when no category is selected. Supports server-side pagination and price sorting natively.

### 2. Products by category
```
GET /products/category/{slug}?limit=12&skip={skip}
```
Used when a category is selected. Returns only products in that category with server-side pagination.

### 3. All products / category — no pagination (rating filter active)
```
GET /products?limit=0
GET /products/category/{slug}?limit=0
```
`limit=0` on DummyJSON returns all records. Used when a rating filter is active because rating filtering must happen client-side (see Constraints section).

### 4. Category list (fetched once)
```
GET /products/category-list
```
Returns an array of category slug strings. Cached indefinitely (`staleTime: Infinity`) since it never changes.

---

## Features

**Category filter** — sidebar checkbox list populated from the API. Selecting a category switches the endpoint to `/products/category/{slug}` and resets to page 1.

**Rating filter** — filter by 4★ & up or 3★ & up. Applied client-side after fetch (see Constraints). Resets to page 1 on change.

**Price sort** — Low → High / High → Low. Applied server-side via `sortBy=price&order=asc/desc` on the default endpoint. Applied client-side via `.sort()` when a category or rating filter is active (the category and limit=0 endpoints on DummyJSON ignore `sortBy`).

**Favourites** — heart button on each product card. Zustand store with a `Set<number>` of product IDs. Persisted to localStorage with custom serialization (native `Set` is not JSON-serializable). Sonner toast fires on add/remove. Favourite count shown in the navbar.

**Pagination** — 12 products per page. Page number stored in URL via nuqs. shadcn Pagination component with ellipsis for large page counts.

**URL state** — all active filters, sort, and page are reflected in the URL as query params (e.g. `?category=beauty&rating=4&sort=price-asc&page=2`). The page can be shared or refreshed and state is fully restored.

**Skeleton loading** — `ProductCardSkeleton` components shown during initial fetch matching the card layout exactly to prevent layout shift.

**Smooth page transitions** — `keepPreviousData: true` in React Query keeps the previous page's products visible while the next page loads, preventing a flash of empty content.

---

## DummyJSON API Constraints and How They Were Handled

This is the most important section for understanding the architecture decisions.

### Constraint 1 — No server-side rating filter

DummyJSON has no `?rating=` query parameter. There is no way to ask the API for "only products rated 4 stars and above."

**Problem this creates with pagination:** If you fetch page 3 (products 25–36) and then filter by rating ≥ 4 client-side, you might get 7 products that pass the filter out of 12. Page 4 might give 5. The count per page becomes unpredictable and pagination breaks completely.

**How it was handled:** When a rating filter is active, the endpoint switches to `limit=0` which returns all products (or all products in the selected category). The full dataset is then filtered client-side, sorted client-side, and finally sliced into pages of 12 client-side. This guarantees exactly 12 products per page (except the last page) and a correct total page count.

```
Rating filter OFF:  API paginates → 12 products → render
Rating filter ON:   API returns all → client filters → client sorts → client slices to 12 → render
```

### Constraint 2 — No combined category + sort on the API

The `/products/category/{slug}` endpoint does not support `sortBy` or `order` query params — they are silently ignored.

**How it was handled:** When a category is selected, sorting is always applied client-side via JavaScript `.sort()` after the API responds, regardless of whether a rating filter is active.

### Constraint 3 — No combined search + category

The `/products/search?q=` endpoint does not accept a category parameter. Since the requirements did not include a search feature, this endpoint was not used. The architecture is documented here in case search is added later — the recommended approach would be to fetch search results and apply category filtering client-side, or accept that search and category cannot be combined server-side.

### Constraint 4 — `total` field reflects unfiltered count

The `total` field in the API response always reflects the total number of products before any client-side transforms. When the rating filter is active and client-side pagination is used, the hook overrides `total` with the post-filter count before returning data to components. This ensures the pagination component calculates the correct number of pages.

---

## State Architecture

```
URL (nuqs)          → category, sort, rating, page
Zustand             → favourites (Set<number>), persisted to localStorage  
React Query cache   → server data, keyed by [category, sort, rating?, page?]
```

**Why nuqs for filters?** URL params make filter state shareable and browser-history-aware. Pressing Back restores the previous filter state. Refreshing the page restores filters. No additional persistence layer needed.

**Why Zustand for favourites?** Favourites are user preference state, not server state. They don't need to be in the URL. Zustand with the `persist` middleware and a custom localStorage adapter (to handle `Set` serialization) gives instant toggle response and cross-session persistence.

**Why two hooks consuming the same `useProductsQuery`?** `ProductsList` and `Pagination` both call `useProductsQuery()`. React Query deduplicates these — only one network request fires regardless of how many components consume the same query key. This avoids prop drilling or a shared context while keeping components self-contained.

---

## File Structure

```
src/
├── components/
│   ├── FilterSidebar/
│   │   ├── index.tsx          — sidebar shell, reset button
│   │   ├── CategoryFilter.tsx — checkbox list from API
│   │   └── RatingFilter.tsx   — 4★/3★ checkboxes
│   ├── ProductGrid/
│   │   ├── index.tsx          — grid wrapper, loading/empty states
│   │   ├── ProductCard.tsx    — image, category, rating, price, heart
│   │   └── ProductCardSkeleton.tsx
│   ├── SortBar/
│   │   └── index.tsx          — sort dropdown + result count
│   ├── Pagination/
│   │   └── index.tsx          — shadcn Pagination wired to nuqs page param
│   ├── Navbar.tsx
│   └── HeartButton.tsx        — favourite toggle with Sonner toast
├── hooks/
│   └── useCategoriesQuery.ts
├── query/
│   └── get-products.ts        — useProductsQuery, all endpoint + filter logic
├── store/
│   └── useFavourites.ts       — Zustand favourites store
├── lib/
│   └── searchParams.ts        — nuqs param definitions
├── types/
│   └── index.ts               — Product, ProductsResponse interfaces
├── constants/
│   └── index.ts               — RATINGS config
├── App.tsx
└── main.tsx                   — QueryClientProvider + NuqsAdapter
```

---

## Key Design Decisions

**Client-side pagination for rating filter** — trading one extra API call (fetching all instead of 12) for correctness. The alternative (server paginating then client filtering) produces inconsistent page sizes which breaks the pagination UI and confuses users.

**`keepPreviousData`** — prevents the product grid from going blank during page transitions. Old data stays visible until new data arrives, giving a smoother feel than a loading spinner on every page change.

**`staleTime: 60_000`** — product data is considered fresh for 60 seconds. Navigating between pages quickly reuses cached data without refetching. The category list uses `staleTime: Infinity` since it never changes.

**Resetting page to 1 on filter change** — every filter and sort change includes `page: 1` in the nuqs setter. Without this, changing a filter while on page 8 could result in an empty page if the filtered dataset has fewer than 8 pages.