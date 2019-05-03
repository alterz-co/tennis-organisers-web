import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { addAnnouncement } from '../../redux/actions/announcementActions';

import * as ROUTES from '../../constants/routes';

class AnnouncementsAdd extends Component {

  state = {
    title: '',
    body: ''
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleBodyChange = value => {
    this.setState({
      body: value
    });
  }

  onSubmit = event => {
    event.preventDefault();
    const announcement = {
      title: this.state.title,
      body: this.state.body
    }
    this.props.addAnnouncement(announcement);
    this.setState({
      title: '',
      body: ''
    });
  }

  render(){
    if(!this.props.auth.uid){
      return <Redirect to={ROUTES.LOGIN}/>
    }

    return(
      <Grid centered>
        <Grid.Column style={{ maxWidth: 800 }}>
          <Header as='h2' color='black' textAlign='center'>Add New Announcement</Header>
          <Form size='large' onSubmit={this.onSubmit}>
            <Form.Field>
              <label>Title</label>
              <input
                fluid='true'
                name='title'
                type='text'
                value={this.state.title}
                onChange={this.onChange}
              />
            </Form.Field>
            <ReactQuill
              value={this.state.body}
              onChange={this.handleBodyChange}
              style={{ height: 200, paddingBottom: 50 }}
            />
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
    addAnnouncement: (announcement) => dispatch(addAnnouncement(announcement))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsAdd);
