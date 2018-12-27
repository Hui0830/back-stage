import React,{ Component } from 'react';
import { Icon,Modal,TreeSelect,Input } from 'antd';
import Proptypes from 'prop-types';

import { style } from './index.scss';



const EditFrom = ({title, name, type, onChange, optionDate}) => {
    return (
        <div>
            <div className="row">
                <label className="col-l" htmlFor="title">图片title：</label>
                <Input className="col-r" id="title" defaultValue={title} onChange={(e) => onChange('title', e)} />
            </div>
            <div className="row">
                <label className="col-l" htmlFor="name">图片name：</label>
                <Input className="col-r" id="name" defaultValue={name} onChange={(e) => onChange('name', e)} />
            </div>
            <div className="row">
                <span className="col-l">图片分类</span>
                <TreeSelect
                    style={{ width: 300 }}
                    defaultValue={type}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={optionDate}
                    placeholder="Please select"
                    treeDefaultExpandAll
                    onChange={(val) => onChange('select', val)}
                    className="col-r"
                />
            </div>
        </div>
    )
}

const tree = [
    {
        title: '装修',
        key: 'decorate',
        value: 'decorate',
        children: [
            {
                title: '首页',
                value: 'decorate_home',
                key: 'decorate_home'
            },
            {
                title: '产品页',
                value: 'decorate_product',
                key: 'decorate_product'
            }
        ]
    },
    {
        title: '文章',
        value: 'article',
        key: 'article',
        children: [
            {
                title: '活动',
                value: 'article_activity',
                key: 'article_activity'
            },
            {
                title: '事记',
                value: 'article_info',
                key: 'article_info'
            }
        ]
    }
]
class ImgItem extends Component {

    static propTypes = {
        title: Proptypes.string.isRequired,
        name: Proptypes.string.isRequired,
        type: Proptypes.string.isRequired,
    }
    state = {
        visible: false,
        showLargeImg: false,
        title: this.props.title,
        name: this.props.name,
        type: this.props.type
    }

    onDelete = () => {
        console.log(this.props.id)
    }

    onSave = () => {
        const { title, name, type } = this.state;
        console.log(title, name, type)
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
                    type: e,
                });
                break;
            default: return;
        }
    }


    render() {
        const { url, title, name, type, id } = this.props;
        const { visible,showLargeImg } = this.state;
        const optionDate = Object.keys(tree).map(key => tree[key]);
        optionDate.unshift({title: '所有图片',value: 'all',key:'all'});
        const editFromProps = {
            title,
            name,
            optionDate,
            onChange: this.onChange,
            type,
        }
        return (
            <div className={style}>
                <div className="img">
                    <img src={url} title={title} alt={name} />
                </div>
                <div className="img-warp" title={title}>
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