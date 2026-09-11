# Microfrontend E-commerce POC

A proof of concept for an e-commerce application built with microfrontends,
managed as a [Turborepo](https://turborepo.com) monorepo using npm workspaces.

## Structure

```
apps/
  host/            Shell application that composes and loads the microfrontends (:3000)
  products/        Products MFE – product catalog and details (:3001)
  cart/            Cart MFE – shopping cart and selected products (:3002)
packages/
  shared/          @shared/components – cart slice, store factory and typed hooks
```

The apps are wired together with Module Federation (`@module-federation/vite`).
`products` exposes `./ProductList`, `cart` exposes `./Cart`, and `host` consumes
both from their `remoteEntry.js`.

### Shared state

The host owns a single Redux Toolkit store (`apps/host/src/store.ts`) and provides
it above the router, so both remotes read and dispatch against it with no props.
The cart slice, store factory and typed hooks live in `@shared/components` — not
in the host — so remotes never depend on the host and can still run standalone.

`react`, `react-dom` and **`react-redux`** are shared singletons. `react-redux`
must stay a singleton: it creates its context at module scope, so a second copy
in the page gives the remotes a different context object than the host's
`<Provider>` and they throw on mount. Keep the `shared` block identical in all
three `vite.config.ts` files.

Each remote's `main.tsx` builds its own store for standalone dev; the exposed
`App.tsx` deliberately contains no `<Provider>`, so there is exactly one store
whether the app runs standalone or federated. State is in-memory, so the cart
resets on a page refresh.

## Getting started

```bash
npm install          # installs every workspace from the root
npm run dev          # starts host, products and cart together
```

Then open http://localhost:3000.

> The host loads the remotes over HTTP, so `products` and `cart` must be running
> for their routes to render. `npm run dev` starts all three.

## Commands

Run from the repo root:

| Command             | Description                                        |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start all dev servers in parallel                  |
| `npm run build`     | Type-check and build every app                     |
| `npm run lint`      | Lint every workspace with oxlint                   |
| `npm run typecheck` | Type-check without building                        |
| `npm run preview`   | Build, then serve the production output            |
| `npm run clean`     | Remove build output, caches and `node_modules`     |

### Targeting a single workspace

```bash
npx turbo run dev --filter=products     # only the products MFE
npx turbo run build --filter=host       # only the host
npx turbo run build --filter=...^cart   # cart and everything it depends on
```

## Adding a dependency

```bash
npm install <pkg> --workspace=products          # to one app
npm install <pkg> --workspace=@shared/components
npm install <pkg> -D -w                         # to the root (tooling only)
```

## Caching

Turborepo caches `build`, `lint` and `typecheck` results in `.turbo/`, so
unchanged workspaces are skipped on reruns. To share the cache across machines
and CI, connect [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching):

```bash
npx turbo login
npx turbo link
```
