export function updateDataList(newObj, updateArrary) {
  // 更新数据
  updateArrary.forEach((oldObj, index) => {
    if (newObj.id === oldObj.id) {
      updateArrary.splice(0, 1, newObj)
      return
    }
  })
}
