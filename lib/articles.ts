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

export const ARTICLE_COUNT = 16

export const CATEGORY_COUNTS = {
  guides: 6,
  market: 4,
  legal: 3,
  news: 3,
}

export const ARTICLES: Article[] = [
  {
    slug: 'landlord-tenant-law-complete-guide',
    title: 'Landlord-Tenant Law: What Every Landlord Must Know in 2026',
    excerpt: 'State laws vary dramatically. Security deposits, entry notice, habitability standards, and eviction procedures differ by jurisdiction -- and getting it wrong is expensive.',
    category: 'guides',
    categoryLabel: 'Landlord Guides',
    pill: 'Essential Reading',
    tags: ['landlord-tenant law', 'legal', 'lease', 'eviction'],
    publishedAt: '2026-03-01',
    readTime: '12 min',
    author: 'IL Editorial',
    featured: true,
    body: `<h2>Why Landlord-Tenant Law Is Not One Law</h2>
<p>There is no single federal landlord-tenant law. What governs your rental property is a patchwork of state statutes, local ordinances, and court precedents that can vary dramatically from one county to the next. A landlord in Houston operates under completely different rules than one in Los Angeles, Chicago, or New York City. Getting it wrong is not just embarrassing — it can void your eviction case, expose you to treble damages, and result in a tenant staying in your property for months while you pay their attorney fees.</p>
<p>This guide covers the six legal pillars every landlord must understand regardless of state: habitability, security deposits, required disclosures, entry notice, lease termination, and eviction procedure.</p>

<h2>The Implied Warranty of Habitability</h2>
<p>Every state in the country recognizes an implied warranty of habitability — the legal obligation to maintain rental units in a livable condition. This is not negotiable and cannot be waived by lease language. What constitutes habitability varies by state but generally includes: functional heating (required in all states), plumbing and hot water, working electrical systems, weathertight structure, freedom from rodent and pest infestation, and adequate sanitation.</p>
<p>When a landlord fails to maintain habitability after receiving written notice, tenants in most states have layered remedies. Repair-and-deduct allows tenants to hire contractors and deduct the cost from rent, typically capped at one month's rent. Rent withholding allows tenants to stop paying rent entirely until conditions are fixed. Rent escrow requires tenants to pay rent into a court-held account. Constructive eviction allows tenants to break the lease without penalty if conditions are severe enough. California, New York, and Massachusetts have the strongest habitability protections. Texas and Georgia give landlords more time to cure defects before remedies attach.</p>

<h2>Security Deposit Law: The Most Litigated Area</h2>
<p>Security deposit disputes generate more landlord-tenant litigation than any other issue. The rules differ across five key dimensions:</p>
<table>
<thead><tr><th>State</th><th>Maximum Deposit</th><th>Return Deadline</th><th>Escrow Required</th><th>Penalty for Violation</th></tr></thead>
<tbody>
<tr><td>California</td><td>2 months (unfurnished)</td><td>21 days</td><td>No</td><td>2x deposit + actual damages</td></tr>
<tr><td>New York</td><td>1 month</td><td>14 days</td><td>Yes (banks)</td><td>2x deposit</td></tr>
<tr><td>Texas</td><td>No limit</td><td>30 days</td><td>No</td><td>3x deposit + $100 + attorney fees</td></tr>
<tr><td>Florida</td><td>No limit</td><td>15-60 days</td><td>Yes or surety bond</td><td>Forfeiture of deposit</td></tr>
<tr><td>Illinois</td><td>No limit</td><td>30 days</td><td>Yes (interest-bearing)</td><td>2x deposit + attorney fees</td></tr>
</tbody>
</table>
<p>The single most common and costly mistake: missing the return deadline. In many states, failing to return the deposit within the statutory period — even if the tenant caused damage — results in automatic forfeiture of your right to make deductions and exposes you to statutory penalties.</p>

<h2>Required Landlord Disclosures</h2>
<p>Federal law requires all landlords to disclose known lead-based paint hazards in properties built before 1978 — this applies in every state. Beyond federal requirements, state and local laws add a long list of required disclosures: known mold or water damage history, prior methamphetamine manufacturing, sex offender registry proximity (in some states), flood zone status, bedbug infestation history (New York, Chicago), shared utilities arrangements, and move-in inspection reports. California requires the most disclosures of any state — over 30 items. Failing to provide required disclosures can void lease provisions, trigger penalties, and expose landlords to liability.</p>

<h2>Notice Before Entry</h2>
<p>Landlords generally have a right to enter rental units for inspections, repairs, and showings — but almost every state requires advance notice. The standard is 24 hours in most states. California requires 24 hours written notice. New York has no statutory requirement but courts expect reasonable notice. Florida requires 12 hours notice. Oregon requires 24 hours. Emergency entry — a burst pipe, fire, or gas leak — is permitted without advance notice in all states but should be documented immediately afterward. Entering without required notice is not just a lease violation — it can constitute illegal entry and expose landlords to damages claims.</p>

<h2>The Eviction Process: What Landlords Get Wrong</h2>
<p>Eviction is a court process in every state. Self-help evictions — changing locks, removing tenant belongings, shutting off utilities, removing doors — are illegal everywhere and expose landlords to significant damages, sometimes including punitive damages and attorney fees. The legal sequence is: serve a written notice (pay or quit, cure or quit, or unconditional quit), wait the statutory cure period, file an unlawful detainer or summary possession action in court, attend the hearing, obtain a writ of possession, and then — only then — work with the sheriff to remove the tenant.</p>
<p>Timeline from first notice to actual lockout ranges from as few as 3 weeks in Texas to 6 months or more in New York, New Jersey, and California. The most common eviction mistakes: accepting partial rent payment after serving a pay-or-quit notice (this resets the notice clock in many states), serving notice incorrectly (wrong method of service, wrong number of days), and filing in the wrong court. Consult a local attorney before filing your first eviction — the procedural requirements are hyper-local.</p>`,
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
    body: `<h2>The Legal Framework: Fair Housing Act Basics</h2>
<p>The federal Fair Housing Act prohibits discrimination in housing based on race, color, national origin, religion, sex, familial status, and disability. Most states add additional protected classes: source of income (Section 8 vouchers), sexual orientation, gender identity, age, and marital status. New York City has over 17 protected classes. The law applies to advertising, application questions, screening criteria, and rejection decisions. Violations can result in HUD complaints, civil lawsuits, and damages that include compensatory damages, punitive damages, and attorney fees.</p>
<p>The key legal principle: you can screen aggressively on financial and behavioral criteria, but those criteria must be applied consistently to every applicant. Document everything.</p>

<h2>Build Written Screening Criteria Before You List</h2>
<p>The single most important thing you can do is establish written screening criteria before you accept the first application. These criteria create a paper trail showing you applied the same standards to every applicant. Your criteria should specify minimum income (typically 2.5-3x monthly rent), minimum credit score (typically 620-680), rental history requirements (no evictions in X years), criminal background policy, and employment verification requirements.</p>
<p>Once written, your criteria must be applied uniformly. If you waive the income requirement for one applicant, you must be prepared to explain why — and be sure it was not based on a protected characteristic. Keep rejected applications on file for at least three years.</p>

<h2>What You Can and Cannot Ask</h2>
<p>You can legally ask about and verify: income and employment, rental history and landlord references, credit history, criminal background (with important limitations), number of occupants, and move-in date. You cannot ask about: race, national origin, or where someone is from, religion or religious practices, disability or medical history, familial status or whether someone has children, sexual orientation or gender identity, and in source-of-income protected jurisdictions, whether someone has a housing voucher.</p>
<p>Criminal background screening requires particular care. HUD guidance warns that blanket criminal history bans may violate the Fair Housing Act through disparate impact. Best practice: conduct individualized assessments considering the nature of the crime, how long ago it occurred, and evidence of rehabilitation. Many jurisdictions now prohibit inquiring about criminal history before a conditional offer is made.</p>

<h2>Running Credit and Background Checks Legally</h2>
<p>You must obtain written consent before running any credit or background check. Use a compliant tenant screening service — FCRA-compliant providers include TransUnion SmartMove, RentSpree, Buildium, and AppFolio. Screening fees must not exceed your actual cost in most states. If you reject an applicant based on a credit report or background check, the Fair Credit Reporting Act requires you to provide an adverse action notice identifying the reporting agency used.</p>
<p>What to look for in a credit report: payment history, collections (especially prior landlords or utilities), outstanding debt load relative to income, and public records including evictions and judgments. A 580 credit score does not automatically disqualify someone — evaluate the full picture. A 750 score with a prior eviction judgment is a bigger red flag than a 620 score with a clean payment history.</p>

<h2>The Application Process: Documentation Best Practices</h2>
<p>Require a written application from every adult who will occupy the unit. Verify everything — call employers, call prior landlords (not just the current one — the current landlord may provide a glowing reference to get rid of a problem tenant), and confirm pay stubs against tax returns for self-employed applicants. When you make a decision, document why. When you reject an applicant, provide the legally required notices and retain your documentation. If you ever face a fair housing complaint, your records are your defense.</p>`,
    faqs: [
      { q: 'Can I reject an applicant because of bad credit?', a: 'Yes, if you apply the same credit standards to all applicants and document your criteria in writing before accepting applications.' },
      { q: 'Do I have to accept Section 8 vouchers?', a: 'It depends on your state and city. Source of income is a protected class in many jurisdictions. Check local law before declining voucher holders.' },
    ],
  },

  {
    slug: 'lease-agreement-must-have-clauses',
    title: 'Lease Agreement Must-Have Clauses',
    excerpt: 'Generic lease templates leave landlords exposed. These are the provisions that protect you when things go wrong -- and the illegal clauses you need to remove right now.',
    category: 'guides',
    categoryLabel: 'Landlord Guides',
    pill: 'Legal Protection',
    tags: ['lease agreement', 'rental contract', 'landlord protection', 'legal'],
    publishedAt: '2026-02-17',
    readTime: '10 min',
    author: 'IL Editorial',
    body: `<h2>Why Generic Leases Get Landlords Sued</h2>
<p>The internet is full of free lease templates. Most of them will get you into trouble. Generic leases fail in three ways: they omit state-required disclosures that render specific provisions unenforceable, they include clauses that are illegal in your jurisdiction, and they leave gaps that courts fill in with tenant-friendly default rules. A lease is your single most important legal document. It should be drafted or reviewed by a local attorney at least once, then updated annually as laws change.</p>
<p>That said, there are universal provisions every residential lease needs regardless of state. Here are the non-negotiable ones.</p>

<h2>Essential Financial Provisions</h2>
<p>Rent amount, due date, and grace period must be explicit. Specify the exact dollar amount, the day it is due (typically the 1st), whether there is a grace period (if so, how many days), and the late fee amount. Late fees are capped by statute in many states — California caps them at a reasonable estimate of actual damages, and many other states impose specific limits. Never charge late fees that exceed legal caps; unenforceable provisions can taint other lease terms.</p>
<p>Security deposit terms must comply with state law and be spelled out in the lease: exact amount collected, the account or bond where it is held (if required), what it can be applied to, and the return timeline. Include a move-in inspection clause requiring both parties to document unit condition in writing before or on move-in day. This document is your evidence in any future deposit dispute.</p>

<h2>Occupancy, Subletting, and Guests</h2>
<p>Specify exactly who is authorized to occupy the unit — by name for adults. Include a guest policy defining what constitutes unauthorized occupancy. A common standard: guests staying more than 14 consecutive days or 30 total days in a calendar year are considered unauthorized occupants. Include a subletting prohibition unless you intend to allow it, and if you allow it, specify the approval process.</p>
<p>Occupancy limits are legal when based on legitimate space and safety standards — typically two persons per bedroom plus one. Occupancy limits based on the presence of children violate the Fair Housing Act. Familial status is a protected class.</p>

<h2>Maintenance, Repairs, and Alterations</h2>
<p>Define tenant maintenance obligations clearly: keeping the unit clean, disposing of trash properly, notifying landlord of needed repairs in writing, and not making alterations without written consent. Specify what requires written approval — painting, installing fixtures, making holes in walls. Include a clause requiring tenants to report water leaks, mold, or pest sightings immediately. This clause matters because in many states, a landlord's habitability obligation is triggered by notice — if a tenant fails to report a problem and it worsens, their remedies may be limited.</p>

<h2>Lease Termination, Renewal, and Notice Requirements</h2>
<p>Every lease needs explicit terms for what happens at the end of the initial term. Does it convert to month-to-month automatically? Does it require a renewal notice? What notice is required to terminate a month-to-month tenancy? Most states require 30 days notice to terminate a month-to-month tenancy, but some require 60 days (California after one year of tenancy) and some require 90 days for long-term tenants. Specify these terms clearly so both parties know their obligations.</p>
<p>Include a holdover clause specifying what happens if the tenant stays beyond the lease end date without a new agreement — typically they become a month-to-month tenant at the same or higher rent. Without this clause, holdover tenants in some states are entitled to create a new lease term equal to the original.</p>

<h2>Illegal Clauses to Remove From Your Lease Right Now</h2>
<ul>
<li>Waiver of habitability — unenforceable in every state</li>
<li>Confession of judgment clauses — banned in most states</li>
<li>Automatic late fees that exceed state caps</li>
<li>Clauses purporting to waive required notice periods</li>
<li>Clauses making tenant responsible for all repairs regardless of cause</li>
<li>Non-refundable security deposits labeled as such — illegal in many states</li>
<li>Clauses authorizing self-help eviction (changing locks, removing belongings)</li>
</ul>`,
    faqs: [
      { q: 'Can I write my own lease agreement?', a: 'Yes, but it must comply with state and local law. Have it reviewed by a local attorney at least once, and update it when laws change.' },
      { q: 'What makes a lease clause unenforceable?', a: 'Clauses that waive statutory tenant rights, violate state consumer protection laws, or conflict with fair housing law are typically unenforceable regardless of what the lease says.' },
    ],
  },

  {
    slug: 'property-management-tax-deductions',
    title: 'Property Management Tax Deductions Every Landlord Should Know',
    excerpt: 'Rental real estate gets uniquely favorable tax treatment. Most landlords leave thousands on the table every year by missing legitimate deductions and misunderstanding depreciation.',
    category: 'guides',
    categoryLabel: 'Landlord Guides',
    pill: 'Tax Strategy',
    tags: ['tax deductions', 'depreciation', 'rental income', 'IRS'],
    publishedAt: '2026-02-10',
    readTime: '11 min',
    author: 'IL Editorial',
    body: `<h2>Why Rental Property Tax Treatment Is Different</h2>
<p>Rental real estate receives uniquely favorable tax treatment under the U.S. tax code. Unlike most investments, you can deduct not just cash expenses but also a non-cash depreciation deduction that reduces your taxable income even in years when the property is profitable. Understanding these rules is not optional — the difference between a landlord who understands rental tax law and one who does not can easily be $5,000 to $20,000 in annual tax savings on a single property.</p>
<p>This guide covers the major categories of deductible expenses, depreciation rules, passive activity loss limitations, and the Section 199A qualified business income deduction.</p>

<h2>Ordinary and Necessary Rental Expenses</h2>
<p>The IRS allows deductions for all ordinary and necessary expenses related to managing, conserving, and maintaining your rental property. Major deductible categories include:</p>
<ul>
<li><strong>Mortgage interest:</strong> The interest portion of your mortgage payment is fully deductible. This is typically your largest deduction in early loan years.</li>
<li><strong>Property taxes:</strong> Fully deductible as a rental expense (not subject to the $10,000 SALT cap that applies to personal property taxes).</li>
<li><strong>Insurance premiums:</strong> Landlord insurance, liability insurance, and flood or earthquake insurance are fully deductible.</li>
<li><strong>Repairs and maintenance:</strong> Costs to keep the property in working condition — fixing a broken furnace, patching a roof, repainting — are fully deductible in the year incurred.</li>
<li><strong>Property management fees:</strong> Fees paid to a property management company are fully deductible.</li>
<li><strong>Advertising and tenant screening:</strong> Listing fees, background check costs, and marketing expenses are deductible.</li>
<li><strong>Professional fees:</strong> Attorney fees for lease drafting, eviction proceedings, and tax preparation fees allocable to the rental are deductible.</li>
<li><strong>Travel:</strong> Mileage to and from the property for inspections, repairs, or tenant meetings is deductible at the IRS standard mileage rate.</li>
</ul>

<h2>Depreciation: Your Largest Non-Cash Deduction</h2>
<p>Residential rental property is depreciated over 27.5 years using straight-line depreciation. This means you deduct 1/27.5 (approximately 3.636%) of the property's depreciable basis each year, regardless of whether the property is actually declining in value. The depreciable basis is the purchase price plus improvements, minus the land value (land is not depreciable). On a $300,000 property with $50,000 allocated to land, you have a $250,000 depreciable basis, generating an annual depreciation deduction of approximately $9,090 — tax-free cash flow that offsets your rental income.</p>
<p>Improvements are different from repairs. A new roof, addition, or HVAC system must be capitalized and depreciated over their useful lives rather than deducted immediately. The distinction matters: a $15,000 HVAC replacement deducted immediately is worth far more than the same amount depreciated over 15 years. Cost segregation studies can accelerate depreciation by reclassifying components into shorter depreciation categories — a valuable tool for larger properties.</p>

<h2>Passive Activity Loss Rules and the Real Estate Exception</h2>
<p>Rental activities are generally classified as passive activities under IRS rules, meaning losses can only offset passive income. However, there are two important exceptions. If you actively participate in managing your rental (making management decisions, approving tenants, authorizing repairs) and your adjusted gross income is $100,000 or less, you can deduct up to $25,000 in rental losses against ordinary income. This deduction phases out between $100,000 and $150,000 AGI. The second exception is the real estate professional exception: if more than 50% of your working hours and at least 750 hours per year are spent in real estate activities, rental losses are not passive and can offset any income without limitation.</p>

<h2>Section 199A Qualified Business Income Deduction</h2>
<p>The Tax Cuts and Jobs Act created a 20% deduction on qualified business income for pass-through entities. Rental activities can qualify, but the IRS requires either that the rental rises to the level of a trade or business under Section 162 standards, or that the taxpayer meets a safe harbor requiring at least 250 hours of rental services per year and maintains contemporaneous logs. For landlords with significant rental income, this deduction can be substantial — a $50,000 net rental income could generate a $10,000 deduction, saving $2,200 to $3,700 in federal taxes depending on your bracket.`,
    faqs: [
      { q: 'Can I deduct repairs but not improvements?', a: 'Yes. Repairs that maintain the property in its current condition are fully deductible. Improvements that add value or extend useful life must be capitalized and depreciated.' },
      { q: 'What is the passive activity loss rule?', a: 'Rental losses are generally passive and can only offset passive income, unless you qualify as a real estate professional or meet the active participation exception for incomes under $150,000.' },
    ],
  },

  {
    slug: 'landlord-insurance-complete-guide',
    title: 'Landlord Insurance: What You Need and What You Are Probably Missing',
    excerpt: 'Your homeowner policy does not cover rental activity. Here is what landlord insurance actually covers, what it does not, and the optional coverages worth every dollar.',
    category: 'guides',
    categoryLabel: 'Landlord Guides',
    pill: 'Risk Management',
    tags: ['landlord insurance', 'dwelling fire', 'liability', 'loss of rent'],
    publishedAt: '2026-02-03',
    readTime: '8 min',
    author: 'IL Editorial',
    body: `<h2>Why Your Homeowner Policy Does Not Cover Rentals</h2>
<p>Standard homeowner insurance policies explicitly exclude rental activities. If you move out and start renting your home, your homeowner policy may deny claims that arise during the tenancy — even if you did not tell your insurer you were renting. Discovering this after a fire, flood, or liability claim is devastating. Landlord insurance — also called dwelling fire insurance or rental property insurance — is a separate product designed specifically for non-owner-occupied residential properties. It is not optional.</p>

<h2>What Landlord Insurance Covers</h2>
<p>A standard landlord insurance policy has three core components. Dwelling coverage protects the physical structure — the building, attached structures, and built-in appliances — against covered perils including fire, lightning, windstorm, hail, vandalism, and certain water damage. The coverage limit should reflect replacement cost, not market value. In high-cost markets, replacement cost can significantly exceed market value. Liability coverage protects you if a tenant or visitor is injured on the property and sues you. Standard limits are $100,000 to $300,000; umbrella policies can extend this to $1 million or more. Loss of rent coverage (also called fair rental value coverage) reimburses you for lost rent while the property is uninhabitable due to a covered claim. This is critical — a fire that takes six months to repair could mean six months of lost rental income without this coverage.</p>

<h2>What Landlord Insurance Does NOT Cover</h2>
<p>Flood damage is excluded from all standard policies — it requires a separate National Flood Insurance Program policy or private flood insurance. Earthquake damage requires a separate endorsement or policy. Normal wear and tear is not covered. Tenant property is not covered — this is the tenant's responsibility (renter's insurance). Vacancy exclusions are critical: most policies stop covering certain perils if the property is vacant for 30 to 60 consecutive days. If you have a property between tenants, notify your insurer or purchase a vacancy endorsement.</p>

<h2>Optional Coverages Worth Considering</h2>
<p>Rent guarantee insurance (also called rent default insurance) covers lost rent if a tenant stops paying — separate from loss of rent coverage which applies only to covered physical damage. This coverage is relatively new and expensive but provides meaningful protection. Building code upgrade coverage pays the additional cost of bringing a repaired structure up to current building codes — without it, you pay out of pocket for code compliance after a claim. Vandalism and malicious mischief endorsements are particularly important for vacant properties. Equipment breakdown coverage covers mechanical and electrical failures of systems like HVAC, plumbing, and electrical panels that are not caused by a covered peril.</p>

<h2>How Much Coverage Do You Need</h2>
<p>Insure the dwelling for its replacement cost — what it would cost to rebuild from scratch at current labor and material prices, not what you paid for it or what it is worth on the market. Replacement cost calculators from insurers typically estimate $100 to $200 per square foot for standard construction, higher in dense urban markets. Carry at least $300,000 in liability coverage; $500,000 is better. Umbrella policies providing $1 million in additional coverage run $150 to $300 per year and are arguably the best value in landlord risk management. Loss of rent coverage should cover at least 12 months of gross rent.</p>

<h2>Requiring Tenant Renter's Insurance</h2>
<p>Make renter's insurance a lease requirement. Renter's insurance protects the tenant's personal property and provides liability coverage for accidents the tenant causes — like an unattended candle fire or a bathtub overflow that damages the unit below. Require a minimum of $100,000 in liability coverage and ask to be listed as an additional interested party so you receive cancellation notices. Policies typically cost tenants $15 to $25 per month. This simple requirement protects you, protects your tenant, and reduces disputes when something goes wrong.`,
    faqs: [
      { q: 'Does landlord insurance cover tenant belongings?', a: 'No. Tenant belongings are covered by the tenant\'s own renter\'s insurance policy. This is why requiring renter\'s insurance in your lease is good practice.' },
      { q: 'What is loss of rent coverage?', a: 'Loss of rent coverage reimburses you for rental income lost while the property is uninhabitable due to a covered claim like fire or storm damage.' },
    ],
  },

  {
    slug: 'tenant-move-out-checklist',
    title: 'The Landlord Move-Out Checklist: Protect Your Security Deposit Rights',
    excerpt: 'Most deposit disputes are won or lost based on what happened during move-out. A disciplined, documented process is your entire defense.',
    category: 'guides',
    categoryLabel: 'Landlord Guides',
    pill: 'Operations',
    tags: ['move-out', 'security deposit', 'inspection', 'tenant turnover'],
    publishedAt: '2026-01-27',
    readTime: '7 min',
    author: 'IL Editorial',
    body: `<h2>Why the Move-Out Process Defines Your Deposit Dispute Outcome</h2>
<p>Most security deposit disputes are won or lost based on what happened — and what was documented — during the move-out process. Landlords who follow a disciplined, documented checklist almost always prevail. Landlords who rely on memory, vague recollections, or undocumented claims almost always lose. The process has four stages: pre-move-out inspection, move-out inspection, cost documentation, and timely return of the deposit with an itemized statement.</p>

<h2>Before the Tenant Leaves: Pre-Move-Out Inspection</h2>
<p>Many states — including California, Hawaii, and Georgia — give tenants the right to a pre-move-out inspection before they vacate. This inspection allows tenants to remedy deficiencies before the final inspection. Even in states where it is not legally required, offering a pre-move-out walkthrough is good practice: it reduces disputes, motivates tenants to clean and repair, and demonstrates good faith. Conduct this inspection 1-2 weeks before the move-out date and provide the tenant a written list of items they should address.</p>

<h2>Move-Out Inspection Checklist by Room</h2>
<p>Conduct the final inspection the day the tenant vacates, ideally with the tenant present. Use the move-in inspection report as your baseline — you can only charge for damage beyond normal wear and tear. Document everything with timestamped photos and video.</p>
<p><strong>Kitchen:</strong> Appliances (oven interior, burners, refrigerator including drip pans and coils), cabinet interiors, countertops, sink and disposal, exhaust fan filter, floor, and walls. <strong>Bathrooms:</strong> Toilet, tub and shower including caulking and grout, sink and vanity, mirrors, exhaust fan, and flooring. <strong>Bedrooms and Living Areas:</strong> Walls (holes, scuffs, marks beyond normal wear), ceilings, floors (scratches, stains, damage to carpet), windows and blinds, light fixtures and outlets, closet interiors, and doors and hardware. <strong>Exterior and Common Areas:</strong> Garage and storage areas, yard condition if tenant is responsible, and any damage to building exterior.</p>

<h2>Normal Wear and Tear vs. Damage: The Critical Distinction</h2>
<p>You cannot charge tenants for normal wear and tear — this is settled law in every state. The difficulty is that the line between normal wear and tenant damage is genuinely fuzzy and frequently contested. Normal wear and tear includes: small nail holes from hanging pictures, minor scuffs on walls from furniture, carpet wear in traffic areas from normal use, fading of paint or carpet from sunlight, and minor scratches on hardwood floors. Chargeable damage includes: large holes in walls, broken windows, burns in carpet or countertops, pet stains and odors, extensive crayon or marker on walls, broken fixtures, and damage beyond what normal use would cause. When in doubt, document extensively and be conservative in your deductions. Courts and small claims judges consistently side with tenants on borderline wear-and-tear claims.</p>

<h2>Calculating and Documenting Deductions</h2>
<p>For each deduction, you need documentation: a photo showing the damage, a description of what was damaged and why it constitutes damage beyond normal wear, the cost to repair or replace, and evidence of that cost (invoices, receipts, or written estimates). Prorating is required for replaced items that are not at end of useful life. Carpet with a 10-year useful life that was 5 years old when the tenant moved in can only have 50% of replacement cost charged if the tenant destroyed it. Keep records of all prior replacements so you can establish the age and condition of items.</p>

<h2>Deposit Return: Deadlines and Consequences</h2>
<p>Missing your state's deposit return deadline is the single most expensive mistake a landlord can make. Penalties range from forfeiture of all deductions to statutory damages of 2-3x the deposit amount, plus attorney fees. Know your deadline: California 21 days, Texas 30 days, New York 14 days, Florida 15-60 days depending on whether there are deductions, Illinois 30 days. The clock starts at move-out or when you receive the forwarding address, whichever is later. Send the return and itemized statement via certified mail to create a dated record.`,
    faqs: [
      { q: 'What is normal wear and tear?', a: 'Normal wear and tear includes minor scuffs, small nail holes, and carpet wear from ordinary use. You cannot deduct for these. Damage beyond normal use -- burns, large holes, pet stains -- is chargeable.' },
      { q: 'What happens if I miss the deposit return deadline?', a: 'In most states, missing the deadline costs you the right to make any deductions and exposes you to statutory penalties of 2-3x the deposit amount.' },
    ],
  },

  {
    slug: 'rental-market-outlook-2026',
    title: 'Rental Market Outlook 2026: What Landlords Need to Know',
    excerpt: 'New supply is peaking, mortgage rates are keeping renters in place, and market performance is diverging sharply by geography. Here is where things stand.',
    category: 'market',
    categoryLabel: 'Rental Market',
    pill: 'Market Analysis',
    tags: ['rental market', 'vacancy rates', 'rent growth', 'market trends'],
    publishedAt: '2026-03-08',
    readTime: '10 min',
    author: 'IL Editorial',
    body: `<h2>Where the Rental Market Stands in Early 2026</h2>
<p>The rental market in early 2026 is showing the clearest signs of normalization since the pandemic-era surge. National median asking rents have declined year-over-year for 18 consecutive months following the extraordinary 2021-2022 peak, when some markets saw annual rent growth exceeding 25%. That correction, combined with the largest apartment construction pipeline in decades hitting the market simultaneously, has shifted pricing power toward renters in most metros. The 30-year mortgage rate at 6.11% (Freddie Mac, March 2026) continues to suppress homebuying demand, keeping many would-be buyers in the rental pool — a structural tailwind for landlords even as immediate rent growth has softened.</p>

<h2>Supply: The New Construction Wave and Its Limits</h2>
<p>The apartment construction boom that began in 2022 peaked in late 2024 with over 600,000 units completed nationally — the highest annual figure since the 1980s. This supply surge hit hardest in Sun Belt markets: Austin, Phoenix, Atlanta, Nashville, and Charlotte saw vacancy rates climb to 8-12%, directly compressing rents. Landlords in these markets have been offering 1-2 months free rent and other concessions not seen since 2010. The relief for these markets: the construction pipeline is now contracting sharply. Permit activity dropped 18% in 2024 as higher construction costs and tighter financing made new projects pencil at a much higher rent assumption than today's market supports. The current units completing in 2025-2026 represent the last of the boom-era pipeline. By 2027, the supply shortfall resumes.</p>

<h2>Demand: Who Is Renting and Why</h2>
<p>Rental demand in 2026 is coming from two powerful and durable sources. First, the millennial and Gen Z cohort formation — the 25-34 age bracket, the peak household formation years, is the largest it has ever been in U.S. history. Second, homeownership affordability remains deeply challenged. At current mortgage rates, buying the median U.S. home requires a monthly payment roughly 50% higher than renting an equivalent unit. This affordability gap is keeping renters in the rental pool longer and supporting demand even as rents have moderated. Remote work patterns continue to support secondary and tertiary market demand — markets like Boise, Raleigh, Huntsville, and Spokane maintained stronger occupancy in 2025 than gateway cities.</p>

<h2>Market Performance by Tier: 2025-2026 Snapshot</h2>
<table>
<thead><tr><th>Market Tier</th><th>Vacancy Rate</th><th>YoY Rent Change</th><th>Outlook</th></tr></thead>
<tbody>
<tr><td>Sun Belt (Austin, Phoenix)</td><td>9-12%</td><td>-5% to -8%</td><td>Bottoming; recovery in 2027</td></tr>
<tr><td>Gateway Cities (NYC, SF, Boston)</td><td>3-5%</td><td>+2% to +4%</td><td>Strong; supply constrained</td></tr>
<tr><td>Midwest (Columbus, Indianapolis)</td><td>5-7%</td><td>+1% to +3%</td><td>Stable; affordable demand</td></tr>
<tr><td>Secondary Sun Belt (Raleigh, Nashville)</td><td>7-9%</td><td>-1% to +1%</td><td>Absorbing supply; stabilizing</td></tr>
<tr><td>Mountain West (Denver, Salt Lake)</td><td>6-8%</td><td>-2% to 0%</td><td>Normalizing; good long-term</td></tr>
</tbody>
</table>

<h2>What Landlords Should Be Doing Right Now</h2>
<p>In soft markets, retention is more valuable than ever. The cost of tenant turnover — vacancy, cleaning, repairs, re-leasing, and concessions — typically equals 1.5 to 3 months of rent. Keeping a good tenant at flat rent or a modest increase almost always beats finding a new tenant, especially in markets where concessions are the norm. Price accurately using real market data, not wish pricing. In tight markets like coastal cities, raise rents to market proactively — waiting allows tenants to lock in below-market rates under rent stabilization rules. Invest in units now: appliance upgrades, cosmetic improvements, and smart home features command meaningful rent premiums and reduce vacancy time.`,
    faqs: [
      { q: 'Are rents going up or down in 2026?', a: 'It depends entirely on the market. Coastal gateway cities are seeing 2-4% growth. Sun Belt markets like Austin and Phoenix are seeing 5-8% declines as new supply is absorbed.' },
      { q: 'When will the rental market tighten again?', a: 'The new apartment construction pipeline is contracting sharply. Most analysts expect supply-driven softness in Sun Belt markets to resolve by 2027 as completions decline.' },
    ],
  },

  {
    slug: 'cap-rate-explained-rental-investors',
    title: 'Cap Rate Explained: What Every Rental Investor Must Understand',
    excerpt: 'Cap rate is the most used and most misunderstood metric in real estate. Here is exactly what it measures, how to calculate NOI correctly, and when cash-on-cash return matters more.',
    category: 'market',
    categoryLabel: 'Rental Market',
    pill: 'Investing Basics',
    tags: ['cap rate', 'NOI', 'cash-on-cash', 'rental valuation'],
    publishedAt: '2026-03-01',
    readTime: '9 min',
    author: 'IL Editorial',
    body: `<h2>What Cap Rate Actually Measures</h2>
<p>Cap rate — capitalization rate — is the most widely used metric in commercial and residential real estate valuation, and also one of the most misunderstood. Cap rate measures the relationship between a property's net operating income and its market value, expressed as a percentage. The formula is simple: Cap Rate = Net Operating Income / Property Value. If a property generates $40,000 in annual net operating income and is valued at $500,000, the cap rate is 8%. Cap rate tells you two things: the property's current yield assuming no debt, and the market's collective judgment about the risk and growth potential of that asset type in that location.</p>
<p>What cap rate does not measure: cash-on-cash return (which accounts for financing), internal rate of return (which accounts for appreciation), or total return. Understanding the difference matters enormously when comparing investment opportunities.</p>

<h2>Calculating Net Operating Income Correctly</h2>
<p>Net operating income is gross rental income minus vacancy allowance minus all operating expenses. The most common mistake investors make: using actual vacancy instead of a market vacancy allowance, and omitting expenses that exist but were not paid (like repairs the owner deferred). A properly constructed NOI calculation looks like this:</p>
<table>
<thead><tr><th>Item</th><th>Example</th></tr></thead>
<tbody>
<tr><td>Gross Potential Rent</td><td>$60,000/yr</td></tr>
<tr><td>Less: Vacancy (5-8%)</td><td>-$3,600</td></tr>
<tr><td>Effective Gross Income</td><td>$56,400</td></tr>
<tr><td>Less: Property Taxes</td><td>-$6,000</td></tr>
<tr><td>Less: Insurance</td><td>-$2,400</td></tr>
<tr><td>Less: Property Management (8-10%)</td><td>-$5,040</td></tr>
<tr><td>Less: Maintenance Reserve (5-10%)</td><td>-$4,000</td></tr>
<tr><td>Less: Utilities (if landlord-paid)</td><td>-$2,400</td></tr>
<tr><td>Net Operating Income</td><td>$36,560</td></tr>
</tbody>
</table>
<p>Critically: NOI does not include mortgage payments. Cap rate is a pre-debt metric. This is intentional — it allows comparison of properties regardless of how they are financed.</p>

<h2>What Cap Rates Tell You About Markets</h2>
<p>Cap rates vary by property type, market, and asset quality. Lower cap rates indicate lower perceived risk and higher growth expectations — investors are willing to accept less current yield in exchange for anticipated appreciation. Higher cap rates indicate higher perceived risk or lower growth expectations. In early 2026: Class A multifamily in New York, San Francisco, and Boston traded at 4.0-4.5% cap rates. Class B/C multifamily in secondary markets traded at 5.5-7.0%. Single-family rentals in Sun Belt markets ranged from 4.5-6.5% depending on asset quality and market. Workforce housing in the Midwest traded at 6.5-8.5%.</p>

<h2>Cap Rate vs. Cash-on-Cash Return</h2>
<p>If you are financing an acquisition, cash-on-cash return is more useful than cap rate for evaluating actual returns on invested capital. Cash-on-cash return = Annual Pre-Tax Cash Flow / Total Cash Invested. If you purchase that $500,000 property at an 8% cap rate with 25% down ($125,000) and a 6.5% mortgage, your annual debt service is approximately $28,400. Your annual cash flow is $40,000 NOI minus $28,400 debt service = $11,600. Your cash-on-cash return is $11,600 / $125,000 = 9.3%. Positive leverage — where your cap rate exceeds your mortgage cost — creates a scenario where financing improves returns. Negative leverage — where your cap rate is below your mortgage cost, common in gateway cities with sub-5% cap rates — means financing actually reduces your cash yield.</p>`,
    faqs: [
      { q: 'What is a good cap rate for a rental property?', a: 'It depends on your market and strategy. 6-8% is considered strong in most secondary markets. Sub-5% cap rates in gateway cities reflect lower risk and higher appreciation expectations.' },
      { q: 'Does cap rate include mortgage payments?', a: 'No. Cap rate is calculated before debt service. It is a pre-financing metric that allows comparison of properties regardless of how they are financed.' },
    ],
  },

  {
    slug: 'best-cities-rental-investment-2026',
    title: 'Best Cities for Rental Investment in 2026',
    excerpt: 'The best rental market depends on your strategy. Here is a framework for evaluating markets and the cities showing the strongest risk-adjusted opportunity right now.',
    category: 'market',
    categoryLabel: 'Rental Market',
    pill: 'Market Guide',
    tags: ['real estate investing', 'rental markets', 'best cities', 'market analysis'],
    publishedAt: '2026-02-22',
    readTime: '11 min',
    author: 'IL Editorial',
    body: `<h2>How to Evaluate a Rental Market: The Framework</h2>
<p>The best rental market for your investment depends on your strategy, risk tolerance, and capital. High-yield markets in the Midwest and Southeast offer strong current income but lower appreciation. Coastal gateway cities offer appreciation and stability but thin yields and complex regulations. Sun Belt markets offer growth at moderate yields but have been absorbing significant new supply. Before looking at specific markets, establish what you are optimizing for: current cash flow, total return, appreciation, or equity growth. Markets that rank highly on one dimension frequently rank poorly on another.</p>

<h2>Strong Cash Flow Markets in 2026</h2>
<p>The Midwest continues to produce the strongest risk-adjusted cash flow yields for single-family and small multifamily investors. Indianapolis, Columbus, Cincinnati, Kansas City, and Cleveland consistently offer cap rates in the 6.5-8.5% range on reasonably priced assets. These markets benefit from stable employment bases, affordable housing prices, and limited new supply in the price ranges accessible to individual investors. Indianapolis in particular has seen strong rent growth driven by Amazon, Salesforce, and Eli Lilly employment expansion while maintaining housing prices well below $250,000 for solid rental stock. Columbus benefits from Ohio State University and a diversifying tech and logistics economy.</p>

<h2>Appreciation-Driven Markets</h2>
<p>Markets where long-term appreciation has historically outpaced the national average tend to share common characteristics: geographic supply constraints, strong job market in high-paying industries, population growth, and limited new construction relative to demand. In 2026, these characteristics describe: the entire Florida East Coast corridor from Miami to Palm Beach (despite recent insurance challenges), major Texas metros (Dallas, Austin, San Antonio, Houston) despite the current supply overhang, Nashville and the broader Tennessee corridor, and the Carolinas (Charlotte and Raleigh specifically). Investors in these markets should underwrite for lower current yields — 4.5-6% cap rates — with conviction in long-term appreciation to generate acceptable total returns.</p>

<h2>Markets to Approach Cautiously in 2026</h2>
<p>Austin and Phoenix are absorbing the most significant supply surges of any major U.S. markets. Austin saw rents decline 8% year-over-year in 2025 as over 15,000 new apartment units delivered into a market that was still absorbing the 2021-2022 boom. Both markets will recover — the underlying demand drivers are intact — but investors buying in 2026 should underwrite for 12-24 months of softness and ensure their debt service can be covered at current market rents without assuming near-term increases. San Francisco and other Bay Area markets have experienced significant population loss and office vacancy that has suppressed rental demand. However, the severe supply constraints and improving tech employment create a potential recovery play for patient investors.</p>

<h2>The Case for Secondary and Tertiary Markets</h2>
<p>Smaller markets often offer the best risk-adjusted returns for individual investors because institutional capital has not yet bid up prices. Markets worth research in 2026: Huntsville, Alabama (aerospace and defense expansion, population growth, low cost basis), Knoxville, Tennessee (university market, healthcare employment, affordable prices), Boise, Idaho (recovering from 2022-2023 price correction, strong long-term migration trends), and Greenville-Spartanburg, South Carolina (manufacturing diversification, BMW and Michelin employment, affordable housing stock). In all these markets, do the work: verify local vacancy rates, rent trends, and pipeline supply before committing capital.`,
    faqs: [
      { q: 'Should I invest locally or out of state?', a: 'Local investing is easier to manage but limits your market. Out-of-state investing requires a reliable property manager and thorough remote due diligence, but opens access to better-performing markets.' },
      { q: 'Is it too late to buy in the Sun Belt?', a: 'Sun Belt markets are absorbing significant supply in 2025-2026. The underlying demand drivers are intact but investors should underwrite for 12-24 months of softness and ensure debt service coverage at current rents.' },
    ],
  },

  {
    slug: 'multifamily-vs-single-family-rental',
    title: 'Multifamily vs Single-Family Rental: Which Is Right for You',
    excerpt: 'The two asset types have fundamentally different operational profiles, financing structures, and return characteristics. Here is how to decide.',
    category: 'market',
    categoryLabel: 'Rental Market',
    pill: 'Strategy',
    tags: ['multifamily', 'single family rental', 'real estate investing', 'portfolio strategy'],
    publishedAt: '2026-02-15',
    readTime: '10 min',
    author: 'IL Editorial',
    body: `<h2>The Core Differences: Operations, Financing, and Scale</h2>
<p>The single-family versus multifamily decision is one of the most consequential choices a rental investor makes — and it is not purely a returns question. The two asset types have fundamentally different operational profiles, financing structures, valuation methodologies, tenant profiles, and management requirements. What works for one investor may be entirely wrong for another based on their capital, time, risk tolerance, and long-term goals.</p>

<h2>Single-Family Rentals: Advantages and Limitations</h2>
<p>Single-family rental (SFR) properties — standalone houses, condos, and townhomes — attract a specific and often superior tenant profile: families, professionals, and long-term tenants who treat the property as a home. Average tenancy in SFR properties runs 3-5 years versus 12-18 months for apartments, dramatically reducing turnover costs. SFR properties qualify for residential financing — 30-year fixed rate mortgages at rates far below commercial rates — and are accessible to individual investors without the capital requirements of multifamily. They are also simpler to manage and easier to exit: the buyer pool for a single-family home includes both investors and owner-occupants.</p>
<p>The limitations: no economies of scale. A vacancy means 100% vacancy loss. Maintenance costs are similar to an equivalent apartment unit but spread over only one rent-paying tenant. If you own 10 SFR properties across different neighborhoods or even different cities, the management complexity scales poorly. Appreciation is primarily driven by comparable sales rather than income — which means you cannot force appreciation through improved operations the way you can with multifamily.</p>

<h2>Multifamily: Advantages and Limitations</h2>
<p>Small multifamily (2-4 units) finances similarly to single-family — residential mortgage rates apply and owner-occupant financing is available for 2-4 unit properties where the owner lives in one unit (house hacking). A duplex with one unit rented can effectively eliminate a housing payment while building equity. Larger multifamily (5+ units) is commercial financing: shorter amortization periods (typically 20-25 years), floating or 5-7 year fixed rates, and underwriting based on property income rather than owner creditworthiness. Commercial loans typically require 25-30% down versus 20-25% for residential.</p>
<p>The advantages of scale: one roof, one foundation, one property tax bill, one insurance policy covering multiple units. A 10-unit building with one vacancy is 90% occupied. NOI improvements through rent increases, expense reduction, or improved occupancy directly increase property value through cap rate mathematics — a $10,000 annual NOI improvement at a 7% cap rate creates $142,000 in additional value. This income-driven appreciation potential is the primary reason sophisticated investors favor multifamily at scale.</p>

<h2>Returns Comparison: What the Numbers Show</h2>
<table>
<thead><tr><th>Metric</th><th>Single-Family</th><th>Small Multifamily (2-4)</th><th>Large Multifamily (10+)</th></tr></thead>
<tbody>
<tr><td>Typical Cap Rate (2026)</td><td>4.5-6.5%</td><td>5.5-7.5%</td><td>5.0-8.0%</td></tr>
<tr><td>Financing Rate</td><td>6-7% (30yr fixed)</td><td>6-7% (30yr fixed)</td><td>6.5-8% (commercial)</td></tr>
<tr><td>Avg Tenancy</td><td>3-5 years</td><td>1-2 years</td><td>12-18 months</td></tr>
<tr><td>Vacancy Impact</td><td>100%</td><td>25-50%</td><td>10%</td></tr>
<tr><td>Management Complexity</td><td>Low-Medium</td><td>Medium</td><td>High</td></tr>
<tr><td>Exit Market</td><td>Broad</td><td>Medium</td><td>Investor-only</td></tr>
</tbody>
</table>

<h2>Which Is Right for You</h2>
<p>New investors with limited capital and no management experience should typically start with single-family or a small multifamily where they can owner-occupy. The learning curve is manageable, the financing is accessible, and the exit is straightforward. Investors who have stabilized a portfolio of SFR properties and want to scale efficiency should consider moving up to 5-20 unit multifamily in markets with strong fundamentals. Investors seeking institutional-grade returns and who have access to commercial financing and professional management should target 20+ unit multifamily in growing secondary markets. There is no universally correct answer — the best investment is the one you will manage competently, finance sustainably, and hold through market cycles.`,
    faqs: [
      { q: 'Which has better returns -- single family or multifamily?', a: 'Multifamily generally offers better cash flow yields and income-driven appreciation. Single-family offers simpler management, better financing rates, and a broader exit market including owner-occupants.' },
      { q: 'What is house hacking?', a: 'House hacking means buying a 2-4 unit property, living in one unit, and renting the others. You qualify for residential mortgage rates and potentially eliminate your housing cost while building equity.' },
    ],
  },

  {
    slug: 'eviction-process-by-state',
    title: 'The Eviction Process by State: Timelines, Requirements, and Common Mistakes',
    excerpt: 'Eviction is a court process in every state. Here are the steps, timelines, and the procedural errors that get landlord cases dismissed.',
    category: 'legal',
    categoryLabel: 'State Laws',
    pill: 'Legal Guide',
    tags: ['eviction', 'unlawful detainer', 'pay or quit', 'eviction timeline'],
    publishedAt: '2026-03-05',
    readTime: '12 min',
    author: 'IL Editorial',
    body: `<h2>The Universal Truth About Evictions</h2>
<p>Regardless of your state, city, or the nature of the tenant's violation, eviction follows the same fundamental principle: it is a legal process and you cannot take matters into your own hands. Changing the locks, removing the tenant's belongings, shutting off utilities, or physically removing a tenant without a court order constitutes illegal eviction — also called self-help eviction — in every U.S. jurisdiction. The penalties for illegal eviction can include actual damages, statutory damages up to 3x monthly rent, attorney fees, and in some states, criminal charges. Understanding and following the legal process is not optional.</p>

<h2>Step 1: The Written Notice</h2>
<p>Every eviction begins with a written notice to the tenant. The type of notice depends on the reason for eviction. Pay or Quit notices give tenants a fixed period to pay overdue rent or vacate — typically 3 days in California, Florida, and Texas; 5 days in Illinois; 14 days in New York. Cure or Quit notices address lease violations other than non-payment — the tenant must fix the violation or vacate within the notice period. Unconditional Quit notices, permitted in fewer states and circumstances, require the tenant to vacate without an opportunity to cure — generally reserved for serious or repeated violations. No-fault termination notices are required when ending a tenancy without cause in states that allow it — typically 30 or 60 days depending on tenancy length.</p>
<p>Notice must be delivered properly. Most states allow personal delivery, posting on the door with mailing, or certified mail. Improper service is the most common reason eviction cases are dismissed at the courthouse. Know your state's exact requirements.</p>

<h2>Step 2: Filing the Court Action</h2>
<p>If the tenant does not comply with the notice, you file an unlawful detainer (in most states) or summary possession action in the appropriate court — typically a local justice court, general sessions court, or housing court. Filing fees range from $30 to $250 depending on state and court. You will need to provide a copy of the lease, evidence of the violation, and proof that the notice was properly served. The court issues a summons, and a hearing is scheduled — anywhere from 5 days to 6 weeks out depending on court backlog and state law.</p>

<h2>Eviction Timelines by State</h2>
<table>
<thead><tr><th>State</th><th>Notice Period</th><th>Court Filing to Hearing</th><th>After Judgment</th><th>Total Typical Timeline</th></tr></thead>
<tbody>
<tr><td>Texas</td><td>3 days</td><td>7-10 days</td><td>5 days to writ</td><td>3-5 weeks</td></tr>
<tr><td>Florida</td><td>3 days</td><td>5-20 days</td><td>24 hrs after writ</td><td>2-4 weeks</td></tr>
<tr><td>Georgia</td><td>7 days</td><td>7-14 days</td><td>7 days</td><td>3-5 weeks</td></tr>
<tr><td>Illinois</td><td>5 days</td><td>3-4 weeks</td><td>7-14 days</td><td>6-8 weeks</td></tr>
<tr><td>California</td><td>3 days</td><td>20-45 days</td><td>5 days to writ</td><td>2-5 months</td></tr>
<tr><td>New York</td><td>14 days</td><td>30-60 days</td><td>Varies by county</td><td>3-8+ months</td></tr>
<tr><td>New Jersey</td><td>30 days</td><td>30-60 days</td><td>3 days</td><td>3-6 months</td></tr>
</tbody>
</table>

<h2>After the Hearing: Writ of Possession and Lockout</h2>
<p>If you win at the hearing, the court issues a judgment and, after any appeal period expires, a writ of possession authorizing the sheriff or marshal to remove the tenant. Do not attempt to remove the tenant yourself even after obtaining a judgment — wait for law enforcement to execute the writ. The tenant typically has a brief window after the writ issues (24 hours to 5 days depending on state) to vacate voluntarily before the scheduled lockout. Bring the writ to the scheduled lockout, have a locksmith ready, and document the unit's condition with photos immediately after the tenant vacates.`,
    faqs: [
      { q: 'Can I change the locks if a tenant stops paying rent?', a: 'No. Self-help eviction is illegal in every U.S. state. You must go through the court process regardless of how clear-cut the non-payment is.' },
      { q: 'What happens if the tenant does not show up to the eviction hearing?', a: 'The court will typically enter a default judgment in your favor. You can then proceed to obtain a writ of possession.' },
    ],
  },

  {
    slug: 'security-deposit-laws-by-state',
    title: 'Security Deposit Laws by State: Limits, Deadlines, and Penalties',
    excerpt: 'Security deposit disputes dominate small claims courts. The rules on limits, return deadlines, and penalties vary dramatically by state -- and missing them is expensive.',
    category: 'legal',
    categoryLabel: 'State Laws',
    pill: 'State Law Guide',
    tags: ['security deposit', 'deposit limits', 'deposit return', 'state law'],
    publishedAt: '2026-02-28',
    readTime: '10 min',
    author: 'IL Editorial',
    body: `<h2>Why Security Deposit Law Creates More Litigation Than Any Other Landlord-Tenant Issue</h2>
<p>Security deposit disputes dominate small claims court dockets nationwide. The disputes are almost entirely preventable with proper process — yet thousands of landlords lose cases every year not because the tenant caused no damage, but because the landlord failed to follow procedural requirements. Return the deposit three days late in New York and you forfeit your right to any deductions. Fail to provide an itemized statement in California and you owe double the deposit. The law does not care that the tenant burned a hole in the carpet. Process matters as much as merit.</p>

<h2>State-by-State Deposit Limits and Return Deadlines</h2>
<table>
<thead><tr><th>State</th><th>Max Deposit</th><th>Return Deadline</th><th>Itemization Required</th><th>Penalty for Violation</th></tr></thead>
<tbody>
<tr><td>California</td><td>2 months rent</td><td>21 days</td><td>Yes, with receipts</td><td>2x deposit + actual damages</td></tr>
<tr><td>New York</td><td>1 month rent</td><td>14 days</td><td>Yes</td><td>2x deposit</td></tr>
<tr><td>Texas</td><td>No limit</td><td>30 days</td><td>Yes</td><td>3x deposit + $100 + fees</td></tr>
<tr><td>Florida</td><td>No limit</td><td>15 days (no claim) / 30 days (with claim)</td><td>Yes, with notice</td><td>Forfeiture of deposit</td></tr>
<tr><td>Illinois</td><td>No limit</td><td>30 days</td><td>Yes, with receipts</td><td>2x deposit + attorney fees</td></tr>
<tr><td>Pennsylvania</td><td>2 months yr1, 1 month yr2+</td><td>30 days</td><td>Yes</td><td>2x deposit</td></tr>
<tr><td>Ohio</td><td>No limit</td><td>30 days</td><td>Yes</td><td>2x amount wrongfully withheld</td></tr>
<tr><td>Georgia</td><td>No limit</td><td>30 days</td><td>Yes</td><td>3x deposit + attorney fees</td></tr>
<tr><td>Colorado</td><td>No limit</td><td>30 days (60 if lease allows)</td><td>Yes</td><td>3x amount wrongfully withheld</td></tr>
<tr><td>Washington</td><td>No limit</td><td>30 days</td><td>Yes</td><td>2x deposit</td></tr>
</tbody>
</table>

<h2>Interest Requirements: Often Overlooked</h2>
<p>Several states require landlords to hold security deposits in interest-bearing accounts and pay the accrued interest to tenants. Illinois requires interest on deposits in buildings with 25 or more units. New Jersey requires interest on all deposits. Connecticut, Iowa, Maryland, Massachusetts, New Mexico, North Dakota, and Virginia also have interest requirements. Failure to pay required interest can result in the same penalties as failure to return the deposit — in some states, forfeiting your right to deductions entirely.</p>

<h2>The Move-In Inspection Requirement</h2>
<p>Several states require landlords to conduct a written move-in inspection and provide the tenant a copy documenting existing conditions. Massachusetts, Michigan, and Virginia have explicit move-in inspection requirements. Even where not legally required, conducting and documenting a move-in inspection is best practice because it establishes the baseline condition against which you will measure damages at move-out. A move-in inspection that both parties sign is your single most valuable evidence in a deposit dispute.</p>

<h2>Pet Deposits: Special Rules</h2>
<p>Many landlords collect separate pet deposits in addition to security deposits. In some states, pet deposits count toward the overall deposit limit. California is explicit: the total of all deposits — security, pet, key, and any other — cannot exceed two months rent for unfurnished units. Other states treat pet deposits separately. Emotional support animals and service animals present a particular complication: under the Fair Housing Act, landlords generally cannot require a pet deposit for a verified service or emotional support animal, even if they allow pets with a deposit for other tenants.`,
    faqs: [
      { q: 'Can I charge a non-refundable security deposit?', a: 'In most states, security deposits must be refundable minus legitimate deductions. Labeling a deposit non-refundable does not make it so under state law in most jurisdictions.' },
      { q: 'Do I have to pay interest on a security deposit?', a: 'It depends on your state. Illinois, New Jersey, Connecticut, and several others require interest on deposits. Check your state\'s specific requirements.' },
    ],
  },

  {
    slug: 'rent-control-laws-by-state',
    title: 'Rent Control Laws by State: Where It Exists and What It Means for Landlords',
    excerpt: 'Rent control covers a spectrum of regulations from hard caps to stabilization to just cause eviction. Here is what applies where, and the 30+ states that have banned it entirely.',
    category: 'legal',
    categoryLabel: 'State Laws',
    pill: 'State Law Guide',
    tags: ['rent control', 'rent stabilization', 'just cause eviction', 'state law'],
    publishedAt: '2026-02-21',
    readTime: '11 min',
    author: 'IL Editorial',
    body: `<h2>What Rent Control Actually Is — and Is Not</h2>
<p>Rent control is one of the most politically charged and legally complex areas of landlord-tenant law. The term is widely used but covers a spectrum of very different regulations. Hard rent control strictly limits rent increases regardless of circumstances. Rent stabilization allows increases tied to an index (CPI, fuel costs, operating expenses) but caps them below market rates. Just cause eviction requirements — sometimes called eviction control — do not limit rent increases but prevent landlords from evicting tenants without legally specified reasons. Understanding which type of regulation applies to your property, and exactly how it operates, is essential. The penalties for violating rent control regulations are severe in jurisdictions that have them.</p>

<h2>States with Statewide Rent Control Laws</h2>
<p><strong>California (AB 1482):</strong> Applies to most multifamily buildings built before 2005. Annual rent increases capped at 5% plus local CPI, not to exceed 10% total. Does not apply to single-family homes (with some exceptions), condos, buildings built after 2005, or buildings where the owner lives in one of fewer than 3 units. Additionally, over 30 California cities have their own stronger local ordinances — Los Angeles, San Francisco, Oakland, Santa Monica, and Berkeley among them.</p>
<p><strong>Oregon:</strong> First state to enact statewide rent control (2019). Limits annual increases to 7% plus CPI (currently capped at 10%). Exempts buildings less than 15 years old. Requires just cause for eviction after the first year of tenancy.</p>
<p><strong>New Jersey:</strong> No statewide cap, but virtually every municipality has enacted local rent control ordinances. Coverage and limits vary widely — some cap increases at 2-3%, others allow 4-6%. Landlords must know the rules for each municipality where they own property.</p>
<p><strong>New York:</strong> Rent stabilization applies to apartments in buildings of 6 or more units built before 1974 in New York City and some surrounding counties. The Rent Guidelines Board sets annual allowable increases — typically 2-4% in recent years. Rent stabilized apartments carry significant tenant protections including succession rights and lease renewal guarantees.</p>

<h2>States That Preempt Local Rent Control</h2>
<p>Over 30 states have enacted laws preempting cities and counties from enacting rent control ordinances. These states include Texas, Florida, Arizona, Tennessee, Georgia, North Carolina, South Carolina, Virginia (with limited exceptions), Missouri, Colorado (recently repealed preemption for some municipalities), Indiana, and most Midwestern states. Landlords in preemption states have certainty that rent control will not appear at the local level, which is a meaningful factor in investment underwriting.</p>

<h2>Just Cause Eviction: The Companion to Rent Control</h2>
<p>Many jurisdictions pair rent control with just cause eviction requirements — if landlords could evict without cause, they could effectively circumvent rent control by removing controlled tenants and re-renting at market rates. Just cause requirements specify the legally acceptable reasons for eviction: non-payment of rent, material lease violations, nuisance, illegal activity, owner move-in, substantial renovation, and demolition are the most common. Owner move-in evictions often require relocation assistance payments of 1-3 months rent. Failing to properly document and execute an owner move-in can result in the tenant being able to return to the unit and significant financial penalties.`,
    faqs: [
      { q: 'Does rent control apply to new construction?', a: 'Most rent control laws exempt newer buildings. California AB 1482 exempts buildings built in the last 15 years. Oregon exempts buildings less than 15 years old.' },
      { q: 'What is just cause eviction?', a: 'Just cause eviction laws require landlords to have a legally specified reason -- non-payment, lease violation, owner move-in -- to evict a tenant. They often accompany rent control to prevent landlords from evicting tenants to re-rent at market rates.' },
    ],
  },

  {
    slug: 'weekly-landlord-intel-march-10-2026',
    title: 'Weekly Landlord Intel: March 10, 2026',
    excerpt: 'Mortgage rates back to 6.11%, apartment absorption data from major markets, and what the Fed is signaling for the second half of 2026.',
    category: 'news',
    categoryLabel: 'Weekly Intel',
    pill: 'Weekly Brief',
    tags: ['mortgage rates', 'rental market', 'fed policy', 'weekly intel'],
    publishedAt: '2026-03-10',
    readTime: '5 min',
    author: 'IL Editorial',
    body: `<h2>This Week in Rental Real Estate: March 10, 2026</h2>
<p>Mortgage rates climbed back to 6.11% this week per Freddie Mac's Primary Mortgage Market Survey, reversing last week's dip to 6.00% as oil price uncertainty driven by geopolitical tensions kept bond yields elevated. The week's data releases painted a mixed picture: stronger-than-expected employment numbers but continued softness in apartment absorption in Sun Belt metros.</p>

<h2>Rate Watch: 6.11% and What It Means for Your Tenants</h2>
<p>The 30-year fixed at 6.11% continues to keep a significant portion of the renter population in the rental pool. At today's median home price of approximately $412,000, a buyer putting 20% down faces a monthly principal and interest payment of roughly $1,980 — before property taxes, insurance, and maintenance. The typical monthly rent on an equivalent unit in most markets runs $1,600-$1,900. This affordability gap, while narrower than the 2023-2024 peak, continues to suppress the first-time homebuyer market and sustain rental demand. Watch for rate movement over the next 60 days: markets are pricing in one potential Fed funds rate cut in the second half of 2026, which could push the 30-year to the high 5% range and modestly improve homebuying affordability.</p>

<h2>Market Data This Week</h2>
<p>The Census Bureau's monthly Housing Vacancies and Homeownership Survey showed the national rental vacancy rate holding at 7.2% in Q4 2025 — above the historical equilibrium of 5-6% but down from the 8.1% peak in mid-2025 as the peak of the new supply wave is absorbed. BLS reported CPI at 2.4% year-over-year in February, with shelter costs (which include rent measurements) still running at 3.8% YoY — above overall CPI as the BLS rental measurement lags actual market conditions by 12-18 months.</p>

<h2>Policy Updates: What Landlords Need to Know</h2>
<p>Several states have active legislative sessions with bills affecting rental housing. Minnesota is considering expanding just cause eviction requirements to properties with 4 or more units. Georgia's legislature is reviewing a bill that would preempt local rent control measures more explicitly. At the federal level, the FHFA announced updated underwriting guidelines for 5-49 unit multifamily loans through Fannie and Freddie, which should modestly improve financing availability for small multifamily investors in the second half of 2026. Local landlords should monitor their state legislature's activity — rental housing legislation is moving faster than in prior years in several states.</p>`,
  },

  {
    slug: 'weekly-landlord-intel-march-3-2026',
    title: 'Weekly Landlord Intel: March 3, 2026',
    excerpt: 'The 30-year hits 6.00% -- what it means for the rent vs buy decision, strongest and weakest apartment markets, and lease renewal strategies for spring.',
    category: 'news',
    categoryLabel: 'Weekly Intel',
    pill: 'Weekly Brief',
    tags: ['mortgage rates', 'rental market', 'lease renewal', 'weekly intel'],
    publishedAt: '2026-03-03',
    readTime: '5 min',
    author: 'IL Editorial',
    body: `<h2>This Week in Rental Real Estate: March 3, 2026</h2>
<p>The 30-year fixed mortgage rate averaged 6.00% for the week ending March 5 — the lowest reading since early January and the first time the benchmark rate has touched the 6% threshold in several months. The move was driven by flight-to-safety bond buying following escalating geopolitical uncertainty, temporarily pushing Treasury yields lower. Markets are watching closely whether this represents the beginning of a sustained rate decline or a temporary dip.</p>

<h2>What 6.00% Means for the Rental-to-Buy Decision</h2>
<p>Even at 6.00%, the math still heavily favors renting in most major metros. The rent-versus-buy analysis for a median-priced U.S. home shows a buyer paying $1,940 per month in principal and interest (20% down, $412,000 purchase price) versus renting an equivalent unit for approximately $1,700-$1,850 in most markets. Add property taxes averaging $4,500-$6,000 per year and insurance at $1,800-$2,400, and the total homeownership cost runs $2,300-$2,600 per month before maintenance. For renters in high-cost metros, the premium of ownership is even more pronounced. The 5.50% threshold is the rate most housing economists cite as the inflection point where the buy-versus-rent calculus begins to shift meaningfully toward buying.</p>

<h2>Rental Market Snapshot: Strongest and Weakest Performers</h2>
<p>CoStar's February data highlighted the continuing divergence between coastal and Sun Belt apartment markets. New York City multifamily vacancy held at 2.8%, with effective rents up 3.2% year-over-year as post-pandemic recovery continues and new supply remains minimal. Boston similarly tight at 3.1% vacancy. On the other end: Austin's rental vacancy hit 11.4% in February as over 5,000 new units delivered in Q4 2025 alone, pushing effective rents down nearly 7% from their 2022 peak. Phoenix showed modest improvement, with vacancy declining from 9.8% to 9.1% as absorption outpaced completions for the first time in six quarters.</p>

<h2>Lease Renewal Season: Strategies for Keeping Good Tenants</h2>
<p>March through May is the peak lease renewal window for leases that began in spring 2025. In soft markets, the calculus strongly favors retention over replacement. The all-in cost of turnover — vacancy (average 3-6 weeks), cleaning ($300-$800), paint and repairs ($500-$2,000), listing and showing time, and leasing concessions in competitive markets — typically totals 1.5-2.5 months of rent. In a market where new leases are being signed with one month free, keeping an existing tenant at flat rent or a 2-3% increase is almost always the better financial decision. Lead with appreciation, offer a small improvement (new appliance, fresh paint in one room), and make the renewal easy.`,
  },

  {
    slug: 'weekly-landlord-intel-feb-24-2026',
    title: 'Weekly Landlord Intel: February 24, 2026',
    excerpt: 'New eviction filing data, insurance premiums rising sharply in Florida and California, and IRS Section 199A guidance for rental property owners.',
    category: 'news',
    categoryLabel: 'Weekly Intel',
    pill: 'Weekly Brief',
    tags: ['evictions', 'landlord insurance', 'tax deductions', 'weekly intel'],
    publishedAt: '2026-02-24',
    readTime: '5 min',
    author: 'IL Editorial',
    body: `<h2>This Week in Rental Real Estate: February 24, 2026</h2>
<p>Mortgage rates ended the week at 6.08%, approximately flat from the prior week as markets awaited the Fed's preferred inflation measure, the PCE deflator, due Friday. Fed Chair Powell's congressional testimony this week struck a cautious tone — signaling no rate cuts are imminent despite improving inflation data. The Fed funds rate remains at 3.50-3.75%, and futures markets are pricing in fewer cuts in 2026 than were anticipated at the start of the year.</p>

<h2>New Eviction Data: What the Numbers Show</h2>
<p>Princeton University's Eviction Lab released its annual data for 2025, showing eviction filings at approximately 84% of pre-pandemic levels nationally — still below 2019 baseline but trending upward for the second consecutive year as emergency rental assistance programs have fully expired. States with the highest eviction rates: South Carolina, Delaware, North Carolina, Virginia, and Nevada, where filings exceeded pre-pandemic averages. States with notably low rates relative to historical norms: New York, New Jersey, Massachusetts, and California, where robust tenant protections and slower court processing continue to suppress filing rates. The data underscores significant geographic variation — landlords in high-eviction states should maintain rigorous screening and maintain healthy reserves; landlords in slow-eviction states should ensure they understand their local process and do not allow delinquencies to compound over months.</p>

<h2>Insurance Market Update: Rising Premiums Hit Landlords</h2>
<p>Landlord insurance premiums have risen an average of 18% over the past two years, with catastrophic increases in Florida (35-50% in some counties), Louisiana (25-40%), and California wildfire-adjacent areas (20-60%). Several major carriers have exited the Florida and California markets entirely, leaving landlords to rely on state-backed last-resort insurers at significantly higher premiums. Landlords in high-risk states should review their coverage annually, shop multiple carriers, and factor rising insurance costs into rent pricing and acquisition underwriting. A property that cash-flowed well with $2,400 annual insurance may be marginally negative at $4,000. This is not a minor line item adjustment — it is reshaping the economics of rental ownership in several major states.</p>

<h2>Quick Hits</h2>
<p>The Department of Housing and Urban Development released updated fair market rents for 2026, with increases averaging 4.2% nationally and significantly higher in Florida, Texas, and coastal markets. Section 8 landlords should review their rents against the new FMRs and submit increase requests if applicable. The IRS released final regulations on the Section 199A qualified business income deduction for rental activities, clarifying that a rental activity qualifies for the 20% deduction if the taxpayer maintains contemporaneous time logs showing at least 250 hours of rental services annually. Landlords who have not been tracking their time should start immediately to preserve this deduction for the 2026 tax year.`,
  },

]

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
