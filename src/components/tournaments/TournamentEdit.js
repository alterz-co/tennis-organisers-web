import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import LoaderComponent from '../LoaderComponent';
import TournamentEditForm from './TournamentEditForm';

class TournamentEdit extends Component {
  render(){
    const tournamentId = this.props.match.params.id;
    const { tournament } = this.props;

    if(!tournament){
      return <LoaderComponent/>
    }

    return(
      <TournamentEditForm tournamentId={tournamentId} tournament={tournament} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const tournaments = state.firestore.data.tournaments;
  const tournament = tournaments ? tournaments[id] : null;

  return {
    tournament: tournament
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'tournaments' }
  ])
)(TournamentEdit);
