import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { addPost } from '../store'

import NewPost from './NewPost'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 15;
  const left = 20;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: "90%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

function AddPost({ classes, addPost, hide }) {
  return (
    <div>
      <Modal
        aria-labelledby="Add a new post"
        aria-describedby="Add a new post to the list of all posts"
        open={true}
        onClose={hide}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            New Post
          </Typography>
          <NewPost />
        </div>
      </Modal>
    </div>
  )
}

AddPost.propTypes = {
  classes: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired
};

const AddPostWrapped = withStyles(styles)(AddPost);

const mapDispatchToProps = dispatch => ({ addPost: post => dispatch(addPost(post)) })
const AddPostContainer = connect(null, mapDispatchToProps)(AddPostWrapped)

export default AddPostContainer