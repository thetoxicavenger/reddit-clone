import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { addComment } from '../store'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function AddComment({ classes, submitComment, post_id }) {
  const [comment, changeComment] = useState("")
  const _onSubmit = e => {
    e.preventDefault()
    if (comment) {
      submitComment(comment, post_id)
    }
  }
  return (
    <form
      className={classes.container} noValidate
      autoComplete="off"
      onSubmit={_onSubmit}
    >
      <TextField
        id="outlined-multiline-static"
        label="Add a comment..."
        className={classes.textField}
        margin="normal"
        value={comment}
        onChange={e => changeComment(e.target.value)}
      />
      <Button
        variant="contained"
        className={classes.button}
        type='submit'
      >
        Save
      </Button>
    </form>
  );
}

AddComment.propTypes = {
  classes: PropTypes.object.isRequired,
};

const AddCommentWithStyles = withStyles(styles)(AddComment)

const mapDispatchToProps = dispatch => ({
  submitComment: (content, post_id) => {
    dispatch(
      addComment(content, post_id)
    )
  }
})

export default connect(null, mapDispatchToProps)(AddCommentWithStyles);