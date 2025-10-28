# Form Field Plugin - reference implementation [DRAFT]



## Quick Start

The following prerequisites need to be installed prior to running the config with Docker Compose:

* [Docker Desktop](https://docs.docker.com/desktop/)
* [Maven](https://maven.apache.org/install.html)
* [Node.js](https://nodejs.org/en/download)
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

Once the prerequisites are installed and the Git repository has been cloned to the local machine, run the subsequent terminal commands to build the components, start all services with [Docker Compose](https://docs.docker.com/compose/), and seed the system with example metadata and data:

```sh
yarn install --frozen-lockfile
yarn build
yarn start
```

## Overview

### DHIS2 Capture App Plugin

The Capture app plugin is a [DHIS2 web app](https://developers.dhis2.org/docs/quickstart/quickstart-web/) with a Capture plugin entrypoint. The source code is located in the `capture-plugin` directory of the reference implementation project. The plugin renders a text field together with a generate button for generating the DRS ID based on a user defined algorithm. 

## TODO: Add walkthrough

# Support
Questions or feedback about this reference implementation can be posted on the [DHIS2 Community of Practice](https://community.dhis2.org/). Contributions in the form of [pull requests](https://github.com/dhis2/reference-form-field-plugin/pulls) are more than welcome.
