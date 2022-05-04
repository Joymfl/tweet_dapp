import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { simulateTransaction } from "@project-serum/anchor/dist/cjs/utils/rpc";
import { SolanaTwitter } from "../target/types/solana_twitter";


describe("solana-twitter", () => {
  // Configure the client to use the local cluster.
  // anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  // const provider = anchor.getProvider();
  // const provider = new anchor.AnchorProvider(program.provider.connection,)
  
  
  
  const program = anchor.workspace.SolanaTwitter as Program<SolanaTwitter>;
  // const author = anchor.web3.Keypair.generate();
  // const adminAccount = new anchor.Wallet(author); 
  // const adminProvider = new anchor.AnchorProvider(program.provider.connection, adminAccount,{
  //   commitment: "recent",
  //   preflightCommitment: "recent",
  //   skipPreflight: true
  // });
  it("Is initialized!", async () => {



    let twID: anchor.BN = new anchor.BN(60)
    let [pub1] = await anchor.web3.PublicKey.findProgramAddress(
      // [u64ToSeed(twID), Buffer.from("TWEET_ACC"), provider.wallet.publicKey.toBuffer()], 
      [twID.toBuffer("be", 8), Buffer.from("TWEET_ACC"), provider.wallet.publicKey.toBuffer()], 
      program.programId);
    
    console.log("pub1", pub1.toBase58())

    // const provider = anchor.getProvider;
    // const tx = await program.rpc.sendTweet('Toys','Roblox is the best east or west', twID, {
    //   accounts:{
    //     tweet: pub1,
    //     author: provider.wallet.publicKey,
    //     systemProgram: anchor.web3.SystemProgram.programId
    //   }
    // })
    // const tx = await program.methods.sendTweet('Toys','Roblox is the best east or west', twID).accounts({
    const tx = await program.methods.sendTweet('Toys','Roblox is the best east or west', twID).accounts({
      // tweet: new anchor.web3.PublicKey('G6jPLm4DPMefgyXqYqKXKFHnYjWoKiH33Hc6Zkn8DdwL'),
      tweet: pub1,
      author: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId
    }).rpc();
    // const tx = new anchor.web3.Transaction().add(ix);
    // const txID = await provider.(tx,[provider.wallet]);
    
    console.log("Your transaction signature", tx);
  });
});


export function u64ToSeed(num: anchor.BN) {
  return num.toBuffer('le', 8);
}