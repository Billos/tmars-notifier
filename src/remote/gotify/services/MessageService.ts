/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from '../models/Message';
import type { PagedMessages } from '../models/PagedMessages';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MessageService {
    /**
     * Return all messages from a specific application.
     * @param id the application id
     * @param limit the maximal amount of messages to return
     * @param since return all messages with an ID less than this value
     * @returns PagedMessages Ok
     * @throws ApiError
     */
    public static getAppMessages(
        id: number,
        limit: number = 100,
        since?: number,
    ): CancelablePromise<PagedMessages> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/application/{id}/message',
            path: {
                'id': id,
            },
            query: {
                'limit': limit,
                'since': since,
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
     * Delete all messages from a specific application.
     * @param id the application id
     * @returns any Ok
     * @throws ApiError
     */
    public static deleteAppMessages(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/application/{id}/message',
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
     * Return all messages.
     * @param limit the maximal amount of messages to return
     * @param since return all messages with an ID less than this value
     * @returns PagedMessages Ok
     * @throws ApiError
     */
    public static getMessages(
        limit: number = 100,
        since?: number,
    ): CancelablePromise<PagedMessages> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/message',
            query: {
                'limit': limit,
                'since': since,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Create a message.
     * __NOTE__: This API ONLY accepts an application token as authentication.
     * @param body the message to add
     * @returns Message Ok
     * @throws ApiError
     */
    public static createMessage(
        body: Message,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/message',
            body: body,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Delete all messages.
     * @returns any Ok
     * @throws ApiError
     */
    public static deleteMessages(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/message',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Deletes a message with an id.
     * @param id the message id
     * @returns any Ok
     * @throws ApiError
     */
    public static deleteMessage(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/message/{id}',
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
     * Websocket, return newly created messages.
     * @returns Message Ok
     * @throws ApiError
     */
    public static streamMessages(): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stream',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Server Error`,
            },
        });
    }
}
