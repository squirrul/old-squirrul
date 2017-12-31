import Gun from 'gun/gun';
import { h, Component } from 'preact';
import style from './style';

// const formatNote = note => {
// 	return { val: (note ? note.body : 'null') };
// };

// function mapNoteToUI(note, field) {
// 	return {
// 		title: note.title,
// 		body: note.body,
// 		val: note.title,
// 		key: field
// 	}
// }

const formatNotes = notes => Object.keys(notes)
	.filter(key => key !== '_' && !!notes[key])
	.map(key => ({ key, val: notes[key] }));

export default class Home extends Component {

	state = {
		note: '',
		notes: []
	}

	constructor(props) {
		super(props);
		this.gun = this.props.gun.get('notes');
	}

	componentWillMount() {
		this.gun.on(notes => {
			this.setState({
				notes: formatNotes(notes, this.gun)
			});
		});
	}

	add = e => {
		e.preventDefault();
		this.gun.get(Gun.text.random()).put(this.state.note);
		this.setState(prevState => {
			prevState.note = '';
			return prevState;
		});
	}

	remove = key => e => {
		e.preventDefault();
		this.gun.get(key).put(null);
	}

	handleChange = key => e => this.setState({ [key]: e.target.value })

	render({ dbName }, { note, notes }) {
		return (
			<div class={style.home}>
				<h1>Notes</h1>
				<h2>{dbName}</h2>
				<form onSubmit={this.add}>
					{/* <input type="text" placeholder="title" value={title} onInput={this.handleChange('title')} /> */}
					<textarea value={note} placeholder="note" onInput={this.handleChange('note')} />
					<input value="Add" type="submit" />
				</form>
				<ul>
					{notes.map(note => <li key={note.key} onClick={this.remove(note.key)}>{note.val}</li>)}
				</ul>
			</div>
		);
	}
}
