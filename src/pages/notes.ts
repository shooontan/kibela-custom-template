/**
 * new page with note template
 * https://example.kibe.la/note_templates/1/notes/new
 */
import { selector } from '../constant';
import { logger } from '../libs/logger';
import { rewrite } from '../tokenizer';

const status = {
  count: [] as boolean[],
  get finish() {
    return !!this.count.length && this.count.every(Boolean);
  },
  add(s: boolean) {
    const max = 3;
    if (this.count.length >= max) {
      this.count.shift();
    }
    this.count.push(s);
  },
  clear() {
    this.count = [];
  },
};

function patch(input: HTMLInputElement) {
  const templateTitle = input.getAttribute('value') || '';
  const rewriteTitle = rewrite(templateTitle);
  logger.debug('template title'.padEnd(14), ':', templateTitle);
  logger.debug('rewrite title'.padEnd(14), ':', rewriteTitle);

  if (status.finish && templateTitle === rewriteTitle) {
    status.clear();
    return;
  }
  status.add(true);

  // HACK: update input value outside react
  const nativeInputValue = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value'
  );
  nativeInputValue?.set?.call(input, rewriteTitle);

  const event = new Event('input', {
    bubbles: true,
    cancelable: true,
  });
  input.dispatchEvent(event);
}

function run() {
  const input = document.querySelector<HTMLInputElement>(selector.input);
  if (!input) {
    logger.debug('title input is not found.');
    return;
  }

  const observer = new MutationObserver(() => {
    patch(input);
  });

  observer.observe(input, {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    childList: true,
    subtree: true,
  });

  patch(input);

  input.addEventListener('focus', () => {
    observer.disconnect();
  });
}

run();
