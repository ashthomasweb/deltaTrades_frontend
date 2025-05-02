# Testing

## Unit/Component tests

These tests are run with `vitest` and `jsdom` using `testing-library` matchers and helpers.

By default, vitest will execute all files that match this pattern:

```ts
**/*.{test,spec}.?(c|m)[jt]s?(x)
```

Essentially, all the `*.test.ts(x)` or `*.spec.ts(x)` files. Name any file with this schema anywhere in the project to include it in the test suite.

Execute all tests with:

```sh
npm test
```

Or one file at a time with:

```sh
npm test -- ../path/to/file.test.ts
```

To isolate a single test, go into the test file and add an `only` call to the desired test:

```ts
it.only('should do a thing', () => {})
```

### Coverage

Coverage is automatically collected and reported when using `npm test` to execute tests. The terminal will output a simple table showing coverage values for all files in the `src/` directory. This will also show which specific lines are uncovered, as well as statements, branches, functions, and lines percentage coveraged.

Additionally, a `coverage/` directory is created at the project root. Open the `index.html` file inthe browser for an extensive report in a GUI.

Currently, no coverage metrics are enforced on the repository level.

### CI

PRs run all tests in the suite and report their status checks to the PR. After PR merge, the tests are run again to ensure a green build.
