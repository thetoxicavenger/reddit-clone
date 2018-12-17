import React from 'react'
import Comment from './Comment'
import {connect} from 'react-redux'
import {getAllComments} from '../store'

class Comments extends React.Component {
  render = () => {
    const {getAllComments, loading, error, comments} = this.props
    if (loading) return <div>Loading comments...</div>
    if (error) return <div>Error fetching comments for this post.</div>
    if (!comments || !comments.length) return <div>No comments yet! Comment if you like.</div>
    const commentsList = comments.map(comment => <Comment key={comment.id} {...comment} />)
    return (
      <>
        {commentsList}
      </>
    )
  }
}

const mapStateToProps = (state, props) => ({
  
})

const mapDispatchToProps = dispatch => ({
  // getAllComments: () => {
  //   dispatch(
  //     getAllComments()
  //   )
  // }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)