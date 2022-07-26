# pen-to-todojst

App that converts handwritten shopping-list into todoist-task list

- Written in React
- Is PWA ready (installable)
- Communication with google-vision-api and todoist-api is handled through [pen-to-todoist](https://github.com/niilz/pen-to-todoist) wasm-module

## How to use

- Ensure that a compiled wasm-pack-module (target web without webpack) named `pkg` is placed in the root folder.
- Because there is no webpack, React portions are compiled with babel. To do so run `npx babel --watch src --out-dir ./babel` in the root folder.
- To start frontend run `npx serve .`
- Notice the react-dependecies and the babel-config in the `package.json`. Without those babel will try to cross-compile more than necessary.
