import { coordinatesToLocation, validateLocation } from "./util.js";

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
        /** @type {HTMLElement} */
        this.element = element;

        /** @type {number} */
        this.width = width;

        /** @type {number} */
        this.height = height;

        /** @type {HTMLButtonElement[]} */
        this.tiles = [];

        // one extra column/row for the legend
        this.element.style.gridTemplateColumns = `repeat(${width + 1}, 1fr)`;
        this.element.style.gridTemplateRows = `repeat(${height + 1}, 1fr)`;

        this.createLegend();
        this.createTiles();
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
        for (let x = 0; x < this.width; x++) {
            // the x-axis is labelled with the column letter - A, B, C, ...
            this.element.appendChild(
                this.createSingleLegend("x", coordinatesToLocation(x, 0).slice(0, 1))
            );
        }

        for (let y = 0; y < this.height; y++) {
            // the y-axis is labelled with the row number - 1, 2, 3, ...
            this.element.appendChild(this.createSingleLegend("y", `${y + 1}`));
        }
    }

    /**
     * Create a single legend element for one of the two axes.
     *
     * @param {'x'|'y'} axis the axis this legend belongs to
     * @param {string} label the character (x-axis) or number (y-axis) to display
     * @returns {HTMLSpanElement} the legend element that was created
     */
    createSingleLegend(axis, label) {
        const legend = document.createElement("span");

        legend.textContent = label;
        legend.classList.add("grid-legend", `grid-legend-${axis}-axis`);
        legend.dataset.legend = axis;

        return legend;
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
        // row by row, so the DOM order matches the visual order of the grid
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const tile = this.createSingleTile(coordinatesToLocation(x, y));

                this.tiles.push(tile);
                this.element.appendChild(tile);
            }
        }
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
        const tile = document.createElement("button");

        tile.type = "button";
        tile.dataset.tile = "";
        tile.dataset.location = location;

        return tile;
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
        const normalized =
            typeof location === "string" ? location.toUpperCase() : location;

        // throws an InvalidTileFormatError or a TileOutOfBoundsError if invalid
        validateLocation(normalized, this.width, this.height);

        return this.tiles.find((tile) => tile.dataset.location === normalized);
    }

    /**
     * Disable all tiles in the grid.
     */
    disable() {
        this.tiles.forEach((tile) => {
            tile.disabled = true;
        });
    }

    /**
     * Enable all tiles in the grid expect the ones that have already been marked.
     */
    enable() {
        this.tiles.forEach((tile) => {
            tile.disabled = tile.hasAttribute("data-marked");
        });
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
        const tile = this.findTile(location);

        tile.dataset.marked = "";
        tile.disabled = true;
    }

    /**
     * Place a ship on the tile of the provided location
     * The tile must have the `data-ship` attribute.
     *
     * @param {string} location the chess notation style location of this tile - eg. A1, B5, ...
     */
    placeShipOnTile(location) {
        this.findTile(location).dataset.ship = "";
    }

    /**
     * Determine if the tile of the provided location has already been marked
     *
     * @param {string} location the chess notation style location of this tile - eg. A1, B5, ...
     * @returns {boolean}
     */
    hasBeenMarked(location) {
        return this.findTile(location).hasAttribute("data-marked");
    }

    /**
     * Determine the number of hit ship-tiles.
     *
     * @returns {number}
     */
    getNumberOfHits() {
        return this.tiles.filter(
            (tile) =>
                tile.hasAttribute("data-ship") &&
                tile.hasAttribute("data-marked")
        ).length;
    }
}
