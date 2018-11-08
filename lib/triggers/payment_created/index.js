/**
 * Trigger handler
 *
 * @param {object} plg - Pluga developer platform toolbox.
 * @param {object} plg.axios - [axios](https://github.com/axios/axios)
 * @param {object} plg.moment - [moment](https://github.com/moment/moment)
 *
 * @param {object} event - Event bundle to handle.
 * @param {object} event.meta - Pluga event meta data.
 * @param {string} event.meta.baseURI - Environment base URI.
 * @param {number} event.meta.lastReqAt - Last task handle timestamp.
 * @param {object} event.auth - Your app.json auth fields.
 * @param {object} event.input - Your meta.json fields.
 *
 * @returns {Promise} Promise object represents an array of resources to handle.
 */

const customer = (plg, event, customerId) => {
  if (customerId) {
    const headers = { access_token: `${event.auth.api_key}` };
    const url = `${event.meta.baseURI}/customers/${customerId}`;

    return plg.axios({
      method: 'GET',
      url: url,
      headers: headers
    }).then((res) => {
      return res.data;
    }).catch(function (error) {
      if (error.response) {
        throw new Error((error.response.data || {errors: [{description: 'Cliente não encotrado.'}]}).errors[0].description);
      } else {
        throw new Error(error.message);
      }
    });
  }
  return null;
}

const city = (plg, event, cityId) => {
  if (cityId) {
    const headers = { access_token: `${event.auth.api_key}` };
    const url = `${event.meta.baseURI}/cities/${cityId}`;

    return plg.axios({
      method: 'GET',
      url: url,
      headers: headers
    }).then((res) => {
      return res.data.name;
    }).catch(function (error) {
      if (error.response) {
        throw new Error((error.response.data || {errors: [{description: 'Cidade não encotrada.'}]}).errors[0].description);
      } else {
        throw new Error(error.message);
      }
    });
  }
  return null;
}

exports.handle = async (plg, event) => {
  let payment = event.payload;

  payment.asaasFee = Number((payment.value - payment.netValue).toFixed(2));
  payment.customer = await customer(plg, event, payment.customer);
  if (payment.customer) {
    payment.customer.city = await city(plg, event, payment.customer.city);
  }

  return payment;
};
