import { createSmartEmbedResource } from "./resources/smart-embed";

export class FeatureFind {
  constructor(orgId) {
    this.orgId = orgId;

    this.data = {};

    // Initialize SDK resources
    this.smartEmbed = createSmartEmbedResource(this.data, this.orgId);
  }
}
