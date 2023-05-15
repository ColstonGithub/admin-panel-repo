import { decrypt, encrypt } from "./localStorageServices";
import * as _ from "lodash";

export const getItem = (key) => {
  let recoveredItem = localStorage.getItem(key);
  if (_.isNull(recoveredItem)) {
    return null;
  }
  return recoveredItem;
};

export const setItem = (key, val) => {
  let parsedVal;

  if (_.isObject(val) || _.isArray(val)) {
    parsedVal = _.attempt(JSON.stringify.bind(null, val));
  } else if (_.isString(val)) {
    parsedVal = val;
  }

  if (!_.isError(parsedVal) && !_.isUndefined(parsedVal)) {
    parsedVal = encrypt(key, parsedVal);
    localStorage.setItem(key, parsedVal);
  }
};
