import React,{ Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Divider,Button,message, Popconfirm } from 'antd';

import { getParseDate } from 'utils';
import ArticleView from '../components/article_view';
import { style } from './index.scss';


const listData = [];
for (let i = 1; i < 23; i++) {
    listData.push({
        id: i,
        type: (i%2 == 0) ? 0 : 1,
        title: `2018 年会放假通知${i}`,
        time: '2018-12-' + i,
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

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
        setTimeout(() => {
            this.getArticleInfo(params.id);
        }, 1000)
    }

    getArticleInfo = (id) => {
        const articleInfo = listData.filter(item => item.id == id)[0];
        this.setState({
            articleInfo,
            loading: false,
        });
        
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
    onclick() {
        console.log(this);
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
                    <button onClick={this.onclick}>test</button>
                {/* </Spin> */}
            </div>
        )
    }
}

export default withRouter(ActicleMain);