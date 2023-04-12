const localStoreUtil = {
  store_data: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  },

  store_filter: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  },

  get_data: key => {
    const item = localStorage.getItem(key)
    console.log("item", typeof item)

    if (!item) return
    return typeof item == "string" ? item : JSON.parse(item)
  },

  remove_data: key => {
    localStorage.removeItem(key)
    return true
  },

  filterRemove_data: key => {
    localStorage.clear(key)
    return true
  },

  remove_all: () => {
    localStorage.clear()
    return true
  },
}

export default localStoreUtil
