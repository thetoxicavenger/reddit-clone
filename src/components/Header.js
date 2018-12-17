import React, { useState } from 'react'

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

import { connect } from 'react-redux'
import { filterPosts } from '../store'

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

function Header({ classes, filterPosts, toggleAddPost }) {
  const [filter, setFilter] = useState("")
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Reddit Clone
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Filter posts..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={filter}
              onChange={e => {
                filterPosts(e.target.value)
                setFilter(e.target.value)
              }}
            />
          </div>
          <Button
            size="small"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={toggleAddPost}
          >
            <Icon className={classes.addIcon}>add</Icon>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  filterPosts: PropTypes.func.isRequired,
  toggleAddPost: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  filterPosts: filter => dispatch(filterPosts(filter)),
})

const HeaderWithStyles = withStyles(styles)(Header)
const HeaderContainer = connect(null, mapDispatchToProps)(HeaderWithStyles)

export default HeaderContainer