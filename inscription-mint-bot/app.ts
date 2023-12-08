import { ethers } from 'ethers';
import { config } from "./config";

// Connect to the blockchain network, you can set your onw rpc provider node url, or use the default one
const provider = new ethers.JsonRpcProvider(config.rpcProviderUrl || 'https://bsc.publicnode.com');
const wallet = new ethers.Wallet(config.privateKey, provider);

// Function to send a transaction
/**
 *
 * @param toAddress TX to Address
 * @param data hex data with the TX
 * @param weiToSend amount of wei along with TX
 * @param nonce
 */
async function sendTransaction(toAddress: string, data: string, weiToSend: number, nonce: number): Promise<void> {
  const gasPrice = (await provider.getFeeData()).gasPrice;

  const tx = {
    to: toAddress,
    value: weiToSend,
    data: data,
    nonce: nonce,
    gasPrice: gasPrice,
    maxPriorityFeePerGas: 0,
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

/**
 * validate if all the configurations are set properly
 * 脚本配置校验
 */
function validate() {
  if (!config.mintCount) {
    throw new Error("Please set mintCount in config.ts")
  }

  if (!config.inputData) {
    throw new Error("Please set inputData in config.ts")
  }

  if (!config.rpcProviderUrl) {
    throw new Error("Please set rpcProviderUrl in config.ts")
  }

  if (!config.privateKey) {
    throw new Error("Please set privateKey in config.ts")
  }
}

// Example usage
async function main() {
  validate();
  // customize the transaction toAddress
  const toAddress = await wallet.getAddress();
  // customize the amount of wei
  const weiToSend = 0;
  // customize the data along with transaction
  const data = config.inputData;

  let nonce = await wallet.getNonce();
  // customize the number of transaction you want to send
  const numberOfTransactions = config.mintCount;

  // For public rpc node, the rate limit for sending transaction is pretty high, so set the waitTimeInMilliseconds to avoid
  const waitTimeInMilliseconds = 100;
  // await sendTransaction(toAddress, data, weiToSend, nonce);
  for (let i = 0; i < numberOfTransactions; i++) {
    console.log(`sending transaction ${i}, nonce: ${nonce}`);
    await sendTransaction(toAddress, data, weiToSend, nonce);
    await sleep(waitTimeInMilliseconds)
    nonce += 1
  }
  console.log('task finish');
}

main().catch((error) => {
  console.error(error);
});
