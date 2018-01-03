export default (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return state + action.increment;
  case 'DECREMENT':
    return state - action.decrement;
  default:
    return state;
  }
}
