import { State } from "./game-state.js";
import { Player } from "./player.js";
import { generateLocation } from "./util.js";

/** the delay in ms before the AI clicks the tile it picked */
const TURN_DELAY = 250;

export class AIPlayer extends Player {
    /**
     * When the AIPlayers plays his turn he has to...
     * - generate a random location from the opponents grid
     * - re-generate if the location has already been marked
     * - click the correct tile after 250ms
     */
    playTurn() {
        const grid = State.opponent.grid;

        // nothing left to shoot at
        if (grid.tiles && grid.tiles.every((t) => t.hasAttribute("data-marked"))) {
            return;
        }

        let location;

        do {
            location = generateLocation(grid.width, grid.height);
        } while (grid.hasBeenMarked(location));

        setTimeout(() => grid.findTile(location).click(), TURN_DELAY);
    }
}
