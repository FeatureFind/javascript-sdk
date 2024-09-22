<p align="center">
  <img src="https://featurefind-static.s3.amazonaws.com/logo-full-transparent.png" width="400" />
</p>

# Official FeatureFind SDK for JavaScript (Browser)

## Installation

```bash
npm install @featurefind/javascript-sdk

# OR

yarn add @featurefind/javascript-sdk
```

## Usage

After installing the SDK, you can initialize it with your client key (found in your FeatureFind organization settings):

```javascript
import { FeatureFind } from "@featurefind/javascript-sdk";

const featureFind = new FeatureFind("your-client-key");
```

After initializing the SDK, you can reference available resources:

### Smart Embed

#### `smartEmbed.init(token, options)`

The init function is used to initialize the smart embed and is **required** to be called before using any other smart embed functions can be executed. It requires an SSO token created with your organization's secret key to be passed in (View more details [here](https://help.featurefind.io/smart-embed/install/)). Once run, it will automatically display the smart embed widget pending no additional configuration (See below).

This function also returns a promise that resolves with the portal URL that can also be used to direct users to your portal already authenticated.

The second parameter is an optional `options` object that can be used to customize the behavior of the smart embed:

- `skipFeedback`: A boolean value that, when set to `true`, will prevent the feedback widget from being displayed.

Example usage:

```javascript
import { FeatureFind } from "@featurefind/javascript-sdk";

const featureFind = new FeatureFind("your-client-key");

const portalURL = await featureFind.smartEmbed.init("your-sso-token");

// OR, if you don't require the portal URL, you can initialize the smart embed without awaiting
// featureFind.smartEmbed.init("your-sso-token");
```

#### `smartEmbed.getPortalURL()`

This function returns a unique portal URL that can be given to a user to access the portal directly and already authenticated via SSO. It requires that `init()` (see above) is called first.

Example usage:

```javascript
const portalURL = featureFind.smartEmbed.getPortalURL();
```

#### `smartEmbed.navigateToPortal()`

This function is used to navigate to the portal directly from your application. The subject of the generated SSO token will already be authenticated on your portal. It requires that `init()` (see above) is called first.

Example usage:

```javascript
featureFind.smartEmbed.navigateToPortal();
```

#### Additional Information

For more information on the Smart Embed and how to install it, see the [Smart Embed Installation Documentation](https://help.featurefind.io/smart-embed/install/).
