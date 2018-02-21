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
  return {
    type: 'SETS',
    sets: sets
  }
}

export function setWorkout(workout){
  return {
    type: 'WORKOUT',
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

export function saveModalSet(set){
  return {
    type: 'SAVE_MODAL_SET',
    set: set,
  }
}

export function modalOpen(isOpen){
  return {
    type: 'MODAL_OPEN',
    isOpen: isOpen,
  }
}
