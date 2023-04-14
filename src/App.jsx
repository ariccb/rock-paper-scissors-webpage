import { useState, useEffect } from "react";
import "./App.css";

const computerOpponentMove = "http://localhost:5050/rps";

// button is a component
function Button({ text, fire }) {
    return (
        <button style={{ backgroundColor: "beige", color: "black", margin: 10 }} onClick={fire}>
            {text}
        </button>
    );
}

function App() {
    const [myGuess, setMyGuess] = useState("no guess yet");
    const [computerGuess, setComputerGuess] = useState("no guess yet");
    const [lastGuessTime, setLastGuessTime] = useState(new Date());

    let myGuessString = "You haven't guessed yet";
    let computerGuessString = "Computer hasn't guessed yet";
    if (myGuess != "no guess yet") myGuessString = `You guessed ${myGuess}`;
    if (computerGuess != "no guess yet") computerGuessString = `Computer guessed ${computerGuess}`;

    let result = "";
    if (
        (myGuess == "scissors" && computerGuess == "rock") ||
        (myGuess == "rock" && computerGuess == "paper") ||
        (myGuess == "paper" && computerGuess == "scissors")
    )
        result = "You Lost!";
    if (
        (myGuess == "scissors" && computerGuess == "paper") ||
        (myGuess == "rock" && computerGuess == "scissors") ||
        (myGuess == "paper" && computerGuess == "rock")
    )
        result = "You Won!";
    if (
        (myGuess == "scissors" && computerGuess == "scissors") ||
        (myGuess == "rock" && computerGuess == "rock") ||
        (myGuess == "paper" && computerGuess == "paper")
    )
        result = "It was a tie!";
    useEffect(() => console.log(myGuessString), [myGuess]);
    useEffect(() => console.log(computerGuessString), [computerGuess]);

    useEffect(() => console.log("page loaded"), []);

    useEffect(() => {
        if (myGuess == "no guess yet") return;
        async function getComputerGuess() {
            const result = await fetch(computerOpponentMove);
            const guess = await result.text();
            console.log(`computer guessed ${guess}`);
            setComputerGuess(guess);
        }
        getComputerGuess();
    }, [myGuess, lastGuessTime]);

    function setGuess(guess) {
        setMyGuess(guess);
        setLastGuessTime(new Date());
    }

    return (
        <div>
            <h1>Welcome to rock paper scissors</h1>
            <div>{myGuessString}</div>
            <div>{computerGuessString}</div>
            <Button
                text="rock"
                fire={() => {
                    setGuess("rock");
                }}
            />
            <Button
                text="paper"
                fire={() => {
                    setGuess("paper");
                }}
            />
            <Button
                text="scissors"
                fire={() => {
                    setGuess("scissors");
                }}
            />
            <h2>{result}</h2>
        </div>
    );
}

export default App;
