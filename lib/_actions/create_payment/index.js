/**
 * Action handler
 *
 * @param {object} plg - Pluga developer platform toolbox.
 * @param {object} plg.axios - [axios](https://github.com/axios/axios)
 * @param {object} plg.moment - [moment](https://github.com/moment/moment)
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
    const headers = { access_token: `${event.auth.access_token}` };
    const url = `${event.meta.baseURI}/customers/`;

    return plg.axios({
        method: 'POST',
        url: url,
        headers: headers,
        data: event.input.customer
      }).then((res) => {
          const response = res.data;
          if (response.errors) throw new Error(response.errors[0].description);
          return response;
      }).catch(function (error) {
          if (error.response) {
              throw new Error(error.response.data.errors[0].description);
          } else {
              throw new Error(error.message);
          }
      });
}

const updateCustomer = (plg, event, customer_id) => {
    const headers = { access_token: `${event.auth.access_token}` };
    const url = `${event.meta.baseURI}/customers/${customer_id}`;

    return plg.axios({
        method: 'POST',
        url: url,
        headers: headers,
        data: event.input.customer
      }).then((res) => {
          const response = res.data;
          if (response.errors) throw new Error(response.errors[0].description);
          return response;
      }).catch(function (error) {
          if (error.response) {
              throw new Error(error.response.data.errors[0].description);
          } else {
              throw new Error(error.message);
          }
      });
}

const getCustomer = async function(plg, event) {
  const headers = { access_token: `${event.auth.access_token}` };
  const url = `${event.meta.baseURI}/customers?cpfCnpj=${event.input.customer.cpf_cnpj}`;

  return plg.axios({
    method: 'GET',
    url: url,
    headers: headers
  }).then((res) => {
    const response = res.data;
    if(response.totalCount == 0) {
      return createCustomer(plg, event);
    } else {
      const customer_id = response.data[0].id
      return updateCustomer(plg, event, customer_id);
    }
  }).catch(function (error) {
      if (error.response) {
          throw new Error(error.response.data.errors[0].description);
      } else {
          throw new Error(error.message);
      }
  });
};


exports.handle = async function (plg, event) {
    const headers = { access_token: `${event.auth.access_token}` };
    const url = event.meta.baseURI + '/payments/';

    const customer = await getCustomer(plg, event);

    let payment = event.input;
    payment.customer = customer.id

    return plg.axios({
        method: 'post',
        url: url,
        headers: headers,
        data: payment
    }).then(({ data }) => {
        if (data.errors) throw new Error(data.errors[0].description);
        return data;
    }).catch(function (error) {
        if (error.response) {
            throw new Error(error.response.data.errors[0].description);
        } else {
            throw new Error(error.message);
        }
    });
};