# Transaction Bot
This bot is designed to send customized transactions on the Ethereum blockchain. It's built using ethers.js and TypeScript.

## Getting Started
### Prerequisites
- Node.js and npm (Node Package Manager)
- ts-node to run app.ts directly
- A text editor (like Visual Studio Code)
- Basic understanding of TypeScript and Ethereum transactions
### Installation
1. Clone the Repository

```bash
git clone https://github.com/Anorth1997/web3-bots.git
cd web3-bots/inscription-mint-bot
```
2. Install Dependencies

```bash
npm install
```

3. Set Up Environment Variables
- Create a .env file in the inscription-mint-bot folder
- Add the following variables:
```
PROVIDER_URL=Your_Ethereum_Provider_URL
PRIVATE_KEY=Your_Ethereum_Wallet_Private_Key
TO_ADDRESS=Recipient_Address
```

- Replace `Your_Ethereum_Provider_URL`, `Your_Ethereum_Wallet_Private_Key`, and `Recipient_Address` with your actual Ethereum provider URL, private key, and the recipient's address.

4. Install ts-node
```bash
npm install -g ts-node
```

### Usage
1. Customize the Transaction

- Open app.ts.
- Modify the `data`, `weiToSend`, `numberOfTransactions`, and `waitTimeInMilliseconds` variables as needed.
2. Run the Bot

```bash
ts-node app.ts
```
### Important Notes
- Security: Never share your private key. Keep it secure at all times.
- Rate Limits: Be aware of the rate limits of your Ethereum provider.
