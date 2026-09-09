import { AIPlayer } from "./ai-player.js";
import { Player } from "./player.js";

export class GameState {
    constructor() {
        /** @type {Player} */
        this.currentPlayer;

        /** @type {Player} */
        this.opponent;

        /** @type {HTMLDialogElement} */
        this.dialog;
    }

    /**
     * Assign the players.
     * Enable/Disable the correct grids.
     *
     * @param {Player} player1 the player who should have the first turn
     * @param {Player} player2 the second player
     */
    setPlayers(player1, player2) {
        // TODO
    }

    /**
     * Switch the players (`currentPlayer` and `opponent`).
     * Enable/Disable the correct grids.
     */
    switchPlayers() {
        // TODO
    }

    /**
     * On a turn you have to do the following:
     *
     * - mark the correct tile on the correct grid
     * - check if the player has won - if so, open the winning dialog
     * - switch the players
     * - if the next player is an AI invoke a turn by calling `playTurn()`
     *
     * @param {string} location the chess notation style location - eg. A1, B5, ...
     */
    onTurn(location) {
        // TODO
    }

    /**
     * Determine if the current player has won the game by sinking all ships.
     *
     * @returns {boolean}
     */
    checkWin() {
        // TODO
    }

    /**
     * Open the winning dialog (provided in the HTML as a <dialog> element)
     * as a modal and show one of the following messages respectively:
     * - "AI wins!"
     * - "Player wins!"
     */
    openWinningDialog() {
        // TODO
    }
}

// initialize state and export for further use
export const State = new GameState();
