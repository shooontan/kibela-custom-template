/**
 * new page with note template
 * https://example.kibe.la/note_templates/1/notes/new
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

    const templateTitle = input.getAttribute('value') || '';
    const rewriteTitle = rewrite(templateTitle);
    logger.debug('template title'.padEnd(14), ':', templateTitle);
    logger.debug('rewrite title'.padEnd(14), ':', rewriteTitle);

    input.setAttribute('value', rewriteTitle);
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);

    observer.disconnect();
    logger.debug('stop title observer.');
  });

  observer.observe(input, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  });
}

run();
