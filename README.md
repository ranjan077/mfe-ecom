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
  shared/          @shared/components – shared cart events, types and storage helpers
```

The apps are wired together with Module Federation (`@module-federation/vite`).
`products` exposes `./ProductList`, `cart` exposes `./Cart`, and `host` consumes
both from their `remoteEntry.js`. React and React DOM are shared singletons.

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
