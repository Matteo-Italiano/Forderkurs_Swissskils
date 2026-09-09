/// <reference types="Cypress" />

import { useFakeTimers } from "sinon";
import { AIPlayer } from "../../src/ai-player.js";
import { State } from "../../src/game-state.js";
import { Grid } from "../../src/grid.js";
import { Player } from "../../src/player.js";
import * as Util from "../../src/util.js";

describe("AI Player", () => {
    /** @type {AIPlayer} */
    let player;

    beforeEach(() => {
        player = new AIPlayer(new Grid(document.createElement("div"), 10, 10));
        State.opponent = new Player(
            new Grid(document.createElement("div"), 12, 14)
        );
    });

    it("will generate a random location for the opponents grid size", () => {
        cy.spy(Util, "generateLocation");

        player.playTurn();

        expect(Util.generateLocation).to.have.been.calledOnceWith(12, 14);
    });

    it("will re-generate another location if it has been already marked", () => {
        State.opponent.grid.markTile("A1");
        State.opponent.grid.markTile("A2");
        State.opponent.grid.markTile("B1");
        State.opponent.grid.markTile("B2");

        const stub = cy.stub(Util, "generateLocation");
        ["A1", "A2", "B1", "B2", "C1"].forEach((l, i) =>
            stub.onCall(i).returns(l)
        );

        player.playTurn();

        expect(Util.generateLocation).to.have.been.called;
        expect(Util.generateLocation).to.have.callCount(5);
    });

    it("clicks the correct tile after 250ms", () => {
        cy.stub(Util, "generateLocation").returns("C4");
        const tile = State.opponent.grid.findTile("C4");
        const eventSpy = cy.spy();
        tile.addEventListener("click", () => eventSpy());

        // start fake time and play turn
        const clock = useFakeTimers();
        player.playTurn();

        // check at 200ms
        clock.tick(200);
        expect(eventSpy).not.to.have.been.called;

        // should emit at 250ms

        // check at 300ms
        clock.tick(50);
        expect(eventSpy).to.have.been.calledOnce;
    });
});
