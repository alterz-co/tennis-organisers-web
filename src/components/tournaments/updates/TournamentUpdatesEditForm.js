import React, { Component } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { editUpdate } from '../../../redux/actions/tournamentActions';

class TournamentUpdatesEditForm extends Component {

  state = {
    body: this.props.update.body
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleDescriptionChange = value => {
    this.setState({
      body: value
    });
  }

  onSubmit = event => {
    event.preventDefault();
    const update = {
      body: this.state.body
    }
    this.props.editUpdate(this.props.updateId, update);
    this.setState({
      body: ''
    });
  }

  render(){
    return(
      <Container>
        <Form size='large' onSubmit={this.onSubmit}>
          <ReactQuill
            value={this.state.body}
            onChange={this.handleDescriptionChange}
            style={{ height: 200, paddingBottom: 50 }}
          />
          <Button color='black' fluid size='large'>Edit Update</Button>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editUpdate: (updateId, update) => dispatch(editUpdate(updateId, update))
  }
}

export default connect(null, mapDispatchToProps)(TournamentUpdatesEditForm);
