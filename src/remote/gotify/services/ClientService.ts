/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Client } from '../models/Client';
import type { ClientParams } from '../models/ClientParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClientService {
    /**
     * Return all clients.
     * @returns Client Ok
     * @throws ApiError
     */
    public static getClients(): CancelablePromise<Array<Client>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/client',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Create a client.
     * @param body the client to add
     * @returns Client Ok
     * @throws ApiError
     */
    public static createClient(
        body: ClientParams,
    ): CancelablePromise<Client> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/client',
            body: body,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Update a client.
     * @param body the client to update
     * @param id the client id
     * @returns Client Ok
     * @throws ApiError
     */
    public static updateClient(
        body: ClientParams,
        id: number,
    ): CancelablePromise<Client> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/client/{id}',
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
     * Delete a client.
     * @param id the client id
     * @returns any Ok
     * @throws ApiError
     */
    public static deleteClient(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/client/{id}',
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
}
