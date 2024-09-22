import { createCustomElement } from "../utils/create-custom-element";

const buildFeedback = (data) => {
  createCustomElement();
  const feedback = document.createElement("feature-find");
  feedback.data = data;
  document.body.appendChild(feedback);
};

export const createSmartEmbedResource = (data, orgId) => {
  const apiURL =
    process.env.NODE_ENV === "production"
      ? "https://api.featurefind.io"
      : "http://localhost:7777";
  return {
    init: (token, options = {}) => {
      // If already initialized, return
      if (data.initialized) {
        return;
      }

      if (!token) {
        throw new Error("FeatureFind SDK Error: SSO token is required");
      }

      return fetch(`${apiURL}/public/${orgId}/embed`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Feature-Find-Embed": true,
        },
      })
        .then((res) => res.json())
        .then(({ portalURL, embeds, organizationId, settings }) => {
          data = {
            portalURL,
            embeds,
            organizationId,
            token,
            settings,
            initialized: true,
          };

          if (!options.skipFeedback && embeds.length) {
            buildFeedback(data);
          }

          return portalURL;
        })
        .catch((err) => {
          console.error(`FeatureFind SDK Error:`, err);
        });
    },
    getPortalURL: () => {
      if (!data.initialized) {
        throw new Error(
          "FeatureFind SDK Error: Not yet initialized. You must first call init()."
        );
      }

      return data.portalURL;
    },
    navigateToPortal: () => {
      if (!data.initialized) {
        throw new Error(
          "FeatureFind SDK Error: Not yet initialized. You must first call init()."
        );
      }

      return data.portalURL;
    },
  };
};
