import React from 'react';

// Component that allows for adjustments in break/work times
const SettingEditor = props => {
	return (
		<div className="setting-editor text-center">
			<p className="lead">
				{props.text}
			</p>
			<button>-</button>
			<span>{props.length}</span>
			<button>+</button>
		</div>
	);
};

export default SettingEditor;