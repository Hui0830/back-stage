import React, { Component } from 'react';
import Empty from 'components/empty';

class Recruit extends Component {
    state = {

    }

    render() {
        return (
               <Empty isEmpty={true} text="功能快马加鞭的开发中，亲可以先使用其他功能哦！" />
        )
    }
}

export default Recruit;