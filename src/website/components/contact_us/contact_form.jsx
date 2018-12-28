import React from 'react';
import {
    Form,
    Input,
    Button,
} from 'antd';

const ContactUsForm = ({form,onSave}) => {
    const  {getFieldDecorator} = form;
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
          if (!err) {
              onSave(values);
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
                    getFieldDecorator('email', {
                        rules: [
                            {
                            type: 'email', message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true, message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input placeholder="Your email" style={{width: 520, }} />)
                }
            </Form.Item>
            <Form.Item
                label="phone"
            >
                {
                    getFieldDecorator('phone', {
                        rules: [
                            {
                                pattern: /^1[34578]\d{9}$/gi, message: 'The input is not valid phone!',
                            },
                            {
                                required: true, message: 'Please input your phone!',
                            },
                        ],
                    })(<Input placeholder="Your phone" style={{width: 520, }} />)
                }
            </Form.Item>
            <Form.Item
                label="Reason"
            >
                {
                    getFieldDecorator("descript", {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: '描述不能为空!'
                        }],
                    })(<Input.TextArea placeholder="描述"  style={{ width: 520, minHeight: 100,}} />)
                }
            </Form.Item>
            <div style={{textAlign: 'center',margin: '50px 0px 20px'}}>
                <Button icon="check-circle" type="primary" htmlType="submit">Submit</Button>
            </div>
        </Form>
    )
}

export default Form.create()(ContactUsForm);

