const plg = require('pluga-plg');
const expect = require('chai').expect;
const action = require('../../lib/actions/create_customer');
require('dotenv').config()

let event = {
  meta:{
    baseURI: process.env.BASE_URI
  },
  auth: {
    access_token: process.env.ACCESS_TOKEN
  },
  input:{
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
  }
};

describe('Action: Create customer', () => {
  it('Should create a new customer', function (done) {
    action.handle(plg, event).then(result => {
      expect(result).to.have.property("id");
      expect(result.phone).to.eq("4738010919");

      done();
    }).catch(done);
  });

  it('Should update a customer', function (done) {
    event.input.phone = "4738010918";
    action.handle(plg, event).then(result => {
      expect(result).to.have.property("id");
      expect(result.phone).to.eq("4738010918");

      done();
    }).catch(done);
  });
});