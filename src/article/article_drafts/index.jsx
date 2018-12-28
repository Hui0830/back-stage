import React,{Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Tag,
    Spin,
    Modal
} from 'antd'

import { getParseDate } from 'utils'
import { ARTICLE_CLASSIFY_MAP,ARTICLE_CLASSIFY } from 'common/conf/constant';
import Empty from 'components/empty';
import { style } from './index.scss';

const listData = [];
for (let i = 1; i < 23; i++) {
    listData.push({
        id: i,
        type: (i%2 == 0) ? 0 : 1,
        tag: i%2+1,
        title: `2018 年会放假通知${i}`,
        time: '2018-12-' + i,
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}
const Item = ({ tag, title, time,articleId,deleteConfirm,onEdit }) => {
    function getTagColor(tag){
        switch(tag) {
            case ARTICLE_CLASSIFY.NOTES:
                return "geekblue";
                break;
            case ARTICLE_CLASSIFY.ACTIVITY:
                return 'orange';
                break;
            case ARTICLE_CLASSIFY.NOTICE:
                return 'magenta';
                break;
            default: return;
        }
    }
    return (
        <section className="item">
            <div className="item-title">
                <Tag color={getTagColor(tag)}>{ARTICLE_CLASSIFY_MAP[tag]}</Tag>
                <Link to={`/article/edit/${articleId}`}>
                    <h3 className='item-heater'>
                        {title}
                    </h3>
                </Link>
            </div>
            <div className="item-bottom">
                <p>保存于{time}. <span className="edit-btn" onClick={() => onEdit(articleId)}>编辑</span></p>
                <span className="delete-span" onClick={() => deleteConfirm(articleId)}>舍弃</span>
            </div>
        </section>
    )
}

class ArticleDraft extends Component {
    state = {
        listData: listData,
        loading: false
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }

    deleteConfirm = (id) => {
        Modal.confirm({
            title: '提示',
            content: `确认舍弃后${id ? '此文章' : '所有草稿箱文章'}将会彻底删除！`,
            onOk: () => this.onDelete(id)
        })
    }

    // 删除
    onDelete = (id) => {
        const { listData } = this.state;
        const afterListData = (!!id) ? listData.filter(item => item.id !== id) : [];
        console.log(!!id);
        this.setState({
            listData: afterListData,
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
                        tag={item.tag}
                        articleId={item.id}
                        title={item.title}
                        time={getParseDate(item.time).fullTime}
                        onEdit={this.onEdit}
                        deleteConfirm={this.deleteConfirm}
                        key={item.id} />)
                }
                </Spin>
                <Empty isEmpty={isEmpty} />
            </div>
        )
    }
}

export default withRouter(ArticleDraft)