use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");
const TWEET_PDA:&str = "TWEET_ACC";
const SEED1: u64 = 100;
#[program]
pub mod solana_twitter {
    use super::*;

    pub fn send_tweet(ctx: Context<SendTweet>, topic: String, content: String, twitter_id: u64) -> Result<()> {
        let tweet = &mut ctx.accounts.tweet;
        let author = &ctx.accounts.author;
        // let clock = Clock::get().unwrap();
        // if topic.chars().count() > 50 {
        //     return Err(ErrorCode::TopicTooLong.into());
        // }
        // if content.chars().count() > 200 {
        //     return Err(ErrorCode::ContentTooLong.into());
        // }
        // tweet.author = author.key();
        // tweet.timestamp = clock.unix_timestamp;
        // tweet.topic = topic;
        // tweet.content = content;
        // tweet.twitter_id = twitter_id;
        msg!("{:?}", tweet.key());
        return Err(ErrorCode::TopicTooLong.into());
        
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(twitter_id: u64)]
pub struct SendTweet<'info> {
    #[account(
        init, 
        payer = author, 
        space = Tweet::LEN, 
        seeds=[
            twitter_id.to_be_bytes().as_ref(),
            TWEET_PDA.as_bytes(),
            author.key().as_ref(),
        ],
        bump)]
    pub tweet: Account<'info, Tweet>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>
    

}

#[account]
pub struct Tweet {
    author: Pubkey,
    timestamp: i64,
    topic: String,
    content: String,
    bump: u8,
    twitter_id: u64,
}

impl Tweet {
    pub const LEN: usize = 8 + 32 + 8 + 204 + 4 + 280*4 + 80;
}

#[error_code]
pub enum ErrorCode {
    #[msg("The maximum number of characters allowed in topics are 50 characters")]
    TopicTooLong,
    #[msg("The maximum number of characters allowed in contents are 200 characters")]
    ContentTooLong,
}
