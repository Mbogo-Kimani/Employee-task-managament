class RequestHandler {
  constructor() {
    this.token = document.head.querySelector('meta[name="csrf-token"]').content;
    this.jsonHeaders = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'X-CSRF-TOKEN': this.token,
    };
  }

  /**
   * Perform all get requests
   * @param {String} url - endpoint to make request
   * @param {React.Dispatch<React.SetStateAction<any>>} stateSetter - react state to receive data
   * @param {React.Dispatch<React.SetStateAction<any>>} errorSetter - react state to receive errors if there
   * @param {React.Dispatch<React.SetStateAction<any>>} loaderSetter - react state to set loading to true or false accordingly
   */
  get(url, stateSetter = null, errorSetter = null, loaderSetter = null) {
    this.fetch({url}, stateSetter, errorSetter, loaderSetter);
  }

  // TODO: Document the post request
  /**
   * 
   * @param {*} url 
   * @param {*} body 
   * @param {*} stateSetter 
   * @param {*} errorSetter 
   * @param {React.Dispatch<React.SetStateAction<any>>} loaderSetter - react state to set loading to true or false accordingly
   */
  post(url, body = null, stateSetter = null, errorSetter = null, loaderSetter = null) {
    this.fetch({url, method: 'POST', body}, stateSetter, errorSetter, loaderSetter);
  }

  // TODO: Document the patch request
  /**
   * 
   * @param {*} url 
   * @param {*} body 
   * @param {*} stateSetter 
   * @param {*} errorSetter 
   * @param {React.Dispatch<React.SetStateAction<any>>} loaderSetter - react state to set loading to true or false accordingly
   */
  patch(url, body = null, stateSetter = null, errorSetter = null, loaderSetter = null) {
    this.fetch({url, method: 'PATCH', body}, stateSetter, errorSetter, loaderSetter);
  }
  
  // TODO: Document the put request
  /**
   * 
   * @param {*} url 
   * @param {*} body 
   * @param {*} stateSetter 
   * @param {*} errorSetter 
   * @param {React.Dispatch<React.SetStateAction<any>>} loaderSetter - react state to set loading to true or false accordingly
   */
  put(url, body = null, stateSetter = null, errorSetter = null, loaderSetter = null) {
    this.fetch({url, method: 'PUT', body}, stateSetter, errorSetter, loaderSetter);
  }

  // TODO: Document the delete request
  /**   * @param {React.Dispatch<React.SetStateAction<any>>} loaderSetter - react state to set loading to true or false accordingly

   * 
   * @param {*} url 
   * @param {*} stateSetter 
   * @param {*} errorSetter 
   * @param {React.Dispatch<React.SetStateAction<any>>} loaderSetter - react state to set loading to true or false accordingly
   */
  delete(url, stateSetter = null, errorSetter = null, loaderSetter = null) {
    this.fetch({url, method: 'DELETE'}, stateSetter, errorSetter, loaderSetter);
  }

  // TODO: Document the general fetch request
  /**
   * 
   * @param {*} param0 
   * @param {*} stateSetter 
   * @param {*} errorSetter 
   * @param {React.Dispatch<React.SetStateAction<any>>} loaderSetter - react state to set loading to true or false accordingly
   * @returns 
   */
  async fetch ({url, method = 'GET', body}, stateSetter, errorSetter, loaderSetter) {
    if (loaderSetter) loaderSetter(true);
    try {
      let resp = null;
      if (body) {
        resp = await fetch(url, {
          method: method,
          headers: this.jsonHeaders,
          body: (
                  method === 'POST' ||
                  method === 'PUT' ||
                  method === 'PATCH'
                ) && body
                ? JSON.stringify(body)
                : null,
        });
      } else {
        resp = await fetch(url, {
          method: method,
          headers: this.jsonHeaders,
        });
      }

      if (resp.ok) {
        const jsonResp = await resp.json();
        if (stateSetter) stateSetter(jsonResp || true);
      } else {
        const errorResp = await resp.json();
        console.error(errorResp);
        if (errorSetter) errorSetter(errorResp);
      }
      if (loaderSetter) loaderSetter(false);
    } catch (error) {
      console.error(error);
      if (errorSetter) errorSetter(error);
      if (loaderSetter) loaderSetter(false);
    }
  }
}

export default new RequestHandler();
