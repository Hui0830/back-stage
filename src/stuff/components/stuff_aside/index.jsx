import { Tree,Icon, Input,message,Modal } from 'antd';
import React,{Component} from 'react';

import RightMenu,{MenuOption} from 'components/right_menu';
import { style } from './index.scss';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;




class StuffAside extends Component {
    constructor(props) {
        super(props);
        
    }
    state = {
        tree: {
            decorate: {
                title: '装修',
                leaf: [
                    {
                        title: '首页',
                        key: 'decorate_home'
                    },
                    {
                        title: '产品页',
                        key: 'decorate_product'
                    }
                ]
            },
            article: {
                title: '文章',
                leaf: [
                    {
                        title: '活动',
                        key: 'article_activity'
                    },
                    {
                        title: '事记',
                        key: 'article_info'
                    }
                ]
            }
        },
        expandParent: 'all',
        selectedKey: 'all',
        selectKey: ''

    }
    onSelect = (selectedKeys, e) => {
        const selectedKey = selectedKeys[0];
        // 如果选择的是子节点取出父节点
        this.setState({
            expandParent: selectedKey.split('_')[0] || 'all',
            selectedKey,
        })
        console.log('Trigger Select',selectedKeys);
    };

    onExpand = (expandedKeys, e) => {
        console.log('Trigger Expand',expandedKeys,e.node.key);
    };

    // 目录右键操作弹窗提示 
    onConfirm = (type='add',value = '') => {
        let { selectKey } = this.state;
        let menuName = ''
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
                modalConfig.onOk = () => this.onAdd(menuName);
                modalConfig.title = '添加分类';
                break;
            case 'rename':
                console.log('name:',value)
                modalConfig.content = <Input  defaultValue={value} onChange={(e) => handleChange(e)} placeholder="请输入分类名" />;
                modalConfig.onOk = () => {this.onEdit(selectKey, 'rename', menuName)};
                modalConfig.title = '类目重命名';
                modalConfig.iconType = 'edit';

                break;
            case 'delete':
                modalConfig.content = <p>删除后，该类目及其子类目都见被移除，是否确认删除！</p>;
                modalConfig.onOk = () => this.onEdit(selectKey);
                modalConfig.title = '类目删除';
                modalConfig.okText = '删除';
                modalConfig.okType = 'danger';
                modalConfig.iconType = 'delete';
                break;

        }
        Modal.confirm(modalConfig);
    }
    // 添加
    onAdd = (name) => {
        const { expandParent, tree } = this.state;
        if(expandParent === 'all'){
            if(Object.keys(tree).includes(name)) {
                message.info('该类别已经存在')
                return;
            }
            this.setState({
                tree: {...tree, [name]: {title: name, leaf: []} }
            });
            return;
        }
        const addTree = tree[expandParent];
        addTree.leaf.push({
            title: name,
            key: `${expandParent}_${addTree.leaf.length}`
        })
        this.setState({
            tree: {...tree, [expandParent]: addTree},
        })
    }
    // 编辑（重命名\删除）
    onEdit = (key='all', type='delete', name='') => {
        const { tree } = this.state;
        let afterTree;
        if(/_/gi.test(key)) {
            const parentKey = key.split('_')[0];
            let itemLeafTree = [];
            if(type === 'rename') {
                itemLeafTree = tree[parentKey].leaf.map(item => {
                    if(item.key === key) return {...item, title: name};
                    return item;
                });
            } else {
                itemLeafTree = tree[parentKey].leaf.filter(item => item.key !== key);
            }
            const itemTree = {...tree[parentKey], leaf: itemLeafTree}
            afterTree = {...tree, [parentKey]: itemTree}
            
        } else{
            afterTree = tree;
            console.info(key, type, name);
            type === 'delete' ? (delete afterTree[key]) : afterTree[key].title = name;
        }
        this.setState({
            tree: afterTree
        })
    }
    // 根据key获取类目名
    getMenuName = (key) => {
        let menuName = '';
        if(/_/gi.test(key)){
            const parentKey = key.split('_')[0];
            this.state.tree[parentKey].leaf.forEach(element => {
                if(element.key === key) {
                    menuName = element.title;
                    return;
                }
            });
            return menuName

        } else {
            Object.keys(this.state.tree).forEach(item => {
                if(item === key){
                    menuName = this.state.tree[item].title;
                    return;
                }
            });
            return menuName;
        }
    }
    // 鼠标右键事件
    handleRightClick = (e) => {
        //根目录不可编辑
        if(e.node.props.eventKey === 'all'){
            message.warn('根目录不可编辑');
            return;
        }
        const clickX = e.event.clientX;
        const clickY = e.event.clientY;

        console.log(e)
        this.setState({
            clickX: e.event.clientX,
            clickY: e.event.clientY,
            selectKey: e.node.props.eventKey,
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
        const { tree, visible,clickX,clickY,selectKey } = this.state;
        return (
            <div className={style}>
                <DirectoryTree
                    defaultExpandParent
                    defaultExpandedKeys={['all']}
                    defaultSelectedKeys={['all']}
                    onSelect={this.onSelect}
                    onExpand={this.onExpand}
                    onRightClick={(e) => this.handleRightClick(e)}
                >   <TreeNode title="全部图片" key="all" >
                    {
                        Object.keys(tree).map(item => {return(
                            <TreeNode title={tree[item].title} key={item}>
                                {
                                    tree[item].leaf && tree[item].leaf.map(v => (
                                        <TreeNode title={v.title} key={v.key} isLeaf />
                                    ))
                                }
                            </TreeNode>)}
                        )
                    }
                    </TreeNode>
                    
                </DirectoryTree>
                <div className="add-tree" onClick={this.onConfirm}>
                    <Icon type="plus" />
                </div>
                { visible && 
                    <RightMenu clickY={clickY} visible={visible} clickX={clickX} closeMenu={this.closeMenu}>
                        <MenuOption text='删除' onClick={() => this.onConfirm('delete')}/>
                        <MenuOption text='编辑' onClick={() => this.onConfirm('rename', this.getMenuName(selectKey))}/>
                        <MenuOption text='添加' onClick={() => this.onConfirm('add')}/>
                        <MenuOption text='取消' />
                    </RightMenu>
                }            
            </div>
        );
    }
}

export default StuffAside