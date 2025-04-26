export const formatDate = function (date: Date): string {
  return new Date(date).toLocaleString("ko-KR");
};
