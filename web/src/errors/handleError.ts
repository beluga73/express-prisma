import { toast } from "sonner";
import { ERRORS, type ErrorDefinition, type ErrorStrategy } from "./catalog";
import type { ApiError } from "@/types/schema";

const strategies: Record<ErrorStrategy, (definition: ErrorDefinition) => void> =
  {
    toast: (definition) => toast.error(definition.message),
    silent: () => {},
  };

const isKnownErrorCode = (code: string): code is keyof typeof ERRORS =>
  code in ERRORS;

// Generic reaction for any ApiError. Codes we recognize get their catalog
// strategy (usually a toast); anything else falls back to a generic toast so
// errors are never silently swallowed. Components that need bespoke handling
// (inline messages, retries, etc.) can read the error off the store directly
// instead of relying on this.
export function handleError(error: ApiError | null | undefined) {
  if (!error) return;

  const definition = isKnownErrorCode(error.code)
    ? ERRORS[error.code]
    : ERRORS.UNKNOWN_ERROR;

  strategies[definition.strategy](definition);
}
