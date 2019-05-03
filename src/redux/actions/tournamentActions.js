// ****************************** //
// ************ CRUD ************ //
// ****************************** //

export const addTournament = (tournament) => {
  return (dispatch, getState, { getFirestore }) => {
    const profile = getState().firebase.profile;
    const organiserId = getState().firebase.auth.uid;
    const firestore = getFirestore();

    firestore.collection('tournaments').add({
      ...tournament,
      organiserId: organiserId,
      organiser: profile.name,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'ADD_TOURNAMENT_SUCCESS', payload: 'Your tournament has been successfully added.' });
    }).catch((err) => {
      dispatch({ type: 'ADD_TOURNAMENT_ERROR', payload: err.message });
    });
  }
}

export const editTournament = (tournamentId, tournament) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('tournaments').doc(tournamentId).update(tournament);
  }
}

// ********************************** //
// ************ SCHEDULE ************ //
// ********************************** //

export const addSchedule = (tournamentId, schedule) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const organiser = getState().firebase.profile.name;

    const newSchedule = {
      ...schedule,
      organiser,
      tournamentId,
      createdAt: new Date()
    }

    firestore.collection('schedule').add(newSchedule);
  }
}

export const editSchedule = (scheduleId, schedule) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('schedule').doc(scheduleId).update(schedule);
  }
}

// ********************************* //
// ************ UPDATES ************ //
// ********************************* //

export const addUpdate = (tournamentId, update) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const organiser = getState().firebase.profile.name;
    const body = update.body;

    const newUpdate = {
      body,
      name: organiser,
      tournamentId,
      createdAt: new Date()
    }

    firestore.collection('updates').add(newUpdate);
  }
}

export const editUpdate = (updateId, update) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('updates').doc(updateId).update(update);
  }
}

// ********************************* //
// ************ RESULTS ************ //
// ********************************* //

export const addResult = (tournamentId, result) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const newResult = {
      ...result,
      tournamentId,
      createdAt: new Date()
    }

    firestore.collection('results').add(newResult);
  }
}

export const editResult = (resultId, result) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('results').doc(resultId).update(result);
  }
}
