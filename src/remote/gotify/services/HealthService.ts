/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Health } from '../models/Health';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HealthService {
    /**
     * Get health information.
     * @returns Health Ok
     * @throws ApiError
     */
    public static getHealth(): CancelablePromise<Health> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
            errors: {
                500: `Ok`,
            },
        });
    }
}
