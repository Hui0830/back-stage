import React from 'react';

import ArticleList from '../../article/lists';
import ArticleMain from '../../article/article_main';
import ArticlaEdit from '../../article/article_edit';
import ArticleDraft from '../../article/article_drafts';
import Article from '../../article'

const ArticleAdd = () => {
    return <ArticlaEdit isEdit={false} />
}

export default [{
    path: '/article',
    component: Article,
    exact: true,
}, {
    path: '/article/list',
    component: ArticleList,
    exact: true,
}, {
    path: '/article/edit/:id',
    component: ArticlaEdit,
}, {
    path: '/article/add',
    component: ArticleAdd,
}, {
    path: '/article/drafts',
    component: ArticleDraft,
}, {
    path: '/article/:id',
    component: ArticleMain,
}];