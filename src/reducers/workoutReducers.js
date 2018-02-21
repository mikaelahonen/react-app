const initialState = {
  view: 'quick',
  sets: [],
  workout: {},
  excerciseFilter: undefined,
  expandedSet: undefined,
  modalSet: {},
  modalOpen: false,
}

export default (state = initialState, action) => {
  switch (action.type){

    case 'VIEW':
        var x = Object.assign({}, state, {view: action.view});
        return x;

    case 'SETS':
        var x = Object.assign({}, state, {sets: action.sets});
        return x;

    case 'WORKOUT':
        var x = Object.assign({}, state, {workout: action.workout});
        return x;

    case 'EXCERCISE_FILTER':
      var x = Object.assign({}, state, {excerciseFilter: action.excerciseId});
      return x;

    case 'EXPANDED_SET':
      //If previous and current are the same, set to undefined
      var expandedSet = initialState.expandedSet;
      if(action.expandedSet!=state.expandedSet){
        expandedSet = action.expandedSet
      }
      var x = Object.assign({}, state, {expandedSet: expandedSet});
      return x;

    case 'MODAL_SET':
      var x = Object.assign({}, state, {modalSet: action.modalSet});
      return x;

    case 'MODAL_OPEN':
      var x = Object.assign({}, state, {modalOpen: action.isOpen});
      return x;

    default:
      return state;
  }
};
