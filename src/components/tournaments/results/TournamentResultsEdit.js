import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import LoaderComponent from '../../LoaderComponent';
import TournamentResultsEditForm from './TournamentResultsEditForm';

class TournamentResultsEdit extends Component {
  render(){
    const resultId = this.props.match.params.id;
    const { result } = this.props;

    if(!result){
      return <LoaderComponent/>
    }

    return(
      <TournamentResultsEditForm resultId={resultId} result={result} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const results = state.firestore.data.results;
  const result = results ? results[id] : null;

  return {
    result: result
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'results' }
  ])
)(TournamentResultsEdit);
