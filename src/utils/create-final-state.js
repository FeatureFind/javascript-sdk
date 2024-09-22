export const createFinalState = (smartEmbed, postId, portalURL) => {
  const smartEmbedFeedbackText = document.createElement("p");
  smartEmbedFeedbackText.setAttribute(
    "class",
    "feature-find__smart-embed-text"
  );
  smartEmbedFeedbackText.innerHTML = "Thanks for your feedback!";
  smartEmbed.appendChild(smartEmbedFeedbackText);

  // Create links
  const links = document.createElement("p");
  links.setAttribute("class", "feature-find__smart-embed-links");
  const orText = document.createTextNode(" or ");

  const currentFeedback = document.createElement("a");
  currentFeedback.setAttribute("target", "_blank");
  const redirectTo = encodeURIComponent(`posts/${postId}`);
  currentFeedback.href = `${portalURL}?redirectTo=${redirectTo}`;
  currentFeedback.textContent = "Add a comment";

  const restFeedback = document.createElement("a");
  restFeedback.setAttribute("target", "_blank");
  restFeedback.href = portalURL;
  restFeedback.textContent = "view more feedback";

  links.appendChild(currentFeedback);
  links.appendChild(orText);
  links.appendChild(restFeedback);

  smartEmbed.appendChild(links);
};
