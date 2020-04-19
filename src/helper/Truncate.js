const Truncate = (str, len = 40) => {
  return (str && str.length > len) ? (str.substring(0, len - 3) + '...') : str
}
export default Truncate;
