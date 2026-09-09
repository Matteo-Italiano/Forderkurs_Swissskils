import { AIPlayer } from "../src/ai-player.js";
import { State } from "../src/game-state.js";
import { Grid } from "../src/grid.js";
import { Player } from "../src/player.js";

// create grids
const gridElements = [...document.querySelectorAll("[data-grid]")];
const [aiGrid, playerGrid] = gridElements.map(
    (element) => new Grid(element, 10, 10)
);

// assign event listener to tiles
const tiles = document.querySelectorAll(".grid [data-tile]");
tiles.forEach((tile) =>
    tile.addEventListener("click", () => State.onTurn(tile.dataset.location))
);

// assign winning dialog
State.dialog = document.querySelector("[data-dialog]");

// create players
State.setPlayers(new Player(playerGrid), new AIPlayer(aiGrid));
