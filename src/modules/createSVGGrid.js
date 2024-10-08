export function createSVGGrid(container, squaresPerRow, fill, onlyEmbed) {
  if (!container) {
    console.error("Container not found");
    return;
  }

  // Get the container's dimensions
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  const responsiveSquares = window.innerWidth <= 991 ? (squaresPerRow / 2) : squaresPerRow;

  // Calculate the size of each square
  const squareSize = parseInt(containerWidth / responsiveSquares);

  // Calculate the number of squares per column
  const squaresPerColumn = Math.ceil(containerHeight / squareSize);

  // Create a unique ID for the mask
  const maskId = "mask-" + Math.random().toString(36).substr(2, 9);

  if (!onlyEmbed) {
    // Create SVG content
    let svgContent = `
                <svg viewBox="0 0 ${containerWidth} ${containerHeight}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                    <defs>
                        <mask id="${maskId}">
                            ${Array.from({ length: squaresPerColumn })
                              .map((_, row) =>
                                Array.from({ length: responsiveSquares })
                                  .map((_, col) => {
                                    const x = col * squareSize;
                                    const y = row * squareSize;
                                    return `<rect x="${x}" y="${y}" width="${
                                      squareSize + 1
                                    }" height="${squareSize + 1}" fill="${
                                      fill ? fill : "#000000"
                                    }"/>`;
                                  })
                                  .join("")
                              )
                              .join("")}
                        </mask>
                    </defs>
                </svg>`;
    // Create wrapper for the SVG and mask
    const maskContainer = document.createElement("div");
    maskContainer.className = "mask-container";
    maskContainer.style.maskImage = `url(#${maskId})`;

    // Append SVG to maskContainer
    maskContainer.innerHTML = svgContent;
    container.parentNode.insertBefore(maskContainer, container);
    maskContainer.appendChild(container);

    return maskContainer.querySelector("svg");
  } else {
    // Create SVG content
    let svgContent = `
                <svg viewBox="0 0 ${containerWidth} ${containerHeight}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                            ${Array.from({ length: squaresPerColumn })
                              .map((_, row) =>
                                Array.from({ length: squaresPerRow })
                                  .map((_, col) => {
                                    const x = col * squareSize;
                                    const y = row * squareSize;
                                    return `<rect x="${x}" y="${y}" width="${
                                      squareSize + 1
                                    }" height="${squareSize + 1}" fill="${
                                      fill ? fill : "#000000"
                                    }"/>`;
                                  })
                                  .join("")
                              )
                              .join("")}
                </svg>`;
    container.insertAdjacentHTML("beforeend", svgContent);

    return svgContent;
  }
}
