export function getBuildById(map, id) {
    for (const item of map.values()) {
      if (item.id === id) {
        return item;
      }
    }
    return null; 
  }
  