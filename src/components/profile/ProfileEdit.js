import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import LoaderComponent from '../LoaderComponent';
import ProfileEditForm from './ProfileEditForm';

class ProfileEdit extends Component {
  render(){
    if(!this.props.organiser){
      return <LoaderComponent/>
    }

    return <ProfileEditForm organiserId={this.props.match.params.id} organiser={this.props.organiser}/>
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const organisers = state.firestore.data.organisers;
  const organiser = organisers ? organisers[id] : null;

  return {
    organiser: organiser
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([ { collection: 'organisers' } ])
)(ProfileEdit);
