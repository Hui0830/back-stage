import React,{Component} from 'react';
import { Input, Spin, Tag, Modal,Divider,Popconfirm,Button,Icon,Form } from 'antd';

import TipTitle from 'components/tip_title';
import UploadAvatar from 'components/upload_avatar';
import favicon from '../../images/favicon.png';
import { style } from './index.scss';

const FormItem = Form.Item;

const RowInfo = ({l, r, type, isEdit}) => {
    const isIcon = type == 'img';
    const isText = (type == 'title') || (type == 'author');
    return (
        <div className="row">
            <span className="col-l" >{l}：</span>
            <div className="col-r">
                {
                    isEdit ?
                        (isIcon ? 
                            <UploadAvatar imageUrl={r} /> : 
                            (isText ? 
                                <Input defaultValue={r}/> : 
                                <Input.TextArea defaultValue={r} autosize={{ minRows: 2, maxRows: 6 }} />
                            )
                        ) :
                        (isIcon ? <img src={r} /> : r)
                }
            </div>
        </div>
    );
}
const Links = ({links,onEditLinks,onDelete,isEdit}) => {
    return (
        <div className="row">
            <p className="col-l" >友情链接：</p>
            <div className="col-r" >
                {
                    links.map(item => {
                        return (
                            <Tag key={item.link} closable={isEdit} onClose={onDelete} onClick={() => onEditLinks('edit',item)}>
                                {item.name}
                            </Tag>
                        )
                    })
                }
                {
                    isEdit && 
                    <Tag
                        onClick={() => onEditLinks('add')}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                        <Icon type="plus" /> New Tag
                    </Tag>
                }
            </div>
        </div>
    );
}
const ModalForm = Form.create()(({form, links, isAdd, handleSubmit}) => {
    const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 20 },
    };
    const { getFieldDecorator } = form;
    return (
    <Form onSubmit={handleSubmit}>
        <FormItem
            {...formItemLayout}
            label="网站名称"
        >
            {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
            })(
            <Input   placeholder="Autosize height based on content lines" />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="网站地址"
        >
            {getFieldDecorator('link', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
            })(
            <Input   placeholder="Autosize height based on content lines" />
            )}
        </FormItem>
        <FormItem className="submit-btn">
            <Button type="primary" htmlType="submit">{`确认${isAdd ? '添加' : '修改'}`}</Button>
            <Button type="primary" ghost>取消</Button>
        </FormItem>
    </Form>
    )
})
const WEB_MAP = {
    img: '网站Icon',
    title: '网站标题',
    keyword: '关键字',
    description: '网站简介',
    author: '作者',
}
class SeoEdit extends Component {
    state = {
        webInfo: {
            img: favicon,
            title: '贝美',
            keyword: '星婴没科技有限公司',
            description:'外贸',
            author: '@李文辉',
        },
        isEdit: false,
        links: [
            {
                link:'www.baidu.com',
                name: '百度',
            },
        ],
        loading: false,
    }
    componentDidMount() {
        this.setState({
            loading: true
        })
        setTimeout(this.setState({
            loading: false
        }), 3000)
    }
    // 编辑链接
    /**
     * @type
     * type = 'edit'   编辑模式；
     * type = 'add'    添加模式；
     * type不传直接返回
     */
    handleSubmit = (val,e) => {
        console.log(val);
        return false;
    }
    onEditLinks = (type ,links = {}) => {
        console.log(links);
        if(!type) {
            return;
        }
        const isAdd = type === 'add',
            isEdit = type === 'edit';
        Modal.info({
            title: isEdit ? '链接编辑' : '添加链接',
            iconType: "share-alt",
            content: <ModalForm isAdd={isAdd} links={links} handleSubmit={this.handleSubmit} />,
        })
    }
    // 链接删除
    onDelete = (deleteTag) => {
        const tags = this.state.links.filter(v => v.name !== deleteTag);
        this.setState({
            links: tags,
        })
    }
    // 编辑
    onEdit = () => {
        console.log(this.state.isEdit);
        this.setState({
            isEdit: !this.state.isEdit,
        })
    }
    // 保存修改
    onSave = () => {
        this.setState({
            isEdit: false,
        })
    }
    render() {
        const { webInfo, isEdit, links,loading } = this.state;
        return (
            <Spin spinning={loading}>
                <TipTitle title='基本设置' />
                <div className={style}>
                {
                    Object.keys(webInfo).map(key => <RowInfo key={key} l={WEB_MAP[key]} r={webInfo[key]} type={key} isEdit={isEdit} />)
                }
                <Links isEdit={isEdit} links={links} onEditLinks={this.onEditLinks} onDelete={this.onDelete}  />
                <Divider />
                <Button style={{margin:'0 20px'}} type="primary" onClick={this.onEdit}>{isEdit ? '取  消' : '编  辑'}</Button>
                {
                    isEdit &&
                    <Popconfirm placement="top" title='确认保存修改的信息吗？' onConfirm={this.onSave} okText="保存" cancelText="取消">
                        <Button type="primary">保  存</Button>
                    </Popconfirm>
                }
                </div>
            </Spin>
        )
    }
}

export default SeoEdit;