import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';
import Landing from './components/landing/Landing';
import Terms from './components/landing/Terms';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ResetPassword from './components/auth/ResetPassword';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import ProfileEdit from './components/profile/ProfileEdit';
import TournamentAdd from './components/tournaments/TournamentAdd';
import TournamentDetails from './components/tournaments/TournamentDetails';
import TournamentEdit from './components/tournaments/TournamentEdit';
import TournamentUpdatesEdit from './components/tournaments/updates/TournamentUpdatesEdit';
import TournamentResultsEdit from './components/tournaments/results/TournamentResultsEdit';
import TournamentScheduleEdit from './components/tournaments/schedule/TournamentScheduleEdit';

import * as ROUTES from './constants/routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar/>
          <div style={{ paddingBottom: 200 }}>
            <Switch>
              <Route exact path={ROUTES.LANDING} component={Landing} />
              <Route exact path={ROUTES.TERMS} component={Terms} />
              <Route exact path={ROUTES.REGISTER} component={Register} />
              <Route exact path={ROUTES.LOGIN} component={Login} />
              <Route exact path={ROUTES.PASSWORD_RESET} component={ResetPassword} />
              <Route exact path={ROUTES.HOME} component={Home} />
              <Route path={ROUTES.PROFILE} component={Profile} exact/>
              <Route path={ROUTES.PROFILE_EDIT} component={ProfileEdit}/>
              <Route path={ROUTES.TOURNAMENT_ADD} component={TournamentAdd}/>
              <Route path={ROUTES.TOURNAMENT_EDIT} component={TournamentEdit}/>
              <Route path={ROUTES.TOURNAMENT_DETAILS} component={TournamentDetails}/>
              <Route path={ROUTES.UPDATES_EDIT} component={TournamentUpdatesEdit}/>
              <Route path={ROUTES.RESULTS_EDIT} component={TournamentResultsEdit}/>
              <Route path={ROUTES.SCHEDULE_EDIT} component={TournamentScheduleEdit}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
