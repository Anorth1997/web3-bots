import path from "path";

const dotenv = require('dotenv');
const env = dotenv.config({ path: path.resolve(__dirname, '.env') });

import { ethers } from 'ethers';

// Connect to the blockchain network, you can set your onw rpc provider node url, or use the default one
const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL || 'https://api.avax.network/ext/bc/C/rpc');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

// Function to send a transaction
/**
 *
 * @param toAddress TX to Address
 * @param data hex data with the TX
 * @param weiToSend amount of wei along with TX
 */
async function sendTransaction(toAddress: string, data: string, weiToSend: number): Promise<void> {
  const tx = {
    to: toAddress,
    value: weiToSend,
    data: data,
  };

  try {
    const transactionResponse = await wallet.sendTransaction(tx);
    console.log(`Transaction successful with hash: ${transactionResponse.hash}`);
  } catch (error) {
    console.error(`Error sending transaction: ${error}`);
  }
}

async function sleep(duration: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

// Example usage
async function main() {
  // customize the transaction toAddress, for inscription mint, this should be the same as your from address
  const toAddress = process.env.TO_ADDRESS!;
  // customize the amount of wei
  const weiToSend = 0;
  // customize the data along with transaction
  const data = '0x646174613a2c7b2270223a226173632d3230222c226f70223a226d696e74222c227469636b223a226176616c222c22616d74223a22313030303030303030227d';

  // customize the number of transaction you want to send
  const numberOfTransactions = 2;
  // For public rpc node, the rate limit for sending transaction is pretty high, so set the waitTimeInMilliseconds to avoid
  const waitTimeInMilliseconds = 5000;
  for (let i = 0; i < numberOfTransactions; i++) {
    console.log(`sending transaction ${i}`);
    await sendTransaction(toAddress, data, weiToSend);
    await sleep(waitTimeInMilliseconds)
  }
  console.log('task finish');
}

main().catch((error) => {
  console.error(error);
});
