/**
 * edit template page
 * https://example.kibe.la/note_templates/1/edit
 */
import { selector } from '../constant';
import { logger } from '../libs/logger';
import { rewrite } from '../tokenizer';

function run() {
  const preview = document.querySelector<HTMLInputElement>(selector.preview);
  if (!preview) {
    logger.debug('preview is not found.');
    return;
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData') {
        const originalText = mutation.target.nodeValue || '';
        const rewriteText = rewrite(originalText);

        logger.debug('original text'.padEnd(14), ':', originalText);
        logger.debug('rewrite text'.padEnd(14), ':', rewriteText);

        if (originalText === rewriteText) {
          logger.debug('skip rewriting.');
        } else {
          mutation.target.nodeValue = rewriteText;
        }
      }
    });
  });

  observer.observe(preview, {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    childList: true,
    subtree: true,
  });

  // TODO: update preview title on first view
}

run();
