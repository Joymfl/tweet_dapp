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
  const author = anchor.web3.Keypair.generate();
  const adminAccount = new anchor.Wallet(author); 
  const adminProvider = new anchor.AnchorProvider(program.provider.connection, adminAccount,{
    commitment: "recent",
    preflightCommitment: "recent",
    skipPreflight: true
  });
  it("Is initialized!", async () => {
    // const tweet_acc = anchor.web3.Keypair.generate();

    // const provider = anchor.getProvider;
    const tx = await program.methods.sendTweet('Toys','Roblox is the best east or west', new anchor.BN(60)).accounts({
      // tweet: tweet_acc.publicKey,
      author: provider.wallet.publicKey,
      
    }).rpc();
    // const tx = new anchor.web3.Transaction().add(ix);
    // const txID = await provider.(tx,[provider.wallet]);
    
    console.log("Your transaction signature", tx);
  });
});
