import React, {Component} from 'react'
import Test from 'components/test'
import Plan from 'components/plan'

let onePrice = 5000;
let fivePrice = 175000;
const priceArray = [
    {
        num: 1,
        price: onePrice,
    },
    {
        num: 5,
        price: fivePrice,
    },
];
export default class Staff extends Component {
    render() {
        return [
            <Test />,
            <div className="plans">
                <Plan
                    name="基础版"
                    icon="discount"
                    priceArray={priceArray}
                    money={onePrice}
                    buy={this.buy}
                    type="1"
                />
                <Plan name="专业版" money={fivePrice} icon="multi-store" className="advanced sep" type="2" />
                <Plan name="灵活方案" money="0" icon="multi-store" type="3" />
            </div>
        ]
    }
}
