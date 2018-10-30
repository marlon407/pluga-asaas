const plg = require('pluga-plg');
const expect = require('chai').expect;
const action = require('../../lib/actions/create_payment');
require('dotenv').config()

const event = {
  meta:{
    baseURI: process.env.BASE_URI
  },
  auth: {
    access_token: process.env.ACCESS_TOKEN
  },
  input:{
      customer: {
        name: "Marcelo Almeida",
        email: "marcelo.almeida@gmail.com",
        phone: "4738010919",
        mobilePhone: "4799376637",
        cpfCnpj: "84627446527",
        postalCode: "01310-000",
        address: "Av. Paulista",
        addressNumber: "150",
        complement: "Sala 201",
        province: "Centro",
        externalReference: "12987382"
      },
      billingType: "BOLETO",
      dueDate: "2019-06-10",
      value: 100,
      description: "Pedido 056984"
  }
};

describe('Action: Create payment', () => {
  it('Should create a new payment', function (done) {
    action.handle(plg, event).then(payment => {
      expect(payment).to.have.property("id");
      expect(payment.description).to.eq("Pedido 056984");
      done();
    }).catch(done);
  });
});