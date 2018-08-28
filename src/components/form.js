import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import green from '@material-ui/core/colors/green';


import AppSyncClient from '../lib/appsync_client.js'

const styles = theme => ({
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '2px 2px',
    // width: 'calc(100% - 24px)',
    // width: '1000px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

// const theme = createMuiTheme({
//   palette: {
//     primary: green,
//   },
// });

class CustomizedInputs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: undefined,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault()

    const callback = (data) => {
      console.log(data)
      this.setState({
        result: JSON.stringify(data)
      })
    }

    try {
      // alert('An essay was submitted')
      console.log('submit')
      const client = new AppSyncClient()
      const data = await client.query(callback)
      // console.log(data)
      alert('An essay was submitted')
    } catch (e) {
      alert(e)
    }

  }

  render() {
    const { classes } = this.props;
    const field = this.props.graphqlField
    const queryTextField = field === null ? null :
      <TextField
        id="bootstrap-input"
        multiline={true}
        rows="10"
        InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.bootstrapRoot,
            input: classes.bootstrapInput,
          },
        }}
        InputLabelProps={{
          shrink: true,
          className: classes.bootstrapFormLabel,
        }}
        fullWidth
        value={field.getQuery()}
        onChange={this.handleChange}
      />
    
    const paramaterTextFields = field === null ? null : field.getArgs().map(arg => {
      return (
        <TextField
          id={arg.name}
          label={`${arg.name}: ${arg.type}${arg.required ? '!' : ''}`}
          margin="normal"
          onChange={this.handleChange}
          helperText={arg.required ? 'required' : ''}
        /> 
      )
    })

    return (
      <form className={classes.container} onSubmit={this.handleSubmit}>
        {queryTextField}
        {paramaterTextFields}
        {this.state.result}
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputs);