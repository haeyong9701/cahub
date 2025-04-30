export function normalizeKey(s: string) {
  return s.trim().normalize("NFC");
}
