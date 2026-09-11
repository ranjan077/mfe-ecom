import { createAppStore } from "@shared/components";

/**
 * The one store instance for the composed application. The host owns it because
 * the host is the only participant guaranteed to exist exactly once.
 *
 * Remotes never import this — they read the store through the <Provider> in
 * App.tsx. Their own standalone entries build a separate store of their own.
 */
export const store = createAppStore();
