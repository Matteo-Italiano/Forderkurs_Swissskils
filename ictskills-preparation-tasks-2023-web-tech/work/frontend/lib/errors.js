export class InvalidTileFormatError extends Error {
  constructor(format) {
    super(`Invalid format "${format}" for tile location`);
  }
}

export class TileOutOfBoundsError extends Error {
  constructor(location) {
    super(`Location "${location}" out of bounds`);
  }
}

export class ShipHasOverlapError extends Error {
    constructor(ship) {
        super(`Ship "${JSON.stringify(ship)}" has overlap`);
    }
}

export class ShipsCannotBeGeneratedError extends Error {
    constructor() {
        super('Ships cannot be generated - complete util functions and check against unit tests');
    }
}
