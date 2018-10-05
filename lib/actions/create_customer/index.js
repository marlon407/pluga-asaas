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
exports.handle = function (plg, event) {
    const headers = { access_token: `${event.auth.api_key}` };
    const url = event.meta.baseURI + '/customers/';

    return plg.axios({
        method: 'post',
        url: url,
        headers: headers,
        data: event.input
    }).then(({ data }) => {
      if (data.error) throw new Error(data.error);
      return data;
    });
};