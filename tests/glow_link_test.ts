import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types
} from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
  name: "Test user profile registration",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('glow-link', 'register-profile',
        [
          types.ascii("oily"),
          types.ascii("sensitive"),
          types.ascii("none")
        ],
        deployer.address
      )
    ]);
    
    block.receipts[0].result.expectOk();
    
    const profile = chain.callReadOnlyFn(
      'glow-link',
      'get-profile',
      [types.principal(deployer.address)],
      deployer.address
    );
    
    profile.result.expectOk();
  }
});

Clarinet.test({
  name: "Test skincare routine creation and retrieval",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    
    let block = chain.mineBlock([
      Tx.contractCall('glow-link', 'add-routine',
        [
          types.ascii("Summer Glow"),
          types.ascii("morning"),
          types.ascii("sunny"),
          types.ascii("Cleanser,Toner,Moisturizer")
        ],
        deployer.address
      )
    ]);
    
    block.receipts[0].result.expectOk().expectUint(0);
    
    const routine = chain.callReadOnlyFn(
      'glow-link',
      'get-routine',
      [types.uint(0)],
      deployer.address
    );
    
    routine.result.expectOk();
  }
});

Clarinet.test({
  name: "Test routine rating system",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    
    // Create routine first
    let block = chain.mineBlock([
      Tx.contractCall('glow-link', 'add-routine',
        [
          types.ascii("Winter Care"),
          types.ascii("evening"),
          types.ascii("cold"),
          types.ascii("Cleanser,Serum,Heavy Moisturizer")
        ],
        deployer.address
      )
    ]);
    
    // Rate the routine
    block = chain.mineBlock([
      Tx.contractCall('glow-link', 'rate-routine',
        [types.uint(0), types.uint(5)],
        user1.address
      )
    ]);
    
    block.receipts[0].result.expectOk();
  }
});
