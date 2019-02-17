import ReactDOM from 'react-dom';
import { Modal } from 'antd';

const ModalWarp = (props) => {
    return (
        <Modal>
            {props.content || '请设置content属性'}
        </Modal>
    )
}

export default (options) => ReactDOM.render(<ModalWarp {...options}/>, document.body)