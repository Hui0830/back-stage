import React from 'react';
import {
    Form,
    Input,
    Button,
    Icon,
    Select
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
const ProductForm = ({form, defaultData,onSave,closeModal,navLinks}) => {
    const  {getFieldDecorator} = form;
    const onImgClick = (index) => {
        selectStaff((url) => form.setFieldsValue({
            [`images[${index}][image]`]: url
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
          if (!err) {
              onSave(values);
              closeModal();
          }
        });
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item
                label="主标题"
                {...formItemLayout}
            >
                {
                    getFieldDecorator("title", {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: '主标题不能为空!'
                        }],
                        initialValue: defaultData ? defaultData.title : '',
                    })(<Input placeholder="主标题"  style={{marginRight: 8,width: 250 }} />)
                }
            </Form.Item>
            <Form.Item
                label="副标题"
                {...formItemLayout}
            >
                {
                    getFieldDecorator("smallTitle", {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: '副标题不能为空!'
                        }],
                        initialValue: defaultData.smallTitle,
                    })(<Input placeholder="副标题"  style={{marginRight: 8,width: 250 }} />)
                }
            </Form.Item>
            {
                ['top','right','bottom','left'].map((key,index) =>
                <Form.Item
                    label={`product_${index}`}
                    {...formItemLayout}
                    key={key}
                >
                    {
                        getFieldDecorator(`images[${index}][image]`, {
                            rules: [
                                { required: true, message: '选择输入或选择图片地址!' },
                            ],
                            initialValue: defaultData ? defaultData.images[index].image : ''
                        })(<Input  placeholder="导航名称" suffix={<Icon title="选择图片" onClick={() =>onImgClick(index)} type="picture" />}  style={{marginRight: 8,width: 250}} />)
                    }
                    {
                        getFieldDecorator(`images[${index}][url]`, {
                            rules: [
                                { required: true, message: '选择链接地址!' },
                            ],
                            initialValue: defaultData ? defaultData.images[index].url : '#'
                        })(
                            <Select placeholder="链接" style={{width: 150,marginRight: 10}}>
                                <Select.Option value='#'>导航地址</Select.Option>
                                {
                                    navLinks.map(item => <Select.Option key={item.url} value={item.url}>{item.name}</Select.Option>)
                                }
                            </Select>)
                    }
                </Form.Item>)
            }
            <Form.Item
                label="模块颜色"
                {...formItemLayout}
            >
                {
                    getFieldDecorator('bgColor', {
                        initialValue: defaultData ? defaultData.bgColor : '#'
                    })(<Input  placeholder="背景色" suffix={<Icon type="star" theme='filled' style={{color: `${defaultData.bgColor}`}} />} style={{width: 100}} />)
                }
                <span style={{margin: '0 25px'}}>字体颜色：</span>
                {
                    getFieldDecorator('color', {
                        initialValue: defaultData ? defaultData.color : '#'
                    })(<Input  placeholder="字体颜色" suffix={<Icon type="star" theme='filled' style={{color: `${defaultData.color}`}} />} style={{marginRight: 8,width: 100}} />)
                }
            </Form.Item>
            <div style={{textAlign: 'center',margin: '50px 0px 20px'}}>
                <Button icon="check-circle" type="primary" style={{width: 150}} htmlType="submit">保 存</Button>
            </div>
        </Form>
    )
}

export default Form.create()(ProductForm);