/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from './Message';
import type { Paging } from './Paging';
/**
 * Wrapper for the paging and the messages.
 */
export type PagedMessages = {
    /**
     * The messages.
     */
    readonly messages: Array<Message>;
    paging: Paging;
};

