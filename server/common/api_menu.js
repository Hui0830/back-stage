const staffApi = {
    staff: {method: 'GET', url: 'staffInfo'},
    staff_add: {method: 'POST', url: 'addStaff'},
    staff_list: {method: 'GET', url: 'staffList'},
    staff_put: {method: 'PUT', url: 'putStaff'},
    staff_delete: {method: 'DELETE', url: 'deleteStaff'}
}

const userApi = {
    user: {method: 'GET', url: 'userInfo'},
    user_sign_in: {method: 'POST', url: 'login'},
    user_sign_out: {method: 'GET', url: 'loginOut'},

}

const webInfoApi = {
    web: {method: 'GET', url: 'webPreviewInfo'}
}

const articleApi = {
    article: {method: 'GET', url: 'articleInfo'},
    article_list: {method: 'GET', url: 'articleList'},
    article_add: {method: 'POST', url: 'addArticle'}
}

const apiConfig = {
    ...staffApi,
    ...userApi,
    ...webInfoApi,
    ...articleApi
}

const getRouterApi = (key) => {
    return JSON.stringify(apiConfig[key]);
}

module.exports = {
    getRouterApi,
    staffApi,
    userApi,
    webInfoApi,
};