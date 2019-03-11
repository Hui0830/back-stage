import React, { PureComponent } from 'react';
import { Button, Select, Input, Icon } from 'antd';
import styles from './index.scss';

const { Option } = Select;

class FilterSearch extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            keyWord: '',
            filterId: 'all',
        };
    }
    onSelectChange = (val) => {
        this.setState({
            filterId: val,
        });
    }
    onKeywordChange = (e) => {
        this.setState({
            keyWord: e.target.value,
        })
    }
    onSearch = () => {
        const { keyWord, filterId } = this.state;
        this.props.onSearch({ keyWord, roleId: filterId });
    }
    render() {
        const {
            lable,
            filterData,
            searchTip,
        } = this.props;
        const { keyWord, filterId } = this.state;
        return (
            <nav className={styles.style}>
                <div className="select-filter">
                    <span>选择{lable}：</span>
                    <Select
                        onChange={e => this.onSelectChange(e)}
                        className="select-container"
                        defaultValue='all'
                        value={filterId}
                        placeholder={`全部${lable}`}
                        style={{ flex: 1 }}
                    >
                        {
                            [{ filterId: 'all', filterTip: '全部角色' }].concat(filterData).map(v => <Option key={v.filterId} value={v.filterId}>{v.filterTip}</Option>)
                        }

                    </Select>
                </div>
                <div className="search-container">
                    <Input
                        placeholder={searchTip}
                        className="search-input"
                        prefix={<Icon type="search" className="prefix-icon" />}
                        value={keyWord}
                        onChange={this.onKeywordChange}
                        onPressEnter={() => this.onSearch()}
                    />
                    <Button
                        type="primary"
                        ghost
                        onClick={() => this.onSearch()}
                    >搜索
                    </Button>
                </div>
            </nav>
        );
    }
}
export default FilterSearch;
