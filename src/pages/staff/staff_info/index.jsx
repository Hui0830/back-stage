import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Spin, Divider, Button ,message, Popconfirm} from 'antd';

import { getStaffInfo, deleteStaff } from 'Api/staff'
import checkAccess,{ checkRoleAuth } from 'common/access';

import { getParseDate } from 'utils'
import TipTitle from 'components/tip_title';
import { style } from './index.scss';

const RowInfo = ({l, r, isIcon}) => {
    return (
        <p className="row">
            <span className="col-l" >{l}：</span>
            <span className="col-r" >{r}</span>
        </p>
    );
}
const TIP_TEXT = '删除后该员工数据将彻底清除，是否确认删除？';
const KEY_MAP = {
    name: '姓名',
    phone: '联系方式',
    email: '邮箱地址',
    role: '职位',
    time: '添加时间',
    describe: '描述',
}
class StaffInfo extends Component {
    state = {
        userId: '',
        staff: {
            name: 'liwenhui',
            phone: '158277895909',
            email: '1285227393@qq.com',
            describe: 'fafdaffa',
            role: '高级管理员',
            time: getParseDate().fullTime,
        },
        loading: false,
    }
    
    componentDidMount() {
        const { params } = this.props.match;
        this.setState({loading: true})
        getStaffInfo(params.id).then(item => {
            this.setState({
                loading: false,
                userId: item._id,
                roleId: item.roles.roleId,
                staff: {
                    name: item.name,
                    phone: item.account,
                    email: item.email,
                    describe: item.describe,
                    role: item.roles.roleName,
                    time: getParseDate(item.time).fullTime
                }
            })
        })
    }

    deleteStaff = () => {
        deleteStaff(this.state.userId).then(res => {
            message.success('员工删除成功');
            this.props.history.replace('/staff/list');
        })
    }

    render() {
        const { loading, staff, roleId } = this.state;
        return (
            <Spin spinning={loading} tip='数据加载中.......'>
                <TipTitle title='基本信息' />
                <div className={style}>
                    {
                        Object.keys(staff).map(key => {
                            return (
                                <RowInfo key={key} l={KEY_MAP[key]} r={staff[key] || '-'} />
                            )
                        })
                    }
                    <Divider />
                    {
                        checkAccess('staff_delete') && checkRoleAuth(roleId) &&
                        <Popconfirm placement="top" title={TIP_TEXT} onConfirm={this.deleteStaff} okText="删除" cancelText="取消">
                            <Button type="primary">删除员工</Button>
                        </Popconfirm>
                    }
                </div>
            </Spin>
        )
    }
}

export default withRouter(StaffInfo);