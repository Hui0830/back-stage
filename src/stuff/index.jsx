import React, { Component } from 'react';
import {
    Layout, Pagination, Icon, Spin
} from 'antd';

import { getImgClasses, getImgList} from 'Api/stuff';

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
        current: 1,
        pageSize: 4,
        total: 0,
        tag: 'all',
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
        getImgList({tag}).then(res => {
            this.setState({
                tag,
                images: res.data
            })
        })
        console.log(tag)
    }

    onSort = (type) => {
        if(type === 'time') {
            this.setState({
                timeSort: this.state.timeSort ? 0 : 1,
            })
        } else {
            this.setState({
                sizeSort: this.state.sizeSort ? 0 : 1,
            })
        }
    }

    onChange = (page, pageSize) => {
        console.log(page);
        let imgs = [];
        if(images.length < page*pageSize) {
            imgs = images.slice((page-1)*pageSize);
        } else {
            const currentIndex = (page-1)*pageSize;
            imgs = images.slice(currentIndex, page*pageSize);
        }
        this.setState({
            current: page,
            images: imgs
        });
      }

    render() {
        const {
            timeSort,
            sizeSort,
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
                                <span onClick={() => this.onSort('time')}>时间排序: <Icon type={timeSort ? "arrow-up" : "arrow-down"} /></span>
                                <span onClick={() => this.onSort('size')}>大小排序: <Icon type={sizeSort ? "arrow-up" : "arrow-down"} /></span>
                            </div>
                            <div className="img-list">
                            <ImgUpload tag={tag} onSave={() => this.getImgList(tag)} >
                                <div className="img-upload">
                                    <Icon type="picture" theme="twoTone" twoToneColor="#40a9ff" />
                                    <span>上传图片</span>
                                </div>
                            </ImgUpload>
                            {
                                images.map(item =>  <ImgItem key={item._id} imagesClass={imagesClass} {...item}/>)
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