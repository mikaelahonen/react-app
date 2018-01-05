const initialState = {
  view: 'list'
}

export default (state = initialState, action) => {
  switch (action.type){
    case 'SET_VIEW':
        var view = Object.assign({}, state, {view: action.view})
        return view
    default:
          return state;
  }
};
