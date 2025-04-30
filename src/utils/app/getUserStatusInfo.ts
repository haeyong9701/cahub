export function getUserStatusInfo(loginDateStr: string, logoutDateStr: string) {
  const loginDate = new Date(loginDateStr);
  const logoutDate = new Date(logoutDateStr);
  return {
    isOnline: loginDate >= logoutDate,
  };
}
