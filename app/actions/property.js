/*
 * action types
 */
export const ADD_PROPERTY = 'ADD_PROPERTY'


/*
 * action creators
 */
export function addProperty(property) {
  return {
    type: ADD_PROPERTY,
    property
  }
}
