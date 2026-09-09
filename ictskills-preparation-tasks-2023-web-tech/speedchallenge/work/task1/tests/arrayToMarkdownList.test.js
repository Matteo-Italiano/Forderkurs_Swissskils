describe('Array to markdown list', () => {
  it('converts arrays to markdown lists', () => {
    expect(arrayToMarkdownList(['First', 'Second', 'Third'])).to.equal('* First\n* Second\n* Third');
    expect(arrayToMarkdownList(['Another longer list', 'With other items', 'Actually also just 3'])).to.equal('* Another longer list\n* With other items\n* Actually also just 3');
    expect(arrayToMarkdownList(['Only one'])).to.equal('* Only one');
  });
});
