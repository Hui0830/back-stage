import React from 'react';
import { withRouter } from 'react-router-dom';


function returnToHome(history) {
	history.replace("/dashboard");
}


const NotFound = ({location,history}) => (
	<div>
		<h1>NotFound page</h1>
		<p>{location.pathname}</p>
		<button onClick = {() => returnToHome(history)} >返回首页</button>
	</div>
)
export default withRouter(NotFound)