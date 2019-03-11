import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Form, Input, Tooltip, Icon, Select, Button,Table
  } from 'antd';
import jsCookie from 'js-cookie';

import { ROLE_NAME,ROLE_NAME_INFO_MAP } from 'common/conf/constant';
import TipTitle from 'components/tip_title';
import { getStaffInfo, putStaff, addStaff } from 'Api/staff'

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
const userRoleId = jsCookie.get('roleId'); // 用户角色级别
const getRolesList = (type) => {
    return ROLE_NAME.slice(1).reduce((Arr, item) => {
        if(item.roleId > userRoleId) {
            switch (type) {
                case 'describe':
                    Arr.push({
                        role: item.roleName,
                        roleDescribe: ROLE_NAME_INFO_MAP[item.roleId]
                    });
                    break;
                default:
                    Arr.push(item);
            }
        }
        return Arr
    },[])
}
console.log(getRolesList());


class StaffEdit extends Component {
    state = {
      confirmDirty: false,
      role: {},
      email: '',
      name: '',
      account: '',
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
    getEditInfo = (userId) => {
        getStaffInfo(userId).then(info => {
            console.log(info);
            this.props.form.setFieldsValue({
                roleId: info.roles.roleId,
                email: info.email,
                name: info.name,
                account: info.account,
                describe: info.describe,
            })
        })
    }
    // 提交修改、添加
    handleSubmit = (e) => {
        const userId = this.props.match.params.id;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if(this.props.isEdit) {
                    putStaff({userId, ...values}).then(res => {
                        this.props.history.replace('/staff/list');
                    })
                } else {
                    addStaff(values).then(v => {
                        this.props.history.replace('/staff/list');
                    })
                }
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
        const { roleId, name, account, describe, email,isEditPwd } = this.state;
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
                    {getFieldDecorator('roleId', {
                    rules: [{required: true, message: 'Please select your habitual residence!' }],
                    })(
                        <Select
                            className="select-container"
                            placeholder="选择职位"
                            style={{ width: 250, marginLeft:10 }}
                        >
                            {
                                getRolesList().map(v => <Option key={v.roleId} value={v.roleId}>{v.roleName}</Option>)
                            }

                        </Select>
                    )}
                </FormItem>
                <Table rowKey="role" dataSource={getRolesList('describe')} columns={columns} bordered pagination={false} className="role-table" />
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
                {getFieldDecorator('account', {
                rules: [{ required: true, message: 'Please input your account number!' }],
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
                rules: [{ required: true, message: 'Please input your account number!' }],
                })(
                <Input.TextArea rows={6}  placeholder="Autosize height based on content lines" />
                )}
            </FormItem>
            <FormItem className="submit-btn">
                <Button type="primary" htmlType="submit">{`确认${isEdit ? '修改' : '添加'}`}</Button>
                <Button type="primary" ghost onClick={this.onCancel}>取消</Button>
            </FormItem>
        </Form>
      );
    }
  }
  
// const WrappedStaffEdit = Form.create()(StaffEdit);
export default Form.create()(withRouter(StaffEdit));