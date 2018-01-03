export function makeIncrement(num){
  // Return action
  return {
    // Unique identifier
    type: 'INCREMENT',
    // Payload
    increment: num
  }
}

export function makeDecrement(num){
  // Return action
  return {
    // Unique identifier
    type: 'DECREMENT',
    // Payload
    decremenent: num
  }
}
