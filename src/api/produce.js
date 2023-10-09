import request from '@/utils/request'

export const getSearchedProducts = (obj) => {
  const { goodsName, page, categoryId } = obj
  return request.get('/goods/list', {
    params: {
      goodsName,
      page,
      categoryId
    }
  })
}

export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

export function getReviews (obj) {
  const { goodsId, limit } = obj
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
