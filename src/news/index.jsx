import React, { Component } from 'react';
import { getParseDate } from 'utils'
import {
    Icon,
    Modal,
    Spin,
    Pagination,
} from 'antd'

import { getNews,deleteNews } from 'Api/news';

import Empty from 'components/empty';
import { style } from './index.scss'

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
        data: [],
        timeSort: 0,
        loading: true,
        pageSize: 3,
        current: 1,
        total: 0,
        listCache: {},
        lastId: ''
        
    }

    componentDidMount() {
        this.getNewsList()
    }

    getNewsList = (_id = '') => {
        const { pageSize, current,listCache,timeSort } = this.state;
        getNews(_id,pageSize,timeSort).then(res => {
            const { list } = res.data;
            this.setState({
                loading: false,
                data: list,
                lastId: list.length> 0 ? list[list.length-1]._id : '',
                listCache: {...listCache, [current]: list}
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

    onDelete = (uid) => {
        if(!this.state.data.length){
            return;
        }
        Modal.confirm({
            title: '提示',
            content: <p>{uid ? '是否确认删除此留言信息' : '是否确认清空所有留言信息'}</p>,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => this.deleteHandle(uid),
        })
        
    }

    // 删除图片
    deleteHandle = (_id) => {
        deleteNews(_id).then(res => {
            const { listCache, current } = this.state;
            const listCacheKeys = Object.keys(listCache).filter(key => (key < current));
            let page = current;
            const len = listCache[current].length;
            console.log(listCache)
            if( len=== 1 && current !== 1) {
                this.setState({
                    current: page - 1
                })
            } else {
                this.setState({
                    lastId: listCache[current][0]._id,
                    listCache: listCacheKeys.map(key => listCache[key])
                }, () => this.getNewsList(this.state.lastImgId))
            }
            message.success(res.msg);
        })
    }


    onSort = () => {
        this.setState({
            timeSort: this.state.timeSort ? 0 : -1
        })
    }

    onChange = (page, pageSize) => {
        const { listCache, lastId } = this.state;
        if(listCache[page]){
            this.setState({
                images: listCache[page],
                current: page
            })
            return
        }
        this.setState({
            current: page
        },() => {
            this.getNewsList(lastId)
        })
      }

    render() {
        const { data,timeSort,loading,current,total,pageSize } = this.state;
        return (
           <div className={style}>
                <div className="top">
                    <span onClick={() => this.onSort('time')}>时间排序: <Icon type={timeSort ? "arrow-up" : "arrow-down"} /></span>
                    <span className="delete-all" onClick={() => this.onDelete('all')}>一键清空<Icon type="delete" /></span>
                </div>
                <Spin spinning={loading}>
                    <div className="content">
                        {
                            data.map(item => <NewItem {...item} onDelete={() =>this.onDelete(item._id)} />)
                        }
                    </div>
                    <Empty isEmpty={data.length === 0} />
                </Spin>
                    <Pagination
                        defaultCurrent={1}
                        hideOnSinglePage
                        current={current}
                        onChange={this.onChange}
                        total={total}
                        pageSize={pageSize}
                    />
           </div>
        )
    }
}

export default News;