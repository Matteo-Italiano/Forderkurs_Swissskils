/**
 * ICTSkills 2022 — Trade 17 — Web Technologies
 *
 * Speed challenge — Task 4 — String hash
 */

/**
 * Calculate the hash of a string which is represented by a HSL color.
 *
 * The three color values should be calculated as follows:
 *   H (Hue): Modulo 360 of the sum of the UTF-16 codes of all characters
 *   S (Saturation): Modulo 60 of 5 times the string length, plus 40 (so S can never be lower than 40)
 *   L (Lightness): Modulo 50 of the sum of the H and S value calculated before, plus 25 (so L can never be lower than 25)
 *
 * The color should be returned as an array of numbers in the correct order (which is [h, s, l]).
 *
 * Example:
 *   Input: SwissSkills
 *   Output: [83, 95, 53]
 *
 * @param {string} string
 *
 * @return {Array<number>}
 */
const stringHash = (string) => {
  return [0, 0, 0];
};

export default stringHash;
