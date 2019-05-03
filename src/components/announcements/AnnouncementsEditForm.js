import React, { Component } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { editAnnouncement } from '../../redux/actions/announcementActions';

class AnnouncementsEditForm extends Component {

  state = {
    title: this.props.announcement.title,
    body: this.props.announcement.body
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
    this.props.editAnnouncement(this.props.announcementId, announcement);
    this.setState({
      title: '',
      body: ''
    });
  }

  render(){
    return(
      <Container>
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
          <Button color='black' fluid size='large'>Edit Announcement</Button>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editAnnouncement: (announcementId, announcement) => dispatch(editAnnouncement(announcementId, announcement))
  }
}

export default connect(null, mapDispatchToProps)(AnnouncementsEditForm);
