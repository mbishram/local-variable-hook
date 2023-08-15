# Persist Local Variable

React package to make local variable persist on multiple session.

## Getting Started

### Instalation

```
// Yarn
yarn add --dev persist-local-variable

// NPM
npm install --save-dev persist-local-variable
```

### Usage

```typescript jsx
import {
  usePersistLocalVariable,
  set,
  remove,
  get,
} from "persist-local-variable";

const App = () => {
  // Call this hook in the app root
  usePersistLocalVariable();

  return (
    <>
      <button onClick={() => set("Test Data")}>Set</button>
      <button onClick={() => remove()}>Remove</button>
      <button onClick={() => console.log(get())}>Show</button>
    </>
  );
};
```
