import React,{PureComponent} from 'react';
import { Modal,List } from 'antd';

import { getImgClasses, getImgList} from 'Api/stuff';
import {imageFix} from 'common/conf/constant';

import { style } from './index.scss';
import TreeSelect from 'components/tree_select';

const StaffItem = ({onSelectStaff, url, alt,name,isImage}) => {
    return (
        <div className="img" onClick={() => onSelectStaff(url)}>
            {
                isImage ? <img src={`${imageFix}${url}`} title={alt} alt={name} /> :
                    <video controls src={url} title={name} />
            }
        </div>
    )
}

export default class SelectStaff extends PureComponent {

    state = {
        tag: 'all',
        data: [],
        staffList: [],
        current: 1,
        total: 0,
        pageSize: 5,
        staffCache: {},
        lastStaffId: '',
    }

    componentDidMount() {
        if(this.props.isImage) {
            getImgClasses().then(res => {
                this.setState({
                    data: res.data,
                    visible: false
                })
            });
            this.getImgList()
        } else {
            this.getVideoList()
        }
        
    }

    // 获取图片列表
    getImgList = (tag = 'all',lastStaffId = '') => {
        const { staffCache,current,pageSize } = this.state;
        getImgList({tag,_id: lastStaffId,pageSize}).then(res => {
            const { images, total } = res.data;
            this.setState({
                tag,
                total,
                staffList: images,
                pageSize,
                lastStaffId: images.length> 0 ? images[images.length-1]._id : '',
                staffCache: {...staffCache, [current]: images}
            })
        })
    }
    // 获取视频
    getVideoList = (lastStaffId = '') => {
        const { staffCache,current,pageSize } = this.state;
        const videos = [
            {
                url: 'http://vali.cp31.ott.cibntv.net/69752A007BE4671C416B03974/03000A01005C2235206B44B15AC5F5A069C6E2-D7D7-419F-A52E-43ECD5B95526.mp4?ccode=0519&duration=39&expire=18000&psid=b8e03d99800f1062e74b6aa7a1b5c6ac&ups_client_netip=78e56544&ups_ts=1545812893&ups_userid=&utid=3p9tFPZVxg8CAXjlS7sd0C9I&vid=XMzk4MTYwMjI4NA&vkey=Ac4c3601367c1d2470130cbb7cf1eb3dd&s=552130be77744edea24c&sp=',
                name: '视频1',
                _id:'1'
            },
            {
                url: 'http://vali.cp31.ott.cibntv.net/youku/6773baf6b5b4371b06ef7468a/03000801005C1798F6487B61552FA5681FFC02-A6C3-4A70-9E55-99D027ABE111.mp4?sid=054581598700010001171_00_A6980397ce213e52e0f616f1cfde2ff03&sign=29255ec5b7688fa9532ff0303570db23&ctype=50',
                name: '视频2',
                _id: '2'
            },
            {
                url: 'http://ykugc.cp31.ott.cibntv.net/677449884704E71F8817D2C94/03000A01005BD926562BEA84F483ABECEFE7F0-CAF0-4E1D-B1A7-100C7F26F416.mp4?ccode=0519&duration=78&expire=18000&psid=ca23bf07056a0e8cbd8a2150ee60716b&ups_client_netip=78e56544&ups_ts=1545816318&ups_userid=&utid=3p9tFPZVxg8CAXjlS7sd0C9I&vid=XMzg5NjMyNDU2OA&vkey=Acc81417929208066b811b052be6be1e3&sp=',
                name: '视频3',
                _id:'3'
            }
        ]
        this.setState({
            total: videos.length,
            staffList: videos,
            pageSize,
            lastStaffId: videos.length> 0 ? videos[videos.length-1]._id : '',
            staffCache: {...staffCache, [current]: videos}
        })
    }
    onStaffClick = (url) => {
        this.props.onSelectStaff(url);
        this.props.destroyModal();
    }
    // 更换类别
    onClassChange = (val) => {
        this.getImgList(val)
    }
    // 翻页
    onPageChange = (page, pageSize) => {
        const { staffCache, tag,lastStaffId } = this.state;
        if(staffCache[page]){
            this.setState({
                staffList: staffCache[page],
                current: page
            })
            return
        }
        this.setState({
            current: page
        },() => {
            this.props.isImage ? this.getImgList(tag,lastStaffId) : this.getVideoList(lastStaffId)
        })
    }

    render() {
        const { staffList,tag,data,total,pageSize,current } = this.state;
        console.log(staffList);
        return (
            <div className={style}>
                {this.props.isImage && <TreeSelect label="图片类别" onChange={this.onClassChange} defaultValue={tag} data={data} />}
                <div className="img-container">
                    <List
                        dataSource={staffList}
                        grid={{ gutter: 16, column: 4 }}
                        pagination={
                            {
                                total,
                                pageSize,
                                current,
                                hideOnSinglePage: true,
                                onChange: this.onPageChange
                            }
                        }
                        renderItem = {item => {
                            return (
                                <List.Item>
                                    <StaffItem isImage={this.props.isImage} onSelectStaff={this.onStaffClick} {...item}  />
                                </List.Item>
                            )
                        }}
                    />
                </div>
            </div>
        )
    }
}

export const selectStaff = (onStaffClick, isImage = true) => {
    const destroyModal = (modal) => {
        modal.destroy();
    }
    const modal = Modal.info({
        content: <SelectStaff isImage={isImage} onSelectStaff={onStaffClick}  destroyModal={() => destroyModal(modal)} />,
        width: 800,
        title: isImage ? '选择图片' : '选择视频',
        iconType: 'select',
        okText: '返回',
        maskClosable: true,
        destroyOnClose: true
    })
}