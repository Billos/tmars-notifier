/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The Paging holds information about the limit and making requests to the next page.
 */
export type Paging = {
    /**
     * The limit of the messages for the current request.
     */
    readonly limit: number;
    /**
     * The request url for the next page. Empty/Null when no next page is available.
     */
    readonly next?: string;
    /**
     * The ID of the last message returned in the current request. Use this as alternative to the next link.
     */
    readonly since: number;
    /**
     * The amount of messages that got returned in the current request.
     */
    readonly size: number;
};

