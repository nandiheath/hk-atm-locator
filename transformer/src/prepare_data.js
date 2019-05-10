require('dotenv').config();

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const fs = require('fs');

const HSBC_API_ENDPOINT = process.env.HSBC_API_ENDPOINT || '';
const HANG_SENG_API_ENDPOINT = process.env.HANG_SENG_API_ENDPOINT || '';
const HSBC_CLIENT_ID = process.env.HSBC_CLIENT_ID || '';
const HSBC_CLIIENT_SECRET = process.env.HSBC_CLIIENT_SECRET || '';
const HANG_SENG_CLIENT_ID = process.env.HANG_SENG_CLIENT_ID || '';
const HANG_SENG_CLIENT_SECRET = process.env.HANG_SENG_CLIENT_SECRET || '';

/*
    Process Hang Seng Data
*/

const prepareHangSengData = async () => {
  const res = request.getAsync({
    url: HSBC_API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain',
      ClientID: HSBC_CLIENT_ID,
      ClientSecret: HSBC_CLIIENT_SECRET,
    },
  });
  fs.writeFileSync('../unprocessed/hang_seng.json', res.data, 'utf8');
};

/*
    Prepare HSBC Data
*/
const prepareHsbcData = () => {
  //TODO:
};


/*
    Main
*/
async function main() {
  await prepareHangSengData();
  await prepareHsbcData();
}
