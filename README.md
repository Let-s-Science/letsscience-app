# Let's-Science App

## Starting the development server

```bash
# install dependencies
sudo apt install openjdk-18-jre
npm install
cd functions && npm install && cd ..
npm install -g firebase-tools

# build the functions
npm run functions:build

# start the firebase emulator
firebase emulators:start
```

In a separate terminal:

```bash
# start the preact development server
npm run dev
```

You can now use the served app from the local preact server.

## CLI Commands

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# lint the project
npm run lint

# immediately fix various issues
npm run lint-fix

# run tests with jest and enzyme
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
