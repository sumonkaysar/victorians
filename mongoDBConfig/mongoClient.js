const { MongoClient, ServerApiVersion } = require("mongodb");
const URI = require("./uri");

let client;

async function connect() {
    if (!client) {
        client = new MongoClient(URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }
    return client;
}

const getConnectedClient = () => client;

module.exports = { connect, client: getConnectedClient }