# React-Hooks-State-Management-Alternatives...

A classic React TypeScript Todo App with alternative state management side by side.

[Demo](https://master.d39k33h7v1r5p9.amplifyapp.com/)

## Purpose:

For education and demonstrations to easily show alternative solutions for managing states, from component prop drilldown to global stores.

## Note:

This is a demo with several state solutions in the same App, which means that structures are not optimal in all parts and deviations from common patterns exist. But on the other hand, you probably won't combine Redux and MobX in this way (yes I Know about Mobdux :). There is even a branch for each alternative with a more optimized structure.

## Alternatives:

- Basic: [React State and Effect](https://reactjs.org/docs/hooks-intro.html) with classic component "Prop Drilling".
- Context: React [Context](https://reactjs.org/docs/context.html) and [Reducer](https://reactjs.org/docs/hooks-reference.html#usereducer) to pass data and actions through the
  components.
- [Redux](https://redux.js.org/): Store, Actions and Reducers to pass data and actions through
  components.
- [MobX State management](https://mobx.js.org/README.html): React Context as Store for [MobX-state-Tree ](https://github.com/mobxjs/mobx-state-tree) Models and Actions to pass
  data and actions through components.

## Commands

The App is based on [create-react-app](https://github.com/facebook/create-react-app)

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test` or `yarn test`

Runs Jest Tests
