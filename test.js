describe('UI Tests', () => {

  before(() => {
    browser.url('https://google.com');
    describe('All Tests', () => {
      ['a','b','c'].forEach(l => {
        it(l, () => {
          console.log('pass', l);
        });
      });
    });
  });

  it('logs in', () => {
    expect(browser.getTitle()).to.contain('Google');
    console.log('success');
  });

});
