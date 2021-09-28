import {
  renderApp,
  getInput,
  getList,
  getToggleButton,
  getLoadingMessage,
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

  expect(list).toHaveAttribute('id', 'suggestions-list');
  expect(list?.childElementCount).toBe(0);
});
