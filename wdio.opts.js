const _ = require('lodash')
const firefoxProfile = new (require('firefox-profile'))
const Promise = require('bluebird')

const browserOpts = {
    'chrome': () => ({
        desiredCapabilities: {
            browserName: 'chrome'
        }
    }),
    'firefox'() { 
        const desiredCapabilities = {
            browserName: 'firefox',
        }
        const message = "data:text/html, <html><h3>Loading...</h3></html>"
        const prefs = {
            "browser.startup.homepage": message,
            "startup.homepage_welcome_url.additional":  message,
            "browser.startup.homepage_override.mstone": "ignore",
        }
        _.forEach(prefs, (value, key) => firefoxProfile.setPreference(key, value))
        return new Promise(acc => firefoxProfile.encoded(acc))
            .then(firefox_profile => {
                Object.assign(desiredCapabilities, { firefox_profile })
                return { desiredCapabilities }
            });
    },
    'ie': () => ({
        desiredCapabilities: {
            browserName: 'internet explorer',
            nativeEvents: false,
        }
    }),
}

const commonOpts = {
    acceptSslCerts: true,
}

module.exports = {
    forBrowser(browser) {
        return Promise
            .resolve(browserOpts[browser]())
            .then(browserOpts =>  _.merge({}, commonOpts, browserOpts))
    },
}
