import Gun from "gun/gun";
import { h, Component } from 'preact';
import style from './style';

const formatNotes = notes => Object.keys(notes)
	.map(key => ({ key, val: notes[key] }))
	.filter(t => Boolean(t.val) && t.key !== '_')

export default class Home extends Component {

	state = {
		newNote: '',
		notes: []
	}

	constructor(props) {
		super(props)
		this.gun = this.props.gun.get('notes')
	}

	componentWillMount() {
		this.gun.on(notes => this.setState({
			notes: formatNotes(notes)
		}))
	}

	add = e => {
		e.preventDefault();
		this.gun.get(Gun.text.random()).put(this.state.newNote)
		this.setState({newNote: ''})
	}

	remove = key => e => {
		e.preventDefault();
		this.gun.get(key).put(null)
	}

	handleChange = e => this.setState({newNote: e.target.value})

	render(_, {newNote, notes}) {

		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
				<form onSubmit={this.add}>
					<input value={newNote} onChange={this.handleChange} />
					<button onClick={this.add}>Add</button>
				</form>
				<ul>
				{notes.map(note => <li key={note.key} onClick={this.remove(note.key)}>{note.val}</li>)}
				</ul>
			</div>
		);
	}
}
