const menu = {
    dashboard: {
        mid: 'dashboard',
        key: 'dashboard',
        href: '/dashboard',
        text: '工作台',
        icon: 'desktop',
    },
    staff: {
        mid: 'staff',
        key: 'staff',
        href: '/staff',
        text: '员工管理',
        icon: 'team',
        subMenu: {
            list: {
                name: '员工列表',
                href: 'staff/list',
                default: true,
            },
            add: {
                name: '添加员工',
                href: 'staff/add',
            },
        },
    },
    website: {
        mid: 'website',
        key: 'website',
        href: '/website',
        text: '网站管理',
        icon: 'setting',
        subMenu: {
            decorate: {
                name: '网站装修',
                href: 'website/decorate',
                default: true,
            },
            seo: {
                name: '网站SEO',
                href: 'website/seo',
            },
        },
    },
    article: {
        mid: 'article',
        key: 'article',
        href: '/article',
        text: '文章管理',
        icon: 'read',
        subMenu: {
            list: {
                name: '文章列表',
                href: 'article/list',
                default: true,
            },
            add: {
                name: '发布文章',
                href: 'article/add',
            },
            drafts: {
                name: '草稿箱',
                href: 'article/drafts',
            },
        },
    },
    stuff: {
        mid: 'stuff',
        key: 'stuff',
        href: '/stuff',
        text: '素材管理',
        icon: 'picture',
        subMenu: {
            img: {
                name: '图库',
                href: 'stuff/img',
                default: true,
            },
            video: {
                name: '视频',
                href: 'stuff/video',
            },
        },
    },
    news: {
        mid: 'news',
        key: 'news',
        href: '/news',
        text: '消息管理',
        icon: 'message',
        subMenu: {
            userMessage: {
                name: '网站留言',
                href: 'news/userMessage',
                default: true,
            },
            sysMessage: {
                name: '系统消息',
                href: 'news/sysMessage',
            },
        },
    },
    recruit: {
        mid: 'recruit',
        key: 'recruit',
        href: '/recruit',
        text: '招聘管理',
        icon: 'eye',
        subMenu: {
            list: {
                name: '简历列表',
                href: 'recruit/list',
                default: true,
            },
            add: {
                name: '发布职位',
                href: 'recruit/add',
            },
        },
    }
}
const breadcrumbMap = {};
Object.keys(menu).forEach(key => {
    const {subMenu, href, text} = menu[key];
    if(href === '/dashboard') return;
    breadcrumbMap[href] = text;
    subMenu && Object.keys(subMenu).forEach(item => {
        const {href, name} = subMenu[item]
        breadcrumbMap[`/${href}`] = name;
    })
})
export const breadcrumbNameMap = breadcrumbMap;
export default menu;