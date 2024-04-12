class RequestHandler {
  constructor() {
    this.token = document.head.querySelector('meta[name="csrf-token"]').content;
    this.jsonHeaders = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'X-CSRF-TOKEN': token,
    };
  }

  /**
   * Perform all get requests
   * @param {String} url - endpoint to make request
   * @param {React.Dispatch<React.SetStateAction<any>>} stateSetter - react state to receive data
   */
  get(url, stateSetter) {
    this.fetch({url}, stateSetter);
  }

  // TODO: Document the post request
  /**
   * 
   * @param {*} url 
   * @param {*} body 
   * @param {*} stateSetter 
   */
  post(url, body, stateSetter) {
    this.fetch({url, method: 'POST', body}, stateSetter);
  }

  // TODO: Document the patch request
  /**
   * 
   * @param {*} url 
   * @param {*} body 
   * @param {*} stateSetter 
   */
  patch(url, body, stateSetter) {
    this.fetch({url, method: 'PATCH', body}, stateSetter);
  }
  
  // TODO: Document the put request
  /**
   * 
   * @param {*} url 
   * @param {*} body 
   * @param {*} stateSetter 
   */
  put(url, body, stateSetter) {
    this.fetch({url, method: 'PUT', body}, stateSetter);
  }

  // TODO: Document the delete request
  /**
   * 
   * @param {*} url 
   * @param {*} stateSetter 
   */
  delete(url, stateSetter = null) {
    this.fetch({url, method: 'DELETE'}, stateSetter);
  }

  // TODO: Document the general fetch request
  /**
   * 
   * @param {*} param0 
   * @param {*} stateSetter 
   */
  async fetch ({url, method = 'GET', body = null}, stateSetter = null) {
    try {
      let resp = null;
      if (body) {
        resp = await fetch(url, {
          method: method,
          headers: jsonHeaders,
          body: (
                  methodToSend === 'POST' ||
                  methodToSend === 'PUT' ||
                  methodToSend === 'PATCH'
                ) && body
                ? JSON.stringify(body)
                : null,
        });
      } else {
        resp = await fetch(url, {
          method: method,
          headers: jsonHeaders,
        });
      }

      if (resp.ok) {
        const jsonResp = await resp.json();
        if (stateSetter) stateSetter(jsonResp);
      } else {
        const errorResp = await resp.json();
        console.error(errorResp)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default new RequestHandler();