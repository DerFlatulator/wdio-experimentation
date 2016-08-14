const browserOpts = {
    'chrome': {
        desiredCapabilt
    }
}

const commonOpts = {

}

module.exports = {
    common() {
        return commonOpts;
    },
    forBrowser(browser) {
        return browserOpts[browser];
    },
};


