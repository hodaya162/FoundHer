const MINIMUM_ADMIN_PASSWORD_LENGTH = 12;

export type PasswordValidationResult =
  | { readonly valid: true }
  | { readonly valid: false; readonly error: "missing" | "mismatch" | "too_short" };

export function validateAdminPassword(password: string, confirmation: string): PasswordValidationResult {
  if (!password || !confirmation) return { valid: false, error: "missing" };
  if (password !== confirmation) return { valid: false, error: "mismatch" };
  if (password.length < MINIMUM_ADMIN_PASSWORD_LENGTH) return { valid: false, error: "too_short" };
  return { valid: true };
}

export { MINIMUM_ADMIN_PASSWORD_LENGTH };

