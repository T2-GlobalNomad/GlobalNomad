import { page, server, userEvent } from '@vitest/browser/context';
import { g as getByTitleSelector, a as getByTextSelector, b as getByPlaceholderSelector, c as getByAltTextSelector, d as getByTestIdSelector, e as getByRoleSelector, f as getByLabelSelector, h as getElementError } from '../public-utils-J4vwTaki.js';
import { s as selectorEngine, L as Locator, c as convertElementToCssSelector } from '../index-fqTesRIH.js';
import 'vitest/utils';

page.extend({
  getByLabelText(text, options) {
    return new PreviewLocator(getByLabelSelector(text, options));
  },
  getByRole(role, options) {
    return new PreviewLocator(getByRoleSelector(role, options));
  },
  getByTestId(testId) {
    return new PreviewLocator(getByTestIdSelector(server.config.browser.locators.testIdAttribute, testId));
  },
  getByAltText(text, options) {
    return new PreviewLocator(getByAltTextSelector(text, options));
  },
  getByPlaceholder(text, options) {
    return new PreviewLocator(getByPlaceholderSelector(text, options));
  },
  getByText(text, options) {
    return new PreviewLocator(getByTextSelector(text, options));
  },
  getByTitle(title, options) {
    return new PreviewLocator(getByTitleSelector(title, options));
  },
  elementLocator(element) {
    return new PreviewLocator(
      selectorEngine.generateSelectorSimple(element),
      element
    );
  }
});
class PreviewLocator extends Locator {
  constructor(_pwSelector, _container) {
    super();
    this._pwSelector = _pwSelector;
    this._container = _container;
  }
  get selector() {
    const selectors = this.elements().map((element) => convertElementToCssSelector(element));
    if (!selectors.length) {
      throw getElementError(this._pwSelector, this._container || document.body);
    }
    return selectors.join(", ");
  }
  click() {
    return userEvent.click(this.element());
  }
  dblClick() {
    return userEvent.dblClick(this.element());
  }
  tripleClick() {
    return userEvent.tripleClick(this.element());
  }
  hover() {
    return userEvent.hover(this.element());
  }
  unhover() {
    return userEvent.unhover(this.element());
  }
  async fill(text) {
    return userEvent.fill(this.element(), text);
  }
  async upload(file) {
    return userEvent.upload(this.element(), file);
  }
  selectOptions(options_) {
    return userEvent.selectOptions(this.element(), options_);
  }
  clear() {
    return userEvent.clear(this.element());
  }
  locator(selector) {
    return new PreviewLocator(`${this._pwSelector} >> ${selector}`, this._container);
  }
  elementLocator(element) {
    return new PreviewLocator(
      selectorEngine.generateSelectorSimple(element),
      element
    );
  }
}
