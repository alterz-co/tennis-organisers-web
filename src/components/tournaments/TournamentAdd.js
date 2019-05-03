import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { addTournament } from '../../redux/actions/tournamentActions';

import * as ROUTES from '../../constants/routes';

class TournamentAdd extends Component {

  state = {
    title: '',
    date: '',
    startDate: '',
    time: '',
    deadline: '',
    venue: '',
    description: '',
    url: '',
    error: ''
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

  isFormValid = () => {
    if(this.isFormEmpty(this.state)){
      this.setState({ error: 'Fill in all fields with asterisk' });
      return false;
    } else if (!this.isDateValid(this.state)){
      this.setState({ error: 'Date is invalid. Date must be in this format MM-DD-YYYY e.g. 01-20-2018' });
      return false;
    } else if (!this.isTimeValid(this.state)){
      this.setState({ error: 'Time is invalid. Time must be in this format e.g. 12:00 pm' });
      return false;
    } else if (!this.isDeadlineValid(this.state)){
      this.setState({ error: 'Deadline is invalid. It must be in this format MM-DD-YYYY e.g. 01-20-2018' });
      return false;
    } else {
      return true;
    }
  }

  isFormEmpty = ({ title, date, time, deadline, venue, price }) => {
    return title === '' || date === '' || time === '' || deadline === '' || venue === '';
  }

  isDateValid = ({ date }) => {
    if(!/^[0-9]{2}[-][0-9]{2}[-][0-9]{4}$/i.test(date)) {
      return false
    } else {
      return true
    }
  }

  isTimeValid = ({ time }) => {
    if(!/^((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))$/i.test(time)) {
      return false
    } else {
      return true
    }
  }

  isDeadlineValid = ({ deadline }) => {
    if(!/^[0-9]{2}[-][0-9]{2}[-][0-9]{4}$/i.test(deadline)) {
      return false
    } else {
      return true
    }
  }

  onSubmit = event => {
    event.preventDefault();
    if(this.isFormValid()){
      this.setState({ error: '' });
      const date = format(this.state.date, 'D MMM, YYYY');
      const deadline = format(this.state.deadline, 'D MMM, YYYY');
      const newTournament = {
        title: this.state.title,
        date,
        startDate: this.state.date,
        time: this.state.time,
        deadline,
        venue: this.state.venue,
        description: this.state.description,
        url: this.state.url
      }
      this.props.addTournament(newTournament);
      this.setState({
        title: '',
        date: '',
        time: '',
        deadline: '',
        venue: '',
        description: '',
        url: ''
      });
    }
  }

  render(){
    if(!this.props.auth.uid){
      return <Redirect to={ROUTES.LOGIN}/>
    }

    return(
      <Grid centered>
        <Grid.Column style={{ maxWidth: 1000 }}>
          <Header as='h2' color='black' textAlign='center'>Add New Tournament</Header>
          {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
          <Form size='large' onSubmit={this.onSubmit}>
            <Form.Field>
              <label>Title <span style={{ color: 'red' }}>*</span></label>
              <input
                fluid='true'
                name='title'
                type='text'
                placeholder='STA Open Singles & Doubles I 2019'
                value={this.state.title}
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Date <span style={{ color: 'red' }}>*</span></label>
              <input
                fluid='true'
                name='date'
                type='text'
                placeholder='MM-DD-YYYY'
                value={this.state.date}
                onChange={this.onChange}
              />
              <p>Date must be in this format MM-DD-YYYY e.g. 01-20-2018, 01-01-2018</p>
            </Form.Field>
            <Form.Field>
              <label>Time <span style={{ color: 'red' }}>*</span></label>
              <input
                fluid='true'
                name='time'
                type='text'
                placeholder='2:00pm'
                value={this.state.time}
                onChange={this.onChange}
              />
              <p>Time must be in this format HH:MM e.g. 12:00 pm</p>
            </Form.Field>
            <Form.Field>
              <label>Deadline <span style={{ color: 'red' }}>*</span></label>
              <input
                fluid='true'
                name='deadline'
                type='text'
                placeholder='MM-DD-YYYY'
                value={this.state.deadline}
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Venue <span style={{ color: 'red' }}>*</span></label>
              <input
                fluid='true'
                name='venue'
                type='text'
                placeholder='Where will the tournament be held?'
                value={this.state.venue}
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field><label>Description</label></Form.Field>
            <ReactQuill
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              style={{ height: 200, paddingBottom: 50 }}
            />
            <Form.Field>
              <label>Tournament URL</label>
              <input
                fluid='true'
                name='url'
                type='text'
                placeholder='e.g. https://www.singtennis.org.sg/tournament-info.aspx?id=478'
                value={this.state.url}
                onChange={this.onChange}
              />
            </Form.Field>
            <Button color='black' fluid size='large'>Add</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTournament: (tournament) => dispatch(addTournament(tournament))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentAdd);
