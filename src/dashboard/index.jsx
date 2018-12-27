import React, { Component } from 'react';
import { List, Icon } from 'antd';
import { withRouter } from 'react-router'
import { Overview, OverviewItem, OverviewTitle } from '../components/overview';
import { style } from './index.scss';


const mainOverview = {
    revenue: { title: '主营收入', desc: '除充值和耗卡以外，所有今日订单金额的总和', count: '-' },
    recharge: { title: '充值金额', desc: '今日网店和门店销售充值卡以及充值收款金额的总和', count: '-' },
    card: { title: '耗卡金额', desc: '今日通过充值余额付款金额的总和', count: '-' },
    gift: { title: '赠送消耗', desc: '今日售出的充值卡和次卡赠送的服务权益次数中已使用的服务权益次数之和', count: '-' },
    cardCostMoney: {
        title: '卡耗金额',
        desc: '今日卡内消耗的总金额',
        count: '-',
    },
};

const subOverview = {
    customer: { title: '到店人数', desc: '今日门店开单的人数', count: '-' },
    reserve: { title: '预约单数', desc: '今天网店和门店成功的预约单数之和', count: '-' },
    order: { title: '订单数', desc: '今日已完成的品项订单、充值订单、售卡订单数目之和', count: '-' },
    member: { title: '新增会员', desc: '今日添加的新会员数', count: '-' },
};

const listData = [
    {
        icon: 'line-chart',
        value: '员工管理',
        href: '/staff/list'
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
                        <p onClick={() =>this.toShortcutPath(item.href)}><Icon type={item.icon} />{item.value}</p>
                    </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default withRouter(Dashboard);