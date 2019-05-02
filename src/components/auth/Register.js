import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/authActions';

import * as ROUTES from '../../constants/routes';

class Register extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    error: ''
  }

  onChange = event => {
    // console.log('onChange ', event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  isFormValid = () => {
    if(this.isFormEmpty(this.state)){
      this.setState({ error: 'Fill in all fields with asterisk' });
      return false;
    } else {
      return true;
    }
  }

  isFormEmpty = ({ name, email, password }) => {
    return name === '' || email === '' || password === '';
  }

  onSubmit = event => {
    event.preventDefault();
    if(this.isFormValid()){
      this.setState({ error: '' });
      const newOrganiser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
      this.props.register(newOrganiser);
      this.setState({
        name: '',
        email: '',
        password: ''
      });
    }
  }

  render(){
    if(this.props.auth.uid){
      return <Redirect to={ROUTES.HOME}/>
    }

    return(
      <Grid centered>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' icon color='black' textAlign='center' style={{ marginBottom: 50 }}>
            Register for Alterz
          </Header>
          <Form size='large' onSubmit={this.onSubmit}>
            <Form.Field>
              <label>Company Name <span style={{ color: 'red' }}>*</span></label>
              <input
                fluid='true'
                name='name'
                type='text'
                placeholder='Singapore Tennis Association'
                value={this.state.name}
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Company Email Address <span style={{ color: 'red' }}>*</span></label>
              <input
                fluid='true'
                name='email'
                type='email'
                placeholder='info@sta.com'
                value={this.state.email}
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Password <span style={{ color: 'red' }}>*</span></label>
              <input
                fluid='true'
                name='password'
                type='password'
                value={this.state.password}
                onChange={this.onChange}
              />
            </Form.Field>
            <Button color='black' fluid size='large'>Register</Button>
            {this.state.error && <p>{this.state.error.message}</p>}
          </Form>
          <p style={{ marginTop: 20, textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} style={{ color: '#acacac', fontWeight: 'bold' }}>Login</Link>
          </p>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (newOrganiser) => dispatch(register(newOrganiser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
