import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BuildIcon from '@material-ui/icons/Build';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  // form
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    // width: 500,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Environment extends React.Component {
  state = { open: false }
  handleClickOpen = () => { this.setState({ open: true }) }
  handleClose = () => { this.setState({ open: false }) }

  render() {
    const { classes } = this.props

    return (
      <div>
        {/* <Button color="inherit" onClick={this.handleClickOpen}>
            Add
        </Button> */}
        <IconButton color="inherit" onClick={this.handleClickOpen}>
          <BuildIcon />
        </IconButton>  
        <Dialog
          fullScreen
          // fullWidth
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Environment
              </Typography>

              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <EnvironmentForm 
            classes={classes}
            onUpdateGraphqlSchema={this.onUpdateGraphqlSchema}
          />
        </Dialog>
      </div>
    );
  }
}

Environment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Environment);

// -----------------------------------------------------
// EnvironmentForm
// -----------------------------------------------------

class EnvironmentForm extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="headline" gutterBottom>
          Connection
        </Typography>
        <ConnectionForm classes={classes} />
        <Typography variant="headline" gutterBottom>
          Users
        </Typography>
        <UsersForm classes={classes} />
      </div>
    );
  }
}

EnvironmentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

// -----------------------------------------------------
// ConnectionForm
// -----------------------------------------------------

class ConnectionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: localStorage.getItem('region') || '',
      IdentityPoolId: localStorage.getItem('IdentityPoolId') || '',
      userPoolId: localStorage.getItem('userPoolId') || '',
      userPoolWebClientId: localStorage.getItem('userPoolWebClientId') || '',
      appSyncEndpoint: localStorage.getItem('appSyncEndpoint') || '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    alert('An essay was submitted');
    localStorage.setItem('region', this.state.region);
    localStorage.setItem('IdentityPoolId', this.state.IdentityPoolId);
    localStorage.setItem('userPoolId', this.state.userPoolId);
    localStorage.setItem('userPoolWebClientId', this.state.userPoolWebClientId);
    localStorage.setItem('appSyncEndpoint', this.state.appSyncEndpoint);
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <TextField
            id="region"
            label="region"
            className={classes.textField}
            fullWidth
            value={this.state.region}
            onChange={this.handleChange('region')}
          />
          <TextField
            id="IdentityPoolId"
            label="IdentityPoolId"
            className={classes.textField}
            fullWidth
            value={this.state.IdentityPoolId}
            onChange={this.handleChange('IdentityPoolId')}
          />
          <TextField
            id="userPoolId"
            label="userPoolId"
            className={classes.textField}
            fullWidth
            value={this.state.userPoolId}
            onChange={this.handleChange('userPoolId')}
          />
          <TextField
            id="userPoolWebClientId"
            label="userPoolWebClientId"
            className={classes.textField}
            fullWidth
            value={this.state.userPoolWebClientId}
            onChange={this.handleChange('userPoolWebClientId')}
          />
          <TextField
            id="appSyncEndpoint"
            label="appSyncEndpoint"
            className={classes.textField}
            placeholder="https://{xxx}.appsync-api.{region}.amazonaws.com/graphql"
            fullWidth
            value={this.state.appSyncEndpoint}
            onChange={this.handleChange('appSyncEndpoint')}
          />
          <Button 
            type="submit" 
            variant="contained" 
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

ConnectionForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

// -----------------------------------------------------
// UsersForm
// -----------------------------------------------------

class UsersForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: localStorage.getItem('username') || '',
      password: localStorage.getItem('password') || '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(event) {
    localStorage.setItem('username', this.state.username);
    localStorage.setItem('password', this.state.password);
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;

    // TODO: 入力するたびに増えるフォーム
    return (
      <div>
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <TextField
            id="username"
            label="username"
            className={classes.textField}
            margin="normal"
            value={this.state.username}
            onChange={this.handleChange('username')}
          />
          <TextField
            id="password"
            label="password"
            className={classes.textField}
            margin="normal"
            value={this.state.password}
            onChange={this.handleChange('password')}
          />
          <Button type="submit" variant="contained" className={classes.button}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

UsersForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
