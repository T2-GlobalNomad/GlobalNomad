import { page, server } from '@vitest/browser/context';
import { g as getByTitleSelector, a as getByTextSelector, b as getByPlaceholderSelector, c as getByAltTextSelector, d as getByTestIdSelector, e as getByRoleSelector, f as getByLabelSelector } from '../public-utils-J4vwTaki.js';
import { s as selectorEngine, L as Locator } from '../index-fqTesRIH.js';
import 'vitest/utils';

page.extend({
  getByLabelText(text, options) {
    return new PlaywrightLocator(getByLabelSelector(text, options));
  },
  getByRole(role, options) {
    return new PlaywrightLocator(getByRoleSelector(role, options));
  },
  getByTestId(testId) {
    return new PlaywrightLocator(getByTestIdSelector(server.config.browser.locators.testIdAttribute, testId));
  },
  getByAltText(text, options) {
    return new PlaywrightLocator(getByAltTextSelector(text, options));
  },
  getByPlaceholder(text, options) {
    return new PlaywrightLocator(getByPlaceholderSelector(text, options));
  },
  getByText(text, options) {
    return new PlaywrightLocator(getByTextSelector(text, options));
  },
  getByTitle(title, options) {
    return new PlaywrightLocator(getByTitleSelector(title, options));
  },
  elementLocator(element) {
    return new PlaywrightLocator(
      selectorEngine.generateSelectorSimple(element),
      element
    );
  }
});
class PlaywrightLocator extends Locator {
  constructor(selector, _container) {
    super();
    this.selector = selector;
    this._container = _container;
  }
  locator(selector) {
    return new PlaywrightLocator(`${this.selector} >> ${selector}`, this._container);
  }
  elementLocator(element) {
    return new PlaywrightLocator(
      selectorEngine.generateSelectorSimple(element),
      element
    );
  }
}
