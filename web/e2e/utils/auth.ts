import type { Page } from "@playwright/test";

export async function loginAsDefaultUser(page: Page) {
  await page.goto("/sign-in");
  await page
    .getByRole("textbox", { name: "email" })
    .fill(process.env.TEST_USER_EMAIL!);
  await page
    .getByRole("textbox", { name: "password" })
    .fill(process.env.TEST_USER_PASSWORD!);
  await page.getByRole("button", { name: "Sign in" }).click();

  // Ensure the login process finishes before handing control back to the test
  await page.waitForURL("/");
}
