import GraphiQL from 'graphiql'
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import '../../node_modules/graphiql/graphiql.css'
import AppSyncClient from '../lib/appsync_client.js'

const styles = ({
  graphiqlRoot: {
    height: 'calc(100vh - 60px)'
  }
})

async function graphQLFetcher(graphQLParams) {
  const client = new AppSyncClient()
  const result = await client.query(graphQLParams)
  return result
}

class CustomGraphiQL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // REQUIRED:
      // `fetcher` must be provided in order for GraphiQL to operate
      // fetcher: this.props.fetcher,

      // OPTIONAL PARAMETERS
      // GraphQL artifacts
      query: '',
      variables: '',
      response: '',

      // GraphQL Schema
      // If `undefined` is provided, an introspection query is executed
      // using the fetcher.
      schema: undefined,

      // Useful to determine which operation to run
      // when there are multiple of them.
      operationName: null,
      storage: null,
      defaultQuery: null,

      // Custom Event Handlers
      onEditQuery: null,
      onEditVariables: null,
      onEditOperationName: null,

      // GraphiQL automatically fills in leaf nodes when the query
      // does not provide them. Change this if your GraphQL Definitions
      // should behave differently than what's defined here:
      // (https://github.com/graphql/graphiql/blob/master/src/utility/fillLeafs.js#L75)
      getDefaultFieldNames: null
    };
  }

  // Example of using the GraphiQL Component API via a toolbar button.
  handleClickPrettifyButton(event) {
    alert(0)
    const editor = this.graphiql.getQueryEditor()
    const currentText = editor.getValue()
    alert(currentText)
    const { parse, print } = require('graphql');
    const prettyText = print(parse(currentText));
    editor.setValue(prettyText);
    alert(1)
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.graphiqlRoot}>
        <GraphiQL 
          fetcher={graphQLFetcher} 
          editorTheme="solarized light"
        >
          <GraphiQL.Logo>
            GraphiQL
          </GraphiQL.Logo>
          <GraphiQL.Toolbar>

            {/* // GraphiQL.Button usage */}
            {/* <GraphiQL.Button
              onClick={this.handleClickPrettifyButton}
              label="Prettify"
              title="Prettify Query (Shift-Ctrl-P)"
            /> */}

            {/* // Some other possible toolbar items */}
            {/* <GraphiQL.Menu label="File" title="File">
              <GraphiQL.MenuItem label="Save" title="Save" onSelect={...} />
            </GraphiQL.Menu> */}

            {/* <OtherReactComponent someProps="true" /> */}

          </GraphiQL.Toolbar>
          {/* <GraphiQL.Footer>
            // Footer works the same as Toolbar
            // add items by appending child components
          </GraphiQL.Footer> */}
        </GraphiQL>
      </div>
    );
  }
}

CustomGraphiQL.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(CustomGraphiQL)