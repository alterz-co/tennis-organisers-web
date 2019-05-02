export const register = (newOrganiser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newOrganiser.email,
      newOrganiser.password
    ).then(res => {
      return firestore.collection('organisers').doc(res.user.uid).set({
        name: newOrganiser.name,
        email: newOrganiser.email,
        website: '',
        type: 'organiser'
      });
    }).then(() => {
      dispatch({ type: 'REGISTER_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'REGISTER_ERROR', payload: err.message });
    });

  }
}

export const login = (creds) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
    .then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'LOGIN_ERROR', payload: err.message });
    });
  }
}

export const logout = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'LOGOUT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'LOGOUT_ERROR', payload: err.message });
    });
  }
}

export const resetPassword = (email) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().sendPasswordResetEmail(email).then(() => {
      dispatch({ type: 'PASSWORD_RESET_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'PASSWORD_RESET_ERROR', payload: err.message });
    });
  }
}
