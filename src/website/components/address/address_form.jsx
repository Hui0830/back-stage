import React from 'react';
import {
    Form,
    Input,
    Button,
    Icon
} from 'antd';

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
const AddressForm = ({form, defaultData,onSave,closeModal}) => {
    const  {getFieldDecorator} = form;
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
          if (!err) {
              onSave(values);
              closeModal();
              console.log('Received values of form: ', values);
          }
        });
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item
                label="联系方式一"
                {...formItemLayout}
            >
                {
                    getFieldDecorator(`phone[0].tel`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            rule: /^1[34578]\d{9}$/,
                            message: '请输入正确的手机号码!'
                        }],
                        initialValue: defaultData ? defaultData.phone[0].tel : '',
                    })(<Input placeholder="联系手机号码" suffix={<Icon type="phone" />}  style={{marginRight: 8,width: 250}} />)
                }
                {
                    getFieldDecorator(`phone[0].name`, {
                        initialValue: defaultData ? defaultData.phone[0].name : '',
                    })(<Input placeholder="联系人" suffix={<Icon type="user" />}  style={{ width: 150}} />)
                }
            </Form.Item>
            <Form.Item
                label="联系方式二"
                {...formItemLayout}
            >
                {
                    getFieldDecorator(`phone[1].tel`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            rule: /^1[34578]\d{9}$/,
                            message: '请输入正确的手机号码!'
                        }],
                        initialValue: defaultData ? defaultData.phone[1].tel : '',
                    })(<Input placeholder="联系手机号码" suffix={<Icon type="phone" />}  style={{marginRight: 8,width: 250}} />)
                }
                {
                    getFieldDecorator(`phone[1].name`, {
                        initialValue: defaultData ? defaultData.phone[1].name : '',
                    })(<Input placeholder="联系人" suffix={<Icon type="user" />}  style={{ width: 150}} />)
                }
            </Form.Item>
            <Form.Item
                label="邮箱地址"
                {...formItemLayout}
            >
                {
                    getFieldDecorator("email", {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            rule: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                            message: '请输入正确的邮箱地址!'
                        }],
                        initialValue: defaultData ? defaultData.email : '',
                    })(<Input placeholder="邮箱地址" suffix={<Icon type="mail" />}  style={{ width: 450}} />)
                }
            </Form.Item>
            <Form.Item
            label="联系地址"
            {...formItemLayout}
            >
            {
                getFieldDecorator(`address`, {
                    rules: [
                        { required: true, message: '选择输入联系地址!' },
                    ],
                    initialValue: defaultData ? defaultData.address : '广东深圳'
                })(<Input.TextArea  placeholder="联系地址" style={{marginRight: 8,width: 450,minHeight:150}} />)
            }
            </Form.Item>
            <div style={{textAlign: 'center',margin: '50px 0px 20px'}}>
                <Button icon="check-circle" type="primary" style={{width: 150}} htmlType="submit">保 存</Button>
            </div>
        </Form>
    )
}

export default Form.create()(AddressForm);