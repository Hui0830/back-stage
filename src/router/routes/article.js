import React from 'react';

import ArticlaEdit from 'pages/article/article_edit';

const ArticleAdd = () => {
    return <ArticlaEdit isEdit={false} />
}
export default [{
    path: '/article',
    loader: () => import('pages/article'),
    exact: true,
}, {
    path: '/article/list',
    loader: () => import('pages/article/lists'),
    exact: true,
}, {
    path: '/article/edit/:id',
    loader: ArticlaEdit,
    async: true
}, {
    path: '/article/add',
    loader: ArticleAdd,
    async: true
}, {
    path: '/article/drafts',
    loader: () => import('pages/article/article_drafts'),
}, {
    path: '/article/detail/:id',
    exact: true,
    loader: () => import('pages/article/article_main'),
}];