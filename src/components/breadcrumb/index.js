import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import { Breadcrumb, Icon } from 'antd';


export const XYMBreadcrumb = withRouter((props) => {
  const { location, breadcrumbNameMap } = props;
  const paths = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = paths.map((path, index) => {
    const url = `/${paths.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        {
          (index !== 0) ?
          <span>{breadcrumbNameMap[url]}</span> :
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        }
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [(
    <Breadcrumb.Item key="home">
      <Link to='/dashboard'><Icon type="home" />工作台</Link>
    </Breadcrumb.Item>
  )].concat(extraBreadcrumbItems);

  return (
      <Breadcrumb style={{lineHeight: '2em',background: '#F8F8F8',paddingLeft: '24px'}}>
        {breadcrumbItems}
      </Breadcrumb>
  );
});