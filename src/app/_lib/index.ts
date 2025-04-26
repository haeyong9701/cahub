export function normalizeKey(s: string) {
  return s.trim().normalize("NFC");
}

export const formatDate = function (date: Date): string {
  return new Date(date).toLocaleString("ko-KR");
};
