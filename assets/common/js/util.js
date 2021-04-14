export function selectedVersion() {
  const version = window.location.pathname.split("/")[2];
  return version;
}
