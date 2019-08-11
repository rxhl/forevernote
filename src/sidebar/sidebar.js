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
    console.log(this.state);
  };

  render() {
    const { notes, classes, selectedNoteIndex } = this.props;
    return (
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
      </div>
    );
  }
}

export default withStyles(styles)(SidebarComponent);
