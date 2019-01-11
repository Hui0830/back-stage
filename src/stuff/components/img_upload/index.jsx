import React, {Component} from 'react';
import { Modal,Upload, Icon, message,Button } from 'antd';
import PropTypes from 'prop-types';


const Dragger = Upload.Dragger;
const token = localStorage.getItem('token');


export default class ImgUpload extends Component {
    static propTypes = {
        tag: PropTypes.string,
    }
    static defaultProps = {
        tag: 'all',
        onSave: () => {}
    }
    state = {
        visible: false,
    }
    onSave = () => {
        this.props.onSave();
        this.setState({
            visible: false,
        })
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
        const { visible } = this.state;
        const uploadConfig = {
            name: 'file',
            multiple: true,
            data:{tag: this.props.tag},
            action: '/api/uploadeImg',
            accept: 'image/*',
            headers: {
                  Authorization: `Bearer ${token}`
              },
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name}图片上传成功`);
                } else if (status === 'error') {
                    message.error(`${info.file.name}图片上传失败.`);
                }
            },
          };
        return (
            <div>
                {
                    this.warpChild()
                }
                <Modal
                    title="图片上传"
                    visible={visible}
                    closable={false}
                    footer={<Button onClick={this.onSave} type='primary'>确认</Button>}
                    destroyOnClose
                > 
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