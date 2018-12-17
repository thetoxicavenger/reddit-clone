import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
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
    switch(action.type) {
        case LOADING_POSTS:
            return {
                ...state,
                loading: true,
                error: false
            }
        case RECEIVE_POSTS: // TODO
            const normalizedPosts = normalizeGetPosts(action.posts)
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
export const initComments = { byId: {}, allIds: [] }
export function comments(state = initComments, action) {
    switch(action.type) {
        default:
            return state
    }
}

/* 
UTIL
*/
const normalizeGetPosts = posts => ({
    byId: posts.reduce((acc, post) => {
        return {
            ...acc,
            [post.id]: post
        }
    }, {}),
    allIds: posts.map(post => post.id)
})

/* Store */
export const reducer = combineReducers({ posts, comments })

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))
store.dispatch(getAllComments())
export default store