import React, { Component } from 'react';
import firebase from 'firebase';

import './App.css';
import EditorComponent from './editor/editor';
import SidebarComponent from './sidebar/sidebar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        this.setState({
          notes: notes,
          selectedNoteIndex: 'nJXfBIEYMyUnJ28FSvcD',
          selectedNote: notes[0]
        });
      });
  };

  selectNote = (note, index) =>
    this.setState({
      selectedNoteIndex: index,
      selectedNote: note
    });

  noteUpdate = (id, noteObj) => {
    if (id === 'nJXfBIEYMyUnJ28FSvcD') return;

    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  };

  newNote = async title => {
    const note = {
      title,
      body: ''
    };

    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

    const newID = newFromDB.id;
    await this.setState({
      notes: [...this.state.notes, note]
    });

    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter(_note => _note.id === newID)[0]
    );
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex
    });
  };

  deleteNote = async note => {
    if (note.id === 'nJXfBIEYMyUnJ28FSvcD')
      return alert('Cannot delete the welcome note ;)');

    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({
      notes: this.state.notes.filter(_note => _note !== note)
    });

    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({
        selectedNoteIndex: null,
        selectedNote: null
      });
    } else {
      this.state.notes.length > 0
        ? this.selectNote(
            this.state.notes[this.state.selectedNoteIndex - 1],
            this.state.selectedNoteIndex - 1
          )
        : this.setState({
            selectedNoteIndex: null,
            selectedNote: null
          });
    }
    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  };

  render() {
    return (
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        />
        {this.state.selectedNote ? (
          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
