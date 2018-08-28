import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';

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
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Environment extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <Button onClick={this.handleClickOpen}>Open full-screen dialog</Button> */}
        <Button color="inherit" onClick={this.handleClickOpen}>
            Add
        </Button>
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
  constructor(props) {
    super(props)
    this.state = {
      selectedTabNumber: 0,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ selectedTabNumber: value });
  };

  render() {
    const { classes } = this.props;
    const { selectedTabNumber } = this.state;
    return (
      <div>
        名前: 
        <AppBar position="static">
          <Tabs value={selectedTabNumber} onChange={this.handleChange}>
            <Tab label="Connection" />
            <Tab label="Users" />
            <Tab label="Schema" />
          </Tabs>
        </AppBar>
        {selectedTabNumber === 0 && <ConnectionForm classes={classes} />}
        {selectedTabNumber === 1 && <UsersForm classes={classes} />}
        {selectedTabNumber === 2 && <SchemaForm classes={classes} onUpdateGraphqlSchema={this.props.onUpdateGraphqlSchema}/>}
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
            margin="normal"
            value={this.state.region}
            onChange={this.handleChange('region')}
          />
          <TextField
            id="IdentityPoolId"
            label="IdentityPoolId"
            fullWidth
            margin="normal"
            value={this.state.IdentityPoolId}
            onChange={this.handleChange('IdentityPoolId')}
          />
          <TextField
            id="userPoolId"
            label="userPoolId"
            fullWidth
            margin="normal"
            value={this.state.userPoolId}
            onChange={this.handleChange('userPoolId')}
          />
          <TextField
            id="userPoolWebClientId"
            label="userPoolWebClientId"
            fullWidth
            margin="normal"
            value={this.state.userPoolWebClientId}
            onChange={this.handleChange('userPoolWebClientId')}
          />
          <TextField
            id="appSyncEndpoint"
            label="appSyncEndpoint"
            placeholder="https://{xxx}.appsync-api.{region}.amazonaws.com/graphql"
            fullWidth
            margin="normal"
            value={this.state.appSyncEndpoint}
            onChange={this.handleChange('appSyncEndpoint')}
          />
          <input type="submit" value="Submit" />
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
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

UsersForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

// -----------------------------------------------------
// SchemaForm
// -----------------------------------------------------

class SchemaForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      graphqlSchema: localStorage.getItem('graphqlSchema') || '',
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
    localStorage.setItem('graphqlSchema', this.state.graphqlSchema);
    this.props.onUpdateGraphqlSchema();
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <TextField
            id="graphqlSchema"
            label="graphqlSchema"
            fullWidth
            multiline={true}
            rows="30"
            margin="normal"
            value={this.state.graphqlSchema}
            onChange={this.handleChange('graphqlSchema')}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

SchemaForm.propTypes = {
  classes: PropTypes.object.isRequired,
};