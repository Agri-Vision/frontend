import {AsgardeoSPAClient, HttpRequestConfig} from '@asgardeo/auth-react';

import endpointConfig from "../config/endpoint-config";

let auth: AsgardeoSPAClient | null = null;

function getAuthClient(): AsgardeoSPAClient {
    if (!auth) {
        const instance = AsgardeoSPAClient.getInstance();
        if (!instance) {
            throw new Error('Failed to initialize AsgardeoSPAClient.');
        }
        auth = instance;
    }
    return auth;
}

/**
 * API Call to fetch Organization details.
 */
export async function getOrganizationDetails () {   
    const authClient = getAuthClient();

    const requestConfig: HttpRequestConfig = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET",
        url: `${endpointConfig.api.endpoints.getOrganization}/152`
    };

    return authClient.httpRequest(requestConfig)
    .then((response) => {
        if (response && response.data) {                 
            return response.data;
        } else {
            throw new Error('Response is undefined or missing data.');
        }
    })
    .catch((error) => {
        console.log(error);        
        throw new Error('Failed to fetch Organization profile.');
    });
};