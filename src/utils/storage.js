export const setSessionStorage = (key, value) => {
  window.sessionStorage.setItem(key, value)
}

export const getSessionStorage = (key) => {
  return window.sessionStorage.getItem(key)
}

export const removeSessionStorage = (key) => {
  window.sessionStorage.removeItem(key)
}

export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value)
}

export const getLocalStorage = (key) => {
  return window.localStorage.getItem(key)
}

export const removeLocalStorage = (key) => {
  window.localStorage.removeItem(key)
}
