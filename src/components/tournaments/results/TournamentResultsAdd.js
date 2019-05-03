import React, { Component } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { addResult } from '../../../redux/actions/tournamentActions';

class TournamentResultsAdd extends Component {

  state = {
    date: '',
    description: ''
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleDescriptionChange = value => {
    this.setState({
      description: value
    });
  }

  onSubmit = event => {
    event.preventDefault();
    const result = {
      date: this.state.date,
      description: this.state.description
    }
    this.props.addResult(this.props.tournamentId, result);
    this.setState({
      date: '',
      description: ''
    });
  }

  render(){
    return(
      <Container>
        <Form size='large' onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Date</label>
            <input
              fluid='true'
              name='date'
              type='text'
              value={this.state.date}
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field><label>Description</label></Form.Field>
          <ReactQuill
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            style={{ height: 200, paddingBottom: 50 }}
          />
          <Button color='black' fluid size='large' style={{ marginTop: '30px' }}>Add Result</Button>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addResult: (tournamentId, result) => dispatch(addResult(tournamentId, result))
  }
}

export default connect(null, mapDispatchToProps)(TournamentResultsAdd);
