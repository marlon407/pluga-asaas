const plg = require('pluga-plg');
const expect = require('chai').expect;
const trigger = require('../../lib/triggers/payment_overdue');

describe('Trigger: payment overdue', () => {
  it('Should get a list of payments overdue', (done) => {
    const event = {
      meta:{
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
        expect(payment.status).to.eq("OVERDUE");
      });

      done();
    }).catch(done);
  });
});