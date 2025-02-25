import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

export default function SolanaWalletSeed({mnemonic}){
    const [currentIndex, setCurrentIndex] = useState(0)
    const [publicKey, setPublicKey] = useState([])

    return (
        <div>
            <button onClick={async function(){
                 const seed = await mnemonicToSeed(mnemonic);
                 const path = `m/44'/501'/${currentIndex}'/0'`;
                 const derivedSeed = derivePath(path, seed.toString("hex")).key;
                 const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                 const keypair = Keypair.fromSecretKey(secret);
                 console.log(keypair.secretKey)
                 setCurrentIndex(currentIndex + 1)
                 setPublicKey([...publicKey, keypair.publicKey]) 
            }}>
                Create SOL
            </button>
            {publicKey.map((p, index) => <div key={index}>
                 {p.toBase58()}
            </div>)}
        </div>
    )
}