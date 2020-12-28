export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

export function paddingLeadZero(num) {
  if (num < 10) {
    return `0${num}`
  }
  return num
}

export function secondsToTime(time, type) {
  time = parseInt(time)
  const s = time % 60
  const h = parseInt(time / 3600)
  let m = parseInt((time % 3600) / 60)
  if (type === 'array') {
    return [h, m, s]
  }
  if (type === 'm:s') {
    m = parseInt(time / 60)
    return [m, s].map((item) => paddingLeadZero(item)).join(':')
  }
  // default h:m:s
  return [h, m, s].map((item) => paddingLeadZero(item)).join(':')
}

export function timeToSeconds(str) {
  if (str) {
    const arr = str.split(':')
    return arr[0] * 3600 + arr[1] * 60 + arr[2] * 1
  }
  return '00:00:00'
};
