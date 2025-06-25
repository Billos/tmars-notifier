/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The Client holds information about a device which can receive notifications (and other stuff).
 */
export type Client = {
    /**
     * The client id.
     */
    readonly id: number;
    /**
     * The last time the client token was used.
     */
    readonly lastUsed?: string;
    /**
     * The client name. This is how the client should be displayed to the user.
     */
    name: string;
    /**
     * The client token. Can be used as `clientToken`. See Authentication.
     */
    readonly token: string;
};

