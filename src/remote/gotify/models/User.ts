/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The User holds information about permission and other stuff.
 */
export type User = {
    /**
     * If the user is an administrator.
     */
    admin: boolean;
    /**
     * The user id.
     */
    readonly id: number;
    /**
     * The user name. For login.
     */
    name: string;
};

