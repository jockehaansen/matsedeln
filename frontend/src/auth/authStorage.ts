const KEY = "basic_auth";

export function saveCredentials(username: string, password: string) {
  const token = btoa(`${username}:${password}`);
  localStorage.setItem(KEY, token);
}

export function getBasicAuthToken(): string | null {
  return localStorage.getItem(KEY);
}

export function clearBasicAuth() {
  localStorage.removeItem(KEY);
}
