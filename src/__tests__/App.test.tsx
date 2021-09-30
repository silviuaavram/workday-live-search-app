import { DATA_SOURCE } from "src/data.utils";
import { dataCount } from "../../test/test-data";
import { server, rest } from "../../test/server";
import {
  renderApp,
  getInput,
  getList,
  getToggleButton,
  getLoadingMessage,
  getErrorMessage,
  focusInput,
  clickOnToggleButton,
  waitFor,
  blurInput,
  getOptions,
} from "../../test/test-utils";

test("shows loading text, then search input, toggle button and empty results list", async () => {
  const renderPromise = renderApp();

  expect(getLoadingMessage()).toBeInTheDocument();
  expect(getInput()).not.toBeInTheDocument();
  expect(getToggleButton()).not.toBeInTheDocument();
  expect(getList()).not.toBeInTheDocument();

  await renderPromise;

  expect(getLoadingMessage()).not.toBeInTheDocument();
  const input = getInput();
  const toggleButoon = getToggleButton();
  const list = getList();

  expect(input).toHaveAttribute("role", "combobox");
  expect(input).toHaveAttribute("aria-controls", "suggestions-list");
  expect(input).toHaveAttribute("aria-activedescendant");
  expect(input).toHaveAttribute("aria-controls", "suggestions-list");
  expect(input).toHaveAttribute("aria-expanded", "false");
  expect(input).toHaveAttribute("id", "search-box");

  expect(toggleButoon).toHaveAttribute("type", "button");
  expect(toggleButoon).toHaveAttribute("aria-expanded", "false");
  expect(toggleButoon).toHaveAttribute("aria-controls", "suggestions-list");
  expect(toggleButoon).toHaveAttribute("aria-label", "show results");
  expect(toggleButoon).toHaveAttribute("tabindex", "-1");

  expect(list).toHaveAttribute("id", "suggestions-list");
  expect(list?.childElementCount).toBe(0);
});

test("shows an error message if the options fetching was not performed", async () => {
  const testErrorMessage = "THIS IS A TEST FAILURE";
  server.use(
    rest.get(DATA_SOURCE, (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: testErrorMessage }));
    })
  );

  await renderApp();

  expect(getErrorMessage(testErrorMessage)).toBeInTheDocument();
});

test("shows the options on input focus", async () => {
  await renderApp();

  focusInput();

  expect(getOptions()).toHaveLength(dataCount);
});

test("hides the options on input blur", async () => {
  await renderApp();

  focusInput();
  blurInput();

  expect(getOptions()).toHaveLength(0);
});

test("button should toggle the open state of the list and focus the input on open", async () => {
  await renderApp();

  clickOnToggleButton();

  expect(getOptions()).toHaveLength(dataCount);
  await waitFor(() => expect(getInput()).toHaveFocus());

  clickOnToggleButton();

  expect(getOptions()).toHaveLength(0);
  expect(getInput()).not.toHaveFocus();
  expect(getToggleButton()).toHaveFocus();
});
