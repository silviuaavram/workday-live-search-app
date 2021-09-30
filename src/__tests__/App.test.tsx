import { DATA_SOURCE } from "src/data.utils";
import { dataCount, data } from "../../test/test-data";
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
  hoverOption,
  getOption,
  arrowDownOnInput,
  arrowUpOnInput,
  homeOnInput,
  endOnInput,
  clickOnOption,
  enterOnInput,
  typeInInput,
} from "../../test/test-utils";

window.HTMLElement.prototype.scrollIntoView = jest.fn();

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
  expect(input).toHaveAttribute("aria-activedescendant", "");
  expect(input).toHaveAttribute("aria-controls", "suggestions-list");
  expect(input).toHaveAttribute("aria-expanded", "false");
  expect(input).toHaveAttribute("id", "search-box");
  expect(input).toHaveAttribute("aria-autocomplete", "list");
  expect(input).toHaveAttribute("autocomplete", "off");

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
  expect(getInput()).toHaveAttribute("aria-expanded", "true");
  expect(getToggleButton()).toHaveAttribute("aria-expanded", "true");
  expect(getToggleButton()).toHaveAttribute("aria-label", "hide results");
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

test("option hovered by mouse should become active", async () => {
  const highlightedIndex = 1;
  await renderApp();

  focusInput();
  hoverOption(highlightedIndex);

  expect(getOption(highlightedIndex)).toHaveAttribute("aria-selected", "true");
  expect(getInput()).toHaveAttribute(
    "aria-activedescendant",
    data.data[highlightedIndex].id
  );
});

test("options should become active depending on the key pressed", async () => {
  await renderApp();

  focusInput();
  arrowDownOnInput();

  expect(getOption(0)).toHaveAttribute("aria-selected", "true");
  expect(getInput()).toHaveAttribute("aria-activedescendant", data.data[0].id);

  arrowDownOnInput();

  expect(getOption(1)).toHaveAttribute("aria-selected", "true");
  expect(getOption(0)).toHaveAttribute("aria-selected", "false");
  expect(getInput()).toHaveAttribute("aria-activedescendant", data.data[1].id);

  arrowUpOnInput();

  expect(getOption(0)).toHaveAttribute("aria-selected", "true");
  expect(getOption(1)).toHaveAttribute("aria-selected", "false");
  expect(getInput()).toHaveAttribute("aria-activedescendant", data.data[0].id);

  arrowUpOnInput();

  expect(getOption(dataCount - 1)).toHaveAttribute("aria-selected", "true");
  expect(getOption(0)).toHaveAttribute("aria-selected", "false");
  expect(getInput()).toHaveAttribute(
    "aria-activedescendant",
    data.data[dataCount - 1].id
  );

  arrowUpOnInput();

  expect(getOption(dataCount - 2)).toHaveAttribute("aria-selected", "true");
  expect(getOption(dataCount - 1)).toHaveAttribute("aria-selected", "false");
  expect(getInput()).toHaveAttribute(
    "aria-activedescendant",
    data.data[dataCount - 2].id
  );

  homeOnInput();

  expect(getOption(0)).toHaveAttribute("aria-selected", "true");
  expect(getOption(dataCount - 2)).toHaveAttribute("aria-selected", "false");
  expect(getInput()).toHaveAttribute("aria-activedescendant", data.data[0].id);

  endOnInput();

  expect(getOption(dataCount - 1)).toHaveAttribute("aria-selected", "true");
  expect(getOption(0)).toHaveAttribute("aria-selected", "false");
  expect(getInput()).toHaveAttribute(
    "aria-activedescendant",
    data.data[dataCount - 1].id
  );

  expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(7);
});

test('should select an option by click', async () => {
  const itemIndex = 1
  await renderApp()

  focusInput()
  clickOnOption(itemIndex)

  expect(getInput()).toHaveValue(data.data[itemIndex].attributes.name)
})

test('should select an option by hitting enter with the option highlighted', async () => {
  const itemIndex = 1
  await renderApp()

  focusInput()
  hoverOption(itemIndex)
  enterOnInput()

  expect(getInput()).toHaveValue(data.data[itemIndex].attributes.name)
})

test('should filter the options by input value', async () => {
  await renderApp()
  
  focusInput()
  typeInInput('tMc')

  expect(getOptions()).toHaveLength(1)
})
