//
//token-mint    DTPyrb8QWvrrC6tdgM43qSyb3FrFwJeCHqF4ifT4YJCY
//token-account 34vZZvKWzt6CALeNdDmUvfnzb5FVs9AsMf8rgKMmtm8K

import { web3 } from "@coral-xyz/anchor";
import {
  AuthorityType,
  createMint,
  createSetAuthorityInstruction,
  getMint,
  getOrCreateAssociatedTokenAccount,
  mintTo
} from "@solana/spl-token";

async function mint(author: web3.PublicKey) {
  const connection = new web3.Connection(
    "https://solana-devnet.g.alchemy.com/v2/KE1ydHiz25rcOhGZXZwFmG4tujwFm1Rb",
    {
      commitment: "confirmed"
    }
  );

  const wallet = web3.Keypair.fromSecretKey(
    Uint8Array.from([
      76, 214, 204, 20, 111, 9, 8, 200, 131, 155, 8, 44, 189, 187, 114, 137, 22,
      27, 184, 87, 18, 35, 212, 39, 0, 144, 47, 0, 175, 72, 110, 57, 92, 132,
      199, 223, 79, 127, 190, 244, 93, 40, 150, 233, 198, 142, 85, 99, 24, 222,
      135, 39, 127, 97, 168, 148, 163, 184, 24, 107, 203, 126, 79, 13
    ])
  );

  const mint = await createMint(
    connection,
    wallet,
    wallet.publicKey,
    wallet.publicKey,
    0
  );

  console.log("mint: ", mint.toBase58());

  const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    mint,
    author
  );

  await mintTo(
    connection,
    wallet,
    mint,
    associatedTokenAccount.address,
    wallet,
    1
  );

  const transaction = new web3.Transaction().add(
    createSetAuthorityInstruction(
      mint,
      wallet.publicKey,
      AuthorityType.MintTokens,
      null
    )
  );

  await web3.sendAndConfirmTransaction(connection, transaction, [wallet]);

  const mintInfo = await getMint(connection, mint);

  console.log("mintInfo: ", mintInfo);
}

await mint(new web3.PublicKey("5NoD6kRwHpdf6fbwceWtR1zaq97d8pgUqn9ZdtSJiiyM"));
