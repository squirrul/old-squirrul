import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Gun from 'gun/gun';
import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {

	constructor() {
		super()
		this.gun = Gun('https://gunjs.herokuapp.com/gun').get('random/fDO4CKq98');
		// this.gun = Gun([location.origin, 'gun'].join('/'))
		window.gun = this.gun;
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
					<Home path="/" gun={this.gun} />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
