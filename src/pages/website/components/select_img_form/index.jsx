import React from 'react';
import {
    Form, Input, Icon, Button,Select,message
  } from 'antd';

import { selectStaff } from 'components/select_staff';

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
const SelectImgFrom = ({multiple = true, min = 1, max=7, data=[],form, onSave,closeModal,navLinks}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
          if (!err) {
            onSave(values.images.filter(v => v));
            closeModal();
              console.log('Received values of form: ', values);
          }
        });
      }

    const remove = (id) => {
        const keys = form.getFieldValue('keys');
        if (keys.length === min) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== id),
        });
    }
  
    const add = () => {
        const keys = form.getFieldValue('keys');
        if(keys.length >= max) {
            message.error(`最多添加${max}个项哦！`);
            return;
        }
        const nextKeys = keys.concat(keys[keys.length-1]+ 1);
        console.log('add',keys)
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
    const onSelectImg = (id, url) => {
        form.setFieldsValue({
            [`images[${id}][image]`]: url
        })
        console.log(id, url);
    }

    const onImgClick = (id) => {
        selectStaff((url) => onSelectImg(id, url))
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
            getFieldDecorator(`images[${id}][image]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                    required: true,
                    whitespace: true,
                    message: '请选择图片'
                }],
                initialValue: data[id] ? data[id].image : '',
            })(<Input  placeholder="导航名称" suffix={<Icon title="选择图片" onClick={() => onImgClick(id)} type="picture" />}  style={{marginRight: 8,width: 250}} />)
        }
        {
            getFieldDecorator(`images[${id}][url]`, {
                rules: [
                    { required: true, message: '选择链接地址!' },
                ],
                initialValue: data[id] ? data[id].url : '#'
            })(
                <Select placeholder="链接" style={{width: 150,marginRight: 10}}>
                    <Select.Option value='#'>导航链接</Select.Option>
                    {
                        navLinks.map(item => <Select.Option key={item._id} value={item.url}>{item.name}</Select.Option>)
                    }
                </Select>)
        }
        {
            (keys.length > min && multiple) ? (
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
            {multiple && <div style={{textAlign: 'center',margin: '40px 0 20px'}}>
                <Button type="dashed" onClick={add}>
                    <Icon type="plus" /> 添加导航
                </Button>
            </div>}
            <div style={{textAlign: 'center',margin: '50px 0px 20px'}}>
                <Button icon="check-circle" type="primary" style={{width: 150}} htmlType="submit">保 存</Button>
            </div>
        </Form>
    );
}
  
export default Form.create()(SelectImgFrom);