const tests = [
    {
        title: 'it stops, if it cannot reach the first charging station',
        params: [5, [7, 9, 17, 25, 34, 43, 52, 59]],
        expected: 5,
    },
    {
        title: 'it stops, if it cannot reach the next charging station',
        params: [10, [6, 12, 19, 27, 30, 42, 52, 58]],
        expected: 40,
    },
    {
        title: 'it continues for a full battery after reaching the last charging station',
        params: [12, [3, 15, 21, 28, 36, 44, 53, 60, 65]],
        expected: 77,
    },
    {
        title: 'it can go for one full battery if there are no charging stations',
        params: [7, []],
        expected: 7,
    },
];

describe('Walk', () => {
    tests.forEach((config, i) => {
        const title = (config.title?.startsWith('it ') ? config.title.substring(3) : config.title) ?? `Test ${i + 1}`;

        it(title, () => {
            const distance = walk(...config.params);
            expect(distance).to.equal(config.expected);
        });
    });
});
