import React,{ Component } from 'react';
import { Icon,Modal,Input } from 'antd';
import Proptypes from 'prop-types';

import TreeSelect from '../tree_select';
import { style } from './index.scss';



const EditFrom = ({alt, name, tag, onChange, data}) => {
    return (
        <div>
            <div className="row">
                <label className="col-l" htmlFor="title">图片alt：</label>
                <Input className="col-r" id="title" defaultValue={alt} onChange={(e) => onChange('title', e)} />
            </div>
            <div className="row">
                <label className="col-l" htmlFor="name">图片name：</label>
                <Input className="col-r" id="name" defaultValue={name} onChange={(e) => onChange('name', e)} />
            </div>
            <TreeSelect label="图片类别" onChange={(val) => onChange('select', val)} defaultValue={tag} data={data} />
        </div>
    )
}
class ImgItem extends Component {

    static propTypes = {
        alt: Proptypes.string.isRequired,
        name: Proptypes.string.isRequired,
        tag: Proptypes.string.isRequired,
    }
    state = {
        visible: false,
        showLargeImg: false,
        alt: this.props.alt,
        name: this.props.name,
        tag: this.props.tag
    }

    onDelete = () => {
        console.log(this.props.id)
    }

    onSave = () => {
        const { alt, name, tag } = this.state;
        console.log(alt, name, tag)
        this.setState({
            visible: false
        })
    }
    // 
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
            case 'select':
                this.setState({
                    tag: e,
                });
                break;
            default: return;
        }
    }


    render() {
        const { alt, name, tag ,imagesClass} = this.props;
        const url = `http://localhost:3000${this.props.url}`;
        const { visible,showLargeImg } = this.state;
        const editFromProps = {
            alt,
            name,
            data: imagesClass,
            onChange: this.onChange,
            tag,
            url,
        }
        return (
            <div className={style}>
                <div className="img">
                    <img src={url} title={alt} alt={name} />
                </div>
                <div className="img-warp" title={alt}>
                    <Icon type="eye" onClick={() => this.setState({showLargeImg: true})} />
                    <Icon type="edit" onClick={() => this.setState({visible: true})} />
                    <Icon type="delete" onClick={this.onDelete} />
                </div>
                <Modal
                    title="图片信息编辑"
                    visible={visible}
                    onOk={this.onSave}
                    onCancel={() => this.setState({visible: false})}
                    okText="保存编辑"
                    cancelText="取消"
                >
                    <EditFrom {...editFromProps} />
                </Modal>
                <Modal
                    visible={showLargeImg}
                    width={500}
                    bodyStyle={{padding: 10,boxShadow:'0 0 4px #fff'}}
                    footer={null}
                    onCancel={() => this.setState({showLargeImg: false})}
                >
                    <img src={url} width="480px" height="auto" />
                </Modal>
            </div>
        )
    }
}


export default ImgItem