import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox,message
} from 'antd';
import { withRouter } from 'react-router-dom';
import {signIn } from 'Api/store';
  
const FormItem = Form.Item;

class LoginForm extends React.Component {
    handleSubmit = (e) => {
        console.log('fff');
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            signIn(values).then((res) => {
                console.log(res);
                if(res.code === '100000'){
                    localStorage.setItem('token', res.data);
                    localStorage.setItem('token_exp', new Date().getTime());
                    this.props.loginIn();
                    this.props.history.replace('/dashboard');
                }else{
                    message.error(res.msg);
                }
            })
            
        }
        });
    }

render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
            {
                getFieldDecorator('account', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="account" />)
            }
            </FormItem>
            <FormItem>
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
                })(<Checkbox>Remember me</Checkbox>)
            }
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
            </Button>
            </FormItem>
        </Form>);
    }
}

const Login = Form.create()(withRouter(LoginForm));
export default Login;
