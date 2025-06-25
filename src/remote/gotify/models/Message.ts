/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The MessageExternal holds information about a message which was sent by an Application.
 */
export type Message = {
    /**
     * The application id that send this message.
     */
    readonly appid: number;
    /**
     * The date the message was created.
     */
    readonly date: string;
    /**
     * The extra data sent along the message.
     *
     * The extra fields are stored in a key-value scheme. Only accepted in CreateMessage requests with application/json content-type.
     *
     * The keys should be in the following format: &lt;top-namespace&gt;::[&lt;sub-namespace&gt;::]&lt;action&gt;
     *
     * These namespaces are reserved and might be used in the official clients: gotify android ios web server client. Do not use them for other purposes.
     */
    extras?: Record<string, any>;
    /**
     * The message id.
     */
    readonly id: number;
    /**
     * The message. Markdown (excluding html) is allowed.
     */
    message: string;
    /**
     * The priority of the message. If unset, then the default priority of the
     * application will be used.
     */
    priority?: number;
    /**
     * The title of the message.
     */
    title?: string;
};

