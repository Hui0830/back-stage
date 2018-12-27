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
    }
    state = {
        visibel: false,
    }

    warpModalSave = (element) => React.cloneElement(element, {
        closeModal: () => this.setState({visibel: false})
    })

    render() {
        const { modal } = this.props;
        return (
            <div className={style} style={this.props.style}>
                {this.props.children}
                <div className="plan-edit">
                    <Icon className="edit" onClick={() => this.setState({visibel: true})} type="edit" />
                    <span className="close"><Icon type="close" /></span>
                </div>
                <Modal
                    onCancel={() => this.setState({visibel: false})}
                    visible={this.state.visibel}
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