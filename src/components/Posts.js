import React from 'react'
import Post from './Post'
import { getAllPosts } from '../store'
import { connect } from 'react-redux'

class Posts extends React.Component {
  componentDidMount = () => {
    this.props.getAllPosts()
  }
  render = () => {
    const { posts, loading, error } = this.props
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error! Could not retreive posts.</div>
    if (!posts.length) return <div>No posts. Want to add posts? Hit the plus button.</div>
    const postsList = posts.map(post => <Post key={post.id} {...post} />)
    return (
      <>
        {postsList}
      </>
    )
  }
}

const mapStateToProps = ({ posts: { byId, allIds, loading, error } }) => {
  return {
    posts: allIds.length ? allIds.map(id => byId[id]) : [],
    loading,
    error
  }
}

const mapDispatchToProps = dispatch => ({
  getAllPosts: () => {
    dispatch(
      getAllPosts()
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
