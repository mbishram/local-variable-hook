// ** Local variable handler
let accessToken: string | "";

export function set(value: string) {
  accessToken = value;
}

export function get() {
  return accessToken;
}

export function remove() {
  accessToken = "";
}
