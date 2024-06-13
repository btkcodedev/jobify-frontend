import { API_BASE_PATH } from "src/config";
import { ApiRequestPayload, TokenType } from "src/types";
import { localHardRedirect, parseJSON, redirectOnNewVersion } from "src/helpers/utils";
import {
    clearAuthCookies,
    getApiVersion,
    getToken,
    setApiVersion,
    setRefreshToken,
    setToken,
} from "src/helpers/webstorage";
import { Paths } from "src/routes";
import { Endpoints } from "src/helpers/endpoints";
import { messages} from "src/helpers/messages";

async function handleResponse(response: Response) {
    if (
        response.headers.get("Content-Type") ===
        "application/octet-stream; charset=utf-8" ||
        response.headers.get("Content-Type") === "application/vnd.ms-excel"
    ) {
        let name = "";
        const headerContentDisposition = response.headers.get(
            "Content-Disposition"
        );
        if (headerContentDisposition) {
            name = headerContentDisposition
                .replace("attachment; filename=", "")
                .replace(".xlsx", "");
        }
        return response.blob().then((blob) => ({
            file: blob,
            name,
        }));
    }
    const apiVersion = response.headers.get("X-Api-Version") || "";
    getApiVersion() === "" && response.ok && setApiVersion(apiVersion);

    const loginCondition =
        response.url.includes(Endpoints.employeeAuth)
    if (loginCondition && response.ok) {
        const token = response.headers.get("Token") || "";
        setToken(token);
        const refreshToken = response.headers.get("Refresh-Token") || "";
        setRefreshToken(refreshToken);
        setApiVersion(apiVersion);
    }
    if (response.url.includes(Endpoints.authRefresh)) {
        const token = response.headers.get("Token") || "";
        setToken(token);
    }

    const text = await response.text();
    const data = text && parseJSON(text);
    if (!response.ok) {
        let error = (data && data.errorMessage) || messages.appMessage;

        if (response.status === 505) {
            clearAuthCookies();
            redirectOnNewVersion(apiVersion);
        }
        if (
            response.status === 403 &&
            response.url.includes(Endpoints.authRefresh)
        ) {
            clearAuthCookies();
            localHardRedirect(Paths.login);
        } else if (response.status === 403 && !loginCondition) {
            error = "TOKEN_EXPIRED";
            requests.GET({ endpoint: Endpoints.authRefresh });
        }
        if (response.status === 401 && !loginCondition) {
            clearAuthCookies();
            localHardRedirect(Paths.login);
        }

        return Promise.reject(error);
    }

    return data;
}

const createRequest = (
    url: string,
    method: string,
    data: object = {},
    credentials?: string
) => {
    const API_URL = `${API_BASE_PATH}${url}`;
    const authHeader = `Basic ${btoa(credentials || "")}`;
    const scope = url.includes(Endpoints.employeeAuth)
        ? TokenType.Google
        : url.includes(Endpoints.authRefresh)
            ? TokenType.Refresh
            : TokenType.Default;
    return new Request(API_URL, {
        method: method,
        mode: "cors",
        ...(Object.keys(data).length > 0 && {
            body: JSON.stringify(data),
        }),
        redirect: "follow",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: credentials ? `${authHeader}` : getToken(scope),
            "X-Api-Version": getApiVersion(),
        }),
    });
};

const requestCreator = {
    createRequest,
};

async function serviceRequest(request: Request) {
    try {
        const response = await fetch(request);
        return handleResponse(response);
    } catch (error) {
        throw error;
    }
}

const apiService = {
    serviceRequest,
};

async function apiRequest(method: string, reqOptions: ApiRequestPayload) {
    const request = requestCreator.createRequest(
        reqOptions.endpoint,
        method,
        reqOptions.body
    );
    const response = await apiService.serviceRequest(request);
    return response;
}

export const requests = {
    GET: (req: ApiRequestPayload) => apiRequest("GET", req),
    POST: (req: ApiRequestPayload) => apiRequest("POST", req),
    PUT: (req: ApiRequestPayload) => apiRequest("PUT", req),
    DELETE: (req: ApiRequestPayload) => apiRequest("DELETE", req),
    PATCH: (req: ApiRequestPayload) => apiRequest("PATCH", req),
};
