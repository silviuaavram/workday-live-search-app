## Development process

### Bootstrapping the App and Installing Dependencies

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