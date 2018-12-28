import React, { Component } from 'react';
import {
    Layout, Pagination, Icon
} from 'antd';

import StuffAside from './components/stuff_aside';
import ImgItem from './components/stuff_img';
import ImgUpload from './components/img_upload';

import { style } from './index.scss';


const {
    Header, Content, Footer, Sider,
  } = Layout;

  let images = [];
  for(let i = 0; i < 700; i++) {
      images.push({
          id: i,
          title: `图片${i}`,
          name: `tupian${i}.png`,
          type: 'article',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          size: i,
          time: 100  - i
      })
  }

class Stuff extends Component {
    state = {
        visible: false,
        timeSort: 0,
        sizeSort: 0,
        images: images.slice(0,19),
        current: 1,
        total: images.length,
        pageSize: 19,
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
        const { timeSort, sizeSort, current, total, pageSize,images } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }} theme='light'>
                <Sider theme='light'>
                    <StuffAside />
                </Sider>
                <Layout theme='light' className={style}>
                    <Content>
                        <div className="header">
                            <span onClick={() => this.onSort('time')}>时间排序: <Icon type={timeSort ? "arrow-up" : "arrow-down"} /></span>
                            <span onClick={() => this.onSort('size')}>大小排序: <Icon type={sizeSort ? "arrow-up" : "arrow-down"} /></span>
                        </div>
                        <div className="img-list">
                        <ImgUpload>
                            <div className="img-upload">
                                <Icon type="picture" theme="twoTone" twoToneColor="#40a9ff" />
                                <span>上传图片</span>
                            </div>
                        </ImgUpload>
                        {
                            images.map(item =>  <ImgItem key={item.id}   {...item}/>)
                        }
                        </div>
                    </Content>
                    <Footer>
                        <Pagination defaultCurrent={1} current={current} onChange={this.onChange} total={total} pageSize={pageSize} />
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Stuff;