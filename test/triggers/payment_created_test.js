const plg = require('pluga-plg');
const expect = require('chai').expect;
const trigger = require('../../lib/triggers/payment_created');

describe('Trigger: payment created', () => {
  it('Should retrive a new payment', (done) => {
    const event = {
      meta:{
        baseURI: process.env.BASE_URI
      },
      auth: {
        api_key: process.env.api_key
      },
      payload: {"object":"payment","id":"pay_445582527532","dateCreated":"2018-10-19","customer":"cus_000000018615","value":33.33,"netValue":26.37,"originalValue":null,"interestValue":null,"description":"","billingType":"BOLETO","status":"PENDING","dueDate":"2018-10-23","originalDueDate":"2018-10-23","paymentDate":null,"clientPaymentDate":null,"invoiceUrl":"https://sandbox.asaas.com/i/445582527532","invoiceNumber":"00148303","externalReference":null,"deleted":false,"anticipated":false,"creditDate":null,"estimatedCreditDate":null,"bankSlipUrl":"https://sandbox.asaas.com/b/pdf/445582527532","lastInvoiceViewedDate":null,"lastBankSlipViewedDate":null,"discount":{"value":0.00,"limitDate":null,"dueDateLimitDays":0,"type":"PERCENTAGE"},"fine":{"value":0.00,"type":"PERCENTAGE"},"interest":{"value":0.00,"type":"PERCENTAGE"}}
    };

    trigger.handle(plg, event).then((payment) => {
      expect(payment).to.have.property("id");
      expect(payment.status).to.eq("PENDING");
      expect(payment.customer).to.have.property("id");

      done();
    }).catch(done);
  });

  it('Should return a error for not existing customer', (done) => {
    const event = {
      meta:{
        baseURI: process.env.BASE_URI
      },
      auth: {
        api_key: process.env.api_key
      },
      payload: {"object":"payment","id":"pay_445582527532","dateCreated":"2018-10-19","customer":"cus_123","value":33.33,"netValue":26.37,"originalValue":null,"interestValue":null,"description":"","billingType":"BOLETO","status":"PENDING","dueDate":"2018-10-23","originalDueDate":"2018-10-23","paymentDate":null,"clientPaymentDate":null,"invoiceUrl":"https://sandbox.asaas.com/i/445582527532","invoiceNumber":"00148303","externalReference":null,"deleted":false,"anticipated":false,"creditDate":null,"estimatedCreditDate":null,"bankSlipUrl":"https://sandbox.asaas.com/b/pdf/445582527532","lastInvoiceViewedDate":null,"lastBankSlipViewedDate":null,"discount":{"value":0.00,"limitDate":null,"dueDateLimitDays":0,"type":"PERCENTAGE"},"fine":{"value":0.00,"type":"PERCENTAGE"},"interest":{"value":0.00,"type":"PERCENTAGE"}}
    };

    trigger.handle(plg, event).then(done).catch((error) => {
      expect(error).to.not.be.null;
      done();
    });
  });
});