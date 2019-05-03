import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import LoaderComponent from '../../LoaderComponent';
import TournamentUpdatesEditForm from './TournamentUpdatesEditForm';

class TournamentUpdatesEdit extends Component {
  render(){
    const updateId = this.props.match.params.id;
    const { update } = this.props;

    if(!update){
      return <LoaderComponent/>
    }

    return(
      <TournamentUpdatesEditForm updateId={updateId} update={update} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const updates = state.firestore.data.updates;
  const update = updates ? updates[id] : null;

  return {
    update: update
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'updates' }
  ])
)(TournamentUpdatesEdit);
