require('dotenv').config();
const ec2 = require('./ec2');

const main = async () => {
  try {
    const instances = await ec2.getInstances();
    if (instances && instances.length) {
      const instanceDetailsArray = [];
      await instances.reduce(async (instancePromise, instance) => {
        await instancePromise;
        if (!instance.Instances) {
          return [];
        }
        await instance.Instances.reduce(
          async (instanceDetailsPromise, instanceDetails) => {
            await instanceDetailsPromise;
            instanceDetailsArray.push({
              InstanceId: instanceDetails.InstanceId,
              InstanceType: instanceDetails.InstanceType,
              KeyName: instanceDetails.KeyName,
              PrivateIpAddress: instanceDetails.PrivateIpAddress,
              PublicDnsName: instanceDetails.PublicDnsName,
              PublicIpAddress: instanceDetails.PublicIpAddress,
              State: instanceDetails.State,
              PlatformDetails: instanceDetails.PlatformDetails,
            });
          },
          Promise.resolve()
        );
      }, Promise.resolve());
      console.log(`🚀 ~ file: index.js ~ line: 29 :`, { instanceDetailsArray });
    }
  } catch (error) {
    console.error(error);
  }
};

main();
