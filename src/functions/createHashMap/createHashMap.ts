const createHashMap = (arr, key, extra, alternative) => {
  const map = new Map();

  arr.forEach((i) => {
    const id = i[key] ?? alternative;
    const extraItem = typeof extra === "function" ? extra() : extra;

    if (!map.has(id)) map.set(id, { ...i, ...extraItem });
  });

  return map;
};

export default createHashMap;
