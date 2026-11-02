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
        this.currentPlayer = player1;
        this.opponent = player2;

        this.updateGrids();
    }

    /**
     * Switch the players (`currentPlayer` and `opponent`).
     * Enable/Disable the correct grids.
     */
    switchPlayers() {
        [this.currentPlayer, this.opponent] = [
            this.opponent,
            this.currentPlayer,
        ];

        this.updateGrids();
    }

    /**
     * Only the opponents grid can be shot at, so the current players own grid
     * is disabled while the opponents grid is enabled.
     */
    updateGrids() {
        this.currentPlayer.grid.disable();
        this.opponent.grid.enable();
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
        this.opponent.grid.markTile(location);

        if (this.checkWin()) {
            this.openWinningDialog();
            return;
        }

        this.switchPlayers();

        if (this.currentPlayer instanceof AIPlayer) {
            this.currentPlayer.playTurn();
        }
    }

    /**
     * Determine if the current player has won the game by sinking all ships.
     *
     * @returns {boolean}
     */
    checkWin() {
        return (
            this.opponent.grid.getNumberOfHits() ===
            this.opponent.getNumberOfShipTiles()
        );
    }

    /**
     * Open the winning dialog (provided in the HTML as a <dialog> element)
     * as a modal and show one of the following messages respectively:
     * - "AI wins!"
     * - "Player wins!"
     */
    openWinningDialog() {
        this.dialog.innerText =
            this.currentPlayer instanceof AIPlayer ? "AI wins!" : "Player wins!";

        this.dialog.showModal();
    }
}

// initialize state and export for further use
export const State = new GameState();
