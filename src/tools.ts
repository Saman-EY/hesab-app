import moment from "moment-jalaali";
import jalaali from "jalaali-js";

export const convertToJalali = (date: string) => {
  const shamsi = moment(date).format("jYYYY/jMM/jDD");
  return shamsi;
};

export const onlyGetsNumbers = (e: any) => {
  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
};

export const noSpaces = (e: any) => {
  e.currentTarget.value = e.currentTarget.value.replace(/^\s+/, "");
};

export function persianDigitsToEnglish(str: string) {
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  const english = "0123456789";
  return str.replace(/[۰-۹]/g, (ch) => english[persian.indexOf(ch)]);
}

export function jalaliToGregorian(jalaliDate: string): string {
  const cleaned = persianDigitsToEnglish(jalaliDate);
  const [jy, jm, jd] = cleaned.split("/").map(Number);

  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);

  // دو رقمی کردن ماه و روز
  const mm = gm.toString().padStart(2, "0");
  const dd = gd.toString().padStart(2, "0");

  return `${gy}/${mm}/${dd}`;
}