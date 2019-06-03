import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Feed, Button, Icon } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import LoaderComponent from '../LoaderComponent';

class Announcements extends Component {
  render(){
    const { announcements } = this.props;

    if(!announcements){
      return <LoaderComponent/>
    }

    return(
      <Container>
        <Header as='h2'>
          <span role="img" aria-label="loud-hailer">📢</span> Announcements
        </Header>
        <Feed>
        {
          announcements && announcements.map(announcement => {
            return(
              <Feed.Event key={announcement.id}>
                <Feed.Content>
                  <Button as={Link} to={`/announcements/edit/${announcement.id}`} basic color='black' floated='right'>
                    <Icon name='pencil' /> Edit
                  </Button>
                  <Feed.Summary>
                    <a style={{ color: 'black', fontWeight: 'bold' }}>{announcement.title}</a>
                    <Feed.Date>{announcement.createdAt}</Feed.Date>
                  </Feed.Summary>
                  <Feed.Extra text>
                    <div
                      style={{ marginTop: 20, marginBottom: 50 }}
                      dangerouslySetInnerHTML={{ __html: announcement.body }}
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
    announcements: state.firestore.ordered.announcements
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'announcements', orderBy: ['createdAt', 'desc'] }
  ])
)(Announcements);
