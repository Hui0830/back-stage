import React, { PureComponent } from 'react';
import { Skeleton,Tabs,Icon,Divider,Button,message } from 'antd';

import { createDecorate,putDecorate,getHomeDecorate } from 'Api/decorate';
import { getWebPageLink } from 'Api/store';

import TipTitle from 'components/tip_title';
import WebHeader from './components/header';
import About from './components/about_as';
import ProductNav from './components/product_nav';
import Purpose from './components/purpose';
import StaffSay from './components/staff_say';
import Introduction from './components/introduction';
import Contact from './components/contact_us';
import Address from './components/address';
import Product from './components/product';

import { webData } from './web_test_data';

import { style } from './index.scss';

const TabPane = Tabs.TabPane;
class Website extends PureComponent {
    state = {
        loading: true,
        navLinks: [],
        navData: [],
        aboutData: {},
        staffSayData: {},
        introductionData: {},
        carouselData: [],
        purposeData: {},
        productData: {},
        contactData: {},
        addressData: {},
        productNavData: [],
        homeId: ''
    }

    componentDidMount() {
        this.getHomeDecorateData();
        getWebPageLink().then(res => {
            this.setState({
                navLinks: res.data
            })
        })
        
    }

    getHomeDecorateData = () => {
        getHomeDecorate().then(res => {
            const { nav, about,staff,introduction,carousel,purpose,product,contact,address,productNav,_id} = res.data;
            this.setState({
                loading: false,
                navData: nav,
                aboutData: about,
                staffSayData: staff,
                introductionData: introduction,
                carouselData: carousel,
                purposeData: purpose,
                productData: product,
                contactData: contact,
                addressData: address,
                productNavData: productNav,
                homeId: _id
            })
        })
    }
    // 整体保存
    putDecorate = (type,data) => {
        putDecorate({type,data,_id: this.state.homeId}).then(res => {
            this.setState({
                [`${type}Data`]: data
            })
        })
    }

    onSave = (type, val, id) => {
        if(JSON.stringify(val) === JSON.stringify(this.state[`${type}Data`])){
            return;
        }
        switch (type) {
            case 'product': 
                let data = this.state.productData.slice();
                if(val === null) {
                    if(id) {
                        if(data.length === 1){message.warn('唯一一项，不可删除！');return;}
                        data.splice(id,1);
                    } else {
                        data.push({
                            title: '',
                            smallTitle: '',
                            color: '#555',
                            bgColor: '#fff',
                            images: [
                                {url: '/index', image: 'images/1548125645068-f5a8526c95d07.jpg'},
                                {url: '/index', image: 'images/1548125645068-f5a8526c95d07.jpg'},
                                {url: '/index', image: 'images/1548125645068-f5a8526c95d07.jpg'},
                                {url: '/index', image: 'images/1548125645068-f5a8526c95d07.jpg'}
                            ]
                        });
                    }
                } else {
                    data = data.map((item,key) => {
                        if(key === id) {
                            item = val
                        };
                        return item
                    })
                }
                this.putDecorate('product',data)
                break;
            default: 
                this.putDecorate(type,val)
        }
    }

    render() {
        const { 
            navData,carouselData,
            aboutData,productNavData,
            purposeData,staffSayData,
            introductionData,contactData,
            addressData,productData,
            loading,navLinks
        } = this.state;
        return (
            <div className={style}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="home" />首页装修</span>} key="1">
                        <TipTitle title='首页自定义装修'/>
                        <div className="page-container">
                            <Skeleton loading={loading} active>
                                <WebHeader navData={navData} carousel={carouselData} navLinks={navLinks} onSave={this.onSave} />
                                <About aboutData={aboutData} onSave={this.onSave}/>
                                <ProductNav data={productNavData} onSave={this.onSave} navLinks={navLinks} />
                                <Product data={productData} onSave={this.onSave} navLinks={navLinks} />
                                <Purpose data={purposeData} onSave={this.onSave} />
                                <StaffSay data={staffSayData} onSave={this.onSave} />
                                <Introduction data={introductionData} onSave={this.onSave} />
                                <Contact data={contactData} onSave={this.onSave} />
                                <Address data={addressData} onSave={this.onSave} />
                            </Skeleton>
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="appstore" />自定义页装修</span>} key="2">
                        <TipTitle title='自定义装修'/>
                    </TabPane>
                </Tabs>
            </div>
            
        )
    }
}

export default Website;