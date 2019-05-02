import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as ROUTES from '../../constants/routes';

class Profile extends Component {
  render(){
    const { auth, profile } = this.props;

    if(!auth.uid){
      return <Redirect to={ROUTES.LOGIN}/>
    }

    return(
      <Container textAlign='center' style={{ width: 800 }}>
        <Header as='h2'>{profile.name}</Header>
        <p>Website: {profile.website}</p>
        <div style={{ marginTop: 50 }}>
          <Button basic color='black' fluid as={Link} to={`/profile/${auth.uid}`}>
            Edit Profile
          </Button>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Profile);
