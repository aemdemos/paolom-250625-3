/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare hero block table: 1 column, 3 rows (header, optional image, main content)
  // 1. Header row
  const tableRows = [["Hero"]];

  // 2. Background image: this HTML block has no hero image, so leave empty string
  tableRows.push([""]);

  // 3. Main content: Collect left content (eyebrow, h2) and feature blurbs (h3, p, cta)
  const contentEls = [];
  // Find left content: headline and eyebrow
  const headlineBlock = element.querySelector(
    ".PortableText_portableText__iCL6x.SideBySideItem_content__UZ90N, .SideBySideItem_content__UZ90N"
  );
  if (headlineBlock) {
    // Add eyebrow if present
    const eyebrow = headlineBlock.querySelector(".PortableText_eyebrow__tGjcG, [class*='eyebrow']");
    if (eyebrow) contentEls.push(eyebrow);
    // Add main heading if present
    const heading = headlineBlock.querySelector("h1, h2, h3, h4, h5, h6");
    if (heading) contentEls.push(heading);
  }

  // Find feature blurbs and cta (right below the headline)
  const toutsBlock = element.querySelector(
    ".Touts_touts__tzgjP, [class*='Touts_touts']"
  );
  if (toutsBlock) {
    contentEls.push(toutsBlock);
  }

  // Add as the only cell in the third row
  tableRows.push([contentEls]);

  // Build table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element
  element.replaceWith(blockTable);
}
