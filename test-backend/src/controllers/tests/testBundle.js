const chai = require('chai');
const sinonChai = require('sinon-chai');
// Allows us to use expect syntax with sinon
chai.use(sinonChai);
const expect = chai.expect;

module.exports = {
    expect
}