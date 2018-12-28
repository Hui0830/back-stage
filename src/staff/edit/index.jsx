import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Form, Input, Tooltip, Icon, Select, Button,Table
  } from 'antd';
import { ROLE_NAME,ROLE_NAME_INFO_MAP } from 'common/conf/constant';
import TipTitle from 'components/tip_title';
// import { getUserInfo } from 'Api/staff'

import  { style } from './index.scss';
  
const FormItem = Form.Item;
const Option = Select.Option;
const columns = [{
    title: '职位',
    dataIndex: 'role',
    key: 'role',
  }, {
    title: '职位描述',
    dataIndex: 'roleDescribe',
    key: 'roleDescribe',
}];
const dataSource = ROLE_NAME.slice(1).map(item => {
    return {
        role: item.roleName,
        roleDescribe: ROLE_NAME_INFO_MAP[item.roleId]
    }
});


class StaffEdit extends Component {
    state = {
      confirmDirty: false,
      role: {},
      email: '',
      name: '',
      phone: '',
      describe: '',
      isEditPwd: !this.props.isEdit,
    };
    static defaultProps = {
        isEdit: true
    }
    
    componentDidMount() {
        const { isEdit, match } = this.props;
        isEdit && this.getEditInfo(match.params.id);
    }
    // 编辑模式获取角色编辑信息
    getEditInfo = (roleId) => {
        // getUserInfo(roleId).then(info => {
        //     this.setState({
        //         userInfo: info,
        //     })
        // })
        // test
        this.props.form.setFieldsValue({
            role: 1,
            email: '1285227393@qq.com',
            name: '幻念不能',
            phone: roleId,
            describe: 'ffafdafdf',
        })
    }
    // 提交修改、添加
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
            this.props.history.replace('/staff/list');
        }
      });
    }
    // 取消
    onCancel = () => {
        this.props.history.replace('/staff/list');
    }
    // 编辑模式修改密码
    editPwd = (bool) => {
        this.setState({
            isEditPwd: bool,
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
        const { isEdit } = this.props;
        const { role, name, phone, describe, email,isEditPwd } = this.state;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 20 },
        };

      return (
        <Form onSubmit={this.handleSubmit} className={style}>
            <div className='role-content'>
                <FormItem
                {...formItemLayout}
                label="选择职位"
                >
                    {getFieldDecorator('role', {
                    rules: [{required: true, message: 'Please select your habitual residence!' }],
                    })(
                        <Select
                            className="select-container"
                            placeholder="选择职位"
                            style={{ width: 250, marginLeft:10 }}
                        >
                            {
                                ROLE_NAME.slice(1).map(v => <Option key={v.roleId} value={v.roleId}>{v.roleName}</Option>)
                            }

                        </Select>
                    )}
                </FormItem>
                <Table rowKey="role" dataSource={dataSource} columns={columns} bordered pagination={false} className="role-table" />
            </div>
            <TipTitle title='基本信息' />
            <FormItem
                {...formItemLayout}
                label={(
                <span>
                    用户名&nbsp;
                    <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                    </Tooltip>
                </span>
                )}
            >
                {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(
                <Input  placeholder='用户名' />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={(
                    <span>
                    手机号&nbsp;
                    <Tooltip title="用做登录账号">
                        <Icon type="question-circle-o" />
                    </Tooltip>
                    </span>
                )}
            >
                {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
                })(
                <Input  />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="密码"
            >
                {
                    isEditPwd ? getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                        })(
                            <Input disabled={!isEditPwd} placeholder='*******' type="password"  />
                        ) :
                    <span className="edit-pwd-btn" onClick={() => this.editPwd(!isEditPwd)}>修改密码</span>
                }
                { isEditPwd && isEdit && <span className="edit-pwd-btn" onClick={() => this.editPwd(!isEditPwd)}>取消修改</span>}
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
                    <Input disabled={!isEditPwd} placeholder='确认密码' type="password"  onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
            }
            <FormItem
                {...formItemLayout}
                label="邮箱"
            >
                {getFieldDecorator('email', {
                rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                }, {
                    required: true, message: 'Please input your E-mail!',
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
                rules: [{ required: true, message: 'Please input your phone number!' }],
                })(
                <Input.TextArea rows={6}  placeholder="Autosize height based on content lines" />
                )}
            </FormItem>
            <FormItem className="submit-btn">
                <Button type="primary" htmlType="submit">{`确认${isEdit ? '添加' : '修改'}`}</Button>
                <Button type="primary" ghost onClick={this.onCancel}>取消</Button>
            </FormItem>
        </Form>
      );
    }
  }
  
// const WrappedStaffEdit = Form.create()(StaffEdit);
export default Form.create()(withRouter(StaffEdit));