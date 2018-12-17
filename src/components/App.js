import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Header from './Header'
import AddPost from './AddPost'
import Posts from './Posts'

function App() {
  const [addingPost, toggleAddPost] = useState(false)
  return (
    <>
      <CssBaseline />
      <Header
        toggleAddPost={() => toggleAddPost(true)}
      />
      {addingPost &&
        <AddPost
          hide={() => toggleAddPost(false)}
        />
      }
      <Posts />
    </>
  )
}

export default App;
