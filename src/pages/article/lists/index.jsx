import React,{ PureComponent } from 'react';
import { List, Divider, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { getParseDate } from 'utils';
import { ARTICLE_TAG_MAP } from 'common/conf/constant';
import { getArticleList } from 'Api/article';


import {SelectFilter} from './select_filter';
import {style} from './index.scss';

const TimeText = ({ time }) => {
    const { year, month, day } = getParseDate(time);
    return (
        <span className="time">
            <span>{`${month}/${day}`}</span>
            <span>{year}</span>
        </span>
    )
};
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
);
const filterData = [
    {
        filterData: [
            { filterVal: 2016, filterTip: '2016年 '},
            { filterVal: 2017, filterTip: '2017年 '},
            { filterVal: 2018, filterTip: '2018年 '},
            { filterVal: 2019, filterTip: '2019年 '},
        ],
        lable: '年份',
        type: 'time',
    },
    {
        filterData: Object.keys(ARTICLE_TAG_MAP).map(key => ({filterVal: key, filterTip: ARTICLE_TAG_MAP[key]})),
        lable: '类别',
        type: 'tag',
    },
]
class ActicleList extends PureComponent {
    state = {
        timeSelect: 'all',
        tagSelect: 'all',
        listData: [],
        current: 1,
        pageSize: 4,
        total: 0,
    }
    componentDidMount() {
        this.getArticleList();
    }

    getArticleList = (page = 1) => {
        const { pageSize, timeSelect, tagSelect,listData } = this.state;
        const search = {
            time: timeSelect,
            tag: tagSelect,
        }
        getArticleList({page, pageSize, search}).then(res => {
            let dataSource;
            const { data, pageConfig } = res;
            const { total, pageSize, current } = pageConfig;
            if(listData.length == total) {
                dataSource = listData.slice();
                dataSource.splice((current-1)*pageSize, pageSize, ...data);
            } else {
                dataSource = new Array(total);
                dataSource.splice((current-1)*pageSize, pageSize, ...data);
            }
            this.setState({
                listData: dataSource,
                total,
                pageSize,
                current,
            })
        })
    }

    onSelectChange = (val, type) => {
        switch (type) {
            case 'time': 
                this.setState({
                    timeSelect: val,
                    listData: []
                }, () => {
                    this.getArticleList()
                });
                break;
            case 'tag':
                this.setState({
                    tagSelect: val,
                    listData: []
                }, () => {
                    this.getArticleList()
                })
                break;
            default: return;
        }
    }

    onPageChange = (page, pageSize) => {
        const { listData } = this.state;
        if(listData[(page-1) * pageSize]) {
          this.setState({
            current: page
          })
          return;
        }
        this.getArticleList(page)
      }

    render() {
        const { listData, current, pageSize, total } = this.state;
        return(
            <div className={style}>
                <div className="filter-container">
                {
                    filterData.map(item => <SelectFilter key={item.type} {...item} onSelectChange={this.onSelectChange} />)   
                }
                </div>
                <Divider />
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={
                        {
                            current,
                            total,
                            pageSize,
                            onChange: this.onPageChange,
                            hideOnSinglePage: true,
                            showTotal: (total, range) => {console.log(total, range)}
                          }
                    }
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText type="user" text={item.author.userId} />,
                                <IconText type="tag" text={item.tag.name} />,
                                <IconText type="message" text={item.reviewNum} />
                            ]}
                        >
                            <List.Item.Meta
                            avatar={<TimeText time={item.time} />}
                            title={<Link to={`/article/detail/${item._id}`}>{item.title}</Link>}
                            description={item.describe}
                            />
                        </List.Item>
                    )}
                />  
            </div>
        )
    }
}

export default ActicleList