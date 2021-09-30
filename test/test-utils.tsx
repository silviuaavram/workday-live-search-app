import {
  render,
  RenderResult,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../src/App";

export const getInput = () =>
  screen.queryByLabelText("Manager", { selector: "input" });
export const getList = () =>
  screen.queryByRole("listbox", { name: "suggestions list" });
export const getToggleButton = () =>
  screen.queryByRole("button", { name: /show|hide results/ });
export const getOptions = () => screen.queryAllByRole("option");
export const getLoadingMessage = () =>
  screen.queryByText("Loading ...", { selector: "[role=alert]" });
export const getErrorMessage = (message: string) =>
  screen.queryByText(`Error retrieving the users: ${message}`, {
    selector: "[role=alert]",
  });
export const focusInput = () => {
  fireEvent.focus(getInput());
};
export const blurInput = () => {
  fireEvent.blur(getInput());
};
export const clickOnToggleButton = () => {
  userEvent.click(getToggleButton());
};

export async function renderApp(): Promise<RenderResult> {
  const utils = render(<App />);

  await waitFor(() => expect(getLoadingMessage()).not.toBeInTheDocument());

  return {
    ...utils,
  };
}

export * from "@testing-library/react";
