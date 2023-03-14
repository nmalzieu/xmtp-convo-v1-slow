const { Client } = require("@xmtp/xmtp-js");

const keys = [
  // Put key here
];

const testPerf = async () => {
  const client = await Client.create(null, {
    privateKeyOverride: Buffer.from(keys),
    env: "dev",
  });
  let now = new Date().getTime();
  const convos = await client.conversations.list();
  console.log(
    `   ➡️    It took ${
      (new Date().getTime() - now) / 1000
    } seconds for initial load of ${convos.length}`
  );
  now = new Date().getTime();
  await client.conversations.list();
  console.log(
    `   ➡️    It took ${(new Date().getTime() - now) / 1000} seconds for second call`
  );
};

const testPerfV2 = async () => {
  const client = await Client.create(null, {
    privateKeyOverride: Buffer.from(keys),
    env: "dev",
  });
  let now = new Date().getTime();
  const convos = await client.conversations.listV2Conversations();
  console.log(
    `   ➡️    It took ${
      (new Date().getTime() - now) / 1000
    } seconds for initial load of ${convos.length}`
  );
  now = new Date().getTime();
  await client.conversations.listV2Conversations();
  console.log(
    `   ➡️    It took ${(new Date().getTime() - now) / 1000} seconds for second call`
  );
};

const test = async () => {
  console.log("\n   *** TESTING WITH ALL CONVOS ***   \n");
  await testPerf();

  console.log("\n   *** TESTING WITH V2 CONVOS ***   \n");
  await testPerfV2();
};

test();
