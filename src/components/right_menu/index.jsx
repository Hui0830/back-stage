import React, {Component} from 'react';
import { MenuOption } from './menu_option';
import PropTypes from 'prop-types';

require('./index.scss')
// 右键菜单
export default class RightMenu extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        closeMenu: PropTypes.func.isRequired,
        children: PropTypes.arrayOf(PropTypes.instanceOf(MenuOption)),

    }
    constructor(props) {
        super(props);
        this.menuRoot = React.createRef();
        this.style = {};
    }

    state = { visible: this.props.visible };

    componentDidMount() {
        this.getMenuPosition();
        document.addEventListener('click', this.props.closeMenu)
    }
    componentWillUnmount() {
        // 移除事件监听
        document.removeEventListener('click', this.props.closeMenu)
    }
    componentDidUpdate() {
        this.getMenuPosition()
    }

    getMenuPosition() {
        const menuRoot = this.menuRoot.current;
        // clientX/Y 获取到的是触发点相对于浏览器可视区域左上角距离
        const { clickX, clickY } = this.props;
        // window.innerWidth/innerHeight 获取的是当前浏览器窗口的视口宽度/高度
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        // 获取自定义菜单的宽度/高度
        const rootW = menuRoot.offsetWidth
        const rootH = menuRoot.offsetHeight

        // right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放下菜单。否则，菜单放到左边。
        // bottom为true，说明鼠标点击位置到浏览器的下边界的高度可以放下菜单。否则，菜单放到上边。
        const right = (screenW - clickX) > rootW;
        const left = !right;
        const bottom = (screenH - clickY) > rootH;
        const top = !bottom;
        if (right) {
            menuRoot.style.left = `${clickX}px`
        }
        if (left) {
            menuRoot.style.left = `${clickX - rootW}px`
        }
        if (bottom) {
            menuRoot.style.top = `${clickY}px`
        }
        if (top) {
            menuRoot.style.top = `${clickY - rootH}px`
        }
    }
    render() {
        return(
            <div ref={this.menuRoot} style={this.style} className="contextMenu-wrap">
                {this.props.children}
            </div>
        )
    }
}

export {RightMenu, MenuOption};