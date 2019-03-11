import React, { PureComponent } from 'react';
import {
    Form, Icon, Input, Button, Checkbox,message
} from 'antd';
import { withRouter } from 'react-router-dom';

import { style } from './index.scss';
import logo from '../../images/favicon.png';

import {signIn } from 'Api/user';
  
const FormItem = Form.Item;

class LoginForm extends PureComponent {
    state = {
        loading: false
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            this.setState({
                loading: true
            })
            signIn(values).then((res) => {
                if(res.code === '100000'){
                    localStorage.setItem('token', res.data);
                    localStorage.setItem('token_exp', new Date().getTime());
                    this.props.loginIn();
                    this.props.history.replace('/dashboard');
                }else{
                    message.error(res.msg);
                }
                this.setState({
                    loading: false
                })
            }).catch(err => {
                this.setState({
                    loading: false
                })
            })
            
        }
        });
    }

render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div className={style}>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div className="header">
                    <img src={logo}></img>
                </div>
                <FormItem
                    label="账号"
                >
                {
                    getFieldDecorator('account', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="account" />)
                }
                </FormItem>
                <FormItem
                    label="密码"
                >
                {
                    getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)
                }
                </FormItem>
                <FormItem>
                {
                    getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>记住账号密码</Checkbox>)
                }
                <Button icon="poweroff" type="primary" htmlType="submit" loading={this.state.loading} className="login-form-button">
                    登 入
                </Button>
                </FormItem>
                <a className="login-form-forgot" href="">忘记密码啦？戳这里-></a>
            </Form>
            {
                -1 && 'fffffff'
            }
        </div>);
    }
}

const Login = Form.create()(withRouter(LoginForm));
export default Login;
