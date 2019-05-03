import React, { Component } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { addSchedule } from '../../../redux/actions/tournamentActions';

class TournamentScheduleAdd extends Component {

  state = {
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
    const schedule = {
      description: this.state.description
    }
    this.props.addSchedule(this.props.tournamentId, schedule);
    this.setState({
      description: ''
    });
  }

  render(){
    return(
      <Container>
        <Form size='large' onSubmit={this.onSubmit}>
          <ReactQuill
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            style={{ height: 200, paddingBottom: 50 }}
          />
          <Button color='black' fluid size='large' style={{ marginTop: '30px' }}>Add Schedule</Button>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSchedule: (tournamentId, schedule) => dispatch(addSchedule(tournamentId, schedule))
  }
}

export default connect(null, mapDispatchToProps)(TournamentScheduleAdd);
