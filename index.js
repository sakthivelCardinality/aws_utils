require('dotenv').config();
const ec2 = require('./ec2');

const main = async () => {
  try {
    const instances = await ec2.getInstancesDetails();
    console.log(instances);
  } catch (error) {
    console.error(error);
  }
};

main();
