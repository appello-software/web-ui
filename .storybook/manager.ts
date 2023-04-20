import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';
import { FORCE_RE_RENDER } from '@storybook/core-events';

export const lightTheme = create({
  base: 'light',
  brandImage: 'black-logo.svg',
});

export const darkTheme = create({
  base: 'dark',
  brandImage: 'white-logo.svg',
});

const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

function getColorScheme(matches: boolean) {
  return matches ? 'dark' : 'light';
}

const initTheme = getColorScheme(prefersDarkTheme.matches);

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

addons.setConfig({
  theme: themes[initTheme],
});

// Automatically switch light/dark theme based on system pref.
addons.register('auto-theme-switcher', api => {
  let lastTheme = initTheme;

  prefersDarkTheme.addEventListener('change', e => {
    const updatedTheme = getColorScheme(e.matches);

    if (updatedTheme !== lastTheme) {
      lastTheme = updatedTheme;
      api.setOptions({ theme: e.matches ? darkTheme : lightTheme });
      addons.getChannel().emit(FORCE_RE_RENDER);
    }
  });
});
