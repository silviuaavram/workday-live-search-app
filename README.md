# Peakon Live Search

## Bootstrapping the App and Installing Dependencies

Used `create-react-app` to create a running React app.
> `npx create-react-app workday-live-search-app`

On top, I have added `React Testing Library` for unit/integration testing, as well as `Typescript` support.

> `npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/dom typescript @types/node @types/react @types/react-dom @types/jest`

I renamed my `js` files to `ts` and restarted the development server, in order to allow `create-react-app` bootstrap Typescript.

Most of these steps were done as per `create-react-app` Readme.

Created a `.npmrc` file to disable the `package.lock` generation, as I am not interested in locking versions for my dependencies.

Removed the perf measurement file as it wasn't in scope for this project.

Created a new GitHub Repo for the project and pushed the initial changes.

Installed `msw` to avoid mocking `fetch` for the unit/integration tests. Using a fake server on the service worked is much better for testing as it provides more confidence.

> `npm install --save-dev msw`

## Creating the Initial UI

From the mockups, I was able to write my first test for the app, as I chose to develop it in a TDD manner. The test should check that the DOM contains a labelled input, a toggle button, and a list with no results. As part of the first round of tests, I also checked a loading message displayed until results are fetched, as well as an error message in case the results failed to fetch.

I used https://w3c.github.io/aria-practices/examples/combobox/combobox-autocomplete-none.html as a guide to build the search results markup, as well as writing the intial unit test.


After writing the test, I started to write the App logic until my test runs successfully. I used `React.useState` to hold the combobox logic for open state, highlighted item, input value and items. I also used an enumeration of states to render the appropriate UI depending on the state of the app (idle, error, loading).

As part of this task I also updated the `getData` to retrieve the email for each user according to the `Employee` type I was using in the App.

The styling I added for the app is minimal and does not reflect the mock-ups for two reasons: I don't know the exact values for the styles and it's too much time consuming, especially that the Acceptance Criteria does not mention the styling to match the mock-ups.

I also created a unit test in case the options fetch failed, so we will display an error message to the user, instead of the UI. Using `msw` I manipulated the request to return an error with a message specifically for this test. After writing the test and refactoring the data related implementation to support error handling, I decided to create a custom React hook to handle the data fetching for me, and return the status, error message and data.

## Opening the Dropdown List

After creating the initial UI I decided to handle the dropdown list show/hide part. I began by writing the unit test to show the list on input focus, and fixed the test by implementing the functionality.