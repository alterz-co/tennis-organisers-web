
const tournamentReducer = (state={}, action) => {
  switch(action.type){
    case 'ADD_TOURNAMENT_SUCCESS':
      return { ...state, addTournamentSuccess: action.payload }
    case 'ADD_TOURNAMENT_ERROR':
      return { ...state, addTournamentError: action.payload }
    default:
      return state;
  }
}

export default tournamentReducer;
