# @appello/web-ui

React UI library of components and modules. Designed by [Appello](https://appello.com.au/).

<a href="https://www.npmjs.com/package/@appello/web-ui">
  <img alt="npm version" src="https://img.shields.io/npm/v/@appello/web-ui.svg?style=flat-square" />
</a>
<a href="https://www.npmjs.com/package/@appello/web-ui">
  <img alt="npm downloads" src="https://img.shields.io/npm/dm/@appello/web-ui.svg?style=flat-square" />
</a>

## Installation

```bash
# using npm
npm install @appello/web-ui
# using pnpm
pnpm install @appello/web-ui
# using yarn
yarn add @appello/web-ui
```

**IMPORTANT:** These icons should be in `src/view/assets/icons`: calendar.svg, down-arrow.svg, close.svg,magnifier.svg, bell.svg, polygon.svg, check.svg, eye.svg, eye-crossed.svg, document.svg

## Basic usage

```tsx
import '@appello/web-ui/dist/index.css';
*
import React from 'react';
import {
  AppelloKit,
  AppelloKitComponents,
  AppelloKitComponentsProvider,
  AppelloKitProvider,
} from '@appello/web-ui';

const defaultTheme: AppelloKit = {
  pageSize: 10,
  debounceDelay: 500,
  dateFormat: 'dd/MM/yyyy',
};

const defaultComponentProps: AppelloKitComponents = {
  PhotoField: {
    photoPlaceholder: 'https://via.placeholder.com/150',
  },
};

root.render(
  <AppelloKitProvider value={defaultTheme}>
    <AppelloKitComponentsProvider value={defaultComponentProps}>
      <App />
    </AppelloKitComponentsProvider>
  </AppelloKitProvider>,
);
```

## `AppelloKit` interface

| Property        | Type   | Description                                                         |
| --------------- | ------ | ------------------------------------------------------------------- |
| `pageSize`      | number | The number of items to display per page                             |
| `debounceDelay` | number | The delay time (in milliseconds) before triggering a search request |
| `dateFormat`    | string | The format for displaying dates within the application              |
