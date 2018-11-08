const plg = require('pluga-plg');
const expect = require('chai').expect;
const trigger = require('../../lib/triggers/payment_refunded');

describe('Trigger: payment refunded', () => {
  it('Should retrive a refunded payment', (done) => {
    const event = {
      meta:{
        baseURI: process.env.BASE_URI
      },
      auth: {
        api_key: process.env.api_key
      },
      payload: { "object":"payment","id":"pay_059726142578","dateCreated":"2018-09-28","customer":"cus_000000018662","value":400.00,"netValue":393.04,"originalValue":null,"interestValue":0.00,"description":null,"billingType":"BOLETO","status":"REFUNDED","dueDate":"2018-10-27","originalDueDate":"2018-10-27","paymentDate":"2018-10-15","clientPaymentDate":"2018-10-27","invoiceUrl":"https://sandbox.asaas.com/i/059726142578","invoiceNumber":"00146525","externalReference":null,"deleted":false,"anticipated":false,"creditDate":"2018-10-15","estimatedCreditDate":null,"bankSlipUrl":"https://sandbox.asaas.com/b/pdf/059726142578","lastInvoiceViewedDate":null,"lastBankSlipViewedDate":null}
    };

    trigger.handle(plg, event).then((payment) => {
        expect(payment).to.have.property("id");
        expect(payment.status).to.eq("REFUNDED");
        expect(payment.asaasFee).to.eq(6.96);
        expect(payment.customer).to.have.property("id");

      done();
    }).catch(done);
  });
});