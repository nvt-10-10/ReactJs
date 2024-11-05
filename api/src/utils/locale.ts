import { LocaleEnum } from "src/enums";

/**
 * @functionName isLocaleJP
 * @param locale
 * @return boolean
 */
export const isLocaleJP = (locale: string) => {
  return locale === LocaleEnum.Japan;
};
