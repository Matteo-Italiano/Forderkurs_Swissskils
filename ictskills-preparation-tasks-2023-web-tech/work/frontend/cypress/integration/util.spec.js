/// <reference types="Cypress" />

import { InvalidTileFormatError, TileOutOfBoundsError } from "../../lib/errors";
import {
    coordinatesToLocation,
    generateLocation,
    locationToCoordinates,
    moveLocation,
    validateLocation,
} from "../../src/util";
import { gridDefinitions } from "../fixtures/grid.json";

describe("util", () => {
    describe("validate location", () => {
        it("can throw errors on invalid formats", () => {
            ["", "A", "1", "1A", "f922nne9zfb9wf", ":-,/()"].forEach((format) =>
                expect(validateLocation.bind(null, "", 10, 10)).to.throw(
                    new InvalidTileFormatError("").message
                )
            );
        });

        describe("can throw errors on invalid locations", () => {
            gridDefinitions.forEach(($$) => {
                it(`grid with size ${$$.width}x${$$.height}`, () => {
                    $$.invalidTiles.forEach(({ name }) =>
                        expect(
                            validateLocation.bind(
                                null,
                                name,
                                $$.width,
                                $$.height
                            )
                        ).to.throw(new TileOutOfBoundsError(name).message)
                    );
                });
            });
        });
    });

    describe("location/coordinate conversion", () => {
        it("can convert a location to coordinates", () => {
            expect(locationToCoordinates("A1")).to.deep.equal({ x: 0, y: 0 });
            expect(locationToCoordinates("B1")).to.deep.equal({ x: 1, y: 0 });
            expect(locationToCoordinates("A2")).to.deep.equal({ x: 0, y: 1 });
            expect(locationToCoordinates("B2")).to.deep.equal({ x: 1, y: 1 });
            expect(locationToCoordinates("Z1")).to.deep.equal({ x: 25, y: 0 });
            expect(locationToCoordinates("Z99")).to.deep.equal({
                x: 25,
                y: 98,
            });
        });

        it("can convert coordinates to a location", () => {
            expect(coordinatesToLocation(0, 0)).to.equal("A1");
            expect(coordinatesToLocation(1, 0)).to.equal("B1");
            expect(coordinatesToLocation(0, 1)).to.equal("A2");
            expect(coordinatesToLocation(1, 1)).to.equal("B2");
            expect(coordinatesToLocation(25, 0)).to.equal("Z1");
            expect(coordinatesToLocation(25, 98)).to.equal("Z99");
        });
    });

    describe("location creation", () => {
        it("can generate a random location", () => {
            gridDefinitions.forEach(($$) => {
                for (let i = 0; i < 10; i++) {
                    const location = generateLocation($$.width, $$.height);

                    expect(location).to.be.a("string");
                    expect(
                        validateLocation.bind(
                            null,
                            location,
                            $$.width,
                            $$.height
                        )
                    ).not.to.throw().and.be.true;
                }
            });
        });

        it("can move a location", () => {
            expect(moveLocation("A1", 0, 0)).to.equal("A1");
            expect(moveLocation("A1", 1, 0)).to.equal("B1");
            expect(moveLocation("A1", 0, 1)).to.equal("A2");
            expect(moveLocation("A1", 1, 1)).to.equal("B2");
            expect(moveLocation("C5", -2, -3)).to.equal("A2");
        });
    });
});
