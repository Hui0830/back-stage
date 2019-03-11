import { Skeleton } from 'antd';
import React from 'react';

const Loading = ({ pastDelay, timedOut, error }) => {
    if (pastDelay) {
      return <Skeleton  paragraph={{ rows: 4 }} />
    } else if (timedOut) {
      return <div style={{height: 300}} >Taking a long time...</div>
    } else if (error) {
      return <div>Error!</div>;
    }
    return null;
  };
export default Loading