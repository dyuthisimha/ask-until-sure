/**
 * Fund testnet accounts and send real micro-transactions so Lora shows activity.
 * 
 * Usage: npx tsx scripts/fund-and-test.ts
 */
import algosdk from 'algosdk';

const PAYER_MNEMONIC = 'minor defense hurdle elephant despair ability pull dilemma barrel tape success warrior actor liberty draft sniff crew cute zero aisle enlist laugh job abandon vibrant';
const RECEIVER_ADDRESS = 'AIJFAGOSGMWOTLS6CUR2COTAFJPEXD2ZZ5T5NWNMAHWM2G4KXPSWGPCCO4';

const algodClient = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');

async function fundFromFaucet(address: string): Promise<boolean> {
  // Try the Lora TestNet dispenser API
  const addr = String(address);
  const url = `https://dispenser.testnet.aws.algodev.network/fund?account=${addr}&amount=10000000`;
  try {
    const res = await fetch(url, { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      console.log(`  Faucet funded ${addr.substring(0, 8)}…: txId=${data.txId ?? 'ok'}`);
      return true;
    }
    console.log(`  Faucet returned ${res.status} for ${addr.substring(0, 8)}…`);
  } catch (e) {
    console.log(`  Faucet error for ${addr.substring(0, 8)}…:`, (e as Error).message);
  }
  return false;
}

async function getBalance(address: string): Promise<number> {
  try {
    const info = await algodClient.accountInformation(address).do();
    return Number(info.amount);
  } catch {
    return 0;
  }
}

async function sendMicroPayment(
  senderMnemonic: string,
  receiverAddress: string,
  amountMicroAlgo: number,
  note: string,
): Promise<string> {
  const account = algosdk.mnemonicToSecretKey(senderMnemonic);
  const params = await algodClient.getTransactionParams().do();

  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender: account.addr.toString(),
    receiver: receiverAddress,
    amount: amountMicroAlgo,
    note: new TextEncoder().encode(note),
    suggestedParams: params,
  });

  const signedTxn = txn.signTxn(account.sk);
  const { txid } = await algodClient.sendRawTransaction(signedTxn).do();

  // Wait for confirmation
  await algosdk.waitForConfirmation(algodClient, txid, 4);
  return txid;
}

async function main() {
  const payerAccount = algosdk.mnemonicToSecretKey(PAYER_MNEMONIC);
  const payerAddr = payerAccount.addr.toString();
  console.log('Payer address:', payerAddr);
  console.log('Receiver address:', RECEIVER_ADDRESS);
  console.log();

  // Check balances
  let payerBalance = await getBalance(payerAddr);
  let receiverBalance = await getBalance(RECEIVER_ADDRESS);
  console.log(`Payer balance: ${(payerBalance / 1e6).toFixed(6)} ALGO`);
  console.log(`Receiver balance: ${(receiverBalance / 1e6).toFixed(6)} ALGO`);
  console.log();

  // Fund if needed
  if (payerBalance < 1_000_000) {
    console.log('Payer needs funding. Trying faucet...');
    await fundFromFaucet(payerAddr);
    // Wait a moment for the faucet tx to confirm
    await new Promise(r => setTimeout(r, 5000));
    payerBalance = await getBalance(payerAddr);
    console.log(`Payer balance after funding: ${(payerBalance / 1e6).toFixed(6)} ALGO`);
  }

  if (payerBalance < 200_000) {
    console.log('\n⚠️  Payer account is not funded. Please fund it manually:');
    console.log(`   Go to: https://lora.algokit.io/testnet/fund`);
    console.log(`   Paste address: ${payerAddr}`);
    console.log(`   Then re-run this script.`);
    process.exit(1);
  }

  // Send 3 micro-transactions to simulate the research payment flow
  console.log('\nSending micro-transactions...\n');

  const sources = ['regulatory', 'caselaw', 'specialist'];
  const amounts = [100_000, 150_000, 200_000]; // 0.1, 0.15, 0.2 ALGO

  for (let i = 0; i < sources.length; i++) {
    try {
      const txId = await sendMicroPayment(
        PAYER_MNEMONIC,
        RECEIVER_ADDRESS,
        amounts[i],
        `ask-until-sure:${sources[i]}:research-payment`,
      );
      console.log(`✅ ${sources[i]}: ${(amounts[i] / 1e6).toFixed(2)} ALGO`);
      console.log(`   TxId: ${txId}`);
      console.log(`   Lora: https://lora.algokit.io/testnet/transaction/${txId}`);
      console.log();
    } catch (e) {
      console.error(`❌ ${sources[i]} failed:`, (e as Error).message);
    }
  }

  // Final balances
  payerBalance = await getBalance(payerAddr);
  receiverBalance = await getBalance(RECEIVER_ADDRESS);
  console.log(`Final payer balance: ${(payerBalance / 1e6).toFixed(6)} ALGO`);
  console.log(`Final receiver balance: ${(receiverBalance / 1e6).toFixed(6)} ALGO`);
}

main().catch(console.error);
