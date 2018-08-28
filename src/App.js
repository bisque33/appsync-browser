import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';

import SimpleAppBar from './components/header.js';
import Menu from './components/menu.js';
import CustomGraphiQL from './components/graphiql';
import { GraphqlSchema } from './lib/graphql_parser.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphqlSchema: new GraphqlSchema(localStorage.getItem('graphqlSchema') || ''),
      graphqlFieldType: null,
      graphqlField: null,
    }
    this.onUpdateGraphqlSchema = this.onUpdateGraphqlSchema.bind(this)
    this.onClickMenu = this.onClickMenu.bind(this)
  }

  // schemaの更新をmenuに反映
  onUpdateGraphqlSchema() {
    this.setState({graphqlSchema: new GraphqlSchema(localStorage.getItem('graphqlSchema'))});
    alert('スキーマを再読込しました');
  }

  // menuの選択をformに反映
  onClickMenu(type, field) {
    this.setState({
      graphqlFieldType: type,
      graphqlField: field,
    })
  }

  render() {
    return (
      <div className="App">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <SimpleAppBar />
          </Grid>
          <Grid item xs={3}>
            <Menu 
              graphqlSchema={this.state.graphqlSchema}
              onClickMenu={this.onClickMenu}
            />
          </Grid>
          <Grid item xs={9}>
             <CustomGraphiQL 
              schema={this.state.graphqlSchema}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;