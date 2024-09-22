import { createFinalState } from "./create-final-state";
import { createLoader } from "./create-loader";
import { createCloseButton } from "./create-close-button";
import { getStyles } from "./get-styles";

class FeatureFindCustomElement extends HTMLElement {
  constructor() {
    super();
    this._data = {};
  }

  set data(value) {
    this._data = value;
  }

  get data() {
    return this._data;
  }

  connectedCallback() {
    const API_URL =
      process.env.NODE_ENV === "production"
        ? "https://api.featurefind.io"
        : "http://localhost:7777";
    let hasActioned = false;

    const {
      embeds,
      organizationId,
      token,
      settings: embedSettings,
      portalURL,
    } = this._data;

    if (!embeds.length) return;

    let embed;
    const path = window.location.pathname;

    for (let i = 0; i < embeds.length; i++) {
      const { trigger } = embeds[i];
      let match = false;

      switch (trigger.type) {
        case "all":
          match = true;
          break;
        case "includes":
          match = path.includes(trigger.path);
          break;
        case "exactly":
          match = path === trigger.path;
          break;
        case "not_includes":
          match = !path.includes(trigger.path);
          break;
        case "starts_with":
          match = path.startsWith(trigger.path);
          break;
        case "ends_with":
          match = path.endsWith(trigger.path);
          break;
      }

      if (match) {
        embed = embeds[i];
        break;
      }
    }

    if (!embed) return;

    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "feature-find__wrapper");

    // Add styles
    const style = document.createElement("style");
    const settings = {};
    getStyles(style, settings);

    // Append elements
    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    // Create smart embed
    const smartEmbed = document.createElement("div");
    smartEmbed.setAttribute("class", "feature-find__smart-embed");
    wrapper.appendChild(smartEmbed);

    // Add transition class
    setTimeout(function () {
      smartEmbed.classList.add("feature-find__smart-embed--in");
    }, 100);

    // Create smart embed close button if needed
    if (embedSettings.allowClose) {
      createCloseButton(
        smartEmbed,
        API_URL,
        token,
        hasActioned,
        organizationId,
        embed.smartEmbedId
      );
    }

    // Create smart embed text content
    const smartEmbedText = document.createElement("p");
    smartEmbedText.setAttribute("class", "feature-find__smart-embed-text");
    smartEmbedText.innerHTML = embed.question;
    smartEmbed.appendChild(smartEmbedText);

    // Create smart embed actions
    const smartEmbedActions = document.createElement("div");
    smartEmbedActions.setAttribute(
      "class",
      "feature-find__smart-embed-actions"
    );
    smartEmbed.appendChild(smartEmbedActions);
    const smartEmbedAgree = document.createElement("button");
    smartEmbedAgree.setAttribute(
      "class",
      "feature-find__smart-embed-action-agree"
    );

    const agreeSVG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    agreeSVG.setAttribute("fill", "none");
    agreeSVG.setAttribute("viewBox", "0 0 24 24");
    agreeSVG.setAttribute("stroke-width", "1.5");
    agreeSVG.setAttribute("stroke", "currentColor");
    const agreeSVGPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    agreeSVGPath.setAttribute("stroke-linecap", "round");
    agreeSVGPath.setAttribute("stroke-linejoin", "round");
    agreeSVGPath.setAttribute(
      "d",
      "M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
    );
    const smartEmbedDisgree = document.createElement("button");
    smartEmbedDisgree.setAttribute(
      "class",
      "feature-find__smart-embed-action-disagree"
    );
    const disagreeSVG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    disagreeSVG.setAttribute("fill", "none");
    disagreeSVG.setAttribute("viewBox", "0 0 24 24");
    disagreeSVG.setAttribute("stroke-width", "1.5");
    disagreeSVG.setAttribute("stroke", "currentColor");
    const disagreeSVGPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    disagreeSVGPath.setAttribute("stroke-linecap", "round");
    disagreeSVGPath.setAttribute("stroke-linejoin", "round");
    disagreeSVGPath.setAttribute(
      "d",
      "M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
    );
    disagreeSVG.appendChild(disagreeSVGPath);
    smartEmbedDisgree.appendChild(disagreeSVG);
    smartEmbedActions.appendChild(smartEmbedDisgree);
    agreeSVG.appendChild(agreeSVGPath);
    smartEmbedAgree.appendChild(agreeSVG);
    smartEmbedActions.appendChild(smartEmbedAgree);

    // Create listeners for agree / disagree
    smartEmbedAgree.addEventListener("click", function () {
      smartEmbedActions.remove();
      smartEmbedText.remove();

      const loadingWrapper = document.createElement("div");
      loadingWrapper.setAttribute("class", "feature-find__loading");
      const loader = createLoader(smartEmbed);
      loadingWrapper.appendChild(loader);
      smartEmbed.appendChild(loadingWrapper);

      fetch(
        `${API_URL}/public/${organizationId}/smart-embed/${embed.smartEmbedId}?type=agree`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Feature-Find-Embed": true,
          },
        }
      )
        .then((res) => res.json())
        .then(() => {
          hasActioned = true;

          // Clear the loader
          loadingWrapper.remove();

          createFinalState(smartEmbed, embed.postId, portalURL);

          // Create smart embed close button if needed ()
          if (!embedSettings.allowClose) {
            createCloseButton(
              smartEmbed,
              API_URL,
              token,
              true,
              organizationId,
              embed.smartEmbedId
            );
          }
        })
        .catch((err) => {
          console.error(`FeatureFind error`, err);
        });
    });

    smartEmbedDisgree.addEventListener("click", function () {
      smartEmbedActions.remove();
      smartEmbedText.remove();

      const loadingWrapper = document.createElement("div");
      loadingWrapper.setAttribute("class", "feature-find__loading");
      const loader = createLoader(smartEmbed);
      loadingWrapper.appendChild(loader);
      smartEmbed.appendChild(loadingWrapper);

      fetch(
        `${API_URL}/public/${organizationId}/smart-embed/${embed.smartEmbedId}?type=disagree`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Feature-Find-Embed": true,
          },
        }
      )
        .then((res) => res.json())
        .then(() => {
          hasActioned = true;

          // Clear the loader
          loadingWrapper.remove();

          createFinalState(smartEmbed, embed.postId, portalURL);

          // Create smart embed close button if needed ()
          if (!embedSettings.allowClose) {
            createCloseButton(
              smartEmbed,
              API_URL,
              token,
              true,
              organizationId,
              embed.smartEmbedId
            );
          }
        })
        .catch((err) => {
          console.error(`FeatureFind error`, err);
        });
    });
  }
}

export const createCustomElement = () => {
  if (!customElements.get("feature-find")) {
    customElements.define("feature-find", FeatureFindCustomElement);
  }
};
