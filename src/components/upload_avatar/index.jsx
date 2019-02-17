import React, { Component } from 'react';
import { Upload, Icon, message,Modal } from 'antd';

const token = localStorage.getItem('token');

require('./index.scss');

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('你只能上传jpgf格式图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小必须小于2M!');
  }
  return false;
}

class UploadAvatar extends Component {
    state = {
        imageUrl: this.props.imageUrl || '',
        previewVisible: false,
        previewImage: this.props.imageUrl,
        fileList: [{
            uid: '-1',
            name: this.props.name || 'logo',
            status: 'done',
            url: this.props.imageUrl,
        }],
    };

    handleChange = (info) => {
        if (info.file.status === 'removed') {
            this.setState({ 
                imageUrl: '',
            });
        } else {
            getBase64(info.file, imageUrl => {
                this.props.onChange(imageUrl);
                this.setState({
                    imageUrl,
                    loading: false,
                });
            });
        }
        this.setState({
            fileList: info.fileList
        })
    }
    handlePreview = (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
    }
    handleCancel = () => this.setState({ previewVisible: false })
    render() {
        const uploadButton = (
            <div>
                <Icon type='plus' />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const {previewVisible,previewImage,fileList} = this.state;
        return (
            <div>
                <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                beforeUpload={beforeUpload}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                fileList={fileList}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>,
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}
export default UploadAvatar