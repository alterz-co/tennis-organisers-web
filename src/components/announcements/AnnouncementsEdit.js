import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import LoaderComponent from '../LoaderComponent';
import AnnouncementsEditForm from './AnnouncementsEditForm';

class AnnouncementsEdit extends Component {
  render(){
    const announcementId = this.props.match.params.id;
    const { announcement } = this.props;

    if(!announcement){
      return <LoaderComponent/>
    }

    return(
      <AnnouncementsEditForm announcementId={announcementId} announcement={announcement} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const announcements = state.firestore.data.announcements;
  const announcement = announcements ? announcements[id] : null;

  return {
    announcement: announcement
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'announcements' }
  ])
)(AnnouncementsEdit);
