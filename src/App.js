import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleStatus } from './actions/actions';
import './App.css';
import SettingEditor from './components/SettingEditor';
import ResetLink from './components/ResetLink';
import Tomato from './components/Tomato';

// Container to group the components together
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mins: props.workTime,
			secs: 0,
			timer: props.workTime,
			intervalID: null
		};

		this.beginCountdown = this.beginCountdown.bind(this);
		this.adjustTimer = this.adjustTimer.bind(this);
		this.interval = this.interval.bind(this);
	}

	interval() {

	}

	/**
	* Begins the timer countdown.
	*/
	beginCountdown() {
		this.setState({
			intervalID: setInterval(callback.bind(this), 100)
		});
		function callback() {
			// Handle formatting of timer
			// If we have more than 0 seconds...
			if (this.state.secs > 0) {
				// and less than 10 seconds, add the zero to the timer
				if (this.state.secs < 10) {
					this.setState({
						secs: this.state.secs - 1,
						timer: this.state.mins + ':0' + this.state.secs
					});
				// Otherwise just let the timer display the double-digit seconds
				} else {
						this.setState({
							secs: this.state.secs - 1,
							timer: this.state.mins + ':' + this.state.secs
						});
				}
				// If there are noe seconds, update the minutes accordingly
			} else if (this.state.secs === 0) {
					this.setState({
						mins: this.state.mins - 1,
						secs: 59,
						timer: this.state.mins + ':00'
					});
			}

			// When the timer runs out, stop our interval function,
			// change the status from work to rest/rest to work,
			// and set the minutes and timer appropriately
			if (this.state.mins === 0 && this.state.secs === 0) {
				clearInterval(this.state.intervalID);
				this.props.dispatch(toggleStatus());

				if (this.props.status === 'Work') {
					this.setState({
						mins: this.props.workTime,
						timer: this.props.workTime
					});
				} else {
					this.setState({
						mins: this.props.restTime,
						timer: this.props.restTime
					});
				}

				new Audio('http://www.sjap.nl/Fire-alarm.mp3').play();
			}
		}

		// Store the interval in an id so we can clear it later
		// var id = setInterval(() => {
		// 	// Handle formatting of timer
		// 	// If we have more than 0 seconds...
		// 	if (this.state.secs > 0) {
		// 		// and less than 10 seconds, add the zero to the timer
		// 		if (this.state.secs < 10) {
		// 			this.setState({
		// 				secs: this.state.secs - 1,
		// 				timer: this.state.mins + ':0' + this.state.secs
		// 			});
		// 		// Otherwise just let the timer display the double-digit seconds
		// 		} else {
		// 				this.setState({
		// 					secs: this.state.secs - 1,
		// 					timer: this.state.mins + ':' + this.state.secs
		// 				});
		// 		}
		// 	// If there are noe seconds, update the minutes accordingly
		// } else if (this.state.secs === 0) {
		// 		this.setState({
		// 			mins: this.state.mins - 1,
		// 			secs: 59,
		// 			timer: this.state.mins + ':00'
		// 		});
		// }

		// // When the timer runs out, stop our interval function,
		// // change the status from work to rest/rest to work,
		// // and set the minutes and timer appropriately
		// if (this.state.mins === 0 && this.state.secs === 0) {
		// 	clearInterval(id);
		// 	this.props.dispatch(toggleStatus());

		// 	if (this.props.status === 'Work') {
		// 		this.setState({
		// 			mins: this.props.workTime,
		// 			timer: this.props.workTime
		// 		});
		// 	} else {
		// 		this.setState({
		// 			mins: this.props.restTime,
		// 			timer: this.props.restTime
		// 		});
		// 	}

		// 	new Audio('http://www.sjap.nl/Fire-alarm.mp3').play();
		// }
		// }, 100);
	}

	/**
	 * Adjusts the view of the timer
	 * @param {String} status - the status to edit according to
	 * @param {String} action - String denoting which action to take
	 */
	adjustTimer(status, action) {
		if (status === this.props.status) {
			switch(action) {
				case 'INCREMENT':
					this.setState({
						mins: this.state.mins + 1,
						timer: this.state.timer + 1
					});
					break;
				case 'DECREMENT':
					this.setState({
						mins: this.state.mins - 1,
						timer: this.state.timer - 1
					});
					break;
			}
		}
	}

	render() {
		return (
			<div className="app text-center">
				<div className="settings-container">
					<SettingEditor text="Break Length" length="5" adjustTimer={this.adjustTimer} />
					<SettingEditor text="Session Length" length={this.state.mins} adjustTimer={this.adjustTimer} />
				</div>
				<Tomato beginCountdown={this.beginCountdown} status={this.props.status} state={this.state} />
				<ResetLink />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		status: state.status,
		workTime: state.workTime,
		restTime: state.restTime
	};
};

export default connect(mapStateToProps)(App);
