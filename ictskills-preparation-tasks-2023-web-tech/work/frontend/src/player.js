import { ShipGenerator } from "../lib/ship-generator.js";
import { Grid } from "./grid.js";

export class Player {
    /**
     * When creating a new Player you wll have to do the following tasks:
     *
     * - Assign arguments to class properties for later use
     * - Use the static `ShipGenerator` class to generate the ships of this player
     * - Place the ships in the grid
     *
     * @param {Grid} grid
     */
    constructor(grid) {
        // TODO

        /** @type {Grid} */
        this.grid;

        /** @type {Array<string[]>} */
        this.ships;
    }

    /**
     * Determine the sum of all ship-tiles.
     *
     * @returns {number}
     */
    getNumberOfShipTiles() {
        // TODO
    }
}
