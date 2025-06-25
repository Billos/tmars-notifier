/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PluginConf } from '../models/PluginConf';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PluginService {
    /**
     * Return all plugins.
     * @returns PluginConf Ok
     * @throws ApiError
     */
    public static getPlugins(): CancelablePromise<Array<PluginConf>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/plugin',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Get YAML configuration for Configurer plugin.
     * @param id the plugin id
     * @returns any Ok
     * @throws ApiError
     */
    public static getPluginConfig(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/plugin/{id}/config',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Update YAML configuration for Configurer plugin.
     * @param id the plugin id
     * @returns any Ok
     * @throws ApiError
     */
    public static updatePluginConfig(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/plugin/{id}/config',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Disable a plugin.
     * @param id the plugin id
     * @returns any Ok
     * @throws ApiError
     */
    public static disablePlugin(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/plugin/{id}/disable',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Get display info for a Displayer plugin.
     * @param id the plugin id
     * @returns string Ok
     * @throws ApiError
     */
    public static getPluginDisplay(
        id: number,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/plugin/{id}/display',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Enable a plugin.
     * @param id the plugin id
     * @returns any Ok
     * @throws ApiError
     */
    public static enablePlugin(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/plugin/{id}/enable',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
}
