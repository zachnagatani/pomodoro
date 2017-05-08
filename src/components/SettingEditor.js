import React from 'react';
import { connect } from 'react-redux';
import {
	incrementWorkTime, decrementWorkTime,
	incrementRestTime, decrementRestTime
} from '../actions/actions';

// Component that allows for adjustments in break/work times
// onClick functions dispatch the proper decrement/increment actions based on
// the components props
let SettingEditor = (props) => {
	return (
		<div className="setting-editor text-center">
			<p className="lead">
				{props.text}
			</p>
			<button onClick={() => {
				props.text === 'Break Length' ? props.dispatch(decrementRestTime()) : props.dispatch(decrementWorkTime());
				props.adjustTimer('DECREMENT');
			}}>-</button>
			<span>{props.text === 'Break Length' ? props.restTime : props.workTime}</span>
			<button onClick={() => {
				props.text === 'Break Length' ? props.dispatch(incrementRestTime()) : props.dispatch(incrementWorkTime());
				props.adjustTimer('INCREMENT');
			}}>+</button>
		</div>
	);
};

// Make sure I have the state properties I need access to
const mapStateToProps = state => {
	return {
		workTime: state.times.workTime,
		restTime: state.times.restTime
	}
};

export default connect(mapStateToProps)(SettingEditor);