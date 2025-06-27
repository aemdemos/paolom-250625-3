/* global WebImporter */
export default function parse(element, { document }) {
  // The block name as header; must match exactly
  const headerRow = ['Carousel (carousel21)'];

  // Each subcategory group is a slide: find immediate child divs
  const subcategories = Array.from(element.querySelectorAll(':scope > div'));

  // For each subcategory, put its existing content into the slide
  // The first cell (image) is left blank (no image)
  // The second cell contains the heading and the list from the group
  const rows = subcategories.map((subcat) => {
    // Instead of cloning, reference the existing heading and list elements directly!
    const heading = subcat.querySelector('h3');
    const list = subcat.querySelector('ol');
    // Sometimes one or both may be missing, handle gracefully
    let cellContent = [];
    if (heading) cellContent.push(heading);
    if (list) cellContent.push(list);
    // If both missing, an empty cell (as defensive, but won't occur in supplied HTML)
    return ['', cellContent.length > 0 ? cellContent : ''];
  });

  // The final table: header, then one row per subcategory
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
