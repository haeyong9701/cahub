const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Seoul",
};

export const formatDateKoreanMinute = function (date: string): string {
  return new Date(date).toLocaleString("ko-KR", options);
};
