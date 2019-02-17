import { Affix } from 'antd';
import React from 'react';

import { addImgClasses,putImgClasses, deleteImgClass } from 'Api/stuff'

import { style } from './index.scss';
import TreeClass from '../../../components/tree_class';

const StuffAside = ({data, getImgList}) => {
    return (
        <div className={style}>
            <Affix offsetTop={10}>
                <TreeClass
                    getList={getImgList}
                    data={data}
                    addClass={addImgClasses}
                    putClass={putImgClasses}
                    deleteClass={deleteImgClass}
                    title= {<p className="class-title">图片类目管理</p>}
                />
            </Affix>          
        </div>
    )
}
export default StuffAside