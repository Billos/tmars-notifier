/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Holds information about a plugin instance for one user.
 */
export type PluginConf = {
    /**
     * The author of the plugin.
     */
    readonly author?: string;
    /**
     * Capabilities the plugin provides
     */
    capabilities: Array<string>;
    /**
     * Whether the plugin instance is enabled.
     */
    enabled: boolean;
    /**
     * The plugin id.
     */
    readonly id: number;
    /**
     * The license of the plugin.
     */
    readonly license?: string;
    /**
     * The module path of the plugin.
     */
    readonly modulePath: string;
    /**
     * The plugin name.
     */
    readonly name: string;
    /**
     * The user name. For login.
     */
    token: string;
    /**
     * The website of the plugin.
     */
    readonly website?: string;
};

