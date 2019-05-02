import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Grid, Header, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { editProfile } from '../../redux/actions/organiserActions';

import * as ROUTES from '../../constants/routes';

class ProfileEditForm extends Component {

  state = {
    name: this.props.organiser.name,
    website: this.props.organiser.website
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit = event => {
    event.preventDefault();
    const organiserId = this.props.organiserId;
    const editProfile = {
      name: this.state.name,
      website: this.state.website
    }
    this.props.editProfile(organiserId, editProfile);
  }

  render(){
    return(
      <Container>
        <Button
          as={Link} to={ROUTES.PROFILE}
          content='Back' icon='chevron circle left' labelPosition='left' basic color="black"
          style={{ marginBottom: 40 }}
        />
        <Grid centered>
          <Grid.Column style={{ maxWidth: 800 }}>
            <Header as='h2' icon color='black' textAlign='center'>Organiser Profile</Header>
            <Form size='large' onSubmit={this.onSubmit}>
              <Form.Field>
                <label>Company Name</label>
                <input
                  fluid='true'
                  name='name'
                  type='text'
                  placeholder= 'Company Name'
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Company Website</label>
                <input
                  fluid='true'
                  name='website'
                  type='text'
                  placeholder= 'Company Website'
                  value={this.state.website}
                  onChange={this.onChange}
                />
              </Form.Field>
              <Button color='black' fluid size='large'>Save</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (organiserId, profile) => dispatch(editProfile(organiserId, profile))
  }
}

export default connect(null, mapDispatchToProps)(ProfileEditForm);
