export default function template(content, data) {
  return content.replace(/%(.+)%/g, (match, key) => {
    const value = data[key];
    return value !== undefined ? value : match;
  });
}
