const plg = require('pluga-plg');
const expect = require('chai').expect;
const trigger = require('../../lib/triggers/payment_created');

describe('Trigger: deal lost', () => {
  it('Should get a list of payments', (done) => {
    const event = {
    meta:{
        lastReqAt: parseInt(process.env.LAST_REQ_AT),
        baseURI: process.env.BASE_URI
        },
        auth: {
        api_key: process.env.api_key
        },
    };

    trigger.handle(plg, event).then((results) => {
      results.forEach((payment) => {
        expect(payment).to.have.property("id");
      });

      done();
    }).catch(done);
  });
});