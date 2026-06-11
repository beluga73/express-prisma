import { expect, test } from "@playwright/test";

test("be able to sign up", async ({ page }) => {
  const randomEmail = `user-${Date.now()}@example.com`;

  await page.goto("/sign-up");
  await page.getByRole("textbox", { name: "name" }).fill("name");
  await page.getByRole("textbox", { name: "email" }).fill(randomEmail);
  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .fill(process.env.TEST_USER_PASSWORD!);
  await page
    .getByRole("textbox", { name: "confirm password" })
    .fill(process.env.TEST_USER_PASSWORD!);

  await page.getByRole("button", { name: "Sign up" }).click();

  await expect(page).toHaveURL("/");
});
