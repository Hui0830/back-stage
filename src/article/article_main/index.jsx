import React,{ Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Divider,Button,message, Popconfirm } from 'antd';

import { getArticleInfo } from 'Api/article';

import { getParseDate } from 'utils';
import ArticleView from '../components/article_view';
import { style } from './index.scss';


class ActicleMain extends Component {
    state = {
        articleInfo: '',
        loading: false,
    }

    componentDidMount() {
        const { params } = this.props.match;
        this.setState({
            loading: true,
        });
        this.getArticleInfo(params.id)
    }

    getArticleInfo = (id) => {
        getArticleInfo(id).then(res => {
            this.setState({
                articleInfo: res.data,
                loading: false,
            });
        })     
    }
    // 删除提示
    confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
      }
      
    cancel = (e) => {
        console.log(e);
        message.error('Click on No');
      }
    render() {
        const { match } = this.props;
        const { loading, articleInfo } = this.state;
        return (
            <div className={style}>
                {/* <Spin spinning={loading}> */}
                    <ArticleView articleInfo={articleInfo} time={getParseDate(articleInfo.time).fullTime} loading={loading} />
                    <Divider />
                    <div className="edit">
                        <Button ghost type="primary" icon="edit"><Link to={`/article/edit/${match.params.id}`}>编辑</Link></Button>
                        <Popconfirm title="Are you sure delete this task?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                            <Button ghost type="danger" icon="delete">删除</Button>
                        </Popconfirm>
                    </div>
                {/* </Spin> */}
            </div>
        )
    }
}

export default withRouter(ActicleMain);