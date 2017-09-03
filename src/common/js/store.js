export function saveToLocal(id, key, value) {
  //拿localStorage
  let seller = window.localStorage._seller_;
  if (!seller) {
      seller = {};
      seller[id] = {};
      seller[id][key] = value;
  } else {
      seller = JSON.parse(seller);
      if (!seller[id]) {
        seller[id] = {};
      }
  }
  seller[id][key] = value;
  window.localStorage._seller_ = JSON.stringify(seller);
};

export function loadFromLocal(id, key, def) {
  //拿localStorage
  let seller = window.localStorage._seller_;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  //初始状态未收藏，是没有seller[id]
  if (!seller) {
    return def;
  }
  if (!id) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
};
