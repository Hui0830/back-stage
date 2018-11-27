import React from 'react';
import { Button, Dialog } from 'zent';
import './index.scss';

const { openDialog, closeDialog } = Dialog;
const id = 'buy_dialog';

const BASIC_STORE_CODE = '1';
const PRO_STORE_CODE = '2';
const CUSTOM_STORE_CODE = '3';

// 不同版本描述简介映射
const smallHeadMap = {
    1: '适合直营/单门店经营模式',
    2: '适合直营/加盟多店经营模式',
    3: '适合多种经营模式',
};
// 不同版本功能简介映射
const storeTypeInfoMap = {
    1: [
        '预约管理/会员管理/数据分析/店铺管理等基本店务管理功能',
        '基础版门店管理权限',
        '包含品牌小程序',
        '7项营销插件免费使用',
        '专属服务经理、在线课程、线下商盟',
    ],
    2: [
        '预约管理/会员管理/数据分析/店铺管理等基本店务管理功能',
        '基础版门店管理权限',
        '包含品牌小程序',
        '7项营销插件免费使用',
        '专属服务经理、在线课程、线下联盟',
        '资金账户支持总部、门店',
        '商品管理支持总部、门店商品管理',
        '会员权益支持门店通用或独立',
        '网店支持门店有独立网店 ',
        '业绩提成支持总店或分店配置',
    ],
    3: [
        '预约管理/会员管理/数据分析/店铺管理等基本店务管理功能',
        '适用于更多门店（基础版/专业版）',
        '7项营销插件免费使用',
        '7项营销插件免费使用',
        '专属服务经理、在线课程、线下联盟',
        '适用于更多门店',
    ],
};

const Introduction = ({ type }) => (
    <ul className="detail" >
        {
            storeTypeInfoMap[type].map(item => (
                <li>
                    <p className="detail-item">
                        {item}
                        <span className="check" />
                    </p>
                </li>))
        }
    </ul>
);

const BuyList = ({ priceArray, activedItem, selectBuyNum }) => (
    <ul>
        {
            priceArray.map((item) => {
                const className = activedItem == item.num ? 'buy-item item-actived' : 'buy-item';
                return (
                    <li className={className} onClick={() => selectBuyNum(item.num)} >
                        {
                            item.num == 1 ?
                                <div className="buy-type">¥{item.price}/<span>年期</span></div> :
                                <div className="buy-type">¥{item.price}/
                                <span>年期({item.num}家门店)</span><span className="discount">立省¥2000.00元</span>
                                </div>
                        }
                    </li>
                );
            })
        }
    </ul>
);
/**
 * type:
 * 1: 专业版；
 * 2: 基础版；
 * 3：灵活方案
 */
class Plan extends React.Component {
    state = {
        buyNum: null,
        showBuy: false,
        activedItem: 1,
    }

    static defaultProps = {
        type: BASIC_STORE_CODE,
    }
    // 展示购买年期
    showBuyList = () => {
        this.setState({
            showBuy: true,
            buyNum: 1,
            activedItem: 1,
        });
    }
    // 收起购买年期
    hiddenBuyList = () => {
        this.setState({
            showBuy: false,
            buyNum: null,
        });
    }
    // 选择购买年期
    selectBuyNum = (num) => {
        this.setState({
            buyNum: num,
            activedItem: num,
        });
    }
    // 咨询订购提示
    showBuyTip = (name) => {
        openDialog({
            dialogId: id,
            title: `有赞美业${name}咨询订购`,
            children: <div>咨询热线：0571-85225188</div>,
            footer: <Button onClick={() => closeDialog(id)}>确定</Button>,
            onClose() {
                console.log('outer dialog closed');
            },
        });
    }

    componentDidMount() {
        console.log(smallHeadMap);
    }

    render() {
        const {
            name, icon, priceArray, className, buy, type, money,
        } = this.props;
        const {
            buyNum, showBuy, activedItem,
        } = this.state;
        return (
            <div className={className ? `${className} plan-container` : 'plan-container'}>
                <div className={`plan-top bg-${type}`}>
                    <div className="plan-head">
                        {name}
                        <p className="small-head">{ smallHeadMap[type] }</p>
                    </div>
                    {
                        type == CUSTOM_STORE_CODE ?
                            <div className="title">按需报价</div> :
                            !showBuy && <div className="buy">¥ {money}/<span style={{ fontSize: 14 }}>年</span></div>
                    }
                    {
                        showBuy && <BuyList priceArray={priceArray} selectBuyNum={this.selectBuyNum} activedItem={activedItem} />
                    }
                    {
                        type == BASIC_STORE_CODE ?
                            <div>
                                {
                                    showBuy ?
                                        <div>
                                            <Button
                                                type="primary"
                                                className="btn-buy"
                                                onClick={() => buy(buyNum)}
                                            >
                                                    立即订购
                                            </Button>
                                            <p className="close" onClick={this.hiddenBuyList}>
                                                收起
                                            </p>
                                        </div>
                                        :
                                        <Button
                                            type="primary"
                                            className="btn-buy"
                                            onClick={this.showBuyList}
                                        >
                                                选择选购
                                        </Button>
                                }
                            </div> :
                            <Button
                                type="primary"
                                className="btn-buy"
                                onClick={() => this.showBuyTip(name)}
                            >
                                    咨询订购
                            </Button>
                    }
                </div>
                <Introduction type={type} />
            </div>
        );
    }
}

export default Plan;
