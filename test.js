'use strict';

const medium = require('./index.js');
const chai = require('chai');
const sinon = require(`sinon`);
let expect = chai.expect; // Using Should style

const req = {};
const res = {
  send: sinon.stub(),
};

medium.getLatest(req, res);
setTimeout(function() {
  expect(res.send.calledOnce).to.be.true;
  console.log(res.send.firstCall.args);
  expect(res.send.firstCall.args[0].success).to.be.true;
}, 2000);
