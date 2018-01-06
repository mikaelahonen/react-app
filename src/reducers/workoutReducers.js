const initialState = {
  view: 'list',
  sets: [],
  excerciseFilter: undefined,
  expandedSet: undefined,
  modalSet: {},
  modalOpen: false,
}

export default (state = initialState, action) => {
  console.log(state)
  switch (action.type){

    case 'SET_VIEW':
        var x = Object.assign({}, state, {view: action.view});
        return x;

    case 'SET_SETS':
        var x = Object.assign({}, state, {sets: action.sets});
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
