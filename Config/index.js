/**
 * Choose the appropriate file
 * @file src/config/index.js
 * @author MOR NDIAYE - Ludovic JAFFREZOU
 */
if(process.env.NODE_ENV === "production") {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}
