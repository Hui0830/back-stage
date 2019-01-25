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
const EditBaseForm = ({form, defaultData,onSave,closeModal,navLinks}) => {
    const  {getFieldDecorator} = form;
    const onImgClick = () => {
        selectStaff((url) => form.setFieldsValue({
            image: url
        }))
    }
    const onVideoClick = () => {
        selectStaff((url) => form.setFieldsValue({
            video: url
        }), false)
    }
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
            {
                defaultData && defaultData.smallTitle &&
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
            }
            {
                defaultData && defaultData.descript &&
                <Form.Item
                    label="描述"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator("descript", {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: '描述不能为空!'
                            }],
                            initialValue: defaultData ? defaultData.descript : '',
                        })(<Input.TextArea placeholder="描述"  style={{ width: 450, minHeight: 200}} />)
                    }
                </Form.Item>
            }
            {
                defaultData && defaultData.image &&
                <Form.Item
                label="图片选择"
                {...formItemLayout}
                >
                {
                    getFieldDecorator(`image`, {
                        rules: [
                            { required: true, message: '选择输入或选择图片地址!' },
                        ],
                        initialValue: defaultData ? defaultData.image : '#'
                    })(<Input  placeholder="图片地址" suffix={<Icon title="选择图片" onClick={onImgClick} type="picture" />}  style={{width: 300}} />)
                }
                </Form.Item>
            }
            {
                defaultData && defaultData.video &&
                <Form.Item
                label="视频选择"
                {...formItemLayout}
                >
                {
                    getFieldDecorator('video', {
                        rules: [
                            { required: true, message: '选择输入或选择视频地址!' },
                        ],
                        initialValue: defaultData ? defaultData.video : '#'
                    })(<Input  placeholder="视频地址" suffix={<Icon title="选择视频" onClick={onVideoClick} type="video-camera" />}  style={{width: 300}} />)
                }
                </Form.Item>
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

export default Form.create()(EditBaseForm);