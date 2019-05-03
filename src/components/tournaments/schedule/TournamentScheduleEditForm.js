import React, { Component } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { editSchedule } from '../../../redux/actions/tournamentActions';

class TournamentScheduleEditForm extends Component {

  state = {
    description: this.props.schedule.description
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
    this.props.editSchedule(this.props.scheduleId, schedule);
    this.setState({
      description: ''
    });
  }

  render(){
    return(
      <Container>
        <Form size='large' onSubmit={this.onSubmit}>
          <Form.Field><label>Description</label></Form.Field>
          <ReactQuill
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            style={{ height: 200, paddingBottom: 50 }}
          />
          <Button color='black' fluid size='large'>Edit Schedule</Button>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editSchedule: (scheduleId, schedule) => dispatch(editSchedule(scheduleId,schedule))
  }
}

export default connect(null, mapDispatchToProps)(TournamentScheduleEditForm);
