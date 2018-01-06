export function setView(view){
  // Return action
  return {
    // Unique identifier
    type: 'VIEW',
    // Payload
    view: view
  }
}

export function setSets(sets){
  // Return action
  return {
    // Unique identifier
    type: 'SETS',
    // Payload
    sets: sets
  }
}

export function setWorkout(workout){
  // Return action
  return {
    // Unique identifier
    type: 'WORKOUT',
    // Payload
    workout: workout
  }
}

export function excerciseFilter(excerciseId){
  return {
    type: 'EXCERCISE_FILTER',
    excerciseId: excerciseId,
  }
}

export function setExpandedSet(setId){

  var expandedSet = undefined;
  if(setId != undefined){
    expandedSet = setId
  }

  return {
    type: 'EXPANDED_SET',
    expandedSet: expandedSet,
  }
}

export function modalSet(modalSet){
  return {
    type: 'MODAL_SET',
    modalSet: modalSet,
  }
}

export function modalOpen(isOpen){
  return {
    type: 'MODAL_OPEN',
    isOpen: isOpen,
  }
}
