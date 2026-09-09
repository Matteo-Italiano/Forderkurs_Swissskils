/**
 * ICTSkills 2022 — Trade 17 — Web Technologies
 *
 * Speed challenge — Task 8 — Regex
 */

/*
 * Regex
 *
 * Write your solutions into the "regex" property of each sub task.
 * Do not alter anything else in this file.
 *
 * To test your solution, you can open the test page linked in the task description.
 */

const regex = {
    solutions: [
        // Regex #0: Example
        // THIS IS AN EXAMPLE
        {
            description: "Example",

            // The amount of points you get for this regex
            score: 0,

            // The maximum length the regex can be. If it's longer, there will be no points awarded.
            maxLength: 4,

            // The regex must match these strings using RegExp.prototype.test
            matches: ["a", "b"],

            // The regex must not match these strings
            skip: ["c"],

            // Write your regex here
            regex: /[ab]/
        },

        // -----------------------------------------
        // TODO:
        // Sub tasks that will be marked start here.

        // Regex #1
        {
            description: "Hexadecimal strings",
            score: 0.5,
            maxLength: 11,
            matches: ["093817548", "3a90fe3", "aaa", "d3d", "25c6b"],
            skip: ["g398a", "h", "093817i48", "3a90fex"],
            regex: /TODO/ // TODO
        },

        // Regex #2
        {
            description: "Islands",
            score: 0.5,
            maxLength: 5,
            matches: ["Hawaii", "Molokai", "Kauai", "Lanai"],
            skip: ["Arizona", "Washington", "California", "Maine", "Finland", "Mali", "Namibia", "Malawi"],
            regex: /TODO/ // TODO
        },

        // Regex #3
        {
            description: "Markdown links",
            score: 1,
            maxLength: 30,
            matches: ["[google](https://google.com)", "[super cool title](http://abc.com#some-ref)", "[send a mail](mailto:test@test.com)"],
            skip: ["https://google.com", "(google)[https://google.com]", "[google](https://google.com", "google](https://google.com)", "[google](https://google.com).", ".[google](https://google.com)", "[google]](https://google.com)", "[google](https://google.com))"],
            regex: /TODO/ // TODO
        },

        // Regex #4
        {
            description: "Formatted swiss phone numbers",
            score: 1,
            maxLength: 42,
            matches: ["079 543 19 90", "044 001 10 10", "+41 041 987 65 43", "+41 41 987 65 43", "0041 041 123 45 67", "0041 41 123 45 67"],
            skip: ["0795431990", "00795431990", "079 543 19 90 00", "079 543 19 901", "079 543 a9 90", "+1 041 987 65 43", "001 41 123 45 67"],
            regex: /TODO/ // TODO
        },
    ]
};
