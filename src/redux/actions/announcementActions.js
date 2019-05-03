export const addAnnouncement = (announcement) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const organiser = getState().firebase.profile.name;

    const newAnnouncement = {
      ...announcement,
      organiser,
      createdAt: new Date()
    }

    firestore.collection('announcements').add(newAnnouncement);
  }
}

export const editAnnouncement = (announcementId, announcement) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('announcements').doc(announcementId).update(announcement);
  }
}
