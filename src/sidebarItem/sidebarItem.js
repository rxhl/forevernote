import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItemComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return <h1>hello</h1>;
  }
}

export default withStyles(styles)(SidebarItemComponent);
