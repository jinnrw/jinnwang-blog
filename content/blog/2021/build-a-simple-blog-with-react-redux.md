---
date: "2021-01-26"
title: "Build a simple blog with React Redux"
description: "Build a simple blog with React Redux "
tags: ["React", Redux", "TailwindCSS"]
---

In this post, we'll create a simple blog, using React Redux, that allows users to add and delete posts. The source code of this project is in my GitHub [repo](https://github.com/jinnrw/react-redux-testing-with-enzyme). The main focus of this post is to introduce Redux and how it integrates with a React application, you can look up the source code for details.  

#### Table of Contents
- Setup A React app
- Setup Redux structure (store, action, reducer)
- Create connected components
- Styling using Tailwind CSS

#### Setup A React app

To create a React app, we first use the `create-react-app` starter. Then install `redux` , and`react-redux` to integrate Redux to our React app.

```jsx
npx create-react-app my-app
npm install redux react-redux
```

#### Setup Redux structure (store, reducers, actions)

There are three main components in Redux, store, reducers and actions.

**File structure**

```markdown
|-- store
	|-- index.js
|-- reducers
	|-- index.js (export combineReducers)
	|-- posts
			|-- index.js
|-- actions
	|-- index.js
	|-- types.js
```

**Store**

First, we need to create a store and pass in `RootReducer`, a single reducing function created within the reducers/index.js.

```jsx
// store/index.js
import { createStore } from 'redux';
import RootReducer from '../reducers';

export const store = createStore(RootReducer)
```

**Reducers**

Reducer is a function that takes state and action as arguments, and returns the next state of the app. 

We use the `combineReducers` method to return a single reducer function, the one we passed in createStore earlier. It returns an object which contains all the reducers used in our app. 

> The `combineReducers` helper function turns an object whose values are different reducing functions into a single reducing function you can pass to `createStore`. The resulting reducer calls every child reducer, and gathers their results into a single state object.  
> -- Redux api

Next, we'd like to store all the posts data in order to show in the UI, we do this by creating a posts reducer which returns a state based on `action.type` , along with some initial states and functions.

```jsx
// reducers/index.js
import { combineReducers } from 'redux';
import posts from './posts';

export default combineReducers({
    posts
});

//reducers/posts/index.js
import { types } from "../../actions/types";

const INITIAL_STATE = [
  {
    id: ...,
    title: ...,
    body: ...,
  },
];

const addPost = (state, post) => {
  const newState = [...state];
  const newPost = { ...post, id: state.length + 1 };
  newState.push(newPost);
  // Sort by id descending
  newState.sort((a, b) => b.id - a.id);
  return newState;
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_POST:
      return addPost(state, action.payload);
    default:
      return state;
  }
};
```

##### Actions

An action is a plain JavaScript object to describe something that happened in the application. In our example, when adding a post, we dispatch an action, `addPost` , which describes a new post has been added, and passes the post data in payload property. Note that `addPost` is actually an action creator, which is a function returns an action object.   

```jsx
// actions/index.js
import { types } from "./types";

export const addPost = (post) => ({
  type: types.ADD_POST,
  payload: post,
});

// actions/types.js
export const types = {
  ADD_POST: 'addPost'
};
```

#### Create connected components

To integrate Redux in our React application, we first wrap our `<App>` component with `<Provider>`, and pass the store that we created earlier as a prop. Now, the entire `<App>` component can read data from a Redux store, and dispatch actions to the store to update data.

```jsx
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
```

**Connecting the Components**

In any of the React components, if you want to read states from the Redux store or get new states when store updates, you need to subscribe. React Redux provides a `connect` function to do this for us. The `mapStateToProps` returns the data we need in this component, and the `mapDispatchToProps` is an object full of action creators.

> mapStateToProps  
> called every time the store state changes. It receives the entire store state, and should return an object of data this component needs.  
> 
> mapDispatchToProps  
> this parameter can either be a function, or an object.  
> If it’s a function, it will be called once on component creation. It will receive dispatch as an argument, and should return an object full of functions that use dispatch to dispatch actions.  
> If it’s an object full of action creators, each action creator will be turned into a prop function that automatically dispatches its action when called. Note: We recommend using this “object shorthand” form.  
> -- React Redux api

**Posts Component**

We only read states in this component, so we can skip `mapDispatchToProps`.

```jsx
// Posts.js
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
export default connect(mapStateToProps)(Posts);
```

**AddPost Component**

In this component, we dispatch an action when the 'Add' button is clicked, so add addPost in `mapDispatchToProps`, and pass null as `mapStateToProps` cause we don't need to read any state.

```jsx
// AddPost.js
import { addPost } from "../../actions";
...
const mapDispatchToProps = { addPost };
export default connect(null, mapDispatchToProps)(AddPost);
```

#### Styling

We now have the basic app running, last thing to do is to style it to look better. We are going to use Tailwind CSS, a CSS framework. It fundamentally changes the way CSS is used to style. Instead of declaring semantic class names and adding CSS properties within, with this new approach, you just need to declare the pre-defined class names and not worry about how to maintain the stylesheets.

To give you an example, if we want to style an element with some height, margin, border, background-color properties.

```html
<!-- Instead of this -->
<div class="container"></div>
<style>
  .container {
    margin-bottom: 1.25rem;
    height: 10rem;
    border-width: 1px;
    border-color: rgba(209, 213, 219);
    background-color: rgba(243, 244, 246);
  }
</style>

<!-- Do this -->
<div class="mb-5 h-40 border border-gray-300 bg-gray-100"></div>
```

Another advantage which I found is incredibly useful, is how easily a styled component can be shared and reused. Since most of the css rules are embedded in the class names, everything you see in the HTML also gives you the information on how it's been styled.   
There's an open source Tailwind community, [tailwindcomponents](https://tailwindcomponents.com/), provides UI components and templates created by users. 

#### Wrapping up

I hope this post gives you a basic understanding on how React and Redux work.  
Thanks for reading!
