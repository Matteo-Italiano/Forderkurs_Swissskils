import { ShipHasOverlapError, ShipsCannotBeGeneratedError } from "./errors.js";
import {
    moveLocation,
    generateLocation,
    validateLocation,
} from "../src/util.js";

/**
 * Generates a randomly placed ship
 *
 * DO NOT EXPORT AND USE THIS FUNCTION - use `ShipGenerator.generateShips` instead
 *
 * @param {Array<{x: number, y: number}>}} type the ship type
 * @param {number} gridWidth the maximum size of the x-axis
 * @param {number} gridHeight the maximum size of the y-axis
 * @param {Array<string[]>} existingShips already existing ships
 * @returns {string[]}
 */
const generateShip = (type, gridWidth, gridHeight, existingShips) => {
    const location = generateLocation(gridWidth, gridHeight);
    const shipCoords = type.map(({ x, y }) => moveLocation(location, x, y));

    // validate ship location
    shipCoords.every((location) =>
        validateLocation(location, gridWidth, gridHeight)
    );

    // validate ship overlap
    const hasOverlap = existingShips.some((ship) =>
        ship.some((location) => shipCoords.includes(location))
    );
    if (hasOverlap) throw new ShipHasOverlapError(shipCoords);

    return shipCoords;
};

export class ShipGenerator {
    static SHIP_TYPES = [
        [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 },
        ],
        [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 1 },
        ],
        [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
        ],
    ];

    /**
     * Generates randomly placed ships of different types.
     *
     * @param {number} gridWidth maximum size of the x-axis
     * @param {number} gridHeight maximum size of the y-axis
     * @returns {Array<string[]>}
     */
    static generateShips(gridWidth, gridHeight) {
        const ships = [];

        ShipGenerator.SHIP_TYPES.forEach((type) => {
            let generatedShip;
            let x = 0;
            const threshold = 100;

            // try generating valid ship
            while (x < threshold && !generatedShip) {
                try {
                    generatedShip = generateShip(
                        type,
                        gridWidth,
                        gridHeight,
                        ships
                    );
                } catch (err) {
                    x++;
                    continue;
                }
            }

            if (x >= threshold) throw new ShipsCannotBeGeneratedError();

            ships.push(generatedShip);
        });

        return ships;
    }
}
