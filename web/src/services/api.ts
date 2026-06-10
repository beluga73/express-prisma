import createClient from "openapi-fetch";
import type { paths } from "@/types/api";

export const api = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
});

// Holds the current access token outside of mobx so the fetch middleware
// (which can't depend on AuthStore without a circular import) can read it.
export const authToken = { current: null as string | null };

api.use({
  onRequest({ request }) {
    if (authToken.current) {
      request.headers.set("Authorization", `Bearer ${authToken.current}`);
    }
    return request;
  },
});
