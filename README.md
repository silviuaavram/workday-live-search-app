# Peakon Live Search

## Setup

Clone the repository and install the dependencies:
```bash
git clone https://github.com/silviuaavram/workday-live-search-app.git
cd workday-live-search-app
npm install
```

Run the app in development mode:
```bash
npm run start
```

Run unit tests:
```bash
npm t
```

## Bootstrapping the App and Installing Dependencies

Used `create-react-app` to create a running React app.
```bash
npx create-react-app workday-live-search-app
```

On top, I have added `React Testing Library` for unit/integration testing, as well as `Typescript` support.

```
npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/dom typescript @types/node @types/react @types/react-dom @types/jest`
```

I renamed my `js` files to `ts` and restarted the development server, in order to allow `create-react-app` bootstrap Typescript.

Most of these steps were done as per `create-react-app` Readme.

Created a `.npmrc` file to disable the `package.lock` generation, as I am not interested in locking versions for my dependencies.

Removed the perf measurement file as it wasn't in scope for this project.

Created a new GitHub Repo for the project and pushed the initial changes.

Installed `msw` to avoid mocking `fetch` for the unit/integration tests. Using a fake server on the service worked is much better for testing as it provides more confidence.

```
npm install --save-dev msw
```

## Creating the Initial UI

From the mockups, I was able to write my first test for the app, as I chose to develop it in a TDD manner. The test should check that the DOM contains a labelled input, a toggle button, and a list with no results. As part of the first round of tests, I also checked a loading message displayed until results are fetched, as well as an error message in case the results failed to fetch.

I used https://w3c.github.io/aria-practices/examples/combobox/combobox-autocomplete-none.html as a guide to build the search results markup, as well as writing the intial unit test.


After writing the test, I started to write the App logic until my test runs successfully. I used `React.useState` to hold the combobox logic for open state, highlighted item, input value and items. I also used an enumeration of states to render the appropriate UI depending on the state of the app (idle, error, loading).

As part of this task I also updated the `getData` to retrieve the email for each user according to the `Employee` type I was using in the App.

The styling I added for the app is minimal and does not reflect the mock-ups for two reasons: I don't know the exact values for the styles and it's too much time consuming, especially that the Acceptance Criteria does not mention the styling to match the mock-ups.

I also created a unit test in case the options fetch failed, so we will display an error message to the user, instead of the UI. Using `msw` I manipulated the request to return an error with a message specifically for this test. After writing the test and refactoring the data related implementation to support error handling, I decided to create a custom React hook to handle the data fetching for me, and return the status, error message and data.

## Opening the Dropdown List

After creating the initial UI I decided to handle the dropdown list show/hide part. I began by writing the unit test to show the list on input focus, and fixed the test by implementing the functionality. Next was closing the menu on input blur. Futhermore, I continued with the toggle button click, which should open and close the list. I also focused the input after the button click that opened the menu, for accessibility and usability reasons.

I was forced to use the `toggleButtonClickedRef` because without it, with input focused and menu opened, clicking the toggle button would blur the input, close the menu (as a result of input blur), then the click handler that changed the state to `!isOpen` would think that it has to open the menu, which resulted in opening the menu immediately after close. The `ref` logic introduced helped me tackle this specific use case.

## Highlighting the Options

The next feature developed was showing and scrolling into view the options that were highlighted with either the mouse or by keyboard up/down and home/end. Using the `highlightedIndex` state value I applied a class to the highlighted option, as well as changed the `aria-selected` and `aria-activedescendant` values in the combobox. I used `scrollIntoView` to scroll the options into view, only if the highlight change comes from keyboard. If I highlight by mouse, I do not scroll, and used another `ref` related logic to implement this use case. There are better libraries out there that scroll way better than my implementation, but for this assignment I did not want to use any, and I think that by covering this use case, the widget performs well enough.
## Selecting from Options

Second to last feature was actually selecting a value from the options by click or by hitting Enter with the option highlighted. As a consequence of the selection, the input value became the `name` of the selected user.

## Filtering by Input Value

The last feature implemented was the actual filtering of the options by the value in the input. I kept the filtered options in the `users` and filter according to the `inputValue` only when the unfiltered users or the input value change. Used `React.useMemo` for this scenario, and although in this specific case it's probably an overkill, when there are many options and the filtering logic is complicated, computing the options on every render may hurt performance.

## Final Thoughts

I did not spend time to dig into how to make `jest` to understand absolute paths when running tests, and chose to live with `../../test/..` and with `react-scripts`.
There are also some scenarios I did not take into account to implement, like opening the menu with option highlighted on ArrowDown/ArrowUp from input, with menu closed, or closing the menu on Escape. This was due to the lack of time and acceptance criteria. As far as issues are concerned, I hope that whatever it is that I wanted to cover with unit tests has no bugs, but there may be bugs related to scenarios I did not consider to unit test.

Overall implementation time for the project was around 11 hours.