import React,{PureComponent} from 'react';
import { withRouter } from 'react-router-dom';
import { Form,Input,Select,Icon,Button,TreeSelect,Radio,Affix,message,Spin,DatePicker,TimePicker } from 'antd';
import E from 'wangeditor'

import { getProductClass,getProductInfo,addProduct,putProductInfo } from 'Api/product';

import { selectStaff } from 'components/select_staff';
import { imageFix } from 'common/conf/constant'

import { style } from './index.scss';


const { Item } = Form;
const { Option } = Select;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const token = localStorage.getItem('token');
let editor;

class EditProduct extends PureComponent {
    static defaultProps = {
        isEdit: false,
    }
    state = {
        product: '',
        images: [],
        describe: '',
        typeClass: [],
        classes: [],
        treeData: [],
        status: 0,
        visible: false,
        sellTime: null,
        sellDate: null,
        defaultKeys:[0]

    }
    componentDidMount() {
        this.getProductClass();
        this.getProductInfo();
        const elem = this.refs.editorElem
        editor = new E(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig = {
            onchange: (html) => {
                this.setState({
                    describe: html
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
        // this.getInfo();
    }
    componentWillUnmount() {
        editor = null;
    }
    /**宝贝规格事件 */
    remove = (k) => {
        const keys = this.props.form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        this.props.form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }
    add = () => {
        const keys = this.props.form.getFieldValue('keys');
        const nextKeys = keys.concat(this.state.classes.length + 1);
        console.log(keys, nextKeys)
        this.props.form.setFieldsValue({
            keys: nextKeys,
        });
    }
    onImgClick = (id) => {
        selectStaff((url) => this.props.form.setFieldsValue({
            [`classes[${id}][image]`]: url
        }))
    }
    /**宝贝主图事件 */
    addImage = () => {
        selectStaff((url) => this.setState({
            images: [...this.state.images, url]
        }))
    }
    deleteImage = (key) => {
        const imgs = this.state.images.slice();
        imgs.splice(key, 1);
        this.setState({
            images: imgs,
        })
    }
    // 本店分类
    onChange = (value) => {
        console.log('onChange ', value);
        this.setState({ typeClass: value });
    }
    //上架时间
    onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            status: e.target.value,
        });
    }
    onSelectDate = (date,dateString) => {
        this.setState({
            sellDate: date
        })
    }
    onSelectTime = (time,timeString) => {
        this.setState({
            sellTime: time
        })
    }
    /** 服务器交互事件*/

    handleSubmit = (e) => {
        e.preventDefault();
        const { images, status, typeClass,describe  } = this.state;
        const { match,isEdit,history } = this.props;
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const params = {...values,images, status, typeClass,describe}
            if(isEdit) {
                putProductInfo({
                    ...params,
                    _id: match.params.id,
                }).then(res => {
                    message.success('修改成功')
                    history.replace(`/product/info/${match.params.id}`)
                })
            } else {
                addProduct(params).then(res => {
                    message.success('宝贝添加成功')
                    history.replace(`/product/drafts`)
                })
            }
          }
        });
    }
    //编辑模式下获取宝贝信息
    getProductInfo = () => {
        const { match,isEdit,form } = this.props;
        if(isEdit) {
            this.setState({
                visible: true
            });
            getProductInfo(match.params.id).then(res => {
                const { images, status, typeClass,describe,classes, ...data } = res.data;
                editor.txt.html(describe);
                form.setFieldsValue({
                    ...data
                })
                this.setState({
                    images,
                    status,
                    typeClass,
                    classes,
                    defaultKeys: classes.map((v, key) => key),
                    visible: false
                });
            }).catch(e => {
                this.setState({
                    visible: false
                })
            });
        }
    }
    //获取本店分类
    getProductClass = () => {
        getProductClass().then(res => {
            const data = res.data.map(item => {
                return {
                    title: item.name,
                    value: item._id,
                    key: item._id,
                    children: item.leaf.map(v => {
                        return {
                            title: v.name,
                            value: v._id,
                            key: v._id,
                        }
                    })
                }
            })
            this.setState({
                treeData: data
            })
        })
    }
    render() {
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const { images,treeData,visible,defaultKeys,status,sellTime,sellDate } = this.state;
        getFieldDecorator('keys', { initialValue: defaultKeys });
        const keys = getFieldValue('keys');
        const formItems = keys.map((id) => (
            <div key={id}>
            <Item
                key={`value_${id}`}
            >
            {
                getFieldDecorator(`classes[${id}][value]`, {
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: '宝贝规格不能为空!'
                    }],
                    initialValue: this.state.classes[id] ? this.state.classes[id].value : '',
                })(<Input placeholder="输入宝贝规格" style={{width: 250}}/>)
            }
            </Item>
            <Item key={`price_${id}`}>
            {
                getFieldDecorator(`classes[${id}][price]`, {
                    validateTrigger: ['onBlur'],
                    rules: [{
                        pattern: /^[0-9]+(.[0-9]+)?$/,required: true,whitespace: true, message: '输入正确价格!'
                    }],
                    initialValue: this.state.classes[id] ? this.state.classes[id].price : '',
                })(<Input placeholder="输入宝贝原价" style={{width: 120}}/>)
            }
            </Item>
            <Item key={`salePrice_${id}`}>
            {
                getFieldDecorator(`classes[${id}][salePrice]`, {
                    validateTrigger: ['onBlur'],
                    rules: [{
                        pattern: /^[0-9]+(.[0-9]+)?$/, message: '输入正确折扣后价格!'
                    }],
                    initialValue: this.state.classes[id] ? this.state.classes[id].salePrice : '',
                })(<Input placeholder="输入宝贝售价" style={{width: 120}}/>)
            }
            </Item>
            <Item>
            {
                getFieldDecorator(`classes[${id}][image]`, {
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: '宝贝规格不能为空!'
                    }],
                    initialValue: this.state.classes[id] ? this.state.classes[id].image : '',
                })(<Input  placeholder="请选择图片" suffix={<Icon title="选择图片" onClick={() => this.onImgClick(id)} type="picture" />}  style={{width: 300, marginRight: 10}} />)
            }
            {
            keys.length > 1 ? (
                <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    disabled={keys.length === 1}
                    onClick={() => this.remove(id)}
                />
                ) : null
            }
            </Item>
        </div>
        ));
        return (
            <div className={style}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Spin spinning={visible}>
                    <div className="plan base-info">
                        <h2 className="title">基本信息</h2>
                        <div className="content">
                            <Item
                                label="宝贝标题"
                            >
                            {
                                getFieldDecorator('title', {
                                    rules: [
                                        {
                                            required: true,whitespace: true, message: '请输入宝贝标题!',
                                        },
                                        {
                                            max: 60,message: '最多允许输入30个汉字（60个字符)!',
                                        }
                                    ],
                                })(<Input placeholder="最多允许输入30个汉字（60个字符）" style={{ width: 760 }} />)
                            }
                            </Item>
                            <div className="row">
                                <div className="col-l">宝贝属性：</div>
                                <div className="col-r">
                                    <Item
                                        label="品牌"
                                        >
                                        {
                                            getFieldDecorator('brand', {
                                                rules: [
                                                    {
                                                        required: true,whitespace: true, message: '请输入宝贝品牌!',
                                                    },
                                                ],
                                            })(<Input placeholder="请输入宝贝品牌"/>)
                                        }
                                    </Item>
                                    <Item
                                        label="主要成份"
                                        >
                                        {
                                            getFieldDecorator('material', {})(<Input placeholder="请输入宝贝主要成分"/>)
                                        }
                                    </Item>
                                    <Item
                                        label="适用对象"
                                        >
                                        {
                                            getFieldDecorator('ages', {
                                                rules: [
                                                    {
                                                        required: true,whitespace: true, message: '请选择适用对象!',
                                                    },
                                                ],
                                            })(
                                                <Select placeholder="请选择" style={{width: 300}}>
                                                    <Option value="all">通用</Option>
                                                    <Option value="child">儿童</Option>
                                                    <Option value="student">学生</Option>
                                                    <Option value="adult">成人</Option>
                                                </Select>
                                            )
                                        }
                                    </Item>
                                    <Item
                                        label="产地"
                                        >
                                        {
                                            getFieldDecorator('place', {})(<Input placeholder="请输入宝贝生产地"/>)
                                        }
                                    </Item>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="plan sale-info">
                        <h2 className="title">销售信息</h2>
                        <div className="content">
                            <div className="row">
                                <div className="col-l">宝贝规格：</div>
                                <div className="col-r">
                                    {formItems}
                                    <Button type="dashed" onClick={this.add} className="add-btn">
                                        <Icon type="plus" /> 添加规格
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="plan discribe-info">
                        <h2 className="title">图文描述</h2>
                        <div className="content">
                            <div className="row images">
                                <div className="col-l">宝贝图片：</div>
                                <div className="col-r">
                                    <ul>
                                        {
                                            images.map((v,key) => <li key={key+v} className="image">
                                                <img src={imageFix+v} />
                                                <div className="image-warp"><Icon onClick={() => this.deleteImage(key)} type="delete" /></div>
                                            </li>)
                                        }
                                        {
                                            (images.length < 5 ) && <li className="add-image-btn" onClick={this.addImage}>
                                                <Icon type="plus" style={{color: "#0085D7", fontSize: 20}} /> 添加图片
                                            </li>
                                        }
                                    </ul>
                                    <p className="tip">默认宝贝主图为第一张图片，最多可设置5张</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-l">宝贝详情：</div>
                                <div className="col-r discribe">
                                    <article ref="editorElem" style={{textAlign: 'left'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="plan buy-info">
                        <h2 className="title">售后服务</h2>
                        <div className="content">
                            <Item
                                label="购买链接地址"
                                >
                                {
                                    getFieldDecorator('buyUrl', {
                                        rules: [
                                            {
                                                required: true,whitespace: true, message: '请输入宝贝购买链接!',
                                            },
                                        ],
                                    })(<Input placeholder="请输入宝贝购买链接" style={{width: 300, margin: "0 30px"}}/>)
                                }
                            </Item>
                            <div >
                                <span >店铺中分类：</span>
                                    <TreeSelect 
                                        treeData={treeData}
                                        value= {this.state.typeClass}
                                        onChange= {this.onChange}
                                        treeCheckable= {true}
                                        showCheckedStrategy= {SHOW_PARENT}
                                        searchPlaceholder= '选择店铺宝贝分类'
                                        style={
                                            {
                                              width: 300,
                                              margin:30,
                                            }
                                        }
                                    />
                            </div>
                            <div>
                                <span>上架时间：</span>
                                <Radio.Group style={{margin: "0 30px"}} onChange={this.onRadioChange} value={status}>
                                    <Radio value={0}>放入仓库</Radio>
                                    <Radio value={1}>立即发布</Radio>
                                    <Radio value={2}>定时发布</Radio>
                                </Radio.Group>
                                {
                                    status === 2 && 
                                    <span>
                                        <DatePicker value={sellDate} disabledDate={(time => time < Date.now())} onChange={this.onSelectDate} />
                                        <TimePicker value={sellTime} onChange={this.onSelectTime} />
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    </Spin>
                    <Affix offsetBottom={0}>
                        <div className="footer">
                            <Button htmlType="submit">提交宝贝信息</Button>
                        </div>
                    </Affix>
                    
                </Form>
            </div>
        )
    }
}

export default Form.create()(withRouter(EditProduct))