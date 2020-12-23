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
