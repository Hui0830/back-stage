import React,{Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Tag,
    Spin,
    Modal,
    message
} from 'antd'

import { getArticleDrafts,deleteArticle } from 'Api/article';

import { getParseDate } from 'utils'
import { ARTICLE_TAG_MAP,ARTICLE_TAG } from 'common/conf/constant';
import Empty from 'components/empty';
import { style } from './index.scss';

const Item = ({ tag, title, time,articleId,deleteConfirm,onEdit,author }) => {
    function getTagColor(tag){
        switch(parseInt(tag)) {
            case ARTICLE_TAG.NOTES:
                return "geekblue";
                break;
            case ARTICLE_TAG.ACTIVITY:
                return 'orange';
                break;
            case ARTICLE_TAG.NOTICE:
                return 'magenta';
                break;
            default: return;
        }
    }
    return (
        <section className="item" key = {articleId}>
            <div className="item-title">
                <Tag color={getTagColor(tag)}>{ARTICLE_TAG_MAP[tag]}</Tag>
                <Link to={`/article/edit/${articleId}`}>
                    <h3 className='item-heater'>
                        {title}
                    </h3>
                </Link>
            </div>
            <div className="item-bottom">
                <p className="edit-info">最新由<span>{author}</span>修改保存于{time}. <span className="edit-btn" onClick={() => onEdit(articleId)}>编辑</span></p>
                <span className="delete-span" onClick={() => deleteConfirm(articleId)}>舍弃</span>
            </div>
        </section>
    )
}

class ArticleDraft extends Component {
    state = {
        listData: [],
        loading: false
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        getArticleDrafts().then(res => {
            this.setState({
                loading: false,
                listData: res.data || [],
            })
        })
    }

    deleteConfirm = (id) => {
        Modal.confirm({
            title: '提示',
            content: `确认舍弃后${id ? '此文章' : '所有草稿箱文章'}将会彻底删除！`,
            onOk: () => this.onDelete(id),
            okType: 'danger',
            okText: `删除${id ? '' : '全部'}`,
            cancelText: '取消'
        })
    }

    // 删除
    onDelete = (id) => {
        const { listData } = this.state;
        this.setState({
            loading: true
        })
        const articleId = id || 'status_0';
        deleteArticle(articleId).then((res) => {
            const afterListData = (articleId === 'status_0') ? [] : listData.filter(item => item._id !== articleId);
            message.success(res.msg);
            this.setState({
                listData: afterListData,
                loading: false
            })
        })
    }

    onEdit = (id) => {
        this.props.history.push(`/article/edit/${id}`)
    }

    render() {
        const { loading,listData } = this.state;
        const isEmpty = listData.length == 0;
        return (
            <div className={style}>
                <div className="header">
                    <span className="header-title">我的草稿箱</span>
                    <span className="delete-btn" onClick={() => this.deleteConfirm()}>舍弃全部草稿</span>
                </div>
                <Spin spinning={loading}>
                {
                    listData.map(item => <Item
                        key={item._id}
                        tag={item.tag}
                        articleId={item._id}
                        title={item.title}
                        author={item.author}
                        time={getParseDate(item.time).fullTime}
                        onEdit={this.onEdit}
                        deleteConfirm={this.deleteConfirm}
                        />)
                }
                </Spin>
                <Empty isEmpty={isEmpty} />
            </div>
        )
    }
}

export default withRouter(ArticleDraft)