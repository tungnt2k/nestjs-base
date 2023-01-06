/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-return-assign */
/* eslint-disable no-case-declarations */
/* eslint-disable no-restricted-globals */
const makeId = (length: number) => {
  const result = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
};

const nonAccentVietnamese = (str: string) => {
  if (!str) return '';
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
};

export const parse = (target: any): any => {
  const options = {
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true,
  };
  switch (typeof target) {
    case 'string':
      if (options.parseNull && target === 'null') {
        return null;
      }
      if (options.parseUndefined && target === 'undefined') {
        return undefined;
      }
      if (options.parseBoolean && (target === 'true' || target === 'false')) {
        return target === 'true';
      }
      if (options.parseNumber && !isNaN(Number(target))) {
        return Number(target);
      }
      return target;

    case 'object':
      if (Array.isArray(target)) {
        return target.map((x) => parse(x));
      }
      const obj = target;
      Object.keys(obj).map((key) => (obj[key] = parse(target[key])));
      return obj;

    default:
      return target;
  }
};

const isNumeric = (str: any) => {
  // @ts-ignore
  return !isNaN(str) && !isNaN(parseFloat(str));
};

export { isNumeric, makeId, nonAccentVietnamese };
