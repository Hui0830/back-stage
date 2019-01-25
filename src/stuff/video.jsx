import React,{ PureComponent } from 'react'
import { Icon,Modal,Input } from 'antd';
import { style } from './video.scss';


const EditFrom = ({title, name,onChange}) => {
    return (
        <div>
            <div className="row">
                <label className="col-l" htmlFor="title">视频title：</label>
                <Input className="col-r" id="title" value={title} onChange={(e) => onChange('title', e)} />
            </div>
            <div className="row">
                <label className="col-l" htmlFor="name">视频name：</label>
                <Input className="col-r" id="name" value={name} onChange={(e) => onChange('name', e)} />
            </div>
        </div>
    )
}

export default class Video extends PureComponent {

    state = {
        showLargeVideo: false,
        visible: false,
        title: 'shiping',
        name: 'about as',
        url: 'http://vali.cp31.ott.cibntv.net/youku/6773baf6b5b4371b06ef7468a/03000801005C1798F6487B61552FA5681FFC02-A6C3-4A70-9E55-99D027ABE111.mp4?sid=054581598700010001171_00_A6980397ce213e52e0f616f1cfde2ff03&sign=29255ec5b7688fa9532ff0303570db23&ctype=50',

    }


    onDelete = (_id) => {
        console.log('delete video')
    }

    onSave = () => {
        console.log('video edit save')
    }

    onChange = (type, e) => {
        switch (type) {
            case 'title':
                this.setState({
                    title: e.target.value
                });
                break;
            case 'name':
                this.setState({
                    name: e.target.value,
                });
                break;
            default: return;
        }
    }

    render() {
        const { visible,showLargeVideo, title, name, url } = this.state;
        const editFromProps = {
            title,
            name,
            onChange: this.onChange
        }
        return (
            <div className={style}>
                <div className="video">
                    <video controls poster="http://plk956cz3.bkt.clouddn.com/83b01239b748d.jpg" src={url}></video>
                </div>
                <div className="video-warp" title={title}>
                    <Icon type="eye" onClick={() => this.setState({showLargeVideo: true})} />
                    <Icon type="edit" onClick={() => this.setState({visible: true})} />
                    <Icon type="delete" onClick={() => this.onDelete()} />
                </div>
                <Modal
                    title="视频信息编辑"
                    visible={visible}
                    onOk={this.onSave}
                    onCancel={() => this.setState({visible: false})}
                    okText="保存编辑"
                    cancelText="取消"
                >
                    <EditFrom {...editFromProps} />
                </Modal>
                <Modal
                    visible={showLargeVideo}
                    width={800}
                    bodyStyle={{padding: 10,boxShadow:'0 0 4px #fff'}}
                    footer={null}
                    onCancel={() => this.setState({showLargeVideo: false})}
                >
                    <video width={780} controls preload='auto' src='http://vali.cp31.ott.cibntv.net/youku/6773baf6b5b4371b06ef7468a/03000801005C1798F6487B61552FA5681FFC02-A6C3-4A70-9E55-99D027ABE111.mp4?sid=054581598700010001171_00_A6980397ce213e52e0f616f1cfde2ff03&sign=29255ec5b7688fa9532ff0303570db23&ctype=50'></video>
                </Modal>
            </div>
        )
    }
}