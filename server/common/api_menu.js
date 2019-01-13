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
    article_add: {method: 'POST', url: 'addArticle'},
    article_put: {method: 'PUT', url: 'putArticle'},
    article_delete: {method: 'DELETE', url: 'deleteArticle'}, // @params articleId
    article_drafts: {method: 'GET', url: 'articleDrafts'}, // @params status = 0
}

// 上传文件
const imgApi = {
    uploade_img: {method: 'POST', url: 'uploadeImg'},
    delete_img: {method: 'DELETE', url: 'deleteImg'},
    get_img_info: {method: 'GET', url: 'imgInfo'},
    img_list: {method: 'GET', url: 'imgList'},
    put_img: {method: 'PUT', url: 'putImg'},
    img_classes_get: {method: 'GET', url: 'imgClasses'},
    img_classes_put: {method: 'PUT', url: 'imgClasses'},
    img_classes_add: {method: 'POST', url: 'imgClasses'},
    img_classes_delete: {method: 'DELETE', url: 'imgClasses'},
}

const apiConfig = {
    ...staffApi,
    ...userApi,
    ...webInfoApi,
    ...articleApi,
    ...imgApi
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