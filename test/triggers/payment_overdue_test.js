const plg = require('pluga-plg');
const expect = require('chai').expect;
const trigger = require('../../lib/triggers/payment_overdue');

describe('Trigger: payment overdue', () => {
  it('Should retrive a overdue payment', (done) => {
    const event = {
      meta:{
        baseURI: process.env.BASE_URI
      },
      auth: {
        api_key: process.env.api_key
      },
      payload: {"object":"payment","id":"pay_784150339676","dateCreated":"2018-09-27","customer":"cus_000000018615","value":120.00,"netValue":113.04,"originalValue":null,"interestValue":null,"description":null,"billingType":"CREDIT_CARD","confirmedDate":null,"creditCard":{"creditCardNumber":"5555","creditCardBrand":"MASTERCARD"},"status":"OVERDUE","dueDate":"2018-10-18","originalDueDate":"2018-10-18","paymentDate":null,"clientPaymentDate":null,"invoiceUrl":"https://sandbox.asaas.com/i/784150339676","invoiceNumber":"00146426","externalReference":null,"deleted":false,"anticipated":false,"creditDate":null,"estimatedCreditDate":null,"bankSlipUrl":null,"lastInvoiceViewedDate":null,"lastBankSlipViewedDate":null,"discount":{"value":0.00,"limitDate":null,"dueDateLimitDays":0,"type":"PERCENTAGE"},"fine":{"value":0.00,"type":"PERCENTAGE"},"interest":{"value":0.00,"type":"PERCENTAGE"}}
    };

    trigger.handle(plg, event).then((payment) => {
      expect(payment).to.have.property("id");
      expect(payment.status).to.eq("OVERDUE");
      expect(payment.customer).to.have.property("id");

      done();
    }).catch(done);
  });
});