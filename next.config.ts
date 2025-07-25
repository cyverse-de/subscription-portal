import type { NextConfig } from "next";

// appConfiguration defines the supported configuration settings for the application.
const appConfiguration = {
    authorizeNetLoginId: {
        variable: "SP_AUTHORIZE_NET_LOGIN_ID",
        required: true,
        isPublic: false,
        defaultValue: undefined,
    },
    authorizeNetTransactionKey: {
        variable: "SP_AUTHORIZE_NET_TRANSACTION_KEY",
        required: true,
        isPublic: false,
        defaultValue: undefined,
    },
    keycloakIssuer: {
        variable: "SP_KEYCLOAK_ISSUER",
        required: true,
        isPublic: false,
        defaultValue: undefined,
    },
    keycloakClientId: {
        variable: "SP_KEYCLOAK_CLIENT_ID",
        required: true,
        isPublic: false,
        defaultValue: undefined,
    },
    keycloakClientSecret: {
        variable: "SP_KEYCLOAK_CLIENT_SECRET",
        required: true,
        isPublic: false,
        defaultValue: undefined,
    },
    terrainBaseUrl: {
        variable: "SP_TERRAIN_BASE_URL",
        required: false,
        isPublic: true,
        defaultValue: "https://de.cyverse.org/terrain",
    },
};

// loadConfig loads the runtime configuration from the environment based on the definitions in `appConfiguration`.
function loadConfig() {
    let configurationError = false;
    const publicRuntimeConfig: Record<string, string | undefined> = {};
    const serverRuntimeConfig: Record<string, string | undefined> = {};

    for (const [
        key,
        { variable, required, isPublic, defaultValue },
    ] of Object.entries(appConfiguration)) {
        const defined =
            variable in process.env ||
            typeof process.env[variable] !== "undefined";

        // Log an error if a required configuration setting isn't defined.
        if (required && !defined) {
            console.log(
                `configuration error [${key}]: ${variable} is not defined`,
            );
            configurationError = true;
            continue;
        }

        // Get the value of the configuration setting.
        const value = defined ? process.env[variable] : defaultValue;

        // Store the configuration setting.
        if (isPublic) {
            publicRuntimeConfig[key] = value;
        } else {
            serverRuntimeConfig[key] = value;
        }
    }

    return { configurationError, publicRuntimeConfig, serverRuntimeConfig };
}

// Load the configuration.
const { configurationError, publicRuntimeConfig, serverRuntimeConfig } =
    loadConfig();
if (configurationError) {
    console.log("a configuration error was detected: exiting");
    process.exit(1);
}

const nextConfig: NextConfig = {
    publicRuntimeConfig,
    serverRuntimeConfig,
    // Full URL logging to the console when running in dev mode.
    logging: { fetches: { fullUrl: true } },
};

export default nextConfig;
