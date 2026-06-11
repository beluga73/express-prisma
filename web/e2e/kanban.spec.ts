import { expect, test } from "@playwright/test";
import { loginAsDefaultUser } from "./utils/auth";

test("Kanban Board Functionality", async ({ page }) => {
  await loginAsDefaultUser(page);

  const taskName = "new task";

  // creating a task
  await page
    .getByTestId("column-todo")
    .getByRole("button", { name: "add a task" })
    .click();

  await page.getByRole("textbox", { name: "task title" }).fill(taskName);
  await page.getByRole("button", { name: "Add", exact: true }).click();

  await expect(
    page.getByTestId("column-todo").getByRole("button", { name: taskName }),
  ).toBeVisible();

  // drag a task
  const taskCard = page.getByRole("button", { name: "new task" });
  const progressColumn = page.getByTestId("column-in_progress");

  await taskCard.dragTo(progressColumn);

  await expect(
    progressColumn.getByRole("button", { name: "new task" }),
  ).toBeVisible();

  // delete a task
  await page.getByRole("button", { name: "Delete task", exact: true }).click();

  await expect(page.getByRole("button", { name: "new task" })).toBeHidden();
});
