export default function useStorage() {
  const getStorageItem = (key, defaultValue = null, type = "local") => {
    const item = (type === "local" ? localStorage : sessionStorage).getItem(
      key
    );
    if (item) {
      try {
        const ret = JSON.parse(item);
        return ret;
      } catch (_) {
        return item;
      }
    }
    return defaultValue;
  };

  const setStorageItem = (key, value, type = "local") => {
    (type === "local" ? localStorage : sessionStorage).setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value)
    );
  };

  return {
    getStorageItem,
    setStorageItem,
  };
}
