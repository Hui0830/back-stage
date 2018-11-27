import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import { Breadcrumb, Icon } from 'antd';


export const XYMBreadcrumb = withRouter((props) => {
  const { location, breadcrumbNameMap } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {breadcrumbNameMap[url]}
        </Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [(
    <Breadcrumb.Item key="home">
      <Link to='/dashboard'><Icon type="home" />工作台</Link>
    </Breadcrumb.Item>
  )].concat(extraBreadcrumbItems);

  return (
      <Breadcrumb style={{lineHeight: '2em'}}>
        {breadcrumbItems}
      </Breadcrumb>
  );
});