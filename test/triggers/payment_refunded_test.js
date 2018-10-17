const plg = require('pluga-plg');
const expect = require('chai').expect;
const trigger = require('../../lib/triggers/payment_refunded');

describe('Trigger: payment refunded', () => {
  it('Should get a list of refunded payments', (done) => {
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
        expect(payment.customer).to.have.property("id");
        expect(payment.status).to.eq("REFUNDED");
      });

      done();
    }).catch(done);
  });
});