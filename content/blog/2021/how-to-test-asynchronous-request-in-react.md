---
date: "2021-02-12"
title: "How to Test Asynchronous Request in React"
description: "Build a mini blog with React Redux "
tags: ["React", Jest", "Promise"]
---

In this post, we'll learn the followings.
- How to test asynchronous request in the React `componentDidMount` lifecycle.
- How to test async code in Jest to avoid the false positive problem if Jest doesn't know it should wait for the test to end.
- How to test if request data have been set in our component state

Source code can be found in my [codesandbox](https://codesandbox.io/s/mocking-async-requests-using-axios-0e0ef?file=/src/App.test.js).

## Mock async request in axios

Steps:

- Import `axios` from the node_modules
- Use `jest.spyOn` to override theget method with our own mock function, req
- The req function returns a `Promise` which will return some data after 1 second

```js
// App.test.js
import axios from "axios"

function req() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ data: [] })
    }, 1000)
  })
}

describe("test async request", () => {
  jest.spyOn(axios, "get").mockImplementation(req)
})
```

## Test componentDidmount lifecycle

Since we perform an async request in componentDidMount , we'll make it an async function in order to test it.

```js
  // App.js
  async componentDidMount() {
    let res = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({ users: res.data });
  }
```

Next, we test if `axios.get` have been called after componentDidmount resolved.

```js
// App.test.js
it("should call axios.get in componentDidMount", () => {
  return wrapper
    .instance()
    .componentDidMount()
    .then(() => {
      expect(axios.get).toHaveBeenCalled()
    })
})
```

<div class="block-hint">It is important to return the assertion, otherwise Jest would not know it's an async operation, the simplest way to let Jest know is to return the Promise object, and test in the .then callback.</div>

## Test if component state has been updated

Lastly, to verify if the received data has been passed in our compoent state, we use Jest .toHaveProperty method, to check if property and values are expected.

```js
it("should update state with api data", () => {
  return wrapper
    .instance()
    .componentDidMount()
    .then(() => {
      expect(wrapper.state()).toHaveProperty("users", mockRes.data)
    })
})
```

## More reads

[How to Test Asynchronous Code with Jest](https://app.pluralsight.com/guides/test-asynchronous-code-jest)
