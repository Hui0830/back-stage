import React,{ PureComponent } from 'react';
import PropTypes from 'prop-types';

import { style } from './index.scss';

class XymCarousel extends PureComponent {
    static propTypes = {
        position: PropTypes.string
    }
    static defaultProps = {
        position: 'bottom-left',
        time: 5000,
    }
    constructor() {
        super(...arguments);
        this.timeId = ''
    }
    state = {
        tab: 0,
        childCount: React.Children.count(this.props.children)
    }

    componentDidMount() {
        this.timeId = setInterval(this.autoTab, this.props.time)
    }

    componentDidUpdate() {
        if(this.state.tab >= React.Children.count(this.props.children) || React.Children.count(this.props.children) == 1){
            this.setState({
                tab: 0
            })
        }
        this.setState({
            childCount: React.Children.count(this.props.children)
        })
        if(React.Children.count(this.props.children) == 1) {
            clearInterval(this.timeId);
            this.timeId = '';
        }
    }

    componentWillUnmount() {
        clearInterval(this.timeId);
    }

    autoTab = () => {
        const  {tab, childCount} = this.state;
        this.setState({
            tab: (tab == childCount-1) ? 0 : (tab+1)
        })
    }
    onTab = (tab) => {
        this.setState({
            tab: tab
        })
    }
    renderTab = () => {
        let tabs = [];
        
        for(let i = 0; i<this.state.childCount; i++) {
            tabs.push(<i key={`carousel-icon-${i}`} onClick={() => this.onTab(i)} className={this.state.tab == i ? "activeTab tab" : "tab"}></i>)
        }
        return tabs;
    }

    render() {
        const { children, position } = this.props;
        const { tab,childCount } = this.state;
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
                 <div className={`carousel-icon ${position}`}>
                    {this.renderTab()}
                 </div>
            </div>
        )
    }
}
export default XymCarousel;