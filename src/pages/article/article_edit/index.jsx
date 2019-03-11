import React,{ PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Input,
    Divider,
    Select,
    Button,
    Modal,
    message
} from 'antd';
import TipTitle from 'components/tip_title';
import E from 'wangeditor'

import { addArticle, getArticleInfo, putArticle } from 'Api/article'
import { ARTICLE_TAG_MAP, ARTICLE_STATUS } from 'common/conf/constant';
import { getParseDate } from 'utils';

import { style } from './index.scss';
import ArticleView from  '../components/article_view';

const { Option } = Select;
const selectData = Object.keys(ARTICLE_TAG_MAP).map(key => ({id: key, name: ARTICLE_TAG_MAP[key]}));
const token = localStorage.getItem('token');
let editor;
class ArticleEdit extends PureComponent {
    static defaultProps = {
        isEdit: true,
    }
    state = {
        title: '',
        describe: '',
        tag: '0',
        content: '',
        status: ARTICLE_STATUS.SAVE,
        openPreview: false
    }
    componentDidMount() {
        const elem = this.refs.editorElem
        editor = new E(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig = {
            onchange: (html) => {
                this.setState({
                    content: html
                })
            },
            uploadImgServer: '/api/uploadeImg',
            uploadImgHeaders: {
                Authorization: `Bearer ${token}`
            },
            uploadImgHooks: {
                customInsert: function (insertImg, result, editor) {
                    console.log(result)
                    var url = result.data._doc.url;
                    insertImg(`http://plk956cz3.bkt.clouddn.com/${url}`)
                }
            }
        }
        editor.create();
        editor.txt.html('<p>文章正文内容</p>');

        // 编辑模式下获取用户信息
        this.getInfo();
    }
    componentWillMount() {
        editor = null
    }

    getInfo = () => {
        const { match, isEdit } = this.props;
        const { id } = match.params;
        isEdit && getArticleInfo(id).then(res => {
            const { title, describe, tag, content,status } = res.data;
            editor.txt.html(content);
            this.setState({
                title,
                describe,
                tag: tag.id,
                content,
                status,
                loading: false,
            });
        })
    }

    //响应Input
    onInputChange = (type, e) => {
        switch (type) {
            case 1:
                this.setState({
                    title: e.target.value
                });
                break;
            case 2: 
                this.setState({
                    describe: e.target.value
                });
                break;
            default: return;
        }
    }
    //发布publish/保存文章save
    onSave = (status = ARTICLE_STATUS.SAVE) => {
        const { title,describe,content,tag } = this.state;
        const { isEdit, match, history } = this.props;
        const tags = selectData.filter(i => i.id == tag)[0];
        // 如果没有设置describe默认使用内容的前100字符
        const defaultDescribe = (describe.trim() == '') ? (editor.txt.text().slice(0,100) + '.....') : describe;
        if(isEdit) {
            putArticle({title, describe: defaultDescribe, content, tag: tags, status, articleId:match.params.id }).then(res => {
                message.success(res.msg);
                history.replace(`/article/detail/${match.params.id}`)
            })
        } else {
            addArticle({title, describe: defaultDescribe, content, tag: tags, status}).then(res => {
                message.success(res.msg);
                history.replace('/article/list');
            })
        }
    }
    render() {
        const { tag,title,describe,openPreview,content,status } = this.state;
        const { isEdit } = this.props;
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
                    <label htmlFor="describe">副标题：</label>
                    <Input
                        defaultValue={describe || ''}
                        placeholder='文章主标题'
                        id="describe"
                        value={describe}
                        onChange={(e) => this.onInputChange(2,e)}
                    />
                </div>
                <div className="select-container">
                    <span>文章分类：</span>
                    <Select 
                        value={tag}
                        placeholder='选择分类'
                        onChange={(val) => this.setState({tag: val})}
                    >
                        {
                            selectData.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                        }
                    </Select>
                </div>
                <TipTitle title="正文" />
                <article ref="editorElem" style={{textAlign: 'left'}} />
                <Divider />
                <div className="footer">
                    <Button onClick={() => this.onSave(status)}>保存{isEdit && '编辑'}</Button>
                    {(status == ARTICLE_STATUS.SAVE) && <Button onClick={() => this.onSave(ARTICLE_STATUS.PUBLISH)}>发布文章</Button>}
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
                    <ArticleView articleInfo={{title, content,describe}} time={getParseDate().fullTime} />
                </Modal>
            </div>
        )
     }
}

export default withRouter(ArticleEdit);