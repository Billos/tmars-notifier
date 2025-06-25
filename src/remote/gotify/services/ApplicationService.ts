/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Application } from '../models/Application';
import type { ApplicationParams } from '../models/ApplicationParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApplicationService {
    /**
     * Return all applications.
     * @returns Application Ok
     * @throws ApiError
     */
    public static getApps(): CancelablePromise<Array<Application>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/application',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Create an application.
     * @param body the application to add
     * @returns Application Ok
     * @throws ApiError
     */
    public static createApp(
        body: ApplicationParams,
    ): CancelablePromise<Application> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/application',
            body: body,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Update an application.
     * @param body the application to update
     * @param id the application id
     * @returns Application Ok
     * @throws ApiError
     */
    public static updateApplication(
        body: ApplicationParams,
        id: number,
    ): CancelablePromise<Application> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/application/{id}',
            path: {
                'id': id,
            },
            body: body,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Delete an application.
     * @param id the application id
     * @returns any Ok
     * @throws ApiError
     */
    public static deleteApp(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/application/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Upload an image for an application.
     * @param file the application image
     * @param id the application id
     * @returns Application Ok
     * @throws ApiError
     */
    public static uploadAppImage(
        file: Blob,
        id: number,
    ): CancelablePromise<Application> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/application/{id}/image',
            path: {
                'id': id,
            },
            formData: {
                'file': file,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }
    /**
     * Deletes an image of an application.
     * @param id the application id
     * @returns any Ok
     * @throws ApiError
     */
    public static removeAppImage(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/application/{id}/image',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }
}
