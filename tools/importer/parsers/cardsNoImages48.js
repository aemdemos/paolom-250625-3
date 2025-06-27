/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row exactly as in the example
  const cells = [['Cards (cardsNoImages48)']];

  // Cards block expects one card per row, with heading (optional), description (optional), etc,
  // all in a single cell. Each card is a block of text (usually a heading and one or two paragraphs).
  // We look for a set of card containers. In Helix sites, each card is usually a direct child of a flex/grid container.
  
  // Heuristic: In this structure, cards are likely all direct children of a container div that is a flex/grid.
  // We'll look for direct children that have text content, not SVGs or images.

  // Helper to determine if a node is a valid card (contains text, not only icons or logos)
  function isTextCard(node) {
    if (!node) return false;
    // ignore if it contains only logo/svg
    if (node.querySelector && node.querySelector('svg')) return false;
    // must have at least some visible text
    return node.textContent && node.textContent.trim().length > 0;
  }

  // Recursive function to find likely card containers
  function findCardBlocks(el) {
    const results = [];
    // Only check element nodes
    Array.from(el.children).forEach(child => {
      // If child is a candidate card, and doesn't just wrap more cards, use it as a card
      if (isTextCard(child)) {
        // If child has grandchildren that are all also text cards, go deeper
        const grandChildren = Array.from(child.children);
        if (grandChildren.length > 0 && grandChildren.every(isTextCard)) {
          results.push(...findCardBlocks(child));
        } else {
          results.push(child);
        }
      } else {
        // Might be a wrapper; try deeper
        results.push(...findCardBlocks(child));
      }
    });
    return results;
  }

  // Find all candidate card blocks
  const cardBlocks = findCardBlocks(element).filter(card => {
    // Filter out any empty wrappers or accidental icon wrappers
    // Only keep if there's at least some text content (not just whitespace)
    return card.textContent && card.textContent.trim().length > 0;
  });

  // If no cards found, cells will just have the header row (as in a logo wall)
  cardBlocks.forEach(card => {
    cells.push([[card]]); // Reference the existing card element, not a clone
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
