

import React from "react";
import { Alert as ReactstrapAlert} from 'reactstrap';
import './Alert.css';

// Custom component to show user info after submitting user profile change form
function Alert (props) {
    const { type, messages } = props;

	return (
		<ReactstrapAlert className={type} role="alert">
			{messages.map((msg) => (
				<p className="text" key={msg}>
					{msg}
				</p>
			))}
		</ReactstrapAlert>
	);
};


export default Alert;