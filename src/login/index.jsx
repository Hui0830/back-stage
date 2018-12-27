import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import { withRouter } from 'react-router-dom';
import jsCookie from 'js-cookie'
import {signIn } from 'Api/store';
  
const FormItem = Form.Item;

class LoginForm extends React.Component {
    handleSubmit = (e) => {
        console.log('fff');
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            signIn(values).then((val) => {
                console.log(val);
                if(val.code == '10000') {
                    console.log(window.location.href);
                    this.props.loginIn(val.userName);
                    this.props.history.push('/');
                    
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
                getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)
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
