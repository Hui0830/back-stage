import React, { Component } from 'react';
import {
    Form, Input, Tooltip, Icon, Button,message
  } from 'antd';
import TipTitle from 'components/tip_title';
import { style } from './edit_info.scss'
  
const FormItem = Form.Item;

class infoEdit extends Component {
    state = {
        isEditPwd: false,
    }
    componentDidMount() {
        this.getEditInfo()
    }

    // 编辑模式获取角色编辑信息
    getEditInfo = () => {
        const { roles, email, name, account, describe } = this.props.userInfo
        this.props.form.setFieldsValue({
            role: roles.roleName,
            email: email,
            name: name,
            account: account,
            describe: describe,
        })
    }
    // 提交修改、添加
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (err) {
            message.error(err);
        } else {
            console.log(values);
            this.props.onCloseEditModel(values.name)
        }
      });
    }
    // 编辑模式修改密码
    editPwd = () => {
        this.setState({
            isEditPwd: !this.state.isEditPwd,
        })
    }
    // 密码验证
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
    // 密码确认验证
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
  
    render() {
        const { getFieldDecorator } = this.props.form;
        const { isEditPwd } = this.state;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
      return (
        <Form onSubmit={this.handleSubmit} className={style}>
            <div className='role-content'>
                <FormItem
                {...formItemLayout}
                label="职位"
                >
                    {getFieldDecorator('role', {
                        rules: [{required: true}],
                    })(
                        <Input disabled/>
                    )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="登入账号"
                >
                    {getFieldDecorator('account', {
                        rules: [{required: true}],
                    })(
                        <Input disabled/>
                    )}
                </FormItem>
            </div>
            <TipTitle title='基本信息' />
            <FormItem
                {...formItemLayout}
                label={(
                <span>
                    用户名&nbsp;
                    <Tooltip title="你的昵称，或者姓名。">
                    <Icon type="question-circle-o" />
                    </Tooltip>
                </span>
                )}
            >
                {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入你的昵称!', whitespace: true }],
                })(
                <Input  placeholder='用户名' />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="密码"
            >
                {
                    isEditPwd ? getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                        })(
                            <Input  placeholder='*******' type="password"  />
                        ) :
                    <span className="edit-pwd-btn" onClick={() => this.editPwd()}>修改密码</span>
                }
                { isEditPwd && <span className="edit-pwd-btn" onClick={() => this.editPwd()}>取消修改</span>}
            </FormItem>
            {
                isEditPwd &&
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                    rules: [{
                        required: true, message: 'Please confirm your password!',
                    }, {
                        validator: this.compareToFirstPassword,
                    }],
                    })(
                    <Input placeholder='确认密码' type="password"  onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
            }
            <FormItem
                {...formItemLayout}
                label="邮箱"
            >
                {getFieldDecorator('email', {
                rules: [{
                    type: 'email', message: '输入你的 E-mail!',
                }, {
                    required: true, message: '请输入合法的邮箱!',
                }],
                })(
                    <Input placeholder='邮箱'  />
                )}
            </FormItem>
            
            <FormItem
                {...formItemLayout}
                label="描述"
            >
                {getFieldDecorator('describe', {
                rules: [{ required: true, message: '请输入你的个人简介！' }],
                })(
                <Input.TextArea rows={6}  placeholder="你的个人简介！" />
                )}
            </FormItem>
            <FormItem className="submit-btn">
                <Button type="primary" htmlType="submit">确认修改</Button>
            </FormItem>
        </Form>
      );
    }
  }
export default Form.create()(infoEdit);