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
  class NavFrom extends React.Component {
    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }
  
    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if(keys.length > 7) {
            message.error('最多添加8个导航栏项哦！');
            return;
        }
        const nextKeys = keys.concat(this.props.navData.length++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
            this.props.onSave(values.nav);
            this.props.closeModal();
            console.log('Received values of form: ', values);
        }
      });
    }
  
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { navData } = this.props;
        const defaultKeys = navData.map((item, index) => index);
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
                    initialValue: navData[id] ? navData[id].name : '',
                })(<Input placeholder="导航名称"  style={{marginRight: 8,width: 250 }} />)
            }
            {
                getFieldDecorator(`nav[${id}][url]`, {
                    rules: [
                        { required: true, message: '选择链接地址!' },
                    ],
                    initialValue: navData[id] ? navData[id].url : '#'
                })(
                    <Select placeholder="链接" style={{width: 150,marginRight: 10}}>
                        <Select.Option value='#'>导航链接</Select.Option>
                        {
                            navData.map(item => <Select.Option key={item.name} value={item.url}>{item.name}</Select.Option>)
                        }
                    </Select>)
            }
            {
                keys.length > 1 ? (
                <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    disabled={keys.length === 1}
                    onClick={() => this.remove(id)}
                />
                ) : null
            }
            </Form.Item>
        ));
      return (
        <Form onSubmit={this.handleSubmit}>
            {formItems}
            <div style={{textAlign: 'center',margin: '40px 0 20px'}}>
                <Button type="dashed" onClick={this.add}>
                    <Icon type="plus" /> 添加导航
                </Button>
                <Button icon="check-circle" type="primary" style={{marginLeft: 80, width: 100}} htmlType="submit">保 存</Button>
            </div>
        </Form>
      );
    }
  }
  
export default Form.create()(NavFrom);