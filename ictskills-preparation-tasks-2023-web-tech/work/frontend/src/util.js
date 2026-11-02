import { InvalidTileFormatError, TileOutOfBoundsError } from "../lib/errors.js";

/**
 * A valid location consists of exactly one letter (the x-axis) followed by
 * at least one digit (the y-axis) - eg. A1, B5, Z99, ...
 */
const LOCATION_FORMAT = /^[A-Za-z]\d+$/;

/** char code of the letter `A` - the first column of every grid */
const FIRST_COLUMN_CHAR_CODE = "A".charCodeAt(0);

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
    if (typeof location !== "string" || !LOCATION_FORMAT.test(location)) {
        throw new InvalidTileFormatError(location);
    }

    const { x, y } = locationToCoordinates(location);

    if (x < 0 || y < 0 || x >= maxWidth || y >= maxHeight) {
        throw new TileOutOfBoundsError(location);
    }

    return true;
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
    const column = location.slice(0, 1).toUpperCase();
    const row = location.slice(1);

    return {
        x: column.charCodeAt(0) - FIRST_COLUMN_CHAR_CODE,
        y: parseInt(row, 10) - 1,
    };
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
export const coordinatesToLocation = (x, y) =>
    `${String.fromCharCode(FIRST_COLUMN_CHAR_CODE + x)}${y + 1}`;

/**
 * Generate a random chess notation style location which fits into the bounds provided.
 *
 * @param {number} maxWidth the maximum size of the x-axis
 * @param {number} maxHeight the maximum size of the y-axis
 * @returns {string}
 */
export const generateLocation = (maxWidth, maxHeight) =>
    coordinatesToLocation(
        Math.floor(Math.random() * maxWidth),
        Math.floor(Math.random() * maxHeight)
    );

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
    const { x, y } = locationToCoordinates(location);

    return coordinatesToLocation(x + dx, y + dy);
};
