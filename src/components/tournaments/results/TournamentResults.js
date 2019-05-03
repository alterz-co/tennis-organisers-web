import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Divider, Header, Icon, Segment, Button } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import LoaderComponent from '../../LoaderComponent';
import TournamentHeader from '../TournamentHeader';
import TournamentResultsAdd from './TournamentResultsAdd';

import * as ROUTES from '../../../constants/routes';

class TournamentResults extends Component {
  render(){
    const { tournamentId, tournament, results } = this.props;

    if(!this.props.auth.uid){
      return <Redirect to={ROUTES.LOGIN}/>
    }

    if(!results){
      return <LoaderComponent/>
    }

    return(
      <Container>
        <TournamentHeader tournamentId={tournamentId} tournament={tournament}/>
        <Divider/>
        <Header as='h2' textAlign='center'>Results</Header>
        <TournamentResultsAdd tournamentId={tournamentId}/>
        {
          results && results.map(result => {
            return result.tournamentId === tournamentId && (
              <div key={result.id} style={{ marginTop: 50 }}>
                <Divider horizontal>
                  <Header as='h4'>
                    <Icon name='calendar alternate' />{result.date}
                  </Header>
                </Divider>
                <Segment>
                  <Button as={Link} to={`/results/edit/${result.id}`} basic color='black' floated='right'>
                    <Icon name='pencil' /> Edit
                  </Button>
                  <div
                    style={{ marginTop: 20, marginBottom: 50 }}
                    dangerouslySetInnerHTML={{ __html: result.description }}
                  >
                  </div>
                </Segment>
              </div>
            )
          })
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    results: state.firestore.ordered.results
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'results', orderBy: ['createdAt', 'desc'] }
  ])
)(TournamentResults);
