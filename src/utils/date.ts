import dayjs from "dayjs";

export const actualHourMinutes =
  new Date().getHours() + ":" + new Date().getMinutes();
export const actualDate = dayjs().format("YYYY-MM-DD");
