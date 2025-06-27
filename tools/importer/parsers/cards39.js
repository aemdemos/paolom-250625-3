/* global WebImporter */
export default function parse(element, { document }) {
  // Find the image (picture or img)
  let imageCell = null;
  const picture = element.querySelector('picture');
  if (picture) {
    imageCell = picture;
  } else {
    const img = element.querySelector('img');
    if (img) imageCell = img;
  }

  // Card text cell (empty for this block)
  const textCell = document.createElement('div');

  // Build the table
  const table = document.createElement('table');

  // Header row: single th spanning two columns
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Cards (cards39)';
  th.colSpan = 2;
  trHeader.appendChild(th);
  table.appendChild(trHeader);

  // Card row: image | text
  const tr = document.createElement('tr');
  const tdImage = document.createElement('td');
  if (imageCell) tdImage.appendChild(imageCell);
  const tdText = document.createElement('td');
  tdText.appendChild(textCell);
  tr.appendChild(tdImage);
  tr.appendChild(tdText);
  table.appendChild(tr);

  // Replace original element
  element.replaceWith(table);
}
