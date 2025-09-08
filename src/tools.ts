import moment from "moment-jalaali";
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
