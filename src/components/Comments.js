import React from 'react'
import Comment from './Comment'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Moment from 'react-moment'
import AddComment from './AddComment';

function capital_letter(str) {
  str = str.split(" ");
  for (let i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }
  return str.join(" ");
}


class Comments extends React.Component {
  render = () => {
    const { loading, error, comments, createdAt, post_id } = this.props
    if (loading) return <div>Loading comments...</div>
    if (error) return <div>Error fetching comments for this post.</div>
    const commentsList = comments.map(comment => <Comment key={comment.id} {...comment} />)
    return (
      <>
        <Typography variant="h6" color="primary" noWrap><Moment fromNow filter={capital_letter}>{createdAt}</Moment> | {comments.length} comment{comments.length !== 1 && "s"}</Typography>
        <AddComment post_id={post_id} />
        <ul>
          {commentsList}
        </ul>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  comments: state.comments.allIds.reduce((acc, id) => {
    if (state.comments.byId[id].post_id === ownProps.post_id) {
      return [...acc, state.comments.byId[id]]
    }
    return acc
  }, []),
})

export default connect(mapStateToProps, null)(Comments)