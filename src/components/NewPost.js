import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import imageExists from 'image-exists'
import { connect } from 'react-redux'
import { addPost } from '../store'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    display: 'block'
  },
});

const fields = [
  {
    id: 0,
    key: "title",
    label: "Title",
    multiline: false,
  },
  {
    id: 1,
    key: "body",
    label: "Message",
    multiline: true,
  },
  {
    id: 2,
    key: "author",
    label: "Author",
    multiline: false,
  },
  {
    id: 3,
    key: "img",
    label: "Header Image URL",
    multiline: false,
  },
]

function NewPost({ classes, save }) {
  const [post, updatePost] = useState({
    title: {
      value: "",
      valid: true
    },
    body: {
      value: "",
      valid: true
    },
    author: {
      value: "",
      valid: true
    },
    img: {
      value: "",
      valid: true
    }
  })
  const _onSubmit = e => {
    e.preventDefault();
    save({
      title: post.title.value,
      body: post.body.value,
      author: post.author.value,
      img: post.img.value,
    })
  }
  const disabled = Object.values(post).some(value => !value.valid || !value.value)
  return (
    <form
      className={classes.container}
      autoComplete="off"
      onSubmit={_onSubmit}
    >
      {fields.map(({ key, id, label, multiline }) => {
        const _onBlur = e => {
          let valid = false
          if (key !== "img") {
            valid = e.target.value.length > 0
            return updatePost({
              ...post,
              [key]: {
                ...post[key],
                valid
              }
            })
          }
          else imageExists(e.target.value, function (exists) {
            valid = exists
            return updatePost({
              ...post,
              [key]: {
                ...post[key],
                valid
              }
            })
          })
        }
        return (
          <TextField
            key={id}
            id={`"${id}"`}
            label={label}
            className={classes.textField}
            value={post[key].value}
            onChange={({ target: { value } }) => updatePost({
              ...post,
              [key]: {
                ...post[key],
                value
              }
            })}
            margin="normal"
            multiline={multiline}
            onBlur={_onBlur}
            error={!post[key].valid}
          />
        )
      })}
      <Button
        type="submit"
        variant="contained"
        className={classes.button}
        disabled={disabled}
      >
        Save
      </Button>
    </form>
  )
}

NewPost.propTypes = {
  classes: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired
}

const NewPostWithStyles = withStyles(styles)(NewPost)

const mapDispatchToProps = dispatch => ({
  save: post => dispatch(addPost(post))
})
const NewPostWithRedux = connect(null, mapDispatchToProps)(NewPostWithStyles)

export default NewPostWithRedux