import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { editTournament } from '../../redux/actions/tournamentActions';
import LoaderComponent from '../LoaderComponent';

class TournamentEditForm extends Component {

  state = {
    title: this.props.tournament.title,
    date: this.props.tournament.date,
    time: this.props.tournament.time,
    deadline: this.props.tournament.deadline,
    venue: this.props.tournament.venue,
    description: this.props.tournament.description,
    url: this.props.tournament.url,
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

  onSubmit = event => {
    event.preventDefault();
    let date;
    let deadline;

    if(this.state.date !== this.props.tournament.date){
      date = format(this.state.date, 'D MMM, YYYY');
    } else {
      date = this.props.tournament.date;
    }

    if(this.state.deadline !== this.props.tournament.deadline){
      deadline = format(this.state.deadline, 'D MMM, YYYY');
    } else {
      deadline = this.props.tournament.deadline;
    }

    const updateTournament = {
      title: this.state.title,
      date,
      time: this.state.time,
      deadline,
      venue: this.state.venue,
      description: this.state.description,
      url: this.state.url
    }

    const tournamentId = this.props.tournamentId;
    this.props.editTournament(tournamentId, updateTournament);
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render(){
    if(!this.props.tournament){
      return <LoaderComponent/>
    }

    return(
      <Grid centered>
        <Grid.Column style={{ maxWidth: 800 }}>
          <Button
            onClick={this.goBack}
            content='Back' icon='chevron circle left' labelPosition='left' basic color="black"
          />
          <Header as='h2' color='black' textAlign='center'>Edit tournament</Header>
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
                placeholder='7:00pm'
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
                placeholder='Where will your tournament be held?'
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
                placeholder='e.g. https://www.singtennis.org.sg/tournament-info.aspx?id=415'
                value={this.state.url}
                onChange={this.onChange}
              />
            </Form.Field>
            <Button color='black' fluid size='large'>Save</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editTournament: (tournamentId, tournament) => dispatch(editTournament(tournamentId, tournament))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(TournamentEditForm));
