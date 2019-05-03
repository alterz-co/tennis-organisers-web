import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Divider, Header, Icon, Segment, Button } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import LoaderComponent from '../../LoaderComponent';
import TournamentHeader from '../TournamentHeader';
import TournamentScheduleAdd from './TournamentScheduleAdd';

import * as ROUTES from '../../../constants/routes';

class TournamentSchedule extends Component {
  render(){
    const { tournamentId, tournament, schedule } = this.props;

    if(!this.props.auth.uid){
      return <Redirect to={ROUTES.LOGIN}/>
    }

    if(!schedule){
      return <LoaderComponent/>
    }

    return(
      <Container>
        <TournamentHeader tournamentId={tournamentId} tournament={tournament}/>
        <Divider/>
        <Header as='h2' textAlign='center'>Schedule</Header>
        <TournamentScheduleAdd tournamentId={tournamentId}/>
        {
          schedule && schedule.map(schedule => {
            return schedule.tournamentId === tournamentId && (
              <div key={schedule.id} style={{ marginTop: 50 }}>
                <Segment>
                  <Button as={Link} to={`/schedule/edit/${schedule.id}`} basic color='black' floated='right'>
                    <Icon name='pencil' /> Edit
                  </Button>
                  <div
                    style={{ marginTop: 20, marginBottom: 50 }}
                    dangerouslySetInnerHTML={{ __html: schedule.description }}
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
    schedule: state.firestore.ordered.schedule
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([ { collection: 'schedule' } ])
)(TournamentSchedule);
