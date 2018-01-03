export function setView(view){
  // Return action
  return {
    // Unique identifier
    type: 'SET_VIEW',
    // Payload
    view: view
  }
}
