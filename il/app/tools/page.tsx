import Link from 'next/link'
'use client'
import { useState } from 'react'

type Tool = 'roi' | 'deposit' | 'cashflow' | 'rent_increase' | 'eviction_cost' | 'dti' | 'refi'

const TOOLS: { id: Tool; label: string; desc: string }[] = [
  { id: 'roi', label: 'Rental ROI Calculator', desc: 'Calculate your annual return on a rental property' },
  { id: 'cashflow', label: 'Cash Flow Analyzer', desc: 'Monthly cash flow after all expenses and debt service' },
  { id: 'deposit', label: 'Deposit Limit Lookup', desc: 'Find the security deposit limit for your state' },
  { id: 'rent_increase', label: 'Rent Increase Calculator', desc: 'Calculate allowable rent increases under rent control' },
  { id: 'eviction_cost', label: 'Eviction Cost Estimator', desc: 'Estimate the total cost of an eviction' },
  { id: 'dti', label: 'Tenant DTI Qualifier', desc: 'Check if an applicant meets income/DTI requirements' },
  { id: 'refi', label: 'Refinance Analyzer', desc: 'Break-even analysis for refinancing a rental property' },
]

function Field({ label, value, onChange, prefix = '', suffix = '' }: { label: string; value: string; onChange: (v: string) => void; prefix?: string; suffix?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg)', border: '1px solid var(--border2)', overflow: 'hidden' }}>
        {prefix && <span style={{ padding: '10px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'var(--teal)', borderRight: '1px solid var(--border2)', flexShrink: 0 }}>{prefix}</span>}
        <input type="number" value={value} onChange={e => onChange(e.target.value)} style={{ flex: 1, background: 'none', border: 'none', padding: '10px 14px', color: 'var(--text)', fontSize: 16, outline: 'none' }} />
        {suffix && <span style={{ padding: '10px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'var(--muted)', borderLeft: '1px solid var(--border2)', flexShrink: 0 }}>{suffix}</span>}
      </div>
    </div>
  )
}

function Result({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ padding: '14px 0', borderBottom: '1px solid var(--border2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>{label}</span>
      <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, fontWeight: 700, color: highlight ? 'var(--teal)' : 'var(--text)' }}>{value}</span>
    </div>
  )
}

function fmt(n: number, dec = 0) { return isNaN(n) || !isFinite(n) ? '—' : n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) }
function fmtPct(n: number) { return isNaN(n) || !isFinite(n) ? '—' : `${n.toFixed(2)}%` }
function fmtDollar(n: number) { return isNaN(n) || !isFinite(n) ? '—' : `$${fmt(n)}` }

function ROITool() {
  const [price, setPrice] = useState('200000')
  const [rent, setRent] = useState('1800')
  const [expenses, setExpenses] = useState('500')
  const [down, setDown] = useState('20')
  const [rate, setRate] = useState('7.0')

  const p = parseFloat(price), mo = parseFloat(rent), exp = parseFloat(expenses), dp = parseFloat(down) / 100, r = parseFloat(rate) / 100
  const downAmt = p * dp
  const loanAmt = p - downAmt
  const moRate = r / 12
  const moPayment = loanAmt * (moRate * Math.pow(1 + moRate, 360)) / (Math.pow(1 + moRate, 360) - 1)
  const noi = (mo - exp) * 12
  const capRate = (noi / p) * 100
  const moCF = mo - exp - moPayment
  const cocReturn = ((moCF * 12) / downAmt) * 100
  const grm = p / (mo * 12)

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Purchase Price" value={price} onChange={setPrice} prefix="$" />
        <Field label="Monthly Rent" value={rent} onChange={setRent} prefix="$" />
        <Field label="Monthly Expenses" value={expenses} onChange={setExpenses} prefix="$" />
        <Field label="Down Payment" value={down} onChange={setDown} suffix="%" />
        <Field label="Interest Rate" value={rate} onChange={setRate} suffix="%" />
      </div>
      <div style={{ marginTop: 24 }}>
        <Result label="Cap Rate" value={fmtPct(capRate)} highlight />
        <Result label="Cash-on-Cash Return" value={fmtPct(cocReturn)} highlight />
        <Result label="Monthly Cash Flow" value={fmtDollar(moCF)} />
        <Result label="Mortgage Payment" value={fmtDollar(moPayment)} />
        <Result label="Net Operating Income" value={fmtDollar(noi)} />
        <Result label="Gross Rent Multiplier" value={fmt(grm, 1) + 'x'} />
      </div>
    </>
  )
}

function CashFlowTool() {
  const [rent, setRent] = useState('1800')
  const [mortgage, setMortgage] = useState('900')
  const [taxes, setTaxes] = useState('200')
  const [insurance, setInsurance] = useState('80')
  const [maintenance, setMaintenance] = useState('150')
  const [vacancy, setVacancy] = useState('5')
  const [mgmt, setMgmt] = useState('8')

  const r = parseFloat(rent), mort = parseFloat(mortgage), tx = parseFloat(taxes), ins = parseFloat(insurance), maint = parseFloat(maintenance)
  const vacAmt = r * (parseFloat(vacancy) / 100)
  const mgmtAmt = r * (parseFloat(mgmt) / 100)
  const totalExp = mort + tx + ins + maint + vacAmt + mgmtAmt
  const cf = r - totalExp

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Monthly Rent" value={rent} onChange={setRent} prefix="$" />
        <Field label="Mortgage Payment" value={mortgage} onChange={setMortgage} prefix="$" />
        <Field label="Property Taxes" value={taxes} onChange={setTaxes} prefix="$" />
        <Field label="Insurance" value={insurance} onChange={setInsurance} prefix="$" />
        <Field label="Maintenance Reserve" value={maintenance} onChange={setMaintenance} prefix="$" />
        <Field label="Vacancy Allowance" value={vacancy} onChange={setVacancy} suffix="%" />
        <Field label="Property Management" value={mgmt} onChange={setMgmt} suffix="%" />
      </div>
      <div style={{ marginTop: 24 }}>
        <Result label="Monthly Cash Flow" value={fmtDollar(cf)} highlight />
        <Result label="Annual Cash Flow" value={fmtDollar(cf * 12)} />
        <Result label="Total Monthly Expenses" value={fmtDollar(totalExp)} />
        <Result label="Vacancy Cost/Month" value={fmtDollar(vacAmt)} />
        <Result label="Management Cost/Month" value={fmtDollar(mgmtAmt)} />
      </div>
    </>
  )
}

const DEPOSIT_STATES: Record<string, { limit: string; deadline: string }> = {
  CA: { limit: '1 month rent (unfurnished)', deadline: '21 days' },
  TX: { limit: 'No statutory limit', deadline: '30 days' },
  FL: { limit: 'No statutory limit', deadline: '15 / 30 days' },
  NY: { limit: '1 month rent', deadline: '14 days' },
  OH: { limit: 'No statutory limit', deadline: '30 days' },
  GA: { limit: 'No statutory limit', deadline: '30 days' },
  IL: { limit: 'No limit (Chicago: 1.5 months)', deadline: '30 days' },
  PA: { limit: '2 months (yr 1) / 1 month (after)', deadline: '30 days' },
  NC: { limit: '2 months (mo-to-mo) / 1.5 mo (fixed)', deadline: '30 days' },
  WA: { limit: 'No statutory limit', deadline: '21 days' },
  AZ: { limit: '1.5 months rent', deadline: '14 days' },
  CO: { limit: 'No statutory limit', deadline: '30 days (1 mo SFR)' },
  MA: { limit: '1 month rent', deadline: '30 days' },
  MI: { limit: '1.5 months rent', deadline: '30 days' },
  NV: { limit: '3 months rent', deadline: '30 days' },
  MN: { limit: 'No statutory limit', deadline: '21 days' },
  OR: { limit: 'No statutory limit', deadline: '31 days' },
  VA: { limit: '2 months rent', deadline: '45 days' },
  TN: { limit: 'No statutory limit', deadline: 'End of tenancy' },
  MO: { limit: '2 months rent', deadline: '30 days' },
}

function DepositTool() {
  const [stateAbbr, setStateAbbr] = useState('TX')
  const info = DEPOSIT_STATES[stateAbbr]
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>State</label>
        <select value={stateAbbr} onChange={e => setStateAbbr(e.target.value)} style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border2)', color: 'var(--text)', padding: '10px 14px', fontSize: 16 }}>
          {Object.keys(DEPOSIT_STATES).map(abbr => <option key={abbr} value={abbr}>{abbr}</option>)}
        </select>
      </div>
      {info ? (
        <div style={{ marginTop: 24 }}>
          <Result label="Maximum Deposit" value={info.limit} highlight />
          <Result label="Return Deadline" value={info.deadline} />
          <div style={{ marginTop: 16, padding: 14, background: 'var(--bg)', border: '1px solid var(--border2)' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', lineHeight: 1.7 }}>For full landlord-tenant law details, see the <Link href={`/legal/states/${stateAbbr.toLowerCase()}`} style={{ color: 'var(--teal)' }}>{stateAbbr} state guide →</Link></p>
          </div>
        </div>
      ) : <p style={{ color: 'var(--muted)', fontSize: 14 }}>Data not available for this state. Check the <Link href="/legal/states" style={{ color: 'var(--teal)' }}>state guide</Link>.</p>}
    </>
  )
}

function EvictionCostTool() {
  const [monthlyRent, setMonthlyRent] = useState('1500')
  const [processWeeks, setProcessWeeks] = useState('8')
  const [filingFee, setFilingFee] = useState('100')
  const [attorney, setAttorney] = useState('1500')
  const [repairs, setRepairs] = useState('800')

  const r = parseFloat(monthlyRent), wks = parseFloat(processWeeks)
  const lostRent = r * (wks / 4.33)
  const total = lostRent + parseFloat(filingFee) + parseFloat(attorney) + parseFloat(repairs)

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Monthly Rent" value={monthlyRent} onChange={setMonthlyRent} prefix="$" />
        <Field label="Eviction Timeline" value={processWeeks} onChange={setProcessWeeks} suffix="wks" />
        <Field label="Court Filing Fees" value={filingFee} onChange={setFilingFee} prefix="$" />
        <Field label="Attorney Fees" value={attorney} onChange={setAttorney} prefix="$" />
        <Field label="Repair / Turnover Cost" value={repairs} onChange={setRepairs} prefix="$" />
      </div>
      <div style={{ marginTop: 24 }}>
        <Result label="Estimated Total Cost" value={fmtDollar(total)} highlight />
        <Result label="Lost Rent" value={fmtDollar(lostRent)} />
        <Result label="Direct Costs" value={fmtDollar(parseFloat(filingFee) + parseFloat(attorney) + parseFloat(repairs))} />
      </div>
    </>
  )
}

function DTITool() {
  const [monthlyIncome, setMonthlyIncome] = useState('5000')
  const [rent, setRent] = useState('1500')
  const [otherDebt, setOtherDebt] = useState('300')

  const income = parseFloat(monthlyIncome), r = parseFloat(rent), debt = parseFloat(otherDebt)
  const rentRatio = (r / income) * 100
  const totalDTI = ((r + debt) / income) * 100
  const incomeMultiple = income / r
  const meetsIncome = incomeMultiple >= 3
  const meetsDTI = totalDTI <= 35

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Gross Monthly Income" value={monthlyIncome} onChange={setMonthlyIncome} prefix="$" />
        <Field label="Monthly Rent" value={rent} onChange={setRent} prefix="$" />
        <Field label="Other Monthly Debt" value={otherDebt} onChange={setOtherDebt} prefix="$" />
      </div>
      <div style={{ marginTop: 24 }}>
        <Result label="Income Multiple" value={`${fmt(incomeMultiple, 1)}x rent`} highlight />
        <Result label="Rent-to-Income Ratio" value={fmtPct(rentRatio)} />
        <Result label="Total DTI" value={fmtPct(totalDTI)} />
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[['3x Income Rule', meetsIncome], ['35% DTI Standard', meetsDTI]].map(([label, passes]) => (
            <div key={String(label)} style={{ padding: '12px 14px', background: 'var(--bg)', border: `1px solid ${passes ? 'var(--green)' : 'var(--red)'}22` }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: passes ? 'var(--green)' : 'var(--red)', letterSpacing: '0.08em', marginBottom: 4 }}>{passes ? '✓ PASSES' : '✗ FAILS'}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{String(label)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function RentIncreaseTool() {
  const [currentRent, setCurrentRent] = useState('1500')
  const [pct, setPct] = useState('5')
  const [cpi, setCpi] = useState('3.2')

  const r = parseFloat(currentRent), p = parseFloat(pct), c = parseFloat(cpi)
  const flatIncrease = r * (p / 100)
  const cpiCap = r * ((5 + c) / 100)  // CA AB 1482 style: 5% + CPI
  const newRentFlat = r + flatIncrease
  const newRentCPI = r + cpiCap

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Current Monthly Rent" value={currentRent} onChange={setCurrentRent} prefix="$" />
        <Field label="Proposed Increase %" value={pct} onChange={setPct} suffix="%" />
        <Field label="Local CPI Rate" value={cpi} onChange={setCpi} suffix="%" />
      </div>
      <div style={{ marginTop: 24 }}>
        <Result label={`New Rent at ${pct}% Increase`} value={fmtDollar(newRentFlat)} highlight />
        <Result label="Dollar Increase" value={fmtDollar(flatIncrease)} />
        <Result label="CA AB 1482 Cap (5% + CPI)" value={fmtDollar(newRentCPI)} />
        <Result label="Annual Additional Revenue" value={fmtDollar(flatIncrease * 12)} />
      </div>
    </>
  )
}

function RefiTool() {
  const [balance, setBalance] = useState('180000')
  const [currentRate, setCurrentRate] = useState('7.5')
  const [newRate, setNewRate] = useState('6.75')
  const [closingCosts, setClosingCosts] = useState('4000')

  const b = parseFloat(balance), cr = parseFloat(currentRate) / 100 / 12, nr = parseFloat(newRate) / 100 / 12, cc = parseFloat(closingCosts)
  const currentPayment = b * (cr * Math.pow(1 + cr, 360)) / (Math.pow(1 + cr, 360) - 1)
  const newPayment = b * (nr * Math.pow(1 + nr, 360)) / (Math.pow(1 + nr, 360) - 1)
  const monthlySavings = currentPayment - newPayment
  const breakEven = cc / monthlySavings

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Loan Balance" value={balance} onChange={setBalance} prefix="$" />
        <Field label="Current Rate" value={currentRate} onChange={setCurrentRate} suffix="%" />
        <Field label="New Rate" value={newRate} onChange={setNewRate} suffix="%" />
        <Field label="Closing Costs" value={closingCosts} onChange={setClosingCosts} prefix="$" />
      </div>
      <div style={{ marginTop: 24 }}>
        <Result label="Monthly Savings" value={fmtDollar(monthlySavings)} highlight />
        <Result label="Break-Even Point" value={`${fmt(breakEven, 1)} months`} />
        <Result label="Current Payment" value={fmtDollar(currentPayment)} />
        <Result label="New Payment" value={fmtDollar(newPayment)} />
        <Result label="Annual Savings" value={fmtDollar(monthlySavings * 12)} />
      </div>
    </>
  )
}

const TOOL_COMPONENTS: Record<Tool, React.ReactNode> = {
  roi: <ROITool />,
  cashflow: <CashFlowTool />,
  deposit: <DepositTool />,
  rent_increase: <RentIncreaseTool />,
  eviction_cost: <EvictionCostTool />,
  dti: <DTITool />,
  refi: <RefiTool />,
}

export default function ToolsPage() {
  const [active, setActive] = useState<Tool>('roi')
  const activeTool = TOOLS.find(t => t.id === active)!

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(40px,6vw,72px) var(--page-pad)' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16 }}>Free Calculators</div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, marginBottom: 14 }}>Landlord Tools</h1>
      <p style={{ color: 'var(--muted)', maxWidth: '60ch', lineHeight: 1.65, marginBottom: 48 }}>Seven free calculators for rental property investors and landlords. No signup required.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'clamp(200px,26%,280px) 1fr', gap: 32, alignItems: 'start' }}>
        {/* Tool selector */}
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border2)', overflow: 'hidden' }}>
          {TOOLS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px 18px', background: active === t.id ? 'var(--bg3)' : 'none', border: 'none', borderBottom: '1px solid var(--border2)', borderLeft: active === t.id ? '2px solid var(--teal)' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.15s' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: active === t.id ? 'var(--teal)' : 'var(--text)', letterSpacing: '0.04em', marginBottom: 3 }}>{t.label}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.desc}</div>
            </button>
          ))}
        </div>

        {/* Active tool */}
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border2)', padding: 32 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 8 }}>{activeTool.label}</div>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 28 }}>{activeTool.desc}</p>
          {TOOL_COMPONENTS[active]}
        </div>
      </div>
    </div>
  )
}
