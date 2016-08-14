const wdio = require('webdriverio')
const Promise = require('bluebird')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')

const getOpts = require('./wdio.opts.js')
const browser = process.env.browser || 'chrome'

getOpts.forBrowser(browser)
    .then(opts => {
        global.client = wdio.remote(opts)
        run()
    })
    .catch(console.error)

function run() {
    return client
        .init()
        .then(login)
        .then(() => getTests().then(executeTests))
        .catch(console.error)
        .end()
}

function login() {
    return client
        .url('https://google.com')
        .waitForExist('input[name="q"]', 10000)
        .setValue('input[name="q"]', 'WebDriver.IO\n')
        .waitForExist('#resultStats', 10000)
        .getTitle()
        .then(log)
}

function getTests(timeout=5*1000) {
    return Promise.resolve(
        client
            .timeouts('script', timeout)
            .execute(function (arg0) {
                return ['a', 'b', 'c']
            }, 'arg0')
    )
        .then(response => response.value)
        .tap(tests => log('got', ...tests))
}

function executeTests(tests, testTimeout=60*1000) {
    return Promise.resolve(
        client.timeouts('script', testTimeout)
    )
        .then(() => Promise.mapSeries(
            tests, 
            test => executeTest(test)
        ))
        .tap(() => log('all done'))
}

function executeTest(test) {
    return Promise.resolve(
        client
            .executeAsync(function (test, callback) {
                // Browser context. 
                // Do not use ES6+ features in here, it'll break IE.
                setTimeout(function () { 
                    callback('done ' + test) 
                }, 1000)
            }, test)
    )
        .then(response => response.value)
        .tap(() => process.env.takeScreenshot && screenshot(test))
        .tap(log)
}

function log(...strings) {
    console.log(`${new Date().toLocaleTimeString()} [${_.padStart(browser, 8)}] ${strings.join(' ')}`)
}

function screenshot(test) {
    return client.screenshot()
        .then(({ value }) => {
            const date = new Date().toISOString().replace(':','.')
            const filePath = path.join(__dirname, `screens/screen-${date}-${test}.png`)
            fs.writeFile(filePath, value, 'base64', function (err) {
                if(err) console.log(err);
            })
        })
}