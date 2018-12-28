import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import FilterSearch from './components/staff_filter';
import { ROLE_NAME } from 'common/conf/constant';
import { Table } from 'antd'

require('./index.scss');
const dataSource = [{
    key: '1',
    acount: '123444444',
    name: '胡彦斌',
    roleName: '管理员',
    tel: '123444444',
    time: '西湖区湖底公园1号'
  }, {
    key: '2',
    acount: '123444444',
    name: '胡彦斌',
    roleName: '管理员',
    tel: '123444444',
    time: '西湖区湖底公园1号'
  }];
  
  const columns = [{
    title: '系统账号',
    dataIndex: 'acount',
    key: 'acount',
  }, {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '职位',
    dataIndex: 'roleName',
    key: 'roleName',
  }, {
    title: '联系方式',
    dataIndex: 'tel',
    key: 'tel',
  }, {
    title: '添加时间',
    dataIndex: 'time',
    key: 'time',
  }, {
    key: 'action',
    title: '操作',
    render: (val) => {
        return <div className='action'>
            <Link to={`/staff/edit/${val.acount}`} className="outline-btn edit-a">编辑</Link>
            <Link to={`/staff/${val.acount}`} className="btn-style search-a">查看</Link>
        </div>
    }
  }];
  
  
const filterData = {
    filterData: ROLE_NAME.map(v => {return { filterId: v.roleId, filterTip: v.roleName }}),
    lable: '角色',
    searchTip: '输入用户名或手机号',
}
export default class Staff extends Component {
    onSearch = ({ keyWord, filterId }) => {
        console.log(keyWord, filterId)
    }
    render() {
        return [
            <FilterSearch key="FilterSearch" {...filterData} onSearch={this.onSearch}  />,
            <Table key="Table" rowKey="key" dataSource={dataSource} columns={columns} />,
        ]
    }
}
