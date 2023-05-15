export const WHITE_SPACES_REGEX_PASSWORD = /^(\S+$)/g;

export const NEW_PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[*.!@#$^&_+-])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export const MOBILE_NUMBER_REGEX = /^\d{6,10}$/;

export const EMAIL_REGEX =
  /^([0-9a-zA-Z]+['\-._+]?)+[0-9a-zA-Z]+[@]([0-9a-zA-Z]+[-]?){2,}[.](([a-zA-Z]+[-]?){2,}[.]){0,2}[a-zA-Z]{2,}$/;

export const tests = {
  lowerCase: /[a-z]+/,
  upperCase: /[A-Z]+/,
  digits: /\d+/,
  symbol: /[*.!@#$^&_+-]+/,
  length: /^.{6,20}$/,
};

export const PER_PAGE_LIMIT = 10;
