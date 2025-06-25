/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The Application holds information about an app which can send notifications.
 */
export type Application = {
    /**
     * The default priority of messages sent by this application. Defaults to 0.
     */
    defaultPriority?: number;
    /**
     * The description of the application.
     */
    description: string;
    /**
     * The application id.
     */
    readonly id: number;
    /**
     * The image of the application.
     */
    readonly image: string;
    /**
     * Whether the application is an internal application. Internal applications should not be deleted.
     */
    readonly internal: boolean;
    /**
     * The last time the application token was used.
     */
    readonly lastUsed?: string;
    /**
     * The application name. This is how the application should be displayed to the user.
     */
    name: string;
    /**
     * The application token. Can be used as `appToken`. See Authentication.
     */
    readonly token: string;
};

