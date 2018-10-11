/**
 * Action handler
 *
 * @param {object} plg - Pluga developer platform toolbox.
 * @param {object} plg.axios - [axios](https://github.com/axios/axios)
 *
 * @param {object} event - Event bundle to handle.
 * @param {object} event.meta - Pluga event meta data.
 * @param {string} event.meta.baseURI - Environment base URI.
 * @param {object} event.auth - Your app.json auth fields.
 * @param {object} event.input - Your meta.json fields.
 *
 * @returns {Promise} Promise object represents the action result.
 */

const createCustomer = (plg, event) => {
    const headers = { access_token: `${event.auth.api_key}` };
    const url = `${event.meta.baseURI}/customers/`;

    return plg.axios({
        method: 'POST',
        url: url,
        headers: headers,
        data: event.input
      }).then((res) => {
          if (res.errors) throw new Error(res.errors[0].description);
          return res;
      });
}

const updateCustomer = (plg, event, customer_id) => {
    const headers = { access_token: `${event.auth.api_key}` };
    const url = `${event.meta.baseURI}/customers/${customer_id}`;

    return plg.axios({
        method: 'POST',
        url: url,
        headers: headers,
        data: event.input
      }).then((res) => {
          if (res.errors) throw new Error(res.errors[0].description);
          return res;
      });
}


exports.handle = (plg, event) => {
  const headers = { access_token: `${event.auth.api_key}` };
  const url = `${event.meta.baseURI}/customers?cpfCnpj=${event.input.cpf_cnpj}`;

  return plg.axios({
    method: 'GET',
    url: url,
    headers: headers
  }).then((res) => {
    if(res.totalCount == 0) {
      return createCustomer(plg, event);
    } else {
      const customer_id = res.data[0].id
      return updateCustomer(plg, event, customer_id);
    }
  });
};