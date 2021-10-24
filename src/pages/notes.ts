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

function patch(textarea: HTMLTextAreaElement) {
  const templateTitle = textarea.value || '';
  const rewriteTitle = rewrite(templateTitle);
  logger.debug('template title'.padEnd(14), ':', templateTitle);
  logger.debug('rewrite title'.padEnd(14), ':', rewriteTitle);

  if (status.finish && templateTitle === rewriteTitle) {
    status.clear();
    return;
  }
  status.add(true);

  // HACK: update textarea value outside react
  const nativeTextareaValue = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
    'value'
  );
  nativeTextareaValue?.set?.call(textarea, rewriteTitle);

  const event = new Event('input', {
    bubbles: true,
    cancelable: true,
  });
  textarea.dispatchEvent(event);
}

function run() {
  const textarea = document.querySelector<HTMLTextAreaElement>(
    selector.titlearea
  );
  if (!textarea) {
    logger.debug('title textarea is not found.');
    return;
  }

  const observer = new MutationObserver(() => {
    patch(textarea);
  });

  observer.observe(textarea, {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    childList: true,
    subtree: true,
  });

  patch(textarea);

  textarea.addEventListener('focus', () => {
    observer.disconnect();
  });
}

run();
