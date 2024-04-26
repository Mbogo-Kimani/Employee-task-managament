import requestHandler from '../services/requestHandler';

// TODO: Document all util functions
/**
 *
 * @param {*} url
 * @param {*} stateSetter
 */
export function handlePage(url, stateSetter = () => {}) {
  if (url) {
    requestHandler.get(url, stateSetter);
  }
}

/**
 *
 * @param {*} errors
 * @param {*} key
 * @returns
 */
export function displayErrors(errors, key) {
  if (errors[key] && Array.isArray(errors[key])) {
    return errors[key][0];
  } else if (
    errors.errors &&
    errors.errors[key] &&
    Array.isArray(errors.errors[key])
  ) {
    return errors.errors[key][0];
  } else if (key === 'message') {
    return errors[key];
  }
}

/**
 *
 * @param {*} event
 * @param {*} state
 * @param {*} stateSetter
 */
export function handleFormChange(event, state, stateSetter) {
  stateSetter({
    ...state,
    [event.target.name]: event.target.value,
  });
}
