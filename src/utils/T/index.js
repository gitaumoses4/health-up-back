import strings from './strings';

const lang = process.env.APP_LANGUAGE || 'en';

const translate = (text) => {
  const languages = {
    en: 0,
    ar: 1
  };
  let string = strings[text];
  string = string ? string[languages[lang]] : '';

  return string;
};

const T = Object.keys(strings)
  .reduce((acc, cur) => ({
    ...acc,
    [cur]: translate(cur)
  }), {});

export default T;
