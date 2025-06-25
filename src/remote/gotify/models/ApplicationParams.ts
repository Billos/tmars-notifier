/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Params allowed to create or update Applications.
 */
export type ApplicationParams = {
    /**
     * The default priority of messages sent by this application. Defaults to 0.
     */
    defaultPriority?: number;
    /**
     * The description of the application.
     */
    description?: string;
    /**
     * The application name. This is how the application should be displayed to the user.
     */
    name: string;
};

