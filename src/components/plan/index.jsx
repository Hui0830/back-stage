import React,{Component} from 'react';
import {
    Modal,
    Icon
} from 'antd'

import { style } from './index.scss';

const DefaultContent = () => <p>请设置弹窗内容哦-_-!</p>;

class Plan extends Component {
    static defaultProps = {
        modal: {
            content: <DefaultContent />,
            config: {
                title:"编辑"
            },
        },
        close: false,
        add: false,
        onClose: ()=>{},
        onAdd: ()=> {},
    }
    state = {
        visibel: false,
    }

    warpModalSave = (element) => React.cloneElement(element, {
        closeModal: () => this.setState({visibel: false})
    })

    render() {
        const { modal,close,add,onAdd,onClose } = this.props;
        return (
            <div className={style} style={this.props.style}>
                {this.props.children}
                <div className="plan-edit">
                    <Icon className="edit" onClick={() => this.setState({visibel: true})} type="edit" />
                    {add && <span className="add" onClick={onAdd}><Icon type="plus" /></span>}
                    {close && <span className="close" onClick={onClose}><Icon type="close" /></span>}
                </div>
                <Modal
                    onCancel={() => this.setState({visibel: false})}
                    visible={this.state.visibel}
                    destroyOnClose={true}
                    footer={null}
                    width={620}
                    title="编辑"
                    {...modal.config}
                >
                   { this.warpModalSave(modal.content || <DefaultContent />)}
                </Modal>
            </div>
        )
    }
}

export default Plan;