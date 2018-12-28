import React from 'react';
import { Select } from 'antd';

const {Option} = Select;

export const SelectFilter = ({ type, defaultVal, lable, filterData, onSelectChange }) => {
    return (
        <div className="select-filter">
            <span>选择{lable}：</span>
            <Select
                onChange={e => onSelectChange(e, type)}
                className="select-filter"
                defaultValue={defaultVal || 0}
                placeholder={`全部${lable}`}
            >
                {
                    filterData.map(v => <Option key={v.filterVal} value={v.filterVal}>{v.filterTip}</Option>)
                }

            </Select>
        </div>
    )
}