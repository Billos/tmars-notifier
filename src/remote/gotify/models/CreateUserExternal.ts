/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Used for user creation.
 */
export type CreateUserExternal = {
    /**
     * If the user is an administrator.
     */
    admin: boolean;
    /**
     * The user name. For login.
     */
    name: string;
    /**
     * The user password. For login.
     */
    pass: string;
};

