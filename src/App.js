import { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice);
  const [isRoll, setIsRoll] = useState(false);
  const [tenzies, setTenzies] = useState(false);

  /* Check if the game is won */
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const refDie = dice[0].value;
    const allEqual = dice.every((die) => die.value === refDie);

    if (allHeld && allEqual) {
      setTenzies(true);
    }
  }, [dice]);

  /* Roll dice animation  */
  useEffect(() => {
    const diceSelector = document.querySelectorAll(".die");
    diceSelector.forEach((die) => {
      if (!die.classList.contains("die-held")) {
        die.classList.remove("animation");
        void die.offsetWidth;
        die.classList.add("animation");
      }
    });
  }, [isRoll]);

  /* Auxiliary function */
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  /* Randomly generate all Dice */
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  /* Roll all dice or just the ones that aren't held */
  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
    } else {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    }
    setIsRoll((prevRoll) => !prevRoll);
  }

  /* Hold a particular Die, based on his id */
  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main>
      <div className="container">
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice">
          {dice.map((die) => (
            <Die key={die.id} die={die} holdDice={holdDice} />
          ))}
        </div>
        <button className="btn" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}

export default App;
