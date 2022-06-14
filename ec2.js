// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Set the region
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY_ID = process.env.AWS_SECRET_ACCESS_KEY_ID;
const AWS_REGION = process.env.AWS_REGION;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY_ID,
  region: AWS_REGION,
  apiVersion: '2016-11-15',
});

const ec2 = new AWS.EC2();

const params = {
  DryRun: false,
};

const getInstances = async () => {
  const data = await ec2.describeInstances(params).promise();
  return data.Reservations;
};

module.exports = {
  getInstances,
};
