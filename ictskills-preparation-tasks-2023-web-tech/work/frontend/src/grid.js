import { validateLocation } from "./util.js";

export class Grid {
    /**
     * When creating a new grid you will have to do the following tasks:
     *
     * - Assign arguments to class properties for later use
     * - Setup an empty tiles array
     * - Use the `grid-template-columns` and `grid-template-rows` styles on the DOM element
     *   to create a grid with the correct number of columns and rows, including the legend,
     *   with a respective size of 1fr.
     * - create the legend
     * - create all tiles
     *
     * @param {HTMLElement} element DOM Element of the grid
     * @param {number} width width of the grid
     * @param {number} height height of the grid
     */
    constructor(element, width, height) {
        // TODO

        /** @type {HTMLElement} */
        this.element;

        /** @type {number} */
        this.width;

        /** @type {number} */
        this.height;
    }

    /**
     * Create the legend for the x and y axis.
     *
     * Elements must...
     * - be a span element
     * - have the correct character (x-axis) or number (y-axis)
     * - have the class `grid-legend`
     * - have the class `grid-legend-x-axis` or `grid-legend-y-axis` respectively
     * - have the data attribute `data-legend` with value `x` or `y` respectively - eg. `data-legend="x"`
     * - be appended to the Grid DOM element (provided in constructor)
     *
     * Hint: CSS will automatically take care of the correct placement in the grid
     *       if all classes are assigned correctly
     */
    createLegend() {
        // TODO
    }

    /**
     * Create all playable tiles in the grid.
     *
     * You must...
     * - generate the correct location for each tile
     * - use `createSingleTile` to create a tile
     * - append all tiles to the Grid DOM element
     * - put all tiles in the `tiles` array of this class
     *
     * Hint: CSS will automatically take care of the correct placement in the grid
     *       if all classes are assigned correctly
     */
    createTiles() {
        // TODO
    }

    /**
     * Create a single tile with the provided location.
     *
     * The tile must...
     * - be a button
     * - have the `data-tile` attribute
     * - have the `data-location` attribute with the `location` as a value - eg. `data-location="A1"`
     *
     * @param {string} location the chess notation style location of this tile - eg. A1, B5, ...
     * @returns {HTMLButtonElement} the tile that was created
     */
    createSingleTile(location) {
        // TODO
    }

    /**
     * Find a tile based on the location within the current grid.
     *
     * You must...
     * - make this work with upper and lowercase locations - eg. a1, B2, ...
     * - validate if the location format is correct
     * - throw a `InvalidTileFormatError` if the location format is not correct
     * - validate if the location is in bounds of the grid
     * - throw a `TileOutOfBoundsError` if the location is out of bounds of the grid
     *
     * @param {string} location the chess notation style location of this tile - eg. A1, B5, ...
     * @return {HTMLButtonElement}
     */
    findTile(location) {
        // TODO
    }

    /**
     * Disable all tiles in the grid.
     */
    disable() {
        // TODO
    }

    /**
     * Enable all tiles in the grid expect the ones that have already been marked.
     */
    enable() {
        // TODO
    }

    /**
     * Mark the correct tile on the provided location
     *
     * The tile must...
     * - have the `data-marked` attribute
     * - be disabled
     *
     * @param {string} location the chess notation style location of this tile - eg. A1, B5, ...
     */
    markTile(location) {
        // TODO
    }

    /**
     * Place a ship on the tile of the provided location
     * The tile must have the `data-ship` attribute.
     *
     * @param {string} location the chess notation style location of this tile - eg. A1, B5, ...
     */
    placeShipOnTile(location) {
        // TODO
    }

    /**
     * Determine if the tile of the provided location has already been marked
     *
     * @param {string} location the chess notation style location of this tile - eg. A1, B5, ...
     * @returns {boolean}
     */
    hasBeenMarked(location) {
        // TODO
    }

    /**
     * Determine the number of hit ship-tiles.
     *
     * @returns {number}
     */
    getNumberOfHits() {
        // TODO
    }
}
