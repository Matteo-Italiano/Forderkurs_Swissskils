/// <reference types="Cypress" />

import { Grid } from "../../src/grid.js";
import { gridDefinitions } from "../fixtures/grid.json";

describe("grid", () => {
    gridDefinitions.forEach(($$) => {
        describe(`size of ${$$.width}x${$$.height}`, () => {
            /** @type {HTMLElement} */
            let gridElement;

            /** @type {Grid} */
            let grid;

            /** @type {HTMLButtonElement[]} */
            let gridTiles;

            before(() => {
                cy.visit("/cypress/fixtures/grid.html");
            });

            beforeEach(() => {
                // reset and initialize grid before every test
                cy.get("[data-grid]").then(([element]) => {
                    element.innerHTML = "";
                    gridElement = element;
                    grid = new Grid(element, $$.width, $$.height);
                    gridTiles = [
                        ...gridElement.querySelectorAll("[data-tile]"),
                    ];
                });
            });

            describe("create legend", () => {
                it("can create the legend for the x axis", () => {
                    cy.get('[data-grid] [data-legend="x"]')
                        .should("have.length", $$.width)
                        .each(($el) => {
                            expect($el).to.have.class("grid-legend");
                            expect($el).to.have.class("grid-legend-x-axis");
                        });
                });

                it("can create the legend for the y axis", () => {
                    cy.get('[data-grid] [data-legend="y"]')
                        .should("have.length", $$.height)
                        .each(($el) => {
                            expect($el).to.have.class("grid-legend");
                            expect($el).to.have.class("grid-legend-y-axis");
                        });
                });
            });

            describe("create tiles", () => {
                it("creates tiles as HTML Button elements", () => {
                    $$.validTiles.forEach(({ name }) => {
                        expect(grid.createSingleTile(name)).to.match("button");
                    });
                });

                it("assigns data-tile attribute to tiles", () => {
                    $$.validTiles.forEach(({ name }) => {
                        expect(grid.createSingleTile(name)).to.have.attr(
                            "data-tile"
                        );
                    });
                });

                it("assigns data-location attribute with correct location to tiles", () => {
                    $$.validTiles.forEach(({ name }) => {
                        expect(grid.createSingleTile(name)).to.have.attr(
                            "data-location",
                            name
                        );
                    });
                });

                it("creates all tiles while constructing grid and appends them to the DOM", () => {
                    expect(gridTiles).to.have.lengthOf($$.width * $$.height);
                });
            });

            describe("create grid", () => {
                it("assigns grid properties correctly", () => {
                    expect(grid.element).to.equal(gridElement);
                    expect(grid.width).to.equal($$.width);
                    expect(grid.height).to.equal($$.height);
                    expect(grid.tiles).to.be.an("array");
                });

                it("sets grid styling correctly", () => {
                    const columnRegex = new RegExp(
                        `^(\\d+(\\.\\d+){0,1}px\\s{0,1}){${$$.width + 1}}$`
                    );
                    const columnHint = `grid-template-columns must be ${
                        $$.width + 1
                    } columns (for every tile plus 1 for the legend)`;

                    cy.get("[data-grid]")
                        .should("have.css", "grid-template-columns")
                        .and("match", columnRegex, columnHint);

                    const rowRegex = new RegExp(
                        `^(\\d+(\\.\\d+){0,1}px\\s{0,1}){${$$.height + 1}}$`
                    );
                    const rowHint = `grid-template-rows must be ${
                        $$.height + 1
                    } columns (for every tile plus 1 for the legend)`;

                    cy.get("[data-grid]")
                        .should("have.css", "grid-template-rows")
                        .and("match", rowRegex, rowHint);
                });
            });

            describe("can find the correct tile for an uppercase location", () => {
                $$.validTiles.forEach(({ name, index }) => {
                    name = name.toUpperCase();

                    it(`${name} should be tile number ${index + 1}`, () => {
                        const tile = grid.findTile(name);
                        const element =
                            gridElement.querySelectorAll("button")[index];

                        expect(tile).to.be.a("HTMLButtonElement");
                        expect(element).to.be.a("HTMLButtonElement");
                        expect(tile).to.equal(element);
                    });
                });
            });

            describe("can find the correct tile for a lowercase location", () => {
                $$.validTiles.forEach(({ name, index }) => {
                    name = name.toLowerCase();

                    it(`${name} should be tile number ${index + 1}`, () => {
                        const tile = grid.findTile(name);
                        const element =
                            gridElement.querySelectorAll("button")[index];

                        expect(tile).to.be.a("HTMLButtonElement");
                        expect(element).to.be.a("HTMLButtonElement");
                        expect(tile).to.equal(element);
                    });
                });
            });

            describe("will throw useful errors while trying to find tiles", () => {
                it("will throw an exception on invalid formats", () => {
                    expect(grid.findTile.bind(grid, "")).to.throw(
                        'Invalid format "" for tile location'
                    );
                    expect(grid.findTile.bind(grid, "A")).to.throw(
                        'Invalid format "A" for tile location'
                    );
                    expect(grid.findTile.bind(grid, "1")).to.throw(
                        'Invalid format "1" for tile location'
                    );
                    expect(grid.findTile.bind(grid, "1A")).to.throw(
                        'Invalid format "1A" for tile location'
                    );
                });

                it("will throw an exception when location is out of bounds", () => {
                    $$.invalidTiles.forEach(({ name }) => {
                        expect(grid.findTile.bind(grid, name)).to.throw(
                            `Location "${name}" out of bounds`
                        );
                    });
                });
            });

            describe("enable/disable the grid", () => {
                it("can disable the grid", () => {
                    grid.disable();

                    expect(gridTiles).to.have.length.greaterThan(0);
                    gridTiles.forEach((tile) => expect(tile).to.be.disabled);
                });

                it("can enable the grid", () => {
                    grid.enable();

                    expect(gridTiles).to.have.length.greaterThan(0);
                    gridTiles.forEach(
                        (tile) => expect(tile).not.to.be.disabled
                    );
                });

                it("will keep marked tiles disabled", () => {
                    $$.validTiles.forEach(({ name }) => grid.markTile(name));

                    grid.enable();

                    $$.validTiles.forEach(
                        ({ index }) => expect(gridTiles[index]).to.be.disabled
                    );
                });
            });

            describe("mark tiles", () => {
                it("can mark a tile", () => {
                    $$.validTiles.forEach(({ name, index }) => {
                        grid.markTile(name);

                        const tile = gridTiles[index];
                        expect(tile).to.have.attr("data-marked");
                        expect(tile).to.be.disabled;
                    });
                });

                it("can place a ship", () => {
                    $$.validTiles.forEach(({ name, index }) => {
                        grid.placeShipOnTile(name);

                        const tile = gridTiles[index];
                        expect(tile).to.have.attr("data-ship");
                    });
                });

                it("can determine if a tile has been marked", () => {
                    const marked = $$.validTiles.map(({ name }) => name);
                    const unmarked = gridTiles
                        .map((tile) => tile.dataset.location)
                        .filter((location) => !marked.includes(location));

                    marked.forEach((location) => grid.markTile(location));

                    marked.forEach(
                        (location) =>
                            expect(grid.hasBeenMarked(location)).to.be.true
                    );
                    unmarked.forEach(
                        (location) =>
                            expect(grid.hasBeenMarked(location)).to.be.false
                    );
                });
            });

            describe("grid info", () => {
                it("can determine the number of hits in the grid", () => {
                    // detect hits on valid tiles
                    $$.validTiles.forEach(({ name }, idx) => {
                        grid.placeShipOnTile(name);
                        grid.markTile(name);
                        expect(grid.getNumberOfHits()).to.equal(idx + 1);
                    });

                    // mark all other tiles
                    gridTiles
                        .map((tile) => tile.dataset.location)
                        .filter(
                            (location) =>
                                !$$.validTiles
                                    .map(({ name }) => name)
                                    .includes(location)
                        )
                        .forEach((location) => grid.markTile(location));

                    // hits should still be the same amount as before
                    expect(grid.getNumberOfHits()).to.equal(
                        $$.validTiles.length
                    );
                });
            });
        });
    });
});
