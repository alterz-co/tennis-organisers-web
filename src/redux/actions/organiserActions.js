export const editProfile = (organiserId, profile) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('organisers').doc(organiserId).update(profile);
  }
}
