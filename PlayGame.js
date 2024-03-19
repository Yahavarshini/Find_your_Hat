const readlineSync = require("readline-sync");
const Field = require("./modules/Field.js");
const fieldGenerate = require("./modules/fieldGenerate.js");

const playGame = (difficulty) => {
  const myField = new Field(fieldGenerate(difficulty));
  console.log(
    "\n////////////// Find the Hat //////////////\n\n" +
      "Once the game starts, you will see a randomly generated field with a hat ('^') and holes ('O') scattered around.\n" +
      "Your character is represented by an asterisk ('*') and you must move it through the field by typing 'up', 'down', 'left', or 'right'.\n" +
      "You need to find the hat without falling into a hole or moving outside of the field.\n" +
      "The field is represented by a grid of Field characters ('░').\n\n" +
      "If you successfully find the hat, you win the game.\n" +
      "If you fall into a hole or move outside of the field, you lose the game.\n" +
      "You can choose to replay the game with the same or a different difficulty level or exit the game.\n\n" +
      "\n////////////// How to play //////////////\n\n"+
      "Type the Moves => up, down, left, or right. \nStay within the board. \nType exit to exit game.\n"

  );
  myField.showPath();
  console.log("\n\n");
  let gameInProgress = true;
  while (gameInProgress) {
    const userChoice = readlineSync.question("Choose your move: ");

    if (userChoice === "exit") {
      console.log("Goodbye!");
      process.exit();
    }
    process.stdout.write("\n");
    myField.move(userChoice);
    myField.showPath();
    console.log("\n\n");

    if (myField.win) {
      gameInProgress = false;
      let answer = "";
      while (!["y", "n"].includes(answer)) {
        answer = readlineSync.question(
          "\nYou found the hat!!\nDo you want to retry the game?\n(y/n): "
        );
      }
      if (answer === "y") {
        let changeDifficulty = "";
        while (!["y", "n"].includes(changeDifficulty)) {
          changeDifficulty = readlineSync.question(
            "Do you want to change the difficulty? (y/n): "
          );
        }
        if (changeDifficulty === "y") {
          let newDifficulty = "";
          while (!["easy", "normal", "hard"].includes(newDifficulty)) {
            newDifficulty = readlineSync.question(
              "Select the levels easy, normal, or hard: "
            );
          }
          playGame(newDifficulty);
        } else {
          playGame(difficulty);
        }
      } else {
        process.exit();
      }
    } else if (myField.gameOver) {
      gameInProgress = false;
      let answer = "";
      while (!["y", "n"].includes(answer)) {
        answer = readlineSync.question(
          "\nGame Over!!\nDo you want to retry the game?\n(y/n): "
        );
      }
      if (answer === "y") {
        let changeDifficulty = "";
        while (!["y", "n"].includes(changeDifficulty)) {
          changeDifficulty = readlineSync.question(
            "Do you want to change the difficulty? (y/n): "
          );
        }
        if (changeDifficulty === "y") {
          let newDifficulty = "";
          while (!["easy", "normal", "hard"].includes(newDifficulty)) {
            newDifficulty = readlineSync.question(
              "Select easy, normal, or hard: "
            );
          }
          playGame(newDifficulty);
        } else {
          playGame(difficulty);
        }
      } else {
        process.exit();
      }
    }
  }
};

let validDifficulty = false;
let selectDifficulty;
while (!validDifficulty) {
  const difficulty = readlineSync.question("Select easy, normal, hard: ");
  if (difficulty === "easy") {
    validDifficulty = true;
    selectDifficulty = "easy";
  } else if (difficulty === "normal") {
    validDifficulty = true;
    selectDifficulty = "normal";
  } else if (difficulty === "hard") {
    validDifficulty = true;
    selectDifficulty = "hard";
  }
}

playGame(selectDifficulty);
