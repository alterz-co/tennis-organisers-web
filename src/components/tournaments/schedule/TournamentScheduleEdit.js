import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import LoaderComponent from '../../LoaderComponent';
import TournamentScheduleEditForm from './TournamentScheduleEditForm';

class TournamentScheduleEdit extends Component {
  render(){
    const scheduleId = this.props.match.params.id;
    const { schedule } = this.props;

    if(!schedule){
      return <LoaderComponent/>
    }

    return(
      <TournamentScheduleEditForm scheduleId={scheduleId} schedule={schedule} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const fb = state.firestore.data.schedule;
  const schedule = fb ? fb[id] : null;

  return {
    schedule: schedule
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([ { collection: 'schedule' } ])
)(TournamentScheduleEdit);
