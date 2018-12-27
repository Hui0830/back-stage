import React,{ Component } from 'react';

import { style } from './index.scss';

class XymCarousel extends Component {
    constructor() {
        super(...arguments);
        this.timeId = ''
    }
    state = {
        tab: 0,
    }

    componentDidMount() {
        this.timeId = setInterval(this.autoTab, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.timeId);
    }

    autoTab = () => {
        console.log(this.state.tab,React.Children.count(this.props.children));
        let tabs = this.state.tab;
        this.setState({
            tab: tabs == React.Children.count(this.props.children)-1 ? 0 : ++tabs
        })
    }
    onTab = (tab) => {
        this.setState({
            tab: tab
        })
    }
    renderTab = () => {
        let tabs = [];
        
        for(let i = 0; i<React.Children.count(this.props.children); i++) {
            tabs.push(<i key={`carousel-icon-${i}`} onClick={() => this.onTab(i)} className={this.state.tab == i ? "activeTab tab" : "tab"}></i>)
        }
        return tabs;
    }

    render() {
        const { children } = this.props;
        const { tab } = this.state;
        const childCount = React.Children.count(children)
        return (
            <div className={style}>
                <div className="carousel-warp" style={{width: `${childCount*100}%`, transform: `translateX(-${100/childCount*tab}%)`}}>
                {
                     React.Children.map(children, (child, index) => {
                         return (
                             <div className="carousel-item" key={`carousel-${index}`}>
                                 {child}
                             </div>
                         )
                     })
                 }
                </div>
                 <div className="carousel-icon">
                    {this.renderTab()}
                 </div>
            </div>
        )
    }
}
export default XymCarousel;