export default function encodeValidName(name) {
  return name
    .split('/')
    .map(str => encodeURIComponent(str))
    .join('/')
}
