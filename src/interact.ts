import { Mina, PrivateKey, PublicKey, fetchAccount, public_ } from 'snarkyjs';

import { Add } from './Add.js';

const Network = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');

Mina.setActiveInstance(Network);

const appKey = PublicKey.fromBase58(
  'B62qnnKFaghka7wb5qrMmj8uxMK6uia4WoQE6nTd2mf2wKki7Fh84WH'
);

const zkApp = new Add(appKey);

await fetchAccount({ publicKey: appKey });

console.log(zkApp.num.get().toString());

const accountPrivateKey = PrivateKey.fromBase58(
  'EKEELMv9tBnoxtHSqLznfNMFcSV8tX9d2SbiZ7rt7rNSKXiQFZE9'
);
const accountPublicKey = accountPrivateKey.toPublicKey();

console.log('compiling...');
await Add.compile();

const tx = await Mina.transaction(
  {
    sender: accountPublicKey,
    fee: 0.1e9,
  },
  () => {
    zkApp.update();
  }
);

console.log('proving...');
await tx.prove();

const sentTx = await tx.sign([accountPrivateKey]).send();

console.log('https://berkeley.minaexplorer.com/transaction/' + sentTx.hash());
