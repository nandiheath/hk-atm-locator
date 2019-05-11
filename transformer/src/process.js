#!/usr/bin/env node

const program = require('commander');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const AddressParser = require('hk-address-parser-lib');
const async = require('async');
// default logger
const { log, error } = console;

const PrepareData = require('./prepare_data');
// const ProcessData = require('./process_data');

const BANK_HANG_SENG = 'hang_seng';
const BANK_HSBC = 'hsbc';
const BANKS = [BANK_HANG_SENG, BANK_HSBC];

/**
 * Termination process
 */
function end() {
  process.exit(0);
}

function terminateWithError(err) {
  error(err);
  process.exit(1);
}

function validateBank(bank) {
  if (BANKS.indexOf(bank) === -1) {
    terminateWithError(`Invalid bank. Allowed options: ${bank.join(',')}`);
  }
}

async function parseAddress(atm) {
  const addressLine = atm.ATMAddress.AddressLine.join(' ');
  const records = await AddressParser.parse(addressLine);
  if (records.length > 0) {
    atm.Location = records[0].coordinate();
  }
}

async function prepareData(bank, outputFile) {
  validateBank(bank);
  if (bank === BANK_HANG_SENG) {
    PrepareData.prepareHangSengData(outputFile);
  } else if (bank === BANK_HSBC) {
    PrepareData.prepareHsbcData(outputFile);
  }
}

/**
 * Use address-parser to append the addresses to the data
 * Only applicable for hang seng now
 * @param {*} inputFile
 * @param {*} outputFile
 */
async function processAddress(inputFile, outputFile) {
  const input = await fs.readFileAsync(inputFile);
  const data = JSON.parse(input.toString());
  const atms = data.data[0].Brand[0].ATM;

  log(`Start to process the data. Total: ${atms.length}`);

  async.eachOfLimit(atms, 50, async.asyncify(parseAddress), async (err) => {
    if (err) {
      terminateWithError(err);
    }
    log('Process finished');
    await fs.writeFileAsync(outputFile, JSON.stringify(data, null, 4));
    end();
  });
}



program
  .version('0.1.0');

/**
 * Get the address
 */
program
  .command('process-address <bank> <inputFile> <outputFile>')
  .description('try to fetch and get the address and save to file')
  .action(processAddress);


program
  .command('prepare <bank> <outputFile>')
  .description('Get the data from the bank')
  .action(prepareData);

program.parse(process.argv);

// If no arguments we should output the help
if (!program.args.length) program.help();
