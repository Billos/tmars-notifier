/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Health represents how healthy the application is.
 */
export type Health = {
    /**
     * The health of the database connection.
     */
    database: string;
    /**
     * The health of the overall application.
     */
    health: string;
};

