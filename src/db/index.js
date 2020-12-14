const { DynamoDB } = require('./dynamodb');

const Dynamo = new DynamoDB();

module.exports = {
  Dynamo,
};
