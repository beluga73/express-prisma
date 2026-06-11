import { test, expect } from "@playwright/test";

test("be able sign in", async ({ page }) => {
  await page.goto("/sign-in");
  await page
    .getByRole("textbox", { name: "email" })
    .fill(process.env.TEST_USER_EMAIL!);
  await page
    .getByRole("textbox", { name: "password" })
    .fill(process.env.TEST_USER_PASSWORD!);
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL("/");
});

test("show error message if invalid credentials", async ({ page }) => {
  await page.goto("/sign-in");
  await page
    .getByRole("textbox", { name: "email" })
    .fill(process.env.TEST_USER_EMAIL!);
  await page
    .getByRole("textbox", { name: "password" })
    .fill(process.env.TEST_USER_PASSWORD! + "wrong");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL("/sign-in");
  await expect(page.getByText("Invalid email or password")).toBeVisible();
});
