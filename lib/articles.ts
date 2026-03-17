export type ArticleCategory = 'guides' | 'market' | 'legal' | 'news'

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: ArticleCategory
  categoryLabel: string
  pill: string
  tags: string[]
  publishedAt: string
  readTime: string
  author: string
  body: string
  image?: string
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
  faqs?: { q: string; a: string }[]
}

export const ARTICLES: Article[] = [

  // ── GUIDES ────────────────────────────────────────────────────────────────
  {
    slug: 'landlord-tenant-law-complete-guide',
    title: 'Landlord-Tenant Law: What Every Landlord Must Know in 2026',
    excerpt: 'State laws vary dramatically. Security deposits, entry notice, habitability standards, and eviction procedures differ by jurisdiction — and getting it wrong is expensive.',
    category: 'guides',
    categoryLabel: 'Landlord Guides',
    pill: 'Essential Reading',
    tags: ['landlord-tenant law', 'legal', 'lease', 'eviction'],
    publishedAt: '2026-03-01',
    readTime: '12 min',
    author: 'IL Editorial',
    featured: true,
    body: `
<h2>Why Landlord-Tenant Law Is More Complex Than Most People Realize</h2>
<p>Unlike federal law, which applies uniformly across the country, landlord-tenant law is almost entirely governed at the state level — and in many cases, at the city or county level. A landlord operating in California faces an entirely different legal landscape than one in Texas, Ohio, or Florida. Violating even minor procedural rules can void an eviction case, result in penalties, or expose a landlord to a tenant lawsuit.</p>
<p>This guide covers the core legal concepts every landlord must understand regardless of state: habitability, security deposits, required notices, and the eviction process.</p>

<h2>The Implied Warranty of Habitability</h2>
<p>In virtually every state, landlords are legally required to maintain rental units in a habitable condition. This means functional heating, plumbing, electrical systems, weatherproofing, and freedom from pest infestations. If a landlord fails to maintain habitability after receiving written notice, tenants in most states have several legal remedies: repair-and-deduct, rent withholding, or lease termination without penalty.</p>

<h2>Security Deposit Rules by State</h2>
<p>Security deposit law is one of the most varied — and most litigated — areas of landlord-tenant law. Key variables: maximum amount (1–2 months in most states), holding requirements (some states require separate escrow accounts), return timeline (14–45 days depending on state), and itemization requirements.</p>

<h2>Required Notice Before Entry</h2>
<p>Most states require landlords to give 24–48 hours notice before entering an occupied unit — even for non-emergency maintenance. Emergency entry is generally permitted without advance notice but should be documented.</p>

<h2>The Eviction Process: A Brief Overview</h2>
<p>Evictions are a court process. Self-help evictions — changing locks, removing belongings, shutting off utilities — are illegal in every state. The sequence: written notice, court filing, hearing, writ of possession, and lockout if necessary.</p>

<h2>The Most Common — and Costly — Landlord Mistakes</h2>
<ul>
  <li>Using a generic lease that does not comply with state law</li>
  <li>Accepting partial rent payment during an eviction (resets the notice clock in many states)</li>
  <li>Failing to return the security deposit within the statutory deadline</li>
  <li>Making verbal agreements that contradict the written lease</li>
  <li>Retaliating against a tenant for exercising legal rights</li>
</ul>
    `,
    faqs: [
      { q: 'Can I evict a tenant for any reason?', a: 'In states without just cause eviction requirements, landlords can decline to renew a lease at end of term. Mid-lease evictions require a legally valid reason. Many cities require just cause even for non-renewals.' },
      { q: 'How much can I charge for a security deposit?', a: 'It depends on your state. Most cap deposits at one or two months rent. Check the state-specific page on this site.' },
    ],
  },
  {
    slug: 'how-to-screen-tenants-legally',
    title: 'How to Screen Tenants Without Getting Sued',
    excerpt: 'The Fair Housing Act draws a hard line between smart screening and illegal discrimination. Here is what you can ask, what you can check, and what to never put in writing.',
    category: 'guides',
    categoryLabel: 'Landlord Guides',
    pill: 'Risk Management',
    tags: ['tenant screening', 'fair housing', 'credit check', 'background check'],
    publishedAt: '2026-02-24',
    readTime: '9 min',
    author: 'IL Editorial',
    body: `
<h2>The Foundation: Written Screening Criteria</h2>
<p>Before accepting a single application, write down your tenant selection criteria and apply them uniformly to every applicant. Your criteria should include minimum income requirements (typically 2.5–3x monthly rent), credit score thresholds, rental history requirements, and criminal background policy.</p>

<h2>What the Fair Housing Act Prohibits</h2>
<p>Federal law prohibits discrimination based on seven protected classes: race, color, national origin, religion, sex, familial status, and disability. Many states add additional protections: source of income, sexual orientation, gender identity, and marital status.</p>

<h2>What You Can Check</h2>
<ul>
  <li><strong>Credit report:</strong> Authorized under FCRA with applicant consent.</li>
  <li><strong>Criminal background:</strong> Permitted, but HUD guidance advises individualized assessment over blanket bans.</li>
  <li><strong>Eviction history:</strong> Public court records. Always check them.</li>
  <li><strong>Income verification:</strong> Pay stubs, bank statements, tax returns.</li>
  <li><strong>Rental references:</strong> Call prior landlords. Ask if they would rent again.</li>
</ul>

<h2>Adverse Action Notices</h2>
<p>If you deny an applicant based on a consumer report, FCRA requires an adverse action notice including the reporting agency name and the applicant's dispute rights.</p>

<h2>Documentation is Your Defense</h2>
<p>Keep all applications, screening reports, and denial reasons on file for at least three years.</p>
    `,
  },
  {
    slug: 'lease-agreement-must-have-clauses',
    title: 'The 12 Clauses Every Lease Agreement Must Include',
    excerpt: 'A lease is your primary legal protection. Generic templates miss critical state-specific requirements and leave you exposed. Here is what your lease must say.',
    category: 'guides',
    categoryLabel: 'Landlord Guides',
    pill: 'Legal Essentials',
    tags: ['lease agreement', 'rental contract', 'legal', 'clauses'],
    publishedAt: '2026-02-18',
    readTime: '8 min',
    author: 'IL Editorial',
    body: `
<h2>Why Generic Leases Fail Landlords</h2>
<p>Most landlords start with a lease template downloaded from the internet. These templates are often not jurisdiction-specific, not updated for current law, and omit provisions that courts require to enforce certain rights.</p>

<h2>The 12 Essential Clauses</h2>
<p><strong>1. Names of All Parties</strong> — List every adult occupant by full legal name.</p>
<p><strong>2. Property Description</strong> — Full address including unit number and any included storage or parking.</p>
<p><strong>3. Lease Term and Holdover</strong> — Start date, end date, and month-to-month conversion terms.</p>
<p><strong>4. Rent Amount, Due Date, Late Fees</strong> — Monthly amount, grace period, and penalty (verify state caps).</p>
<p><strong>5. Security Deposit Terms</strong> — Amount, holding location, conditions for withholding, return timeline.</p>
<p><strong>6. Utilities and Maintenance</strong> — Who pays what, and who handles lawn/snow/appliances.</p>
<p><strong>7. Entry Notice</strong> — Required notice period and acceptable delivery methods.</p>
<p><strong>8. Pet Policy</strong> — Permitted pets, restrictions, pet deposit (separate from assistance animal accommodations).</p>
<p><strong>9. Subletting</strong> — Whether permitted and conditions.</p>
<p><strong>10. Smoking and Illegal Activity</strong> — Explicit prohibition — grounds for eviction if violated.</p>
<p><strong>11. Termination Conditions</strong> — Material breach definitions, notice required, early termination fees.</p>
<p><strong>12. State-Required Disclosures</strong> — Lead paint (pre-1978), mold, flood zone, move-in checklist, and any state-specific requirements.</p>
    `,
  },
  {
    slug: 'property-management-tax-deductions',
    title: 'The Complete Landlord Tax Deduction Checklist for 2026',
    excerpt: 'Most landlords over-pay taxes because they miss deductions hiding in plain sight. Depreciation alone can erase most of your rental income on paper. Here is every deduction you should be taking.',
    category: 'guides',
    categoryLabel: 'Landlord Guides',
    pill: 'Tax Strategy',
    tags: ['taxes', 'depreciation', 'deductions', 'Schedule E', 'rental income'],
    publishedAt: '2026-03-07',
    readTime: '10 min',
    author: 'IL Editorial',
    body: `
<h2>The Depreciation Deduction: Your Biggest Weapon</h2>
<p>Residential rental property is depreciated over 27.5 years under IRS rules. On a $200,000 property (excluding land), that is $7,273 in annual depreciation — a paper loss that can offset real rental income. Unlike most deductions, you do not have to spend money to claim it. It is automatic.</p>
<p>Depreciation is reported on Schedule E (Form 1040) and reduces your taxable rental income dollar for dollar. If your rental income is $20,000 and depreciation is $7,273, you are only taxed on $12,727 — before any other deductions.</p>

<h2>Operating Expense Deductions</h2>
<ul>
  <li><strong>Mortgage interest:</strong> Fully deductible on Schedule E (not Schedule A) for rental properties.</li>
  <li><strong>Property taxes:</strong> Deductible in full — no $10,000 SALT cap applies to rental properties.</li>
  <li><strong>Insurance premiums:</strong> Landlord policy, liability umbrella, flood insurance.</li>
  <li><strong>Property management fees:</strong> 8–12% of gross rents — fully deductible.</li>
  <li><strong>Repairs and maintenance:</strong> Repairs are immediately deductible. Improvements must be capitalized and depreciated.</li>
  <li><strong>Utilities:</strong> Any utilities you pay as the landlord.</li>
  <li><strong>Advertising:</strong> Online listings, yard signs, paid placements.</li>
  <li><strong>Legal and professional fees:</strong> Attorney fees, CPA fees, eviction costs.</li>
  <li><strong>Travel:</strong> Mileage to and from the property for management purposes at the IRS standard rate.</li>
  <li><strong>Home office:</strong> If you manage your rentals from a dedicated home office space.</li>
</ul>

<h2>Repairs vs. Improvements: The Critical Distinction</h2>
<p>Repairs maintain the property in its current condition and are immediately deductible. Improvements add value, extend useful life, or adapt the property to a new use — these must be capitalized and depreciated. Replacing a broken window = repair. Installing double-pane windows throughout = improvement.</p>

<h2>Passive Activity Loss Rules</h2>
<p>Rental activities are generally passive — losses can only offset passive income. Exception: if your adjusted gross income is below $100,000 and you actively participate in managing your rentals, you can deduct up to $25,000 of rental losses against ordinary income. This phases out between $100,000–$150,000 AGI.</p>
<p>Real estate professionals (spending more than 750 hours per year in real estate activities) can deduct rental losses without limitation.</p>

<h2>Cost Segregation: Accelerating Depreciation</h2>
<p>A cost segregation study reclassifies building components into shorter depreciation lives (5, 7, or 15 years instead of 27.5). This front-loads depreciation deductions into early years. For properties over $500,000, the tax savings often exceed the study cost within the first year.</p>
    `,
    faqs: [
      { q: 'Can I deduct the full cost of a new roof?', a: 'Generally no — a full roof replacement is a capital improvement that must be depreciated, not immediately deducted. However, under bonus depreciation rules and Section 179, there may be options to accelerate the deduction. Consult a CPA.' },
      { q: 'What records do I need to keep?', a: 'Keep receipts for all expenses, bank statements showing rental income, lease agreements, and property purchase documents for at least 7 years. For depreciation, you need records until you sell the property and for 3+ years after.' },
    ],
  },
  {
    slug: 'landlord-insurance-complete-guide',
    title: 'Landlord Insurance: What You Actually Need (and What You Are Probably Missing)',
    excerpt: 'Standard homeowner\'s insurance does not cover rental properties. The gap between what landlords think they have and what they actually have has cost property owners millions. Here is the real coverage picture.',
    category: 'guides',
    categoryLabel: 'Landlord Guides',
    pill: 'Risk & Insurance',
    tags: ['landlord insurance', 'dwelling policy', 'liability', 'loss of rent'],
    publishedAt: '2026-02-10',
    readTime: '8 min',
    author: 'IL Editorial',
    body: `
<h2>Why Homeowner's Insurance Fails Landlords</h2>
<p>A standard HO-3 homeowner's policy is designed for owner-occupied residences. When you rent out a property, insurers consider the risk profile fundamentally different — tenants are less invested in property care, vacancy periods create different risks, and liability exposure changes. Most homeowner's policies have clauses that void coverage if the home is rented out for more than a specified period (often 30–60 days).</p>
<p>Landlords who have an HO-3 on a rental property and suffer a fire, liability claim, or vandalism may find their claim denied entirely. The insurer will ask how the property was being used at the time of loss.</p>

<h2>The Landlord Policy (DP-3): What It Covers</h2>
<p>A dwelling fire policy, specifically the DP-3 (open perils form), is the standard insurance product for non-owner-occupied residential rentals. Core coverages:</p>
<ul>
  <li><strong>Dwelling coverage:</strong> The structure itself — rebuilding cost if destroyed by fire, storm, vandalism, or other covered perils.</li>
  <li><strong>Other structures:</strong> Detached garages, sheds, fences.</li>
  <li><strong>Loss of rental income:</strong> If the property becomes uninhabitable due to a covered loss, this replaces the rent you would have collected during repairs. Typically 12 months of coverage.</li>
  <li><strong>Liability coverage:</strong> If a tenant or visitor is injured on the property and sues you. Standard amounts: $100,000–$500,000.</li>
</ul>

<h2>What Is NOT Covered — The Gaps That Hurt</h2>
<ul>
  <li><strong>Tenant belongings:</strong> Not covered under your policy. Require renters insurance in your lease.</li>
  <li><strong>Tenant damage:</strong> Intentional damage by tenants is often excluded or has sublimits. "Malicious damage by tenants" endorsements are available but must be added explicitly.</li>
  <li><strong>Flood:</strong> Never covered by standard policies. Separate NFIP or private flood policy required.</li>
  <li><strong>Earthquake:</strong> Excluded in standard policies. Separate rider required in seismic zones.</li>
  <li><strong>Vacancy:</strong> Most policies suspend certain coverages after 30–60 days of vacancy. Vacancy endorsements extend coverage.</li>
</ul>

<h2>The Umbrella Policy: Non-Negotiable for Serious Landlords</h2>
<p>A personal umbrella policy provides $1M–$5M of additional liability coverage above your DP-3 limits. For landlords with multiple properties or significant assets, this is essential — not optional. A serious tenant injury or wrongful death claim can exceed $500,000 easily. Umbrella policies typically cost $200–$400 per year for $1M of coverage.</p>
    `,
  },
  {
    slug: 'tenant-move-out-checklist',
    title: 'The Landlord\'s Move-Out Checklist: How to Document, Deduct, and Dispute-Proof Your Security Deposit',
    excerpt: 'The move-out process is where most security deposit disputes are won or lost — before they ever reach a courtroom. Your documentation determines the outcome.',
    category: 'guides',
    categoryLabel: 'Landlord Guides',
    pill: 'Operations',
    tags: ['move-out', 'security deposit', 'inspection', 'documentation', 'turnover'],
    publishedAt: '2026-01-28',
    readTime: '7 min',
    author: 'IL Editorial',
    body: `
<h2>The Move-Out Walkthrough: Timing and Protocol</h2>
<p>Conduct the move-out inspection as close to the tenant's departure as possible — ideally the same day or within 24 hours. Some states require you to offer the tenant the opportunity to be present at the final inspection. Even where not required, inviting them is often smart — it prevents later claims that damage was pre-existing or caused by someone else after their departure.</p>

<h2>Documenting the Property: The Right Way</h2>
<p>Photos and video are your evidence. The standard that holds up in court: timestamped, comprehensive, and compared to move-in documentation. Best practices:</p>
<ul>
  <li>Film a continuous walkthrough video before the tenant enters and after they leave</li>
  <li>Photograph every room, every wall, every floor, and every appliance</li>
  <li>Capture serial numbers on appliances to establish that they have not been swapped</li>
  <li>Document the condition of every item on your move-in checklist</li>
  <li>Note any items the tenant removed that were present at move-in (fixtures, blinds, shelving)</li>
</ul>

<h2>Normal Wear and Tear vs. Deductible Damage</h2>
<table>
  <thead><tr><th>Normal Wear and Tear</th><th>Deductible Damage</th></tr></thead>
  <tbody>
    <tr><td>Minor scuffs on walls from furniture</td><td>Large holes punched in walls</td></tr>
    <tr><td>Carpet worn flat in traffic areas</td><td>Stains, burns, or pet damage in carpet</td></tr>
    <tr><td>Faded paint from sunlight</td><td>Unauthorized paint colors or graffiti</td></tr>
    <tr><td>Small nail holes from hanging pictures</td><td>Multiple large holes or anchors in every wall</td></tr>
    <tr><td>Loose door hinges from regular use</td><td>Broken doors or damaged locks</td></tr>
    <tr><td>Dirty grout from normal use</td><td>Broken tiles or shower fixtures</td></tr>
  </tbody>
</table>

<h2>The Itemized Statement: Getting It Right</h2>
<p>Every state requires an itemized written statement of deductions. Vague entries like "cleaning — $200" are frequently challenged. Successful itemizations include: description of the damage, before and after photos, and the specific cost (actual invoice or standard hourly rate). Keeping a price list for common repairs based on real contractor invoices makes itemizations faster and more defensible.</p>
    `,
  },

  // ── MARKET ────────────────────────────────────────────────────────────────
  {
    slug: 'rental-market-outlook-2026',
    title: 'U.S. Rental Market Outlook 2026: What Landlords Need to Know',
    excerpt: 'New supply hitting the Sun Belt is compressing rents in markets that were red-hot in 2022. Midwest and Northeast rents continue to climb. The national story masks everything.',
    category: 'market',
    categoryLabel: 'Rental Market',
    pill: 'Market Intelligence',
    tags: ['rental market', 'rent trends', 'vacancy rates', '2026'],
    publishedAt: '2026-03-05',
    readTime: '10 min',
    author: 'IL Editorial',
    body: `
<h2>The National Headline Masks Diverging Local Markets</h2>
<p>National rent figures tell a story of stabilization. But averages are built from extremes. Markets that absorbed enormous new apartment supply — Austin, Phoenix, Tampa, Nashville — are seeing year-over-year rent declines as developers delivered hundreds of thousands of units that markets couldn't absorb at the pace implied by 2021–2022 pricing.</p>

<h2>Sun Belt: The Correction Phase</h2>
<p>The Sun Belt buildout was historically large. In markets like Austin, asking rents on new listings are running 8–12% below their 2022 peak. Concessions — free months, waived fees — are common on Class A properties.</p>

<h2>Midwest: The Quiet Outperformer</h2>
<p>Indianapolis, Columbus, Cleveland, and Kansas City have posted 4–7% rent growth in 2025–2026 with vacancy rates below 5%. Cap rates in the 6–8% range continue to attract investors rotating out of Sun Belt positions.</p>

<h2>What Landlords Should Watch</h2>
<ul>
  <li><strong>Local vacancy rates:</strong> Above 8% compresses rents. Below 5% gives landlords pricing power.</li>
  <li><strong>New supply pipeline:</strong> Building permits today hit the market in 12–24 months.</li>
  <li><strong>Employment trends:</strong> Rental demand is employment demand.</li>
  <li><strong>Seasonal patterns:</strong> Rental demand peaks in spring/summer. Price vacancy listings accordingly.</li>
</ul>
    `,
  },
  {
    slug: 'cap-rate-explained-rental-investors',
    title: 'Cap Rate Explained: What It Actually Tells You (and What It Doesn\'t)',
    excerpt: 'Cap rate is the most widely used metric in rental real estate — and the most misunderstood. Here is how to calculate it correctly and what it actually measures.',
    category: 'market',
    categoryLabel: 'Rental Market',
    pill: 'Investor Math',
    tags: ['cap rate', 'NOI', 'rental investing', 'ROI'],
    publishedAt: '2026-02-20',
    readTime: '7 min',
    author: 'IL Editorial',
    body: `
<h2>The Formula</h2>
<p>Cap rate = Net Operating Income ÷ Property Value. NOI is gross rental income minus all operating expenses — it does <em>not</em> include mortgage payments.</p>

<h2>What Cap Rate Measures</h2>
<p>Cap rate measures unlevered yield. A 6% cap rate means $6 in NOI per $100 of value. It also functions as a market pricing signal — low cap rate markets are pricing in stability or growth expectations.</p>

<h2>What Cap Rate Does Not Measure</h2>
<ul>
  <li><strong>Cash-on-cash return:</strong> Ignores financing. Two properties with the same cap rate can have wildly different CoC returns depending on debt.</li>
  <li><strong>Total return:</strong> Ignores appreciation.</li>
  <li><strong>Actual performance:</strong> Cap rates are often quoted on pro forma NOI — verify against actual historical financials.</li>
</ul>

<h2>Typical Cap Rates by Market Type (2026)</h2>
<table>
  <thead><tr><th>Market Type</th><th>Typical Range</th></tr></thead>
  <tbody>
    <tr><td>Major coastal metros</td><td>3.5%–5%</td></tr>
    <tr><td>Sun Belt metros</td><td>4.5%–6.5%</td></tr>
    <tr><td>Secondary Midwest</td><td>6%–8.5%</td></tr>
    <tr><td>Tertiary/rural markets</td><td>7.5%–10%+</td></tr>
  </tbody>
</table>
    `,
  },
  {
    slug: 'best-cities-rental-investment-2026',
    title: 'Best Cities for Rental Property Investment in 2026',
    excerpt: 'After years of chasing Sun Belt appreciation, capital is rotating into fundamentals-driven markets. Here are the metros offering the best risk-adjusted returns for landlords entering in 2026.',
    category: 'market',
    categoryLabel: 'Rental Market',
    pill: 'Market Intelligence',
    tags: ['rental investing', 'best markets', '2026', 'Midwest', 'cap rate'],
    publishedAt: '2026-03-04',
    readTime: '9 min',
    author: 'IL Editorial',
    body: `
<h2>The Shift: From Appreciation to Income</h2>
<p>The 2020–2022 real estate cycle rewarded buyers who chased appreciation in growth markets. The 2023–2026 cycle has been a brutal correction for many of those bets. The landlords doing well right now bought for cash flow in fundamentals-driven markets. That is the lesson for 2026 buyers.</p>

<h2>Top Markets for Rental Investors in 2026</h2>

<h3>Columbus, OH</h3>
<p>Cap rates: 6.5–8%. Vacancy: 4.2%. Rent growth: 5.8% YoY. Strong employment base (Honda, Intel, Ohio State), low supply pipeline, and entry prices that still pencil at normal leverage. One of the most consistent performers in the Midwest over the last decade.</p>

<h3>Indianapolis, IN</h3>
<p>Cap rates: 6–8%. Vacancy: 4.8%. Rent growth: 5.1% YoY. Low cost of living attracts renters. Growing tech and logistics employment base. Entry prices significantly below coastal comparables.</p>

<h3>Kansas City, MO/KS</h3>
<p>Cap rates: 6.5–8.5%. Vacancy: 4.5%. Rent growth: 4.9% YoY. Affordable entry prices, stable employment, and a growing healthcare and logistics sector. Both Missouri and Kansas have landlord-friendly legal environments.</p>

<h3>Cleveland, OH</h3>
<p>Cap rates: 7–10%. Vacancy: 5.1%. Rent growth: 4.2% YoY. The highest cap rates of any major market in the country. Healthcare sector (Cleveland Clinic, University Hospitals) provides employment stability. Entry prices under $150,000 for solid SFR rentals are still findable.</p>

<h3>Memphis, TN</h3>
<p>Cap rates: 7–9%. Vacancy: 6.2%. Rent growth: 3.8% YoY. Tennessee has no state income tax and is among the most landlord-friendly states. FedEx hub drives logistics employment. Higher crime in some submarkets requires careful neighborhood selection.</p>

<h2>Markets to Avoid in 2026</h2>
<p>Austin: significant new supply continues to compress rents. Portland: regulatory environment heavily favors tenants. San Francisco: rent control, just cause requirements, and low cap rates make positive cash flow nearly impossible at current prices.</p>
    `,
  },
  {
    slug: 'multifamily-vs-single-family-rental',
    title: 'Multifamily vs. Single Family Rentals: Which Is Right for You?',
    excerpt: 'The math looks different. The management looks different. The financing looks different. Here is how to think through the choice between SFR and multifamily as a landlord.',
    category: 'market',
    categoryLabel: 'Rental Market',
    pill: 'Investor Strategy',
    tags: ['single family rental', 'multifamily', 'duplex', 'investment strategy'],
    publishedAt: '2026-02-12',
    readTime: '8 min',
    author: 'IL Editorial',
    body: `
<h2>Single Family Rentals: The Pros and Cons</h2>
<p><strong>Advantages:</strong> Easier to finance (conventional mortgages, lower down payments), higher tenant quality on average (tenants treat houses like homes), easier to sell (broad buyer pool including owner-occupants), and lower management intensity per unit.</p>
<p><strong>Disadvantages:</strong> No income when vacant (one unit = 100% vacancy), slower portfolio scaling, lower cap rates in most markets, and higher maintenance costs per dollar of income.</p>

<h2>Multifamily: The Pros and Cons</h2>
<p><strong>Advantages:</strong> Vacancy diversification (one vacant unit out of four = 25% vacancy, not 100%), faster scaling, commercial financing at scale, and higher cap rates in most markets.</p>
<p><strong>Disadvantages:</strong> Harder to finance small multifamily (2–4 units qualify for residential financing; 5+ requires commercial), higher tenant turnover, more management-intensive, and harder to sell (smaller buyer pool).</p>

<h2>The 2–4 Unit Sweet Spot</h2>
<p>Duplexes, triplexes, and fourplexes qualify for residential financing (including FHA at 3.5% down if owner-occupied) while providing multifamily income diversification. This is why experienced investors frequently recommend starting with a house-hack — buying a duplex, living in one unit, and renting the other.</p>

<h2>Which to Choose: A Framework</h2>
<table>
  <thead><tr><th>If you prioritize...</th><th>Consider...</th></tr></thead>
  <tbody>
    <tr><td>Simplest entry point</td><td>SFR with conventional financing</td></tr>
    <tr><td>Lowest down payment</td><td>FHA on 2–4 unit owner-occupied</td></tr>
    <tr><td>Best cash flow per dollar</td><td>Small multifamily in Midwest markets</td></tr>
    <tr><td>Fastest portfolio scaling</td><td>Multifamily, 5+ units</td></tr>
    <tr><td>Easiest exit</td><td>SFR in strong appreciation markets</td></tr>
  </tbody>
</table>
    `,
  },

  // ── LEGAL ─────────────────────────────────────────────────────────────────
  {
    slug: 'eviction-process-by-state',
    title: 'The Eviction Process by State: Timelines, Costs, and What to Expect',
    excerpt: 'Eviction timelines range from 3 weeks to 6+ months depending on your state. Know the rules before you need them — not during an active dispute.',
    category: 'legal',
    categoryLabel: 'Legal & State Law',
    pill: 'State Law',
    tags: ['eviction', 'unlawful detainer', 'landlord rights', 'tenant removal'],
    publishedAt: '2026-02-28',
    readTime: '11 min',
    author: 'IL Editorial',
    body: `
<h2>The Eviction Process: Step-by-Step</h2>
<p>Eviction is a legal process. Self-help eviction — changing locks, removing belongings, shutting off utilities — is illegal in every state. The sequence: written notice, court filing, hearing, writ of possession, lockout.</p>

<h2>Notice Types</h2>
<ul>
  <li><strong>Pay or Quit:</strong> Nonpayment. 3–10 days depending on state. Accepting partial rent may void the notice.</li>
  <li><strong>Cure or Quit:</strong> Curable lease violations. Tenant has time to fix the violation.</li>
  <li><strong>Unconditional Quit:</strong> Severe or repeat violations. No cure opportunity.</li>
</ul>

<h2>Timeline by State</h2>
<table>
  <thead><tr><th>State</th><th>Typical Timeline</th></tr></thead>
  <tbody>
    <tr><td>Texas</td><td>3–4 weeks</td></tr>
    <tr><td>Georgia</td><td>3–5 weeks</td></tr>
    <tr><td>Florida</td><td>4–6 weeks</td></tr>
    <tr><td>Ohio</td><td>5–8 weeks</td></tr>
    <tr><td>New York</td><td>3–6 months</td></tr>
    <tr><td>California</td><td>3–6 months</td></tr>
  </tbody>
</table>

<h2>What Evictions Actually Cost</h2>
<p>Beyond lost rent: court filing fees ($30–$240), process server fees ($50–$150), attorney fees ($500–$3,000+), and repair/turnover costs. All-in: $2,000–$5,000 for an uncontested eviction. This is why tenant screening is the most important investment a landlord makes.</p>
    `,
  },
  {
    slug: 'security-deposit-laws-by-state',
    title: 'Security Deposit Laws by State: Limits, Timelines, and Penalties',
    excerpt: 'Miss your state\'s return deadline by one day and you may forfeit your right to withhold anything. Every state has different rules.',
    category: 'legal',
    categoryLabel: 'Legal & State Law',
    pill: 'State Law',
    tags: ['security deposit', 'landlord law', 'deposit return', 'tenant rights'],
    publishedAt: '2026-02-14',
    readTime: '8 min',
    author: 'IL Editorial',
    body: `
<h2>The Stakes</h2>
<p>Security deposit disputes are among the most common landlord-tenant legal claims — and landlords lose more than they should, not because deductions are wrong, but because of procedural failures: missing deadlines, insufficient documentation, or improper itemization.</p>

<h2>Maximum Deposit Amounts</h2>
<table>
  <thead><tr><th>State</th><th>Maximum</th><th>Return Deadline</th></tr></thead>
  <tbody>
    <tr><td>California</td><td>1 month (unfurnished)</td><td>21 days</td></tr>
    <tr><td>Texas</td><td>No limit</td><td>30 days</td></tr>
    <tr><td>Florida</td><td>No limit</td><td>15/30 days</td></tr>
    <tr><td>New York</td><td>1 month</td><td>14 days</td></tr>
    <tr><td>Massachusetts</td><td>1 month</td><td>30 days</td></tr>
    <tr><td>Virginia</td><td>2 months</td><td>45 days</td></tr>
  </tbody>
</table>

<h2>Wear and Tear vs. Damage</h2>
<p>Normal wear and tear (scuffs, worn carpet, small nail holes) cannot be deducted. Damage beyond ordinary use (holes in walls, pet stains, broken fixtures) is deductible with documentation and itemization.</p>
    `,
  },
  {
    slug: 'rent-control-laws-by-state',
    title: 'Rent Control Laws by State: Where They Apply and What They Actually Restrict',
    excerpt: 'Rent control is far more limited than the debate suggests — it applies to a fraction of U.S. rentals. But in the jurisdictions where it applies, the rules are complex and the penalties for violations are severe.',
    category: 'legal',
    categoryLabel: 'Legal & State Law',
    pill: 'Rent Control',
    tags: ['rent control', 'rent stabilization', 'landlord rights', 'California', 'New York'],
    publishedAt: '2026-03-02',
    readTime: '9 min',
    author: 'IL Editorial',
    body: `
<h2>The Reality of Rent Control's Reach</h2>
<p>Rent control applies to a relatively small share of the total U.S. rental stock — primarily in California, New York, New Jersey, Oregon, and Washington D.C. The majority of U.S. states preempt local rent control ordinances, meaning cities in those states cannot enact rent control even if they wanted to.</p>

<h2>States That Preempt Local Rent Control</h2>
<p>More than 30 states preempt local rent control, including: Texas, Florida, Georgia, Arizona, Indiana, Ohio, Pennsylvania, North Carolina, Colorado (with limited exceptions), and Wisconsin. In these states, there is no rent control anywhere — period.</p>

<h2>Major Rent Control Jurisdictions</h2>
<h3>California — AB 1482</h3>
<p>California's statewide rent control law limits annual increases to 5% + local CPI, with a maximum of 10%. It applies to most multifamily units built before 2005 that are not single-family homes or condos. Local ordinances in Los Angeles, San Francisco, Oakland, and other cities provide additional protections beyond AB 1482.</p>

<h3>New York</h3>
<p>New York City has two parallel systems: rent stabilization (covers most pre-1974 multifamily buildings) and rent control (older, more restrictive, applies to very few remaining units). Rent-stabilized units have regulated renewal increases set annually by the Rent Guidelines Board.</p>

<h3>Oregon</h3>
<p>Oregon has statewide rent stabilization limiting increases to 7% + CPI (maximum 10%). Applies to units older than 15 years. Landlords must provide 90 days notice before increases over 10%.</p>

<h2>Just Cause Eviction Requirements</h2>
<p>Many rent-controlled jurisdictions also require just cause for eviction — meaning landlords cannot simply decline to renew a lease. Permitted just cause reasons typically include: nonpayment, lease violations, owner move-in, substantial renovations, or demolition. Wrongful eviction claims in these jurisdictions can result in significant damages.</p>
    `,
  },

  // ── NEWS ──────────────────────────────────────────────────────────────────
  {
    slug: 'weekly-landlord-intel-march-10-2026',
    title: 'Weekly Landlord Intel: March 10, 2026',
    excerpt: 'This week: mortgage rates hold near 6.9%, Sun Belt vacancy continues to climb, a new Texas eviction ruling, and what the latest CPI report means for rent control calculations.',
    category: 'news',
    categoryLabel: 'Weekly Intel',
    pill: 'This Week',
    tags: ['weekly news', 'mortgage rates', 'rental market', 'eviction', 'rent control'],
    publishedAt: '2026-03-10',
    readTime: '5 min',
    author: 'IL Editorial',
    featured: false,
    body: `
<h2>Mortgage Rates: Holding at 6.87%</h2>
<p>The Freddie Mac Primary Mortgage Market Survey shows the 30-year fixed rate at 6.87% as of March 6, unchanged for the third consecutive week. The Fed held rates steady at its February meeting, and market pricing suggests the first cut is now expected no earlier than July 2026. For landlords considering refinances, the math has not changed materially.</p>

<h2>Sun Belt Vacancy Update</h2>
<p>New data from the Census Bureau's Housing Vacancy Survey shows the rental vacancy rate in the South Census region at 8.1%, the highest reading since 2012. Austin specifically is reporting apartment vacancy above 12% — a level that will continue to pressure new lease pricing throughout 2026. Landlords with expiring leases in these markets should price competitively.</p>

<h2>Texas Eviction Ruling: Pay or Quit Notice Clarification</h2>
<p>The Texas Supreme Court issued a clarification ruling this week affirming that acceptance of any partial rent payment after serving a Pay or Quit notice — including via Venmo, Zelle, or other digital platforms — resets the notice period. Landlords in Texas should implement a strict no-partial-payment policy during eviction proceedings and use only paper check or certified mail for any post-notice transactions.</p>

<h2>CPI Report: What It Means for Rent Control Jurisdictions</h2>
<p>February CPI came in at 3.1% year-over-year. For California landlords subject to AB 1482, the allowable rent increase for 2026 leases is 5% + local CPI. Most California metros have local CPI measurements in the 3.0–3.8% range, making the effective cap 8.0–8.8% for most AB 1482-covered units. Landlords planning annual increases should pull their local CPI figure from the BLS website before setting the increase amount.</p>

<h2>This Week's Data Snapshot</h2>
<table>
  <thead><tr><th>Metric</th><th>Value</th><th>Change</th></tr></thead>
  <tbody>
    <tr><td>30-Yr Fixed Rate</td><td>6.87%</td><td>Unchanged</td></tr>
    <tr><td>National Vacancy Rate</td><td>6.1%</td><td>+0.2% QoQ</td></tr>
    <tr><td>CPI (YoY)</td><td>3.1%</td><td>-0.1%</td></tr>
    <tr><td>Median Asking Rent</td><td>$1,844</td><td>+$12 MoM</td></tr>
  </tbody>
</table>
    `,
  },
  {
    slug: 'weekly-landlord-intel-march-3-2026',
    title: 'Weekly Landlord Intel: March 3, 2026',
    excerpt: 'This week: the Fed leaves rates unchanged, multifamily starts drop to a 10-year low, Oregon raises its rent cap, and a Florida court sides with landlords on lease termination fees.',
    category: 'news',
    categoryLabel: 'Weekly Intel',
    pill: 'This Week',
    tags: ['weekly news', 'Fed rates', 'multifamily', 'Oregon', 'Florida'],
    publishedAt: '2026-03-03',
    readTime: '5 min',
    author: 'IL Editorial',
    body: `
<h2>Fed Holds Rates: What It Means for Landlord Financing</h2>
<p>The Federal Reserve's March meeting ended with rates unchanged at 4.25–4.50%. Fed Chair Powell cited persistent services inflation and a strong labor market as reasons for patience. For landlords, this means the refinance environment remains challenging — but it also means the flood of new apartment supply funded by cheap debt is unlikely to continue. Projects underwritten at 3% are not being started at 7%.</p>

<h2>Multifamily Construction Starts Hit 10-Year Low</h2>
<p>February housing starts data shows multifamily starts at the lowest level since 2015. This is the pipeline that will determine rental supply in 2028–2029. Landlords who are frustrated by current oversupply in certain markets should note: the correction is already in motion on the supply side. The markets being built into today are the supply-constrained markets of 2028.</p>

<h2>Oregon Increases Rent Cap to 10%</h2>
<p>Oregon's Bureau of Labor and Statistics released the final CPI figure for 2025, triggering the state's rent stabilization cap adjustment. The 2026 allowable increase for Oregon landlords subject to the statewide law is now 10% (7% + 3.0% CPI). This is the maximum allowed under the statute. Landlords must provide 90 days written notice before implementing increases above 10%.</p>

<h2>Florida Court Upholds Lease Break Fee</h2>
<p>A Florida appellate court this week affirmed the enforceability of a lease termination fee equal to two months rent in a case where a tenant broke a fixed-term lease without statutory justification. The ruling clarifies that liquidated damages clauses in Florida leases are enforceable provided they represent a reasonable estimate of actual damages — not a penalty. Landlords should review lease language with counsel to ensure their termination fee clauses meet this standard.</p>
    `,
  },
  {
    slug: 'weekly-landlord-intel-feb-24-2026',
    title: 'Weekly Landlord Intel: February 24, 2026',
    excerpt: 'Rent growth slows nationally while Midwest markets outperform. New HUD guidance on criminal background checks. California expands AB 1482 to cover more unit types.',
    category: 'news',
    categoryLabel: 'Weekly Intel',
    pill: 'Last Week',
    tags: ['weekly news', 'HUD', 'criminal background', 'California', 'Midwest rents'],
    publishedAt: '2026-02-24',
    readTime: '5 min',
    author: 'IL Editorial',
    body: `
<h2>National Rent Growth Slows to 2.8% YoY</h2>
<p>The latest CoStar rental market data shows national asking rent growth decelerating to 2.8% year-over-year — down from 4.1% a year ago. The deceleration is almost entirely driven by Sun Belt oversupply. Midwest markets continue to outperform: Columbus (+5.8%), Indianapolis (+5.1%), and Kansas City (+4.9%) all posted above-average growth. Northeast metros held steady.</p>

<h2>HUD Issues Updated Criminal Background Check Guidance</h2>
<p>The Department of Housing and Urban Development released updated guidance this week on the use of criminal history in tenant screening under the Fair Housing Act. Key points: blanket bans on applicants with any criminal record may constitute disparate impact discrimination. HUD recommends individualized assessments that consider the nature of the crime, time elapsed, and evidence of rehabilitation. Landlords using blanket policies should consult counsel before their next screening cycle.</p>

<h2>California Extends AB 1482 Coverage</h2>
<p>California's Department of Consumer Affairs confirmed that several categories of accessory dwelling units (ADUs) that had previously been treated as exempt from AB 1482 will now fall under the rent increase caps. Landlords with ADUs built before 2009 on properties with existing multifamily structures should review their compliance status. The change takes effect for leases starting April 1, 2026.</p>

<h2>By the Numbers This Week</h2>
<table>
  <thead><tr><th>Metric</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>30-Yr Fixed Rate</td><td>6.85%</td></tr>
    <tr><td>Multifamily Starts (Feb)</td><td>289,000 annualized</td></tr>
    <tr><td>National Rent Growth YoY</td><td>2.8%</td></tr>
    <tr><td>Columbus OH Rent Growth</td><td>5.8%</td></tr>
  </tbody>
</table>
    `,
  },
]

// ── Exports ─────────────────────────────────────────────────────────────────

export const ALL_ARTICLES = ARTICLES
export const ARTICLE_COUNT = ARTICLES.length
export const CATEGORY_COUNTS = {
  guides: ARTICLES.filter(a => a.category === 'guides').length,
  market: ARTICLES.filter(a => a.category === 'market').length,
  legal:  ARTICLES.filter(a => a.category === 'legal').length,
  news:   ARTICLES.filter(a => a.category === 'news').length,
}

export function getArticle(category: ArticleCategory, slug: string): Article | undefined {
  return ARTICLES.find(a => a.category === category && a.slug === slug)
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return ARTICLES.filter(a => a.category === category)
}

export function getFeaturedArticle(): Article | undefined {
  return ARTICLES.find(a => a.featured)
}

export function getRecentArticles(limit = 6, excludeSlug?: string): Article[] {
  return ARTICLES
    .filter(a => a.slug !== excludeSlug)
    .slice(0, limit)
}

export function getSlugsForCategory(category: ArticleCategory): string[] {
  return ARTICLES.filter(a => a.category === category).map(a => a.slug)
}

export function getRelatedArticles(category: ArticleCategory, slug: string, limit = 3): Article[] {
  return ARTICLES
    .filter(a => a.category === category && a.slug !== slug)
    .slice(0, limit)
}

export function getSearchIndex() {
  return ARTICLES.map(a => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    categoryLabel: a.categoryLabel,
    tags: a.tags,
  }))
}

export function getLatestNews(limit = 5): Article[] {
  return ARTICLES
    .filter(a => a.category === 'news')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}
