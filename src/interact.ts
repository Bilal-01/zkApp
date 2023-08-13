import { Mina, PrivateKey, PublicKey, fetchAccount, public_ } from 'snarkyjs';

import { Add } from './Add';

const Network = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');

Mina.setActiveInstance(Network);

const appKey = PublicKey.fromBase58(
  'B62qnnKFaghka7wb5qrMmj8uxMK6uia4WoQE6nTd2mf2wKki7Fh84WH'
);

const zkApp = new Add(appKey);

console.log(zkApp.num.get().toString());
