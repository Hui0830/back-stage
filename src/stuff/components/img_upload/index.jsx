import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Modal,Upload, Icon, message,Button,Cascader } from 'antd';
import PropTypes from 'prop-types';


const Dragger = Upload.Dragger;

const uploadConfig = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default class ImgUpload extends Component {
    // static propTypes = {
    //     visible: PropTypes.bool.isRequired,
    // }

    state = {
        tree: {
            decorate: {
                title: '装修',
                key: 'decorate',
                leaf: [
                    {
                        title: '首页',
                        key: 'decorate_home'
                    },
                    {
                        title: '产品页',
                        key: 'decorate_product'
                    }
                ]
            },
            article: {
                title: '文章',
                key: 'article',
                leaf: [
                    {
                        title: '活动',
                        key: 'article_activity'
                    },
                    {
                        title: '事记',
                        key: 'article_info'
                    }
                ]
            }
        },
        expandParent: 'all',
        selectedKey: 'all',
        selectKey: '',
        imgList: [],
        visible: false,
    }

    componentDidMount() {
        this.getClassify();
    }

    getClassify = () => {
        console.log('huo qu tu pian fen lei')
    }

    onSave = () => {
        console.log(this.state)
        this.setState({
            visible: false,
        })
    }
    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
      }
      
    filter = (inputValue, path) => {
        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    }

    warpChild = () => {
        return React.Children.map(this.props.children, (child, i) => {
            if(i < 1) return React.cloneElement(child, {
                onClick: () => this.setState({visible: true})
            });
            return child
        })
    }

    render() {
        const { visible,tree } = this.state;
        const optionDate = Object.keys(tree).map(key => tree[key]);
        optionDate.unshift({title: '所有图片',key:'all'});
        return (
            <div>
                {
                    this.warpChild()
                }
                <Modal
                    title="图片上传"
                    visible={visible}
                    onCancel={() => this.setState({visible: false})}
                    onOk={this.onSave}
                >   
                    <span>请选择分类：</span>
                    <Cascader
                        fieldNames={{ label: 'title', value: 'key', children: 'leaf' }}
                        style={{ width: 300, marginBottom: 30 }}
                        options={optionDate}
                        onChange={this.onChange}
                        showSearch={this.filter}
                        placeholder="请选择分类"
                        defaultValue={['all']}
                        expandTrigger='hover'
                        allowClear={false}
                        suffixIcon={<Icon type="folder-open" style={{fontSize:20}} />}
                    />
                    <Dragger {...uploadConfig}>
                        <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                    </Dragger>
                </Modal>
            </div>
        )
    }
}