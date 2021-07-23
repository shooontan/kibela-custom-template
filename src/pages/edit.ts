/**
 * edit template page
 * https://example.kibe.la/note_templates/1/edit
 */
import { selector } from '../constant';
import { logger } from '../libs/logger';
import { rewrite } from '../tokenizer';

function run() {
  const input = document.querySelector<HTMLInputElement>(selector.input);
  if (!input) {
    logger.debug('title input is not found.');
    return;
  }

  const observer = new MutationObserver(() => {
    logger.debug('start title observer.');

    const templateTitle = input.value || '';
    const rewriteTitle = rewrite(templateTitle);
    logger.debug('template title'.padEnd(14), ':', templateTitle);
    logger.debug('rewrite title'.padEnd(14), ':', rewriteTitle);

    if (!templateTitle) {
      logger.debug('skip rewriting.');
      return;
    }

    const preview = document.querySelector<HTMLSpanElement>(selector.preview);
    if (!preview) {
      logger.debug('preview text is not found.');
      return;
    }
    preview.textContent = rewriteTitle;
  });

  observer.observe(input, {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    childList: true,
    subtree: true,
  });
}

run();
