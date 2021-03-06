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
			running: false,
			intervalID: null
		};

		this.beginCountdown = this.beginCountdown.bind(this);
		this.adjustTimer = this.adjustTimer.bind(this);
		this.pauseCountdown = this.pauseCountdown.bind(this);
		this.resetCountdown = this.resetCountdown.bind(this);
	}

	/**
	* Begins the timer countdown.
	*/
	beginCountdown() {
		// Store the intervalID in our state so we can access it in other functions to clear it
		this.setState({
			running: true,
			intervalID: setInterval(callback.bind(this), 1000)
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
						timer: this.props.workTime,
						running: false
					});
				} else {
					this.setState({
						mins: this.props.restTime,
						timer: this.props.restTime,
						running: false
					});
				}

				new Audio('http://www.sjap.nl/Fire-alarm.mp3').play();
			}
		}
	}

	/**
	 * Pauses the countdown by clearing the interval
	*/
	pauseCountdown() {
		clearInterval(this.state.intervalID);
	}

	/**
	 * Stops the countdown and resets the timer
	 */
	resetCountdown(e) {
		// Prevent the default anchor behavior
		e.preventDefault();

		// Stop the countdown
		this.pauseCountdown();

		// Reset according to the timer status
		switch(this.props.status) {
			case 'Work':
				this.setState({
					mins: this.props.workTime,
					secs: 0,
					timer: this.props.workTime,
					running: false
				});
				break;
			case 'Rest':
				this.setState({
					mins: this.props.restTime,
					secs: 0,
					timer: this.props.restTime,
					running: false
				});
				break;
		}
	}

	/**
	 * Adjusts the view of the timer
	 * @param {String} status - the status to edit according to
	 * @param {String} action - String denoting which action to take
	 */
	adjustTimer(status, action) {
		if (status === this.props.status && !this.state.running) {
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
				<Tomato beginCountdown={this.beginCountdown} status={this.props.status} state={this.state} pauseCountdown={this.pauseCountdown} />
				<ResetLink resetCountdown={this.resetCountdown} />
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
