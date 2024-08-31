import React, { useState } from 'react';
import { generateMnemonic } from 'bip39'; // Corrected import statement
import { Buffer } from 'buffer';
import './App.css';
import SolanaWalletSeed from './components/SolanaWallet';
import EthWallet  from './components/EthWallet';
import SeedPharse from './components/SeedPharse';
import { FaMoon, FaSun } from 'react-icons/fa';

window.Buffer = Buffer;

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [message, setMessage] = useState("Create Wallet");
  const [darkMode, setDarkMode] = useState(false)

  async function seedPharsh() {
    try {
      console.log("Generating mnemonic...");
      const mn = await generateMnemonic(); // Corrected function name
      setMnemonic(mn);
      console.log(mn)
      setMessage("Add wallets");
      // return(
      //   <div>
      //     {<input type="text" value = {mnemonic} placeholder='Seed Phrase'/>}
      //   </div>
      // )
      console.log("Mnemonic generated and state updated.");
    } catch (error) {
      console.error("Error generating mnemonic:", error);
    }
  }

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  return (
    <div className={`container p-4 ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
      </div>
        <h1>HD WALLET</h1><br />
      <div>
        <input type="text" placeholder='Enter your wallet name' />
        <button onClick={seedPharsh}>{message}</button>
      </div>
      {mnemonic !== '' ? <SeedPharse mnemonic={mnemonic}/>: ''}
        {mnemonic && <SolanaWalletSeed mnemonic={mnemonic}/>}
        {mnemonic && <EthWallet mnemonic={mnemonic}/>}
    </div>
  );
}

export default App;
