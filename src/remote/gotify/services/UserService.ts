/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserExternal } from '../models/CreateUserExternal';
import type { UpdateUserExternal } from '../models/UpdateUserExternal';
import type { User } from '../models/User';
import type { UserPass } from '../models/UserPass';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Return the current user.
     * @returns User Ok
     * @throws ApiError
     */
    public static currentUser(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/current/user',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Update the password of the current user.
     * @param body the user
     * @returns any Ok
     * @throws ApiError
     */
    public static updateCurrentUser(
        body: UserPass,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/current/user/password',
            body: body,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Return all users.
     * @returns User Ok
     * @throws ApiError
     */
    public static getUsers(): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Create a user.
     * With enabled registration: non admin users can be created without authentication.
     * With disabled registrations: users can only be created by admin users.
     * @param body the user to add
     * @returns User Ok
     * @throws ApiError
     */
    public static createUser(
        body: CreateUserExternal,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user',
            body: body,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Get a user.
     * @param id the user id
     * @returns User Ok
     * @throws ApiError
     */
    public static getUser(
        id: number,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{id}',
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
     * Update a user.
     * @param id the user id
     * @param body the updated user
     * @returns User Ok
     * @throws ApiError
     */
    public static updateUser(
        id: number,
        body: UpdateUserExternal,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/{id}',
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
     * Deletes a user.
     * @param id the user id
     * @returns any Ok
     * @throws ApiError
     */
    public static deleteUser(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/{id}',
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
