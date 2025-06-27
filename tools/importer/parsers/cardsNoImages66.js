/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cardsNoImages66)'];
  const rows = [headerRow];

  // Find all card containers
  const cardEls = element.querySelectorAll('.PricingUpgradeCard_container__rQnTF');
  cardEls.forEach(cardEl => {
    // Reference the content area
    const content = cardEl.querySelector('.PricingUpgradeCard_content__R4tVK');
    if (!content) return;
    // We'll build the card content using references to existing elements (not cloneNode)
    const cardContent = document.createElement('div');

    // Eyebrow (optional, usually above title)
    const eyebrow = content.querySelector('.PricingUpgradeCard_eyebrow__M3BzM');
    if (eyebrow && eyebrow.textContent.trim()) {
      // Use a <div> for eyebrow
      const eyebrowDiv = document.createElement('div');
      eyebrowDiv.appendChild(document.createTextNode(eyebrow.textContent));
      eyebrowDiv.style.fontSize = 'smaller';
      eyebrowDiv.style.fontWeight = 'bold';
      cardContent.appendChild(eyebrowDiv);
    }

    // Title (required, use <h3>)
    const title = content.querySelector('.PricingUpgradeCard_title__K4fPL');
    if (title && title.textContent.trim()) {
      const h3 = document.createElement('h3');
      h3.appendChild(document.createTextNode(title.textContent));
      cardContent.appendChild(h3);
    }
    // Subtitle/Price (optional, keep below title)
    const subtitle = content.querySelector('.PricingUpgradeCard_subtitle__fhiHd');
    if (subtitle && subtitle.textContent.trim()) {
      const subtitleDiv = document.createElement('div');
      subtitleDiv.appendChild(document.createTextNode(subtitle.textContent));
      subtitleDiv.style.fontWeight = 'bold';
      cardContent.appendChild(subtitleDiv);
    }
    // Label (optional)
    const label = content.querySelector('.PricingUpgradeCard_label__EpBBp');
    if (label && label.textContent.trim()) {
      const labelDiv = document.createElement('div');
      labelDiv.appendChild(document.createTextNode(label.textContent));
      labelDiv.style.fontSize = 'smaller';
      cardContent.appendChild(labelDiv);
    }
    // Bullets title (e.g. INCLUDES... or EVERYTHING IN...)
    const bulletsTitle = content.querySelector('.PricingUpgradeCard_bulletsTitle__ZWOs9');
    if (bulletsTitle && bulletsTitle.textContent.trim()) {
      const bulletsTitleDiv = document.createElement('div');
      bulletsTitleDiv.appendChild(document.createTextNode(bulletsTitle.textContent));
      bulletsTitleDiv.style.marginTop = '1em';
      bulletsTitleDiv.style.fontWeight = 'bold';
      cardContent.appendChild(bulletsTitleDiv);
    }
    // Main bullets list (ol, but use ul for output)
    const bulletList = content.querySelector('ol');
    if (bulletList) {
      // We'll create a <ul> and fill it with <li> referencing the originals, but only the text (no SVGs or tooltips)
      const ul = document.createElement('ul');
      const lis = bulletList.querySelectorAll('li');
      lis.forEach(li => {
        const liText = [document.createTextNode(li.childNodes[0] ? li.childNodes[0].textContent : '')];
        // If there's a button with aria-label (tooltip), append as plain text in parentheses
        const btn = li.querySelector('button[aria-label]');
        if (btn && btn.getAttribute('aria-label')) {
          liText.push(document.createTextNode(' (' + btn.getAttribute('aria-label') + ')'));
        }
        const outLi = document.createElement('li');
        liText.forEach(node => outLi.appendChild(node));
        ul.appendChild(outLi);
      });
      cardContent.appendChild(ul);
    }
    // CTA/button (optional)
    const cta = content.querySelector('a');
    if (cta) {
      cardContent.appendChild(cta);
    }

    rows.push([cardContent]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
