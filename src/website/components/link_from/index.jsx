import React from 'react';
import {
    Form, Input, Icon, Button,Select,message
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
  const LinkFrom = ({ form, min = 1, max = 7,data=[],onSave,closeModal }) => {
    const remove = (k) => {
        const keys = form.getFieldValue('keys');
        if (keys.length === min) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }
  
    const add = () => {
        const keys = form.getFieldValue('keys');
        if(keys.length >= max) {
            message.error(`最多添加${max}个项哦！`);
            return;
        }
        const nextKeys = keys.concat(data.length++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
            onSave(values.nav);
            closeModal();
            console.log('Received values of form: ', values);
        }
      });
    }
  
    const { getFieldDecorator, getFieldValue } = form;
    const defaultKeys = data.map((item, index) => index);
    getFieldDecorator('keys', { initialValue: defaultKeys });
    const keys = getFieldValue('keys');
    const formItems = keys.map((id) => (
        <Form.Item
            label={`tab_${id}`}
            required={false}
            key={id}
            {...formItemLayout}
        >
        {
            getFieldDecorator(`nav[${id}][name]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                    required: true,
                    whitespace: true,
                    message: '导航名不能为空!'
                }],
                initialValue: data[id] ? data[id].name : '',
            })(<Input placeholder="导航名称"  style={{marginRight: 8,width: 250 }} />)
        }
        {
            getFieldDecorator(`nav[${id}][url]`, {
                rules: [
                    { required: true, message: '选择链接地址!' },
                ],
                initialValue: data[id] ? data[id].url : '#'
            })(
                <Select placeholder="链接" style={{width: 150,marginRight: 10}}>
                    <Select.Option value='#'>导航链接</Select.Option>
                    {
                        data.map(item => <Select.Option key={item.name} value={item.url}>{item.name}</Select.Option>)
                    }
                </Select>)
        }
        {
            keys.length > min ? (
            <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === min}
                onClick={() => remove(id)}
            />
            ) : null
        }
        </Form.Item>
    ));
      return (
        <Form onSubmit={handleSubmit}>
            {formItems}
            <div style={{textAlign: 'center',margin: '40px 0 20px'}}>
                <Button type="dashed" onClick={add}>
                    <Icon type="plus" /> 添加导航
                </Button>
                <Button icon="check-circle" type="primary" style={{marginLeft: 80, width: 100}} htmlType="submit">保 存</Button>
            </div>
        </Form>
      );
    }
  
export default Form.create()(LinkFrom);