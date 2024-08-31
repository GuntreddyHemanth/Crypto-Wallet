import { useState } from "react";
// import './SeedPhrase.css';

export default function SeedPhrase({ mnemonic }) {
  const [seed, setSeed] = useState(mnemonic);
  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const handleChange = (index, event) => {
    const updatedSeed = seed.split(" ");
    updatedSeed[index] = event.target.value;
    setSeed(updatedSeed.join(" "));
  };

  const seedWords = seed.split(" ");

  return (
    <div className="seed-container">
      <h2>Mnemonic Seed Phrase</h2>
      <div className={`seed-phrase ${isHidden ? "hidden" : ""}`}>
        {seedWords.map((word, index) => (
          <input
            key={index}
            type="text"
            value={word}
            onChange={(e) => handleChange(index, e)}
            placeholder={`Word ${index + 1}`}
            className="seed-word"
            readOnly={isHidden}
          />
        ))}
      </div>
      <button onClick={toggleVisibility}>
        {isHidden ? "Show All Words" : "Hide All Words"}
      </button>
    </div>
  );
}
