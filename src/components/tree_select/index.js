import React from 'react';
import { TreeSelect } from 'antd';

const Tree_select = ({label='图片分类', onChange, data, defaultValue}) => {
    let dataMap = data.map(item => {
        return {
            title: item.name,
            value: item._id,
            key: item._id,
            children: item.leaf.map(v => {
                return {
                    title: v.name,
                    value: v._id,
                    key: v._id,
                }
            })
        }
    });
    dataMap.unshift({
        title: `所有${label}`,
        key: 'all',
        value: 'all'
    })
    return (
        <div className="row">
            <span className="col-l">{label}</span>
            <TreeSelect
                style={{ width: 300 }}
                defaultValue={defaultValue || 'all'}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={dataMap}
                placeholder={`选择${label}`}
                onChange={(val) => onChange(val)}
                className="col-r"
            />
        </div>
    )
}

export default Tree_select