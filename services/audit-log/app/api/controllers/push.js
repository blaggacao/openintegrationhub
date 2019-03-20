/* eslint no-underscore-dangle: "off" */
/* eslint max-len: "off" */
/* eslint func-names: "off" */
/* eslint consistent-return: "off" */

const express = require('express');
const bodyParser = require('body-parser');
const Ajv = require('ajv');
const config = require('../../config/index');

const storage = require(`./${config.storage}`); // eslint-disable-line

const jsonParser = bodyParser.json();
const router = express.Router();

const log = require('../../config/logger'); // eslint-disable-line
const schema = require('../../models/log.json');
const payloadSchema = require('../../models/payload.json');

const ajv = new Ajv();
ajv.addSchema(payloadSchema);
const validator = ajv.compile(schema);


// Gets all logs
router.post('/', jsonParser, async (req, res) => {
  const message = req.body;

  const valid = validator(message);

  if (!valid) {
    if (process.env.NODE_ENV !== 'test') {
      log.error('Messageformat is not valid!');
      log.error(ajv.errors);
    }
    return res.status(400).send(`Messageformat is not valid: ${JSON.stringify(ajv.errors)}`);
  }

  try {
    log.info('Saving event to DB...');
    const response = await storage.addEvent(message);
    log.info('Successfully Saved');
    return res.status(200).send(response);
  } catch (error) {
    log.error('Save failed:');
    log.error(error);
    return res.status(500).send(error);
  }
});


module.exports = router;