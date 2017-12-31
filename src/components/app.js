import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Gun from 'gun/gun';
import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

const GUN_URL = 'https://gun-dearwafeum.now.sh/gun';
// GUN_URL = 'https://gunjs.herokuapp.com/gun'
// this.gun = Gun([location.origin, 'gun'].join('/'))

export default class App extends Component {

	constructor() {
		super();
		this.dbName = `db${window.location.hash}`;
		this.gun = Gun(GUN_URL).get(this.dbName);
		if (typeof window !== 'undefined') window.gun = this.gun;
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" gun={this.gun} dbName={this.dbName} />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
