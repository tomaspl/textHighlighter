# TextHighlighter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.

## Setup

- Run `git clone https://github.com/tomaspl/textHighlighter` for download the project

- Go to textHighlighter folder : `cd textHighlighter`.

- Run `npm install` to install all the dependencies

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# textHighlighter

The textHighlighter component has a textarea where the user can write. This component receives as input a group of colours. With those colours the user can highlight the text has written. It's not allowed to highlight text that had been previously highlighted. Also the user can filter in other box the texts that had been highlighted with each one of the colours.

# selected-text.directive

The selected-text directive.

## Flow

![alt text](diagram.jpg)

### Highlight

As you can see in the diagram, the component receives as an input an arrangement with the configuration of the colors that will be, the name of the color and then its configuration in hexadecimal.

Then, once a color is selected and a portion of text is highlighted, the component issues the text that was highlighted and under which color it was made.

### Filter Highlight

The component emits the color that the user selects under which he wants to filter the highlighted texts under the same color.
Then, outside of the component, the logic of searching all the highlighted texts is made and applying the filter to pass the list of texts that are under the color selected as filter back to the component.

## Managment of state

For the managment of state of the application was used NgRx Store that provides reactive state management for Angular apps inspired by Redux. It unifies the events in your application and derive state using RxJS.

- Actions describe unique events that are dispatched from components and services.
- State changes are handled by pure functions called reducers that take the current state and the latest action to compute a new state.
- Selectors are pure functions used to select, derive and compose pieces of state.
- State is accessed with the Store, an observable of state and an observer of actions.

![alt text](redux_diagram.png)

## Models

Here is the model used for the state of the application. Over these structures work the reducer of the Redux Pattern

```sh
interface HighlightState {
  colourToHighlight: string;
  colourToFilterHighlights: string;
  selectionList: Array<ColourSelection>;
  filteredSelectionList: Array<ColourSelection>;
}

interface ColourSelection {
  colourText: string;
  text: string;
  htmlText: string;
}

```

This is the model of the colour configuration input for the component

```sh
interface ColourConfiguration {
  colour: string;
  caption: string;
}
```
