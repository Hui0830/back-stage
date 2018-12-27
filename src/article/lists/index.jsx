import React,{ Component } from 'react';
import { List, Divider, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { getParseDate } from 'utils';
import { getArticleList } from 'Api/article';
import {SelectFilter} from './select_filter';

import {style} from './index.scss';

const listData = [];
for (let i = 1; i < 23; i++) {
    listData.push({
        id: i,
        type: (i%2 == 0) ? 0 : 1,
        title: `2018 年会放假通知${i}`,
        time: '2018-12-' + i,
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const TimeText = ({ time }) => {
    console.log(time);
    const { year, month, day } = getParseDate(time);
    return (
        <span className="time">
            <span>{`${month}/${day}`}</span>
            <span>{year}</span>
        </span>
    )
};
const filterData = [
    {
        filterData: [
            { filterVal: 0, filterTip: '全部年份 '},
            { filterVal: 2016, filterTip: '2016年 '},
            { filterVal: 2017, filterTip: '2017年 '},
            { filterVal: 2018, filterTip: '2018年 '},
        ],
        lable: '年份',
        type: 'time',
    },
    {
        filterData: [
            { filterVal: 0, filterTip: '所有发布人'},
            { filterVal: '李文辉', filterTip: '李文辉'},
            { filterVal: '发发呆', filterTip: '发发呆'},
            { filterVal: '放假啊喝咖啡', filterTip: '放假啊喝咖啡'},
        ],
        lable: '发布人',
        type: 'name',
    },
]
class ActicleList extends Component {
    state = {
        timeSelect: 0,
        personSelect: '李文辉',
        listData: []
    }
    componentDidMount() {
        this.getArticleList();
    }

    getArticleList = () => {
        getArticleList().then(res => {
            console.log(res);
            this.setState({
                listData: res,
            })
        })
    }

    onSelectChange = (val, type) => {
        switch (type) {
            case 'time': 
                this.setState({
                    timeSelect: val,
                });
                break;
            case 'name':
                this.setState({
                    personSelect: val,
                })
                break;
            default: return;
        }
        console.log(this.state.timeSelect, this.state.personSelect);
    }

    render() {
        const pagination = {
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 6,
        }
        // const { listData } = this.state;
        return(
            <div className={style}>
                <div className="filter-container">
                {
                    filterData.map(item => <SelectFilter key={item.type} {...item} onSelectChange={this.onSelectChange} />)   
                }
                </div>
                <Divider orientation="left">已发布文章</Divider>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={pagination}
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[<span>发布人：李文辉</span>]}
                            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                        >
                            <List.Item.Meta
                            avatar={<TimeText time={item.time} />}
                            title={<Link to={`/article/${item.id}`}>{item.title}</Link>}
                            description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />  
            </div>
        )
    }
}

export default ActicleList