import React, { Component } from 'react';

import {getValidDateInfo, getSkuInfo} from 'Api/store';
/**
 *  setState骚操作：
 * 两个Api需要B依然与A返回的数据；
 * 即需要setState进行同步操作
 * 1、使用回调
 * 2、使用函数式setState
 * 3、通过then链式回调（好难看）
 * 4、父组件获取A并传给子组件
*/
const storeItemIdMap = {
    1: 222, // 其他
    2: 223, // 基础版
    3: 224, // 专业版
}
let a = 0;
export default class Test extends Component {
    state = {
        loading: false,
        itemId: 223, // 默认为基础版
        isAdvancedStore: false, // 是否是专业版
    }
    componentDidMount() {
        this.getValidDateInfo();
        // this.getSkuInfo();
    }
    getValidDateInfo = () => {
        this.setState({
            loading: true,
        })
        getValidDateInfo().then((data) => {
            // isAdvancedStore是否是专业版,这里设置后端返回的都是专业版code
            const isAdvancedStore = data.serviceVersion == 3;
            this.setState({
                isAdvancedStore,
                loading: false,
                ...data,
            })
        }).then(() => {
            this.getSkuInfo();
        });
    }

    getSkuInfo = () => {
        this.setState({loading: true,})
        const itemId = this.state.isAdvancedStore ? 224 : 223;
        // itemId为223取到的是基础版数据，224为专业版
        getSkuInfo({itemId}).then((d) => {
            this.setState({
                name: d.name,
                price: d.price,
                loading: false,
            })
        })
    }

    render() {
        const { isAdvancedStore, name, price } = this.state;
        return (
            <div>
                {
                    isAdvancedStore ? <h2>专业版店铺</h2> : <h2>基础版店铺</h2>
                }
                <div>
                    <h2>
                        {name}
                    </h2>
                    <p>订购价格：{price}</p>
                </div>
                <p>render方法调用次数：{++a}</p>
            </div>
        )
    }
}