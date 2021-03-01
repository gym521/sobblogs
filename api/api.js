import http from './http';

const baseUrl = 'http://localhost:2020';

export const success_code = 200;

//获取账号信息
export const getAdminInfo = () => {
  if (process.client) {
    return http.requestGet('/user/user_info/753241436865953792');
  } else {
    return http.requestGet(baseUrl + '/user/user_info/753241436865953792');
  }
}
//获取分类列表
export const getCategories = () => {
  if (process.client) {
    return http.requestGet('/portal/article/categories');
  } else {
    return http.requestGet(baseUrl + '/portal/article/categories');
  }

}
//获取轮播图
export const getLoops = () => {
  if (process.client) {
    return http.requestGet('/portal/web_size_info/loops');
  } else {
    return http.requestGet(baseUrl + '/portal/web_size_info/loops');
  }

}
//获取置顶文章
export const getTopArticle = () => {
  if (process.client) {
    return http.requestGet('/portal/article/top');
  } else {
    return http.requestGet(baseUrl + '/portal/article/top');
  }
}
//获取标签
export const getLabels = (count) => {
  return http.requestGet('/portal/article/lable/' + count);
}
//获取文章
export const getArticle = (categoryId, page, size) => {
  if (categoryId !== '') {
    return http.requestGet('/portal/article/list/' + categoryId + '/' + page + '/' + size);
  }
  if (process.client) {
    //客户端
    return http.requestGet('/portal/article/list/' + page + '/' + size);
  } else {
    //服务端
    return http.requestGet(baseUrl + '/portal/article/list/' + page + '/' + size);
  }
}
//获取友情链接
export const getLinkList = () => {
  if (process.client) {
    //客户端
    return http.requestGet('/portal/web_size_info/friend_link');
  } else {
    //服务端
    return http.requestGet(baseUrl + '/portal/web_size_info/friend_link');
  }
}

