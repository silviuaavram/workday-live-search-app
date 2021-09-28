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

## Creating the initial UI

From the mockups, I was able to write my first test for the app, as I chose to develop it in a TDD manner. The test should check that the DOM contains a labelled input, a toggle button, and a list with no results. As part of the first round of tests, I also checked a loading message displayed until results are fetched, as well as an error message in case the results failed to fetch.

I used https://w3c.github.io/aria-practices/examples/combobox/combobox-autocomplete-none.html as a guide to build the search results markup, as well as writing the intial unit test.


After writing the test, I started to write the App logic until my test runs successfully. I used `React.useState` to hold the combobox logic for open state, highlighted item, input value and items. I also used an enumeration of states to render the appropriate UI depending on the state of the app (idle, error, loading).

As part of this task I also updated the `getData` to retrieve the email for each user according to the `Employee` type I was using in the App.
