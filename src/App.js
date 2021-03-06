import React, { Component } from 'react';
import { withAuthenticator } from  'aws-amplify-react';
import Amplify, {API, graphqlOperation, Auth } from 'aws-amplify';
import { createSurvey, updateSurvey, deleteSurvey } from './graphql/mutations';
import { getSurvey, listSurveys } from './graphql/queries';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSubmitSurvey = this.handleSubmitSurvey.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      selected: {
        id: '',
        FirstName: '',
        LastName: '',
        Participation: 0,
      },
      items: [],
      nextToken: '',
    }
  }
  
  async componentDidMount() {
    debugger;
    this.listSurveys();
  }

  async listSurveys() {
    const surveys = await API.graphql(graphqlOperation(listSurveys, { limit: 100 }));
    debugger;
    this.setState({...surveys.data.listSurveys});
  }

  async handleSubmitSurvey(event) {
    debugger;
    event.preventDefault();
    event.stopPropagation();
    
    if(this.state.selected.id === '') {
      await API.graphql(
        graphqlOperation(createSurvey, { 
          input: {
            FirstName: this.state.selected.FirstName, 
            LastName: this.state.selected.LastName,
            Participation: this.state.selected.Participation,
          }
        })
      );
    } else {
      await API.graphql(
        graphqlOperation(updateSurvey, { 
          input: {
            id: this.state.selected.id,
            FirstName: this.state.selected.FirstName, 
            LastName: this.state.selected.LastName,
            Participation: this.state.selected.Participation,
          }
        })
      );
    }
    this.listSurveys();
  }

  handleChange(key, value) {
    this.setState({
      ...this.state,
      selected: {
        ...this.state.selected,
        [key]: value
        }
    });
  }

  async handleDelete(id) {
    await API.graphql(graphqlOperation(deleteSurvey, { input: { id }}));
    this.setState({...this.state, selected: { id: '', FirstName: '', LastName: '', Participation: 0 }});
    this.listSurveys();
  }

  selectSpecificallySurvey (survey) {
    debugger;
    this.setState({ ...this.state, selected: {...survey }}); 
  }

  render() {
    const items = [].concat(this.state.items).map((survey, i) => 
      <div key={i} className="alert alert-primary alert-dismissible show" role="alert">
        <span key={survey.i} onClick={this.selectSpecificallySurvey.bind(this, survey)}>        
          {survey.FirstName} {survey.LastName} {survey.Participation} 
        </span>
        <button key={survey.i} type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={ this.handleDelete.bind(this,survey.id) }>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
    
    return (
      <div className="App">
        <div className="container">
          <form onSubmit={this.handleSubmitSurvey}>
            <div className="input-group">
              <input type="text" className="" value={this.state.selected.FirstName} placeholder="First Name" onChange={ event => this.handleChange.apply(this, ['FirstName', event.target.value]) }/>
              <input type="text" className="" value={this.state.selected.LastName} placeholder="Last Name" onChange={ event => this.handleChange.apply(this, ['LastName', event.target.value]) }/>
              <input type="text" className="" value={this.state.selected.Participation} placeholder="Participation" onChange={ event => this.handleChange.apply(this, ['Participation', event.target.value]) }/>
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">{this.state.selected.id === '' ? 'SEND' : 'Update Survey'}</button>
              </div>
            </div>
          </form>
        </div>
        <div className="container">
          {items}
        </div>
      </div>
    );
  }
}

export default withAuthenticator(App);
