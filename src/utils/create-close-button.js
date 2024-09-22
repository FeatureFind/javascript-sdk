export const createCloseButton = (
  smartEmbed,
  apiURL,
  token,
  hasActioned,
  organizationId,
  smartEmbedId
) => {
  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("class", "feature-find__smart-embed-close");
  const closeBtnSVG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  closeBtnSVG.setAttribute("fill", "none");
  closeBtnSVG.setAttribute("viewBox", "0 0 24 24");
  closeBtnSVG.setAttribute("stroke-width", "1.5");
  closeBtnSVG.setAttribute("stroke", "currentColor");
  const closeBtnSVGPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  closeBtnSVGPath.setAttribute("stroke-linecap", "round");
  closeBtnSVGPath.setAttribute("stroke-linejoin", "round");
  closeBtnSVGPath.setAttribute("d", "M6 18 18 6M6 6l12 12");
  closeBtnSVG.appendChild(closeBtnSVGPath);
  closeBtn.appendChild(closeBtnSVG);
  smartEmbed.appendChild(closeBtn);

  // Add close handler
  closeBtn.addEventListener("click", function () {
    if (!hasActioned) {
      fetch(
        `${apiURL}/public/${organizationId}/smart-embed/${smartEmbedId}?type=dismiss`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Feature-Find-Embed": true,
          },
        }
      ).catch((err) => {
        console.error(`FeatureFind error`, err);
      });
    }

    smartEmbed.classList.remove("feature-find__smart-embed--in");
  });
};
