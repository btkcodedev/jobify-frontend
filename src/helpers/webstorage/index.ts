import {
    getCookie,
    removeCookie,
    setCookie,
} from "src/helpers/utils";
import { TokenType } from "src/types";

const IS_LOGGED_IN = "isLoggedIn";
const GOOGLE_TOKEN = "token";
const API_TOKEN = "api_token";
const REFRESH_TOKEN = "refresh_token";
const AVATAR = "avatar";
const USERNAME = "userName";
const IS_ADMIN = "isAdmin";
const EMP_ID = "empId";
const API_VERSION = "api_version";

export const clearAuthCookies = () => {
    removeCookie(IS_LOGGED_IN);
    removeCookie(GOOGLE_TOKEN);
    removeCookie(API_TOKEN);
    removeCookie(REFRESH_TOKEN);
    removeCookie(USERNAME);
    removeCookie(IS_ADMIN);
    removeCookie(EMP_ID);
    removeCookie(AVATAR);
};

export const addAuthCookies = (data: {
    userName: string;
    isAdmin: boolean;
    empId: string;
}) => {
    setCookie(USERNAME, data.userName);
    setCookie(IS_ADMIN, data.isAdmin.toString());
    setCookie(EMP_ID, data.empId);
    setCookie(IS_LOGGED_IN, "true");
};

export const addLoginCookies = (data: { token: string; avatar: string }) => {
    setCookie(GOOGLE_TOKEN, data.token);
    setCookie(AVATAR, data.avatar);
};

export const getToken = (scope?: TokenType) => {
    const token =
        getCookie(
            scope === TokenType.Google
                ? GOOGLE_TOKEN
                : scope === TokenType.Refresh
                    ? REFRESH_TOKEN
                    : API_TOKEN
        ) ?? "";
    return scope === TokenType.Default ? `Bearer ${token}` : token;
};

export const setToken = (token: string) => {
    setCookie(API_TOKEN, token);
};

export const getApiVersion = () => {
    const version = getCookie(API_VERSION) ?? "";
    return version;
};

export const setApiVersion = (version: string) => {
    setCookie(API_VERSION, version);
};

export const setAvatar = (avatar: string) => {
    setCookie(AVATAR, avatar);
};

export const setRefreshToken = (token: string) => {
    setCookie(REFRESH_TOKEN, token);
};


export const getHeaderDetails = () => {
    const username = getCookie(USERNAME);
    const avatar = getCookie(AVATAR);
    return { username, avatar };
};

export const checkAdminUser = () => {
    return getCookie(IS_ADMIN) ? true: false;
}