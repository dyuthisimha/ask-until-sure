import type { RuntimeConfig } from '../config.js';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function renderPage(config: RuntimeConfig): string {
  const receiver = escapeHtml(config.payTo);
  const demoState = config.demoMode ? 'Agent ready' : 'Demo disabled';

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Confidence-Gated Research Agent." />
    <title>Ask Until Sure — Agentic Commerce</title>
    <link rel="stylesheet" href="/assets/styles.css" />
    <script src="/assets/app.js" defer></script>
  </head>
  <body>
    <div class="noise" aria-hidden="true"></div>
    <header class="site-header">
      <a class="brand" href="/" aria-label="Ask Until Sure home">
        <span class="brand-mark">A</span>
        <span>Ask Until Sure</span>
      </a>
      <div class="header-status">
        <span class="status-dot"></span>
        <span>Algorand ${escapeHtml(config.networkName)}</span>
        <span class="header-divider"></span>
        <span>${demoState}</span>
      </div>
    </header>

    <main>
      <section class="hero">
        <p class="eyebrow">CONFIDENCE-GATED RESEARCH AGENT</p>
        <h1>Ask a hard question.<br /><span>Watch the agent pay for certainty.</span></h1>
        <p class="hero-copy">
          The agent starts with a base confidence, evaluates available paid data sources, and selectively pays for them via x402 until it reaches your target confidence or hits the budget cap.
        </p>
      </section>

      <section class="workspace" aria-label="Ask Until Sure demo">
        <div class="demo-panel">
          <div class="panel-heading">
            <div>
              <p class="section-label">LIVE DEMO</p>
              <h2>Configure the agent</h2>
            </div>
            <span class="testnet-pill">TESTNET · NO REAL FUNDS</span>
          </div>

          <form id="research-form">
            <div class="input-group">
              <label for="question">Your question</label>
              <textarea id="question" name="question" required placeholder="E.g., FDA drug approval process for novel treatments" rows="3"></textarea>
            </div>
            
            <div class="settings-row">
              <div class="input-group">
                <label for="budget">Budget Cap ($)</label>
                <input id="budget" type="number" step="0.01" min="0" value="${config.budgetCapUsd}" required />
              </div>
              <div class="input-group">
                <label for="threshold">Target Confidence (%)</label>
                <input id="threshold" type="number" step="1" min="1" max="100" value="${config.confidenceThreshold}" required />
              </div>
            </div>

            <button id="research-button" type="submit">
              <span>Start Research</span>
              <span class="button-arrow" aria-hidden="true">↗</span>
            </button>
          </form>

          <div class="activity" aria-live="polite">
            <div class="activity-topline">
              <span>CONFIDENCE METER</span>
              <span id="confidence-value">0%</span>
            </div>
            <div class="confidence-bar-container">
              <div id="confidence-bar" class="confidence-bar" style="width: 0%"></div>
            </div>

            <div class="activity-topline" style="margin-top: 30px;">
              <span>RECEIPT LOG</span>
              <span id="activity-status">Ready</span>
            </div>
            <ul id="receipt-log" class="receipt-log">
              <li class="empty-log">Enter a question and start research.</li>
            </ul>
            <p id="activity-message" class="activity-message">Waiting to start.</p>
          </div>
        </div>

        <aside class="explainer">
          <p class="section-label">AVAILABLE SOURCES</p>
          <h2>Data Pricing</h2>
          <div class="flow-list">
            <div><span>01</span><p><strong>Regulatory Filings</strong><small>${config.prices.regulatory} USDC</small></p></div>
            <div><span>02</span><p><strong>Case Law</strong><small>${config.prices.caselaw} USDC</small></p></div>
            <div><span>03</span><p><strong>Specialist Opinion</strong><small>${config.prices.specialist} USDC</small></p></div>
          </div>
          <div class="safety-note">
            <span aria-hidden="true">◇</span>
            <p><strong>Receiver Wallet</strong><br /><a href="https://lora.algokit.io/testnet/account/${receiver}" target="_blank" rel="noopener" class="wallet-link">${receiver.substring(0, 8)}…${receiver.substring(receiver.length - 6)}</a></p>
          </div>
        </aside>
      </section>

      <section id="result" class="result" hidden>
        <div class="result-heading">
          <div>
            <p class="section-label success-label">RESEARCH COMPLETE</p>
            <h2>Final Report</h2>
          </div>
        </div>
        <div class="metrics">
          <article><span>Final Confidence</span><strong id="metric-confidence">—</strong></article>
          <article><span>Total Spent</span><strong id="metric-cost">—</strong></article>
          <article><span>Sources Used</span><strong id="metric-sources">—</strong></article>
          <article><span>Sources Skipped</span><strong id="metric-skipped">—</strong></article>
        </div>
        <div class="result-bottom">
          <div style="grid-column: 1 / -1;">
            <span>ANSWER</span>
            <p id="report-answer">—</p>
          </div>
          <div style="grid-column: 1 / -1;">
            <span>RECEIVER</span>
            <p id="report-receiver" class="mono-text">—</p>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <span>Ask Until Sure / Agentic Commerce</span>
      <span>x402 protocol demo</span>
    </footer>
  </body>
</html>`;
}
