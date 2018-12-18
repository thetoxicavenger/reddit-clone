import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Comments from './Comments'
import Zoom from '@material-ui/core/Zoom'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }
});

function Post({ author, content, title, createdAt, votes, img_url, inCart, id, classes }) {
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Zoom in timeout="6000">
            <Paper className={classes.paper}>
              <img src={img_url} alt={title} style={{ maxWidth: '100%', display: 'block' }} />
              <Typography variant="h6" color="primary" noWrap>{title}</Typography>
              <Typography variant="caption" color="textPrimary">{author}</Typography>
              <Typography color="primary">Votes TODO</Typography>
              <Comments
                post_id={id}
                createdAt={createdAt}
              />
            </Paper>
          </Zoom>
        </Grid>
      </Grid>
    </div>
  )
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);