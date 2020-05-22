'use strict';
require('dotenv').config() // Appsync config from .env
const AppSync = {
    "graphqlEndpoint": process.env.API_URL,
    "region": process.env.Region,
    "authenticationType": process.env.Auth_Mode,
    "apiKey": process.env.API_KEY,
};
const ApiId = process.env.API_ID;

global.WebSocket = require('ws');
global.window = global.window || {
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    WebSocket: global.WebSocket,
    ArrayBuffer: global.ArrayBuffer,
    addEventListener: function () { },
    navigator: { onLine: true }
};
global.localStorage = {
    store: {},
    getItem: function (key) {
        return this.store[key]
    },
    setItem: function (key, value) {
        this.store[key] = value
    },
    removeItem: function (key) {
        delete this.store[key]
    }
};
require('es6-promise').polyfill();
require('isomorphic-fetch');

// Require AppSync module
const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;
const AWSAppSyncClient = require('aws-appsync').default;

// INIT
// Set up AppSync client
const client = new AWSAppSyncClient({
    url: AppSync.graphqlEndpoint,
    region: AppSync.region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: AppSync.apiKey
    }
});

// GRAPHQL
const gql = require('graphql-tag');

const Query = gql(`
query{
     getMovies{
        id
        name
        producer
        rating
        rank
       }
     }
`)

// APP CODE
client.hydrated().then(function (client) {
    // Now run a query
    client.query({ query: Query})
        .then(function log(data) {
            data = JSON.stringify(data);
            data = JSON.parse(data);
            if(data.data.getMovies) {
              console.log('(Query Data)----------->', data.data.getMovies);
            }  
            else {
                console.log("Error while fetching data");
            }
        })
        .catch(console.error);
});
