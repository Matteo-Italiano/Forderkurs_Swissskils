/// <reference types="Cypress" />

import { AIPlayer } from "../../src/ai-player.js";
import { ShipGenerator } from "../../lib/ship-generator.js";
import { GameState } from "../../src/game-state.js";
import { Grid } from "../../src/grid.js";
import { Player } from "../../src/player.js";

describe("GameState", () => {
    /** @type {GameState} */
    let state;

    /** @type {[Player, AIPlayer]} */
    let mockPlayers;

    beforeEach(() => {
        cy.stub(ShipGenerator, "generateShips").returns([
            ["A1", "A2"],
            ["B3", "B4", "B5"],
        ]);

        state = new GameState();

        state.dialog = document.createElement("dialog");

        const ai = new AIPlayer(
            new Grid(document.createElement("div"), 10, 10)
        );
        cy.stub(ai, "playTurn");

        mockPlayers = [
            new Player(new Grid(document.createElement("div"), 10, 10)),
            ai,
        ];
    });

    it("can set players", () => {
        const [p1, p2] = mockPlayers;

        cy.stub(p1.grid, "disable");
        cy.stub(p1.grid, "enable");
        cy.stub(p2.grid, "disable");
        cy.stub(p2.grid, "enable");

        state.setPlayers(p1, p2);

        expect(state.currentPlayer).to.equal(p1);
        expect(state.opponent).to.equal(p2);

        expect(p1.grid.disable).to.have.been.calledOnce;
        expect(p1.grid.enable).not.to.have.been.calledOnce;
        expect(p2.grid.disable).not.to.have.been.calledOnce;
        expect(p2.grid.enable).to.have.been.calledOnce;
    });

    it("can switch players", () => {
        const [p1, p2] = mockPlayers;
        state.currentPlayer = p1;
        state.opponent = p2;

        cy.stub(p1.grid, "disable");
        cy.stub(p1.grid, "enable");
        cy.stub(p2.grid, "disable");
        cy.stub(p2.grid, "enable");

        state.switchPlayers();

        expect(state.currentPlayer).to.equal(p2);
        expect(state.opponent).to.equal(p1);

        expect(p1.grid.disable).not.to.have.been.calledOnce;
        expect(p1.grid.enable).to.have.been.calledOnce;
        expect(p2.grid.disable).to.have.been.calledOnce;
        expect(p2.grid.enable).not.to.have.been.calledOnce;
    });

    describe("on turn", () => {
        it("marks the tile in the opponents grid", () => {
            const [p1, p2] = mockPlayers;
            state.currentPlayer = p1;
            state.opponent = p2;

            const markTileStub = cy.stub(state.opponent.grid, "markTile");

            state.onTurn("A1");

            expect(markTileStub).to.have.been.calledOnceWith("A1");
        });

        it("opens the winning dialog when the player has won", () => {
            [state.currentPlayer, state.opponent] = mockPlayers;

            cy.stub(state, "checkWin").returns(true);
            cy.stub(state.dialog, "showModal").callsFake(
                () => (state.dialog.open = true)
            );

            state.onTurn("A1");

            expect(state.checkWin).to.have.been.calledOnce;
            expect(state.dialog.showModal).to.have.been.calledOnce;
            expect(state.dialog.open).to.equal(true);
        });

        it("will switch players after a turn", () => {
            const [p1, p2] = mockPlayers;
            state.currentPlayer = p1;
            state.opponent = p2;

            cy.spy(state, "switchPlayers");

            state.onTurn("A1");

            expect(state.switchPlayers).to.have.been.calledOnce;
            expect(state.currentPlayer).to.equal(p2);
            expect(state.opponent).to.equal(p1);
        });

        it("plays AIs turn if player is done", () => {
            const [player, ai] = mockPlayers;
            state.currentPlayer = player;
            state.opponent = ai;

            state.onTurn("A1");

            expect(ai.playTurn).to.have.been.calledOnce;
        });
    });

    it("can determine that a player has won", () => {
        state.opponent = mockPlayers[1];
        state.opponent.grid.markTile("A1");
        state.opponent.grid.markTile("A2");
        state.opponent.grid.markTile("B3");
        state.opponent.grid.markTile("B4");
        state.opponent.grid.markTile("B5");

        const hasWon = state.checkWin();

        expect(hasWon).to.be.true;
    });

    it("can determine that a player has not yet won", () => {
        state.opponent = mockPlayers[1];
        state.opponent.grid.markTile("A1");
        state.opponent.grid.markTile("A2");

        const hasWon = state.checkWin();

        expect(hasWon).to.be.false;
    });

    it("can open winning dialog with correct phrase", () => {
        cy.stub(state.dialog, "showModal").callsFake(
            () => (state.dialog.open = true)
        );

        // case Player
        [state.currentPlayer, state.opponent] = mockPlayers;
        state.openWinningDialog();
        expect(state.dialog.innerText).to.equal("Player wins!");

        // case AI
        [state.opponent, state.currentPlayer] = mockPlayers;
        state.openWinningDialog();
        expect(state.dialog.innerText).to.equal("AI wins!");
    });
});
