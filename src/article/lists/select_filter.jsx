import React from 'react';
import { Select } from 'antd';

const {Option} = Select;

export const SelectFilter = ({ type, defaultVal, lable, filterData, onSelectChange }) => {
    const data = [{filterVal: 'all', filterTip: `全部${lable}`}].concat(filterData);
    return (
        <div className="select-filter">
            <span>选择{lable}：</span>
            <Select
                onChange={e => onSelectChange(e, type)}
                className="select-filter"
                defaultValue={defaultVal || 'all'}
                placeholder={`全部${lable}`}
            >
                {
                    data.map(v => <Option key={v.filterVal} value={v.filterVal}>{v.filterTip}</Option>)
                }

            </Select>
        </div>
    )
}