import React from 'react';
import {
    Form,
    Input,
    Button,
} from 'antd';

import { createNews } from 'Api/news';

const ContactUsForm = ({form}) => {
    const  {getFieldDecorator} = form;
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
          if (!err) {
              createNews({...values,type: '1'})
              console.log('Received values of form: ', values);
          }
        });
    }
    return (
        <Form onSubmit={handleSubmit} className="contact-form">
            <div className="name">
                <Form.Item
                    label="First Name"
                >
                    {
                        getFieldDecorator("firstName", {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: '用户名不能为空!'
                            }],
                        })(<Input placeholder="Your First Name"  style={{width: 250 }} />)
                    }
                </Form.Item>
                <Form.Item
                    label="Last Name"
                >
                    {
                        getFieldDecorator("lastName", {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: '用户名不能为空!'
                            }],
                        })(<Input placeholder="Your Last Name"  style={{width: 250 }} />)
                    }
                </Form.Item>
            </div>
            <Form.Item
                label="mail"
            >
                {
                    getFieldDecorator('mail', {
                        rules: [
                            {
                            type: 'email', message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true, message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input placeholder="Your mail" style={{width: 520, }} />)
                }
            </Form.Item>
            <Form.Item
                label="tel"
            >
                {
                    getFieldDecorator('tel', {
                        rules: [
                            {
                                pattern: /^1[34578]\d{9}$/gi, message: 'The input is not valid tel!',
                            },
                            {
                                required: true, message: 'Please input your tel!',
                            },
                        ],
                    })(<Input placeholder="Your tel" style={{width: 520, }} />)
                }
            </Form.Item>
            <Form.Item
                label="Reason"
            >
                {
                    getFieldDecorator("content", {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: '问题不能为空!'
                        }],
                    })(<Input.TextArea placeholder="问题/留言描述"  style={{ width: 520, minHeight: 100,}} />)
                }
            </Form.Item>
            <div style={{textAlign: 'center',margin: '50px 0px 20px'}}>
                <Button icon="check-circle" type="primary" htmlType="submit">Submit</Button>
            </div>
        </Form>
    )
}

export default Form.create()(ContactUsForm);

