import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { getStaff } from 'Api/staff';
import FilterSearch from './components/staff_filter';
import { getParseDate } from 'common/utils';
import { ROLE_NAME } from 'common/conf/constant';
import checkAccess,{ checkRoleAuth } from 'common/access';
import { Table } from 'antd'

require('./index.scss');
  const columns = [{
    title: '系统账号(手机号)',
    dataIndex: 'account',
    className: 'staff-td'
  }, {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'+ '_id',
    className: 'staff-td'
  }, {
    title: '职位',
    dataIndex: 'roles',
    className: 'staff-td',
    render: (val) => val.roleName
  }, {
    title: '联系方式',
    dataIndex: 'email',
    className: 'staff-td'
  }, {
    title: '添加时间',
    dataIndex: 'time',
    className: 'staff-td',
    render: (time) => getParseDate(time).fullTime
  }, {
    key: '_id',
    title: '操作',
    className: 'staff-td',
    render: (val) => {
        return <div className='action'>
            {
              checkAccess('staff_edit') && checkRoleAuth(val.roles.roleId) &&
              <Link to={`/staff/edit/${val._id}`} className="outline-btn edit-a">编辑</Link>
            }
            {
              checkAccess('staff_info') &&
              <Link to={`/staff/user/${val._id}`} className="btn-style search-a">查看</Link>
            }
        </div>
    }
  }];
  
  
const filterData = {
    filterData: ROLE_NAME.map(v => {return { filterId: v.roleId, filterTip: v.roleName }}),
    lable: '角色',
    searchTip: '输入用户名或手机号',
}
export default class Staff extends PureComponent {
    state = {
      dataSource: [],
      lastStaffId: '',
      current: 1,
      pageSize: 4,
      total: 0,
      search: {},
    }
    onSearch = ({ keyWord, filterId }) => {
        if(keyWord || filterId != 0) {
          this.setState({
            search: {keyWord, filterId},
            dataSource: [],
          }, () => {
            this.getStaffList(1, this.state.search)
          })
        }
    }
    componentDidMount() {
      this.getStaffList();
    }

    getStaffList = (page = 1, search= null) => {
      const { dataSource, lastStaffId,pageSize } = this.state;
      getStaff({staffId: lastStaffId, page, pageSize, search}).then(res => {
        const { data, pageConfig } = res.data; 
        const { total, current, pageSize } = pageConfig;
        this.setState({
          dataSource: dataSource.concat(data),
          lastStaffId: data[data.length - 1]._id,
          total,
          current,
          pageSize,
        })
      })
    }

    onPageChange = (page, pageSize) => {
      const { dataSource, total } = this.state;
      const len = dataSource.length;
      if(total <= len) {
        this.setState({
          current: page
        })
        return;
      }
      this.setState({
        current: page,
      }, () => {
        this.getStaffList(page)
      })
    }

    render() {
        const { dataSource,current,total,pageSize } = this.state;
        return [
            <FilterSearch key="FilterSearch" {...filterData} onSearch={this.onSearch}  />,
            <Table
              key="Table"
              rowKey="key"
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
            />,
        ]
    }
}
