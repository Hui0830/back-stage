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
let a = 0;
export default class Test extends Component {
    state = {
        loading: false,
        itemId: 223,
        isAdvancedStore: false,
    }

    componentDidMount() {
        this.getValidDateInfo();
        
    }

    getValidDateInfo = () => {
        this.setState({
            loading: true,
        })
        getValidDateInfo().then((data) => {
            // console.log(data);
            const isAdvancedStore = data.serviceVersion == 20;
            this.setState({
                isAdvancedStore,
                name: data.name,
                loading: false,
            })
        }).then(() => this.getSkuInfo());
    }

    getSkuInfo = () => {
        let itemId;
        this.setState((state) => {
            console.info(state);
            itemId = state.isAdvancedStore ? 224 : 223;
            return {
                loading: true,
            }
        })
        getSkuInfo({itemId}).then((d) => {
            this.setState((state) => {
                console.log(state);
                return {
                ...d,
                }
            })
        })
    }

    render() {
        const { isAdvancedStore, name, content } = this.state;
        return (
            <div>
                {
                    !isAdvancedStore ? <h2>基础店铺展示</h2> : <h2>专业店铺展示</h2>
                }
                <p>{name}</p>
                <div>
                    <h2>
                        {name}
                        {a++}
                    </h2>
                    <p>{content}</p>
                </div>
            </div>
        )
    }
}