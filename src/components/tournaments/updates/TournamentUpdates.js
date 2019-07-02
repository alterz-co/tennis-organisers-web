import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Divider, Header, Feed, Button, Icon } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import LoaderComponent from '../../LoaderComponent';
import TournamentHeader from '../TournamentHeader';
import TournamentUpdatesAdd from './TournamentUpdatesAdd';
import _ from 'lodash';
import moment from 'moment';

import * as ROUTES from '../../../constants/routes';

class TournamentUpdates extends Component {
  render(){
    const { tournamentId, tournament, updates } = this.props;

    if(!this.props.auth.uid){
      return <Redirect to={ROUTES.LOGIN}/>
    }

    if(!updates){
      return <LoaderComponent/>
    }

    const updatesCreatedAt = _.orderBy(updates, function(o) {
      return new moment(o.createdAt).format('YYYYMMDD');
    }, ['desc']);

    return(
      <Container>
        <TournamentHeader tournamentId={tournamentId} tournament={tournament}/>
        <Divider/>
        <Header as='h2' textAlign='center'>Updates</Header>
        <TournamentUpdatesAdd tournamentId={tournamentId}/>
        <Feed>
        {
          updatesCreatedAt && updatesCreatedAt.map(update => {
            return update.tournamentId === tournamentId && (
              <Feed.Event key={update.id} style={{ padding: 20 }}>
                <Feed.Content>
                  <Button as={Link} to={`/updates/edit/${update.id}`} basic color='black' floated='right'>
                    <Icon name='pencil' /> Edit
                  </Button>
                  <Feed.Summary>
                    <Feed.User style={{ color: 'black', fontSize: 18 }}>{update.name}</Feed.User>
                  </Feed.Summary>
                  <Feed.Meta>
                    <Feed.Date>{update.createdAt}</Feed.Date>
                  </Feed.Meta>
                  <Feed.Extra text>
                    <div
                      style={{ marginTop: 20, marginBottom: 50 }}
                      dangerouslySetInnerHTML={{ __html: update.body }}
                    >
                    </div>
                  </Feed.Extra>
                </Feed.Content>
              </Feed.Event>
            )
          })
        }
        </Feed>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    updates: state.firestore.ordered.updates
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'updates', orderBy: ['createdAt', 'desc'] }
  ])
)(TournamentUpdates);
