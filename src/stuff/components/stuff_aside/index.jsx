import { Tree,Icon, Input,message,Modal } from 'antd';
import React,{Component} from 'react';

import { getImgClasses,addImgClasses,putImgClasses, deleteImgClass } from 'Api/stuff'

import _ from 'utils/xym_lodash';
import RightMenu,{MenuOption} from 'components/right_menu';
import { style } from './index.scss';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;


class StuffAside extends Component {
    constructor(props) {
        super(props);
        
    }
    state = {
        tree: this.props.data,
        rightClickItemInfo: {key:'all', isLeaf: false}

    }
    componentDidMount() {
        // getImgClasses().then(res => {
        //     this.setState({
        //         tree: res.data,
        //     })
        // })
        console.log(this.props.data)
    }
    onSelect = (selectedKeys, e) => {
        const selectedKey = selectedKeys[0];
        // 如果选择的是子节点取出父节点
        this.props.getImgList(selectedKey);
        console.log('Trigger Select',selectedKey);
    };

    // 目录右键操作弹窗提示 
    onConfirm = (type='add',value = '',key) => {
        let menuName = value;
        const handleChange = (e) => {
            menuName = e.target.value;
        }
        let modalConfig = {
            okText: '保存',
            cancelText: '取消',
            iconType: 'pushpin',
        }
        switch (type) {
            case 'add':
                modalConfig.content = <Input defaultValue={value} onChange={(e) => handleChange(e)} placeholder="请输入分类名" />;
                modalConfig.onOk = () => this.onAdd(menuName,key);
                modalConfig.title = '添加分类';
                break;
            case 'rename':
                console.log('name:',value)
                modalConfig.content = <Input  defaultValue={value} onChange={(e) => handleChange(e)} placeholder="请输入分类名" />;
                modalConfig.onOk = () => {this.onEdit('rename', menuName)};
                modalConfig.title = '类目重命名';
                modalConfig.iconType = 'edit';

                break;
            case 'delete':
                modalConfig.content = <p>删除后，该类目及其子类目都见被移除，是否确认删除！</p>;
                modalConfig.onOk = () => this.onEdit();
                modalConfig.title = '类目删除';
                modalConfig.okText = '删除';
                modalConfig.okType = 'danger';
                modalConfig.iconType = 'delete';
                break;

        }
        Modal.confirm(modalConfig);
    }
    // 添加
    onAdd = (name,type) => {
        const { rightClickItemInfo, tree } = this.state;
        const { parentId } = rightClickItemInfo;
        const key = type || rightClickItemInfo.key;
        let params = {},
            hasSameName;
        if(key === 'all') {
            params.name = name;
            hasSameName = this.hasSameName(name, false);
        } else {
            params = {key, name, parentId};
            hasSameName = this.hasSameName(name)
        }
        if(hasSameName) {
            message.error('该类别已经存在');
            return
        }
        addImgClasses({...params}).then(res => {
            const data = (key === 'all') ? tree.concat(res.data) :
                tree.map(item => {
                    if(item._id === parentId) {
                        item.leaf.push(res.data)
                    }
                    return item
                });
            this.setState({
                tree: data
            });
            message.success(res.msg)
        })
    }
    // 编辑（重命名\删除）
    onEdit = (type='delete', name='') => {
        const { rightClickItemInfo,tree } = this.state;
        const { key, parentId,isLeaf } = rightClickItemInfo;
        let afterTree = tree;
        if(type === 'rename') {
            if(this.hasSameName(name, isLeaf)){
                message.info('该名称已经存在，请重新命名');
                return;
            }
            putImgClasses({key,name, parentId}).then(res => {
                if(isLeaf) {
                    afterTree = tree.map(item => {
                        if(item._id == parentId) {
                            item.leaf.forEach(v => {
                                if(v._id == key){
                                    v.name = name;
                                    return
                                }
                            })
                        }
                        return item;
                    })
                } else {
                    afterTree = tree.map(v => {
                        (v._id == key) && (v.name = name);
                        return v
                    })
                }
                this.setState({
                    tree: afterTree,
                })
                message.success(res.msg);
            })
        } else {
            deleteImgClass({key,parentId}).then(res => {
                if(isLeaf) {
                    afterTree = tree.map(item => {
                        if(item._id == parentId) {
                            item.leaf = item.leaf.filter(v => v._id != key);
                        }
                        return item;
                    })
                } else {
                    afterTree = tree.filter(v => v._id != key)
                }
                this.setState({
                    tree: afterTree
                })
                message.success(res.msg)
            })
        }
    }
    hasSameName = (name, isLeaf = true) => {
        const { parentId } = this.state.rightClickItemInfo;
        const {tree} = this.state;
        let hasSameName = false;
        if(isLeaf) {
            tree.forEach(v => {
                if(v._id == parentId) {
                    hasSameName = v.leaf.filter(item => item.name === name).length > 0;
                    return
                }
            })
        } else {
            hasSameName = tree.filter(v => v.name === name).length > 0;
        }
        return hasSameName
    }
    // 根据key获取类目名
    getMenuName = (rightClickItemInfo) => {
        const { tree } = this.state;
        const { isLeaf, parentId, key } = rightClickItemInfo;
        let menuName = '';

        tree.forEach(item => {
            if(isLeaf) {
                if(item._id == parentId) {
                    item.leaf.forEach(v => {
                        if(v._id == key){menuName = v.name;return};
                    });
                    return;
                }
            }
            if(item._id == key){menuName = item.name;return};
        })
        return menuName;
        
    }
    // 鼠标右键事件
    handleRightClick = (e) => {
        let key = 'all',
            isLeaf = false,
            parentId = '';
        if(_.get(e, 'node.props')) {
            const { eventKey } = e.node.props;
            //根目录不可编辑
            if(eventKey === 'all'){
                message.warn('根目录不可编辑');
                return;
            };
            key = eventKey;
            isLeaf = e.node.props.isLeaf || false;
            //如果是叶子节点需要获取其父节点
            if(isLeaf){
                this.state.tree.forEach(item => {
                    item.leaf.forEach(v => {
                        (v._id === key) && (parentId = item._id)
                    })
                })
            } else {
                parentId = key;
            }
        }
        this.setState({
            clickX: e.event.clientX,
            clickY: e.event.clientY,
            rightClickItemInfo: {
                key,
                parentId,
                isLeaf
            },
            visible: true,
        })
    };
    // 单击任意处关闭右键菜单
    closeMenu = () => {
        this.setState({
            visible: false,
        })
    }
 
    

    render() {
        const { tree, visible,clickX,clickY,rightClickItemInfo } = this.state;
        return (
            <div className={style}>
                <DirectoryTree
                    defaultExpandParent
                    defaultExpandedKeys={['all']}
                    defaultSelectedKeys={['all']}
                    onSelect={this.onSelect}
                    onRightClick={(e) => this.handleRightClick(e)}
                >   <TreeNode title="全部图片" key="all" >
                    {
                        tree.map(item => {return(
                            <TreeNode title={item.name} key={item._id}>
                                {
                                    item.leaf && item.leaf.map(v => (
                                        <TreeNode title={v.name} key={v._id} isLeaf />
                                    ))
                                }
                            </TreeNode>)}
                        )
                    }
                    </TreeNode>
                    
                </DirectoryTree>
                <div className="add-tree" onClick={() => this.onConfirm('add','', 'all')} title='添加分类'>
                    <Icon type="plus" />
                </div>
                { visible && 
                    <RightMenu clickY={clickY} visible={visible} clickX={clickX} closeMenu={this.closeMenu}>
                        <MenuOption text='删除' onClick={() => this.onConfirm('delete')}/>
                        <MenuOption text='编辑' onClick={() => this.onConfirm('rename', this.getMenuName(rightClickItemInfo))}/>
                        <MenuOption text='添加' onClick={() => this.onConfirm('add')}/>
                        <MenuOption text='取消' />
                    </RightMenu>
                }            
            </div>
        );
    }
}

export default StuffAside