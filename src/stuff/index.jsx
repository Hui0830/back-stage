import React, { Component } from 'react';
import {
    Layout, Pagination, Icon, Spin,message,
} from 'antd';

import { getImgClasses, getImgList, deleteImg, putImgInfo} from 'Api/stuff';

import StuffAside from './components/stuff_aside';
import ImgItem from './components/stuff_img';
import ImgUpload from './components/img_upload';

import { style } from './index.scss';


const {
    Content, Footer, Sider,
  } = Layout;

class Stuff extends Component {
    state = {
        visible: false,
        timeSort: 0,
        sizeSort: 0,
        images: [],
        imagesCache: {},
        current: 1,
        pageSize: 4,
        total: 0,
        tag: 'all',
        lastImgId: '',
        imagesClass: [],
    }

    componentDidMount() {
        Promise.all([
            this.getImgClasses(),
            this.getImgList()
        ])
    }

    // 获取图片分类
    getImgClasses = () => {
        this.setState({
            visible: true
        })
        getImgClasses().then(res => {
            this.setState({
                imagesClass: res.data,
                visible: false
            })
        })
    }
    // 获取图片列表
    getImgList = (tag = 'all') => {
        const { imagesCache,lastImgId,current } = this.state;
        const pageSize = current === 1 ? (this.state.pageSize - 1) : this.state.pageSize;
        getImgList({tag,_id: lastImgId,pageSize}).then(res => {
            const { images, total } = res.data;
            this.setState({
                tag,
                total,
                images,
                lastImgId: images.length> 0 ? images[images.length-1]._id : '',
                imagesCache: {...imagesCache, [current]: images}
            })
        })
    }
    // 删除图片
    deleteImg = (_id) => {
        deleteImg(_id).then(res => {
            this.getImgList(this.state.tag);
            message.success(res.msg);
        })
    }
    //编辑图片信息
    editImgInfo = ({_id, name,alt,tag}) => {
        putImgInfo({_id, name,alt,tag}).then(res => {
            const {_id} = res.data;
            let imgs = [];
            if(this.state.tag === 'all' || this.state.tag == tag) {
                imgs = this.state.images.map(item => {
                    if(item._id === _id){
                        item.name = name;
                        item.alt = alt;
                    }
                    return item
                })
            } else {
                imgs = this.state.images.filter(v => v._id != _id);
            }
            this.setState({
                images: imgs
            });
            message.success(res.msg)
        })
    }

    onChange = (page, pageSize) => {
        const { imagesCache, tag } = this.state;
        console.log(this.state.imagesCache)
        if(imagesCache[page]){
            this.setState({
                images: imagesCache[page],
                current: page
            })
            return
        }
        this.setState({
            current: page
        },() => {
            this.getImgList(tag)
        })
      }

    render() {
        const {
            current,
            total,
            pageSize,
            images,
            tag,
            imagesClass,
            visible
        } = this.state;
        return (
            <Spin spinning={visible}>
            <Layout style={{ minHeight: '100vh' }} theme='light'>
                <Sider theme='light'>
                    {imagesClass.length > 0 && <StuffAside getImgList={this.getImgList} data={imagesClass} />}
                </Sider>
                <Layout theme='light' className={style}>
                    <Content>
                            <div className="header">
                                <span>{`共检索${total}条记录`}</span>
                            </div>
                            <div className="img-list">
                            {
                                current === 1 &&
                                <ImgUpload tag={tag} onSave={() => this.getImgList(tag)} >
                                    <div className="img-upload">
                                        <Icon type="picture" theme="twoTone" twoToneColor="#40a9ff" />
                                        <span>上传图片</span>
                                    </div>
                                </ImgUpload>
                            }
                            {
                                images.map(item =>  <ImgItem 
                                    editImgInfo={this.editImgInfo}
                                    deleteImg={this.deleteImg}
                                    key={item._id}
                                    imagesClass={imagesClass}
                                    {...item}
                                    />)
                            }
                            </div>
                    </Content>
                    <Footer>
                        <Pagination
                            defaultCurrent={1}
                            hideOnSinglePage
                            current={current}
                            onChange={this.onChange}
                            total={total}
                            pageSize={pageSize}
                        />
                    </Footer>
                </Layout>
            </Layout>
            </Spin>
        )
    }
}

export default Stuff;