# wdio experimentation

Basic experimentaiton with WebDriver.IO and Selenium Standalone.

### Start selenium server:

```sh
$ curl -O https://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar
$ java -jar selenium-server-standalone-2.53.1.jar
```

### Run the tests:

```sh
npm test
```

### TODO:

- [ ] Automate adding drivers to `$PATH`.
- [x] Merge [wdio-teamcity-reporter#9](https://github.com/sullenor/wdio-teamcity-reporter/pull/9).
- [x] Get `executeAsyncScript` working in as many browsers as possible.

