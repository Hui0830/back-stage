import News from 'pages/news'

export default [{
    path: '/news',
    loader: News,
    exact: true,
    async: true
},{
    path: '/news/userMessage',
    loader: News,
    async: true
}, {
    path: '/news/sysMessage',
    loader: News,
    async: true
}];