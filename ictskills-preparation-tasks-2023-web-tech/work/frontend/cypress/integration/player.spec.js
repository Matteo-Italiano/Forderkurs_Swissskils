/// <reference types="Cypress" />

import { ShipGenerator } from "../../lib/ship-generator.js";
import { Grid } from "../../src/grid.js";
import { Player } from "../../src/player.js";

const numOfShips = 2;
const numOfShipTiles = 5;

describe("player", () => {
    /** @type {Grid} */
    let mockGrid;
    let generateShipsStub;
    let player;

    beforeEach(() => {
        mockGrid = { width: 10, height: 10, placeShipOnTile: cy.stub() };
        generateShipsStub = cy.stub(ShipGenerator, "generateShips").returns([
            ["A1", "A2"],
            ["B1", "B2", "B3"],
        ]);

        player = new Player(mockGrid);
    });

    it("will assign grid", () => {
        expect(player.grid).to.equal(mockGrid);
    });

    it("will generate ships", () => {
        // ShipGenerator.generateShips must be called
        expect(generateShipsStub).to.have.been.calledOnceWith(
            mockGrid.width,
            mockGrid.height
        );

        // num of ships should be correct
        expect(player.ships).to.have.lengthOf(numOfShips);

        // there should not be empty ships
        player.ships.forEach((ship) =>
            expect(ship).to.have.length.greaterThan(0)
        );
    });

    it("will place ships in grid", () => {
        expect(mockGrid.placeShipOnTile).to.have.callCount(numOfShipTiles);
    });

    it("can get number of ship tiles", () => {
        expect(player.getNumberOfShipTiles()).to.equal(numOfShipTiles);
    });
});
