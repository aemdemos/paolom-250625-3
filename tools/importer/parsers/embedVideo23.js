/* global WebImporter */
export default function parse(element, { document }) {
  // The provided HTML has no content suitable for the Embed block (no video/image+URL/iframe).
  // So, per requirements, do nothing—leave the element as-is and do not create or replace with any Embed table.
  // This function must NOT return or replace anything for this input.
}
