import React,{Component} from 'react';
import { Input, Spin, Tag, Modal,Divider,Popconfirm,Button,Icon,Form } from 'antd';

import { getWebBaseInfo,putWebBaseInfo } from 'Api/web';
import { WEB_SEO_INFO, WEB_BASE_INFO } from 'common/conf/constant';

import TipTitle from 'components/tip_title';
import UploadAvatar from 'components/upload_avatar';
import favicon from '../../../images/favicon.png';
import { style } from './index.scss';

const FormItem = Form.Item;


const RowInfo = ({l, r, type, isEdit, tip,onChange}) => {
    const isIcon = ['logo', 'favicon'].includes(type);
    const isText = ['title', 'name', 'tel', 'author','copyright'].includes(type);
    return (
        <div className="row">
            <span className="col-l" >{l}：</span>
            <div className="col-r">
                {
                    isEdit ?
                        (isIcon ? 
                            <UploadAvatar name={type} onChange={(url) => onChange(type,url)} imageUrl={r} /> : 
                            (isText ? 
                                <Input onChange={(e) => onChange(type, e)} defaultValue={r} placeholder={l}/> : 
                                <Input.TextArea onChange={(e) => onChange(type, e)} defaultValue={r} placeholder={l} autosize={{ minRows: 2, maxRows: 6 }} />
                            )
                        ) :
                        (isIcon ? <span className="image"><img src={r} /></span> : r)
                }
            </div>
            {isEdit && <div className="tip">*{tip}</div>}
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
                            <Tag key={`${item._id}_${item.name}`} closable={isEdit} onClose={onDelete} onClick={() => onEditLinks('edit',item)}>
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
const ModalForm = Form.create()(({form,isEdit,onClose, link = {}, onLinkSave}) => {
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
          },
    };
    const { getFieldDecorator } = form
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
          if (!err) {
            onLinkSave(link._id || '',values);
            onClose();
          }
        });
    };
    return (
    <Form onSubmit={handleSubmit}>
        <FormItem
            {...formItemLayout}
            label="网站名称"
        >
            {getFieldDecorator('name', {
                rules: [{ required: true, message: '链接呢称!' }],
                initialValue: link ? link.name : '',
            })(
            <Input disabled={!isEdit}  style={{width: 250,marginLeft: 20}}  placeholder="链接呢称" />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="网站地址"
        >
            {getFieldDecorator('url', {
            rules: [{ required: true, message: '请输入网站地址!' }],
            initialValue: link ? link.url : '',
            })(
            <Input disabled={!isEdit} style={{width: 250,marginLeft: 20}}   placeholder="网站地址" />
            )}
        </FormItem>
        {isEdit && <div className="submit-btn">
            <Button htmlType="submit">{`${!link.name ? '添 加' : '修 改'}`}</Button>
        </div>}
    </Form>
    )
})

class SeoEdit extends Component {
    state = {
        webInfo: {
            logo: favicon,
            favicon: favicon,
            title: '',
            keywords: '',
            description:'',
            author: '@',
            name: '',
            tel: '',
            address: '',
            copyright: '',
            links: [
                {
                    url:'www.baidu.com',
                    name: '百度',
                },
            ]
        },
        isEdit: false,
        loading: false,
    }
    componentDidMount() {
        this.getWebInfo();
    }
    // 获取网站基本数据
    getWebInfo = () => {
        this.setState({
            loading: true
        })
        getWebBaseInfo().then(res => {
            this.setState({
                loading: false,
                webInfo: res.data
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }
    // 编辑链接
    /**
     * @type
     * type = 'edit'   编辑模式；
     * type = 'add'    添加模式；
     * type不传直接返回
     */
    onLinkSave = (id,value) => {
        const { webInfo } = this.state;
        const { links } = webInfo;
        let afterLinks = links.slice();
        if(id) {
            afterLinks.map(item => {
                if(item.id === id) {
                    return {
                        ...item,
                        ...value
                    }
                }
                return item
            })
        } else {
            if(afterLinks.filter(v => v.name == value.name).length > 0){
                message.info('添加链接已存在！');
                return;
            }
            afterLinks.push({...value})
        }
        this.setState({
            webInfo: {
                ...webInfo,
                links: afterLinks
            }
        })
    }
    onEditLinks = (type ,link = {}) => {
        const isAdd = type === 'add';
        const destroyModal = (modal) => {
            modal.destroy();
        }
        const modal = Modal.info({
            title: !isAdd ? '链接编辑' : '添加链接',
            iconType: "share-alt",
            okText: '取  消',
            width: 500,
            className: 'linksModal',
            content: <ModalForm isEdit={this.state.isEdit} onClose={() => {destroyModal(modal)}} link={link} onLinkSave={this.onLinkSave} />,
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
        this.setState({
            isEdit: !this.state.isEdit,
        })
    }
    // input
    onChange = (type, e) => {
        const val = ['favicon','logo'].includes(type) ? e : e.target.value;
        this.setState({
            webInfo: {...this.state.webInfo, [type]: val}
        })
    }
    // 保存修改
    onSave = () => {
        const data = this.state.webInfo;
        putWebBaseInfo({data}).then(res => {
            console.log('更新网站基本数据',res)
        })
        this.setState({
            isEdit: false,
        })
        
    }
    render() {
        const { webInfo, isEdit,loading } = this.state;
        const { links, ...web } = webInfo;
        return (
            <Spin spinning={loading}>
                <TipTitle title='基本设置' />
                <div className={style}>
                {
                    WEB_BASE_INFO.map(item => 
                        <RowInfo
                            key={item.key}
                            l={item.name}
                            r={web[item.key]}
                            type={item.key}
                            tip={item.tip}
                            onChange={this.onChange}
                            isEdit={isEdit} />)
                }
                <TipTitle title='SEO设置' />
                {
                    WEB_SEO_INFO.map(item => 
                        <RowInfo
                            key={item.key}
                            l={item.name}
                            r={web[item.key]}
                            type={item.key}
                            tip={item.tip}
                            onChange={this.onChange}
                            isEdit={isEdit} />)
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