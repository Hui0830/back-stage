import React, { Component } from 'react';
import { getParseDate } from 'utils'
import {
    Icon,
    Modal
} from 'antd'

import Empty from 'components/empty';
import { style } from './index.scss'

let data = [];
for(let i = 2; i < 30; i++) {
    data.push({
        uid: i,
        firstName: 'li',
        lastName: '文辉',
        time: `2018-12-${i} 10:${i}:00`,
        content: '九分裤哈看到房间号尽快回复卡绝代风华看客户肌肤都可发货了减肥挥洒的克己复礼看见法兰克福陆海空军粉红色的卡就好看见好看黑科技好渴',
        mail: '1285227393@qq.com',
        tel: '15727785909'
    })
}

const NewItem = ({firstName, lastName, time, content, mail, tel, uid, onDelete}) => {
    return (
        <div className="new-item">
            <p className="header">
                <span className="name"><Icon type="user" />{`${firstName}  ${lastName}`}</span>
                <span className="time">{getParseDate(time).fullTime}</span>
                <span className="delete" onClick={() => onDelete(uid)}><Icon type="delete" /></span>
            </p>
            <p className="content">{content}</p>
            <div className="footer">
                <span className="mail"><Icon type="mail" />{mail}</span>
                <span className="tel"><Icon type="phone" />{tel}</span>
            </div>
        </div>
    )
}

class News extends Component {
    state = {
        newData: data.slice(0, 20),
        timeSort: 0,
    }

    onDelete = (uid) => {
        if(!this.state.newData.length){
            return;
        }
        Modal.confirm({
            title: '提示',
            content: <p>{uid ? '是否确认删除此留言信息' : '是否确认清空所有留言信息'}</p>,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                let data = [];
                if(uid) {
                    data = this.state.newData.filter(item => item.uid !== uid)
                }
                console.log(uid,data)
                this.setState({
                    newData: data,
                })
            },
        })
        
    }

    onSort = () => {
        this.setState({
            newData: this.state.newData.sort((a, b) => {
                const second_a = new Date(a);
                const second_b = new Date(b);
                return second_a.getSeconds() - second_b.getSeconds();
            }),
            timeSort: this.state.timeSort ? 0 : 1
        })
    }

    render() {
        const { newData,timeSort } = this.state;
        return (
           <div className={style}>
                <div className="top">
                    <span onClick={() => this.onSort('time')}>时间排序: <Icon type={timeSort ? "arrow-up" : "arrow-down"} /></span>
                    <span className="delete-all" onClick={() => this.onDelete()}>一键清空<Icon type="delete" /></span>
                </div>
                <div className="content">
                    {
                        newData.map(item => <NewItem {...item} onDelete={this.onDelete} />)
                    }
                </div>
                <Empty isEmpty={newData.length === 0} />
           </div>
        )
    }
}

export default News;