import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Spin,Table,Tabs,Icon } from 'antd'

import { getProductClass, addProductClass, putProductClass, deleteProductClass,getProductList } from 'Api/product';
import checkAccess from 'common/access';
import { getParseDate } from 'common/utils';

import TreeClass from 'components/tree_class'
import { style } from './index.scss'

// 测试
import { imageFix } from 'common/conf/constant'

const columns = [{
    title: '宝贝图片',
    dataIndex: 'images',
    className: 'staff-td',
    render: (val) => {
        return <div className='product-img'>
            <img src={imageFix+val[0]}></img>
        </div>
    }
  }, {
    title: '宝贝标题',
    dataIndex: 'title',
    key: 'title',
    className: 'staff-td'
  }, {
    title: '购买地址',
    dataIndex: 'buyUrl',
    className: 'staff-td',
    render: (val) => <a src={val}>{val}</a>
  }, {
    title: '添加时间',
    dataIndex: 'time',
    className: 'staff-td',
    render: (time) => getParseDate(time).fullTime
  }, {
    key: '_id',
    title: '操作',
    dataIndex: '_id',
    className: 'staff-td',
    render: (_id) => {
        return <div className='action'>
            {
              checkAccess('product_edit') &&
              <Link to={`/product/edit/${_id}`} className="outline-btn edit-a">编辑</Link>
            }
            <Link to={`/product/info/${_id}`} className="btn-style search-a">查看</Link>
        </div>
    }
  }];

class ProductStock extends PureComponent {
    state = {
        visible: true,
        classData: null,
        dataSource: [],
        status: 0,
        pageSize: 10,
        total: 0,
        current: 1,
    }


    componentDidMount() {
        Promise.all([
            this.getProductClass(),
            this.getProductList()
        ])
        
    }
    //获取产品
    getProductList = (page = 1, typeClass= 'all') => {
        const { dataSource,pageSize,status} = this.state;
        
        getProductList({page, pageSize, typeClass,status}).then(res => {
          const { data, pageConfig } = res.data; 
          const { total, current, pageSize } = pageConfig;
          let dataArr;
          if(dataSource.length != total) {
            dataArr = new Array(total);
            dataArr.splice((current - 1)*pageSize, pageSize, ...data)
          } else {
            dataArr = dataSource.slice();
            dataArr.splice((current - 1)*pageSize, pageSize, ...data);
          }
          this.setState({
            dataSource: dataArr,
            total,
            current,
            pageSize,
          })
        })
    }
    onChangeStatus = (activeKey) => {
        this.setState({
            status: +activeKey
        },this.getProductList)
    }
    onPageChange = (page, pageSize) => {
        const { dataSource } = this.state;
        if(dataSource[(page-1)*pageSize]) {
          this.setState({
            current: page
          })
          return;
        }
          this.getProductList(page)
      }

    // 获取图片分类
    getProductClass = () => {
        getProductClass().then(res => {
            this.setState({
                classData: res.data,
                visible: false
            })
        })
    }
    render() {
        const { classData,visible,dataSource,current,total,pageSize} = this.state;
        return (
            <div className={style}>
                <Tabs defaultActiveKey="0" onChange={this.onChangeStatus}>
                    <Tabs.TabPane tab={<span><Icon type="inbox" />仓库宝贝</span>} key="0" />
                    <Tabs.TabPane tab={<span><Icon type="shop" />在架宝贝</span>} key="1" />
                </Tabs>
                <div className="container">
                    <Spin spinning={visible}>
                        <aside>
                            {
                                classData &&<TreeClass
                                    name="宝贝" 
                                    data={classData}
                                    addClass={addProductClass}
                                    putClass={putProductClass}
                                    deleteClass={deleteProductClass}
                                    getList={(typeClass) => this.getProductList(1,typeClass)}
                                />
                            }
                        </aside>
                    </Spin>
                    <div className="content">
                    <Table
                        rowKey='_id'
                        dataSource={dataSource}
                        columns={columns}
                        pagination={
                            {
                            current,
                            total,
                            pageSize,
                            onChange: this.onPageChange,
                            hideOnSinglePage: true,
                            }
                        }
                        />
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ProductStock