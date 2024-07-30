/**
 * Converts a length value from any CSS unit to pixels.
 * @param {string} value - The length value as a string (e.g., "2rem", "50px").
 * @returns {number} - The length value in pixels.
 */
function convertToPixels(value) {
  // Create a temporary element to use the browser's rendering to convert the value to pixels
  const tempElement = document.createElement("div");
  tempElement.style.position = "absolute";
  tempElement.style.visibility = "hidden";
  tempElement.style.width = value;
  document.body.appendChild(tempElement);
  const pixelValue = parseFloat(window.getComputedStyle(tempElement).width);
  document.body.removeChild(tempElement);
  return pixelValue;
}

/**
 * Calculates the height of an element in rem units.
 * @param {HTMLElement} element - The target element.
 * @returns {number} - The height of the element in rem units.
 */
export function getElementHeightInRem(element) {
  if (!element) {
    throw new Error("Element is required");
  }

  // Get the computed style of the element
  const computedStyle = window.getComputedStyle(element);

  // Get the height of the element in pixels
  const heightInPixels = parseFloat(computedStyle.height);

  // Get the font size of the root element (html) in rem units and convert it to pixels
  const rootFontSizeInRem = window.getComputedStyle(
    document.documentElement
  ).fontSize;
  const rootFontSizeInPixels = convertToPixels(rootFontSizeInRem);

  // Calculate height in rem units
  const heightInRem = heightInPixels / rootFontSizeInPixels;

  return heightInRem;
}
