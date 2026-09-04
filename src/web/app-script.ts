export const APP_SCRIPT = `
const form = document.querySelector('#research-form');
const button = document.querySelector('#research-button');
const qInput = document.querySelector('#question');
const budgetInput = document.querySelector('#budget');
const thresholdInput = document.querySelector('#threshold');

const statusText = document.querySelector('#activity-status');
const message = document.querySelector('#activity-message');
const receiptLog = document.querySelector('#receipt-log');
const confidenceBar = document.querySelector('#confidence-bar');
const confidenceValue = document.querySelector('#confidence-value');
const result = document.querySelector('#result');

function resetUI() {
  receiptLog.innerHTML = '';
  confidenceBar.style.width = '0%';
  confidenceValue.textContent = '0%';
  result.hidden = true;
  statusText.textContent = 'Working';
  statusText.className = 'status-working';
  message.textContent = 'Agent is evaluating sources...';
}

function setConfidence(pct) {
  const clamped = Math.min(100, Math.max(0, pct));
  confidenceBar.style.width = clamped + '%';
  confidenceValue.textContent = clamped.toFixed(0) + '%';

  // Change bar color based on confidence level
  if (clamped >= 80) {
    confidenceBar.className = 'confidence-bar confidence-high';
  } else if (clamped >= 50) {
    confidenceBar.className = 'confidence-bar confidence-mid';
  } else {
    confidenceBar.className = 'confidence-bar confidence-low';
  }
}

function addReceipt(receipt, network) {
  var li = document.createElement('li');
  li.className = 'receipt-item';

  // Build the explorer link — Lora for testnet, Pera for mainnet
  var explorerUrl = network === 'testnet'
    ? 'https://lora.algokit.io/testnet/transaction/' + receipt.txId
    : 'https://explorer.perawallet.app/tx/' + receipt.txId;

  var isReal = receipt.isRealTx;
  var badge = isReal
    ? '<span class="tx-badge tx-real">ON-CHAIN</span>'
    : '<span class="tx-badge tx-mock">SIMULATED</span>';

  var txLink = isReal
    ? '<a href="' + explorerUrl + '" target="_blank" rel="noopener">' + receipt.txId.substring(0, 12) + '…</a>'
    : '<span class="tx-mock-id">' + receipt.txId.substring(0, 16) + '…</span>';

  var findingsHtml = receipt.findings
    .map(function(f) { return '<li>' + f + '</li>'; })
    .join('');

  li.innerHTML =
    '<div class="receipt-header">' +
      '<strong>Paid $' + receipt.price.toFixed(2) + ' → ' + receipt.source + '</strong>' +
      badge +
    '</div>' +
    '<div class="receipt-tx-row">' +
      'Tx: ' + txLink +
    '</div>' +
    '<div class="receipt-body">' +
      '<p class="receipt-reason">' + receipt.reason + '</p>' +
      '<p class="receipt-conf">Confidence: ' +
        receipt.confidenceBefore.toFixed(0) + '% → ' +
        receipt.confidenceAfter.toFixed(0) + '%' +
      '</p>' +
      '<ul class="receipt-findings">' + findingsHtml + '</ul>' +
    '</div>';

  receiptLog.appendChild(li);
}

function renderResult(data) {
  document.querySelector('#metric-confidence').textContent = Math.min(100, data.confidence).toFixed(0) + '%';
  document.querySelector('#metric-cost').textContent = '$' + data.totalCost.toFixed(2);
  document.querySelector('#metric-sources').textContent = String(data.sourcesUsed);
  document.querySelector('#metric-skipped').textContent = String(data.sourcesSkipped);
  document.querySelector('#report-answer').textContent = data.answer;

  // Show receiver address
  var receiverEl = document.querySelector('#report-receiver');
  if (receiverEl && data.receiver) {
    receiverEl.textContent = data.receiver;
  }

  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

form.addEventListener('submit', async function(event) {
  event.preventDefault();
  resetUI();
  button.disabled = true;

  var q = qInput.value.trim();
  var budgetCap = parseFloat(budgetInput.value);
  var confidenceThreshold = Math.min(parseInt(thresholdInput.value, 10), 100);

  try {
    var res = await fetch('/demo/research', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ q: q, budgetCap: budgetCap, confidenceThreshold: confidenceThreshold }),
    });
    var data = await res.json().catch(function() { return {}; });

    if (!res.ok) {
      throw new Error(data.message || 'The agent failed with HTTP ' + res.status + '.');
    }

    var network = data.network || 'testnet';

    // Set initial base confidence from the server
    var baseConf = data.baseConfidence || 30;
    setConfidence(baseConf);
    message.textContent = 'Base confidence: ' + baseConf + '%. Consulting sources...';

    // Animate receipts one by one
    var delay = 600;
    for (var i = 0; i < data.receipts.length; i++) {
      (function(receipt, idx) {
        setTimeout(function() {
          addReceipt(receipt, network);
          setConfidence(receipt.confidenceAfter);
          message.textContent = 'Paid ' + receipt.source + '. Confidence now ' + receipt.confidenceAfter.toFixed(0) + '%.';
        }, delay + idx * 1200);
      })(data.receipts[i], i);
    }

    setTimeout(function() {
      statusText.textContent = 'Complete';
      statusText.className = 'status-complete';
      message.textContent = 'Research finished. ' + data.sourcesUsed + ' source(s) consulted, $' + data.totalCost.toFixed(2) + ' spent.';
      renderResult(data);
      button.disabled = false;
    }, delay + data.receipts.length * 1200 + 400);

  } catch (error) {
    statusText.textContent = 'Failed';
    statusText.className = 'status-failed';
    message.textContent = error instanceof Error ? error.message : String(error);
    button.disabled = false;
  }
});
`;
