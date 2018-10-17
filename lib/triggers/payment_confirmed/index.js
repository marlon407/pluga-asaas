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
      return res.data
    }).catch(function (error) {
      if (error.response) {
        throw new Error(error.response.data.errors[0].description);
      } else {
        throw new Error(error.message);
      }
    });
  }
  return null;
}
      
const confirmedPayments = async (plg, event, offset) => {
  const headers = { access_token: `${event.auth.api_key}` };
  const url = event.meta.baseURI + '/payments/';
  const limit = 50;

  return plg.axios({
      url: url,
      headers: headers,
      method: 'GET',
      params: {
      'paymentDate': new Date().toISOString(),
      'status': 'CONFIRMED',
      'limit': limit,
      'offset': offset
      }  
  }).then(async ({data}) => {

      let payments = data.data;
      for (let payment of payments) {
      payment.customer = await customer(plg, event, payment.customer);
      }
      
      if (data.hasMore) {
      const newOffset = offset + limit;
      const morePayments = await confirmedPayments(plg, event, newOffset);
      payments.concat(morePayments);
      }
      
      return payments;
  });
}
  
exports.handle = async (plg, event) => {
  const allPayments = await confirmedPayments(plg, event, 0);
  console.log("Number of payments confirmed today", allPayments.length);  
  return allPayments;
};
    