import React,{ Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Input,
    Divider,
    Select,
    Button,
    Modal
} from 'antd';
import TipTitle from 'components/tip_title';
import E from 'wangeditor'

import { getParseDate } from 'utils';
import { style } from './index.scss';
import ArticleView from  '../components/article_view';

const { Option } = Select;
const selectData = [
    {
        id: 0,
        val: '公司大事记',
    },
    {
        id: 1,
        val: '公司活动',
    },
    {
        id: 2,
        val: '内部通知',
    },
    {
        id: 3,
        val: '其他',
    }
]
class ArticleEdit extends Component {
    state = {
        title: '',
        description: '',
        tag: '',
        content: 'fdafdfasffs',
        openPreview: false
    }
    componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig = {
            onchange: (html) => {
                this.setState({
                    content: html
                })
            },
            uploadImgServer: '/upload',
        }
        editor.create();
        editor.txt.html('<p>用 JS 设置的内容</p>')
    }
    //响应Input
    onInputChange = (type, e) => {
        console.log(e);
        switch (type) {
            case 1:
                this.setState({
                    title: e.target.value
                });
                break;
            case 2: 
                this.setState({
                    description: e.target.value
                });
                break;
            default: return;
        }
    }
    // 保存到草稿箱
    onSave = () => {
        const { title,description,content,tag } = this.state;
        const status = 0;
        console.log({title,tag, description, content});
    }

    //发布文章
    onPublish = () => {
        const status = 1;
        const { title,description,content,tag } = this.state;
        console.log({title,tag, description, content,status});
    }
    render() {
        const { match, isEdit } = this.props;
        const { id } = match.params;
        const { tag,title,description,openPreview,content } = this.state;

        return (
            <div className={style}>
                <TipTitle title="文章标题" />
                <div className="title">
                    <label htmlFor="title">主标题：</label>
                    <Input
                        defaultValue={title || ''}
                        value={title}
                        placeholder='文章主标题'
                        id="title"
                        onChange={(e) => this.onInputChange(1, e)}
                    />
                </div>
                <div className="description">
                    <label htmlFor="description">副标题：</label>
                    <Input
                        defaultValue={description || ''}
                        placeholder='文章主标题'
                        id="description"
                        value={description}
                        onChange={(e) => this.onInputChange(2,e)}
                    />
                </div>
                <div className="select-container">
                    <span>文章分类：</span>
                    <Select 
                        defaultValue={tag || 0}
                        placeholder='选择分类'
                        onChange={(val) => this.setState({tag: val})}
                    >
                        {
                            selectData.map(item => <Option key={item.id} value={item.id}>{item.val}</Option>)
                        }
                    </Select>
                </div>
                <TipTitle title="正文" />
                <article ref="editorElem" style={{textAlign: 'left'}} />
                <Divider />
                <div className="footer">
                    <Button onClick={this.onSave}>保存</Button>
                    <Button onClick={this.onPublish}>发布文章</Button>
                    <Button onClick={() => this.setState({openPreview: true})}>预览</Button>
                </div>
                <Modal
                    title="文章预览"
                    centered
                    visible={openPreview}
                    footer={null}
                    zIndex={100002}
                    width='80%'
                    onCancel={() => this.setState({openPreview: false})}
                    destroyOnClose={false}
                    >
                    <ArticleView articleInfo={{title, content,description}} time={getParseDate().fullTime} />
                </Modal>
            </div>
        )
     }
}

export default withRouter(ArticleEdit);