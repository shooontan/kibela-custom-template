/**
 * edit template page
 * https://example.kibe.la/note_templates/1/edit
 */
import { selector } from '../constant';
import { logger } from '../libs/logger';
import { rewrite } from '../tokenizer';

function patch(preview: HTMLSpanElement) {
  preview.childNodes.forEach((node) => {
    if (node.nodeType !== Node.TEXT_NODE) {
      return;
    }

    const originalText = node.nodeValue || '';
    const rewriteText = rewrite(originalText);

    logger.debug('original text'.padEnd(14), ':', originalText);
    logger.debug('rewrite text'.padEnd(14), ':', rewriteText);

    if (originalText === rewriteText) {
      logger.debug('skip rewriting.');
    } else {
      node.nodeValue = rewriteText;
    }
  });
}

function run() {
  const preview = document.querySelector<HTMLSpanElement>(selector.preview);
  if (!preview) {
    logger.debug('preview is not found.');
    return;
  }

  const observer = new MutationObserver(() => {
    patch(preview);
  });

  observer.observe(preview, {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    childList: true,
    subtree: true,
  });

  // update preview title on first view
  patch(preview);
}

run();
