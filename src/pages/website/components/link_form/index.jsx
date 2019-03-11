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
  const LinkFrom = ({ form, min = 1, max = 7,data=[],onSave,closeModal,hasImage= false,navLinks }) => {
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

    const onSelectImg = (id, url) => {
        form.setFieldsValue({
            [`nav[${id}][image]`]: url
        })
    }

    const onImgClick = (id) => {
        selectStaff((url) => onSelectImg(id, url))
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
            onSave(values.nav);
            console.log(values)
            closeModal();
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
                        navLinks.map(item => <Select.Option key={item.name} value={item.url}>{item.name}</Select.Option>)
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
        {
            hasImage && getFieldDecorator(`nav[${id}][image]`, {
                    rules: [{
                        whitespace: true,
                        message: '请选择图片'
                    }],
                    initialValue: data[id] ? data[id].image : '',
                })(<Input  placeholder="请选择图片" suffix={<Icon title="选择图片" onClick={() => onImgClick(id)} type="picture" />}  style={{width: 408}} />)
        }
        {
            hasImage && getFieldDecorator(`nav[${id}][bgColor]`, {
                    initialValue: data[id] ? data[id].bgColor : '#fff',
                })(<Input title="请输入背景色"  placeholder="请输入背景色" suffix={<Icon type="star" theme='filled' style={{color: `${data[id] ? data[id].bgColor : '#fff'}`}} />}   style={{marginRight: 8,width: 200}} />)
        }
        {
            hasImage && getFieldDecorator(`nav[${id}][color]`, {
                    initialValue: data[id] ? data[id].color : '#555',
                })(<Input title='请输入字体颜色色'  placeholder="请输入字体颜色色" suffix={<Icon type="star" theme='filled' style={{color: `${data[id] ? data[id].color : '#555'}`}} />}  style={{width: 200}} />)
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