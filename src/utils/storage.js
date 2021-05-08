// 本地存储封装模块

// 获取
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    // 尝试把data转为js对象
    return JSON.parse(data)
  } catch (err) {
    // 不是json格式字符串 直接原样返回
    return data
  }
}
// 存储
export const setItem = (name, value) => {
  // 如果value是对象 就把value转为json格式字符串再存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
// 删除
export const removeItem = name => {
  window.localStorage.removeItem(name)
}