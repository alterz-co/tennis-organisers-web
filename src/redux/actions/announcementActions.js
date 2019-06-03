export const addAnnouncement = (announcement) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const organiser = getState().firebase.profile.name;
    const dateTime = String(new Date());
    const createdAt = dateTime.replace(" GMT+0800 (Singapore Standard Time)", "");

    const newAnnouncement = {
      ...announcement,
      organiser,
      createdAt
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
