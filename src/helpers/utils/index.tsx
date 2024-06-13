import Cookies from 'js-cookie';
import { Paths } from 'src/routes';

export const getCookie = (cookie: string) => {
  return Cookies.get(cookie);
};

export const isLoggedIn = () => {
  return Cookies.get('isLoggedIn') == 'true';
};

export const setCookie = (key: string, value: string) => {
  return Cookies.set(key, value);
};

export const removeCookie = (cookie: string) => {
  return Cookies.remove(cookie);
};

export const localHardRedirect = (path: Paths) => {
  window.location.href = path;
};

export const parseJSON = (responseText: string) => {
  try {
    const jsonObject = JSON.parse(responseText);
    if (typeof jsonObject === 'object' && jsonObject !== null) {
      return jsonObject;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const redirectOnNewVersion = (version: string) => {
  // const redirectUrl = `${Paths.login}?v=${version}`; // TODO
  window.location.href = `/login?v=${version}`;
};

export const CapitalizeFirsLetter = (ind: string) => {
  if (ind.length === 0) {
    return '';
  }
  return ind.charAt(0).toUpperCase() + ind.slice(1);
};
