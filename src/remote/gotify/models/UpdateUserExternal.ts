/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Used for updating a user.
 */
export type UpdateUserExternal = {
    /**
     * If the user is an administrator.
     */
    admin: boolean;
    /**
     * The user name. For login.
     */
    name: string;
    /**
     * The user password. For login. Empty for using old password
     */
    pass?: string;
};

