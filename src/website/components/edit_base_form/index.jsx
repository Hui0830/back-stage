import React from 'react';
import {
    Form,
    Input,
    Button,
    Select
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
const EditBaseForm = ({form, defaultData,onSave,closeModal,selectData}) => {
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
            {
                selectData &&
                <Form.Item
                label="选择链接"
                {...formItemLayout}
                >
                {
                    getFieldDecorator(`url`, {
                        rules: [
                            { required: true, message: '选择链接地址!' },
                        ],
                        initialValue: defaultData ? defaultData.url : '#'
                    })(
                        <Select placeholder="链接" style={{width: 150,marginRight: 10}}>
                            <Select.Option value='#'>资源链接地址</Select.Option>
                            {
                                selectData.map(item => <Select.Option key={item.url} value={item.url}>{item.name}</Select.Option>)
                            }
                        </Select>)
                }
                </Form.Item>
            }
            <div style={{textAlign: 'center',margin: '50px 0px 20px'}}>
                <Button icon="check-circle" type="primary" style={{width: 150}} htmlType="submit">保 存</Button>
            </div>
        </Form>
    )
}

export default Form.create()(EditBaseForm);