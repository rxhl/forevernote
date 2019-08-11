import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarItem/sidebarItem';

class SidebarComponent extends Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null
    };
  }

  newNoteBtnClick = () => {
    this.setState({
      addingNote: !this.state.addingNote,
      title: null
    });
  };

  updateTitle = text => {
    this.setState({
      title: text
    });
  };

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({
      title: null,
      addingNote: false
    });
  };

  selectNote = (note, index) => {
    this.props.selectNote(note, index);
  };

  deleteNote = note => {
    this.props.deleteNote(note);
  };

  render() {
    const { notes, classes, selectedNoteIndex } = this.props;
    return notes ? (
      <div className={classes.sidebarContainer}>
        <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
          {this.state.addingNote ? 'Cancel' : 'New Note'}
        </Button>
        {this.state.addingNote ? (
          <div>
            <input
              type="text"
              className={classes.newNoteInput}
              placeholder="Enter note title"
              onKeyUp={e => this.updateTitle(e.target.value)}
            />
            <Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>
              Submit Note
            </Button>
          </div>
        ) : null}
        <List>
          {notes.map((_note, _index) => {
            return (
              <div key={_index}>
                <SidebarItemComponent
                  _note={_note}
                  _index={_index}
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={this.selectNote}
                  deleteNote={this.deleteNote}
                />
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    ) : null;
  }
}

export default withStyles(styles)(SidebarComponent);
