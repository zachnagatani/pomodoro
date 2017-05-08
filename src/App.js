import React, { Component } from 'react';
import { connect } from 'react-redux';
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
			status: 'Work'
		};

		this.beginCountdown = this.beginCountdown.bind(this);
		this.adjustTimer = this.adjustTimer.bind(this);
	}

	/**
	* Begins the timer countdown.
	*/
	beginCountdown() {
		// Store the interval in an id so we can clear it later
		var id = setInterval(() => {
			// Correctly format the timer display based on a few cases
			if (this.state.secs > 0) {
				if (this.state.secs < 10) {
					this.setState({
						secs: this.state.secs - 1,
						timer: this.state.mins + ':0' + this.state.secs
					});
				} else {
						this.setState({
							secs: this.state.secs - 1,
							timer: this.state.mins + ':' + this.state.secs
						});
				}
		} else if (this.state.secs === 0) {
				this.setState({
					mins: this.state.mins - 1,
					secs: 59,
					timer: this.state.mins + ':00'
				});
		}

		if (this.state.timer === '0:00') {
			this.setState({
				status: 'Rest'
			});
			clearInterval(id);
		}
		}, 100);
	}

	/**
	 * Adjusts the view of the timer
	 * @param {String} action - String denoting which action to take
	 */
	adjustTimer(action) {
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

	render() {
		return (
			<div className="app text-center">
				<div className="settings-container">
					<SettingEditor text="Break Length" length="5" />
					<SettingEditor text="Session Length" length={this.state.mins} adjustTimer={this.adjustTimer} />
				</div>
				<Tomato beginCountdown={this.beginCountdown} state={this.state} />
				<ResetLink />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		workTime: state.workTime
	};
};

export default connect(mapStateToProps)(App);
