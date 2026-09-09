import { InvalidTileFormatError, TileOutOfBoundsError } from "../lib/errors.js";

/**
 * Validate a location.
 *
 * If the location has an incorrect format:
 * -> throw an `InvalidTileFormatError`
 *
 * If the location is out of bounds:
 * -> throw a `TileOutOfBoundsError`
 *
 * If the location is valid return `true`.
 *
 * @param {string} location the chess notation style location - eg. A1, B5, ...
 * @param {number} maxWidth the maximum size of the x-axis
 * @param {number} maxHeight the maximum size of the y-axis
 * @returns {boolean}
 */
export const validateLocation = (location, maxWidth, maxHeight) => {
    // TODO
};

/**
 * Convert a chess notation style location to x and y coordinates.
 * The x/y coordinates must start with 0 to be able to index arrays.
 * eg.:
 *
 * locationToCoordinates('A1') => {x: 0, y: 0}
 * locationToCoordinates('A2') => {x: 0, y: 1}
 * locationToCoordinates('B1') => {x: 1, y: 0}
 * locationToCoordinates('B2') => {x: 1, y: 1}
 *
 * @param {string} location the chess notation style location - eg. A1, B5, ...
 * @returns {{x: number, y: number}}
 */
export const locationToCoordinates = (location) => {
    // TODO
};

/**
 * Convert x and y coordinates to a chess notation style location.
 * The x/y coordinates start with 0 to be able to index arrays.
 *
 * coordinatesToLocation(0, 0) => A1
 * coordinatesToLocation(0, 1) => A2
 * coordinatesToLocation(1, 0) => B1
 * coordinatesToLocation(1, 1) => B2
 *
 * @param {number} x the x coordinate
 * @param {number} y the y coordinate
 * @returns {string}
 */
export const coordinatesToLocation = (x, y) => {
    // TODO
};

/**
 * Generate a random chess notation style location which fits into the bounds provided.
 *
 * @param {number} maxWidth the maximum size of the x-axis
 * @param {number} maxHeight the maximum size of the y-axis
 * @returns {string}
 */
export const generateLocation = (maxWidth, maxHeight) => {
    // TODO
};

/**
 * Move a location along the x/y axis.
 * You must be able to handle positive and negative `dx`/`dy` values.
 * eg.:
 *
 * moveLocation('A1', 1, 1) => B2
 * moveLocation('A5', 0, -2) => A3
 *
 * @param {string} location the original location
 * @param {number} dx the number of tiles to move on the x-axis
 * @param {number} dy the number of tiles to move on the y-axis
 * @returns {string}
 */
export const moveLocation = (location, dx = 0, dy = 0) => {
    // TODO
};
