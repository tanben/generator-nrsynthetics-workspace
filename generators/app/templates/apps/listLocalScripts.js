// @ts-check
/**
 *
 * Upload Synthetics Monitor Scripts
 *
 */


const synthClient = require("@tanben/nr-synthetics-client");
const { apiKey } = require("../.nrconfig.json");

const sclient = synthClient({ apiKey });

// List local monitors that are defined in nr-monitor.json
const monitors = sclient.listMonitors();

console.log(JSON.stringify(monitors));
