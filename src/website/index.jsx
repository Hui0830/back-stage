import React, { Component } from 'react';

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
import img_1 from '../images/home.jpg';

class Website extends Component {
    state = {
       ...webData,
        carouselData: [
            {
                img: img_1,
                url: '/home'
            },
            {
                img: img_1,
                url: '/home2'
            },
            {
                img: img_1,
                url: '/home3'
            },
            {
                img: img_1,
                url: '/home4'
            }
        ],
    }

    onSave = (type, val) => {
        if(JSON.stringify(val) === JSON.stringify(this.state[`${type}Data`])){
            return;
        }
        switch (type) {
            case 'nav': 
                this.setState({
                    navData: val,
                });
                break;
            case 'carousel':
                this.setState({
                    carouselData: val
                });
                break;
            case 'about': 
                this.setState({
                    aboutData: val,
                })
                break;
            case 'productNav': 
                this.setState({
                    productNavData: val,
                })
                break;
            case 'purpose': 
                this.setState({
                    purposeData: val,
                })
                break;
            case 'staffSay': 
                this.setState({
                    staffSayData: val,
                })
                break;
            case 'introduction': 
                this.setState({
                    introductionData: val,
                })
                break;
            case 'contactData': 
                this.setState({
                    contactData: val,
                })
                break;
            case 'addressData': 
                this.setState({
                    addressData: val,
                })
                break;
            case 'productData': 
                this.setState({
                    productData: val,
                })
                break;
                
            default: return;
        }
    }

    render() {
        const { 
            navData,carouselData,
            aboutData,productNavData,
            purposeData,staffSayData,
            introductionData,contactData,
            addressData,productData
        } = this.state;
        return (
            <div className={style}>
                <WebHeader navData={navData} carousel={carouselData} onSave={this.onSave} />
                <About aboutData={aboutData} onSave={this.onSave}/>
                <ProductNav data={productNavData} onSave={this.onSave} />
                <Product data={productData} onSave={this.onSave} />
                <Purpose data={purposeData} onSave={this.onSave} />
                <StaffSay data={staffSayData} onSave={this.onSave} />
                <Introduction data={introductionData} onSave={this.onSave} />
                <Contact data={contactData} onSave={this.onSave} />
                <Address data={addressData} onSave={this.onSave} />
            </div>
            
        )
    }
}

export default Website;