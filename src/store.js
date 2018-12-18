import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

/* Actions */
export const FILTER_POSTS = "FILTER_POSTS"
export const filterPosts = filter => ({
    type: FILTER_POSTS,
    filter
})

export const LOADING_POSTS = "LOADING_POSTS"
export const loadingPosts = () => ({
    type: LOADING_POSTS
})
export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
})
export const LOAD_POSTS_ERROR = "POSTS_ERROR"
export const loadPostsError = () => ({
    type: LOAD_POSTS_ERROR
})

export const GET_ALL_POSTS = "GET_ALL_POSTS"
export const getAllPosts = () => async dispatch => {
    dispatch(
        loadingPosts()
    )
    try {
        const res = await fetch("http://localhost:8082/api/posts")
        if (!res.ok) new Error('Bad res from posts api.')
        const posts = await res.json()
        dispatch(
            receivePosts(posts)
        )
    } catch (e) {
        dispatch(
            loadPostsError()
        )
    }
}

export const ADD_POST = "ADD_POST"
export const addPost = post => ({
    type: ADD_POST,
    post
})

/* Reducers */
export const initPosts = {
    byId: {},
    allIds: [],
    loading: false,
    error: false
}
export function posts(state = initPosts, action) {
    switch (action.type) {
        case LOADING_POSTS:
            return {
                ...state,
                loading: true,
                error: false
            }
        case RECEIVE_POSTS: // TODO
            const normalizedPosts = normalize(action.posts)
            return {
                ...state,
                ...normalizedPosts,
                loading: false,
                error: false,
            }
        case LOAD_POSTS_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }
        case ADD_POST:
            return {
                byId: {
                    ...state.byId,
                    [action.id]: action.post
                },
                allIds: [...state.allIds, action.id]
            }
        default:
            return state
    }
}
/* COMMENTS */

/* GET ALL ON INIT */
export const LOADING_ALL_COMMENTS = "LOADING_ALL_COMMENTS"
export const loadingAllComments = () => ({
    type: LOADING_ALL_COMMENTS
})
export const RECEIVE_ALL_COMMENTS = "RECEIVE_ALL_COMMENTS"
export const receiveAllComments = comments => ({
    type: RECEIVE_ALL_COMMENTS,
    comments
})
export const COMMENTS_FETCH_ERROR = "COMMENTS_FETCH_ERROR"
export const commentsFetchError = () => ({
    type: COMMENTS_FETCH_ERROR
})
export const getAllComments = () => async dispatch => {
    dispatch(
        loadingAllComments()
    )
    try {
        const res = await fetch("http://localhost:8082/api/comments")
        if (!res.ok) {
            throw new Error('getting all comments failed.')
        }
        const comments = await res.json()
        dispatch(
            receiveAllComments(comments)
        )
    } catch (e) {
        console.log(e)
        dispatch(
            commentsFetchError()
        )
    }
}

/* SAVE NEW COMMENT */
export const SAVING_COMMENT = "SAVING_COMMENT"
export const savingComment = () => ({
    type: SAVING_COMMENT
})
export const SAVE_COMMENT_SUCCESS = "SAVE_COMMENT_SUCCESS"
export const saveCommentSuccess = (content, post_id, comment_id) => ({
    type: SAVE_COMMENT_SUCCESS,
    content, post_id, comment_id
})
export const SAVE_COMMENT_FAIL = "SAVE_COMMENT_FAIL"
export const saveCommentFail = () => ({
    type: SAVE_COMMENT_FAIL
})
export const addComment = (content, post_id) => async dispatch => {
    dispatch(
        savingComment()
    )
    try {
        const res = await fetch("http://localhost:8082/api/comments", {
            method: "POST",
            body: JSON.stringify(
                {
                    content,
                    post_id
                }
            ),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!res.ok) {
            throw new Error('Could not save comment.')
        } else {
            const json = await res.json()
            dispatch(
                saveCommentSuccess(content, post_id, json.id)
            )
        }
    } catch (e) {
        console.log(e)
        dispatch(
            saveCommentFail()
        )
    }
}

export const initComments = {
    byId: {

    },
    allIds: [

    ],
    error: false,
    loading: false,
    addComment: {
        error: false,
        loading: false
    }
}
export function comments(state = initComments, action) {
    switch (action.type) {
        case LOADING_ALL_COMMENTS:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case COMMENTS_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }
        case RECEIVE_ALL_COMMENTS:
            return {
                ...state,
                ...normalize(action.comments),
                loading: false,
                error: false,
            }
        case SAVING_COMMENT:
            return {
                ...state,
                addComment: {
                    ...state.addComment,
                    loading: true,
                    error: false
                }
            }
        case SAVE_COMMENT_SUCCESS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.comment_id]: {
                        content: action.content,
                        post_id: action.post_id,
                        id: action.comment_id
                    }
                },
                allIds: [
                    ...state.allIds,
                    action.comment_id
                ],
                addComment: {
                    ...state.addComment,
                    loading: false,
                    error: false
                }
            }
        default:
            return state
    }
}

/* 
UTIL
*/
const normalize = item => ({
    byId: item.reduce((acc, item) => {
        return {
            ...acc,
            [item.id]: item
        }
    }, {}),
    allIds: item.map(item => item.id)
})

/* Store */
export const reducer = combineReducers({ posts, comments })

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))
store.dispatch(getAllComments())
export default store