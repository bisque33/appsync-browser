import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 6,
  },
})

class NestedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphqlSchema: this.props.graphqlSchema,
      queryOpen: true,
      mutationOpen: false,
    };
    // this.handleSelectMenu = this.handleSelectMenu.bind(this)
  }

  handleQueryClick = () => {
    this.setState(state => ({
      queryOpen: !state.queryOpen,
      mutationOpen: false,
    }));
  };

  handleMutationClick = () => {
    this.setState(state => ({
      queryOpen: false,
      mutationOpen: !state.mutationOpen,
    }));
  };

  handleSelectMenu = (type, field) => {
    this.props.onClickMenu(type, field)
  }

  render() {
    const { classes } = this.props;
    const fields = this.props.graphqlSchema.getQueryFields()
    const queryNamesList = fields.map((field, index) => {
      return  <ListItem 
                button 
                className={classes.nested}
                key={`${field.getName()}${field.getArgNames().join()}`}
              >
                <ListItemText 
                  primary={field.getName()}
                  secondary={field.getArgNames().join(',')}
                  onClick={() => this.handleSelectMenu('Query', field)}
                />
              </ListItem>
    })

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Schema</ListSubheader>}
        >
          <ListItem button onClick={this.handleQueryClick}>
            <ListItemText primary="Query" />
            {this.state.queryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.queryOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {queryNamesList}
            </List>
          </Collapse>
          <ListItem button onClick={this.handleMutationClick}>
            <ListItemText primary="Mutation" />
            {this.state.mutationOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.mutationOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);