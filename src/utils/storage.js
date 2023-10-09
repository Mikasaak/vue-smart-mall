const USER_INFO_KEY = 'smart-mall-user-info'
const SEARCH_HISTORY_KEY = 'smart-mall-search-history'

// 用户信息持久化
export const getUserInfo = () => {
  const res = localStorage.getItem(USER_INFO_KEY)
  return res ? JSON.parse(res) : { token: '', userId: '' }
}
export const setUserInfo = (userInfo) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}
export const removeUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY)
}

// 搜索历史持久化
export const getSearchHistory = () => {
  const res = localStorage.getItem(SEARCH_HISTORY_KEY)
  return res ? JSON.parse(res) : []
}
export const setSearchHistory = (searchHistory) => {
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory))
}
