import React, { Component } from 'react';
import { List, Icon } from 'antd';
import { withRouter } from 'react-router'
import { Overview, OverviewItem, OverviewTitle } from '../components/overview';
import { style } from './index.scss';


const mainOverview = {
    revenue: { title: '浏览量(PV)', desc: '当日网站被浏览次数', count: '-' },
    recharge: { title: '访客数(UV)', desc: '当日网站被浏览人数', count: '-' },
    card: { title: 'IP数', desc: '当日网站被浏览的Ip总数', count: '-' },
    gift: { title: '平均访问时长', desc: '当日网站被浏览的平均时长', count: '-' },
};

const subOverview = {
    customer: { title: '服务器使用剩余（天）', desc: '当前使用的服务器剩余的天数', count: '-' },
    reserve: { title: '域名使用剩余（天）', desc: '当前使用的域名剩余的天数', count: '-' },
    order: { title: 'CDN服务器使用剩余（天）', desc: '当前使用的CDN服务器剩余的天数', count: '-' },
};

const listData = [
    {
        icon: 'team',
        iconColor: 'blue',
        value: '员工管理',
        href: '/staff/list'
    },
    {
        icon: 'setting',
        iconColor: 'blue',
        value: '网站装修',
        href: '/website/decorate'
    },
    {
        icon: 'picture',
        iconColor: '#c3e45',
        value: '素材中心',
        href: '/staff/list'
    },
    {
        icon: 'read',
        iconColor: '#45a231',
        value: '文章管理',
        href: '/article/list'
    },
    {
        icon: 'user',
        iconColor: '#eee',
        value: '发布文章',
        href: '/article/add'
    },
    {
        icon: 'message',
        iconColor: '#fef3ef',
        value: '消息中心',
        href: '/news/userMessage'
    }
]

class Dashboard extends Component {

    state = {

    }
    toShortcutPath = (path) => {
        this.props.history.push(path);
    }

    renderOverview = () => {
        return (
            <div className="dashboard-top">
                <Overview>
                    {
                        Object.keys(mainOverview).map((key) => {
                            const item = mainOverview[key];
                            return (
                                <OverviewItem
                                    key={key}
                                    title={
                                        <OverviewTitle title={item.title} desc={item.desc} />
                                    }
                                    value={item.count}
                                />
                            );
                        })
                    }
                </Overview>
                <Overview style={{ background: '#fff', marginTop: '10px' }}>
                    {
                        Object.keys(subOverview).map((key) => {
                            const item = subOverview[key];
                            return (
                                <OverviewItem
                                    title={
                                        <OverviewTitle title={item.title} desc={item.desc} />
                                    }
                                    value={item.count}
                                    key={key}
                                />
                            );
                        })
                    }
                </Overview>
            </div>
        );
    }
    render() {
        return (
            <div className={style}>
                {this.renderOverview()}
                <div className="title">常用功能</div>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={listData}
                    renderItem={item => (
                    <List.Item>
                        <p className="common-function" onClick={() =>this.toShortcutPath(item.href)}><Icon theme="twoTone" twoToneColor={item.iconColor} type={item.icon} />{item.value}</p>
                    </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default withRouter(Dashboard);