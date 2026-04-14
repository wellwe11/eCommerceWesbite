const createHashMap = (arr, key, extra, alternative) => {
  const map = new Map();

  arr.forEach((i) => {
    const id = i[key] ?? alternative;

    if (!map.has(id)) map.set(id, { ...i, ...extra });
  });

  return map;
};
export default createHashMap;
