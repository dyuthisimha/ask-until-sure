export const STYLES = `
:root {
  --ink: #121915;
  --muted: #647168;
  --paper: #f4f2e9;
  --panel: #fffef9;
  --line: #d8dbd3;
  --green: #1fdd86;
  --green-dark: #0a6b42;
  --navy: #142a27;
  --danger: #c14532;
  --shadow: 0 28px 80px rgba(22, 40, 32, 0.12);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-height: 100vh;
  color: var(--ink);
  background:
    radial-gradient(circle at 82% 10%, rgba(31, 221, 134, 0.12), transparent 26rem),
    var(--paper);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
.noise {
  position: fixed; inset: 0; pointer-events: none; opacity: .16; z-index: -1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.2'/%3E%3C/svg%3E");
}
.site-header, main, footer { width: min(1180px, calc(100% - 40px)); margin-inline: auto; }
.site-header { height: 84px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(18,25,21,.14); }
.brand { display: flex; align-items: center; gap: 11px; color: inherit; text-decoration: none; font-size: 19px; font-weight: 750; letter-spacing: -.03em; }
.brand-mark { width: 34px; height: 34px; display: grid; place-items: center; color: var(--navy); background: var(--green); border-radius: 9px 4px 9px 4px; font-family: ui-monospace, monospace; font-weight: 900; }
.header-status { display: flex; align-items: center; gap: 9px; font: 600 11px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .05em; text-transform: uppercase; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); box-shadow: 0 0 0 4px rgba(31,221,134,.16); }
.header-divider { width: 1px; height: 15px; background: var(--line); margin-inline: 5px; }
.hero { padding: 76px 0 55px; max-width: 880px; }
.eyebrow, .section-label { margin: 0 0 18px; font: 700 11px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .13em; color: var(--green-dark); }
h1 { margin: 0; font-size: clamp(58px, 8vw, 104px); line-height: .86; letter-spacing: -.075em; font-weight: 780; }
h1 span { color: transparent; -webkit-text-stroke: 1.7px var(--ink); }
.hero-copy { max-width: 675px; margin: 35px 0 0; color: #445048; font-size: 18px; line-height: 1.65; }
.workspace { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(290px, .75fr); background: var(--panel); border: 1px solid var(--line); box-shadow: var(--shadow); }
.demo-panel { padding: 38px; }
.explainer { padding: 38px 34px; color: #f3f4ed; background: var(--navy); }
.panel-heading, .result-heading { display: flex; justify-content: space-between; gap: 20px; align-items: flex-start; }
.panel-heading h2, .result h2, .explainer h2 { margin: 0; font-size: 27px; letter-spacing: -.035em; }
.testnet-pill { padding: 9px 11px; border: 1px solid #b9e8ce; color: var(--green-dark); background: #e8f9ef; font: 700 10px/1 ui-monospace, monospace; letter-spacing: .06em; white-space: nowrap; }
form { margin-top: 34px; }
label { display: block; margin-bottom: 9px; color: var(--muted); font: 650 11px/1 ui-monospace, monospace; text-transform: uppercase; letter-spacing: .06em; }
.input-group { margin-bottom: 20px; }
.settings-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
textarea, input[type="number"] { width: 100%; padding: 12px 17px; border: 1px solid #aeb5ad; outline: none; color: var(--ink); background: #fff; font: 600 13px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; }
textarea:focus, input[type="number"]:focus { border-color: var(--green-dark); box-shadow: inset 0 0 0 1px var(--green-dark); }
button { height: 58px; padding: 0 20px; border: 0; color: #09150f; background: var(--green); cursor: pointer; font-weight: 800; transition: transform .15s ease, filter .15s ease; width: 100%; font-size: 16px; }
button:hover { filter: brightness(.94); }
button:active { transform: translateY(1px); }
button:disabled { cursor: wait; opacity: .72; }
.button-arrow { margin-left: 12px; font-size: 17px; }

.activity { margin-top: 28px; border-top: 1px solid var(--line); padding-top: 24px; }
.activity-topline { display: flex; justify-content: space-between; font: 700 10px/1 ui-monospace, monospace; letter-spacing: .08em; }
#activity-status { color: var(--muted); }

.confidence-bar-container { width: 100%; height: 24px; background: #e0e4df; border-radius: 12px; margin-top: 15px; overflow: hidden; }
.confidence-bar { height: 100%; background: linear-gradient(90deg, var(--green-dark), var(--green)); transition: width 0.6s ease-in-out; }

.receipt-log { list-style: none; padding: 0; margin: 15px 0 0 0; display: flex; flex-direction: column; gap: 10px; }
.receipt-item { background: #f9faf8; border: 1px solid var(--line); border-radius: 6px; padding: 15px; }
.receipt-header { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 5px; }
.receipt-tx { font-size: 11px; color: var(--muted); }
.receipt-tx a { color: var(--green-dark); text-decoration: none; }
.receipt-tx a:hover { text-decoration: underline; }
.receipt-body { font-size: 13px; color: #445048; line-height: 1.4; margin: 0; }
.receipt-body p { margin: 5px 0 0 0; }
.empty-log { color: var(--muted); font-style: italic; font-size: 13px; }
.activity-message { min-height: 20px; margin: 22px 0 0; padding: 11px 13px; color: #465149; background: #f1f3ee; font: 550 11px/1.5 ui-monospace, monospace; }

.explainer .section-label { color: var(--green); }
.explainer > p:not(.section-label) { color: #afbeb6; font-size: 14px; line-height: 1.65; }
.flow-list { margin-top: 32px; border-top: 1px solid rgba(255,255,255,.14); }
.flow-list > div { display: flex; gap: 15px; padding: 19px 0; border-bottom: 1px solid rgba(255,255,255,.14); }
.flow-list > div > span { color: var(--green); font: 700 10px/1.5 ui-monospace, monospace; }
.flow-list p { margin: 0; }
.flow-list strong { display: block; font-size: 13px; }
.flow-list small { display: block; margin-top: 4px; color: #8fa098; font-size: 11px; }
.safety-note { display: flex; gap: 12px; margin-top: 28px; padding: 16px; color: #bdd0c6; background: rgba(31,221,134,.08); border: 1px solid rgba(31,221,134,.24); font-size: 11px; line-height: 1.55; }
.safety-note span { color: var(--green); font-size: 19px; }
.safety-note p { margin: 0; }

.result { margin-top: 26px; padding: 38px; color: #f4f5ef; background: #101916; border: 1px solid #304039; box-shadow: var(--shadow); }
.result[hidden] { display: none; }
.success-label { color: var(--green); }
.metrics { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 32px; border: 1px solid #35423c; }
.metrics article { padding: 25px 20px; border-right: 1px solid #35423c; }
.metrics article:last-child { border-right: 0; }
.metrics span { color: #91a097; font-size: 11px; }
.metrics strong { display: block; margin-top: 10px; color: var(--green); font: 700 27px/1 ui-monospace, monospace; }
.result-bottom { display: grid; grid-template-columns: 1fr; gap: 30px; margin-top: 27px; }
.result-bottom p { margin: 0; color: #d3ddd7; line-height: 1.6; font-size: 15px; }
footer { display: flex; justify-content: space-between; padding: 30px 0 45px; color: var(--muted); font: 600 10px/1 ui-monospace, monospace; text-transform: uppercase; letter-spacing: .07em; }

.confidence-bar.confidence-low { background: linear-gradient(90deg, #c14532, #e87c5c); }
.confidence-bar.confidence-mid { background: linear-gradient(90deg, #d4a93c, var(--green)); }
.confidence-bar.confidence-high { background: linear-gradient(90deg, var(--green-dark), var(--green)); }

.receipt-reason { font-style: italic; color: var(--muted); }
.receipt-conf { font-weight: 600; }
.receipt-findings { margin: 8px 0 0 0; padding-left: 18px; font-size: 12px; color: #445048; line-height: 1.5; }
.receipt-findings li { margin-bottom: 3px; }

.wallet-link { color: var(--green); text-decoration: none; font: 600 11px/1.5 ui-monospace, monospace; word-break: break-all; }
.wallet-link:hover { text-decoration: underline; }

.mono-text { font: 600 11px/1.5 ui-monospace, monospace; word-break: break-all; color: var(--green); }

.status-working { color: #d4a93c; }
.status-complete { color: var(--green); }
.status-failed { color: var(--danger); }

.tx-badge { padding: 3px 8px; font: 700 9px/1 ui-monospace, monospace; letter-spacing: .06em; border-radius: 3px; }
.tx-real { background: #e8f9ef; color: var(--green-dark); border: 1px solid #b9e8ce; }
.tx-mock { background: #fff3e0; color: #a66b00; border: 1px solid #f0d6a8; }
.tx-mock-id { color: var(--muted); font: 500 11px/1.5 ui-monospace, monospace; }
.receipt-tx-row { margin: 6px 0 8px; font-size: 11px; color: var(--muted); font-family: ui-monospace, monospace; }
.receipt-tx-row a { color: var(--green-dark); text-decoration: none; }
.receipt-tx-row a:hover { text-decoration: underline; }

@media (max-width: 900px) {
  .workspace { grid-template-columns: 1fr; }
  .settings-row { grid-template-columns: 1fr; }
  .metrics { grid-template-columns: 1fr 1fr; }
  .metrics article:nth-child(2) { border-right: 0; }
  .metrics article:nth-child(-n+2) { border-bottom: 1px solid #35423c; }
}
@media (max-width: 620px) {
  .site-header, main, footer { width: min(100% - 24px, 1180px); }
  .header-divider, .header-status span:last-child { display: none; }
  .hero { padding-top: 52px; }
  h1 { font-size: 55px; }
  .hero-copy { font-size: 15px; }
  .demo-panel, .explainer, .result { padding: 24px 18px; }
  .panel-heading { display: block; }
  .testnet-pill { display: inline-block; margin-top: 15px; }
  .metrics { grid-template-columns: 1fr; }
  .metrics article { border-right: 0; border-bottom: 1px solid #35423c; }
  footer { gap: 20px; line-height: 1.4; flex-direction: column; }
}
`;
