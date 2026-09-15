import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from "react";
import {
  Home, BookOpen, Search, Bookmark, User, Award, CheckCircle2, Circle,
  Lock, ChevronRight, ChevronLeft, ChevronDown, Star, Flame, Settings,
  X, Plus, Trash2, ArrowLeft, ArrowRight, Sparkles, GraduationCap, TrendingUp,
  Clock, RotateCcw, Printer, Info, AlertCircle, PlayCircle, Menu,
  ShieldCheck, StickyNote, Trophy, PenLine, LogOut, Library, Globe, Languages,
  ShoppingBag, Store, Heart, MessageCircle, UserPlus, Coins, Upload, CreditCard, Smartphone, Image as ImageIcon
} from "lucide-react";
/* =========================================================================
   ISLAMIC FINANCE ACADEMY — data layer
   In production this content lives in a database (see COURSES/MODULES/
   LESSONS shape below mirrored 1:1 in the technical blueprint's schema).
   Here it is seeded in-file so the demo is fully self-contained.
   ========================================================================= */

const COURSES = [
  {
    id: "beginner",
    level: "Beginner",
    title: "Foundations of Islamic Finance",
    tagline: "Start here: the core ideas that make Islamic finance different.",
    moduleIds: ["m1", "m2", "m3", "m4", "m5", "m6"],
  },
  {
    id: "intermediate",
    level: "Intermediate",
    title: "Contracts, Banking & Investment",
    tagline: "How Shariah-compliant contracts actually structure money.",
    moduleIds: ["m7", "m8", "m9"],
  },
  {
    id: "advanced",
    level: "Advanced",
    title: "Institutions & Contemporary Practice",
    tagline: "Sukuk, Takaful, markets, and where scholars still debate.",
    moduleIds: ["m10", "m11", "m12", "m13", "m14", "m15", "m16"],
  },
];

const MODULES = [
  { id: "m1", courseId: "beginner", number: 1, title: "Introduction to Islamic Finance", lessonIds: ["l1"] },
  { id: "m2", courseId: "beginner", number: 2, title: "Islamic Economic Principles", lessonIds: ["l2"] },
  { id: "m3", courseId: "beginner", number: 3, title: "Riba", lessonIds: ["l3"] },
  { id: "m4", courseId: "beginner", number: 4, title: "Gharar", lessonIds: ["l4"] },
  { id: "m5", courseId: "beginner", number: 5, title: "Maysir", lessonIds: ["l5"] },
  { id: "m6", courseId: "beginner", number: 6, title: "Halal and Haram in Business", lessonIds: ["l6"] },
  { id: "m7", courseId: "intermediate", number: 7, title: "Islamic Contracts", lessonIds: ["l7", "l8", "l9", "l10", "l11"], hasModuleAssessment: true },
  { id: "m8", courseId: "intermediate", number: 8, title: "Islamic Banking", lessonIds: ["l12"] },
  { id: "m9", courseId: "intermediate", number: 9, title: "Islamic Investment", lessonIds: ["l13"] },
  { id: "m10", courseId: "advanced", number: 10, title: "Sukuk", lessonIds: ["l14"] },
  { id: "m11", courseId: "advanced", number: 11, title: "Takaful", lessonIds: ["l15"] },
  { id: "m12", courseId: "advanced", number: 12, title: "Islamic Stock Market Investing", lessonIds: ["l16"] },
  { id: "m13", courseId: "advanced", number: 13, title: "Halal Business Models", lessonIds: [], comingSoon: true },
  { id: "m14", courseId: "advanced", number: 14, title: "Islamic Personal Finance", lessonIds: [], comingSoon: true },
  { id: "m15", courseId: "advanced", number: 15, title: "Contemporary Islamic Finance Issues", lessonIds: [], comingSoon: true },
  { id: "m16", courseId: "advanced", number: 16, title: "Practical Islamic Finance", lessonIds: [], comingSoon: true },
];

const LESSONS = [
  {
    id: "l1", moduleId: "m1", title: "What Is Islamic Finance?", minutes: 6,
    objectives: [
      "Define Islamic finance and what makes it distinct from conventional finance",
      "Identify the handful of prohibitions that shape every Islamic contract",
      "See a real-world example of an Islamic alternative to an interest-based loan",
    ],
    intro: "Islamic finance is the practice of conducting money, trade, and investment in ways consistent with Shariah (Islamic law). It is not a separate currency or a separate stock market — it is a different set of rules for how deals may be structured.",
    explanation: [
      "At its core, Islamic finance treats money as a medium of exchange, not a commodity that can be rented out for a fee. Wealth is meant to be earned through real trade, real assets, and real risk — not through a guaranteed return on lending alone.",
      "Almost every rule in Islamic finance traces back to a small set of prohibitions: riba (interest/usury), gharar (excessive uncertainty), maysir (gambling), and investment in haram (impermissible) industries such as alcohol, pork, or conventional interest-based lending itself.",
      "Because interest is off the table, Islamic financial institutions instead use contracts built on trade, leasing, and partnership — where the bank earns a profit margin or rental income, or shares in the actual risk of a venture, rather than charging a fee purely for the use of money over time.",
    ],
    examples: [
      "Conventional mortgage: a bank lends $100,000 and charges interest until it is repaid — the bank's return does not depend on the house at all.",
      "Islamic alternative (Murabahah): the bank buys the house and resells it to the customer at cost plus an agreed profit margin, paid in instalments. The price is fixed at signing — it is a sale, not a loan with a fee attached.",
    ],
    scenario: "A small trader in Mwanza needs capital to restock her shop. A conventional lender offers a loan at interest. An Islamic finance provider instead proposes a Murabahah purchase of the stock, or a Mudarabah partnership where profits (and losses) are shared. Later lessons unpack exactly how each of these works.",
    principles: [
      { type: "quran", ref: "Qur'an 2:275 (meaning conveyed)", text: "Allah has permitted trade and forbidden riba." },
      { type: "hadith", ref: "Jami' al-Tirmidhi (commonly cited, graded hasan)", text: "The truthful, trustworthy merchant is described as being in noble company on the Day of Judgment — a reminder that honest trade is not just permitted, it is encouraged." },
      { type: "scholarly", ref: "Industry history", text: "Modern Islamic banking formalised in the 1970s, with Dubai Islamic Bank and the Islamic Development Bank both founded in 1975." },
    ],
    summary: "Islamic finance is conventional economic activity reshaped around a short list of prohibitions — chiefly riba, gharar, and maysir — replacing interest-based lending with trade, leasing, and partnership structures.",
    takeaways: [
      "Money is a medium of exchange, not a rentable commodity",
      "Riba, gharar, and maysir are the three prohibitions to know first",
      "Islamic contracts replace 'interest' with profit margins, rent, or shared risk",
    ],
    quizId: "l1",
  },
  {
    id: "l2", moduleId: "m2", title: "Core Islamic Economic Principles", minutes: 7,
    objectives: [
      "List the principles that underpin every Islamic finance product",
      "Explain why risk-sharing matters as much as the riba prohibition",
      "Compare a conventional bond with a Sukuk at a principled level",
    ],
    intro: "Beyond 'no interest', Islamic economics rests on a handful of positive principles — not just prohibitions — that shape how contracts are built.",
    explanation: [
      "Key principles include: transactions should be backed by real assets or services (not pure paper claims); profit and loss should generally be shared, not guaranteed to one side; wealth should circulate rather than concentrate; and contracts must be honoured once agreed.",
      "Asset-backing is why a Sukuk (see Module 10) represents ownership in a real asset or venture, while a conventional bond is simply a debt obligation to repay a fixed sum with interest, regardless of how the underlying business performs.",
      "Fulfilling agreements is treated as a moral and legal obligation, not a formality — which is part of why gharar (ambiguity about what exactly was agreed) is taken so seriously later in this course.",
    ],
    examples: [
      "A conventional bond investor is owed a fixed coupon no matter what the issuer does with the money.",
      "A Sukuk-al-Ijarah investor's return is rent generated by a real leased asset — if the asset generates no income, the return is affected too.",
    ],
    scenario: "Two funds are pitched to a Tanzanian investor: one holds conventional government bonds; one holds Sukuk backed by leased telecom infrastructure. Both promise similar yields — but the underlying claim each investor actually owns is fundamentally different.",
    principles: [
      { type: "quran", ref: "Qur'an 5:1 (meaning conveyed)", text: "O you who believe, fulfil your contracts." },
      { type: "maxim", ref: "Fiqh maxim", text: "La darar wa la dirar — there should be neither harm nor reciprocating harm — a principle used across Islamic commercial law to judge whether a contract is fair to both sides." },
    ],
    summary: "Islamic economics is built on asset-backing, shared risk, and binding agreements — principles that explain the industry's specific contract structures, not just its list of prohibitions.",
    takeaways: [
      "Transactions should be tied to real assets or genuine economic activity",
      "Profit and loss sharing is a design goal, not just a side effect",
      "Contracts are treated as firm moral obligations once agreed",
    ],
    quizId: "l2",
  },
  {
    id: "l3", moduleId: "m3", title: "Understanding Riba", minutes: 8,
    objectives: [
      "Define riba and distinguish its two classical forms",
      "Explain the reasoning scholars give for prohibiting it",
      "Identify riba in a everyday lending scenario",
    ],
    intro: "Riba literally means 'increase' or 'excess'. It is the single most foundational prohibition in Islamic finance — almost every product in this course exists as a way of financing real needs without it.",
    explanation: [
      "Classical fiqh identifies two forms: riba al-nasi'ah, an increase charged purely for delaying repayment (this covers conventional interest on loans), and riba al-fadl, an unequal or non-immediate exchange of the same category of commodity — such as gold for gold of different weights.",
      "The commonly cited reasoning is that money lent at a guaranteed return, with no share in the borrower's actual risk, allows wealth to grow without any corresponding productive effort, and can trap borrowers in escalating debt regardless of their circumstances.",
      "Islamic alternatives don't avoid the word 'profit' — they avoid a fee charged purely for the passage of time on a loan. A Murabahah mark-up is a sale price agreed up front; interest is a charge that can compound the longer a debt exists.",
    ],
    examples: [
      "Riba al-nasi'ah: 'Borrow $1,000, repay $1,100 in six months, or more the longer it takes.'",
      "Riba al-fadl: exchanging 10g of gold jewellery for 12g of gold coins, hand to hand, treating it as a simple trade rather than a same-category exchange requiring equal weights.",
    ],
    scenario: "A shopkeeper is offered a $2,000 loan at 15% interest for six months, or a Murabahah arrangement where a financier buys $2,000 of stock and resells it to her for $2,230, payable over six months. The second number looks similar — but its structure, and what happens if she pays late, differ in ways later lessons explore.",
    principles: [
      { type: "quran", ref: "Qur'an 2:275 (meaning conveyed)", text: "Allah has permitted trade and forbidden riba." },
      { type: "quran", ref: "Qur'an 2:278–279 (meaning conveyed)", text: "Believers are told to give up whatever remains of riba, with a strong warning for those who persist, while affirming they may still recover their original capital without wronging or being wronged." },
      { type: "hadith", ref: "Sahih Muslim (Kitab al-Musaqah)", text: "The Prophet ﷺ specified that gold, silver, wheat, barley, dates, and salt may only be exchanged for the same commodity in equal amounts, hand to hand; if the commodities differ, the rate is negotiable but the exchange must still be immediate." },
    ],
    summary: "Riba covers both interest on loans (riba al-nasi'ah) and unequal or deferred exchange of like commodities (riba al-fadl). Its prohibition is the reason Islamic finance relies on trade, leasing, and partnership structures instead of interest-bearing debt.",
    takeaways: [
      "Riba al-nasi'ah = interest for delay; riba al-fadl = unequal exchange of like goods",
      "A fixed, guaranteed return on a loan — regardless of outcome — is the pattern to watch for",
      "Islamic alternatives replace the fee-for-time with a fixed sale price or a shared-risk partnership",
    ],
    quizId: "l3",
  },
  {
    id: "l4", moduleId: "m4", title: "Understanding Gharar", minutes: 7,
    objectives: [
      "Define gharar and distinguish tolerated from excessive uncertainty",
      "Recognise gharar-type ambiguity in modern financial products",
      "Explain how Salam and Istisna' are permitted despite some uncertainty",
    ],
    intro: "Gharar refers to excessive ambiguity or uncertainty about the subject, price, or delivery of a contract — the kind of uncertainty that tends to produce disputes or let one side exploit the other.",
    explanation: [
      "Classical examples scholars cite include selling fish still in the water, a bird still in the sky, or unripe fruit before it is clear it will ripen — cases where nobody can be sure the thing being sold actually exists or will be deliverable.",
      "Scholars distinguish gharar fahish (excessive, prohibited) from gharar yasir (minor, tolerated) — a small, unavoidable degree of uncertainty exists in almost any transaction, and is not automatically fatal to a contract.",
      "In modern finance, this principle is often applied to complex derivatives and purely speculative contracts where what is actually being bought or sold is unclear, and to conventional insurance, where many scholars view the uncertain, contingent payout as a form of gharar — addressed instead by Takaful's cooperative structure (Module 11).",
    ],
    examples: [
      "Selling 'the next catch' of a fishing boat, sight unseen, for a fixed price — the quantity and quality are unknown.",
      "Salam and Istisna' are notable exceptions: they involve future delivery, but strict conditions (exact specification, agreed price, defined date) keep the uncertainty within a tolerated range.",
    ],
    scenario: "A trader agrees to sell 'a truckload of maize, whatever it weighs' for a flat price before the truck is loaded. Because the quantity is unknown to both sides at the time of the deal, this resembles the kind of ambiguity gharar rules are designed to prevent.",
    principles: [
      { type: "hadith", ref: "Sahih Muslim (narrated by Abu Hurairah)", text: "The Prophet ﷺ forbade bay' al-gharar — the sale involving excessive uncertainty." },
      { type: "scholarly", ref: "Classical fiqh distinction", text: "Gharar fahish (excessive) invalidates a contract; gharar yasir (minor/unavoidable) is generally tolerated — which is why exceptions like Salam and Istisna' exist under specific conditions." },
    ],
    summary: "Gharar is about ambiguity that could lead to dispute or exploitation — not risk itself. Contracts must specify what is being sold, at what price, and when it will be delivered, clearly enough to avoid genuine uncertainty.",
    takeaways: [
      "Gharar = excessive uncertainty about subject, price, or delivery",
      "Minor, unavoidable uncertainty (gharar yasir) is tolerated; excessive uncertainty is not",
      "Salam and Istisna' are permitted exceptions precisely because strict conditions control the uncertainty",
    ],
    quizId: "l4",
  },
  {
    id: "l5", moduleId: "m5", title: "Understanding Maysir", minutes: 6,
    objectives: [
      "Define maysir and distinguish it from legitimate commercial risk",
      "Explain why some derivatives are criticised as resembling maysir",
    ],
    intro: "Maysir means gambling — a zero-sum wager where one party gains purely at another's expense, with no productive economic activity behind it.",
    explanation: [
      "The key distinction is between maysir and ordinary commercial risk. An investor who puts capital into a real trading venture is taking a genuine risk tied to productive activity — the outcome is unknown, but value is being created or exchanged along the way.",
      "In a game of pure chance, nothing of economic value is produced; wealth simply transfers from the loser to the winner. This is why maysir is prohibited even though both parties may enter the wager voluntarily.",
      "Some modern derivatives and highly speculative trading, disconnected from any underlying real asset or productive purpose, are criticised by scholars as resembling maysir rather than legitimate risk-taking.",
    ],
    examples: [
      "Buying a lottery ticket: a small stake, a random draw, one winner takes the pool — classic maysir.",
      "Investing capital in a trading business whose profit depends on real buying and selling: genuine commercial risk, not maysir, even though the outcome is uncertain.",
    ],
    scenario: "Two friends each put 50,000 TZS into a football score prediction pool, winner takes all. Compare this with the same two friends jointly investing 50,000 TZS each into a shared consignment of goods to resell — same amount of money at risk, very different underlying activity.",
    principles: [
      { type: "quran", ref: "Qur'an 5:90–91 (meaning conveyed)", text: "Intoxicants, gambling (maysir), idolatrous practices, and divination are described as impure and to be avoided." },
    ],
    summary: "Maysir is wealth transfer through pure chance with no productive activity behind it. Legitimate business risk — where value is genuinely created or exchanged — is a different thing, even when the outcome is equally uncertain.",
    takeaways: [
      "Maysir = zero-sum gain from chance, not productive effort",
      "The test is whether real economic activity underlies the risk",
      "Purely speculative, asset-disconnected trading draws the same criticism as maysir",
    ],
    quizId: "l5",
  },
  {
    id: "l6", moduleId: "m6", title: "Halal and Haram in Business", minutes: 6,
    objectives: [
      "State the default ruling in Islamic commercial law",
      "List clearly haram business categories and identify 'grey area' cases",
      "Describe how modern Shariah stock screens handle mixed businesses",
    ],
    intro: "A foundational rule in Islamic commercial law is that the default for any transaction is permissibility, unless a specific text or principle rules it out.",
    explanation: [
      "Clearly haram categories include alcohol, pork, conventional interest-based lending, gambling operations, and pornography. Beyond these, 'grey area' businesses exist — a supermarket chain that also stocks alcohol, or a company that holds some interest-bearing cash reserves.",
      "Modern Islamic finance handles grey areas through Shariah screening: a business-activity screen (is the core business itself permissible?) plus financial ratio screens (how much of the company's revenue or balance sheet touches impermissible activity, and is it below a tolerated threshold?). Module 13 covers this in more depth.",
      "Where a small, incidental amount of impermissible income does slip through — interest on idle cash, for instance — the common practice is 'purification': donating that proportion of income to charity rather than keeping it.",
    ],
    examples: [
      "A halal restaurant chain: clean business activity, straightforward.",
      "A telecom company that also earns a small amount of interest on its cash balances: business activity is fine, but the incidental interest income is typically purified through charitable donation.",
    ],
    scenario: "An investor is deciding between two publicly listed companies: one is a conventional bank (interest-based lending is its core business — excluded), and one is a logistics company with a small money-market deposit earning interest (core business is fine; the incidental income needs purifying).",
    principles: [
      { type: "maxim", ref: "Fiqh maxim", text: "Al-asl fi al-ashya' al-ibahah — the default ruling for things is permissibility, unless proven otherwise." },
      { type: "hadith", ref: "Sahih al-Bukhari & Sahih Muslim (narrated by al-Nu'man ibn Bashir)", text: "The halal is clear and the haram is clear, and between the two are doubtful matters that many people do not know [how to rule on]." },
    ],
    summary: "Business is presumed permissible unless it falls into a clearly prohibited category or fails a Shariah screen. Mixed-activity companies are handled through business and financial screening, with any small impermissible income purified via charity.",
    takeaways: [
      "The default in transactions is permissibility, not prohibition",
      "A handful of categories are clearly haram; most 'grey areas' are handled by screening, not blanket exclusion",
      "Purification (charitable donation of impure income) is the standard fix for minor, incidental issues",
    ],
    quizId: "l6",
  },
  {
    id: "l7", moduleId: "m7", title: "Murabahah: Cost-Plus Sale", minutes: 7,
    objectives: [
      "Explain how a Murabahah sale is structured",
      "Explain why a fixed mark-up is not the same as interest",
      "Name a live scholarly debate around a Murabahah-based structure",
    ],
    intro: "Murabahah is a cost-plus sale: the seller discloses their cost and adds an agreed profit margin, disclosed up front to the buyer. It is the most widely used Islamic financing structure for asset purchases.",
    explanation: [
      "In Islamic banking, Murabahah usually works like this: the customer identifies an asset they want (a car, equipment, stock for a shop); the bank buys it first, takes ownership, then resells it to the customer at cost plus an agreed mark-up, payable in instalments.",
      "The price is fixed at the moment the sale contract is signed. Because it is a sale price rather than a rental fee on money, it cannot increase just because the customer pays late — a separate, tightly regulated late-payment mechanism (often directed to charity, not bank income) is used instead to discourage delay.",
      "A genuinely contested area is 'commodity Murabahah' or organised tawarruq, used mainly to generate cash rather than finance a specific asset purchase. Some scholars and standard-setters, including AAOIFI, have raised concerns that certain organised forms economically resemble an interest-based loan despite the sale structure — a good example of a live disagreement rather than settled consensus.",
    ],
    examples: [
      "A bank buys a delivery van for $10,000 and sells it to a small business owner for $12,000, payable over 24 months. The $2,000 mark-up is fixed at signing, whether the full term is used or the customer pays early.",
    ],
    scenario: "Two customers sign identical Murabahah contracts for $12,000 total. One pays off the balance in 10 months instead of 24; the other pays a small amount late in month 20. Because the price was fixed at signing, the early payer owes no discount and the late payer owes no extra profit — only a possible charity-directed fee for the delay, per the bank's disclosed policy.",
    principles: [
      { type: "quran", ref: "Qur'an 2:275 (meaning conveyed)", text: "Allah has permitted trade and forbidden riba — the basis for treating a disclosed cost-plus sale as fundamentally different from an interest-bearing loan." },
      { type: "scholarly", ref: "Contemporary standards debate", text: "AAOIFI and a number of scholars have specifically scrutinised organised tawarruq / commodity Murabahah structures used purely for cash financing, arguing some versions blur the line with interest-based lending in substance." },
    ],
    summary: "Murabahah finances a purchase by having the financier buy and resell the asset at a disclosed, fixed mark-up — a sale, not a loan. Its most standard forms are widely accepted; more aggressive cash-focused variants remain genuinely debated.",
    takeaways: [
      "Murabahah = cost disclosed + agreed profit margin, fixed at signing",
      "Late payment cannot increase the price — a separate charity-directed fee may apply instead",
      "Organised tawarruq / commodity Murabahah for cash is a live area of scholarly disagreement",
    ],
    quizId: "l7",
  },
  {
    id: "l8", moduleId: "m7", title: "Mudarabah: Profit-Sharing Partnership", minutes: 7,
    objectives: [
      "Explain the roles of rab-ul-mal and mudarib in a Mudarabah contract",
      "State how profits and losses are allocated",
      "Connect Mudarabah to how Islamic bank savings accounts often work",
    ],
    intro: "Mudarabah is a profit-sharing partnership between a capital provider (rab-ul-mal) and a working partner (mudarib) who contributes skill, labour, and management — but no capital.",
    explanation: [
      "Profits are shared according to a pre-agreed ratio (for example 70/30), not a fixed amount. If the venture loses money through ordinary business risk (not negligence or misconduct), the capital provider bears the entire financial loss — the mudarib simply loses their time and effort, since they invested no money.",
      "If a loss results from the mudarib's negligence, fraud, or breach of the agreed terms, the mudarib can be held liable — the loss-bearing rule protects genuine risk-taking, not misconduct.",
      "Many Islamic bank savings and investment accounts are structured as Mudarabah: depositors act as rab-ul-mal, the bank acts as mudarib investing the pooled funds, and returns paid to depositors are a share of actual profit rather than a guaranteed interest rate.",
    ],
    examples: [
      "An investor gives $5,000 to a trader to run a produce-trading venture for a season, on a 70/30 profit split in the investor's favour. If the venture nets $1,000 profit, the investor receives $700 and the trader $300.",
    ],
    scenario: "The same venture instead loses $500 due to a genuine market downturn, with no fault on the trader's part. The investor absorbs the full $500 loss; the trader is not required to compensate the investor, having already lost their unpaid labour for the season.",
    principles: [
      { type: "scholarly", ref: "Classical fiqh consensus", text: "Financial loss in a Mudarabah is borne by the capital provider alone, absent negligence or misconduct by the working partner — reflecting the principle that liability should follow either capital or fault, not effort alone." },
    ],
    summary: "Mudarabah splits a venture into 'money' and 'work': the capital side takes the financial risk, the labour side risks their unpaid effort, and profit (not a fixed return) is shared by an agreed ratio.",
    takeaways: [
      "Rab-ul-mal provides capital; mudarib provides labour and expertise",
      "Profits are shared by ratio; ordinary-course losses are borne by the capital provider alone",
      "Many Islamic savings/investment accounts are Mudarabah arrangements",
    ],
    quizId: "l8",
  },
  {
    id: "l9", moduleId: "m7", title: "Musharakah: Joint Venture Partnership", minutes: 7,
    objectives: [
      "Distinguish Musharakah from Mudarabah",
      "Explain how losses are allocated in Musharakah",
      "Describe how diminishing Musharakah is used for home financing",
    ],
    intro: "Musharakah is a joint venture in which two or more parties contribute capital — and often labour or management too — sharing in the business as genuine partners.",
    explanation: [
      "Unlike Mudarabah, every partner in a Musharakah can contribute capital. Profits are shared by any pre-agreed ratio, but losses must be shared strictly in proportion to each partner's capital contribution — a partner cannot be exposed to a larger loss than their capital share.",
      "A widely used variant, diminishing Musharakah (Musharakah Mutanaqisah), is common in Islamic home financing: the bank and customer jointly buy a property (say, 80/20). The customer pays rent for using the bank's share, plus additional payments that gradually buy out portions of the bank's ownership, until the customer owns the property outright.",
    ],
    examples: [
      "Two entrepreneurs contribute $6,000 and $4,000 (60/40 by capital) to open a shop, agreeing to split profit 50/50 in recognition of one partner also managing daily operations. If the shop instead loses money, the loss must be split 60/40 by capital, not 50/50.",
      "Diminishing Musharakah: bank and customer co-own a house 80/20. Each month the customer pays rent on the bank's 80% plus an instalment that buys, say, 1% more of the bank's share — after enough months, the customer's share reaches 100%.",
    ],
    scenario: "A young family in Dodoma wants to buy a home without an interest-bearing mortgage. A diminishing Musharakah lets the bank hold most of the ownership at first (bearing more of the ownership risk) while the family gradually buys the bank out through combined rent-and-purchase payments.",
    principles: [
      { type: "scholarly", ref: "Classical fiqh consensus", text: "In Musharakah, profit ratios may be freely agreed between partners, but loss must track capital contribution proportionally — a rule scholars treat as near-unanimous." },
    ],
    summary: "Musharakah is true joint ownership: capital (and often labour) from multiple partners, profit by agreement, loss strictly by capital share. Diminishing Musharakah adapts this into a widely used home-financing product.",
    takeaways: [
      "All partners can contribute capital in Musharakah, unlike Mudarabah",
      "Profit ratios are negotiable; loss ratios must match capital contribution",
      "Diminishing Musharakah = gradual buyout, commonly used for home financing",
    ],
    quizId: "l9",
  },
  {
    id: "l10", moduleId: "m7", title: "Ijarah: Islamic Leasing", minutes: 6,
    objectives: [
      "Explain the ownership and risk split in an Ijarah lease",
      "Distinguish Ijarah from a conventional lease-to-own arrangement",
    ],
    intro: "Ijarah is Islamic leasing: the lessor keeps ownership of the asset and pays for its major upkeep, while the lessee pays rent for the right to use it over an agreed period.",
    explanation: [
      "Because the lessor retains ownership, they also retain the risks of ownership — for example, if the asset is destroyed through no fault of the lessee, the lessor bears that loss, not the lessee.",
      "Ijarah Muntahia Bittamleek ('Ijarah ending in ownership') structures a lease so that ownership transfers to the lessee at the end of the term, via a separate gift or token sale — kept legally distinct from the lease itself so the arrangement isn't just a disguised instalment sale from day one.",
    ],
    examples: [
      "A business leases factory equipment from an Islamic bank for three years; the bank remains the owner and is responsible for major structural repairs, while the business pays monthly rent for use.",
      "At the end of an Ijarah Muntahia Bittamleek car lease, the bank gifts or sells the vehicle to the customer for a nominal amount, completing the ownership transfer.",
    ],
    scenario: "Compare a conventional finance lease, where the 'lessee' often bears ownership-like risk from day one, with an Ijarah lease, where the bank genuinely carries ownership risk throughout — a distinction Shariah boards check carefully in practice.",
    principles: [
      { type: "scholarly", ref: "Contemporary Shariah standards (e.g. AAOIFI)", text: "Ijarah standards require that ownership-related risk genuinely stays with the lessor throughout the lease term, and that any promise to transfer ownership at the end be kept as a separate contract from the lease itself." },
    ],
    summary: "Ijarah separates use from ownership: the lessee pays rent for use, the lessor keeps ownership and its risks. Lease-to-own versions exist but keep the eventual transfer as a distinct step.",
    takeaways: [
      "Ijarah = rent for use; ownership and its risks stay with the lessor",
      "Ijarah Muntahia Bittamleek adds an ownership transfer at the end, kept structurally separate",
    ],
    quizId: "l10",
  },
  {
    id: "l11", moduleId: "m7", title: "Other Key Contracts: Salam, Istisna', Wakalah, Qard & Rahn", minutes: 9,
    objectives: [
      "Define Salam, Istisna', Wakalah, Qard, and Rahn",
      "Explain why Salam requires full upfront payment while Istisna' does not",
      "Identify where each contract typically shows up in practice",
    ],
    intro: "Five more contracts round out the essential Islamic finance toolkit — each solving a different practical problem.",
    explanation: [
      "Salam is a forward sale: the buyer pays the full price today for goods precisely specified (type, quantity, quality, delivery date) to be delivered later. It is a deliberate exception to the rule against selling what you don't yet possess, because it lets farmers and small producers raise capital upfront — the strict specification requirement keeps gharar in check.",
      "Istisna' is a manufacturing or construction contract: goods are made to order, and — unlike Salam — payment can be staged or deferred rather than paid in full upfront. It suits construction projects and custom manufacturing.",
      "Wakalah is a simple agency contract: one party (the principal) appoints another (the agent) to act on their behalf, for a fee or without charge. It underpins a lot of back-office Islamic banking and Takaful operations.",
      "Qard (specifically qard hasan) is a benevolent, interest-free loan: the lender may only ever ask for the exact principal back, nothing more — it is treated as a charitable, virtuous act rather than a commercial product.",
      "Rahn is a pledge: an asset held as collateral to secure an obligation, similar in concept to a conventional pledge or lien, but governed by Islamic rules on how the collateral may (and may not) be used while held.",
    ],
    examples: [
      "Salam: a cooperative pays a maize farmer today, in full, for 10 tonnes of a specified grade to be delivered after harvest.",
      "Istisna': a developer commissions a contractor to build a warehouse to exact specifications, paying in stages as construction milestones are met.",
      "Wakalah: a Takaful operator acts as agent (wakil) managing the participants' risk fund for a disclosed fee.",
      "Qard: a community fund lends a member exactly the 200,000 TZS they need for a medical bill, to be repaid without any addition.",
      "Rahn: a customer pledges gold jewellery as collateral against a Qard, held safely by the lender until the loan is repaid.",
    ],
    scenario: "A small manufacturer needs upfront cash and also needs a custom machine built. Salam could fund the cash need against a future delivery of the manufacturer's own goods; Istisna' could finance the custom machine, paid in stages as it is built.",
    principles: [
      { type: "quran", ref: "Qur'an 2:282 (meaning conveyed)", text: "The Qur'an's longest verse instructs believers to put debt agreements in writing — a principle behind why Salam and Istisna' both require clearly specified terms." },
      { type: "hadith", ref: "Sahih al-Bukhari", text: "Delaying repayment by someone who is able to pay is described as an injustice — part of the ethical weight placed on honouring debts such as Qard." },
    ],
    summary: "Salam and Istisna' both finance production ahead of delivery, differing mainly in payment timing. Wakalah supplies the agency relationship used throughout Islamic finance's back office. Qard and Rahn round out ordinary lending and collateral needs without interest.",
    takeaways: [
      "Salam: full payment now, precise future delivery",
      "Istisna': made-to-order goods, payment can be staged",
      "Wakalah = agency; Qard = interest-free loan; Rahn = pledged collateral",
    ],
    quizId: "l11",
  },
  {
    id: "l12", moduleId: "m8", title: "Islamic Banking Fundamentals", minutes: 7,
    objectives: [
      "Explain how Islamic banks structure deposit accounts",
      "List common Islamic financing products and match them to customer needs",
      "Describe the role of a Shariah Supervisory Board",
    ],
    intro: "An Islamic bank performs the same basic economic function as a conventional bank — taking deposits, financing customers — but every product is built from the contracts covered so far.",
    explanation: [
      "Current (checking) accounts are typically structured as Qard: the customer effectively lends the bank their deposit interest-free, on the understanding it is available on demand. Savings and investment accounts are usually Mudarabah: the depositor shares in the bank's investment profits (or losses) rather than earning fixed interest.",
      "On the financing side, banks mix and match Murabahah (asset purchases), Ijarah (leasing), Musharakah and diminishing Musharakah (partnerships, home finance), and Salam/Istisna' (trade and construction finance) depending on the customer's need.",
      "Every Islamic bank operates under a Shariah Supervisory Board (SSB) — independent scholars who review products, issue fatwas approving structures, and audit the bank's actual practice for compliance. Many countries also run 'Islamic windows': dedicated Islamic product lines inside otherwise conventional banks, kept operationally and financially separate.",
    ],
    examples: [
      "A customer wants a car: the bank offers Murabahah. A customer wants working capital as a genuine partner: the bank offers Musharakah. A customer wants somewhere safe to hold salary income: a Qard-based current account.",
    ],
    scenario: "A conventional bank in Dar es Salaam opens an 'Islamic window' — a separate product line, separately audited by an SSB, offering Murabahah and Musharakah products alongside the bank's normal interest-based lending, with the two kept financially and operationally distinct.",
    principles: [
      { type: "scholarly", ref: "Industry governance practice", text: "A Shariah Supervisory Board's approval and ongoing audit is the mechanism that gives depositors and regulators confidence that a bank's products genuinely comply with Shariah, not just in name." },
    ],
    summary: "Islamic banks re-use the contracts from earlier modules to build deposit and financing products, governed throughout by an independent Shariah Supervisory Board.",
    takeaways: [
      "Current accounts ≈ Qard; savings/investment accounts ≈ Mudarabah",
      "Financing products are matched to customer need from the contract toolkit",
      "A Shariah Supervisory Board approves and audits compliance on an ongoing basis",
    ],
    quizId: "l12",
  },
  {
    id: "l13", moduleId: "m9", title: "Principles of Islamic Investment", minutes: 7,
    objectives: [
      "Explain the two-stage Shariah screening process for investments",
      "Describe purification of impure income",
      "Recognise that screening thresholds vary by index provider",
    ],
    intro: "Shariah-compliant investing applies a two-stage filter to potential investments: what the business does, and how its finances are structured.",
    explanation: [
      "The business-activity screen excludes companies whose core activity is impermissible — conventional banking and insurance, alcohol, gambling, pork, and similar sectors are typically excluded outright.",
      "The financial-ratio screen looks at companies that pass the activity screen but carry some impermissible elements in their balance sheet — for example, interest-bearing debt or cash relative to market value, or a small amount of interest or non-compliant income. Different Shariah indices set their own thresholds; a commonly cited pattern (used by benchmarks such as the Dow Jones Islamic Market Index) keeps such ratios below roughly one-third, but the exact figures and methodology are set by each index provider or scholar board, not by one universal rule.",
      "Where a small proportion of income is impermissible (typically incidental interest on cash holdings), the standard practice is purification: calculating that proportion and donating it to charity, rather than treating it as legitimate investment income.",
    ],
    examples: [
      "A logistics company with no debt and no interest income passes both screens cleanly.",
      "A retailer with modest short-term interest-bearing deposits may still pass, provided the ratio stays under the index's threshold — with the interest portion of any dividend purified via donation.",
    ],
    scenario: "An investor is comparing two Shariah-compliant equity funds that use different index providers as their screening benchmark — one may include a stock the other excludes, purely because their financial-ratio thresholds differ slightly, despite both being legitimate Shariah screens.",
    principles: [
      { type: "scholarly", ref: "Contemporary screening practice", text: "Screening methodology (both business-activity exclusions and financial ratio thresholds) is set by individual index providers or scholar boards, and genuinely varies between them — this is a known, acknowledged area of methodological difference, not an error." },
    ],
    summary: "Shariah-compliant investing screens both what a business does and how it is financed, purifying any small residual impermissible income through charity. Exact thresholds differ by provider — a real, acknowledged methodological difference.",
    takeaways: [
      "Business-activity screen first, then financial-ratio screen",
      "Purification = donating the impermissible proportion of income",
      "Screening thresholds are provider-specific, not universally fixed",
    ],
    quizId: "l13",
  },
  {
    id: "l14", moduleId: "m10", title: "Understanding Sukuk", minutes: 8,
    objectives: [
      "Explain how a Sukuk differs structurally from a conventional bond",
      "Describe the two most common Sukuk structures",
      "Summarise the 2007–2008 scholarly critique that reshaped Sukuk standards",
    ],
    intro: "Sukuk are often called 'Islamic bonds', but structurally they are closer to certificates of ownership: each Sukuk represents an undivided beneficial share in a real asset, service, or venture.",
    explanation: [
      "A conventional bondholder is owed a fixed sum plus interest, regardless of how the issuer's business performs. A Sukuk holder instead owns a proportional share of whatever the certificate is actually backed by — typically real estate, equipment, or a specific venture — and receives income generated by that asset, such as rent.",
      "Sukuk al-Ijarah, the most common structure, is backed by a leased asset: investors effectively own a share of the asset and receive the rental income it generates. Sukuk al-Musharakah/Mudarabah are more equity-like, entitling holders to a share of an underlying venture's actual profit.",
      "In 2007–2008, prominent scholar Muhammad Taqi Usmani publicly argued that a large majority of Sukuk in issue at the time relied on purchase undertakings guaranteeing the return of capital at par, which he argued undermined genuine risk-sharing and made them resemble conventional bonds in substance. This critique led AAOIFI to tighten its Sukuk standards — a well-documented example of scholarly debate directly reshaping industry practice.",
    ],
    examples: [
      "A government issues Sukuk al-Ijarah backed by a government office building: investors own a share of the building and receive rent as their return, rather than a government-guaranteed interest coupon.",
    ],
    scenario: "An investor compares a conventional government bond with a government Sukuk of similar yield. The bond is a pure debt claim; the Sukuk is a claim on a real, specified asset — a structural difference that matters most if the issuer runs into financial difficulty.",
    principles: [
      { type: "scholarly", ref: "Usmani (2007) critique; subsequent AAOIFI standard revisions", text: "A widely reported scholarly critique argued many existing Sukuk did not fully embody risk-sharing in practice, prompting standard-setters to revise Sukuk guidance — illustrating that Sukuk 'compliance' is monitored and contested, not static." },
    ],
    summary: "Sukuk represent ownership in a real asset or venture rather than a pure debt claim, most often through Ijarah (leasing) or Musharakah/Mudarabah (partnership) structures. Their design remains an active area of scholarly scrutiny.",
    takeaways: [
      "Sukuk = ownership certificate in an asset/venture, not a debt instrument",
      "Sukuk al-Ijarah (lease-based) is the most common structure",
      "The 2007 Usmani critique and AAOIFI's response show this is a living, monitored standard",
    ],
    quizId: "l14",
  },
  {
    id: "l15", moduleId: "m11", title: "Takaful: Islamic Insurance", minutes: 7,
    objectives: [
      "Explain the tabarru' (donation) principle behind Takaful",
      "Distinguish the Wakalah and Mudarabah operator models",
      "Distinguish General Takaful from Family Takaful",
    ],
    intro: "Takaful is Islamic insurance built on mutual cooperation: participants contribute to a shared fund used to help any member who suffers a covered loss.",
    explanation: [
      "Conventional insurance is often criticised by scholars on three fronts at once: riba (in how premiums may be invested), gharar (the uncertain, contingent payout), and maysir (one side gains only if the other suffers a loss). Takaful addresses all three by restructuring the relationship as mutual donation (tabarru') rather than a bought guarantee.",
      "Participants contribute to a common risk fund with the explicit intention of helping fellow participants, not purchasing a guaranteed payout. A Takaful operator manages the fund — typically under a Wakalah model (a fixed management fee) or a Mudarabah model (the operator shares in any investment profit generated by the fund).",
      "Any surplus left in the risk fund after claims can be distributed back to participants or carried forward — unlike a conventional insurer's profit, which belongs entirely to shareholders.",
    ],
    examples: [
      "General Takaful covers property, motor, and health-type risks. Family Takaful covers longer-term, savings-linked needs analogous to life insurance.",
    ],
    scenario: "A cooperative of small business owners in Arusha pools monthly contributions into a Takaful fund. When one member's shop is damaged by fire, the payout comes from the shared fund the group intentionally set up to help each other — not from a policy 'purchased' from an external insurer.",
    principles: [
      { type: "scholarly", ref: "Contemporary Takaful standards", text: "Structuring contributions as tabarru' (mutual donation) rather than a purchased guarantee is the mechanism scholars point to for resolving the riba, gharar, and maysir concerns raised about conventional insurance." },
    ],
    summary: "Takaful reframes insurance as mutual, donation-based risk-sharing rather than a purchased guarantee, addressing riba, gharar, and maysir concerns raised about the conventional model.",
    takeaways: [
      "Tabarru' (donation) is the structural fix at the heart of Takaful",
      "Operators run the fund via Wakalah (fee) or Mudarabah (profit-share) models",
      "General Takaful ≈ property/motor/health; Family Takaful ≈ life/savings",
    ],
    quizId: "l15",
  },
  {
    id: "l16", moduleId: "m12", title: "Islamic Stock Market Investing & Shariah Screening", minutes: 7,
    objectives: [
      "Apply business-activity and financial-ratio screening to public equities",
      "Identify practical tools used to check Shariah compliance of a stock",
      "Explain why purification percentages differ between providers",
    ],
    intro: "Investing in public equities the Shariah-compliant way applies the same two-stage screen from Module 9, with tools that make it practical at scale.",
    explanation: [
      "In practice, retail investors rarely run the screens by hand. Shariah-compliant index funds and ETFs (tracking benchmarks such as Islamic market indices) do the business-activity and financial-ratio screening on an ongoing basis, rebalancing as companies move in or out of compliance.",
      "Standalone Shariah stock-screening services and apps are also widely used to check an individual stock before buying it directly, typically reporting a pass/fail plus a suggested purification percentage for any residual non-compliant income.",
      "Because screening methodology is set by individual providers, two reputable screens can occasionally disagree on a borderline stock — this is a known, acknowledged feature of the space, not a sign either screen is wrong.",
    ],
    examples: [
      "An investor checks a stock via a Shariah screening app before buying it directly, then sets a reminder to purify the small reported percentage of any dividend received.",
    ],
    scenario: "A first-time investor in Dar es Salaam wants Shariah-compliant exposure to the stock market without researching every company individually — a Shariah-compliant index fund handles ongoing screening for them, at the cost of paying a fund management fee.",
    principles: [
      { type: "scholarly", ref: "Contemporary screening practice", text: "As in Module 9, screening thresholds and purification percentages are set by individual index providers or scholar boards and can differ — informed investors are expected to know which methodology a given fund or app is using." },
    ],
    summary: "Shariah-compliant stock investing applies business and financial screens, either by hand, via a screening app, or automatically through a Shariah-compliant index fund — with purification of any small non-compliant income as the final step.",
    takeaways: [
      "Index funds and screening apps operationalise the two-stage screen from Module 9",
      "Borderline disagreement between screening providers is expected, not an error",
      "Purification remains the standard fix for small amounts of non-compliant income",
    ],
    quizId: "l16",
  },
];

/* Quiz bank — 3–4 questions per lesson, an 8-question module assessment for
   the Islamic Contracts module, and a final assessment per course. */
const QUIZZES = {
  l1: [
    { id:"l1q1", type:"mcq", prompt:"Which of these is the foundational prohibition that most distinguishes Islamic finance from conventional finance?", options:["Riba (interest)","High fees","Foreign currency use","Long loan terms"], correct:0, explanation:"Riba is the single most foundational prohibition — the rest aren't specific to Islamic finance." },
    { id:"l1q2", type:"tf", prompt:"In Islamic finance, money itself can be rented out for a fee, similar to renting a car.", options:["True","False"], correct:1, explanation:"Money is treated as a medium of exchange, not a commodity to rent out — charging a fee purely for its use over time is riba." },
    { id:"l1q3", type:"mcq", prompt:"A bank lends $5,000 and requires exactly $5,500 back in a year, no matter what happens. This is best described as:", options:["A Murabahah sale","Riba-based lending","A Mudarabah partnership","A Wakalah agreement"], correct:1, explanation:"A fixed, guaranteed increase on a loan regardless of outcome is the classic pattern of riba." },
  ],
  l2: [
    { id:"l2q1", type:"mcq", prompt:"Which principle explains why a Sukuk investor's return can be affected by an underlying asset's performance, unlike a conventional bondholder's?", options:["Asset-backing","Currency risk","Tax treatment","Credit rating"], correct:0, explanation:"Sukuk are tied to real assets or ventures, so the return follows the asset's real performance." },
    { id:"l2q2", type:"tf", prompt:"Islamic economic principles consist only of prohibitions, with no positive principles about how contracts should be structured.", options:["True","False"], correct:1, explanation:"Positive principles — asset-backing, shared risk, and binding agreements — matter just as much as the prohibitions." },
    { id:"l2q3", type:"mcq", prompt:"\u201cLa darar wa la dirar\u201d is best translated as:", options:["There should be neither harm nor reciprocating harm","There should be no profit without risk","There should be no delay in payment","There should be no partnership without capital"], correct:0, explanation:"It's a foundational fiqh maxim used to judge fairness between contracting parties." },
  ],
  l3: [
    { id:"l3q1", type:"mcq", prompt:"Charging a fee purely for delaying repayment of a loan is known as:", options:["Riba al-fadl","Riba al-nasi'ah","Gharar","Maysir"], correct:1, explanation:"Riba al-nasi'ah is an increase charged for delay — this covers conventional interest." },
    { id:"l3q2", type:"mcq", prompt:"Exchanging 10g of gold for 12g of gold of a different purity, hand to hand, with no special conditions, risks falling under:", options:["Riba al-nasi'ah","Gharar","Riba al-fadl","Wakalah"], correct:2, explanation:"Unequal exchange of the same commodity category is the classic riba al-fadl case." },
    { id:"l3q3", type:"tf", prompt:"A Murabahah mark-up can legitimately increase if the customer pays later than agreed, similar to compounding interest.", options:["True","False"], correct:1, explanation:"The sale price is fixed at signing; it cannot increase for delay the way interest compounds." },
  ],
  l4: [
    { id:"l4q1", type:"mcq", prompt:"Which classical example is most often cited as gharar?", options:["Selling a fixed quantity of grain at an agreed price","Selling fish still in the water","Leasing a car for a fixed monthly rent","Buying shares in a known company"], correct:1, explanation:"Nobody can be sure what, if anything, will actually be caught — a textbook gharar example." },
    { id:"l4q2", type:"tf", prompt:"All uncertainty in a contract is prohibited under gharar rules, with no exceptions.", options:["True","False"], correct:1, explanation:"Minor, unavoidable uncertainty (gharar yasir) is tolerated — Salam and Istisna' are structured exceptions." },
    { id:"l4q3", type:"mcq", prompt:"Salam contracts manage gharar mainly by:", options:["Letting the price float with the market","Requiring exact specification of goods, quantity, and delivery date","Allowing either party to cancel at any time","Avoiding any mention of a delivery date"], correct:1, explanation:"Strict specification is exactly what keeps a Salam contract's uncertainty within a tolerated range." },
  ],
  l5: [
    { id:"l5q1", type:"mcq", prompt:"What best distinguishes maysir from legitimate commercial risk-taking?", options:["The amount of money involved","Whether real economic activity underlies the risk","Whether the deal is written down","Whether more than one person is involved"], correct:1, explanation:"The presence (or absence) of genuine productive activity is the key test." },
    { id:"l5q2", type:"tf", prompt:"An investor whose capital is at risk in a genuine trading venture is engaging in maysir, because the outcome is uncertain.", options:["True","False"], correct:1, explanation:"Uncertainty alone isn't maysir — genuine commercial risk tied to real activity is a different category." },
    { id:"l5q3", type:"mcq", prompt:"Qur'an 5:90\u201391 groups maysir together with which of the following?", options:["Trade and profit","Charity and zakat","Intoxicants and idolatrous practices","Partnership and leasing"], correct:2, explanation:"The verse pairs maysir with intoxicants, idol worship, and divination as things to avoid." },
  ],
  l6: [
    { id:"l6q1", type:"mcq", prompt:"What is the default ruling for a business transaction, absent a specific prohibition?", options:["Prohibited until proven permissible","Permissible until proven prohibited","Always needs individual scholarly sign-off","Depends purely on local custom"], correct:1, explanation:"The governing maxim is that things are presumed permissible unless proven otherwise." },
    { id:"l6q2", type:"tf", prompt:"A company whose core business is fine but that earns a little incidental interest on idle cash must be excluded entirely from Islamic investment.", options:["True","False"], correct:1, explanation:"This is typically handled through purification of the incidental income rather than blanket exclusion, provided it stays within screening thresholds." },
    { id:"l6q3", type:"mcq", prompt:"The Bukhari/Muslim hadith on halal and haram describes:", options:["Only two categories: halal and haram","Halal and haram as clear, with doubtful matters in between","Everything as doubtful unless a bank certifies it","Halal as applying only to food"], correct:1, explanation:"It explicitly names a middle zone of doubtful matters between the two clear categories." },
  ],
  l7: [
    { id:"l7q1", type:"mcq", prompt:"In a Murabahah transaction, the financier's profit comes from:", options:["Interest charged over time","A disclosed, fixed mark-up on the resale price","A percentage of the customer's future income","Currency exchange gains"], correct:1, explanation:"Murabahah profit is a sale mark-up, agreed and fixed up front." },
    { id:"l7q2", type:"tf", prompt:"If a Murabahah customer pays late, the sale price may legitimately increase as extra profit retained by the bank.", options:["True","False"], correct:1, explanation:"That would resemble riba; any late fee is typically directed to charity, not bank income." },
    { id:"l7q3", type:"mcq", prompt:"Which structure has drawn specific scholarly criticism for potentially resembling an interest-based loan?", options:["Standard asset Murabahah for a car","Organised tawarruq / commodity Murabahah for cash","Diminishing Musharakah for a home","Sukuk al-Ijarah"], correct:1, explanation:"AAOIFI and several scholars have specifically scrutinised organised tawarruq structures used mainly for cash." },
  ],
  l8: [
    { id:"l8q1", type:"mcq", prompt:"In a Mudarabah, who normally bears an ordinary-course financial loss?", options:["The mudarib alone","Split 50/50 automatically","The rab-ul-mal (capital provider) alone","Neither party"], correct:2, explanation:"Absent negligence, the capital provider bears the financial loss; the mudarib loses only their unpaid effort." },
    { id:"l8q2", type:"tf", prompt:"The mudarib in a Mudarabah contributes capital alongside the rab-ul-mal.", options:["True","False"], correct:1, explanation:"The mudarib contributes labour and expertise, not capital — that's what makes it a Mudarabah rather than a Musharakah." },
    { id:"l8q3", type:"mcq", prompt:"Many Islamic bank savings accounts are structured using which contract?", options:["Ijarah","Rahn","Mudarabah","Wakalah"], correct:2, explanation:"Depositors act as rab-ul-mal and the bank as mudarib, sharing actual investment profit." },
  ],
  l9: [
    { id:"l9q1", type:"mcq", prompt:"In Musharakah, how must losses be shared between partners?", options:["Equally, regardless of capital contributed","In proportion to each partner's capital contribution","According to whoever manages the business","Losses are never shared in Musharakah"], correct:1, explanation:"Loss must track capital contribution proportionally — a near-unanimous fiqh rule." },
    { id:"l9q2", type:"tf", prompt:"Profit ratios in Musharakah must always exactly match each partner's capital contribution.", options:["True","False"], correct:1, explanation:"Profit ratios can be freely agreed between partners; only the loss ratio is tied strictly to capital." },
    { id:"l9q3", type:"mcq", prompt:"Diminishing Musharakah is most commonly used for:", options:["Short-term trade finance","Home financing","Insurance pooling","Currency exchange"], correct:1, explanation:"It's the standard Islamic structure behind home-purchase financing." },
  ],
  l10: [
    { id:"l10q1", type:"mcq", prompt:"In an Ijarah lease, who typically bears the risk of major asset damage through no fault of the lessee?", options:["The lessee","The lessor (owner)","Both equally, always","Neither party"], correct:1, explanation:"Ownership-related risk stays with the lessor, since they retain ownership throughout the lease." },
    { id:"l10q2", type:"tf", prompt:"Ijarah Muntahia Bittamleek transfers ownership to the lessee automatically from day one of the lease.", options:["True","False"], correct:1, explanation:"Transfer happens at the end, via a separate gift or sale, kept structurally distinct from the lease." },
    { id:"l10q3", type:"mcq", prompt:"The defining feature of Ijarah, compared to a sale, is that:", options:["Ownership transfers immediately","The lessee pays rent for use while the lessor retains ownership","No payment is ever required","It cannot apply to equipment"], correct:1, explanation:"Ijarah separates use (rented) from ownership (retained by the lessor)." },
  ],
  l11: [
    { id:"l11q1", type:"mcq", prompt:"What is the key payment difference between Salam and Istisna'?", options:["Salam requires full payment upfront; Istisna' allows staged/deferred payment","Istisna' requires full payment upfront; Salam allows deferred payment","Both always require full payment upfront","Neither ever requires upfront payment"], correct:0, explanation:"Full upfront payment is a defining condition of Salam; Istisna' is more flexible on timing." },
    { id:"l11q2", type:"mcq", prompt:"A contract where one party acts on behalf of another, for a fee or free of charge, is called:", options:["Rahn","Wakalah","Qard","Ijarah"], correct:1, explanation:"Wakalah is the agency contract." },
    { id:"l11q3", type:"tf", prompt:"A lender may charge a small fixed fee above the principal in a qard hasan contract, if disclosed in advance.", options:["True","False"], correct:1, explanation:"Qard hasan permits recovery of the exact principal only — any addition, disclosed or not, is riba." },
    { id:"l11q4", type:"mcq", prompt:"Rahn refers to:", options:["A forward sale contract","An agency relationship","A pledge of an asset as collateral","A profit-sharing partnership"], correct:2, explanation:"Rahn is the Islamic pledge/collateral arrangement." },
  ],
  l12: [
    { id:"l12q1", type:"mcq", prompt:"A typical Islamic current (checking) account is structured as:", options:["Musharakah","Qard","Ijarah","Salam"], correct:1, explanation:"The customer effectively extends an interest-free loan (Qard) to the bank, repayable on demand." },
    { id:"l12q2", type:"mcq", prompt:"What is the role of a Shariah Supervisory Board?", options:["Setting national interest rates","Approving and auditing a bank's products for Shariah compliance","Managing the bank's marketing","Issuing currency"], correct:1, explanation:"The SSB is the ongoing compliance mechanism for an Islamic bank's products and practice." },
    { id:"l12q3", type:"tf", prompt:"An 'Islamic window' inside a conventional bank is typically kept operationally and financially separate from the bank's conventional business.", options:["True","False"], correct:0, explanation:"That separation is standard practice for Islamic windows." },
  ],
  l13: [
    { id:"l13q1", type:"mcq", prompt:"The first stage of Shariah investment screening evaluates:", options:["The company's stock price history","The company's core business activity","The company's marketing budget","The company's headquarters location"], correct:1, explanation:"Business-activity screening comes first — is the core business itself permissible?" },
    { id:"l13q2", type:"mcq", prompt:"'Purification' in Islamic investing refers to:", options:["Excluding a company entirely from any index","Donating the impermissible proportion of income to charity","Paying zakat on all investment gains","Converting all holdings to cash"], correct:1, explanation:"Purification means donating the small non-compliant portion of income, not excluding the whole investment." },
    { id:"l13q3", type:"tf", prompt:"All Shariah-compliant indices use exactly the same financial-ratio thresholds.", options:["True","False"], correct:1, explanation:"Thresholds are set independently by each index provider or scholar board and genuinely vary." },
  ],
  l14: [
    { id:"l14q1", type:"mcq", prompt:"A Sukuk holder's return is best described as:", options:["A fixed interest coupon regardless of performance","A share of income generated by a real underlying asset or venture","A lottery-style prize","A government subsidy"], correct:1, explanation:"Sukuk represent ownership, so returns follow the real asset or venture's performance." },
    { id:"l14q2", type:"mcq", prompt:"The most common Sukuk structure, backed by a leased asset, is called:", options:["Sukuk al-Salam","Sukuk al-Ijarah","Sukuk al-Wakalah","Sukuk al-Rahn"], correct:1, explanation:"Sukuk al-Ijarah is the most widely used structure." },
    { id:"l14q3", type:"tf", prompt:"Muhammad Taqi Usmani's 2007 critique of Sukuk had no lasting effect on industry standards.", options:["True","False"], correct:1, explanation:"It directly prompted AAOIFI to revise its Sukuk standards — a documented, lasting effect." },
  ],
  l15: [
    { id:"l15q1", type:"mcq", prompt:"The structural principle that distinguishes Takaful from conventional insurance is:", options:["Higher premiums","Mutual donation (tabarru') rather than a purchased guarantee","Government backing","Shorter policy terms"], correct:1, explanation:"Tabarru' reframes contributions as mutual aid rather than a bought guarantee." },
    { id:"l15q2", type:"mcq", prompt:"Under a Wakalah-model Takaful operator, the operator is typically compensated by:", options:["Keeping all investment profit","A disclosed, fixed management fee","Charging compound interest","A lottery among participants"], correct:1, explanation:"The Wakalah model pays the operator a fixed, disclosed fee for managing the fund." },
    { id:"l15q3", type:"tf", prompt:"Family Takaful is roughly analogous to conventional property insurance.", options:["True","False"], correct:1, explanation:"Family Takaful is analogous to life/savings-type cover; General Takaful covers property/motor/health." },
  ],
  l16: [
    { id:"l16q1", type:"mcq", prompt:"Shariah-compliant index funds are useful mainly because they:", options:["Guarantee higher returns than conventional funds","Perform ongoing business and financial screening automatically","Eliminate all investment risk","Are exempt from all fees"], correct:1, explanation:"They operationalise the two-stage screen continuously, rebalancing as needed." },
    { id:"l16q2", type:"tf", prompt:"Two reputable Shariah stock-screening services can occasionally disagree about a borderline stock.", options:["True","False"], correct:0, explanation:"Because methodology is provider-specific, disagreement on borderline cases is expected." },
    { id:"l16q3", type:"mcq", prompt:"If a Shariah-compliant stock reports a small percentage of non-compliant income, the investor should typically:", options:["Ignore it, since the stock already passed screening","Purify that percentage by donating it to charity","Sell the stock immediately regardless of the percentage","Report it to the stock exchange"], correct:1, explanation:"Purification of the reported percentage is the standard practice." },
  ],
};

const MODULE_ASSESSMENTS = {
  m7: {
    title: "Islamic Contracts — Module Assessment",
    questions: [
      { id:"m7q1", type:"mcq", prompt:"Which contract earns profit through a disclosed, fixed sale mark-up rather than an interest charge?", options:["Mudarabah","Murabahah","Musharakah","Wakalah"], correct:1, explanation:"Murabahah's profit is a sale mark-up, fixed at signing." },
      { id:"m7q2", type:"mcq", prompt:"Who bears an ordinary-course financial loss in a Mudarabah?", options:["The mudarib","The rab-ul-mal (capital provider)","Both, split evenly","Neither"], correct:1, explanation:"The capital provider bears financial loss absent negligence by the mudarib." },
      { id:"m7q3", type:"mcq", prompt:"In Musharakah, losses must be shared:", options:["Equally regardless of capital","In proportion to capital contributed","According to who works harder","Never shared"], correct:1, explanation:"Loss-sharing must track each partner's capital contribution." },
      { id:"m7q4", type:"mcq", prompt:"In an Ijarah lease, ownership-related risk is normally held by:", options:["The lessee","The lessor","A third-party insurer only","No one"], correct:1, explanation:"The lessor retains ownership and its associated risks throughout the lease." },
      { id:"m7q5", type:"mcq", prompt:"Which contract requires the full price to be paid upfront for goods delivered later?", options:["Istisna'","Salam","Ijarah","Rahn"], correct:1, explanation:"Full upfront payment is a defining condition of Salam." },
      { id:"m7q6", type:"mcq", prompt:"An agency relationship where one party acts on behalf of another is:", options:["Wakalah","Qard","Rahn","Musharakah"], correct:0, explanation:"Wakalah is the agency contract." },
      { id:"m7q7", type:"mcq", prompt:"A benevolent, interest-free loan where only the exact principal may be reclaimed is:", options:["Rahn","Qard hasan","Salam","Ijarah"], correct:1, explanation:"Qard hasan permits recovery of principal only." },
      { id:"m7q8", type:"mcq", prompt:"A bank and customer jointly own a home, with the customer paying rent on the bank's share plus buyout instalments until they own it outright. This is:", options:["Sukuk al-Ijarah","Diminishing Musharakah","Commodity Murabahah","Family Takaful"], correct:1, explanation:"This gradual buyout structure is diminishing Musharakah (Musharakah Mutanaqisah)." },
    ],
  },
};

const FINAL_ASSESSMENTS = {
  beginner: {
    title: "Foundations of Islamic Finance — Final Assessment",
    questions: [
      { id:"fb1", type:"mcq", prompt:"Islamic finance replaces interest-based lending mainly with:", options:["Higher fees","Trade, leasing, and partnership structures","Government subsidies","Foreign currency swaps"], correct:1, explanation:"These contract families replace interest as the basis for a return." },
      { id:"fb2", type:"mcq", prompt:"Riba al-nasi'ah refers specifically to:", options:["Unequal exchange of the same commodity","An increase charged for delaying repayment","Excessive contractual uncertainty","Gambling on an outcome"], correct:1, explanation:"Riba al-nasi'ah is the delay-based form of riba — conventional interest." },
      { id:"fb3", type:"mcq", prompt:"Gharar is best defined as:", options:["Any risk at all in a transaction","Excessive uncertainty about subject, price, or delivery","A form of gambling","A type of partnership"], correct:1, explanation:"Gharar specifically concerns ambiguity, not risk in general." },
      { id:"fb4", type:"mcq", prompt:"Maysir differs from ordinary commercial risk because:", options:["It involves larger sums of money","It has no productive economic activity behind the wealth transfer","It requires a written contract","It always involves two or more people"], correct:1, explanation:"The absence of real productive activity is the key distinguishing feature." },
      { id:"fb5", type:"tf", prompt:"The default ruling for a business transaction in Islamic commercial law is prohibition unless proven otherwise.", options:["True","False"], correct:1, explanation:"The default is permissibility unless proven otherwise — the opposite of this statement." },
      { id:"fb6", type:"mcq", prompt:"Asset-backing, shared risk, and honouring contracts are examples of:", options:["Prohibitions in Islamic finance","Positive principles underpinning Islamic economics","Modern banking regulations only","Zakat calculation rules"], correct:1, explanation:"These are the positive design principles behind Islamic contracts, not prohibitions." },
      { id:"fb7", type:"mcq", prompt:"A small, incidental amount of impermissible income in an otherwise compliant business is typically handled by:", options:["Excluding the business entirely","Purification (donating that portion to charity)","Ignoring it","Converting it into zakat automatically"], correct:1, explanation:"Purification is the standard mechanism for small, incidental impermissible income." },
      { id:"fb8", type:"tf", prompt:"Money is treated in Islamic finance as a commodity that can itself be rented out for a fee.", options:["True","False"], correct:1, explanation:"Money is a medium of exchange, not a rentable commodity — that framing is what riba avoids." },
    ],
  },
  intermediate: {
    title: "Contracts, Banking & Investment — Final Assessment",
    questions: [
      { id:"fi1", type:"mcq", prompt:"Murabahah generates profit through:", options:["Interest on a loan","A disclosed, fixed sale mark-up","A share of business profit","Currency speculation"], correct:1, explanation:"It's a cost-plus sale, not a loan." },
      { id:"fi2", type:"mcq", prompt:"In Mudarabah, the mudarib contributes:", options:["Capital only","Labour and expertise, not capital","Both capital and labour equally","Collateral only"], correct:1, explanation:"The mudarib brings skill and management, not capital." },
      { id:"fi3", type:"mcq", prompt:"Musharakah loss-sharing must be proportional to:", options:["Each partner's capital contribution","Hours worked","Seniority","Nothing — losses are waived"], correct:0, explanation:"Loss must track capital contribution, unlike profit which can be freely agreed." },
      { id:"fi4", type:"mcq", prompt:"Diminishing Musharakah is most associated with:", options:["Stock market investing","Home financing","Insurance pooling","Import/export trade finance"], correct:1, explanation:"It's the standard structure behind Islamic home purchase financing." },
      { id:"fi5", type:"mcq", prompt:"Istisna' differs from Salam mainly in that:", options:["Istisna' allows staged or deferred payment; Salam requires full payment upfront","Istisna' requires full payment upfront; Salam allows deferred payment","Both require identical payment timing","Neither involves future delivery"], correct:0, explanation:"Payment timing is the key practical difference between the two." },
      { id:"fi6", type:"mcq", prompt:"An Islamic bank's savings account, which shares actual investment profit with depositors, is typically structured as:", options:["Qard","Mudarabah","Rahn","Ijarah"], correct:1, explanation:"Savings/investment accounts are usually Mudarabah-based." },
      { id:"fi7", type:"mcq", prompt:"The first stage of Shariah investment screening asks:", options:["Is the company's core business activity permissible?","Is the company profitable this quarter?","Is the company listed on a major exchange?","Is the company headquartered in a Muslim-majority country?"], correct:0, explanation:"Business-activity screening always comes first." },
      { id:"fi8", type:"tf", prompt:"A Shariah Supervisory Board's approval is a one-time event that never requires ongoing auditing.", options:["True","False"], correct:1, explanation:"SSBs provide ongoing approval and audit, not a one-time sign-off." },
    ],
  },
  advanced: {
    title: "Institutions & Contemporary Practice — Final Assessment",
    questions: [
      { id:"fa1", type:"mcq", prompt:"A Sukuk fundamentally represents:", options:["A pure debt obligation","Ownership in a real underlying asset or venture","A government-issued currency","A type of insurance premium"], correct:1, explanation:"Sukuk holders own a share of the underlying asset or venture, unlike bondholders." },
      { id:"fa2", type:"mcq", prompt:"The 2007 Usmani critique concerned:", options:["Takaful surplus distribution","Purchase undertakings in some Sukuk undermining genuine risk-sharing","Zakat calculation methods","Shariah stock screening thresholds"], correct:1, explanation:"His critique targeted Sukuk structures relying on guaranteed-at-par purchase undertakings." },
      { id:"fa3", type:"mcq", prompt:"Takaful addresses conventional insurance's gharar concern mainly by:", options:["Raising premiums","Structuring contributions as mutual donation (tabarru')","Guaranteeing a fixed payout to everyone","Removing all uncertainty from claims"], correct:1, explanation:"Tabarru' reframes the relationship away from a purchased, uncertain guarantee." },
      { id:"fa4", type:"mcq", prompt:"General Takaful typically covers risks similar to conventional:", options:["Life insurance","Property, motor, and health insurance","Currency trading","Government bonds"], correct:1, explanation:"General Takaful is the property/motor/health-type category." },
      { id:"fa5", type:"tf", prompt:"All Shariah stock-screening providers use identical methodology, so disagreement between them never happens.", options:["True","False"], correct:1, explanation:"Methodology is provider-specific, so occasional disagreement on borderline stocks is expected." },
      { id:"fa6", type:"mcq", prompt:"Purification of investment income means:", options:["Paying extra zakat on all gains","Donating the impermissible proportion of income to charity","Selling the investment immediately","Reinvesting profits automatically"], correct:1, explanation:"Purification is specifically about donating the non-compliant portion of income." },
    ],
  },
};

const GLOSSARY = [
  { term:"Riba", definition:"An unjust increase — interest on a loan, or an unequal exchange of the same commodity.", how:"Takes two forms: riba al-nasi'ah (a charge for delaying repayment) and riba al-fadl (unequal exchange of a like-for-like commodity, e.g. gold for gold).", example:"A $100 loan that must be repaid as $110 regardless of what happened to the money.", shariah:"Explicitly prohibited (Qur'an 2:275, 2:278\u2013279); the reason Islamic finance relies on trade, leasing, and partnership instead of interest.", relatedLessonIds:["l3"] },
  { term:"Gharar", definition:"Excessive uncertainty about a contract's subject matter, price, or delivery.", how:"Arises when what is being sold, its price, or when/whether it will be delivered is unclear.", example:"Selling 'whatever the next catch brings' for a flat price before the boat goes out.", shariah:"Prohibited when excessive (gharar fahish); minor, unavoidable uncertainty (gharar yasir) is tolerated.", relatedLessonIds:["l4"] },
  { term:"Maysir", definition:"Gambling — a zero-sum transfer of wealth based on pure chance.", how:"One party gains only because another loses, with no productive economic activity involved.", example:"A lottery ticket, or a pure prediction-pool wager.", shariah:"Prohibited (Qur'an 5:90\u201391), grouped alongside intoxicants.", relatedLessonIds:["l5"] },
  { term:"Murabahah", definition:"A cost-plus sale: the seller discloses their cost and adds an agreed, fixed profit margin.", how:"Financier buys the asset, then resells it to the customer at cost plus mark-up, usually in instalments.", example:"A bank buys a $10,000 van and sells it for $12,000 over 24 months.", shariah:"Its standard form is widely accepted; 'organised tawarruq' cash variants are debated.", relatedLessonIds:["l7"] },
  { term:"Mudarabah", definition:"A profit-sharing partnership between a capital provider (rab-ul-mal) and a working partner (mudarib).", how:"Profit is split by an agreed ratio; the capital provider alone bears ordinary-course losses.", example:"An investor funds a trader's venture on a 70/30 profit split.", shariah:"Well-established; underlies many Islamic savings and investment accounts.", relatedLessonIds:["l8"] },
  { term:"Musharakah", definition:"A joint venture where every partner contributes capital (and often labour).", how:"Profit is shared by agreement; loss must track each partner's capital contribution.", example:"Diminishing Musharakah home financing, where the customer gradually buys out the bank's share.", shariah:"Loss-sharing by capital ratio is a near-unanimous fiqh rule.", relatedLessonIds:["l9"] },
  { term:"Ijarah", definition:"Islamic leasing — payment for the use of an asset, not its ownership.", how:"The lessor keeps ownership and its risks; the lessee pays rent for use.", example:"Leasing factory equipment, or a lease ending in ownership transfer (Ijarah Muntahia Bittamleek).", shariah:"Ownership-related risk must genuinely remain with the lessor throughout the term.", relatedLessonIds:["l10"] },
  { term:"Salam", definition:"A forward sale: full payment today for precisely specified goods delivered later.", how:"Requires exact specification of type, quantity, quality, and delivery date to control uncertainty.", example:"Paying a farmer in full today for a defined grade of maize after harvest.", shariah:"A deliberate, conditions-bound exception to selling what you don't yet possess.", relatedLessonIds:["l11"] },
  { term:"Istisna'", definition:"A manufacturing or construction contract for made-to-order goods.", how:"Unlike Salam, payment can be staged or deferred rather than paid in full upfront.", example:"Commissioning a custom warehouse, paid in stages as it's built.", shariah:"Permitted due to its utility for production and construction financing.", relatedLessonIds:["l11"] },
  { term:"Wakalah", definition:"An agency contract — one party acts on behalf of another.", how:"The agent (wakil) may act for a fee or free of charge, on the principal's behalf.", example:"A Takaful operator managing the shared risk fund as agent for participants.", shariah:"Foundational and widely used across Islamic banking and Takaful operations.", relatedLessonIds:["l11","l15"] },
  { term:"Qard (Qard Hasan)", definition:"A benevolent, interest-free loan.", how:"The lender may only ever reclaim the exact principal — no addition, however small.", example:"A community fund lending exactly the amount needed for an emergency, interest-free.", shariah:"Treated as a charitable, virtuous act rather than a commercial product.", relatedLessonIds:["l11"] },
  { term:"Rahn", definition:"A pledge — an asset held as collateral to secure an obligation.", how:"The asset is held (not consumed) as security until the underlying obligation is settled.", example:"Pledging gold jewellery as collateral against a Qard loan.", shariah:"Governed by specific rules on how pledged collateral may and may not be used.", relatedLessonIds:["l11"] },
  { term:"Sukuk", definition:"A certificate representing ownership in a real asset, service, or venture.", how:"Holders receive income generated by the underlying asset (e.g. rent), not a fixed interest coupon.", example:"Sukuk al-Ijarah backed by a leased office building.", shariah:"Standards were tightened industry-wide after a well-known 2007 scholarly critique.", relatedLessonIds:["l14"] },
  { term:"Takaful", definition:"Islamic insurance based on mutual, donation-based risk-sharing.", how:"Participants contribute to a shared fund (tabarru'); an operator manages it via a fee or profit-share model.", example:"A cooperative pooling monthly contributions to help any member after a covered loss.", shariah:"Addresses riba, gharar, and maysir concerns raised about conventional insurance.", relatedLessonIds:["l15"] },
  { term:"Halal", definition:"Permissible under Islamic law.", how:"The default status of most things and actions, unless a specific prohibition applies.", example:"A halal restaurant's core business activity.", shariah:"Governed by the maxim that the default in transactions is permissibility.", relatedLessonIds:["l6"] },
  { term:"Haram", definition:"Forbidden or impermissible under Islamic law.", how:"Applies where a specific text or established principle rules a matter out.", example:"Alcohol, gambling, and interest-based lending.", shariah:"A small, defined set of clearly haram categories, distinct from grey areas handled by screening.", relatedLessonIds:["l6"] },
  { term:"Shariah", definition:"Islamic law, derived from the Qur'an, the Sunnah (Hadith), and scholarly interpretation.", how:"Provides the source principles that Islamic finance contracts and standards are built to follow.", example:"A Shariah Supervisory Board checks a bank's products against these principles.", shariah:"The reference framework for everything else in this course.", relatedLessonIds:["l1"] },
  { term:"Fiqh al-Mu'amalat", definition:"The branch of Islamic jurisprudence covering financial and commercial transactions.", how:"Scholars within this field derive and debate the specific contract rules covered in this course.", example:"Fiqh al-Mu'amalat is the discipline that distinguishes Murabahah from riba-based lending.", shariah:"The scholarly foundation underlying every contract in this app.", relatedLessonIds:["l2"] },
  { term:"Zakat", definition:"Obligatory almsgiving — a fixed share of qualifying wealth given to specified recipients.", how:"Commonly cited at 2.5% of qualifying wealth held for a full lunar year, though this course focuses on finance rather than zakat calculation in detail.", example:"An investor calculates zakat on their qualifying savings and investments annually.", shariah:"Distinct from 'purification' of impure investment income, though the two are sometimes confused.", relatedLessonIds:["l13"] },
  { term:"AAOIFI", definition:"The Accounting and Auditing Organization for Islamic Financial Institutions.", how:"A Bahrain-based standard-setting body publishing Shariah, accounting, and governance standards for the industry.", example:"AAOIFI revised its Sukuk standards after the 2007 scholarly critique of certain structures.", shariah:"Widely, though not universally, adopted across Islamic financial institutions worldwide.", relatedLessonIds:["l7","l14"] },
];

const ACHIEVEMENTS = [
  { id:"first_steps", title:"First Steps", desc:"Complete your first lesson", icon:"Sparkles", check:(p)=> p.completedLessons.length >= 1 },
  { id:"quiz_whiz", title:"Quiz Whiz", desc:"Score 100% on any quiz", icon:"Star", check:(p)=> Object.values(p.quizAttempts||{}).some(a=>a.total>0 && a.score===a.total) },
  { id:"contract_scholar", title:"Contract Scholar", desc:"Complete all five Islamic Contracts lessons", icon:"GraduationCap", check:(p)=> ["l7","l8","l9","l10","l11"].every(id=>p.completedLessons.includes(id)) },
  { id:"halfway_hero", title:"Halfway Hero", desc:"Reach 50% overall lesson completion", icon:"TrendingUp", check:(p, totalLessons)=> (p.completedLessons.length/totalLessons) >= 0.5 },
  { id:"course_champion", title:"Course Champion", desc:"Pass a course's final assessment", icon:"Trophy", check:(p)=> (p.certificatesEarned||[]).length >= 1 },
  { id:"week_warrior", title:"Week Warrior", desc:"Reach a 7-day learning streak", icon:"Flame", check:(p)=> (p.streak?.longest||0) >= 7 },
  { id:"bookworm", title:"Bookworm", desc:"Bookmark 5 lessons", icon:"Bookmark", check:(p)=> (p.bookmarks||[]).length >= 5 },
  { id:"note_taker", title:"Note Taker", desc:"Save notes on 3 lessons", icon:"StickyNote", check:(p)=> Object.keys(p.notes||{}).length >= 3 },
  { id:"glossary_explorer", title:"Glossary Explorer", desc:"View 10 glossary terms", icon:"BookOpen", check:(p)=> (p.glossaryViewed||[]).length >= 10 },
  { id:"riba_free_thinker", title:"Riba-Free Thinker", desc:"Master the Riba lesson (80%+ on its quiz)", icon:"ShieldCheck", check:(p)=> p.completedLessons.includes("l3") && p.quizAttempts?.l3 && (p.quizAttempts.l3.score/p.quizAttempts.l3.total) >= 0.8 },
];

const ICONS = { Sparkles, Star, GraduationCap, TrendingUp, Trophy, Flame, Bookmark, StickyNote, BookOpen, ShieldCheck };
const TOTAL_LESSONS = LESSONS.length;

/* =========================================================================
   MARKETPLACE — creator uploads, a demo checkout, and a social feed.
   Scoped deliberately to Islamic-finance-relevant supplementary content
   (extra courses, guides, templates) rather than a fully general
   marketplace, to stay coherent with the app's purpose. Payments here are
   a clearly labeled simulation — see the "Demo Mode" notice throughout —
   because this environment has no real payment gateway or file hosting.
   ========================================================================= */

const MARKET_CATEGORIES = [
  { id: "courses", en: "Advanced Courses" },
  { id: "guides", en: "Study Guides" },
  { id: "templates", en: "Templates & Calculators" },
  { id: "cases", en: "Case Studies" },
  { id: "arabic", en: "Arabic & Terminology" },
];
const CREATOR_SHARE = 0.9; // mirrors "keep up to 90%" — the other 10% is the simulated platform fee

/* =========================================================================
   INTERNATIONALIZATION
   Full UI translation (English, Swahili, Arabic, French) covering every
   learner-facing screen, plus course/module/achievement/glossary metadata.
   Lessons l1–l3 (the Beginner course's opening trio) and their quizzes are
   fully translated as a demonstrated, real pattern; the remaining lessons
   show English with a clear "not yet translated" notice rather than a
   rushed machine pass over nuanced fiqh terminology. Qur'anic citations
   quoted in Arabic below (2:275, 5:1) were checked against source text
   before inclusion; other references follow the same paraphrase-with-
   attribution approach already used in the English content.
   ========================================================================= */

const LANGUAGES = [
  { code: "en", native: "English" },
  { code: "sw", native: "Kiswahili" },
  { code: "ar", native: "العربية" },
  { code: "fr", native: "Français" },
];
const RTL_LANGS = ["ar"];

const UI_STRINGS = {
  app_name: { en:"Islamic Finance Academy", sw:"Chuo cha Fedha za Kiislamu", ar:"أكاديمية التمويل الإسلامي", fr:"Académie de la Finance Islamique" },
  nav_home: { en:"Home", sw:"Nyumbani", ar:"الرئيسية", fr:"Accueil" },
  nav_learn: { en:"Learn", sw:"Jifunze", ar:"تعلّم", fr:"Apprendre" },
  nav_glossary: { en:"Glossary", sw:"Kamusi", ar:"المصطلحات", fr:"Glossaire" },
  nav_saved: { en:"Saved", sw:"Yaliyohifadhiwa", ar:"المحفوظات", fr:"Enregistrés" },
  nav_profile: { en:"Profile", sw:"Wasifu", ar:"الملف الشخصي", fr:"Profil" },

  onboarding_tagline: { en:"Learn riba-free finance from the ground up — at your own pace, with your progress saved as you go.", sw:"Jifunze fedha zisizo na riba tangu mwanzo — kwa kasi yako mwenyewe, huku maendeleo yako yakihifadhiwa unavyoendelea.", ar:"تعلّم التمويل الخالي من الربا من الأساس — بالسرعة التي تناسبك، مع حفظ تقدمك أولًا بأول.", fr:"Apprenez la finance sans intérêt (riba) depuis les bases — à votre rythme, avec une sauvegarde automatique de votre progression." },
  onboarding_choose_language: { en:"Choose your language", sw:"Chagua lugha yako", ar:"اختر لغتك", fr:"Choisissez votre langue" },
  onboarding_name_label: { en:"Your name", sw:"Jina lako", ar:"اسمك", fr:"Votre nom" },
  onboarding_name_placeholder: { en:"e.g. Amina", sw:"mfano: Amina", ar:"مثال: أمينة", fr:"ex. Amina" },
  onboarding_level_label: { en:"Where should we start you?", sw:"Tuanzie wapi?", ar:"من أين نبدأ معك؟", fr:"Par où souhaitez-vous commencer ?" },
  level_Beginner: { en:"Beginner", sw:"Mwanzo", ar:"مبتدئ", fr:"Débutant" },
  level_Beginner_sub: { en:"New to Islamic finance", sw:"Mpya katika fedha za Kiislamu", ar:"جديد على التمويل الإسلامي", fr:"Nouveau dans la finance islamique" },
  level_Intermediate: { en:"Intermediate", sw:"Kati", ar:"متوسط", fr:"Intermédiaire" },
  level_Intermediate_sub: { en:"Know the basics, want the contracts", sw:"Unajua misingi, unataka mikataba", ar:"تعرف الأساسيات وتريد التوسع في العقود", fr:"Vous connaissez les bases, vous voulez les contrats" },
  level_Advanced: { en:"Advanced", sw:"Juu", ar:"متقدم", fr:"Avancé" },
  level_Advanced_sub: { en:"Ready for Sukuk, Takaful & markets", sw:"Uko tayari kwa Sukuk, Takaful na masoko", ar:"جاهز للصكوك والتكافل والأسواق", fr:"Prêt pour les Sukuk, le Takaful et les marchés" },
  onboarding_start: { en:"Start learning", sw:"Anza kujifunza", ar:"ابدأ التعلم", fr:"Commencer l'apprentissage" },
  onboarding_disclaimer_note: { en:"This creates a lightweight local profile so your progress can be saved and picked up later — it is not a secured, multi-device account. See “About this demo” in your Profile tab for details.", sw:"Hii inaunda wasifu mdogo wa ndani ili maendeleo yako yaweze kuhifadhiwa na kuendelea baadaye — si akaunti salama ya vifaa vingi. Angalia “Kuhusu onyesho hili” kwenye kichupo cha Wasifu kwa maelezo zaidi.", ar:"ينشئ هذا ملفًا شخصيًا محليًا بسيطًا حتى يتم حفظ تقدمك ومتابعته لاحقًا — وهو ليس حسابًا آمنًا متعدد الأجهزة. راجع “حول هذا العرض التجريبي” في تبويب ملفك الشخصي لمزيد من التفاصيل.", fr:"Ceci crée un profil local simplifié afin que votre progression soit sauvegardée et retrouvée plus tard — ce n'est pas un compte sécurisé multi-appareils. Voir « À propos de cette démo » dans votre onglet Profil pour plus de détails." },

  dashboard_welcome_back: { en:"Welcome back,", sw:"Karibu tena,", ar:"مرحبًا بعودتك،", fr:"Content de vous revoir," },
  dashboard_streak: { en:"day streak", sw:"mfululizo wa siku", ar:"أيام متتالية", fr:"jours de suite" },
  dashboard_xp: { en:"XP earned", sw:"XP zilizopatikana", ar:"نقاط الخبرة", fr:"XP gagnés" },
  dashboard_badges: { en:"badges", sw:"beji", ar:"شارات", fr:"badges" },
  dashboard_continue: { en:"Continue learning", sw:"Endelea kujifunza", ar:"متابعة التعلم", fr:"Continuer l'apprentissage" },
  dashboard_all_done: { en:"You've completed every lesson in the curriculum. Revisit the final assessments to earn certificates, or explore the glossary.", sw:"Umekamilisha masomo yote katika mtaala. Rudia tathmini za mwisho ili kupata vyeti, au chunguza kamusi.", ar:"لقد أكملت جميع الدروس في المنهج. راجع التقييمات النهائية للحصول على الشهادات، أو استكشف قائمة المصطلحات.", fr:"Vous avez terminé toutes les leçons du programme. Repassez les évaluations finales pour obtenir vos certificats, ou explorez le glossaire." },
  dashboard_overall_progress: { en:"Overall progress", sw:"Maendeleo kwa ujumla", ar:"التقدم الإجمالي", fr:"Progression globale" },
  dashboard_your_courses: { en:"Your courses", sw:"Kozi zako", ar:"دوراتك", fr:"Vos cours" },
  dashboard_recent_badges: { en:"Recent badges", sw:"Beji za hivi karibuni", ar:"الشارات الأخيرة", fr:"Badges récents" },

  courses_title: { en:"Courses", sw:"Kozi", ar:"الدورات", fr:"Cours" },
  modules_count: { en:"modules", sw:"moduli", ar:"وحدات", fr:"modules" },

  back: { en:"Back", sw:"Rudi", ar:"رجوع", fr:"Retour" },
  module_label: { en:"Module", sw:"Moduli", ar:"الوحدة", fr:"Module" },
  coming_soon_module: { en:"Coming soon — this module is on the roadmap and will slot into the same curriculum structure.", sw:"Inakuja hivi karibuni — moduli hii ipo kwenye mpango na itaingizwa katika muundo huohuo wa mtaala.", ar:"قريبًا — هذه الوحدة مدرجة في الخطة وستُضاف إلى نفس هيكل المنهج.", fr:"Bientôt disponible — ce module est prévu et s'intégrera dans la même structure de programme." },
  no_published_lessons: { en:"No published lessons in this module right now.", sw:"Hakuna masomo yaliyochapishwa katika moduli hii kwa sasa.", ar:"لا توجد دروس منشورة في هذه الوحدة حاليًا.", fr:"Aucune leçon publiée dans ce module pour le moment." },
  module_assessment: { en:"Module assessment", sw:"Tathmini ya moduli", ar:"تقييم الوحدة", fr:"Évaluation du module" },
  final_assessment_locked: { en:"Complete every lesson in this course to unlock the final assessment and certificate.", sw:"Kamilisha kila somo katika kozi hii ili kufungua tathmini ya mwisho na cheti.", ar:"أكمل جميع دروس هذه الدورة لفتح التقييم النهائي والشهادة.", fr:"Terminez toutes les leçons de ce cours pour débloquer l'évaluation finale et le certificat." },
  take_final_assessment: { en:"Take final assessment", sw:"Fanya tathmini ya mwisho", ar:"إجراء التقييم النهائي", fr:"Passer l'évaluation finale" },
  view_certificate: { en:"View your certificate", sw:"Angalia cheti chako", ar:"عرض شهادتك", fr:"Voir votre certificat" },
  min_read: { en:"min read", sw:"dakika za kusoma", ar:"دقيقة قراءة", fr:"min de lecture" },
  community_added: { en:"Educator-added", sw:"Imeongezwa na mwalimu", ar:"أضافه معلّم", fr:"Ajouté par un formateur" },

  lesson_completed: { en:"Completed", sw:"Imekamilika", ar:"مكتمل", fr:"Terminé" },
  lesson_objectives: { en:"Learning objectives", sw:"Malengo ya kujifunza", ar:"أهداف التعلم", fr:"Objectifs d'apprentissage" },
  lesson_examples: { en:"Examples", sw:"Mifano", ar:"أمثلة", fr:"Exemples" },
  lesson_scenario: { en:"Real-world scenario", sw:"Hali halisi ya maisha", ar:"سيناريو من واقع الحياة", fr:"Mise en situation réelle" },
  lesson_principles: { en:"Key Islamic principles", sw:"Kanuni muhimu za Kiislamu", ar:"المبادئ الإسلامية الأساسية", fr:"Principes islamiques clés" },
  lesson_summary: { en:"Summary", sw:"Muhtasari", ar:"ملخص", fr:"Résumé" },
  lesson_notes: { en:"Your notes", sw:"Maelezo yako", ar:"ملاحظاتك", fr:"Vos notes" },
  lesson_notes_placeholder: { en:"Jot down anything you want to remember about this lesson…", sw:"Andika chochote unachotaka kukumbuka kuhusu somo hili…", ar:"دوّن أي شيء تريد تذكره عن هذا الدرس…", fr:"Notez tout ce que vous souhaitez retenir de cette leçon…" },
  save_note: { en:"Save note", sw:"Hifadhi maelezo", ar:"حفظ الملاحظة", fr:"Enregistrer la note" },
  edit: { en:"Edit", sw:"Hariri", ar:"تعديل", fr:"Modifier" },
  take_the_quiz: { en:"Take the quiz", sw:"Fanya jaribio", ar:"إجراء الاختبار", fr:"Faire le quiz" },
  back_to_lesson: { en:"Back to lesson", sw:"Rudi kwenye somo", ar:"العودة إلى الدرس", fr:"Retour à la leçon" },
  next_lesson: { en:"Next lesson", sw:"Somo linalofuata", ar:"الدرس التالي", fr:"Leçon suivante" },
  not_translated_banner: { en:"This lesson isn't translated into your selected language yet — showing it in English below.", sw:"Somo hili bado halijatafsiriwa kwa lugha uliyochagua — linaonyeshwa kwa Kiingereza hapa chini.", ar:"لم تتم ترجمة هذا الدرس بعد إلى لغتك المختارة — يُعرض أدناه باللغة الإنجليزية.", fr:"Cette leçon n'est pas encore traduite dans la langue choisie — elle s'affiche ci-dessous en anglais." },

  of_connector: { en:"of", sw:"ya", ar:"من", fr:"sur" },
  question_label: { en:"Question", sw:"Swali", ar:"سؤال", fr:"Question" },
  correct_suffix: { en:"correct", sw:"sahihi", ar:"إجابة صحيحة", fr:"bonnes réponses" },
  quiz_passed_msg: { en:"nicely done.", sw:"kazi nzuri.", ar:"أحسنت.", fr:"bien joué." },
  quiz_failed_msg: { en:"below the pass mark — take another look and retry.", sw:"chini ya kiwango cha kufaulu — pitia tena kisha jaribu upya.", ar:"أقل من درجة النجاح — راجع الدرس وأعد المحاولة.", fr:"en dessous du seuil de réussite — revoyez la leçon et réessayez." },
  why_label: { en:"Why:", sw:"Kwa nini:", ar:"السبب:", fr:"Pourquoi :" },
  submit_answers: { en:"Submit answers", sw:"Wasilisha majibu", ar:"إرسال الإجابات", fr:"Valider les réponses" },
  retry_quiz: { en:"Retry quiz", sw:"Jaribu tena", ar:"إعادة الاختبار", fr:"Recommencer le quiz" },

  certificate_title: { en:"Certificate of Completion", sw:"Cheti cha Kukamilisha", ar:"شهادة إتمام", fr:"Certificat de réussite" },
  certificate_this_certifies: { en:"This certifies that", sw:"Hii inathibitisha kwamba", ar:"تشهد هذه الوثيقة بأن", fr:"Ceci certifie que" },
  certificate_has_completed: { en:"has successfully completed", sw:"amekamilisha kwa mafanikio", ar:"قد أتم بنجاح", fr:"a terminé avec succès" },
  print_certificate: { en:"Print certificate", sw:"Chapisha cheti", ar:"طباعة الشهادة", fr:"Imprimer le certificat" },
  certificate_disclaimer: { en:"This certificate reflects completion of this self-study demo curriculum. It is not an accredited qualification.", sw:"Cheti hiki kinaonyesha kukamilika kwa mtaala huu wa mfano wa kujisomea. Si sifa iliyoidhinishwa rasmi.", ar:"تعكس هذه الشهادة إتمام هذا المنهج التجريبي للدراسة الذاتية. وهي ليست مؤهلاً معتمدًا.", fr:"Ce certificat atteste de l'achèvement de ce programme de démonstration en autoformation. Il ne constitue pas une qualification accréditée." },

  glossary_search_placeholder: { en:"Search terms…", sw:"Tafuta maneno…", ar:"ابحث عن مصطلح…", fr:"Rechercher un terme…" },
  glossary_no_match: { en:"No terms match your search", sw:"Hakuna neno linalolingana na utafutaji wako", ar:"لا توجد مصطلحات مطابقة لبحثك", fr:"Aucun terme ne correspond à votre recherche" },
  glossary_definition: { en:"Definition", sw:"Fasili", ar:"التعريف", fr:"Définition" },
  glossary_how: { en:"How it works", sw:"Jinsi inavyofanya kazi", ar:"كيف يعمل", fr:"Fonctionnement" },
  glossary_example: { en:"Example", sw:"Mfano", ar:"مثال", fr:"Exemple" },
  glossary_shariah: { en:"Shariah considerations", sw:"Mazingatio ya Kishariah", ar:"الاعتبارات الشرعية", fr:"Considérations relatives à la Charia" },
  glossary_related: { en:"Related lessons", sw:"Masomo yanayohusiana", ar:"دروس ذات صلة", fr:"Leçons associées" },

  search_placeholder: { en:"Search lessons, contracts, terms…", sw:"Tafuta masomo, mikataba, maneno…", ar:"ابحث عن دروس أو عقود أو مصطلحات…", fr:"Rechercher des leçons, contrats, termes…" },
  search_empty_title: { en:"Search the curriculum", sw:"Tafuta ndani ya mtaala", ar:"ابحث في المنهج", fr:"Rechercher dans le programme" },
  search_empty_sub: { en:"Try “riba”, “Sukuk”, or “Musharakah”", sw:"Jaribu “riba”, “Sukuk”, au “Musharakah”", ar:"جرّب «الربا» أو «الصكوك» أو «المشاركة»", fr:"Essayez « riba », « Sukuk » ou « Musharakah »" },
  search_no_matches: { en:"No matches", sw:"Hakuna kilicholingana", ar:"لا توجد نتائج", fr:"Aucun résultat" },
  search_lessons_hdr: { en:"Lessons", sw:"Masomo", ar:"الدروس", fr:"Leçons" },
  search_glossary_hdr: { en:"Glossary", sw:"Kamusi", ar:"المصطلحات", fr:"Glossaire" },

  bookmarks_title: { en:"Saved lessons", sw:"Masomo yaliyohifadhiwa", ar:"الدروس المحفوظة", fr:"Leçons enregistrées" },
  bookmarks_empty_title: { en:"Nothing saved yet", sw:"Hakuna kilichohifadhiwa bado", ar:"لا يوجد شيء محفوظ بعد", fr:"Rien d'enregistré pour l'instant" },
  bookmarks_empty_sub: { en:"Tap the bookmark icon on any lesson to save it here.", sw:"Gusa alama ya kuhifadhi kwenye somo lolote ili kulihifadhi hapa.", ar:"اضغط على أيقونة الحفظ في أي درس لحفظه هنا.", fr:"Appuyez sur l'icône de signet dans une leçon pour l'enregistrer ici." },

  profile_started_at: { en:"Started at {level} level", sw:"Ulianza katika kiwango cha {level}", ar:"بدأت في مستوى {level}", fr:"Débuté au niveau {level}" },
  profile_lessons_complete: { en:"lessons complete", sw:"masomo yamekamilika", ar:"دروس مكتملة", fr:"leçons terminées" },
  profile_avg_score: { en:"avg. quiz score", sw:"wastani wa alama za jaribio", ar:"متوسط درجات الاختبار", fr:"score moyen aux quiz" },
  profile_longest_streak: { en:"longest streak", sw:"mfululizo mrefu zaidi", ar:"أطول سلسلة متتالية", fr:"plus longue série" },
  profile_certificates: { en:"certificates", sw:"vyeti", ar:"شهادات", fr:"certificats" },
  profile_achievements: { en:"Achievements", sw:"Mafanikio", ar:"الإنجازات", fr:"Récompenses" },
  profile_language: { en:"Language", sw:"Lugha", ar:"اللغة", fr:"Langue" },
  profile_content_studio: { en:"Content Studio (admin preview)", sw:"Studio ya Maudhui (muonekano wa msimamizi)", ar:"استوديو المحتوى (معاينة للمشرف)", fr:"Studio de contenu (aperçu administrateur)" },
  about_demo: { en:"About this demo", sw:"Kuhusu onyesho hili", ar:"حول هذا العرض التجريبي", fr:"À propos de cette démo" },
  about_demo_p1: { en:"Your name and progress here are stored locally to this app rather than behind a secured, multi-device account with password sign-in — that's a deliberate simplification for this prototype.", sw:"Jina lako na maendeleo yako hapa vinahifadhiwa ndani ya programu hii badala ya akaunti salama ya vifaa vingi yenye kuingia kwa nenosiri — hii ni urahisishaji wa makusudi kwa mfano huu.", ar:"يتم تخزين اسمك وتقدمك هنا محليًا داخل هذا التطبيق، وليس ضمن حساب آمن متعدد الأجهزة بتسجيل دخول بكلمة مرور — وهذا تبسيط مقصود لهذا النموذج الأولي.", fr:"Votre nom et votre progression sont stockés localement dans cette application plutôt que derrière un compte sécurisé multi-appareils avec mot de passe — c'est une simplification volontaire pour ce prototype." },
  about_demo_p2: { en:"A production build would add real accounts (hashed passwords, sessions), a hosted database, and access-controlled admin roles — all specified in the accompanying technical blueprint.", sw:"Toleo la uzalishaji lingeongeza akaunti halisi (manenosiri yaliyosimbwa, vipindi), hifadhidata iliyowekwa mtandaoni, na majukumu ya msimamizi yenye udhibiti wa ufikiaji — yote yameainishwa katika mwongozo wa kiufundi unaoambatana.", ar:"سيضيف الإصدار الإنتاجي حسابات حقيقية (كلمات مرور مشفّرة، جلسات دخول)، وقاعدة بيانات مستضافة، وأدوار إدارية محكومة بالصلاحيات — وكل ذلك موضّح في المخطط التقني المرفق.", fr:"Une version de production ajouterait de vrais comptes (mots de passe hachés, sessions), une base de données hébergée et des rôles administrateur à accès contrôlé — tout est détaillé dans le plan technique joint." },
  reset_progress: { en:"Reset all progress", sw:"Weka upya maendeleo yote", ar:"إعادة تعيين كل التقدم", fr:"Réinitialiser toute la progression" },
  reset_confirm: { en:"This clears your progress, bookmarks, and notes. This can't be undone.", sw:"Hii itafuta maendeleo, alama za kuhifadhi, na maelezo yako. Hatua hii haiwezi kutenduliwa.", ar:"سيؤدي هذا إلى مسح تقدمك والمحفوظات والملاحظات. لا يمكن التراجع عن هذا الإجراء.", fr:"Cela effacera votre progression, vos signets et vos notes. Cette action est irréversible." },
  cancel: { en:"Cancel", sw:"Ghairi", ar:"إلغاء", fr:"Annuler" },
  yes_reset: { en:"Yes, reset", sw:"Ndiyo, weka upya", ar:"نعم، إعادة التعيين", fr:"Oui, réinitialiser" },

  disclaimer_text: { en:"This app is for general education only and is not personalised financial, legal, or religious advice. Consult a qualified scholar or advisor for decisions specific to your situation.", sw:"Programu hii ni kwa ajili ya elimu ya jumla tu na si ushauri wa kibinafsi wa kifedha, kisheria, au kidini. Wasiliana na mwanachuoni au mshauri mwenye ujuzi kwa maamuzi yanayohusu hali yako mahususi.", ar:"هذا التطبيق مخصص للتثقيف العام فقط وليس استشارة مالية أو قانونية أو دينية شخصية. يُرجى استشارة عالم شرعي أو مستشار مؤهل فيما يخص قراراتك الخاصة.", fr:"Cette application est destinée uniquement à l'éducation générale et ne constitue pas un conseil financier, juridique ou religieux personnalisé. Consultez un savant ou un conseiller qualifié pour toute décision propre à votre situation." },
  achievement_unlocked: { en:"Achievement unlocked", sw:"Mafanikio yamefunguliwa", ar:"تم فتح إنجاز", fr:"Succès débloqué" },
  save_error_banner: { en:"Progress couldn't be saved just now — keep going, and it'll retry on your next action.", sw:"Maendeleo hayakuweza kuhifadhiwa kwa sasa — endelea, itajaribu tena kwenye kitendo chako kijacho.", ar:"تعذّر حفظ التقدم الآن — تابع، وستتم إعادة المحاولة مع إجرائك التالي.", fr:"La progression n'a pas pu être enregistrée à l'instant — continuez, une nouvelle tentative aura lieu à votre prochaine action." },

  admin_title: { en:"Content Studio", sw:"Studio ya Maudhui", ar:"استوديو المحتوى", fr:"Studio de contenu" },
  admin_subtitle: { en:"A preview of admin content management. In production this screen would sit behind a real admin role check on the server — here it's open so you can try the workflow.", sw:"Muonekano wa usimamizi wa maudhui. Katika toleo halisi, skrini hii ingekuwa nyuma ya ukaguzi halisi wa jukumu la msimamizi kwenye seva — hapa iko wazi ili uweze kujaribu mtiririko wa kazi.", ar:"معاينة لإدارة المحتوى. في الإنتاج الفعلي، ستكون هذه الشاشة محمية بتحقق حقيقي من صلاحية المشرف على الخادم — وهنا هي مفتوحة لتتمكن من تجربة سير العمل.", fr:"Un aperçu de la gestion de contenu administrateur. En production, cet écran serait protégé par une vérification réelle du rôle administrateur côté serveur — ici, il est ouvert pour que vous puissiez essayer le fonctionnement." },
  admin_shared_notice: { en:"Changes on this screen are stored as shared data — visible to anyone else using this app, not just you.", sw:"Mabadiliko kwenye skrini hii yanahifadhiwa kama data inayoshirikiwa — yanaonekana kwa mtu mwingine yeyote anayetumia programu hii, si wewe tu.", ar:"يتم تخزين التغييرات في هذه الشاشة كبيانات مشتركة — تظهر لأي شخص آخر يستخدم هذا التطبيق، وليس لك وحدك.", fr:"Les modifications de cet écran sont enregistrées comme données partagées — visibles par toute autre personne utilisant cette application, pas seulement vous." },
  admin_lesson_publish: { en:"Lesson publish status", sw:"Hali ya uchapishaji wa masomo", ar:"حالة نشر الدروس", fr:"Statut de publication des leçons" },
  published: { en:"Published", sw:"Imechapishwa", ar:"منشور", fr:"Publié" },
  unpublished: { en:"Unpublished", sw:"Haijachapishwa", ar:"غير منشور", fr:"Non publié" },
  admin_add_glossary: { en:"Add a glossary term", sw:"Ongeza neno la kamusi", ar:"إضافة مصطلح جديد", fr:"Ajouter un terme au glossaire" },
  admin_add_term_button: { en:"Add term", sw:"Ongeza neno", ar:"إضافة المصطلح", fr:"Ajouter le terme" },
  admin_custom_terms: { en:"Custom terms added", sw:"Maneno maalum yaliyoongezwa", ar:"المصطلحات المخصصة المضافة", fr:"Termes personnalisés ajoutés" },
  admin_educator_title: { en:"Educator lessons", sw:"Masomo ya waelimishaji", ar:"دروس المعلمين", fr:"Leçons des formateurs" },
  admin_educator_sub: { en:"Add a full lesson of your own — pick which module it belongs to (the “coming soon” ones too), write the content, and add a short quiz. It publishes immediately for every learner using this app.", sw:"Ongeza somo lako kamili — chagua moduli linalohusika (ikiwa ni pamoja na yale “yanayokuja hivi karibuni”), andika maudhui, na ongeza jaribio fupi. Litachapishwa mara moja kwa kila mwanafunzi anayetumia programu hii.", ar:"أضف درسًا كاملاً من إنشائك — اختر الوحدة التي ينتمي إليها (بما في ذلك الوحدات “القادمة قريبًا”)، اكتب المحتوى، وأضف اختبارًا قصيرًا. يُنشر فورًا لكل متعلم يستخدم هذا التطبيق.", fr:"Ajoutez votre propre leçon complète — choisissez le module auquel elle appartient (y compris ceux « à venir »), rédigez le contenu et ajoutez un court quiz. Elle est publiée immédiatement pour tous les apprenants de cette application." },
  educator_name_label: { en:"Your name (shown as the lesson author)", sw:"Jina lako (litaonyeshwa kama mwandishi wa somo)", ar:"اسمك (سيظهر كمؤلف الدرس)", fr:"Votre nom (affiché comme auteur de la leçon)" },
  educator_language_label: { en:"Language you're writing in", sw:"Lugha unayoandika", ar:"اللغة التي تكتب بها", fr:"Langue de rédaction" },
  educator_module_label: { en:"Add to module", sw:"Ongeza kwenye moduli", ar:"أضف إلى الوحدة", fr:"Ajouter au module" },
  educator_title_label: { en:"Lesson title", sw:"Kichwa cha somo", ar:"عنوان الدرس", fr:"Titre de la leçon" },
  educator_minutes_label: { en:"Estimated minutes", sw:"Dakika zinazokadiriwa", ar:"الدقائق المقدرة", fr:"Durée estimée (minutes)" },
  educator_oneperline: { en:"One per line", sw:"Moja kwa kila mstari", ar:"عنصر واحد في كل سطر", fr:"Un élément par ligne" },
  educator_objectives_label: { en:"Learning objectives", sw:"Malengo ya kujifunza", ar:"أهداف التعلم", fr:"Objectifs d'apprentissage" },
  educator_intro_label: { en:"Introduction", sw:"Utangulizi", ar:"المقدمة", fr:"Introduction" },
  educator_explanation_label: { en:"Explanation (paragraphs)", sw:"Maelezo (aya)", ar:"الشرح (فقرات)", fr:"Explication (paragraphes)" },
  educator_examples_label: { en:"Examples", sw:"Mifano", ar:"أمثلة", fr:"Exemples" },
  educator_scenario_label: { en:"Real-world scenario", sw:"Hali halisi ya maisha", ar:"سيناريو من واقع الحياة", fr:"Mise en situation réelle" },
  educator_summary_label: { en:"Summary", sw:"Muhtasari", ar:"ملخص", fr:"Résumé" },
  educator_takeaways_label: { en:"Key takeaways", sw:"Mambo muhimu ya kukumbuka", ar:"أهم النقاط", fr:"Points clés à retenir" },
  educator_principles_label: { en:"Key Islamic principles", sw:"Kanuni muhimu za Kiislamu", ar:"المبادئ الإسلامية الأساسية", fr:"Principes islamiques clés" },
  educator_add_principle: { en:"+ Add a principle", sw:"+ Ongeza kanuni", ar:"+ إضافة مبدأ", fr:"+ Ajouter un principe" },
  educator_reference_placeholder: { en:"Reference (e.g. Qur'an 2:275)", sw:"Rejea (mfano: Qur'an 2:275)", ar:"المرجع (مثال: القرآن 2:275)", fr:"Référence (ex. Coran 2:275)" },
  educator_principle_text_placeholder: { en:"What does this principle say?", sw:"Kanuni hii inasemaje?", ar:"ما مضمون هذا المبدأ؟", fr:"Que dit ce principe ?" },
  educator_quiz_label: { en:"Quiz questions", sw:"Maswali ya jaribio", ar:"أسئلة الاختبار", fr:"Questions du quiz" },
  educator_add_question: { en:"+ Add a question", sw:"+ Ongeza swali", ar:"+ إضافة سؤال", fr:"+ Ajouter une question" },
  educator_question_placeholder: { en:"Question prompt", sw:"Swali", ar:"نص السؤال", fr:"Énoncé de la question" },
  educator_option_placeholder: { en:"Option", sw:"Chaguo", ar:"خيار", fr:"Option" },
  educator_mark_correct: { en:"Mark as correct answer", sw:"Weka kama jibu sahihi", ar:"تحديد كإجابة صحيحة", fr:"Marquer comme bonne réponse" },
  educator_add_option: { en:"+ Add option", sw:"+ Ongeza chaguo", ar:"+ إضافة خيار", fr:"+ Ajouter une option" },
  educator_explanation_answer_placeholder: { en:"Explanation shown after answering", sw:"Maelezo yanayoonyeshwa baada ya kujibu", ar:"شرح يظهر بعد الإجابة", fr:"Explication affichée après la réponse" },
  educator_submit: { en:"Publish lesson", sw:"Chapisha somo", ar:"نشر الدرس", fr:"Publier la leçon" },
  educator_lessons_added: { en:"Lessons added by educators", sw:"Masomo yaliyoongezwa na waelimishaji", ar:"الدروس التي أضافها المعلمون", fr:"Leçons ajoutées par des formateurs" },
  educator_by: { en:"by", sw:"na", ar:"بواسطة", fr:"par" },

  nav_market: { en:"Market", sw:"Soko", ar:"السوق", fr:"Marché" },
  marketplace_title: { en:"Marketplace", sw:"Soko", ar:"السوق", fr:"Marché" },
  marketplace_tagline: { en:"Extra courses, guides, and templates from the community — alongside the free core curriculum.", sw:"Kozi za ziada, miongozo, na violezo kutoka kwa jamii — pamoja na mtaala wa msingi wa bure.", ar:"دورات وأدلة وقوالب إضافية من المجتمع — إلى جانب المنهج الأساسي المجاني.", fr:"Cours, guides et modèles supplémentaires de la communauté — en plus du programme de base gratuit." },
  demo_payments_notice: { en:"Demo marketplace — purchases and payouts are simulated; no real money moves.", sw:"Soko la onyesho — manunuzi na malipo ni ya kuiga; hakuna fedha halisi inayohamishwa.", ar:"سوق تجريبي — عمليات الشراء والمدفوعات هنا محاكاة، ولا يتم تحويل أموال حقيقية.", fr:"Marché de démonstration — les achats et paiements sont simulés ; aucun argent réel n'est transféré." },
  market_scope_notice: { en:"To keep this focused, products here should be Islamic-finance related — extra courses, guides, or templates.", sw:"Ili kubaki kwenye lengo, bidhaa hapa zinapaswa kuhusiana na fedha za Kiislamu — kozi za ziada, miongozo, au violezo.", ar:"للحفاظ على التركيز، ينبغي أن تكون المنتجات هنا متعلقة بالتمويل الإسلامي — دورات إضافية أو أدلة أو قوالب.", fr:"Pour rester ciblé, les produits ici doivent être liés à la finance islamique — cours supplémentaires, guides ou modèles." },
  become_creator: { en:"Become a Creator", sw:"Kuwa Muumbaji", ar:"كن صانع محتوى", fr:"Devenir créateur" },
  free_label: { en:"Free", sw:"Bure", ar:"مجاني", fr:"Gratuit" },
  buy_now: { en:"Buy Now", sw:"Nunua Sasa", ar:"اشترِ الآن", fr:"Acheter maintenant" },
  get_free: { en:"Get for Free", sw:"Pata Bure", ar:"احصل عليه مجانًا", fr:"Obtenir gratuitement" },
  by_creator: { en:"by", sw:"na", ar:"بواسطة", fr:"par" },
  category_label: { en:"Category", sw:"Kategoria", ar:"الفئة", fr:"Catégorie" },
  all_categories: { en:"All categories", sw:"Kategoria zote", ar:"جميع الفئات", fr:"Toutes les catégories" },
  sales_count_label: { en:"sales", sw:"mauzo", ar:"مبيعات", fr:"ventes" },
  followers_count_label: { en:"followers", sw:"wafuasi", ar:"متابعون", fr:"abonnés" },
  follow_action: { en:"Follow", sw:"Fuata", ar:"متابعة", fr:"Suivre" },
  following_action: { en:"Following", sw:"Unafuata", ar:"متابَع", fr:"Abonné(e)" },
  view_store: { en:"View store", sw:"Angalia duka", ar:"عرض المتجر", fr:"Voir la boutique" },
  checkout_title: { en:"Checkout", sw:"Malipo", ar:"الدفع", fr:"Paiement" },
  demo_mode_banner: { en:"Demo Mode: this simulates a purchase for demonstration — no real charge is made.", sw:"Hali ya Onyesho: hii inaiga ununuzi kwa maonyesho — hakuna malipo halisi yanayofanyika.", ar:"وضع تجريبي: هذا محاكاة لعملية شراء لأغراض العرض — لا يتم خصم أي مبلغ حقيقي.", fr:"Mode démo : ceci simule un achat à des fins de démonstration — aucun paiement réel n'est effectué." },
  payment_method_label: { en:"Payment method (demo)", sw:"Njia ya malipo (onyesho)", ar:"طريقة الدفع (تجريبي)", fr:"Moyen de paiement (démo)" },
  confirm_purchase: { en:"Confirm Purchase (Demo)", sw:"Thibitisha Ununuzi (Onyesho)", ar:"تأكيد الشراء (تجريبي)", fr:"Confirmer l'achat (démo)" },
  purchase_success: { en:"Purchase confirmed — it's now in your Library.", sw:"Ununuzi umethibitishwa — sasa upo kwenye Maktaba yako.", ar:"تم تأكيد الشراء — أصبح الآن في مكتبتك.", fr:"Achat confirmé — il est maintenant dans votre bibliothèque." },
  my_library: { en:"My Library", sw:"Maktaba Yangu", ar:"مكتبتي", fr:"Ma bibliothèque" },
  library_empty: { en:"Nothing purchased yet", sw:"Bado hujanunua chochote", ar:"لم تشترِ شيئًا بعد", fr:"Rien d'acheté pour l'instant" },
  resource_link_label: { en:"Resource link", sw:"Kiungo cha rasilimali", ar:"رابط المورد", fr:"Lien de la ressource" },
  open_resource: { en:"Open resource", sw:"Fungua rasilimali", ar:"افتح المورد", fr:"Ouvrir la ressource" },
  creator_dashboard: { en:"Creator Dashboard", sw:"Dashibodi ya Muumbaji", ar:"لوحة تحكم المبدع", fr:"Tableau de bord créateur" },
  total_earnings_demo: { en:"Total earnings (demo)", sw:"Mapato yote (onyesho)", ar:"إجمالي الأرباح (تجريبي)", fr:"Revenus totaux (démo)" },
  your_products: { en:"Your products", sw:"Bidhaa zako", ar:"منتجاتك", fr:"Vos produits" },
  upload_product: { en:"Upload a Product", sw:"Pakia Bidhaa", ar:"رفع منتج", fr:"Publier un produit" },
  product_title_label: { en:"Product title", sw:"Kichwa cha bidhaa", ar:"عنوان المنتج", fr:"Titre du produit" },
  product_description_label: { en:"Description", sw:"Maelezo", ar:"الوصف", fr:"Description" },
  price_label: { en:"Price (TZS, 0 = free)", sw:"Bei (TZS, 0 = bure)", ar:"السعر (شلن تنزاني، 0 = مجاني)", fr:"Prix (TZS, 0 = gratuit)" },
  creator_name_label: { en:"Creator / store name", sw:"Jina la muumbaji / duka", ar:"اسم المبدع / المتجر", fr:"Nom du créateur / de la boutique" },
  creator_bio_label: { en:"Short bio", sw:"Wasifu mfupi", ar:"نبذة مختصرة", fr:"Courte biographie" },
  publish_product: { en:"Publish Product", sw:"Chapisha Bidhaa", ar:"نشر المنتج", fr:"Publier le produit" },
  feed_title: { en:"Community Feed", sw:"Mlisho wa Jamii", ar:"التغذية المجتمعية", fr:"Fil communautaire" },
  like_action: { en:"Like", sw:"Penda", ar:"إعجاب", fr:"J'aime" },
  comment_placeholder: { en:"Write a comment…", sw:"Andika maoni…", ar:"اكتب تعليقًا…", fr:"Écrivez un commentaire…" },
  post_comment: { en:"Post", sw:"Tuma", ar:"نشر", fr:"Publier" },
  published_new_product: { en:"published a new product", sw:"amechapisha bidhaa mpya", ar:"نشر منتجًا جديدًا", fr:"a publié un nouveau produit" },
  suggested_creators: { en:"Suggested Creators", sw:"Waumbaji Wanaopendekezwa", ar:"مبدعون مقترحون", fr:"Créateurs suggérés" },
  trending_products: { en:"Trending", sw:"Yanayovuma", ar:"الرائج", fr:"Tendance" },
  newest_products: { en:"New Arrivals", sw:"Mapya", ar:"وصل حديثًا", fr:"Nouveautés" },
  market_search_placeholder: { en:"Search the marketplace…", sw:"Tafuta sokoni…", ar:"ابحث في السوق…", fr:"Rechercher dans le marché…" },
  already_creator_notice: { en:"You're already registered as a creator.", sw:"Tayari umesajiliwa kama muumbaji.", ar:"أنت مسجل بالفعل كمبدع.", fr:"Vous êtes déjà inscrit(e) en tant que créateur(rice)." },
  owned_badge: { en:"Owned", sw:"Umenunua", ar:"مملوك", fr:"Acquis" },
  no_products_yet: { en:"No products in this category yet", sw:"Hakuna bidhaa bado katika kategoria hii", ar:"لا توجد منتجات بعد في هذه الفئة", fr:"Aucun produit dans cette catégorie pour le moment" },
  all_products: { en:"All products", sw:"Bidhaa zote", ar:"جميع المنتجات", fr:"Tous les produits" },

  login_title: { en:"Log In", sw:"Ingia", ar:"تسجيل الدخول", fr:"Se connecter" },
  signup_title: { en:"Sign Up", sw:"Jisajili", ar:"إنشاء حساب", fr:"S'inscrire" },
  email_label: { en:"Email", sw:"Barua pepe", ar:"البريد الإلكتروني", fr:"E-mail" },
  password_label: { en:"Password", sw:"Nenosiri", ar:"كلمة المرور", fr:"Mot de passe" },
  confirm_password_label: { en:"Confirm password", sw:"Thibitisha nenosiri", ar:"تأكيد كلمة المرور", fr:"Confirmer le mot de passe" },
  signup_as_admin: { en:"Sign up as an admin / educator", sw:"Jisajili kama msimamizi / mwalimu", ar:"التسجيل كمشرف / معلّم", fr:"S'inscrire en tant qu'administrateur / formateur" },
  admin_code_label: { en:"Admin access code", sw:"Msimbo wa ufikiaji wa msimamizi", ar:"رمز وصول المشرف", fr:"Code d'accès administrateur" },
  create_account: { en:"Create Account", sw:"Fungua Akaunti", ar:"إنشاء حساب", fr:"Créer un compte" },
  no_account_yet: { en:"Don't have an account?", sw:"Huna akaunti?", ar:"ليس لديك حساب؟", fr:"Vous n'avez pas de compte ?" },
  have_account: { en:"Already have an account?", sw:"Una akaunti tayari?", ar:"لديك حساب بالفعل؟", fr:"Vous avez déjà un compte ?" },
  switch_to_signup: { en:"Sign up", sw:"Jisajili", ar:"إنشاء حساب", fr:"S'inscrire" },
  switch_to_login: { en:"Log in", sw:"Ingia", ar:"تسجيل الدخول", fr:"Se connecter" },
  continue_step: { en:"Continue", sw:"Endelea", ar:"متابعة", fr:"Continuer" },
  back_step: { en:"Back", sw:"Rudi", ar:"رجوع", fr:"Retour" },
  auth_demo_notice: { en:"Demo authentication: your account is saved to this device/browser only — it is not a secure, server-verified login. See “About this demo” in Profile for details.", sw:"Uthibitishaji wa onyesho: akaunti yako inahifadhiwa kwenye kifaa/kivinjari hiki tu — si mfumo salama wa kuingia uliothibitishwa na seva. Angalia “Kuhusu onyesho hili” kwenye Wasifu kwa maelezo.", ar:"مصادقة تجريبية: يُحفظ حسابك على هذا الجهاز/المتصفح فقط — وهو ليس تسجيل دخول آمنًا يتم التحقق منه بواسطة خادم. راجع “حول هذا العرض التجريبي” في الملف الشخصي لمزيد من التفاصيل.", fr:"Authentification de démonstration : votre compte est enregistré uniquement sur cet appareil/navigateur — ce n'est pas une connexion sécurisée vérifiée par un serveur. Voir « À propos de cette démo » dans le Profil pour plus de détails." },
  login_error: { en:"No matching account found on this device. Try signing up instead.", sw:"Hakuna akaunti inayolingana iliyopatikana kwenye kifaa hiki. Jaribu kujisajili badala yake.", ar:"لم يتم العثور على حساب مطابق على هذا الجهاز. جرّب إنشاء حساب جديد بدلاً من ذلك.", fr:"Aucun compte correspondant trouvé sur cet appareil. Essayez plutôt de vous inscrire." },
  signup_exists_error: { en:"An account already exists on this device. Log in instead, or reset it from Profile.", sw:"Akaunti tayari ipo kwenye kifaa hiki. Ingia badala yake, au uweke upya kutoka Wasifu.", ar:"يوجد حساب بالفعل على هذا الجهاز. سجّل الدخول بدلاً من ذلك، أو أعد ضبطه من الملف الشخصي.", fr:"Un compte existe déjà sur cet appareil. Connectez-vous plutôt, ou réinitialisez-le depuis le Profil." },
  invalid_admin_code: { en:"That admin access code isn't correct.", sw:"Msimbo huo wa ufikiaji wa msimamizi si sahihi.", ar:"رمز وصول المشرف هذا غير صحيح.", fr:"Ce code d'accès administrateur est incorrect." },
  passwords_no_match: { en:"Passwords don't match.", sw:"Manenosiri hayafanani.", ar:"كلمتا المرور غير متطابقتين.", fr:"Les mots de passe ne correspondent pas." },
  password_too_short: { en:"Password should be at least 6 characters.", sw:"Nenosiri liwe na herufi angalau 6.", ar:"يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.", fr:"Le mot de passe doit comporter au moins 6 caractères." },
  log_out: { en:"Log Out", sw:"Toka", ar:"تسجيل الخروج", fr:"Se déconnecter" },
  admin_badge: { en:"Admin", sw:"Msimamizi", ar:"مشرف", fr:"Administrateur" },
  learner_badge: { en:"Learner", sw:"Mwanafunzi", ar:"متعلّم", fr:"Apprenant(e)" },
  locked_level_title: { en:"Not unlocked yet", sw:"Bado haijafunguliwa", ar:"لم يُفتح بعد", fr:"Pas encore débloqué" },
  locked_level_body: { en:"This is part of a level above where you started. Complete your current course to unlock it, or change your level in Profile.", sw:"Hii ni sehemu ya kiwango cha juu zaidi ya ulipoanzia. Kamilisha kozi yako ya sasa ili kuifungua, au badilisha kiwango chako kwenye Wasifu.", ar:"هذا جزء من مستوى أعلى من المستوى الذي بدأت منه. أكمل دورتك الحالية لفتحه، أو غيّر مستواك من الملف الشخصي.", fr:"Ceci fait partie d'un niveau supérieur à celui par lequel vous avez commencé. Terminez votre cours actuel pour le débloquer, ou changez de niveau dans le Profil." },
  locked_course_note: { en:"Locked until you finish the level below", sw:"Imefungwa hadi ukamilishe kiwango kilicho chini yake", ar:"مقفل حتى تُنهي المستوى الذي قبله", fr:"Verrouillé jusqu'à ce que vous terminiez le niveau précédent" },
  change_level_label: { en:"Learning level", sw:"Kiwango cha kujifunza", ar:"مستوى التعلم", fr:"Niveau d'apprentissage" },
  change_level_note: { en:"Changes what's unlocked right away — moving up skips ahead, moving down keeps your progress but re-locks advanced content.", sw:"Inabadilisha kinachofunguliwa mara moja — kwenda juu kunaruka mbele, kushuka chini kunahifadhi maendeleo yako lakini kunafunga tena maudhui ya juu.", ar:"يغيّر هذا ما هو مفتوح فورًا — الانتقال لأعلى يتخطى محتوى، والانتقال لأسفل يحافظ على تقدمك لكنه يعيد قفل المحتوى المتقدم.", fr:"Modifie immédiatement ce qui est débloqué — monter saute du contenu, descendre conserve votre progression mais reverrouille le contenu avancé." },
  platform_revenue: { en:"Platform revenue (10% commission, demo)", sw:"Mapato ya jukwaa (kamisheni ya 10%, onyesho)", ar:"إيرادات المنصة (عمولة 10٪، تجريبي)", fr:"Revenus de la plateforme (commission de 10 %, démo)" },
  admin_dashboard_title: { en:"Admin Dashboard", sw:"Dashibodi ya Msimamizi", ar:"لوحة تحكم المشرف", fr:"Tableau de bord administrateur" },
  total_creators_label: { en:"creators", sw:"waumbaji", ar:"مبدعون", fr:"créateurs" },
  total_products_label: { en:"products", sw:"bidhaa", ar:"منتجات", fr:"produits" },
  total_platform_sales: { en:"total marketplace sales", sw:"mauzo yote ya sokoni", ar:"إجمالي مبيعات السوق", fr:"ventes totales sur le marché" },
  view_admin_dashboard: { en:"Platform Revenue & Stats", sw:"Mapato na Takwimu za Jukwaa", ar:"إيرادات وإحصاءات المنصة", fr:"Revenus et statistiques de la plateforme" },
  trouble_signing_in: { en:"Trouble signing in?", sw:"Una tatizo la kuingia?", ar:"هل تواجه مشكلة في تسجيل الدخول؟", fr:"Un problème pour vous connecter ?" },
  reset_account_explainer: { en:"This clears any account and progress saved on this device so you can start fresh. Use this if Sign Up says an account already exists but Log In won't accept your details.", sw:"Hii itafuta akaunti na maendeleo yoyote yaliyohifadhiwa kwenye kifaa hiki ili uweze kuanza upya. Tumia hii ikiwa Jisajili inasema akaunti tayari ipo lakini Ingia haikubali maelezo yako.", ar:"سيؤدي هذا إلى مسح أي حساب وتقدم محفوظ على هذا الجهاز حتى تتمكن من البدء من جديد. استخدم هذا إذا كان \"إنشاء حساب\" يقول إن الحساب موجود بالفعل لكن \"تسجيل الدخول\" لا يقبل بياناتك.", fr:"Ceci efface tout compte et toute progression enregistrés sur cet appareil afin que vous puissiez repartir à zéro. Utilisez ceci si l'inscription indique qu'un compte existe déjà mais que la connexion refuse vos identifiants." },
  reset_account_action: { en:"Reset this device's account", sw:"Weka upya akaunti ya kifaa hiki", ar:"إعادة تعيين حساب هذا الجهاز", fr:"Réinitialiser le compte de cet appareil" },
};

function t(lang, key, vars) {
  const entry = UI_STRINGS[key];
  let str = (entry && (entry[lang] || entry.en)) || key;
  if (vars) Object.entries(vars).forEach(([k, v]) => { str = str.replace(`{${k}}`, v); });
  return str;
}

const COURSE_I18N = {
  beginner: { title: { sw:"Misingi ya Fedha za Kiislamu", ar:"أساسيات التمويل الإسلامي", fr:"Fondements de la Finance Islamique" }, tagline: { sw:"Anzia hapa: mawazo ya msingi yanayofanya fedha za Kiislamu kuwa tofauti.", ar:"ابدأ من هنا: الأفكار الأساسية التي تميّز التمويل الإسلامي.", fr:"Commencez ici : les idées fondamentales qui distinguent la finance islamique." } },
  intermediate: { title: { sw:"Mikataba, Benki na Uwekezaji", ar:"العقود والمصرفية والاستثمار", fr:"Contrats, Banque et Investissement" }, tagline: { sw:"Jinsi mikataba inayozingatia Shariah inavyopanga fedha kihalisia.", ar:"كيف تُنظّم العقود الملتزمة بالشريعة الأموال فعليًا.", fr:"Comment les contrats conformes à la Charia structurent réellement l'argent." } },
  advanced: { title: { sw:"Taasisi na Mazoezi ya Kisasa", ar:"المؤسسات والممارسات المعاصرة", fr:"Institutions et Pratiques Contemporaines" }, tagline: { sw:"Sukuk, Takaful, masoko, na maeneo ambayo wanazuoni bado wanajadiliana.", ar:"الصكوك والتكافل والأسواق، والمسائل التي لا يزال العلماء يتناقشون فيها.", fr:"Sukuk, Takaful, marchés, et les points encore débattus par les savants." } },
};

const MODULE_I18N = {
  m1: { sw:"Utangulizi wa Fedha za Kiislamu", ar:"مقدمة في التمويل الإسلامي", fr:"Introduction à la Finance Islamique" },
  m2: { sw:"Kanuni za Kiuchumi za Kiislamu", ar:"المبادئ الاقتصادية الإسلامية", fr:"Principes Économiques Islamiques" },
  m3: { sw:"Riba", ar:"الربا", fr:"Riba" },
  m4: { sw:"Gharar", ar:"الغرر", fr:"Gharar" },
  m5: { sw:"Maysir", ar:"الميسر", fr:"Maysir" },
  m6: { sw:"Halali na Haramu Kibiashara", ar:"الحلال والحرام في الأعمال التجارية", fr:"Le Licite et l'Illicite en Affaires" },
  m7: { sw:"Mikataba ya Kiislamu", ar:"العقود الإسلامية", fr:"Contrats Islamiques" },
  m8: { sw:"Benki za Kiislamu", ar:"المصرفية الإسلامية", fr:"Banque Islamique" },
  m9: { sw:"Uwekezaji wa Kiislamu", ar:"الاستثمار الإسلامي", fr:"Investissement Islamique" },
  m10: { sw:"Sukuk", ar:"الصكوك", fr:"Sukuk" },
  m11: { sw:"Takaful", ar:"التكافل", fr:"Takaful" },
  m12: { sw:"Uwekezaji wa Soko la Hisa la Kiislamu", ar:"الاستثمار في سوق الأسهم الإسلامي", fr:"Investissement Boursier Islamique" },
  m13: { sw:"Mifumo ya Biashara Halali", ar:"نماذج الأعمال الحلال", fr:"Modèles d'Affaires Halal" },
  m14: { sw:"Fedha Binafsi za Kiislamu", ar:"التمويل الشخصي الإسلامي", fr:"Finance Personnelle Islamique" },
  m15: { sw:"Masuala ya Kisasa ya Fedha za Kiislamu", ar:"قضايا معاصرة في التمويل الإسلامي", fr:"Enjeux Contemporains de la Finance Islamique" },
  m16: { sw:"Fedha za Kiislamu Kivitendo", ar:"التمويل الإسلامي التطبيقي", fr:"Finance Islamique Pratique" },
};

const MARKET_CATEGORY_I18N = {
  courses: { sw:"Kozi za Ziada", ar:"دورات متقدمة", fr:"Cours avancés" },
  guides: { sw:"Miongozo ya Kusoma", ar:"أدلة دراسية", fr:"Guides d'étude" },
  templates: { sw:"Violezo na Vikokotoo", ar:"قوالب وحاسبات", fr:"Modèles et calculateurs" },
  cases: { sw:"Uchunguzi wa Kesi", ar:"دراسات حالة", fr:"Études de cas" },
  arabic: { sw:"Kiarabu na Istilahi", ar:"العربية والمصطلحات", fr:"Arabe et terminologie" },
};

const ACHIEVEMENT_I18N = {
  first_steps: { title:{sw:"Hatua za Kwanza",ar:"الخطوات الأولى",fr:"Premiers Pas"}, desc:{sw:"Kamilisha somo lako la kwanza",ar:"أكمل درسك الأول",fr:"Terminez votre première leçon"} },
  quiz_whiz: { title:{sw:"Bingwa wa Jaribio",ar:"عبقري الاختبارات",fr:"Champion du Quiz"}, desc:{sw:"Pata alama 100% kwenye jaribio lolote",ar:"احصل على 100٪ في أي اختبار",fr:"Obtenez 100 % à n'importe quel quiz"} },
  contract_scholar: { title:{sw:"Msomi wa Mikataba",ar:"خبير العقود",fr:"Expert des Contrats"}, desc:{sw:"Kamilisha masomo yote matano ya Mikataba ya Kiislamu",ar:"أكمل جميع دروس العقود الإسلامية الخمسة",fr:"Terminez les cinq leçons sur les Contrats Islamiques"} },
  halfway_hero: { title:{sw:"Shujaa wa Katikati",ar:"بطل منتصف الطريق",fr:"Héros à Mi-Parcours"}, desc:{sw:"Fikia 50% ya ukamilishaji wa masomo kwa ujumla",ar:"الوصول إلى إتمام 50٪ من الدروس إجمالاً",fr:"Atteignez 50 % de progression globale"} },
  course_champion: { title:{sw:"Bingwa wa Kozi",ar:"بطل الدورة",fr:"Champion du Cours"}, desc:{sw:"Faulu tathmini ya mwisho ya kozi",ar:"اجتز التقييم النهائي لإحدى الدورات",fr:"Réussissez l'évaluation finale d'un cours"} },
  week_warrior: { title:{sw:"Shujaa wa Wiki",ar:"بطل الأسبوع",fr:"Guerrier de la Semaine"}, desc:{sw:"Fikia mfululizo wa siku 7 za kujifunza",ar:"حقق سلسلة تعلّم لمدة 7 أيام متتالية",fr:"Atteignez une série de 7 jours d'apprentissage"} },
  bookworm: { title:{sw:"Mdudu wa Vitabu",ar:"محب القراءة",fr:"Rat de Bibliothèque"}, desc:{sw:"Hifadhi masomo 5",ar:"احفظ 5 دروس",fr:"Enregistrez 5 leçons"} },
  note_taker: { title:{sw:"Mwandishi wa Maelezo",ar:"مدوّن الملاحظات",fr:"Preneur de Notes"}, desc:{sw:"Hifadhi maelezo kwenye masomo 3",ar:"احفظ ملاحظات على 3 دروس",fr:"Enregistrez des notes sur 3 leçons"} },
  glossary_explorer: { title:{sw:"Mgunduzi wa Kamusi",ar:"مستكشف المصطلحات",fr:"Explorateur du Glossaire"}, desc:{sw:"Angalia maneno 10 ya kamusi",ar:"اطّلع على 10 مصطلحات",fr:"Consultez 10 termes du glossaire"} },
  riba_free_thinker: { title:{sw:"Mfikiriaji Asiye na Riba",ar:"المفكر الخالي من الربا",fr:"Penseur Sans Riba"}, desc:{sw:"Bobea somo la Riba (80%+ kwenye jaribio lake)",ar:"أتقن درس الربا (80٪ فأكثر في اختباره)",fr:"Maîtrisez la leçon sur le Riba (80 %+ au quiz)"} },
};

/* Full translations for the Beginner course's opening trio (l1–l3) — the
   demonstrated, complete multilingual pattern described in the file header. */
const LESSON_I18N = {
  l1: {
    sw: { title:"Fedha za Kiislamu ni Nini?",
      objectives:["Fafanua fedha za Kiislamu na kinachozifanya kuwa tofauti na fedha za kawaida","Tambua makatazo machache yanayounda kila mkataba wa Kiislamu","Ona mfano halisi wa mbadala wa Kiislamu kwa mkopo wenye riba"],
      intro:"Fedha za Kiislamu ni mfumo wa kuendesha fedha, biashara, na uwekezaji kwa namna inayolingana na Shariah (sheria ya Kiislamu). Si sarafu tofauti wala soko tofauti la hisa — ni seti tofauti ya kanuni za jinsi mikataba inavyoweza kupangwa.",
      explanation:["Kwa msingi wake, fedha za Kiislamu zinachukulia fedha kama njia ya kubadilishana, si bidhaa inayoweza kukodishwa kwa ada. Utajiri unatakiwa kupatikana kupitia biashara halisi, mali halisi, na hatari halisi — si kupitia faida ya uhakika kutokana na ukopeshaji peke yake.","Karibu kila kanuni katika fedha za Kiislamu inatokana na seti ndogo ya makatazo: riba (faida ya mkopo), gharar (kutokuwa na uhakika kupita kiasi), maysir (kamari), na uwekezaji katika sekta za haramu (zisizoruhusiwa) kama vile pombe, nguruwe, au ukopeshaji wa riba wa kawaida wenyewe.","Kwa kuwa riba haiwezekani, taasisi za kifedha za Kiislamu badala yake hutumia mikataba iliyojengwa juu ya biashara, ukodishaji, na ushirikiano — ambapo benki hupata faida ya kibiashara au kipato cha kukodisha, au inashiriki hatari halisi ya mradi, badala ya kutoza ada kwa ajili tu ya matumizi ya fedha kwa muda."],
      examples:["Mkopo wa nyumba wa kawaida: benki inakopesha $100,000 na kutoza riba mpaka ulipwe — faida ya benki haitegemei nyumba hiyo kabisa.","Mbadala wa Kiislamu (Murabahah): benki inanunua nyumba na kuiuza tena kwa mteja kwa bei ya gharama pamoja na faida iliyokubaliwa, inayolipwa kwa awamu. Bei inakuwa thabiti wakati wa kusaini — ni mauzo, si mkopo wenye ada iliyoongezwa."],
      scenario:"Mfanyabiashara mdogo mjini Mwanza anahitaji mtaji wa kuongeza bidhaa dukani mwake. Mkopeshaji wa kawaida anatoa mkopo wenye riba. Mtoa huduma wa fedha za Kiislamu badala yake anapendekeza ununuzi wa Murabahah wa bidhaa, au ushirikiano wa Mudarabah ambapo faida (na hasara) zinagawanywa. Masomo yajayo yataeleza kwa kina jinsi kila moja ya haya yanavyofanya kazi.",
      principles:[{type:"quran",ref:"Qur'an 2:275 (maana iliyofikishwa)",text:"Allah ameruhusu biashara na kukataza riba."},{type:"hadith",ref:"Jami' al-Tirmidhi (hutajwa mara kwa mara, daraja hasan)",text:"Hadithi inamueleza mfanyabiashara mwaminifu, muadilifu kuwa atakuwa katika ushirika mtukufu Siku ya Kiyama — ukumbusho kwamba biashara ya uaminifu si tu inaruhusiwa, bali inahimizwa."},{type:"scholarly",ref:"Historia ya sekta",text:"Benki za kisasa za Kiislamu zilianzishwa rasmi miaka ya 1970, huku Benki ya Dubai ya Kiislamu na Benki ya Maendeleo ya Kiislamu zote zikianzishwa mwaka 1975."}],
      summary:"Fedha za Kiislamu ni shughuli za kawaida za kiuchumi zilizoundwa upya kuzunguka orodha fupi ya makatazo — hasa riba, gharar, na maysir — zikibadilisha ukopeshaji wa riba na miundo ya biashara, ukodishaji, na ushirikiano.",
      takeaways:["Fedha ni njia ya kubadilishana, si bidhaa inayoweza kukodishwa","Riba, gharar, na maysir ni makatazo matatu ya kwanza ya kujua","Mikataba ya Kiislamu inabadilisha 'riba' na faida ya kibiashara, kodi, au hatari inayoshirikiwa"] },
    ar: { title:"ما هو التمويل الإسلامي؟",
      objectives:["حدّد معنى التمويل الإسلامي وما الذي يميّزه عن التمويل التقليدي","تعرّف على القيود القليلة التي تُشكّل كل عقد إسلامي","اطّلع على مثال واقعي لبديل إسلامي عن القرض القائم على الفائدة"],
      intro:"التمويل الإسلامي هو ممارسة إدارة المال والتجارة والاستثمار بطرق تتوافق مع الشريعة الإسلامية. فهو ليس عملة منفصلة ولا سوق أسهم منفصلًا — بل هو مجموعة مختلفة من القواعد لكيفية هيكلة الصفقات.",
      explanation:["في جوهره، يعامل التمويل الإسلامي المال كوسيلة للتبادل، لا كسلعة يمكن تأجيرها مقابل رسوم. فالثروة يُفترض أن تُكتسب من خلال تجارة حقيقية، وأصول حقيقية، ومخاطرة حقيقية — لا من خلال عائد مضمون على الإقراض وحده.","تكاد كل قاعدة في التمويل الإسلامي تعود إلى مجموعة صغيرة من المحظورات: الربا، والغرر (عدم اليقين المفرط)، والميسر (القمار)، والاستثمار في القطاعات الحرام مثل الكحول ولحم الخنزير أو الإقراض الربوي التقليدي نفسه.","ولأن الفائدة مستبعدة تمامًا، تستخدم المؤسسات المالية الإسلامية بدلاً من ذلك عقودًا مبنية على التجارة والتأجير والشراكة — حيث يحصل البنك على هامش ربح أو دخل إيجاري، أو يشارك في المخاطرة الفعلية لمشروع ما، بدلاً من فرض رسم على مجرد استخدام المال عبر الزمن."],
      examples:["الرهن العقاري التقليدي: يُقرض البنك 100,000 دولار ويفرض فائدة حتى تتم التسوية — وعائد البنك لا يعتمد على المنزل نفسه إطلاقًا.","البديل الإسلامي (المرابحة): يشتري البنك المنزل ثم يبيعه للعميل بسعر التكلفة إضافة إلى هامش ربح متفق عليه، يُسدَّد على أقساط. يكون السعر ثابتًا عند التوقيع — فهو بيع، وليس قرضًا مضافًا إليه رسم."],
      scenario:"تحتاج تاجرة صغيرة في مدينة موانزا إلى رأس مال لتجديد مخزون متجرها. يعرض عليها مُقرض تقليدي قرضًا بفائدة. أما مزوّد التمويل الإسلامي فيقترح بدلاً من ذلك شراء البضاعة عبر المرابحة، أو شراكة مضاربة يُقتسم فيها الربح (والخسارة). ستوضح الدروس اللاحقة بالتفصيل كيف يعمل كل من هذين الخيارين.",
      principles:[{type:"quran",ref:"القرآن 2: 275",text:"«وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا» — أي أن الله أباح التجارة وحرّم الربا."},{type:"hadith",ref:"جامع الترمذي (يُذكر عادة، بدرجة حسن)",text:"يصف حديثٌ التاجرَ الصادقَ الأمين بأنه يكون في صحبة الأنبياء يوم القيامة — تذكير بأن التجارة الأمينة ليست مباحة فحسب، بل مرغوب فيها."},{type:"scholarly",ref:"تاريخ الصناعة",text:"تأسست الصناعة المصرفية الإسلامية الحديثة رسميًا في السبعينيات، حيث أُنشئ بنك دبي الإسلامي والبنك الإسلامي للتنمية كلاهما عام 1975."}],
      summary:"التمويل الإسلامي هو نشاط اقتصادي تقليدي أُعيدت صياغته حول مجموعة قصيرة من المحظورات — أبرزها الربا والغرر والميسر — ليحل محل الإقراض القائم على الفائدة هياكلُ التجارة والتأجير والشراكة.",
      takeaways:["المال وسيلة للتبادل، لا سلعة يمكن تأجيرها","الربا والغرر والميسر هي المحظورات الثلاثة الأولى التي يجب معرفتها","العقود الإسلامية تستبدل «الفائدة» بهامش ربح أو إيجار أو مخاطرة مشتركة"] },
    fr: { title:"Qu'est-ce que la Finance Islamique ?",
      objectives:["Définir la finance islamique et ce qui la distingue de la finance conventionnelle","Identifier la poignée d'interdictions qui façonnent chaque contrat islamique","Voir un exemple concret d'alternative islamique à un prêt à intérêt"],
      intro:"La finance islamique consiste à gérer l'argent, le commerce et l'investissement d'une manière conforme à la Charia (loi islamique). Ce n'est ni une monnaie distincte ni une bourse distincte — c'est un ensemble différent de règles sur la façon dont les transactions peuvent être structurées.",
      explanation:["À la base, la finance islamique considère l'argent comme un moyen d'échange, et non comme un bien pouvant être loué contre rémunération. La richesse doit être acquise par le commerce réel, des actifs réels et un risque réel — et non par un rendement garanti sur le seul prêt.","Presque toutes les règles de la finance islamique découlent d'un petit ensemble d'interdictions : le riba (l'intérêt), le gharar (l'incertitude excessive), le maysir (le jeu de hasard), et l'investissement dans des secteurs haram (illicites) tels que l'alcool, le porc, ou le prêt à intérêt conventionnel lui-même.","L'intérêt étant exclu, les institutions financières islamiques utilisent plutôt des contrats fondés sur le commerce, le crédit-bail et le partenariat — où la banque gagne une marge bénéficiaire ou un revenu locatif, ou partage le risque réel d'un projet, plutôt que de facturer des frais pour le simple usage de l'argent dans le temps."],
      examples:["Prêt hypothécaire conventionnel : une banque prête 100 000 $ et facture des intérêts jusqu'au remboursement — le rendement de la banque ne dépend en rien de la maison elle-même.","Alternative islamique (Mourabaha) : la banque achète la maison et la revend au client au prix coûtant plus une marge bénéficiaire convenue, payable en plusieurs fois. Le prix est fixé à la signature — c'est une vente, pas un prêt assorti de frais."],
      scenario:"Une petite commerçante à Mwanza a besoin de capital pour réapprovisionner sa boutique. Un prêteur conventionnel lui propose un prêt à intérêt. Un prestataire de finance islamique propose plutôt un achat en Mourabaha du stock, ou un partenariat de Moudaraba où les profits (et les pertes) sont partagés. Les leçons suivantes détailleront précisément le fonctionnement de chacun de ces mécanismes.",
      principles:[{type:"quran",ref:"Coran 2:275 (sens rapporté)",text:"Allah a permis le commerce et interdit le riba."},{type:"hadith",ref:"Jami' at-Tirmidhi (souvent cité, jugé hasan)",text:"Un hadith décrit le commerçant honnête et digne de confiance comme étant, au Jour du Jugement, en noble compagnie — un rappel que le commerce honnête n'est pas seulement permis, il est encouragé."},{type:"scholarly",ref:"Histoire du secteur",text:"La banque islamique moderne s'est formalisée dans les années 1970, avec la Dubai Islamic Bank et la Banque islamique de développement toutes deux fondées en 1975."}],
      summary:"La finance islamique est une activité économique conventionnelle repensée autour d'un petit nombre d'interdictions — principalement le riba, le gharar et le maysir — remplaçant le prêt à intérêt par des structures de commerce, de crédit-bail et de partenariat.",
      takeaways:["L'argent est un moyen d'échange, pas un bien qu'on peut louer","Riba, gharar et maysir sont les trois interdictions à connaître en premier","Les contrats islamiques remplacent « l'intérêt » par une marge bénéficiaire, un loyer, ou un risque partagé"] },
  },
  l2: {
    sw: { title:"Kanuni za Msingi za Kiuchumi za Kiislamu",
      objectives:["Orodhesha kanuni zinazosimamia kila bidhaa ya fedha za Kiislamu","Eleza kwa nini ugawanaji wa hatari ni muhimu kama kanuni ya kukataza riba","Linganisha hati fungani ya kawaida na Sukuk kwa kiwango cha kimsingi"],
      intro:"Zaidi ya 'hakuna riba', uchumi wa Kiislamu unategemea kanuni kadhaa chanya — si makatazo tu — zinazounda jinsi mikataba inavyojengwa.",
      explanation:["Kanuni kuu ni pamoja na: miamala inapaswa kuungwa mkono na mali au huduma halisi (si madai ya karatasi tu); faida na hasara kwa ujumla zinapaswa kugawanywa, si kuhakikishiwa upande mmoja; utajiri unapaswa kuzunguka badala ya kujikita mahali pamoja; na mikataba lazima iheshimiwe mara ikishakubaliwa.","Kuungwa mkono na mali halisi ndiyo sababu Sukuk (angalia Moduli 10) inawakilisha umiliki katika mali halisi au mradi, wakati hati fungani ya kawaida ni deni tu la kulipa kiasi kilichowekwa pamoja na riba, bila kujali jinsi biashara ya msingi inavyofanya kazi.","Kuheshimu makubaliano kunachukuliwa kama wajibu wa kimaadili na kisheria, si utaratibu tu — hii ni sehemu ya sababu gharar (kutokuwa wazi kuhusu kilichokubaliwa hasa) inachukuliwa kwa uzito mkubwa baadaye."],
      examples:["Mwekezaji wa hati fungani ya kawaida anadaiwa kiwango cha riba kilichowekwa bila kujali mtoaji anafanya nini na fedha hizo.","Mwekezaji wa Sukuk-al-Ijarah anapata faida kutokana na kodi inayozalishwa na mali halisi iliyokodishwa — ikiwa mali hiyo haizalishi mapato, faida pia inaathiriwa."],
      scenario:"Mifuko miwili inapendekezwa kwa mwekezaji wa Kitanzania: mmoja unashikilia hati fungani za serikali za kawaida; mwingine unashikilia Sukuk zinazoungwa mkono na miundombinu ya mawasiliano iliyokodishwa. Yote miwili yanaahidi faida zinazofanana — lakini haki halisi anayomiliki kila mwekezaji ni tofauti kimsingi.",
      principles:[{type:"quran",ref:"Qur'an 5:1 (maana iliyofikishwa)",text:"Enyi mlioamini, timizeni mikataba yenu."},{type:"maxim",ref:"Kanuni ya fiqh",text:"La darar wa la dirar — hakupaswi kuwa na madhara wala kulipiza madhara — kanuni inayotumika katika sheria za kibiashara za Kiislamu kuamua kama mkataba ni wa haki kwa pande zote mbili."}],
      summary:"Uchumi wa Kiislamu umejengwa juu ya kuungwa mkono na mali, ugawanaji wa hatari, na makubaliano yenye nguvu ya kisheria — kanuni zinazoeleza miundo mahususi ya mikataba ya sekta hii, si makatazo tu.",
      takeaways:["Miamala inapaswa kuhusishwa na mali halisi au shughuli halisi za kiuchumi","Ugawanaji wa faida na hasara ni lengo la muundo, si athari ya pembeni tu","Mikataba inachukuliwa kama wajibu thabiti wa kimaadili mara ikishakubaliwa"] },
    ar: { title:"المبادئ الاقتصادية الإسلامية الأساسية",
      objectives:["عدّد المبادئ التي تقوم عليها كل منتجات التمويل الإسلامي","اشرح لماذا يُعد تقاسم المخاطر مهمًا بقدر أهمية حظر الربا","قارن بين السند التقليدي والصك على المستوى المبدئي"],
      intro:"إلى جانب «عدم وجود فائدة»، يقوم الاقتصاد الإسلامي على مجموعة من المبادئ الإيجابية — وليس المحظورات فقط — التي تُشكّل طريقة بناء العقود.",
      explanation:["من أبرز هذه المبادئ: ينبغي أن تكون المعاملات مدعومة بأصول أو خدمات حقيقية (لا مجرد مطالبات ورقية)؛ وينبغي عمومًا تقاسم الربح والخسارة، لا ضمانهما لطرف واحد؛ وينبغي أن تتداول الثروة بدلًا من أن تتركز؛ ويجب الوفاء بالعقود بمجرد الاتفاق عليها.","الدعم بالأصول هو سبب تمثيل الصك (انظر الوحدة 10) لملكية في أصل حقيقي أو مشروع، بينما السند التقليدي هو ببساطة التزام دين بسداد مبلغ ثابت مع فائدة، بصرف النظر عن أداء الجهة المصدرة.","يُعامل الوفاء بالاتفاقيات كالتزام أخلاقي وقانوني، لا مجرد إجراء شكلي — وهذا جزء من سبب التعامل بجدية بالغة مع الغرر (الغموض حول ما تم الاتفاق عليه بالضبط) لاحقًا في هذا المقرر."],
      examples:["يستحق مستثمر السند التقليدي كوبونًا ثابتًا بصرف النظر عمّا تفعله الجهة المصدرة بالمال.","يحصل مستثمر صكوك الإجارة على عائد هو الإيجار المتحقق من أصل مؤجَّر حقيقي — وإذا لم يُحقق الأصل دخلًا، يتأثر العائد كذلك."],
      scenario:"يُعرض على مستثمر تنزاني صندوقان: أحدهما يحمل سندات حكومية تقليدية؛ والآخر يحمل صكوكًا مدعومة ببنية تحتية للاتصالات مؤجَّرة. يَعِد كلاهما بعائد مماثل تقريبًا — لكن الحق الفعلي الذي يملكه كل مستثمر مختلف جوهريًا.",
      principles:[{type:"quran",ref:"القرآن 5: 1",text:"«يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ» — يا أيها الذين آمنوا، أوفوا بعقودكم والتزاماتكم."},{type:"maxim",ref:"قاعدة فقهية",text:"«لا ضرر ولا ضرار» — مبدأ يُستخدم في القانون التجاري الإسلامي للحكم على ما إذا كان العقد عادلًا للطرفين."}],
      summary:"يقوم الاقتصاد الإسلامي على الدعم بالأصول، وتقاسم المخاطر، والاتفاقيات المُلزمة — وهي مبادئ تفسر هياكل العقود المحددة في هذه الصناعة، لا مجرد قائمة محظورات.",
      takeaways:["ينبغي ربط المعاملات بأصول حقيقية أو نشاط اقتصادي حقيقي","تقاسم الربح والخسارة هدف تصميمي، لا مجرد أثر جانبي","تُعامل العقود كالتزامات أخلاقية راسخة بمجرد الاتفاق عليها"] },
    fr: { title:"Principes Économiques Islamiques Fondamentaux",
      objectives:["Énumérer les principes qui sous-tendent chaque produit de finance islamique","Expliquer pourquoi le partage du risque compte autant que l'interdiction du riba","Comparer une obligation conventionnelle et un Sukuk à un niveau de principe"],
      intro:"Au-delà de « pas d'intérêt », l'économie islamique repose sur une poignée de principes positifs — pas seulement des interdictions — qui façonnent la construction des contrats.",
      explanation:["Parmi les principes clés : les transactions doivent être adossées à des actifs ou services réels (et non de simples créances sur papier) ; le profit et la perte doivent généralement être partagés, non garantis à une seule partie ; la richesse doit circuler plutôt que se concentrer ; et les contrats doivent être honorés une fois conclus.","L'adossement à des actifs explique pourquoi un Sukuk (voir Module 10) représente une propriété dans un actif ou projet réel, tandis qu'une obligation conventionnelle est simplement une créance de dette pour rembourser une somme fixe avec intérêt, quelle que soit la performance de l'émetteur.","Le respect des engagements est traité comme une obligation morale et juridique, pas une formalité — c'est en partie pourquoi le gharar (l'ambiguïté sur ce qui a été exactement convenu) est pris tellement au sérieux plus loin dans ce cours."],
      examples:["Un investisseur en obligation conventionnelle a droit à un coupon fixe, quoi que fasse l'émetteur de l'argent.","Le rendement d'un investisseur en Sukuk al-Ijara est le loyer généré par un actif loué réel — si l'actif ne génère aucun revenu, le rendement en est affecté aussi."],
      scenario:"On propose à un investisseur tanzanien deux fonds : l'un détient des obligations d'État conventionnelles ; l'autre détient des Sukuk adossés à une infrastructure de télécommunications louée. Les deux promettent un rendement similaire — mais la créance réelle que possède chaque investisseur est fondamentalement différente.",
      principles:[{type:"quran",ref:"Coran 5:1 (sens rapporté)",text:"Ô vous qui croyez, respectez vos engagements."},{type:"maxim",ref:"Maxime juridique",text:"La darar wa la dirar — il ne doit y avoir ni préjudice ni réciprocité de préjudice — un principe utilisé dans le droit commercial islamique pour juger si un contrat est équitable pour les deux parties."}],
      summary:"L'économie islamique repose sur l'adossement à des actifs, le partage du risque et des accords contraignants — des principes qui expliquent les structures contractuelles spécifiques du secteur, pas seulement une liste d'interdictions.",
      takeaways:["Les transactions doivent être liées à des actifs réels ou à une activité économique réelle","Le partage des profits et des pertes est un objectif de conception, pas un simple effet secondaire","Les contrats sont traités comme des obligations morales fermes une fois conclus"] },
  },
  l3: {
    sw: { title:"Kuelewa Riba",
      objectives:["Fafanua riba na tofautisha aina zake mbili za kitamaduni","Eleza sababu wanazozitoa wanazuoni kwa kuikataza","Tambua riba katika hali ya kawaida ya ukopeshaji"],
      intro:"Riba kwa maana halisi inamaanisha 'ongezeko' au 'ziada'. Ni katazo la msingi zaidi katika fedha za Kiislamu — karibu kila bidhaa katika kozi hii ipo kama njia ya kugharamia mahitaji halisi bila hiyo.",
      explanation:["Fiqh ya kitamaduni inatambua aina mbili: riba al-nasi'ah, ongezeko linalotozwa kwa sababu tu ya kuchelewesha malipo (hii inahusisha riba ya kawaida ya mikopo), na riba al-fadl, ubadilishanaji usio sawa au usio wa papo hapo wa bidhaa za aina moja — kama dhahabu kwa dhahabu yenye uzito tofauti.","Sababu inayotolewa mara kwa mara ni kwamba fedha inayokopeshwa kwa faida ya uhakika, bila kushiriki hatari halisi ya mkopaji, inaruhusu utajiri kukua bila jitihada yoyote ya uzalishaji, na inaweza kumnasa mkopaji kwenye deni linaloongezeka bila kujali hali zake.","Njia mbadala za Kiislamu hazikwepi neno 'faida' — zinakwepa ada inayotozwa kwa sababu tu ya kupita kwa muda kwenye mkopo. Faida ya ziada ya Murabahah ni bei ya mauzo iliyokubaliwa mapema; riba ni ada inayoweza kuongezeka kadiri deni linavyoendelea kuwepo."],
      examples:["Riba al-nasi'ah: 'Kopa $1,000, lipa $1,100 baada ya miezi sita, au zaidi ikiwa itachukua muda mrefu zaidi.'","Riba al-fadl: kubadilishana gramu 10 za vito vya dhahabu na gramu 12 za sarafu za dhahabu, papo kwa papo, bila kuzingatia kuwa ni ubadilishanaji wa aina moja unaohitaji uzito sawa."],
      scenario:"Mfanyabiashara wa duka anapewa chaguo la mkopo wa $2,000 wenye riba ya 15% kwa miezi sita, au mpango wa Murabahah ambapo mfadhili ananunua bidhaa za $2,000 na kumuuzia kwa $2,230, zinazolipwa kwa miezi sita. Namba hizo mbili zinafanana — lakini muundo wake, na kinachotokea akichelewa kulipa, hutofautiana kwa namna ambayo masomo yajayo yataeleza.",
      principles:[{type:"quran",ref:"Qur'an 2:275 (maana iliyofikishwa)",text:"Allah ameruhusu biashara na kukataza riba."},{type:"quran",ref:"Qur'an 2:278–279 (maana iliyofikishwa)",text:"Waumini wanaamriwa kuacha chochote kilichobaki cha riba, huku wakionywa vikali kwa wale wanaoendelea, huku ikithibitishwa kuwa bado wanaweza kupata mtaji wao halisi bila kudhulumu au kudhulumiwa."},{type:"hadith",ref:"Sahih Muslim (Kitab al-Musaqah)",text:"Mtume ﷺ alieleza kuwa dhahabu, fedha, ngano, shayiri, tende, na chumvi zinaweza kubadilishwa tu na bidhaa ile ile kwa kiwango sawa, papo kwa papo; ikiwa bidhaa ni tofauti, kiwango kinaweza kujadiliwa lakini ubadilishanaji lazima ubaki wa papo hapo."}],
      summary:"Riba inajumuisha riba ya mikopo (riba al-nasi'ah) na ubadilishanaji usio sawa au uliochelewa wa bidhaa zinazofanana (riba al-fadl). Kukatazwa kwake ndiyo sababu fedha za Kiislamu zinategemea biashara, ukodishaji, na ushirikiano badala ya deni lenye riba.",
      takeaways:["Riba al-nasi'ah = riba ya kuchelewesha; riba al-fadl = ubadilishanaji usio sawa wa bidhaa zinazofanana","Faida ya uhakika, iliyowekwa, kwenye mkopo — bila kujali matokeo — ndicho kiashiria cha kuangalia","Njia mbadala za Kiislamu zinabadilisha ada-kwa-muda na bei thabiti ya mauzo au ushirikiano wa hatari inayoshirikiwa"] },
    ar: { title:"فهم الربا",
      objectives:["عرّف الربا وميّز بين نوعيه التقليديين","اشرح التعليل الذي يقدمه العلماء لتحريمه","تعرّف على الربا في سيناريو إقراض شائع"],
      intro:"الربا يعني حرفيًا «الزيادة» أو «الفائض». وهو أهم محظور أساسي في التمويل الإسلامي — فتقريبًا كل منتج في هذا المقرر موجود كوسيلة لتمويل الاحتياجات الحقيقية من دونه.",
      explanation:["يحدد الفقه التقليدي نوعين: ربا النسيئة، وهو زيادة تُفرض لمجرد تأخير السداد (وهذا يشمل الفائدة التقليدية على القروض)، وربا الفضل، وهو تبادل غير متساوٍ أو غير فوري لسلعة من نفس الفئة — كالذهب مقابل الذهب بأوزان مختلفة.","التعليل الشائع هو أن المال المُقرَض بعائد مضمون، دون أي مشاركة في المخاطرة الفعلية للمقترض، يتيح نمو الثروة دون أي جهد إنتاجي مقابل، وقد يوقع المقترض في دَين متصاعد بصرف النظر عن ظروفه.","البدائل الإسلامية لا تتجنب كلمة «ربح» — بل تتجنب رسمًا يُفرض لمجرد مرور الزمن على قرض. هامش ربح المرابحة هو سعر بيع متفق عليه مسبقًا؛ أما الفائدة فهي رسم يمكن أن يتضاعف كلما طال أمد الدَين."],
      examples:["ربا النسيئة: «اقترض 1000 دولار، وسدّد 1100 دولار خلال ستة أشهر، أو أكثر إن طالت المدة.»","ربا الفضل: مبادلة 10 غرامات من مجوهرات الذهب بـ12 غرامًا من قطع الذهب المسكوكة، يدًا بيد، دون مراعاة أن هذا تبادل لنفس الفئة يتطلب تساوي الأوزان."],
      scenario:"يُعرض على صاحبة متجر قرض بقيمة 2000 دولار بفائدة 15٪ لمدة ستة أشهر، أو ترتيب مرابحة يشتري فيه ممول بضاعة بقيمة 2000 دولار ثم يبيعها لها بـ2230 دولارًا، تُسدَّد خلال ستة أشهر. الرقمان متقاربان — لكن هيكل كل منهما، وما يحدث إن تأخرت في السداد، يختلفان بطريقة ستوضحها الدروس اللاحقة.",
      principles:[{type:"quran",ref:"القرآن 2: 275",text:"«وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا» — أباح الله التجارة وحرّم الربا."},{type:"quran",ref:"القرآن 2: 278–279 (بحسب المعنى المنقول)",text:"يأمر الله المؤمنين بترك ما تبقى من الربا، محذّرًا بشدة من يُصرّ عليه، مع تأكيد أنهم يستطيعون استرداد رأس مالهم الأصلي دون ظلم أو مظلمة."},{type:"hadith",ref:"صحيح مسلم (كتاب المساقاة)",text:"بيّن النبي ﷺ أن الذهب والفضة والقمح والشعير والتمر والملح لا تُستبدل إلا بمثلها بمقدار متساوٍ ويدًا بيد؛ فإن اختلفت الأصناف، جاز التفاضل في السعر بشرط أن يبقى التبادل فوريًا."}],
      summary:"يشمل الربا كلاً من فائدة القروض (ربا النسيئة) والتبادل غير المتساوي أو المؤجل للسلع المتماثلة (ربا الفضل). وتحريمه هو السبب في اعتماد التمويل الإسلامي على التجارة والتأجير والشراكة بدلًا من الدَين الربوي.",
      takeaways:["ربا النسيئة = فائدة مقابل التأخير؛ ربا الفضل = تبادل غير متساوٍ لسلع متماثلة","العائد الثابت المضمون على القرض — بصرف النظر عن النتيجة — هو النمط الذي يجب الانتباه إليه","البدائل الإسلامية تستبدل الرسم مقابل الزمن بسعر بيع ثابت أو شراكة تتقاسم المخاطرة"] },
    fr: { title:"Comprendre le Riba",
      objectives:["Définir le riba et distinguer ses deux formes classiques","Expliquer le raisonnement des savants pour son interdiction","Identifier le riba dans un scénario de prêt courant"],
      intro:"Riba signifie littéralement « accroissement » ou « excédent ». C'est l'interdiction la plus fondamentale de la finance islamique — presque tous les produits de ce cours existent comme moyen de financer des besoins réels sans y recourir.",
      explanation:["Le fiqh classique identifie deux formes : le riba al-nasi'a, un surplus facturé uniquement pour le délai de remboursement (cela couvre l'intérêt conventionnel sur les prêts), et le riba al-fadl, un échange inégal ou non immédiat de la même catégorie de marchandise — comme de l'or contre de l'or de poids différents.","Le raisonnement couramment avancé est qu'un prêt d'argent à rendement garanti, sans aucun partage du risque réel de l'emprunteur, permet à la richesse de croître sans effort productif correspondant, et peut piéger les emprunteurs dans une dette croissante quelle que soit leur situation.","Les alternatives islamiques n'évitent pas le mot « profit » — elles évitent des frais facturés uniquement pour l'écoulement du temps sur un prêt. La marge d'une Mourabaha est un prix de vente convenu à l'avance ; l'intérêt est un frais qui peut s'accumuler plus la dette dure longtemps."],
      examples:["Riba al-nasi'a : « Empruntez 1 000 $, remboursez 1 100 $ dans six mois, ou davantage si cela prend plus de temps. »","Riba al-fadl : échanger 10 g de bijoux en or contre 12 g de pièces d'or, main à main, en traitant cela comme un simple troc plutôt qu'un échange de même catégorie exigeant des poids égaux."],
      scenario:"Une commerçante se voit proposer un prêt de 2 000 $ à 15 % d'intérêt sur six mois, ou un arrangement de Mourabaha où un financeur achète 2 000 $ de marchandises et les lui revend 2 230 $, payables sur six mois. Les deux montants se ressemblent — mais leur structure, et ce qui se passe en cas de retard de paiement, diffèrent d'une manière que les leçons suivantes exploreront.",
      principles:[{type:"quran",ref:"Coran 2:275 (sens rapporté)",text:"Allah a permis le commerce et interdit le riba."},{type:"quran",ref:"Coran 2:278–279 (sens rapporté)",text:"Les croyants sont invités à renoncer à tout riba restant dû, avec un avertissement sévère pour ceux qui persistent, tout en affirmant qu'ils peuvent récupérer leur capital initial sans léser ni être lésés."},{type:"hadith",ref:"Sahih Muslim (Kitab al-Musaqat)",text:"Le Prophète ﷺ a précisé que l'or, l'argent, le blé, l'orge, les dattes et le sel ne peuvent être échangés que contre la même marchandise en quantités égales, main à main ; si les marchandises diffèrent, le taux est négociable mais l'échange doit rester immédiat."}],
      summary:"Le riba couvre à la fois l'intérêt sur les prêts (riba al-nasi'a) et l'échange inégal ou différé de biens similaires (riba al-fadl). Son interdiction explique pourquoi la finance islamique s'appuie sur le commerce, le crédit-bail et le partenariat plutôt que sur la dette à intérêt.",
      takeaways:["Riba al-nasi'a = intérêt pour le délai ; riba al-fadl = échange inégal de biens similaires","Un rendement fixe et garanti sur un prêt — quel que soit le résultat — est le signal à repérer","Les alternatives islamiques remplacent les frais liés au temps par un prix de vente fixe ou un partenariat à risque partagé"] },
  },
};

/* Quiz text overrides for l1–l3, aligned by array position to QUIZZES.l1/l2/l3
   above — the "correct" index and question id are governed by the English
   source; only prompt/options/explanation are localized here. */
const QUIZ_I18N = {
  l1: {
    sw: [
      { prompt:"Ni lipi kati ya haya ni katazo la msingi linalotofautisha zaidi fedha za Kiislamu na fedha za kawaida?", options:["Riba (faida ya mkopo)","Ada kubwa","Matumizi ya sarafu za kigeni","Muda mrefu wa mkopo"], explanation:"Riba ndicho katazo la msingi zaidi — mengine si mahususi kwa fedha za Kiislamu." },
      { prompt:"Katika fedha za Kiislamu, fedha yenyewe inaweza kukodishwa kwa ada, kama kukodisha gari.", options:["Kweli","Si kweli"], explanation:"Fedha inachukuliwa kama njia ya kubadilishana, si bidhaa ya kukodisha — kutoza ada kwa ajili tu ya matumizi yake kwa muda ni riba." },
      { prompt:"Benki inakopesha $5,000 na kudai irudishwe $5,500 kamili baada ya mwaka, bila kujali kilichotokea. Hii inafafanuliwa vyema kama:", options:["Mauzo ya Murabahah","Ukopeshaji wa riba","Ushirikiano wa Mudarabah","Makubaliano ya Wakalah"], explanation:"Ongezeko la uhakika, lililowekwa, kwenye mkopo bila kujali matokeo ndicho kiigezo cha kawaida cha riba." },
    ],
    ar: [
      { prompt:"أي مما يلي هو المحظور الأساسي الذي يميّز التمويل الإسلامي أكثر عن التمويل التقليدي؟", options:["الربا (الفائدة)","الرسوم المرتفعة","استخدام العملات الأجنبية","آجال القروض الطويلة"], explanation:"الربا هو المحظور الأساسي الأهم — أما البقية فليست خاصة بالتمويل الإسلامي." },
      { prompt:"في التمويل الإسلامي، يمكن تأجير المال نفسه مقابل رسوم، تمامًا كتأجير سيارة.", options:["صحيح","خطأ"], explanation:"يُعامل المال كوسيلة للتبادل لا كسلعة تُؤجَّر — وفرض رسم لمجرد استخدامه عبر الزمن هو الربا." },
      { prompt:"يُقرض بنك 5000 دولار ويشترط استرداد 5500 دولار بالضبط بعد عام، بصرف النظر عمّا يحدث. أفضل وصف لهذا هو:", options:["بيع مرابحة","إقراض ربوي","شراكة مضاربة","اتفاقية وكالة"], explanation:"الزيادة الثابتة والمضمونة على القرض بصرف النظر عن النتيجة هي النمط الكلاسيكي للربا." },
    ],
    fr: [
      { prompt:"Laquelle de ces réponses est l'interdiction fondamentale qui distingue le plus la finance islamique de la finance conventionnelle ?", options:["Le riba (l'intérêt)","Des frais élevés","L'utilisation de devises étrangères","Des prêts à long terme"], explanation:"Le riba est l'interdiction la plus fondamentale — les autres ne sont pas spécifiques à la finance islamique." },
      { prompt:"Dans la finance islamique, l'argent lui-même peut être loué contre rémunération, comme on loue une voiture.", options:["Vrai","Faux"], explanation:"L'argent est considéré comme un moyen d'échange, pas un bien à louer — facturer des frais pour son seul usage dans le temps constitue du riba." },
      { prompt:"Une banque prête 5 000 $ et exige exactement 5 500 $ en retour après un an, quoi qu'il arrive. Ceci se décrit le mieux comme :", options:["Une vente Mourabaha","Un prêt à caractère ribawi","Un partenariat Moudaraba","Un accord Wakala"], explanation:"Une augmentation fixe et garantie sur un prêt, indépendamment du résultat, est le schéma classique du riba." },
    ],
  },
  l2: {
    sw: [
      { prompt:"Ni kanuni gani inayoeleza kwa nini faida ya mwekezaji wa Sukuk inaweza kuathiriwa na utendaji wa mali husika, tofauti na mmiliki wa hati fungani ya kawaida?", options:["Kuungwa mkono na mali","Hatari ya sarafu","Matibabu ya kodi","Kiwango cha mkopo"], explanation:"Sukuk zinahusishwa na mali au miradi halisi, hivyo faida inafuata utendaji halisi wa mali hiyo." },
      { prompt:"Kanuni za kiuchumi za Kiislamu zinajumuisha makatazo tu, bila kanuni chanya kuhusu jinsi mikataba inavyopaswa kujengwa.", options:["Kweli","Si kweli"], explanation:"Kanuni chanya — kuungwa mkono na mali, ugawanaji wa hatari, na makubaliano thabiti — ni muhimu kama makatazo yenyewe." },
      { prompt:"'La darar wa la dirar' inafafanuliwa vyema kama:", options:["Hakupaswi kuwa na madhara wala kulipiza madhara","Hakupaswi kuwa na faida bila hatari","Hakupaswi kuwa na ucheleweshaji wa malipo","Hakupaswi kuwa na ushirikiano bila mtaji"], explanation:"Ni kanuni ya msingi ya fiqh inayotumika kuamua uadilifu kati ya wanaoshiriki mkataba." },
    ],
    ar: [
      { prompt:"أي مبدأ يفسر لماذا يمكن أن يتأثر عائد مستثمر الصكوك بأداء الأصل الأساسي، بخلاف حامل السند التقليدي؟", options:["الدعم بالأصول","مخاطر العملة","المعاملة الضريبية","التصنيف الائتماني"], explanation:"ترتبط الصكوك بأصول أو مشاريع حقيقية، لذا يتبع العائد الأداء الفعلي للأصل." },
      { prompt:"تتكون المبادئ الاقتصادية الإسلامية من المحظورات فقط، دون مبادئ إيجابية حول كيفية بناء العقود.", options:["صحيح","خطأ"], explanation:"المبادئ الإيجابية — الدعم بالأصول، وتقاسم المخاطر، والاتفاقيات المُلزمة — لا تقل أهمية عن المحظورات." },
      { prompt:"أفضل ترجمة لـ«لا ضرر ولا ضرار» هي:", options:["لا ينبغي أن يكون هناك ضرر ولا مقابلة الضرر بضرر","لا ينبغي أن يكون هناك ربح دون مخاطرة","لا ينبغي أن يكون هناك تأخير في السداد","لا ينبغي أن تكون هناك شراكة دون رأس مال"], explanation:"إنها قاعدة فقهية أساسية تُستخدم للحكم على العدالة بين طرفي العقد." },
    ],
    fr: [
      { prompt:"Quel principe explique pourquoi le rendement d'un investisseur en Sukuk peut être affecté par la performance de l'actif sous-jacent, contrairement à un détenteur d'obligation conventionnelle ?", options:["L'adossement à un actif","Le risque de change","Le traitement fiscal","La notation de crédit"], explanation:"Les Sukuk sont liés à des actifs ou projets réels, donc le rendement suit la performance réelle de l'actif." },
      { prompt:"Les principes économiques islamiques ne comportent que des interdictions, sans principes positifs sur la manière dont les contrats doivent être structurés.", options:["Vrai","Faux"], explanation:"Les principes positifs — adossement à des actifs, partage du risque, et accords contraignants — comptent tout autant que les interdictions." },
      { prompt:"« La darar wa la dirar » se traduit le mieux par :", options:["Il ne doit y avoir ni préjudice ni réciprocité de préjudice","Il ne doit pas y avoir de profit sans risque","Il ne doit pas y avoir de retard de paiement","Il ne doit pas y avoir de partenariat sans capital"], explanation:"C'est une maxime fondamentale du fiqh utilisée pour juger de l'équité entre les parties contractantes." },
    ],
  },
  l3: {
    sw: [
      { prompt:"Kutoza ada kwa sababu tu ya kuchelewesha ulipaji wa mkopo kunajulikana kama:", options:["Riba al-fadl","Riba al-nasi'ah","Gharar","Maysir"], explanation:"Riba al-nasi'ah ni ongezeko linalotozwa kwa ajili ya kuchelewa — hii inajumuisha riba ya kawaida." },
      { prompt:"Kubadilishana gramu 10 za dhahabu na gramu 12 za dhahabu ya usafi tofauti, papo kwa papo, bila masharti maalum, kunaweza kuwa:", options:["Riba al-nasi'ah","Gharar","Riba al-fadl","Wakalah"], explanation:"Ubadilishanaji usio sawa wa bidhaa za aina moja ni mfano wa kawaida wa riba al-fadl." },
      { prompt:"Faida ya ziada ya Murabahah inaweza kuongezeka kihalali ikiwa mteja atalipa baadaye kuliko ilivyokubaliwa, kama riba inayoongezeka.", options:["Kweli","Si kweli"], explanation:"Bei ya mauzo imewekwa wakati wa kusaini; haiwezi kuongezeka kwa sababu ya kuchelewa kama riba inavyoongezeka." },
    ],
    ar: [
      { prompt:"فرض رسم لمجرد تأخير سداد قرض يُعرف باسم:", options:["ربا الفضل","ربا النسيئة","الغرر","الميسر"], explanation:"ربا النسيئة هو زيادة تُفرض مقابل التأخير — وهذا يشمل الفائدة التقليدية." },
      { prompt:"مبادلة 10 غرامات من الذهب بـ12 غرامًا من ذهب بنقاء مختلف، يدًا بيد، دون شروط خاصة، قد تندرج تحت:", options:["ربا النسيئة","الغرر","ربا الفضل","الوكالة"], explanation:"التبادل غير المتساوي لنفس فئة السلعة هو الحالة الكلاسيكية لربا الفضل." },
      { prompt:"يمكن أن يرتفع هامش ربح المرابحة بشكل مشروع إذا دفع العميل متأخرًا عن الموعد المتفق عليه، كما تتراكم الفائدة.", options:["صحيح","خطأ"], explanation:"سعر البيع ثابت عند التوقيع؛ ولا يمكن أن يرتفع بسبب التأخير كما تتراكم الفائدة." },
    ],
    fr: [
      { prompt:"Facturer des frais uniquement pour retarder le remboursement d'un prêt est appelé :", options:["Riba al-fadl","Riba al-nasi'a","Gharar","Maysir"], explanation:"Le riba al-nasi'a est un surplus facturé pour un délai — cela couvre l'intérêt conventionnel." },
      { prompt:"Échanger 10 g d'or contre 12 g d'or d'une pureté différente, main à main, sans conditions particulières, risque de relever de :", options:["Riba al-nasi'a","Gharar","Riba al-fadl","Wakala"], explanation:"L'échange inégal de la même catégorie de marchandise est le cas classique du riba al-fadl." },
      { prompt:"Une marge de Mourabaha peut légitimement augmenter si le client paie plus tard que prévu, comme des intérêts qui s'accumulent.", options:["Vrai","Faux"], explanation:"Le prix de vente est fixé à la signature ; il ne peut pas augmenter en cas de retard comme le fait l'intérêt composé." },
    ],
  },
};

/* Full glossary translations — all 20 terms, all three additional languages. */
const GLOSSARY_I18N = {
  "Riba": { headword:{ar:"الربا"}, definition:{sw:"Ongezeko lisilo la haki — riba kwenye mkopo, au ubadilishanaji usio sawa wa bidhaa ile ile.",ar:"زيادة غير عادلة — فائدة على قرض، أو تبادل غير متساوٍ لنفس السلعة.",fr:"Un accroissement injuste — intérêt sur un prêt, ou échange inégal de la même marchandise."}, how:{sw:"Ina aina mbili: riba al-nasi'ah (ada ya kuchelewesha malipo) na riba al-fadl (ubadilishanaji usio sawa wa bidhaa inayofanana).",ar:"له نوعان: ربا النسيئة (رسم مقابل تأخير السداد) وربا الفضل (تبادل غير متساوٍ لنفس السلعة).",fr:"Il existe deux formes : le riba al-nasi'a (frais pour retard de paiement) et le riba al-fadl (échange inégal d'une marchandise similaire)."}, example:{sw:"Mkopo wa $100 unaolazimika kulipwa kama $110 bila kujali kilichotokea kwa fedha hizo.",ar:"قرض بقيمة 100 دولار يجب سداده بمبلغ 110 دولارات بصرف النظر عمّا حدث للمال.",fr:"Un prêt de 100 $ qui doit être remboursé à hauteur de 110 $, quoi qu'il soit advenu de l'argent."}, shariah:{sw:"Umekatazwa waziwazi (Qur'an 2:275, 2:278–279); ndiyo sababu fedha za Kiislamu zinategemea biashara badala ya riba.",ar:"محرّم صراحةً (القرآن 2: 275، 278–279)؛ وهو السبب في اعتماد التمويل الإسلامي على التجارة بدلًا من الفائدة.",fr:"Explicitement interdit (Coran 2:275, 2:278-279) ; c'est pourquoi la finance islamique repose sur le commerce plutôt que sur l'intérêt."} },
  "Gharar": { headword:{ar:"الغرر"}, definition:{sw:"Kutokuwa na uhakika kupita kiasi kuhusu kitu, bei, au uwasilishaji wa mkataba.",ar:"عدم يقين مفرط بشأن محل العقد أو ثمنه أو تسليمه.",fr:"Une incertitude excessive concernant l'objet, le prix ou la livraison d'un contrat."}, how:{sw:"Hutokea wakati kinachouzwa, bei yake, au ikiwa/lini kitawasilishwa hakiko wazi.",ar:"ينشأ عندما يكون ما يُباع أو ثمنه أو موعد تسليمه غير واضح.",fr:"Se produit lorsque ce qui est vendu, son prix, ou le moment de livraison n'est pas clair."}, example:{sw:"Kuuza 'chochote kitakachopatikana katika safari ijayo ya uvuvi' kwa bei moja kabla ya mashua kutoka.",ar:"بيع «كل ما سيُصطاد في الرحلة القادمة» بسعر ثابت قبل أن يبحر القارب.",fr:"Vendre « tout ce que ramènera la prochaine sortie de pêche » à un prix fixe avant le départ du bateau."}, shariah:{sw:"Umekatazwa ukiwa mkubwa (gharar fahish); kutokuwa na uhakika kidogo kusikoepukika (gharar yasir) kunavumiliwa.",ar:"محرّم إن كان مفرطًا (الغرر الفاحش)؛ أما القدر اليسير الذي لا يمكن تفاديه فمُتسامح فيه.",fr:"Interdit lorsqu'il est excessif (gharar fahish) ; une incertitude mineure et inévitable est tolérée."} },
  "Maysir": { headword:{ar:"الميسر"}, definition:{sw:"Kamari — uhamishaji wa utajiri wa matokeo sawa na sifuri unaotegemea bahati tu.",ar:"القمار — نقل ثروة بمحصلة صفرية يعتمد على الحظ المحض.",fr:"Le jeu de hasard — un transfert de richesse à somme nulle basé sur le pur hasard."}, how:{sw:"Upande mmoja unafaidika tu kwa sababu mwingine anapoteza, bila shughuli yoyote ya kiuchumi yenye tija.",ar:"يستفيد طرف فقط لأن الآخر يخسر، دون أي نشاط اقتصادي منتج.",fr:"Une partie ne gagne que parce que l'autre perd, sans aucune activité économique productive."}, example:{sw:"Tiketi ya bahati nasibu, au dau la utabiri wa uchuano.",ar:"تذكرة يانصيب، أو رهان على توقع نتيجة مباراة.",fr:"Un billet de loterie, ou un pari de pronostic sur un résultat."}, shariah:{sw:"Umekatazwa (Qur'an 5:90–91), ukiunganishwa na vileo.",ar:"محرّم (القرآن 5: 90–91)، ويُذكر مقترنًا بالمسكرات.",fr:"Interdit (Coran 5:90-91), associé aux substances enivrantes."} },
  "Murabahah": { headword:{ar:"المرابحة"}, definition:{sw:"Mauzo ya gharama-pamoja-faida: muuzaji anaeleza gharama yake na kuongeza faida iliyokubaliwa, thabiti.",ar:"بيع بهامش ربح: يفصح البائع عن تكلفته ويضيف هامش ربح ثابتًا متفقًا عليه.",fr:"Une vente à marge coûtante : le vendeur divulgue son coût et ajoute une marge bénéficiaire fixe convenue."}, how:{sw:"Mfadhili ananunua mali, kisha anaiuza tena kwa mteja kwa gharama pamoja na faida, kwa kawaida kwa awamu.",ar:"يشتري الممول الأصل، ثم يبيعه للعميل بسعر التكلفة زائد الربح، عادةً على أقساط.",fr:"Le financeur achète l'actif, puis le revend au client au prix coûtant plus une marge, généralement par versements."}, example:{sw:"Benki inanunua gari la $10,000 na kuliuza kwa $12,000 kwa miezi 24.",ar:"يشتري البنك سيارة بقيمة 10,000 دولار ويبيعها بـ12,000 دولار على مدى 24 شهرًا.",fr:"Une banque achète une voiture à 10 000 $ et la revend à 12 000 $ sur 24 mois."}, shariah:{sw:"Muundo wake wa kawaida unakubalika sana; aina za tawarruq zilizopangwa kwa fedha taslimu zina mjadala.",ar:"شكلها القياسي مقبول على نطاق واسع؛ أما صيغ التورق المنظم النقدية فمثار جدل.",fr:"Sa forme standard est largement acceptée ; les variantes de tawarruq organisé pour du cash font débat."} },
  "Mudarabah": { headword:{ar:"المضاربة"}, definition:{sw:"Ushirikiano wa kugawana faida kati ya mtoa mtaji na mshirika anayefanya kazi.",ar:"شراكة تقاسم الربح بين مقدّم رأس المال والشريك العامل.",fr:"Un partenariat de partage des profits entre un apporteur de capital et un partenaire qui travaille."}, how:{sw:"Faida inagawanywa kwa uwiano uliokubaliwa; mtoa mtaji peke yake anabeba hasara ya kawaida.",ar:"يُقسَّم الربح وفق نسبة متفق عليها؛ ويتحمل مقدّم رأس المال وحده الخسارة المعتادة.",fr:"Le profit est partagé selon un ratio convenu ; l'apporteur de capital supporte seul la perte ordinaire."}, example:{sw:"Mwekezaji anampa mfanyabiashara $5,000 kuendesha mradi, wakigawana faida 70/30.",ar:"يمنح مستثمر تاجرًا 5000 دولار لإدارة مشروع، على أن يُقسَّم الربح 70/30.",fr:"Un investisseur confie 5 000 $ à un commerçant pour gérer un projet, avec un partage des profits de 70/30."}, shariah:{sw:"Imeenea sana; ndiyo msingi wa akaunti nyingi za akiba za Kiislamu.",ar:"راسخة وشائعة؛ وهي أساس كثير من حسابات التوفير الإسلامية.",fr:"Bien établie ; elle sous-tend de nombreux comptes d'épargne islamiques."} },
  "Musharakah": { headword:{ar:"المشاركة"}, definition:{sw:"Ushirikiano ambapo kila mshirika anachangia mtaji (na mara nyingi kazi).",ar:"شراكة يساهم فيها كل شريك برأس مال (وغالبًا بالعمل أيضًا).",fr:"Une coentreprise où chaque partenaire apporte du capital (et souvent du travail)."}, how:{sw:"Faida inagawanywa kwa makubaliano; hasara lazima ifuate uwiano wa mtaji wa kila mshirika.",ar:"يُقسَّم الربح بالاتفاق؛ ويجب أن تتبع الخسارة نسبة مساهمة كل شريك في رأس المال.",fr:"Le profit est partagé par accord ; la perte doit suivre la proportion de capital de chaque partenaire."}, example:{sw:"Musharakah inayopungua kwa ajili ya ufadhili wa nyumba, ambapo mteja anamnunua benki hisa yake taratibu.",ar:"المشاركة المتناقصة لتمويل المسكن، حيث يشتري العميل حصة البنك تدريجيًا.",fr:"La Moucharaka dégressive pour le financement immobilier, où le client rachète progressivement la part de la banque."}, shariah:{sw:"Kanuni ya kugawana hasara kwa uwiano wa mtaji inakubaliwa karibu na wanazuoni wote.",ar:"قاعدة تقاسم الخسارة حسب نسبة رأس المال شبه مُجمع عليها بين العلماء.",fr:"La règle du partage des pertes au prorata du capital fait quasi-consensus chez les savants."} },
  "Ijarah": { headword:{ar:"الإجارة"}, definition:{sw:"Ukodishaji wa Kiislamu — malipo kwa ajili ya matumizi ya mali, si umiliki wake.",ar:"التأجير الإسلامي — دفع مقابل استخدام أصل، لا مقابل تملّكه.",fr:"Le crédit-bail islamique — paiement pour l'usage d'un actif, non pour sa propriété."}, how:{sw:"Mkodishaji anabaki mmiliki na anabeba hatari zake; mkodishwa analipa kodi kwa matumizi.",ar:"يظل المؤجر مالكًا ويتحمل مخاطر الملكية؛ ويدفع المستأجر إيجارًا مقابل الاستخدام.",fr:"Le bailleur reste propriétaire et assume les risques associés ; le locataire paie un loyer pour l'usage."}, example:{sw:"Kukodisha vifaa vya kiwanda, au kukodisha kunakoishia na uhamisho wa umiliki.",ar:"تأجير معدات مصنع، أو إجارة تنتهي بتمليك.",fr:"Louer un équipement industriel, ou un bail se terminant par un transfert de propriété."}, shariah:{sw:"Hatari za umiliki lazima zibaki kwa mkodishaji katika kipindi chote cha ukodishaji.",ar:"يجب أن تبقى مخاطر الملكية على عاتق المؤجر طوال مدة الإجارة.",fr:"Les risques liés à la propriété doivent rester à la charge du bailleur pendant toute la durée du bail."} },
  "Salam": { headword:{ar:"السلم"}, definition:{sw:"Mauzo ya mbeleni: malipo kamili leo kwa bidhaa zilizoainishwa kwa usahihi zitakazowasilishwa baadaye.",ar:"بيع آجل: دفع كامل اليوم مقابل سلعة محددة بدقة تُسلَّم لاحقًا.",fr:"Une vente à terme : paiement intégral aujourd'hui pour des biens précisément spécifiés livrés plus tard."}, how:{sw:"Inahitaji uainishaji sahihi wa aina, kiasi, ubora, na tarehe ya uwasilishaji ili kudhibiti kutokuwa na uhakika.",ar:"تتطلب تحديدًا دقيقًا للنوع والكمية والجودة وتاريخ التسليم للسيطرة على عدم اليقين.",fr:"Nécessite une spécification exacte du type, de la quantité, de la qualité et de la date de livraison."}, example:{sw:"Kulipa mkulima leo kikamilifu kwa ajili ya tani 10 za daraja maalum baada ya mavuno.",ar:"دفع مبلغ كامل لمزارع اليوم مقابل 10 أطنان من درجة محددة بعد الحصاد.",fr:"Payer intégralement un agriculteur aujourd'hui pour 10 tonnes d'une qualité définie après la récolte."}, shariah:{sw:"Ni ubaguzi wa makusudi kwa sheria ya kutouza kisichomilikiwa bado, kwa masharti magumu.",ar:"استثناء مقصود من قاعدة عدم بيع ما لا يُملَك بعد، وفق شروط صارمة.",fr:"Une exception délibérée à la règle interdisant de vendre ce que l'on ne possède pas encore, sous conditions strictes."} },
  "Istisna'": { headword:{ar:"الاستصناع"}, definition:{sw:"Mkataba wa utengenezaji au ujenzi kwa bidhaa zinazoagizwa maalum.",ar:"عقد تصنيع أو بناء لسلع مصنوعة حسب الطلب.",fr:"Un contrat de fabrication ou de construction pour des biens faits sur commande."}, how:{sw:"Tofauti na Salam, malipo yanaweza kufanywa kwa awamu au kuchelewa badala ya kulipwa yote mapema.",ar:"بخلاف السلم، يمكن أن يُدفع الثمن على دفعات أو مؤجلًا بدلًا من الدفع الكامل مقدمًا.",fr:"Contrairement au Salam, le paiement peut être échelonné ou différé plutôt que payé en totalité à l'avance."}, example:{sw:"Kuagiza kujengwa kwa ghala maalum, ikilipwa kwa awamu kadiri ujenzi unavyoendelea.",ar:"تكليف ببناء مستودع مخصص، يُدفع ثمنه على مراحل مع تقدم البناء.",fr:"Commander la construction d'un entrepôt sur mesure, payé par étapes selon l'avancement des travaux."}, shariah:{sw:"Imeruhusiwa kwa sababu ya manufaa yake katika ufadhili wa uzalishaji na ujenzi.",ar:"مباح نظرًا لفائدته في تمويل الإنتاج والبناء.",fr:"Autorisé en raison de son utilité pour le financement de la production et de la construction."} },
  "Wakalah": { headword:{ar:"الوكالة"}, definition:{sw:"Mkataba wa uwakilishi — mtu mmoja anafanya kazi kwa niaba ya mwingine.",ar:"عقد وكالة — يتصرف طرف نيابةً عن آخر.",fr:"Un contrat d'agence — une partie agit au nom d'une autre."}, how:{sw:"Wakala anaweza kutenda kwa ada au bila malipo, kwa niaba ya mtoa mamlaka.",ar:"يجوز للوكيل أن يتصرف مقابل أجر أو دون مقابل، نيابةً عن الموكِّل.",fr:"L'agent peut agir contre rémunération ou gratuitement, au nom du mandant."}, example:{sw:"Mwendeshaji wa Takaful anasimamia mfuko wa hatari uliokusanywa kama wakala kwa niaba ya washiriki.",ar:"يدير مشغّل التكافل صندوق المخاطر المشترك بصفته وكيلًا عن المشاركين.",fr:"Un opérateur Takaful gère le fonds de risque commun en tant qu'agent pour le compte des participants."}, shariah:{sw:"Ni msingi na inatumika sana katika shughuli za benki za Kiislamu na Takaful.",ar:"أساسية وواسعة الاستخدام في عمليات المصرفية الإسلامية والتكافل.",fr:"Fondamentale et largement utilisée dans les opérations bancaires islamiques et le Takaful."} },
  "Qard (Qard Hasan)": { headword:{ar:"القرض الحسن"}, definition:{sw:"Mkopo wa hisani, usio na riba.",ar:"قرض حسن خالٍ من الفائدة.",fr:"Un prêt bienveillant, sans intérêt."}, how:{sw:"Mkopeshaji anaweza kudai tu mtaji halisi uliokopeshwa — hakuna ongezeko, hata dogo.",ar:"لا يجوز للمُقرض أن يطلب إلا أصل المبلغ المُقرَض بالضبط — دون أي زيادة مهما صغرت.",fr:"Le prêteur ne peut réclamer que le capital exact prêté — aucune augmentation, même minime."}, example:{sw:"Mfuko wa jamii unamkopesha mwanachama kiasi kinachohitajika kwa dharura ya matibabu, bila riba.",ar:"يُقرض صندوق مجتمعي عضوًا المبلغ اللازم لحالة طبية طارئة، دون فائدة.",fr:"Un fonds communautaire prête à un membre exactement la somme nécessaire pour une urgence médicale, sans intérêt."}, shariah:{sw:"Unachukuliwa kama tendo la hisani na wema, si bidhaa ya kibiashara.",ar:"يُعامَل كعمل خيري وفضيلة، لا كمنتج تجاري.",fr:"Considéré comme un acte de bienfaisance et de vertu, non comme un produit commercial."} },
  "Rahn": { headword:{ar:"الرهن"}, definition:{sw:"Dhamana — mali inayoshikiliwa kama hakikisho la wajibu.",ar:"رهن — أصل يُحتفظ به كضمان لالتزام.",fr:"Un gage — un actif détenu en garantie d'une obligation."}, how:{sw:"Mali inashikiliwa (si kutumiwa) kama dhamana mpaka wajibu husika utakapotimizwa.",ar:"يُحتفظ بالأصل (دون استخدامه) كضمان حتى يُسدَّد الالتزام.",fr:"L'actif est détenu (non consommé) en garantie jusqu'au règlement de l'obligation."}, example:{sw:"Kuweka rehani vito vya dhahabu kama dhamana dhidi ya Qard.",ar:"رهن مجوهرات ذهبية كضمان مقابل قرض حسن.",fr:"Mettre en gage des bijoux en or en garantie d'un Qard."}, shariah:{sw:"Inaongozwa na kanuni mahususi kuhusu jinsi dhamana inavyoweza (na isivyoweza) kutumika.",ar:"تحكمها قواعد محددة حول كيفية استخدام الرهن (وما لا يجوز فيه).",fr:"Régi par des règles spécifiques sur l'usage autorisé (et interdit) du bien gagé."} },
  "Sukuk": { headword:{ar:"الصكوك"}, definition:{sw:"Hati inayowakilisha umiliki katika mali halisi, huduma, au mradi.",ar:"شهادة تمثل ملكية في أصل حقيقي أو خدمة أو مشروع.",fr:"Un certificat représentant une propriété dans un actif, un service ou un projet réel."}, how:{sw:"Wamiliki wanapokea mapato yanayozalishwa na mali husika (mfano kodi), si riba iliyowekwa.",ar:"يحصل حاملوها على الدخل الذي يولّده الأصل (كالإيجار)، لا على فائدة ثابتة.",fr:"Les détenteurs perçoivent le revenu généré par l'actif sous-jacent (par ex. un loyer), non un intérêt fixe."}, example:{sw:"Sukuk al-Ijarah inayoungwa mkono na jengo la ofisi lililokodishwa.",ar:"صكوك إجارة مدعومة بمبنى مكاتب مؤجَّر.",fr:"Un Sukuk al-Ijara adossé à un immeuble de bureaux loué."}, shariah:{sw:"Viwango vyake viliimarishwa baada ya ukosoaji maarufu wa kisomi wa 2007.",ar:"شُدِّدت معاييرها بعد نقد علمي بارز عام 2007.",fr:"Ses normes ont été renforcées après une critique savante marquante en 2007."} },
  "Takaful": { headword:{ar:"التكافل"}, definition:{sw:"Bima ya Kiislamu inayotegemea ushirikiano wa kugawana hatari kwa hisani.",ar:"تأمين إسلامي قائم على التعاون التبرعي في تقاسم المخاطر.",fr:"Une assurance islamique fondée sur le partage mutuel et solidaire du risque."}, how:{sw:"Washiriki wanachangia mfuko wa pamoja (tabarru'); mwendeshaji anaisimamia kwa ada au uwiano wa faida.",ar:"يساهم المشاركون في صندوق مشترك (تبرّع)؛ ويديره المشغّل مقابل أجر أو نسبة من الربح.",fr:"Les participants cotisent à un fonds commun (tabarru') ; un opérateur le gère contre des frais ou un partage de profit."}, example:{sw:"Chama kinachochangisha michango ya kila mwezi kusaidia mwanachama yeyote atakayepata hasara iliyofunikwa.",ar:"تعاونية تجمع اشتراكات شهرية لمساعدة أي عضو يتعرض لخسارة مغطاة.",fr:"Une coopérative qui collecte des cotisations mensuelles pour aider tout membre subissant une perte couverte."}, shariah:{sw:"Inashughulikia wasiwasi wa riba, gharar, na maysir uliopo katika bima ya kawaida.",ar:"تعالج مخاوف الربا والغرر والميسر المطروحة بشأن التأمين التقليدي.",fr:"Répond aux préoccupations de riba, gharar et maysir soulevées à propos de l'assurance conventionnelle."} },
  "Halal": { headword:{ar:"الحلال"}, definition:{sw:"Kinachoruhusiwa kwa mujibu wa sheria ya Kiislamu.",ar:"ما هو مباح بحسب الشريعة الإسلامية.",fr:"Ce qui est permis selon la loi islamique."}, how:{sw:"Ndio hali chaguo-msingi ya vitu na matendo mengi, isipokuwa kuna katazo mahususi.",ar:"هي الحالة الافتراضية لمعظم الأشياء والأفعال، ما لم يوجد نص يحظرها تحديدًا.",fr:"C'est le statut par défaut de la plupart des choses et actions, sauf interdiction spécifique."}, example:{sw:"Shughuli kuu ya mgahawa halali.",ar:"النشاط التجاري الأساسي لمطعم حلال.",fr:"L'activité principale d'un restaurant halal."}, shariah:{sw:"Inaongozwa na kanuni kwamba chaguo-msingi katika miamala ni uruhusu.",ar:"يحكمها مبدأ أن الأصل في المعاملات هو الإباحة.",fr:"Régi par le principe selon lequel la permissibilité est la règle par défaut dans les transactions."} },
  "Haram": { headword:{ar:"الحرام"}, definition:{sw:"Kilichokatazwa au kisichoruhusiwa kwa mujibu wa sheria ya Kiislamu.",ar:"ما هو محظور أو غير مباح بحسب الشريعة الإسلامية.",fr:"Ce qui est interdit ou illicite selon la loi islamique."}, how:{sw:"Hutumika pale ambapo nukuu mahususi au kanuni iliyowekwa inakataza jambo.",ar:"ينطبق حيثما ينص نص محدد أو مبدأ ثابت على حظر أمر ما.",fr:"S'applique lorsqu'un texte spécifique ou un principe établi interdit une chose."}, example:{sw:"Pombe, kamari, na ukopeshaji wa riba.",ar:"الكحول، والقمار، والإقراض الربوي.",fr:"L'alcool, les jeux d'argent, et le prêt à intérêt."}, shariah:{sw:"Kundi dogo lililobainishwa la mambo yaliyokatazwa waziwazi, tofauti na maeneo ya kijivu yanayoshughulikiwa kwa uchunguzi.",ar:"مجموعة محددة صغيرة من الأمور المحرّمة بوضوح، تختلف عن الحالات الرمادية التي تُعالَج بالفرز.",fr:"Une petite catégorie clairement définie de choses interdites, distincte des zones grises traitées par filtrage."} },
  "Shariah": { headword:{ar:"الشريعة"}, definition:{sw:"Sheria ya Kiislamu, inayotokana na Qur'an, Sunnah (Hadith), na tafsiri za kisomi.",ar:"الشريعة الإسلامية، المستمدة من القرآن والسنة (الحديث) والاجتهاد الفقهي.",fr:"La loi islamique, tirée du Coran, de la Sunna (Hadith), et de l'interprétation savante."}, how:{sw:"Inatoa kanuni za msingi ambazo mikataba na viwango vya fedha za Kiislamu vinavyofuata.",ar:"توفر المبادئ الأساسية التي تُبنى عليها عقود ومعايير التمويل الإسلامي.",fr:"Elle fournit les principes source que les contrats et normes de la finance islamique sont censés suivre."}, example:{sw:"Bodi ya Usimamizi wa Kishariah inakagua bidhaa za benki dhidi ya kanuni hizi.",ar:"تراجع هيئة الرقابة الشرعية منتجات البنك في ضوء هذه المبادئ.",fr:"Un Conseil de conformité charia vérifie les produits d'une banque au regard de ces principes."}, shariah:{sw:"Ndicho mfumo wa marejeo kwa kila kitu kingine katika kozi hii.",ar:"هي الإطار المرجعي لكل ما تبقى من هذا المقرر.",fr:"C'est le cadre de référence pour tout le reste de ce cours."} },
  "Fiqh al-Mu'amalat": { headword:{ar:"فقه المعاملات"}, definition:{sw:"Tawi la fiqh ya Kiislamu linaloshughulikia miamala ya kifedha na kibiashara.",ar:"فرع من الفقه الإسلامي يُعنى بالمعاملات المالية والتجارية.",fr:"La branche du fiqh islamique traitant des transactions financières et commerciales."}, how:{sw:"Wanazuoni wanapata na kujadili kanuni mahususi za mikataba zinazoshughulikiwa katika kozi hii.",ar:"يستنبط علماء هذا المجال ويناقشون القواعد التعاقدية المحددة التي يتناولها هذا المقرر.",fr:"Les savants de ce domaine dérivent et débattent des règles contractuelles précises abordées dans ce cours."}, example:{sw:"Fiqh al-Mu'amalat ndiyo taaluma inayotofautisha Murabahah na ukopeshaji wa riba.",ar:"فقه المعاملات هو التخصص الذي يميّز المرابحة عن الإقراض الربوي.",fr:"Le fiqh al-Mu'amalat est la discipline qui distingue la Mourabaha du prêt à intérêt."}, shariah:{sw:"Ndiyo msingi wa kisomi wa kila mkataba katika programu hii.",ar:"هو الأساس العلمي لكل عقد في هذا التطبيق.",fr:"C'est le fondement savant de chaque contrat de cette application."} },
  "Zakat": { headword:{ar:"الزكاة"}, definition:{sw:"Sadaka ya lazima — sehemu maalum ya utajiri unaostahili inayotolewa kwa wapokeaji mahususi.",ar:"صدقة واجبة — نسبة محددة من المال المستحق للزكاة تُصرف لفئات مستحقة معينة.",fr:"L'aumône obligatoire — une part fixe d'une richesse éligible versée à des bénéficiaires désignés."}, how:{sw:"Mara nyingi hutajwa kwa kiwango cha 2.5% ya utajiri unaostahili uliohifadhiwa kwa mwaka mzima wa mwezi.",ar:"غالبًا ما تُذكر بنسبة 2.5٪ من المال الزكوي المُحتفظ به لمدة عام هجري كامل.",fr:"Souvent citée à hauteur de 2,5 % de la richesse éligible détenue pendant une année lunaire complète."}, example:{sw:"Mwekezaji anahesabu zakat kwenye akiba na uwekezaji wake unaostahili kila mwaka.",ar:"يحسب المستثمر الزكاة على مدخراته واستثماراته المستحقة سنويًا.",fr:"Un investisseur calcule la zakat sur son épargne et ses investissements éligibles chaque année."}, shariah:{sw:"Ni tofauti na 'utakaso' wa mapato yasiyo safi ya uwekezaji, ingawa mara nyingine hulinganishwa kimakosa.",ar:"تختلف عن «تطهير» دخل الاستثمار غير الحلال، وإن كان يُخلط بينهما أحيانًا.",fr:"Distincte de la « purification » des revenus d'investissement impurs, bien que les deux soient parfois confondues."} },
  "AAOIFI": { headword:{ar:"هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية"}, definition:{sw:"Shirika la Uhasibu na Ukaguzi kwa Taasisi za Fedha za Kiislamu.",ar:"هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية.",fr:"L'Organisation de comptabilité et d'audit pour les institutions financières islamiques."}, how:{sw:"Shirika lenye makao yake Bahrain linalochapisha viwango vya Kishariah, uhasibu, na utawala kwa sekta hii.",ar:"هيئة مقرها البحرين تُصدر معايير شرعية ومحاسبية ورقابية للقطاع.",fr:"Un organisme basé à Bahreïn qui publie des normes charia, comptables et de gouvernance pour le secteur."}, example:{sw:"AAOIFI ilirekebisha viwango vyake vya Sukuk baada ya ukosoaji wa kisomi wa 2007.",ar:"نقّحت هيئة الأيوفي معاييرها الخاصة بالصكوك بعد النقد العلمي لعام 2007.",fr:"L'AAOIFI a révisé ses normes sur les Sukuk après la critique savante de 2007."}, shariah:{sw:"Imekubalika sana, ingawa si kwa ulimwengu wote, katika taasisi za fedha za Kiislamu.",ar:"معتمدة على نطاق واسع، وإن لم يكن عالميًا، لدى المؤسسات المالية الإسلامية.",fr:"Largement adoptée, bien que pas universellement, par les institutions financières islamiques."} },
};

/* =========================================================================
   Core progress helpers (unchanged from the base build)
   ========================================================================= */

const todayStr = () => new Date().toISOString().slice(0,10);

function emptyProgress(){
  return {
    completedLessons: [],
    quizAttempts: {},
    bookmarks: [],
    notes: {},
    xp: 0,
    streak: { current: 0, longest: 0, lastActiveDate: null },
    earnedAchievements: [],
    glossaryViewed: [],
    lastVisitedLessonId: null,
    certificatesEarned: [],
    purchasedProductIds: [],
    followedCreatorIds: [],
    likedPostIds: [],
  };
}

function bumpStreak(progress){
  const today = todayStr();
  const s = { ...progress.streak };
  if (s.lastActiveDate === today) return s;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
  if (s.lastActiveDate === yesterday) s.current = (s.current||0) + 1;
  else s.current = 1;
  s.longest = Math.max(s.longest||0, s.current);
  s.lastActiveDate = today;
  return s;
}

function computeNewAchievements(progress){
  const earned = new Set(progress.earnedAchievements||[]);
  const fresh = [];
  ACHIEVEMENTS.forEach(a=>{
    if (!earned.has(a.id) && a.check(progress, TOTAL_LESSONS)) fresh.push(a.id);
  });
  return fresh;
}

/* =========================================================================
   App-wide context: language + translation + content resolution helpers
   (including educator-added custom lessons, layered on top of the base
   English content the same way the admin publish-override layer works).
   ========================================================================= */

const AppContext = createContext(null);
function useApp() { return useContext(AppContext); }

function levelLabel(lang, englishLevel) {
  return t(lang, `level_${englishLevel}`);
}
function courseTitle(lang, course) { return (COURSE_I18N[course.id]?.title?.[lang]) || course.title; }
function courseTagline(lang, course) { return (COURSE_I18N[course.id]?.tagline?.[lang]) || course.tagline; }
function moduleTitle(lang, mod) { return (MODULE_I18N[mod.id]?.[lang]) || mod.title; }
function achievementText(lang, ach) { return { title: ACHIEVEMENT_I18N[ach.id]?.title?.[lang] || ach.title, desc: ACHIEVEMENT_I18N[ach.id]?.desc?.[lang] || ach.desc }; }
function glossaryHeadword(lang, term) { return GLOSSARY_I18N[term.term]?.headword?.[lang] || term.term; }
function glossaryField(lang, term, field) { return GLOSSARY_I18N[term.term]?.[field]?.[lang] || term[field]; }

function categoryLabel(lang, categoryId) {
  const cat = MARKET_CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return categoryId;
  return MARKET_CATEGORY_I18N[categoryId]?.[lang] || cat.en;
}
function findCreator(id, creators) { return (creators || []).find(c => c.id === id); }
function findProduct(id, products) { return (products || []).find(p => p.id === id); }
function formatTZS(n) { return n === 0 ? null : `TZS ${Number(n).toLocaleString()}`; }

function lessonLocalized(lang, lesson) {
  if (lesson.isCustom || lang === "en") return { ...lesson, notTranslated: false };
  const tr = LESSON_I18N[lesson.id]?.[lang];
  if (!tr) return { ...lesson, notTranslated: true };
  return { ...lesson, ...tr, notTranslated: false };
}
function quizLocalized(lang, lessonId, questions) {
  const overrides = QUIZ_I18N[lessonId]?.[lang];
  if (!overrides || lang === "en") return questions;
  return questions.map((q, i) => (overrides[i] ? { ...q, prompt: overrides[i].prompt, options: overrides[i].options, explanation: overrides[i].explanation } : q));
}

function findLesson(id) { return LESSONS.find(l => l.id === id); }
function findLessonAny(id, customLessons) {
  return findLesson(id) || (customLessons || []).find(l => l.id === id);
}
function moduleVisibleLessons(mod, unpublished, customLessons) {
  const builtIn = mod.lessonIds.filter(id => !unpublished.includes(id)).map(id => findLesson(id));
  const custom = (customLessons || []).filter(l => l.moduleId === mod.id && !unpublished.includes(l.id));
  return [...builtIn, ...custom];
}
function courseProgressPct(courseId, progress, unpublished = [], customLessons = []) {
  const mods = MODULES.filter(m => m.courseId === courseId);
  const lessons = mods.flatMap(m => moduleVisibleLessons(m, unpublished, customLessons));
  if (lessons.length === 0) return 0;
  const done = lessons.filter(l => progress.completedLessons.includes(l.id)).length;
  return Math.round((done / lessons.length) * 100);
}
function overallPct(progress, unpublished = [], customLessons = []) {
  const total = Math.max(1, TOTAL_LESSONS - unpublished.filter(id=>!id.startsWith("custom-")).length + customLessons.filter(l=>!unpublished.includes(l.id)).length);
  const done = progress.completedLessons.filter(id => !unpublished.includes(id)).length;
  return Math.round((done / total) * 100);
}

/* Level-gating: a learner sees only their starting level (and anything below
   it) until they finish it, at which point the next level unlocks. Someone
   who starts at Intermediate or Advanced sees everything at or below that
   immediately — gating exists to protect a true beginner from being
   overwhelmed, not to hide basics from someone more experienced. */
const LEVEL_ORDER = ["beginner", "intermediate", "advanced"];
const ADMIN_ACCESS_CODE = "TEACH-2026";

function unlockedLevelIds(profile, progress, unpublished = [], customLessons = []) {
  if (profile?.role === "admin") return LEVEL_ORDER.slice();
  const startIdx = Math.max(0, LEVEL_ORDER.indexOf((profile?.startLevel || "Beginner").toLowerCase()));
  let maxUnlocked = startIdx;
  for (let i = startIdx; i < LEVEL_ORDER.length - 1; i++) {
    if (courseProgressPct(LEVEL_ORDER[i], progress, unpublished, customLessons) >= 100) maxUnlocked = i + 1;
    else break;
  }
  return LEVEL_ORDER.slice(0, maxUnlocked + 1);
}
function isLessonUnlocked(lesson, unlockedIds) {
  const mod = MODULES.find(m => m.id === lesson.moduleId);
  const course = mod && COURSES.find(c => c.id === mod.courseId);
  return course ? unlockedIds.includes(course.id) : true;
}

function continueTarget(progress, unpublished = [], unlockedIds = LEVEL_ORDER) {
  const eligible = (l) => !unpublished.includes(l.id) && !progress.completedLessons.includes(l.id) && isLessonUnlocked(l, unlockedIds);
  if (progress.lastVisitedLessonId) {
    const l = findLesson(progress.lastVisitedLessonId);
    if (l && eligible(l)) return l;
  }
  return LESSONS.find(eligible) || null;
}
function findModule(id) { return MODULES.find(m => m.id === id); }
function findCourse(id) { return COURSES.find(c => c.id === id); }
function nextLessonAfter(lessonId) {
  const idx = LESSONS.findIndex(l => l.id === lessonId);
  return LESSONS[idx + 1] || null;
}

/* =========================================================================
   Shared UI bits
   ========================================================================= */

const displayFont = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
const arabicFont = { fontFamily: "'Noto Naskh Arabic', 'Noto Sans Arabic', ui-sans-serif, system-ui, sans-serif" };

function GoldStar8({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
      <polygon points="50,4 61,32 90,29 68,50 90,71 61,68 50,96 39,68 10,71 32,50 10,29 39,32" />
    </svg>
  );
}

function BackIcon({ dir }) { return dir === "rtl" ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />; }
function DirChevron({ dir, className }) { return dir === "rtl" ? <ChevronLeft className={className} /> : <ChevronRight className={className} />; }

function BackButton({ onClick, label }) {
  const { dir } = useApp();
  return (
    <button onClick={onClick} className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700">
      <BackIcon dir={dir} /> {label}
    </button>
  );
}

function PrincipleChip({ type }) {
  const { lang } = useApp();
  const map = {
    quran: { key: "Qur'an", cls: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    hadith: { key: "Hadith", cls: "bg-teal-50 text-teal-800 border-teal-200" },
    scholarly: { key: "Scholarly view", cls: "bg-amber-50 text-amber-800 border-amber-200" },
    maxim: { key: "Fiqh maxim", cls: "bg-stone-100 text-stone-700 border-stone-300" },
  };
  const labels = { "Qur'an": {sw:"Qur'an",ar:"القرآن",fr:"Coran"}, "Hadith": {sw:"Hadithi",ar:"الحديث",fr:"Hadith"}, "Scholarly view": {sw:"Maoni ya kisomi",ar:"رأي علمي",fr:"Avis savant"}, "Fiqh maxim": {sw:"Kanuni ya fiqh",ar:"قاعدة فقهية",fr:"Maxime du fiqh"} };
  const m = map[type] || map.scholarly;
  const label = labels[m.key]?.[lang] || m.key;
  return <span className={`inline-block text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${m.cls}`}>{label}</span>;
}

function ProgressBar({ pct, colorCls = "bg-emerald-600" }) {
  return (
    <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
      <div className={`h-full ${colorCls} rounded-full transition-all duration-500`} style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
    </div>
  );
}

function Disclaimer({ compact }) {
  const { t: tr } = useApp();
  return (
    <div className={`flex gap-2 items-start rounded-xl border border-amber-200 bg-amber-50 text-amber-900 ${compact ? "p-2 text-xs" : "p-3 text-sm"}`}>
      <Info className="w-4 h-4 mt-0.5 shrink-0" />
      <p>{tr("disclaimer_text")}</p>
    </div>
  );
}

function navItems(tr) {
  return [
    { id: "dashboard", label: tr("nav_home"), icon: Home },
    { id: "courses", label: tr("nav_learn"), icon: BookOpen },
    { id: "marketplace", label: tr("nav_market"), icon: ShoppingBag },
    { id: "glossary", label: tr("nav_glossary"), icon: Library },
    { id: "bookmarks", label: tr("nav_saved"), icon: Bookmark },
    { id: "profile", label: tr("nav_profile"), icon: User },
  ];
}

function TopBar({ profile, progress, view, setView, onOpenProfile, onOpenSearch }) {
  const { t: tr } = useApp();
  const items = navItems(tr);
  return (
    <div className="sticky top-0 z-20 bg-emerald-900 text-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <button onClick={() => setView("dashboard")} className="flex items-center gap-2 min-w-0 shrink-0">
          <GoldStar8 className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="font-semibold tracking-tight truncate hidden sm:inline" style={displayFont}>{tr("app_name")}</span>
        </button>

        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {items.map(it => {
            const Icon = it.icon;
            const active = view === it.id;
            return (
              <button key={it.id} onClick={() => setView(it.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-emerald-800 text-white" : "text-emerald-200 hover:bg-emerald-800/60"}`}>
                <Icon className="w-4 h-4" /> {it.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 shrink-0">
          <button onClick={onOpenSearch} aria-label="Search" className="p-2 rounded-full hover:bg-emerald-800/60"><Search className="w-4 h-4" /></button>
          <button onClick={onOpenProfile} className="flex items-center gap-2 text-sm bg-emerald-800/60 hover:bg-emerald-800 rounded-full pl-2 pr-3 py-1.5 transition-colors">
            <span className="flex items-center gap-1 text-amber-300"><Flame className="w-4 h-4" />{progress.streak?.current || 0}</span>
            <span className="w-px h-4 bg-emerald-700" />
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-300" />{progress.xp || 0}</span>
            {profile?.role === "admin" && <span className="hidden sm:inline text-[10px] bg-amber-400 text-emerald-900 font-semibold px-1.5 py-0.5 rounded-full">{tr("admin_badge")}</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomNav({ view, setView }) {
  const { t: tr } = useApp();
  const items = navItems(tr);
  return (
    <div className="md:hidden sticky bottom-0 z-20 bg-white border-t border-stone-200 flex justify-around py-1.5">
      {items.map(it => {
        const Icon = it.icon;
        const active = view === it.id;
        return (
          <button key={it.id} onClick={() => setView(it.id)} className="flex flex-col items-center gap-0.5 px-3 py-1 flex-1">
            <Icon className={`w-5 h-5 ${active ? "text-emerald-700" : "text-stone-400"}`} strokeWidth={active ? 2.4 : 2} />
            <span className={`text-[11px] ${active ? "text-emerald-700 font-semibold" : "text-stone-400"}`}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function LevelPill({ level }) {
  const { lang } = useApp();
  const cls = { Beginner: "bg-emerald-100 text-emerald-800", Intermediate: "bg-amber-100 text-amber-800", Advanced: "bg-stone-800 text-white" }[level] || "bg-stone-100 text-stone-700";
  return <span className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${cls}`}>{levelLabel(lang, level)}</span>;
}

function LanguagePicker({ value, onChange, dark }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {LANGUAGES.map(l => (
        <button
          key={l.code}
          onClick={() => onChange(l.code)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            value === l.code
              ? "bg-amber-400 border-amber-400 text-emerald-900"
              : dark ? "border-emerald-700 text-emerald-100 hover:bg-emerald-800" : "border-stone-300 text-stone-600 hover:border-emerald-400"
          }`}
        >
          {l.native}
        </button>
      ))}
    </div>
  );
}

function AchievementToast({ achievement, onClose }) {
  const { lang } = useApp();
  if (!achievement) return null;
  const Icon = ICONS[achievement.icon] || Award;
  const text = achievementText(lang, achievement);
  return (
    <div className="fixed inset-x-0 top-3 z-50 flex justify-center px-4">
      <div className="bg-emerald-900 text-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 max-w-sm w-full border border-amber-400/40">
        <div className="w-10 h-10 rounded-full bg-amber-400 text-emerald-900 flex items-center justify-center shrink-0"><Icon className="w-5 h-5" /></div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] uppercase tracking-wide text-amber-300 font-semibold">{t(lang, "achievement_unlocked")}</p>
          <p className="font-semibold truncate">{text.title}</p>
        </div>
        <button onClick={onClose} aria-label="Close" className="text-emerald-300 hover:text-white"><X className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon = Info, title, sub }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 py-12 px-6 text-stone-500">
      <Icon className="w-8 h-8 text-stone-300" />
      <p className="font-medium text-stone-600">{title}</p>
      {sub && <p className="text-sm">{sub}</p>}
    </div>
  );
}

/* =========================================================================
   Quiz engine
   ========================================================================= */

function QuizRunner({ title, questions, onComplete, passMark = 0.7 }) {
  const { t: tr } = useApp();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => questions.reduce((s, q) => s + (answers[q.id] === q.correct ? 1 : 0), 0), [answers, questions]);
  const allAnswered = questions.every(q => answers[q.id] !== undefined);
  function submit() { setSubmitted(true); onComplete(score, questions.length); }
  function retry() { setAnswers({}); setSubmitted(false); }
  const passed = submitted && (score / questions.length) >= passMark;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0"><PenLine className="w-4 h-4" /></div>
        <h3 className="font-semibold text-lg text-stone-800" style={displayFont}>{title}</h3>
      </div>

      {submitted && (
        <div className={`rounded-2xl p-4 border ${passed ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
          <p className={`font-semibold ${passed ? "text-emerald-800" : "text-rose-800"}`}>
            {score} / {questions.length} {tr("correct_suffix")} — {passed ? tr("quiz_passed_msg") : tr("quiz_failed_msg")}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {questions.map((q, i) => {
          const chosen = answers[q.id];
          return (
            <div key={q.id} className="bg-white rounded-2xl border border-stone-200 p-4">
              <p className="text-sm text-stone-500 mb-1">{tr("question_label")} {i + 1} {tr("of_connector")} {questions.length}</p>
              <p className="font-medium text-stone-800 mb-3">{q.prompt}</p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const isChosen = chosen === oi;
                  const isCorrect = oi === q.correct;
                  let cls = "border-stone-200 hover:border-emerald-400";
                  if (submitted) {
                    if (isCorrect) cls = "border-emerald-500 bg-emerald-50";
                    else if (isChosen && !isCorrect) cls = "border-rose-400 bg-rose-50";
                    else cls = "border-stone-200 opacity-60";
                  } else if (isChosen) cls = "border-emerald-600 bg-emerald-50";
                  return (
                    <button key={oi} disabled={submitted} onClick={() => setAnswers(a => ({ ...a, [q.id]: oi }))} className={`w-full text-left px-3 py-2 rounded-xl border text-sm transition-colors flex items-center gap-2 ${cls}`}>
                      {submitted ? (isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : (isChosen ? <X className="w-4 h-4 text-rose-500 shrink-0" /> : <Circle className="w-4 h-4 text-stone-300 shrink-0" />)) : (isChosen ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <Circle className="w-4 h-4 text-stone-300 shrink-0" />)}
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {submitted && <p className="mt-3 text-sm text-stone-600 bg-stone-50 rounded-lg p-2 border border-stone-100"><span className="font-semibold">{tr("why_label")} </span>{q.explanation}</p>}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button onClick={submit} disabled={!allAnswered} className="w-full py-3 rounded-xl bg-emerald-700 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-800 transition-colors">{tr("submit_answers")}</button>
      ) : (
        <button onClick={retry} className="w-full py-3 rounded-xl border border-emerald-700 text-emerald-700 font-semibold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"><RotateCcw className="w-4 h-4" /> {tr("retry_quiz")}</button>
      )}
    </div>
  );
}

/* =========================================================================
   Authentication — Login / Sign Up
   ========================================================================= */

function AuthShell({ mode, setMode, lang, setLang, children }) {
  const dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  const tr = (k, v) => t(lang, k, v);
  return (
    <div dir={dir} className="min-h-screen bg-emerald-900 flex flex-col justify-center px-6 py-10 text-white" style={lang === "ar" ? arabicFont : undefined}>
      <div className="max-w-sm mx-auto w-full space-y-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400 flex items-center justify-center"><GoldStar8 className="w-9 h-9 text-emerald-900" /></div>
          <h1 className="text-2xl font-semibold" style={displayFont}>{tr("app_name")}</h1>
          <p className="text-emerald-200 text-sm">{tr("onboarding_tagline")}</p>
        </div>
        <div className="flex justify-center"><LanguagePicker value={lang} onChange={setLang} dark /></div>
        <div className="flex bg-emerald-800 rounded-xl p-1">
          <button onClick={() => setMode("login")} className={`flex-1 py-2 rounded-lg text-sm font-medium ${mode === "login" ? "bg-white text-emerald-900" : "text-emerald-200"}`}>{tr("login_title")}</button>
          <button onClick={() => setMode("signup")} className={`flex-1 py-2 rounded-lg text-sm font-medium ${mode === "signup" ? "bg-white text-emerald-900" : "text-emerald-200"}`}>{tr("signup_title")}</button>
        </div>
        {children}
        <p className="text-[11px] text-emerald-300 text-center leading-relaxed">{tr("auth_demo_notice")}</p>
      </div>
    </div>
  );
}

function LoginForm({ lang, onLogIn, onSwitchToSignup }) {
  const tr = (k, v) => t(lang, k, v);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const result = onLogIn(email.trim().toLowerCase(), password);
    if (!result.ok) setError(tr(result.errorKey));
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl p-5 space-y-4 text-stone-800">
      <div><label className="text-sm font-medium text-stone-600">{tr("email_label")}</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full border border-stone-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
      <div><label className="text-sm font-medium text-stone-600">{tr("password_label")}</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full border border-stone-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
      {error && <p className="text-xs text-rose-600">{error}</p>}
      <button type="submit" disabled={!email.trim() || !password} className="w-full py-3 rounded-xl bg-emerald-700 text-white font-semibold disabled:opacity-40 hover:bg-emerald-800 transition-colors">{tr("login_title")}</button>
      <p className="text-xs text-stone-500 text-center">{tr("no_account_yet")} <button type="button" onClick={onSwitchToSignup} className="text-emerald-700 font-semibold">{tr("switch_to_signup")}</button></p>
    </form>
  );
}

function SignUpForm({ lang, onSignUp, onSwitchToLogin }) {
  const tr = (k, v) => t(lang, k, v);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wantsAdmin, setWantsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [level, setLevel] = useState("beginner");
  const [error, setError] = useState("");

  function nextStep(e) {
    e.preventDefault();
    setError("");
    if (password.length < 6) return setError(tr("password_too_short"));
    if (password !== confirmPassword) return setError(tr("passwords_no_match"));
    if (wantsAdmin && adminCode.trim() !== ADMIN_ACCESS_CODE) return setError(tr("invalid_admin_code"));
    setStep(2);
  }
  function finish(e) {
    e.preventDefault();
    const result = onSignUp({ name: name.trim(), email: email.trim().toLowerCase(), password, role: wantsAdmin ? "admin" : "learner", startLevel: level, language: lang });
    if (!result.ok) setError(tr(result.errorKey));
  }

  if (step === 1) {
    return (
      <form onSubmit={nextStep} className="bg-white rounded-2xl p-5 space-y-3 text-stone-800">
        <div><label className="text-sm font-medium text-stone-600">{tr("onboarding_name_label")}</label><input value={name} onChange={e => setName(e.target.value)} placeholder={tr("onboarding_name_placeholder")} className="mt-1 w-full border border-stone-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
        <div><label className="text-sm font-medium text-stone-600">{tr("email_label")}</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full border border-stone-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
        <div><label className="text-sm font-medium text-stone-600">{tr("password_label")}</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full border border-stone-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
        <div><label className="text-sm font-medium text-stone-600">{tr("confirm_password_label")}</label><input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-1 w-full border border-stone-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
        <label className="flex items-center gap-2 text-sm text-stone-600 pt-1"><input type="checkbox" checked={wantsAdmin} onChange={e => setWantsAdmin(e.target.checked)} /> {tr("signup_as_admin")}</label>
        {wantsAdmin && <input value={adminCode} onChange={e => setAdminCode(e.target.value)} placeholder={tr("admin_code_label")} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm" />}
        {error && <p className="text-xs text-rose-600">{error}</p>}
        <button type="submit" disabled={!name.trim() || !email.trim() || !password} className="w-full py-3 rounded-xl bg-emerald-700 text-white font-semibold disabled:opacity-40 hover:bg-emerald-800 transition-colors">{tr("continue_step")}</button>
        <p className="text-xs text-stone-500 text-center">{tr("have_account")} <button type="button" onClick={onSwitchToLogin} className="text-emerald-700 font-semibold">{tr("switch_to_login")}</button></p>
      </form>
    );
  }

  return (
    <form onSubmit={finish} className="bg-white rounded-2xl p-5 space-y-4 text-stone-800">
      <div>
        <label className="text-sm font-medium text-stone-600">{tr("onboarding_level_label")}</label>
        <div className="mt-2 grid grid-cols-1 gap-2">
          {["beginner", "intermediate", "advanced"].map(id => {
            const cap = id.charAt(0).toUpperCase() + id.slice(1);
            return (
              <button type="button" key={id} onClick={() => setLevel(id)} className={`text-left px-3 py-2 rounded-xl border flex items-center justify-between ${level === id ? "border-emerald-600 bg-emerald-50" : "border-stone-200"}`}>
                <span><span className="block font-medium">{tr(`level_${cap}`)}</span><span className="block text-xs text-stone-500">{tr(`level_${cap}_sub`)}</span></span>
                {level === id && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
      {error && <p className="text-xs text-rose-600">{error}</p>}
      <div className="flex gap-2">
        <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-stone-300 text-stone-600 font-medium">{tr("back_step")}</button>
        <button type="submit" className="flex-1 py-3 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors">{tr("create_account")}</button>
      </div>
    </form>
  );
}

function TroubleSigningIn({ lang, onResetAccount }) {
  const tr = (k) => t(lang, k);
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  if (!open) {
    return <button onClick={() => setOpen(true)} className="text-xs text-emerald-200 underline block mx-auto">{tr("trouble_signing_in")}</button>;
  }
  return (
    <div className="bg-emerald-800/60 rounded-xl p-3 text-center space-y-2">
      <p className="text-xs text-emerald-100">{tr("reset_account_explainer")}</p>
      {!confirming ? (
        <button onClick={() => setConfirming(true)} className="text-xs font-semibold text-amber-300 underline">{tr("reset_account_action")}</button>
      ) : (
        <div className="flex gap-2 justify-center">
          <button onClick={() => setConfirming(false)} className="text-xs px-3 py-1.5 rounded-full border border-emerald-600 text-emerald-100">{tr("cancel")}</button>
          <button onClick={onResetAccount} className="text-xs px-3 py-1.5 rounded-full bg-rose-600 text-white font-medium">{tr("yes_reset")}</button>
        </div>
      )}
    </div>
  );
}

function AuthScreen({ onSignUp, onLogIn, onResetAccount }) {
  const [mode, setMode] = useState("login");
  const [lang, setLang] = useState("en");
  return (
    <AuthShell mode={mode} setMode={setMode} lang={lang} setLang={setLang}>
      {mode === "login"
        ? <LoginForm lang={lang} onLogIn={onLogIn} onSwitchToSignup={() => setMode("signup")} />
        : <SignUpForm lang={lang} onSignUp={onSignUp} onSwitchToLogin={() => setMode("login")} />}
      <TroubleSigningIn lang={lang} onResetAccount={onResetAccount} />
    </AuthShell>
  );
}

/* =========================================================================
   Dashboard / Courses / Course detail
   ========================================================================= */

function Dashboard({ profile, progress, go }) {
  const { t: tr, lang, dir, unpublished, customLessons } = useApp();
  const unlocked = unlockedLevelIds(profile, progress, unpublished, customLessons);
  const target = continueTarget(progress, unpublished, unlocked);
  const unlockedLessonList = MODULES.filter(m => unlocked.includes(m.courseId)).flatMap(m => moduleVisibleLessons(m, unpublished, customLessons));
  const pct = unlockedLessonList.length ? Math.round((unlockedLessonList.filter(l => progress.completedLessons.includes(l.id)).length / unlockedLessonList.length) * 100) : 0;
  const recentAchievements = (progress.earnedAchievements || []).slice(-3).reverse().map(id => ACHIEVEMENTS.find(a => a.id === id)).filter(Boolean);

  return (
    <div className="p-4 space-y-5 pb-6 md:max-w-2xl md:mx-auto">
      <div>
        <p className="text-stone-500 text-sm">{tr("dashboard_welcome_back")}</p>
        <h1 className="text-2xl font-semibold text-stone-800" style={displayFont}>{profile.name}</h1>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white rounded-xl border border-stone-200 p-3 text-center"><Flame className="w-4 h-4 text-amber-500 mx-auto mb-1" /><p className="font-semibold text-stone-800">{progress.streak?.current || 0}</p><p className="text-[11px] text-stone-500">{tr("dashboard_streak")}</p></div>
        <div className="bg-white rounded-xl border border-stone-200 p-3 text-center"><Star className="w-4 h-4 text-amber-500 mx-auto mb-1" /><p className="font-semibold text-stone-800">{progress.xp || 0}</p><p className="text-[11px] text-stone-500">{tr("dashboard_xp")}</p></div>
        <div className="bg-white rounded-xl border border-stone-200 p-3 text-center"><Trophy className="w-4 h-4 text-amber-500 mx-auto mb-1" /><p className="font-semibold text-stone-800">{(progress.earnedAchievements || []).length}</p><p className="text-[11px] text-stone-500">{tr("dashboard_badges")}</p></div>
      </div>

      {target ? (
        <button onClick={() => go("lesson", target.id)} className="w-full text-left bg-emerald-800 text-white rounded-2xl p-4 flex items-center gap-3 hover:bg-emerald-900 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-amber-400 text-emerald-900 flex items-center justify-center shrink-0"><PlayCircle className="w-6 h-6" /></div>
          <div className="flex-1 min-w-0"><p className="text-[11px] uppercase tracking-wide text-emerald-200">{tr("dashboard_continue")}</p><p className="font-semibold truncate">{lessonLocalized(lang, target).title}</p></div>
          <DirChevron dir={dir} className="w-5 h-5 text-emerald-200 shrink-0" />
        </button>
      ) : (
        <div className="bg-emerald-800 text-white rounded-2xl p-4 flex items-center gap-3"><Trophy className="w-8 h-8 text-amber-400 shrink-0" /><p className="font-medium">{tr("dashboard_all_done")}</p></div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <div className="flex items-center justify-between mb-2"><p className="font-medium text-stone-700 text-sm">{tr("dashboard_overall_progress")}</p><p className="text-sm text-stone-500">{pct}%</p></div>
        <ProgressBar pct={pct} />
      </div>

      <div className="space-y-2">
        <p className="font-medium text-stone-700 text-sm px-1">{tr("dashboard_your_courses")}</p>
        {COURSES.filter(c => unlocked.includes(c.id)).map(c => {
          const cp = courseProgressPct(c.id, progress, unpublished, customLessons);
          return (
            <button key={c.id} onClick={() => go("courseDetail", c.id)} className="w-full text-left bg-white rounded-2xl border border-stone-200 p-4 flex items-center gap-3 hover:border-emerald-300 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1"><LevelPill level={c.level} /></div>
                <p className="font-medium text-stone-800 truncate">{courseTitle(lang, c)}</p>
                <div className="mt-2"><ProgressBar pct={cp} colorCls={cp === 100 ? "bg-amber-500" : "bg-emerald-600"} /></div>
              </div>
              <DirChevron dir={dir} className="w-5 h-5 text-stone-300 shrink-0" />
            </button>
          );
        })}
      </div>

      {recentAchievements.length > 0 && (
        <div className="space-y-2">
          <p className="font-medium text-stone-700 text-sm px-1">{tr("dashboard_recent_badges")}</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {recentAchievements.map(a => {
              const Icon = ICONS[a.icon] || Award;
              const text = achievementText(lang, a);
              return (
                <div key={a.id} className="shrink-0 w-28 bg-white rounded-xl border border-stone-200 p-3 text-center">
                  <div className="w-9 h-9 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-1"><Icon className="w-4 h-4" /></div>
                  <p className="text-xs font-medium text-stone-700 leading-tight">{text.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Disclaimer compact />
    </div>
  );
}

function CoursesScreen({ profile, progress, go }) {
  const { t: tr, lang, unpublished, customLessons, dir } = useApp();
  const unlocked = unlockedLevelIds(profile, progress, unpublished, customLessons);
  return (
    <div className="p-4 space-y-4 pb-6 md:max-w-2xl md:mx-auto">
      <h1 className="text-xl font-semibold text-stone-800" style={displayFont}>{tr("courses_title")}</h1>
      {COURSES.filter(c => unlocked.includes(c.id)).map(c => {
        const cp = courseProgressPct(c.id, progress, unpublished, customLessons);
        const mods = MODULES.filter(m => m.courseId === c.id);
        const activeMods = mods.filter(m => !m.comingSoon).length;
        return (
          <button key={c.id} onClick={() => go("courseDetail", c.id)} className="w-full text-left bg-white rounded-2xl border border-stone-200 p-4 hover:border-emerald-300 transition-colors">
            <div className="flex items-center gap-2 mb-1"><LevelPill level={c.level} /><span className="text-xs text-stone-400">{activeMods} {tr("modules_count")}</span></div>
            <p className="font-semibold text-stone-800" style={displayFont}>{courseTitle(lang, c)}</p>
            <p className="text-sm text-stone-500 mt-0.5">{courseTagline(lang, c)}</p>
            <div className="mt-3"><ProgressBar pct={cp} colorCls={cp === 100 ? "bg-amber-500" : "bg-emerald-600"} /></div>
          </button>
        );
      })}
      {unlocked.length < COURSES.length && (
        <p className="text-xs text-stone-400 text-center flex items-center justify-center gap-1.5 pt-1"><Lock className="w-3.5 h-3.5" /> {tr("locked_course_note")}</p>
      )}
    </div>
  );
}

function CourseDetailScreen({ courseId, progress, go, back }) {
  const { t: tr, lang, dir, unpublished, customLessons } = useApp();
  const course = findCourse(courseId);
  const mods = MODULES.filter(m => m.courseId === courseId);
  const allLessons = mods.flatMap(m => moduleVisibleLessons(m, unpublished, customLessons));
  const allDone = allLessons.length > 0 && allLessons.every(l => progress.completedLessons.includes(l.id));
  const finalAssessment = FINAL_ASSESSMENTS[courseId];
  const finalPassed = (progress.certificatesEarned || []).includes(courseId);

  return (
    <div className="p-4 space-y-4 pb-6 md:max-w-2xl md:mx-auto">
      <BackButton onClick={back} label={tr("back")} />
      <div><LevelPill level={course.level} /><h1 className="text-xl font-semibold text-stone-800 mt-1" style={displayFont}>{courseTitle(lang, course)}</h1><p className="text-sm text-stone-500">{courseTagline(lang, course)}</p></div>

      <div className="space-y-3">
        {mods.map(m => {
          const visible = moduleVisibleLessons(m, unpublished, customLessons);
          const modDone = visible.length > 0 && visible.every(l => progress.completedLessons.includes(l.id));
          return (
            <div key={m.id} className={`bg-white rounded-2xl border p-4 ${m.comingSoon && visible.length === 0 ? "border-stone-100 opacity-60" : "border-stone-200"}`}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{tr("module_label")} {m.number}</p>
                {m.comingSoon && visible.length === 0 ? <Lock className="w-4 h-4 text-stone-400" /> : (modDone && <CheckCircle2 className="w-4 h-4 text-emerald-600" />)}
              </div>
              <p className="font-medium text-stone-800 mb-2">{moduleTitle(lang, m)}</p>
              {visible.length === 0 ? (
                <p className="text-xs text-stone-400">{m.comingSoon ? tr("coming_soon_module") : tr("no_published_lessons")}</p>
              ) : (
                <div className="space-y-1.5">
                  {visible.map(l => {
                    const done = progress.completedLessons.includes(l.id);
                    const loc = lessonLocalized(lang, l);
                    return (
                      <button key={l.id} onClick={() => go("lesson", l.id)} className="w-full flex items-center gap-2 text-left px-2 py-2 rounded-lg hover:bg-stone-50">
                        {done ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <Circle className="w-4 h-4 text-stone-300 shrink-0" />}
                        <span className={`text-sm flex-1 ${done ? "text-stone-500" : "text-stone-700"}`}>{loc.title}</span>
                        {l.isCustom && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full shrink-0">{tr("community_added")}</span>}
                        <span className="text-[11px] text-stone-400 shrink-0">{l.minutes} {tr("min_read")}</span>
                      </button>
                    );
                  })}
                  {m.hasModuleAssessment && modDone && (
                    <button onClick={() => go("moduleAssessment", m.id)} className="w-full flex items-center gap-2 text-left px-2 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 mt-1">
                      <PenLine className="w-4 h-4 text-amber-700 shrink-0" /><span className="text-sm flex-1 text-amber-800 font-medium">{tr("module_assessment")}</span><DirChevron dir={dir} className="w-4 h-4 text-amber-500" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {finalAssessment && (
        <div className={`rounded-2xl p-4 border ${allDone ? "bg-emerald-800 border-emerald-800 text-white" : "bg-stone-100 border-stone-200 text-stone-400"}`}>
          <div className="flex items-center gap-2 mb-1"><Trophy className={`w-5 h-5 ${allDone ? "text-amber-400" : "text-stone-300"}`} /><p className="font-semibold">{finalAssessment.title}</p></div>
          {finalPassed ? (
            <button onClick={() => go("certificate", courseId)} className="mt-2 text-sm underline">{tr("view_certificate")}</button>
          ) : allDone ? (
            <button onClick={() => go("finalAssessment", courseId)} className="mt-2 w-full py-2 rounded-lg bg-amber-400 text-emerald-900 font-semibold text-sm">{tr("take_final_assessment")}</button>
          ) : (
            <p className="text-xs mt-1">{tr("final_assessment_locked")}</p>
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   Lesson screen
   ========================================================================= */

function NoteEditor({ lessonId, existing, onSave }) {
  const { t: tr } = useApp();
  const [text, setText] = useState(existing || "");
  const [editing, setEditing] = useState(!existing);
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4">
      <div className="flex items-center gap-2 mb-2">
        <StickyNote className="w-4 h-4 text-amber-600" /><p className="font-medium text-stone-700 text-sm flex-1">{tr("lesson_notes")}</p>
        {!editing && <button onClick={() => setEditing(true)} className="text-xs text-emerald-700 font-medium">{tr("edit")}</button>}
      </div>
      {editing ? (
        <div className="space-y-2">
          <textarea value={text} onChange={e => setText(e.target.value)} rows={3} placeholder={tr("lesson_notes_placeholder")} className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          <button onClick={() => { onSave(lessonId, text); setEditing(false); }} className="text-sm bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-medium">{tr("save_note")}</button>
        </div>
      ) : (<p className="text-sm text-stone-600 whitespace-pre-wrap">{text}</p>)}
    </div>
  );
}

function LessonScreen({ lessonId, profile, progress, actions, go, back }) {
  const { t: tr, lang, dir, unpublished, customLessons, customQuizzes } = useApp();
  const [showQuiz, setShowQuiz] = useState(false);
  const rawLesson = findLessonAny(lessonId, customLessons);
  const lesson = lessonLocalized(lang, rawLesson);
  const mod = findModule(lesson.moduleId);
  const course = findCourse(mod.courseId);
  const done = progress.completedLessons.includes(lesson.id);
  const bookmarked = (progress.bookmarks || []).includes(lesson.id);
  const quizQuestions = quizLocalized(lang, lesson.id, lesson.isCustom ? (customQuizzes?.[lesson.id] || []) : QUIZZES[lesson.quizId] || []);
  const attempt = progress.quizAttempts?.[lesson.quizId || lesson.id];
  const next = lesson.isCustom ? null : nextLessonAfter(lesson.id);
  const unlocked = unlockedLevelIds(profile, progress, unpublished, customLessons);

  useEffect(() => { actions.visitLesson(lesson.id); }, [lesson.id]); // eslint-disable-line

  if (!unlocked.includes(course.id)) {
    return (
      <div className="p-4 pb-8 space-y-4">
        <BackButton onClick={back} label={tr("back")} />
        <div className="flex flex-col items-center text-center gap-3 py-12 px-6">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center"><Lock className="w-6 h-6" /></div>
          <p className="font-medium text-stone-700">{tr("locked_level_title")}</p>
          <p className="text-sm text-stone-500 max-w-xs">{tr("locked_level_body")}</p>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    return (
      <div className="p-4 pb-8">
        <button onClick={() => setShowQuiz(false)} className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 mb-4"><BackIcon dir={dir} /> {tr("back_to_lesson")}</button>
        <QuizRunner title={`${tr("take_the_quiz")}: ${lesson.title}`} questions={quizQuestions} onComplete={(score, total) => { actions.recordQuizAttempt(lesson.quizId || lesson.id, score, total); actions.markLessonComplete(lesson.id); }} />
        {done && (
          <div className="mt-5 flex gap-2">
            <button onClick={() => setShowQuiz(false)} className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-600 text-sm font-medium">{tr("back_to_lesson")}</button>
            {next && <button onClick={() => go("lesson", next.id)} className="flex-1 py-2.5 rounded-xl bg-emerald-700 text-white text-sm font-medium">{tr("next_lesson")}</button>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 pb-8 md:max-w-2xl md:mx-auto">
      <div className="flex items-center justify-between">
        <BackButton onClick={back} label={tr("back")} />
        <button onClick={() => actions.toggleBookmark(lesson.id)} aria-label={tr("bookmarks_title")} className="text-stone-400 hover:text-amber-500"><Bookmark className={`w-5 h-5 ${bookmarked ? "fill-amber-400 text-amber-500" : ""}`} /></button>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{courseTitle(lang, course)} · {tr("module_label")} {mod.number}</p>
        <h1 className="text-2xl font-semibold text-stone-800 mt-1" style={displayFont}>{lesson.title}</h1>
        <div className="flex items-center gap-2 mt-1 text-xs text-stone-400">
          <Clock className="w-3.5 h-3.5" /> {lesson.minutes} {tr("min_read")}
          {done && <span className="flex items-center gap-1 text-emerald-600 font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> {tr("lesson_completed")}</span>}
          {lesson.isCustom && <span className="text-amber-700">· {tr("educator_by")} {lesson.addedBy}</span>}
        </div>
      </div>

      {lesson.notTranslated && (
        <div className="flex gap-2 items-start rounded-xl border border-sky-200 bg-sky-50 text-sky-900 p-3 text-sm"><Info className="w-4 h-4 mt-0.5 shrink-0" /><p>{tr("not_translated_banner")}</p></div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">{tr("lesson_objectives")}</p>
        <ul className="space-y-1">{lesson.objectives.map((o, i) => (<li key={i} className="text-sm text-stone-700 flex gap-2"><span className="text-emerald-600 mt-0.5">•</span><span>{o}</span></li>))}</ul>
      </div>

      <p className="text-stone-700 leading-relaxed">{lesson.intro}</p>
      <div className="space-y-3">{lesson.explanation.map((p, i) => (<p key={i} className="text-stone-700 leading-relaxed">{p}</p>))}</div>

      <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{tr("lesson_examples")}</p>
        {lesson.examples.map((e, i) => (<p key={i} className="text-sm text-emerald-900">{e}</p>))}
      </div>

      <div className="bg-stone-100 rounded-2xl p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">{tr("lesson_scenario")}</p>
        <p className="text-sm text-stone-700">{lesson.scenario}</p>
      </div>

      {lesson.principles?.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 px-1">{tr("lesson_principles")}</p>
          {lesson.principles.map((pr, i) => (
            <div key={i} className="bg-white rounded-xl border border-stone-200 p-3 space-y-1.5">
              <div className="flex items-center gap-2"><PrincipleChip type={pr.type} /><span className="text-xs text-stone-400">{pr.ref}</span></div>
              <p className="text-sm text-stone-700">{pr.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">{tr("lesson_summary")}</p>
        <p className="text-sm text-stone-700">{lesson.summary}</p>
        <ul className="space-y-1 pt-1">{lesson.takeaways.map((tk, i) => (<li key={i} className="text-sm text-stone-700 flex gap-2"><Star className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" /><span>{tk}</span></li>))}</ul>
      </div>

      <NoteEditor lessonId={lesson.id} existing={progress.notes?.[lesson.id]} onSave={actions.saveNote} />

      {quizQuestions.length > 0 && (
        <button onClick={() => setShowQuiz(true)} className="w-full py-3 rounded-xl bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 hover:bg-emerald-800 transition-colors">
          <PenLine className="w-4 h-4" /> {attempt ? `${tr("take_the_quiz")} (${attempt.score}/${attempt.total})` : tr("take_the_quiz")}
        </button>
      )}
    </div>
  );
}

/* =========================================================================
   Module & final assessments, certificate
   ========================================================================= */

function ModuleAssessmentScreen({ moduleId, actions, back }) {
  const { t: tr } = useApp();
  const assessment = MODULE_ASSESSMENTS[moduleId];
  return (
    <div className="p-4 pb-8">
      <BackButton onClick={back} label={tr("back")} />
      <div className="mt-4"><QuizRunner title={assessment.title} questions={assessment.questions} passMark={0.7} onComplete={(score, total) => actions.recordQuizAttempt(`module:${moduleId}`, score, total)} /></div>
    </div>
  );
}

function FinalAssessmentScreen({ courseId, actions, replaceTop, back }) {
  const { t: tr, lang } = useApp();
  const assessment = FINAL_ASSESSMENTS[courseId];
  const course = findCourse(courseId);
  return (
    <div className="p-4 pb-8">
      <BackButton onClick={back} label={tr("back")} />
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 mt-4 mb-1">{courseTitle(lang, course)}</p>
      <QuizRunner title={assessment.title} questions={assessment.questions} passMark={0.7} onComplete={(score, total) => { actions.recordQuizAttempt(`final:${courseId}`, score, total); if (score / total >= 0.7) { actions.awardCertificate(courseId); replaceTop("certificate", courseId); } }} />
    </div>
  );
}

function CertificateScreen({ courseId, profile, back }) {
  const { t: tr, lang } = useApp();
  const course = findCourse(courseId);
  const date = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  return (
    <div className="p-4 pb-8 space-y-4">
      <div className="print:hidden"><BackButton onClick={back} label={tr("back")} /></div>
      <div className="bg-white border-4 border-emerald-800 rounded-2xl p-8 text-center relative overflow-hidden">
        <GoldStar8 className="w-10 h-10 text-amber-400 absolute -top-2 -left-2 opacity-30" />
        <GoldStar8 className="w-10 h-10 text-amber-400 absolute -bottom-2 -right-2 opacity-30" />
        <GoldStar8 className="w-10 h-10 text-amber-500 mx-auto mb-3" />
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 font-semibold">{tr("certificate_title")}</p>
        <p className="text-stone-500 text-sm mt-4">{tr("certificate_this_certifies")}</p>
        <p className="text-3xl mt-1 mb-4 text-stone-800" style={displayFont}>{profile.name}</p>
        <p className="text-stone-500 text-sm">{tr("certificate_has_completed")}</p>
        <p className="text-lg font-semibold text-emerald-800 mt-1">{courseTitle(lang, course)}</p>
        <p className="text-xs text-stone-400 mt-6">{tr("app_name")} · {date}</p>
      </div>
      <button onClick={() => window.print()} className="w-full py-3 rounded-xl border border-emerald-700 text-emerald-700 font-semibold flex items-center justify-center gap-2 print:hidden"><Printer className="w-4 h-4" /> {tr("print_certificate")}</button>
      <p className="text-[11px] text-stone-400 text-center print:hidden">{tr("certificate_disclaimer")}</p>
    </div>
  );
}

/* =========================================================================
   Glossary
   ========================================================================= */

function GlossaryScreen({ allTerms, profile, progress, actions, go }) {
  const { t: tr, lang, dir, unpublished, customLessons } = useApp();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const unlocked = unlockedLevelIds(profile, progress, unpublished, customLessons);

  const localizedList = useMemo(() => allTerms.map(term => ({
    term,
    headword: glossaryHeadword(lang, term),
    definition: glossaryField(lang, term, "definition"),
  })).sort((a, b) => a.headword.localeCompare(b.headword)), [allTerms, lang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return localizedList;
    return localizedList.filter(t2 => t2.headword.toLowerCase().includes(q) || t2.definition.toLowerCase().includes(q) || t2.term.term.toLowerCase().includes(q));
  }, [localizedList, query]);

  if (selected) {
    const t2 = selected.term;
    return (
      <div className="p-4 pb-8 space-y-4">
        <BackButton onClick={() => setSelected(null)} label={tr("nav_glossary")} />
        <h1 className="text-2xl font-semibold text-stone-800" style={displayFont}>{glossaryHeadword(lang, t2)}</h1>
        <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3">
          <div><p className="text-xs font-semibold uppercase tracking-wide text-stone-400">{tr("glossary_definition")}</p><p className="text-sm text-stone-700 mt-0.5">{glossaryField(lang, t2, "definition")}</p></div>
          <div><p className="text-xs font-semibold uppercase tracking-wide text-stone-400">{tr("glossary_how")}</p><p className="text-sm text-stone-700 mt-0.5">{glossaryField(lang, t2, "how")}</p></div>
          <div><p className="text-xs font-semibold uppercase tracking-wide text-stone-400">{tr("glossary_example")}</p><p className="text-sm text-stone-700 mt-0.5">{glossaryField(lang, t2, "example")}</p></div>
          <div><p className="text-xs font-semibold uppercase tracking-wide text-stone-400">{tr("glossary_shariah")}</p><p className="text-sm text-stone-700 mt-0.5">{glossaryField(lang, t2, "shariah")}</p></div>
        </div>
        {t2.relatedLessonIds?.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2 px-1">{tr("glossary_related")}</p>
            <div className="space-y-1.5">
              {t2.relatedLessonIds.map(lid => {
                const l = findLesson(lid);
                if (!l || !isLessonUnlocked(l, unlocked)) return null;
                return (
                  <button key={lid} onClick={() => go("lesson", lid)} className="w-full flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-3 py-2 text-left hover:border-emerald-300">
                    <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" /><span className="text-sm text-stone-700 flex-1">{lessonLocalized(lang, l).title}</span><DirChevron dir={dir} className="w-4 h-4 text-stone-300" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 pb-6 md:max-w-2xl md:mx-auto">
      <h1 className="text-xl font-semibold text-stone-800" style={displayFont}>{tr("nav_glossary")}</h1>
      <div className="relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder={tr("glossary_search_placeholder")} className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>
      <div className="space-y-1.5">
        {filtered.map(t2 => (
          <button key={t2.term.term} onClick={() => { setSelected(t2); actions.viewGlossaryTerm(t2.term.term); }} className="w-full text-left bg-white border border-stone-200 rounded-xl px-4 py-3 hover:border-emerald-300 flex items-center justify-between">
            <div className="min-w-0"><p className="font-medium text-stone-800">{t2.headword}</p><p className="text-xs text-stone-500 truncate">{t2.definition}</p></div>
            <DirChevron dir={dir} className="w-4 h-4 text-stone-300 shrink-0 ml-2" />
          </button>
        ))}
        {filtered.length === 0 && <EmptyState icon={Search} title={tr("glossary_no_match")} />}
      </div>
    </div>
  );
}

/* =========================================================================
   Search (lessons + glossary)
   ========================================================================= */

function SearchScreen({ allTerms, profile, progress, go, close }) {
  const { t: tr, lang, unpublished, customLessons, catalog } = useApp();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const unlocked = unlockedLevelIds(profile, progress, unpublished, customLessons);
  const allLessonsForSearch = [...LESSONS, ...(customLessons || [])].filter(l => isLessonUnlocked(l, unlocked));
  const lessonResults = q ? allLessonsForSearch.filter(l => lessonLocalized(lang, l).title.toLowerCase().includes(q)) : [];
  const termResults = q ? allTerms.filter(term => glossaryHeadword(lang, term).toLowerCase().includes(q) || glossaryField(lang, term, "definition").toLowerCase().includes(q)) : [];
  const productResults = q ? (catalog.products || []).filter(p => p.title.toLowerCase().includes(q)) : [];

  return (
    <div className="fixed inset-0 bg-white z-30 flex flex-col">
      <div className="p-4 border-b border-stone-200 flex items-center gap-2">
        <Search className="w-4 h-4 text-stone-400" />
        <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder={tr("search_placeholder")} className="flex-1 outline-none text-sm" />
        <button onClick={close} aria-label="Close"><X className="w-5 h-5 text-stone-400" /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!q && <EmptyState icon={Search} title={tr("search_empty_title")} sub={tr("search_empty_sub")} />}
        {q && lessonResults.length === 0 && termResults.length === 0 && productResults.length === 0 && <EmptyState icon={Search} title={tr("search_no_matches")} />}
        {lessonResults.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">{tr("search_lessons_hdr")}</p>
            <div className="space-y-1.5">{lessonResults.map(l => (<button key={l.id} onClick={() => { go("lesson", l.id); close(); }} className="w-full flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2 text-left"><BookOpen className="w-4 h-4 text-emerald-600 shrink-0" /><span className="text-sm text-stone-700">{lessonLocalized(lang, l).title}</span></button>))}</div>
          </div>
        )}
        {productResults.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">{tr("marketplace_title")}</p>
            <div className="space-y-1.5">{productResults.map(p => (<button key={p.id} onClick={() => { go("productDetail", p.id); close(); }} className="w-full flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2 text-left"><ShoppingBag className="w-4 h-4 text-emerald-600 shrink-0" /><span className="text-sm text-stone-700">{p.title}</span></button>))}</div>
          </div>
        )}
        {termResults.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">{tr("search_glossary_hdr")}</p>
            <div className="space-y-1.5">{termResults.map(term => (<button key={term.term} onClick={() => { go("glossary"); close(); }} className="w-full flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2 text-left"><Search className="w-4 h-4 text-amber-600 shrink-0" /><span className="text-sm text-stone-700">{glossaryHeadword(lang, term)}</span></button>))}</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   Bookmarks
   ========================================================================= */

function BookmarksScreen({ progress, go }) {
  const { t: tr, lang, customLessons } = useApp();
  const bookmarked = (progress.bookmarks || []).map(id => findLessonAny(id, customLessons)).filter(Boolean);
  return (
    <div className="p-4 space-y-3 pb-6 md:max-w-2xl md:mx-auto">
      <h1 className="text-xl font-semibold text-stone-800" style={displayFont}>{tr("bookmarks_title")}</h1>
      {bookmarked.length === 0 && <EmptyState icon={Bookmark} title={tr("bookmarks_empty_title")} sub={tr("bookmarks_empty_sub")} />}
      {bookmarked.map(l => {
        const loc = lessonLocalized(lang, l);
        const note = progress.notes?.[l.id];
        return (
          <button key={l.id} onClick={() => go("lesson", l.id)} className="w-full text-left bg-white border border-stone-200 rounded-2xl p-4 hover:border-emerald-300">
            <p className="font-medium text-stone-800">{loc.title}</p>
            {note && <p className="text-xs text-stone-500 mt-1 flex items-start gap-1"><StickyNote className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" />{note}</p>}
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================================
   Profile
   ========================================================================= */

function ProfileScreen({ profile, progress, onReset, onOpenAdmin, onOpenAdminDashboard, onChangeLanguage, onChangeLevel, onLogOut }) {
  const { t: tr, lang, dir } = useApp();
  const [confirmReset, setConfirmReset] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showLevel, setShowLevel] = useState(false);
  const attempts = Object.values(progress.quizAttempts || {});
  const avgPct = attempts.length ? Math.round(100 * attempts.reduce((s, a) => s + a.score / a.total, 0) / attempts.length) : 0;
  const isAdmin = profile.role === "admin";

  return (
    <div className="p-4 space-y-4 pb-8 md:max-w-xl md:mx-auto">
      <div className="text-center py-2">
        <div className="w-16 h-16 rounded-full bg-emerald-800 text-white flex items-center justify-center mx-auto text-2xl font-semibold" style={displayFont}>{profile.name.charAt(0).toUpperCase()}</div>
        <h1 className="text-xl font-semibold text-stone-800 mt-2 flex items-center justify-center gap-2" style={displayFont}>
          {profile.name}
          <span className={`text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full ${isAdmin ? "bg-amber-400 text-emerald-900" : "bg-stone-100 text-stone-500"}`}>{isAdmin ? tr("admin_badge") : tr("learner_badge")}</span>
        </h1>
        {profile.email && <p className="text-xs text-stone-400">{profile.email}</p>}
        <p className="text-sm text-stone-500 mt-0.5">{tr("profile_started_at", { level: levelLabel(lang, profile.startLevel) })}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-xl border border-stone-200 p-3 text-center"><p className="text-lg font-semibold text-stone-800">{progress.completedLessons.length}/{TOTAL_LESSONS}</p><p className="text-[11px] text-stone-500">{tr("profile_lessons_complete")}</p></div>
        <div className="bg-white rounded-xl border border-stone-200 p-3 text-center"><p className="text-lg font-semibold text-stone-800">{avgPct}%</p><p className="text-[11px] text-stone-500">{tr("profile_avg_score")}</p></div>
        <div className="bg-white rounded-xl border border-stone-200 p-3 text-center"><p className="text-lg font-semibold text-stone-800">{progress.streak?.longest || 0}</p><p className="text-[11px] text-stone-500">{tr("profile_longest_streak")}</p></div>
        <div className="bg-white rounded-xl border border-stone-200 p-3 text-center"><p className="text-lg font-semibold text-stone-800">{(progress.certificatesEarned || []).length}</p><p className="text-[11px] text-stone-500">{tr("profile_certificates")}</p></div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2">
        <p className="font-medium text-stone-700 text-sm flex items-center gap-2"><Languages className="w-4 h-4 text-emerald-700" /> {tr("profile_language")}</p>
        <LanguagePicker value={lang} onChange={onChangeLanguage} />
      </div>

      {!isAdmin && (
        <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2">
          <button onClick={() => setShowLevel(s => !s)} className="w-full flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-700" /> <p className="font-medium text-stone-700 text-sm flex-1 text-left">{tr("change_level_label")}</p>
            <span className="text-xs text-stone-500">{levelLabel(lang, profile.startLevel)}</span>
            <ChevronDown className={`w-4 h-4 text-stone-300 transition-transform ${showLevel ? "rotate-180" : ""}`} />
          </button>
          {showLevel && (
            <div className="space-y-1.5 pt-1">
              {["beginner", "intermediate", "advanced"].map(id => {
                const cap = id.charAt(0).toUpperCase() + id.slice(1);
                const active = profile.startLevel === cap;
                return (
                  <button key={id} onClick={() => onChangeLevel(id)} className={`w-full text-left px-3 py-2 rounded-lg border text-sm ${active ? "border-emerald-600 bg-emerald-50 text-emerald-800 font-medium" : "border-stone-200 text-stone-600"}`}>{tr(`level_${cap}`)}</button>
                );
              })}
              <p className="text-[11px] text-stone-400 pt-1">{tr("change_level_note")}</p>
            </div>
          )}
        </div>
      )}

      <div>
        <p className="font-medium text-stone-700 text-sm mb-2 px-1">{tr("profile_achievements")}</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {ACHIEVEMENTS.map(a => {
            const earned = (progress.earnedAchievements || []).includes(a.id);
            const Icon = ICONS[a.icon] || Award;
            const text = achievementText(lang, a);
            return (
              <div key={a.id} className={`rounded-xl border p-3 text-center ${earned ? "bg-amber-50 border-amber-200" : "bg-stone-50 border-stone-200 opacity-50"}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${earned ? "bg-amber-400 text-emerald-900" : "bg-stone-200 text-stone-400"}`}><Icon className="w-4 h-4" /></div>
                <p className="text-[11px] font-medium text-stone-700 leading-tight">{text.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {isAdmin && (
        <>
          <button onClick={onOpenAdminDashboard} className="w-full flex items-center gap-2 bg-emerald-800 text-white rounded-xl px-4 py-3 text-sm font-medium hover:bg-emerald-900">
            <Coins className="w-4 h-4 text-amber-400" /> {tr("view_admin_dashboard")} <DirChevron dir={dir} className="w-4 h-4 text-emerald-300 ml-auto" />
          </button>
          <button onClick={onOpenAdmin} className="w-full flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm font-medium text-stone-700 hover:border-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-700" /> {tr("profile_content_studio")} <DirChevron dir={dir} className="w-4 h-4 text-stone-300 ml-auto" />
          </button>
        </>
      )}

      <button onClick={() => setShowAbout(s => !s)} className="w-full flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm font-medium text-stone-700">
        <Info className="w-4 h-4 text-stone-500" /> {tr("about_demo")} <ChevronDown className={`w-4 h-4 text-stone-300 ml-auto transition-transform ${showAbout ? "rotate-180" : ""}`} />
      </button>
      {showAbout && (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-600 space-y-1.5 leading-relaxed">
          <p>{tr("about_demo_p1")}</p>
          <p>{tr("about_demo_p2")}</p>
          <p>{tr("auth_demo_notice")}</p>
        </div>
      )}

      <Disclaimer />

      <div className="pt-2 space-y-2">
        <button onClick={onLogOut} className="w-full flex items-center justify-center gap-2 text-stone-600 text-sm font-medium py-2 border border-stone-300 rounded-xl"><LogOut className="w-4 h-4" /> {tr("log_out")}</button>
        {!confirmReset ? (
          <button onClick={() => setConfirmReset(true)} className="w-full flex items-center justify-center gap-2 text-rose-600 text-sm font-medium py-2"><RotateCcw className="w-4 h-4" /> {tr("reset_progress")}</button>
        ) : (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-center space-y-2">
            <p className="text-sm text-rose-700">{tr("reset_confirm")}</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmReset(false)} className="flex-1 py-2 rounded-lg border border-stone-300 text-sm">{tr("cancel")}</button>
              <button onClick={onReset} className="flex-1 py-2 rounded-lg bg-rose-600 text-white text-sm font-medium">{tr("yes_reset")}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   Admin / Content Studio — publish toggles, glossary CRUD, and the
   educator "add a full lesson" panel. All writes go to SHARED storage,
   so changes are visible to everyone using this app instance.
   ========================================================================= */

function EducatorLessonForm({ onSubmit }) {
  const { t: tr, lang } = useApp();
  const blank = () => ({
    educatorName: "", educatorLanguage: lang, moduleId: MODULES[0].id, title: "", minutes: 6,
    objectivesText: "", introText: "", explanationText: "", examplesText: "", scenarioText: "", summaryText: "", takeawaysText: "",
    principles: [{ type: "scholarly", ref: "", text: "" }],
    questions: [{ prompt: "", options: ["", ""], correct: 0, explanation: "" }],
  });
  const [f, setF] = useState(blank());
  const set = (k, v) => setF(prev => ({ ...prev, [k]: v }));

  function updatePrinciple(i, patch) { setF(prev => ({ ...prev, principles: prev.principles.map((p, idx) => idx === i ? { ...p, ...patch } : p) })); }
  function addPrinciple() { setF(prev => ({ ...prev, principles: [...prev.principles, { type: "scholarly", ref: "", text: "" }] })); }
  function removePrinciple(i) { setF(prev => ({ ...prev, principles: prev.principles.filter((_, idx) => idx !== i) })); }

  function updateQuestion(i, patch) { setF(prev => ({ ...prev, questions: prev.questions.map((q, idx) => idx === i ? { ...q, ...patch } : q) })); }
  function addQuestion() { setF(prev => ({ ...prev, questions: [...prev.questions, { prompt: "", options: ["", ""], correct: 0, explanation: "" }] })); }
  function removeQuestion(i) { setF(prev => ({ ...prev, questions: prev.questions.filter((_, idx) => idx !== i) })); }
  function updateOption(qi, oi, val) { setF(prev => ({ ...prev, questions: prev.questions.map((q, idx) => idx === qi ? { ...q, options: q.options.map((o, oidx) => oidx === oi ? val : o) } : q) })); }
  function addOption(qi) { setF(prev => ({ ...prev, questions: prev.questions.map((q, idx) => idx === qi ? { ...q, options: [...q.options, ""] } : q) })); }

  const linesOf = (s) => s.split("\n").map(x => x.trim()).filter(Boolean);

  function submit(e) {
    e.preventDefault();
    if (!f.title.trim() || !f.educatorName.trim() || !f.introText.trim()) return;
    const id = `custom-${Date.now()}`;
    const lesson = {
      id, moduleId: f.moduleId, title: f.title.trim(), minutes: Number(f.minutes) || 5,
      objectives: linesOf(f.objectivesText), intro: f.introText.trim(), explanation: linesOf(f.explanationText),
      examples: linesOf(f.examplesText), scenario: f.scenarioText.trim(), summary: f.summaryText.trim(),
      takeaways: linesOf(f.takeawaysText),
      principles: f.principles.filter(p => p.text.trim()),
      quizId: id, isCustom: true, addedBy: f.educatorName.trim(), language: f.educatorLanguage,
    };
    const quiz = f.questions.filter(q => q.prompt.trim() && q.options.filter(o=>o.trim()).length>=2).map((q, i) => ({
      id: `${id}q${i}`, type: q.options.length===2 ? "tf" : "mcq", prompt: q.prompt.trim(), options: q.options.map(o=>o.trim()).filter(Boolean), correct: q.correct, explanation: q.explanation.trim() || "—",
    }));
    onSubmit(lesson, quiz);
    setF(blank());
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-stone-500">{tr("educator_name_label")}</label>
          <input value={f.educatorName} onChange={e => set("educatorName", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" />
        </div>
        <div>
          <label className="text-xs text-stone-500">{tr("educator_language_label")}</label>
          <select value={f.educatorLanguage} onChange={e => set("educatorLanguage", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5 bg-white">
            {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.native}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs text-stone-500">{tr("educator_module_label")}</label>
        <select value={f.moduleId} onChange={e => set("moduleId", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5 bg-white">
          {MODULES.map(m => <option key={m.id} value={m.id}>{tr("module_label")} {m.number} — {m.title}{m.comingSoon ? ` (${tr("coming_soon_module").slice(0,20)}…)` : ""}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1">
          <label className="text-xs text-stone-500">{tr("educator_title_label")}</label>
          <input value={f.title} onChange={e => set("title", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" />
        </div>
        <div>
          <label className="text-xs text-stone-500">{tr("educator_minutes_label")}</label>
          <input type="number" min="1" value={f.minutes} onChange={e => set("minutes", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" />
        </div>
      </div>
      <div><label className="text-xs text-stone-500">{tr("educator_objectives_label")} — {tr("educator_oneperline")}</label><textarea rows={2} value={f.objectivesText} onChange={e => set("objectivesText", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" /></div>
      <div><label className="text-xs text-stone-500">{tr("educator_intro_label")}</label><textarea rows={2} value={f.introText} onChange={e => set("introText", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" /></div>
      <div><label className="text-xs text-stone-500">{tr("educator_explanation_label")} — {tr("educator_oneperline")}</label><textarea rows={3} value={f.explanationText} onChange={e => set("explanationText", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" /></div>
      <div><label className="text-xs text-stone-500">{tr("educator_examples_label")} — {tr("educator_oneperline")}</label><textarea rows={2} value={f.examplesText} onChange={e => set("examplesText", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" /></div>
      <div><label className="text-xs text-stone-500">{tr("educator_scenario_label")}</label><textarea rows={2} value={f.scenarioText} onChange={e => set("scenarioText", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" /></div>
      <div><label className="text-xs text-stone-500">{tr("educator_summary_label")}</label><textarea rows={2} value={f.summaryText} onChange={e => set("summaryText", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" /></div>
      <div><label className="text-xs text-stone-500">{tr("educator_takeaways_label")} — {tr("educator_oneperline")}</label><textarea rows={2} value={f.takeawaysText} onChange={e => set("takeawaysText", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" /></div>

      <div className="space-y-2 border-t border-stone-100 pt-3">
        <label className="text-xs text-stone-500">{tr("educator_principles_label")}</label>
        {f.principles.map((p, i) => (
          <div key={i} className="flex gap-1.5 items-start bg-stone-50 rounded-lg p-2">
            <select value={p.type} onChange={e => updatePrinciple(i, { type: e.target.value })} className="border border-stone-300 rounded-md text-xs px-1.5 py-1.5 bg-white shrink-0">
              <option value="quran">Qur'an</option><option value="hadith">Hadith</option><option value="scholarly">Scholarly</option><option value="maxim">Maxim</option>
            </select>
            <div className="flex-1 space-y-1">
              <input value={p.ref} onChange={e => updatePrinciple(i, { ref: e.target.value })} placeholder={tr("educator_reference_placeholder")} className="w-full border border-stone-300 rounded-md px-2 py-1 text-xs" />
              <input value={p.text} onChange={e => updatePrinciple(i, { text: e.target.value })} placeholder={tr("educator_principle_text_placeholder")} className="w-full border border-stone-300 rounded-md px-2 py-1 text-xs" />
            </div>
            {f.principles.length > 1 && <button type="button" onClick={() => removePrinciple(i)} className="text-rose-400 shrink-0 mt-1"><Trash2 className="w-3.5 h-3.5" /></button>}
          </div>
        ))}
        <button type="button" onClick={addPrinciple} className="text-xs text-emerald-700 font-medium">{tr("educator_add_principle")}</button>
      </div>

      <div className="space-y-2 border-t border-stone-100 pt-3">
        <label className="text-xs text-stone-500">{tr("educator_quiz_label")}</label>
        {f.questions.map((q, qi) => (
          <div key={qi} className="bg-stone-50 rounded-lg p-2 space-y-1.5">
            <div className="flex gap-1.5 items-start">
              <input value={q.prompt} onChange={e => updateQuestion(qi, { prompt: e.target.value })} placeholder={tr("educator_question_placeholder")} className="flex-1 border border-stone-300 rounded-md px-2 py-1 text-xs" />
              {f.questions.length > 1 && <button type="button" onClick={() => removeQuestion(qi)} className="text-rose-400 shrink-0 mt-1"><Trash2 className="w-3.5 h-3.5" /></button>}
            </div>
            {q.options.map((opt, oi) => (
              <div key={oi} className="flex items-center gap-1.5 pl-2">
                <input type="radio" name={`correct-${qi}`} checked={q.correct === oi} onChange={() => updateQuestion(qi, { correct: oi })} title={tr("educator_mark_correct")} />
                <input value={opt} onChange={e => updateOption(qi, oi, e.target.value)} placeholder={`${tr("educator_option_placeholder")} ${oi + 1}`} className="flex-1 border border-stone-300 rounded-md px-2 py-1 text-xs" />
              </div>
            ))}
            <button type="button" onClick={() => addOption(qi)} className="text-[11px] text-emerald-700 font-medium ml-2">{tr("educator_add_option")}</button>
            <input value={q.explanation} onChange={e => updateQuestion(qi, { explanation: e.target.value })} placeholder={tr("educator_explanation_answer_placeholder")} className="w-full border border-stone-300 rounded-md px-2 py-1 text-xs" />
          </div>
        ))}
        <button type="button" onClick={addQuestion} className="text-xs text-emerald-700 font-medium">{tr("educator_add_question")}</button>
      </div>

      <button type="submit" className="w-full py-2.5 rounded-lg bg-emerald-700 text-white text-sm font-semibold">{tr("educator_submit")}</button>
    </form>
  );
}

function AdminDashboardScreen({ catalog, back }) {
  const { t: tr } = useApp();
  const products = catalog.products || [];
  const creators = catalog.creators || [];
  const totalGMV = products.reduce((s, p) => s + (p.price || 0) * (p.salesCount || 0), 0);
  const platformRevenue = totalGMV * (1 - CREATOR_SHARE);
  const totalSales = products.reduce((s, p) => s + (p.salesCount || 0), 0);

  return (
    <div className="p-4 pb-8 space-y-4">
      <BackButton onClick={back} label={tr("nav_profile")} />
      <h1 className="text-xl font-semibold text-stone-800" style={displayFont}>{tr("admin_dashboard_title")}</h1>
      <div className="bg-emerald-800 text-white rounded-2xl p-5 text-center">
        <Coins className="w-6 h-6 text-amber-400 mx-auto mb-2" />
        <p className="text-2xl font-semibold">TZS {Math.round(platformRevenue).toLocaleString()}</p>
        <p className="text-xs text-emerald-200 mt-1">{tr("platform_revenue")}</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white rounded-xl border border-stone-200 p-3 text-center"><p className="font-semibold text-stone-800">{creators.length}</p><p className="text-[11px] text-stone-500">{tr("total_creators_label")}</p></div>
        <div className="bg-white rounded-xl border border-stone-200 p-3 text-center"><p className="font-semibold text-stone-800">{products.length}</p><p className="text-[11px] text-stone-500">{tr("total_products_label")}</p></div>
        <div className="bg-white rounded-xl border border-stone-200 p-3 text-center"><p className="font-semibold text-stone-800">{totalSales}</p><p className="text-[11px] text-stone-500">{tr("total_platform_sales")}</p></div>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100">
        {[...products].sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0)).slice(0, 10).map(p => (
          <div key={p.id} className="flex items-center justify-between px-4 py-2.5">
            <span className="text-sm text-stone-700 truncate">{p.title}</span>
            <span className="text-xs text-stone-400 shrink-0">{p.salesCount || 0} {tr("sales_count_label")}</span>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-stone-400 leading-relaxed">{tr("demo_payments_notice")}</p>
    </div>
  );
}

function AdminScreen({ overrides, actions, back }) {
  const { t: tr, lang } = useApp();
  const [form, setForm] = useState({ term: "", definition: "", how: "", example: "", shariah: "" });

  function submitTerm(e) {
    e.preventDefault();
    if (!form.term.trim() || !form.definition.trim()) return;
    actions.addGlossaryTerm({ ...form, relatedLessonIds: [] });
    setForm({ term: "", definition: "", how: "", example: "", shariah: "" });
  }

  return (
    <div className="p-4 space-y-5 pb-8">
      <BackButton onClick={back} label={tr("nav_profile")} />
      <div><h1 className="text-xl font-semibold text-stone-800" style={displayFont}>{tr("admin_title")}</h1><p className="text-sm text-stone-500 mt-1">{tr("admin_subtitle")}</p></div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex gap-2"><Info className="w-4 h-4 shrink-0 mt-0.5" /><p>{tr("admin_shared_notice")}</p></div>

      <div>
        <p className="font-medium text-stone-700 text-sm mb-2">{tr("admin_educator_title")}</p>
        <p className="text-xs text-stone-500 mb-2">{tr("admin_educator_sub")}</p>
        <EducatorLessonForm onSubmit={actions.addCustomLesson} />
      </div>

      {(overrides.customLessons || []).length > 0 && (
        <div>
          <p className="font-medium text-stone-700 text-sm mb-2">{tr("educator_lessons_added")}</p>
          <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100">
            {overrides.customLessons.map(l => (
              <div key={l.id} className="flex items-center justify-between px-4 py-2.5 gap-2">
                <div className="min-w-0"><p className="text-sm text-stone-700 truncate">{l.title}</p><p className="text-[11px] text-stone-400">{findModule(l.moduleId)?.title} · {tr("educator_by")} {l.addedBy}</p></div>
                <button onClick={() => actions.toggleLessonPublish(l.id)} className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${(overrides.unpublishedLessonIds||[]).includes(l.id) ? "bg-stone-100 text-stone-500" : "bg-emerald-100 text-emerald-700"}`}>
                  {(overrides.unpublishedLessonIds||[]).includes(l.id) ? tr("unpublished") : tr("published")}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="font-medium text-stone-700 text-sm mb-2">{tr("admin_lesson_publish")}</p>
        <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100">
          {LESSONS.map(l => {
            const unpublished = (overrides.unpublishedLessonIds || []).includes(l.id);
            return (
              <div key={l.id} className="flex items-center justify-between px-4 py-2.5">
                <span className={`text-sm ${unpublished ? "text-stone-400" : "text-stone-700"}`}>{l.title}</span>
                <button onClick={() => actions.toggleLessonPublish(l.id)} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${unpublished ? "bg-stone-100 text-stone-500" : "bg-emerald-100 text-emerald-700"}`}>{unpublished ? tr("unpublished") : tr("published")}</button>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p className="font-medium text-stone-700 text-sm mb-2">{tr("admin_add_glossary")}</p>
        <form onSubmit={submitTerm} className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2">
          <input placeholder="Term" value={form.term} onChange={e => setForm(f => ({ ...f, term: e.target.value }))} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
          <textarea placeholder="Definition" value={form.definition} onChange={e => setForm(f => ({ ...f, definition: e.target.value }))} rows={2} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
          <textarea placeholder="How it works" value={form.how} onChange={e => setForm(f => ({ ...f, how: e.target.value }))} rows={2} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
          <textarea placeholder="Example" value={form.example} onChange={e => setForm(f => ({ ...f, example: e.target.value }))} rows={2} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
          <textarea placeholder="Shariah considerations" value={form.shariah} onChange={e => setForm(f => ({ ...f, shariah: e.target.value }))} rows={2} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm" />
          <button type="submit" className="w-full py-2.5 rounded-lg bg-emerald-700 text-white text-sm font-semibold flex items-center justify-center gap-1"><Plus className="w-4 h-4" /> {tr("admin_add_term_button")}</button>
        </form>
      </div>

      {(overrides.customGlossaryTerms || []).length > 0 && (
        <div>
          <p className="font-medium text-stone-700 text-sm mb-2">{tr("admin_custom_terms")}</p>
          <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100">
            {overrides.customGlossaryTerms.map(term => (
              <div key={term.term} className="flex items-center justify-between px-4 py-2.5"><span className="text-sm text-stone-700">{term.term}</span><button onClick={() => actions.deleteGlossaryTerm(term.term)} aria-label="Delete" className="text-rose-500"><Trash2 className="w-4 h-4" /></button></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   Root app — storage, state, i18n context, navigation
   ========================================================================= */

const USER_KEY = "academy-user-data";
const CONTENT_KEY = "academy-content-overrides";
const CATALOG_KEY = "marketplace-catalog";
const FEED_KEY = "marketplace-feed";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(emptyProgress());
  const [savedAccount, setSavedAccount] = useState(null);
  const [overrides, setOverrides] = useState({ unpublishedLessonIds: [], customGlossaryTerms: [], customLessons: [], customQuizzes: {} });
  const [catalog, setCatalog] = useState({ creators: [], products: [] });
  const [feed, setFeed] = useState({ posts: [] });
  const [stack, setStack] = useState([{ view: "dashboard" }]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toastQueue, setToastQueue] = useState([]);
  const [saveError, setSaveError] = useState(false);

  const current = stack[stack.length - 1];

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await window.storage.get(USER_KEY, false);
        if (mounted && res && res.value) {
          const parsed = JSON.parse(res.value);
          if (parsed.profile) {
            const normalizedProfile = { role: "learner", ...parsed.profile };
            const normalizedProgress = { ...emptyProgress(), ...(parsed.progress || {}) };
            setSavedAccount({ profile: normalizedProfile, progress: normalizedProgress });
            setProfile(normalizedProfile);
            setProgress(normalizedProgress);
          }
        }
      } catch (e) { /* first run */ }
      try {
        const res2 = await window.storage.get(CONTENT_KEY, true);
        if (mounted && res2 && res2.value) {
          const parsed2 = JSON.parse(res2.value);
          setOverrides({ unpublishedLessonIds: parsed2.unpublishedLessonIds || [], customGlossaryTerms: parsed2.customGlossaryTerms || [], customLessons: parsed2.customLessons || [], customQuizzes: parsed2.customQuizzes || {} });
        }
      } catch (e) { /* no shared content edits yet */ }
      try {
        const res3 = await window.storage.get(CATALOG_KEY, true);
        if (mounted && res3 && res3.value) { const parsed3 = JSON.parse(res3.value); setCatalog({ creators: parsed3.creators || [], products: parsed3.products || [] }); }
      } catch (e) { /* no marketplace data yet */ }
      try {
        const res4 = await window.storage.get(FEED_KEY, true);
        if (mounted && res4 && res4.value) { const parsed4 = JSON.parse(res4.value); setFeed({ posts: parsed4.posts || [] }); }
      } catch (e) { /* no feed yet */ }
      if (mounted) setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (toastQueue.length === 0) return;
    const t2 = setTimeout(() => setToastQueue(q => q.slice(1)), 3200);
    return () => clearTimeout(t2);
  }, [toastQueue]);

  async function persistUser(nextProfile, nextProgress) {
    try { const r = await window.storage.set(USER_KEY, JSON.stringify({ profile: nextProfile, progress: nextProgress }), false); setSaveError(!r); }
    catch (e) { setSaveError(true); }
  }
  async function persistOverrides(next) {
    try { await window.storage.set(CONTENT_KEY, JSON.stringify(next), true); } catch (e) { /* best effort */ }
  }
  async function persistCatalog(next) {
    try { await window.storage.set(CATALOG_KEY, JSON.stringify(next), true); } catch (e) { /* best effort */ }
  }
  async function persistFeed(next) {
    try { await window.storage.set(FEED_KEY, JSON.stringify(next), true); } catch (e) { /* best effort */ }
  }

  function go(view, param) { setStack(s => [...s, { view, param }]); }
  function replaceTop(view, param) { setStack(s => [...s.slice(0, -1), { view, param }]); }
  function back() { setStack(s => (s.length > 1 ? s.slice(0, -1) : s)); }
  function setTab(view) { setStack([{ view }]); }

  function applyProgressUpdate(mutator) {
    setProgress(prev => {
      let next = mutator(prev);
      const newly = computeNewAchievements(next);
      if (newly.length) {
        next = { ...next, earnedAchievements: [...(next.earnedAchievements || []), ...newly], xp: (next.xp || 0) + newly.length * 25 };
        setToastQueue(q => [...q, ...newly]);
      }
      persistUser(profile, next);
      return next;
    });
  }

  const actions = {
    markLessonComplete: (lessonId) => applyProgressUpdate(prev => prev.completedLessons.includes(lessonId) ? { ...prev, streak: bumpStreak(prev) } : { ...prev, completedLessons: [...prev.completedLessons, lessonId], xp: prev.xp + 10, streak: bumpStreak(prev) }),
    recordQuizAttempt: (quizKey, score, total) => applyProgressUpdate(prev => {
      const prevAttempt = prev.quizAttempts[quizKey];
      const attempts = (prevAttempt?.attempts || 0) + 1;
      const xpGain = Math.round(5 + 10 * (score / total));
      return { ...prev, quizAttempts: { ...prev.quizAttempts, [quizKey]: { score, total, attempts, lastAttemptDate: todayStr() } }, xp: prev.xp + xpGain, streak: bumpStreak(prev) };
    }),
    toggleBookmark: (lessonId) => applyProgressUpdate(prev => { const has = prev.bookmarks.includes(lessonId); return { ...prev, bookmarks: has ? prev.bookmarks.filter(id => id !== lessonId) : [...prev.bookmarks, lessonId] }; }),
    saveNote: (lessonId, text) => applyProgressUpdate(prev => ({ ...prev, notes: { ...prev.notes, [lessonId]: text } })),
    visitLesson: (lessonId) => applyProgressUpdate(prev => (prev.lastVisitedLessonId === lessonId ? prev : { ...prev, lastVisitedLessonId: lessonId })),
    viewGlossaryTerm: (term) => applyProgressUpdate(prev => (prev.glossaryViewed.includes(term) ? prev : { ...prev, glossaryViewed: [...prev.glossaryViewed, term] })),
    awardCertificate: (courseId) => applyProgressUpdate(prev => (prev.certificatesEarned.includes(courseId) ? prev : { ...prev, certificatesEarned: [...prev.certificatesEarned, courseId], xp: prev.xp + 100 })),
  };

  function applyOverridesUpdate(mutator) {
    setOverrides(prev => { const next = mutator(prev); persistOverrides(next); return next; });
  }
  const adminActions = {
    toggleLessonPublish: (lessonId) => applyOverridesUpdate(prev => { const list = prev.unpublishedLessonIds || []; const has = list.includes(lessonId); return { ...prev, unpublishedLessonIds: has ? list.filter(id => id !== lessonId) : [...list, lessonId] }; }),
    addGlossaryTerm: (term) => applyOverridesUpdate(prev => ({ ...prev, customGlossaryTerms: [...(prev.customGlossaryTerms || []), term] })),
    deleteGlossaryTerm: (termName) => applyOverridesUpdate(prev => ({ ...prev, customGlossaryTerms: (prev.customGlossaryTerms || []).filter(t2 => t2.term !== termName) })),
    addCustomLesson: (lesson, quiz) => applyOverridesUpdate(prev => ({ ...prev, customLessons: [...(prev.customLessons || []), lesson], customQuizzes: { ...(prev.customQuizzes || {}), [lesson.id]: quiz } })),
  };

  function applyCatalogUpdate(mutator) {
    setCatalog(prev => { const next = mutator(prev); persistCatalog(next); return next; });
  }
  function applyFeedUpdate(mutator) {
    setFeed(prev => { const next = mutator(prev); persistFeed(next); return next; });
  }
  const marketActions = {
    becomeCreator: (name, bio, avatarEmoji, avatarColor) => {
      const id = `creator-${Date.now()}`;
      applyCatalogUpdate(prev => ({ ...prev, creators: [...(prev.creators || []), { id, name, bio, avatarEmoji, avatarColor, followerCount: 0, joinedDate: todayStr() }] }));
      setProfile(prev => { const next = { ...prev, creatorId: id }; persistUser(next, progress); setSavedAccount(sa => sa ? { ...sa, profile: next } : sa); return next; });
      go("creatorDashboard");
    },
    uploadProduct: (data) => {
      const id = `product-${Date.now()}`;
      const product = { id, creatorId: profile.creatorId, salesCount: 0, createdDate: todayStr(), ...data };
      applyCatalogUpdate(prev => ({ ...prev, products: [...(prev.products || []), product] }));
      applyFeedUpdate(prev => ({ ...prev, posts: [...(prev.posts || []), { id: `post-${Date.now()}`, creatorId: profile.creatorId, productId: id, createdDate: todayStr(), likeCount: 0, comments: [] }] }));
      go("productDetail", id);
    },
    purchaseProduct: (productId) => {
      applyProgressUpdate(prev => prev.purchasedProductIds.includes(productId) ? prev : { ...prev, purchasedProductIds: [...prev.purchasedProductIds, productId] });
      applyCatalogUpdate(prev => ({ ...prev, products: (prev.products || []).map(p => p.id === productId ? { ...p, salesCount: (p.salesCount || 0) + 1 } : p) }));
    },
    toggleFollow: (creatorId) => {
      const already = progress.followedCreatorIds.includes(creatorId);
      applyProgressUpdate(prev => ({ ...prev, followedCreatorIds: already ? prev.followedCreatorIds.filter(id => id !== creatorId) : [...prev.followedCreatorIds, creatorId] }));
      applyCatalogUpdate(prev => ({ ...prev, creators: (prev.creators || []).map(c => c.id === creatorId ? { ...c, followerCount: Math.max(0, (c.followerCount || 0) + (already ? -1 : 1)) } : c) }));
    },
    toggleLike: (postId) => {
      const already = progress.likedPostIds.includes(postId);
      applyProgressUpdate(prev => ({ ...prev, likedPostIds: already ? prev.likedPostIds.filter(id => id !== postId) : [...prev.likedPostIds, postId] }));
      applyFeedUpdate(prev => ({ ...prev, posts: (prev.posts || []).map(p => p.id === postId ? { ...p, likeCount: Math.max(0, (p.likeCount || 0) + (already ? -1 : 1)) } : p) }));
    },
    addComment: (postId, text) => {
      applyFeedUpdate(prev => ({ ...prev, posts: (prev.posts || []).map(p => p.id === postId ? { ...p, comments: [...(p.comments || []), { author: profile.name, text, date: todayStr() }] } : p) }));
    },
  };

  function handleSignUp(data) {
    if (savedAccount && savedAccount.profile.email && savedAccount.profile.password) {
      return { ok: false, errorKey: "signup_exists_error" };
    }
    const p = { name: data.name, email: data.email, password: data.password, role: data.role, startLevel: data.startLevel.charAt(0).toUpperCase() + data.startLevel.slice(1), language: data.language };
    const startProgress = emptyProgress();
    setProfile(p);
    setProgress(startProgress);
    setSavedAccount({ profile: p, progress: startProgress });
    persistUser(p, startProgress);
    return { ok: true };
  }

  function handleLogIn(email, password) {
    if (!savedAccount || !savedAccount.profile.email || savedAccount.profile.email !== email || savedAccount.profile.password !== password) {
      return { ok: false, errorKey: "login_error" };
    }
    setProfile(savedAccount.profile);
    setProgress(savedAccount.progress);
    setStack([{ view: "dashboard" }]);
    return { ok: true };
  }

  function handleLogOut() {
    setProfile(null);
    setProgress(emptyProgress());
    setStack([{ view: "dashboard" }]);
  }

  async function handleResetAccount() {
    setSavedAccount(null);
    setProfile(null);
    setProgress(emptyProgress());
    try { await window.storage.delete(USER_KEY, false); } catch (e) { /* nothing to delete */ }
  }

  function changeLanguage(code) {
    setProfile(prev => { const next = { ...prev, language: code }; persistUser(next, progress); setSavedAccount(sa => sa ? { ...sa, profile: next } : sa); return next; });
  }

  function changeLevel(level) {
    const cap = level.charAt(0).toUpperCase() + level.slice(1);
    setProfile(prev => { const next = { ...prev, startLevel: cap }; persistUser(next, progress); setSavedAccount(sa => sa ? { ...sa, profile: next } : sa); return next; });
  }

  function resetProgress() {
    const fresh = emptyProgress();
    setProgress(fresh);
    persistUser(profile, fresh);
    setSavedAccount(sa => sa ? { ...sa, progress: fresh } : sa);
    setStack([{ view: "dashboard" }]);
  }

  const lang = profile?.language || "en";
  const dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  const allGlossaryTerms = useMemo(() => [...GLOSSARY, ...(overrides.customGlossaryTerms || [])], [overrides]);
  const unpublished = overrides.unpublishedLessonIds || [];
  const customLessons = overrides.customLessons || [];
  const activeToast = toastQueue.length ? ACHIEVEMENTS.find(a => a.id === toastQueue[0]) : null;

  const contextValue = {
    lang, dir, t: (key, vars) => t(lang, key, vars),
    unpublished, customLessons, customQuizzes: overrides.customQuizzes || {},
    catalog, feed, marketActions,
  };

  if (loading) {
    return (<div className="min-h-screen bg-stone-50 flex items-center justify-center"><GoldStar8 className="w-8 h-8 text-emerald-700 animate-pulse" /></div>);
  }

  if (!profile) {
    return (
      <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;600;700&display=swap" />
        <AuthScreen onSignUp={handleSignUp} onLogIn={handleLogIn} onResetAccount={handleResetAccount} />
      </>
    );
  }

  const isAdmin = profile.role === "admin";
  let body = null;
  if (current.view === "dashboard") body = <Dashboard profile={profile} progress={progress} go={go} />;
  else if (current.view === "courses") body = <CoursesScreen profile={profile} progress={progress} go={go} />;
  else if (current.view === "courseDetail") body = <CourseDetailScreen courseId={current.param} progress={progress} go={go} back={back} />;
  else if (current.view === "lesson") body = <LessonScreen lessonId={current.param} profile={profile} progress={progress} actions={actions} go={go} back={back} />;
  else if (current.view === "moduleAssessment") body = <ModuleAssessmentScreen moduleId={current.param} actions={actions} back={back} />;
  else if (current.view === "finalAssessment") body = <FinalAssessmentScreen courseId={current.param} actions={actions} replaceTop={replaceTop} back={back} />;
  else if (current.view === "certificate") body = <CertificateScreen courseId={current.param} profile={profile} back={back} />;
  else if (current.view === "glossary") body = <GlossaryScreen allTerms={allGlossaryTerms} profile={profile} progress={progress} actions={actions} go={go} />;
  else if (current.view === "bookmarks") body = <BookmarksScreen progress={progress} go={go} />;
  else if (current.view === "profile") body = <ProfileScreen profile={profile} progress={progress} onReset={resetProgress} onOpenAdmin={() => go("admin")} onOpenAdminDashboard={() => go("adminDashboard")} onChangeLanguage={changeLanguage} onChangeLevel={changeLevel} onLogOut={handleLogOut} />;
  else if (current.view === "admin") body = isAdmin ? <AdminScreen overrides={overrides} actions={adminActions} back={back} /> : <Dashboard profile={profile} progress={progress} go={go} />;
  else if (current.view === "adminDashboard") body = isAdmin ? <AdminDashboardScreen catalog={catalog} back={back} /> : <Dashboard profile={profile} progress={progress} go={go} />;
  else if (current.view === "marketplace") body = <MarketplaceScreen profile={profile} progress={progress} go={go} />;
  else if (current.view === "productDetail") body = <ProductDetailScreen productId={current.param} profile={profile} progress={progress} go={go} back={back} />;
  else if (current.view === "checkout") body = <CheckoutScreen productId={current.param} actions={marketActions} go={go} back={back} />;
  else if (current.view === "becomeCreator") body = <BecomeCreatorScreen actions={marketActions} back={back} />;
  else if (current.view === "uploadProduct") body = <UploadProductScreen actions={marketActions} back={back} />;
  else if (current.view === "creatorStorefront") body = <CreatorStorefrontScreen creatorId={current.param} progress={progress} actions={marketActions} go={go} back={back} />;
  else if (current.view === "creatorDashboard") body = <CreatorDashboardScreen profile={profile} go={go} back={back} />;
  else if (current.view === "myLibrary") body = <MyLibraryScreen progress={progress} go={go} back={back} />;
  else body = <Dashboard profile={profile} progress={progress} go={go} />;

  const showBottomNav = ["dashboard", "courses", "glossary", "bookmarks", "profile", "marketplace"].includes(current.view);

  return (
    <AppContext.Provider value={contextValue}>
      <div dir={dir} className="min-h-screen bg-stone-50 flex flex-col w-full" style={{ fontFamily: lang === "ar" ? arabicFont.fontFamily : "ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap" />
        {lang === "ar" && <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;600;700&display=swap" />}
        <TopBar profile={profile} progress={progress} view={current.view} setView={setTab} onOpenProfile={() => setTab("profile")} onOpenSearch={() => setSearchOpen(true)} />
        <AchievementToast achievement={activeToast} onClose={() => setToastQueue(q => q.slice(1))} />
        {saveError && <div className="bg-rose-50 text-rose-700 text-xs text-center py-1.5 px-4">{t(lang, "save_error_banner")}</div>}
        <div className="flex-1 overflow-y-auto w-full max-w-6xl mx-auto md:pb-4">{body}</div>
        {showBottomNav && <BottomNav view={current.view} setView={setTab} />}
        {searchOpen && <SearchScreen allTerms={allGlossaryTerms} profile={profile} progress={progress} go={go} close={() => setSearchOpen(false)} />}
      </div>
    </AppContext.Provider>
  );
}
/* =========================================================================
   MARKETPLACE UI — catalog, product detail, checkout (demo), creator
   flows, and a social feed. Reads catalog/feed from context; write
   actions are passed in as props, same pattern as the rest of the app.
   ========================================================================= */

const AVATAR_EMOJI = ["🧕","🧔","👳","👩‍🏫","👨‍🏫","📚","🕌","✒️","💡","🌙"];
const AVATAR_COLORS = ["bg-emerald-700","bg-amber-600","bg-teal-700","bg-stone-700","bg-rose-700","bg-sky-700"];

/* Demo-only payment method options for checkout — these are the mobile money
   networks actually used in Tanzania. Selecting one never triggers a real
   charge; see the "Demo Mode" banner on the checkout screen itself. */
const PAYMENT_METHODS = [
  { id: "airtel", label: "Airtel Money", badge: "bg-red-100 text-red-700" },
  { id: "mixxyas", label: "Mixx by Yas", badge: "bg-amber-100 text-amber-700" },
  { id: "mpesa", label: "M-Pesa", badge: "bg-teal-100 text-teal-700" },
  { id: "halopesa", label: "HaloPesa", badge: "bg-sky-100 text-sky-700" },
  { id: "card", label: "Card", badge: "bg-stone-200 text-stone-600", icon: "CreditCard" },
];

function Avatar({ emoji, color, size = "w-10 h-10" }) {
  return <div className={`${size} ${color || "bg-emerald-700"} rounded-full flex items-center justify-center text-white shrink-0`}><span>{emoji || "🧕"}</span></div>;
}

function ProductCard({ product, creator, owned, onClick }) {
  const { t: tr, lang } = useApp();
  const price = formatTZS(product.price);
  return (
    <button onClick={onClick} className="text-left bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-emerald-300 transition-colors">
      <div className={`h-20 ${product.coverColor || "bg-emerald-100"} flex items-center justify-center text-3xl`}>{product.coverEmoji || "📘"}</div>
      <div className="p-3 space-y-1">
        <p className="text-[11px] text-emerald-700 font-semibold uppercase tracking-wide">{categoryLabel(lang, product.categoryId)}</p>
        <p className="font-medium text-stone-800 text-sm leading-snug line-clamp-2">{product.title}</p>
        <p className="text-xs text-stone-500">{tr("by_creator")} {creator?.name || "—"}</p>
        <div className="flex items-center justify-between pt-1">
          <span className={`text-sm font-semibold ${price ? "text-emerald-800" : "text-emerald-600"}`}>{price || tr("free_label")}</span>
          {owned && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">{tr("owned_badge")}</span>}
        </div>
      </div>
    </button>
  );
}

function MarketplaceScreen({ profile, progress, go }) {
  const { t: tr, lang, dir, catalog } = useApp();
  const [tab, setTab] = useState("browse");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const products = catalog.products || [];
  const creators = catalog.creators || [];
  const filtered = products.filter(p => (category === "all" || p.categoryId === category) && (!query.trim() || p.title.toLowerCase().includes(query.trim().toLowerCase())));
  const isCreator = !!profile.creatorId;

  return (
    <div className="p-4 space-y-4 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-stone-800" style={displayFont}>{tr("marketplace_title")}</h1>
          <p className="text-xs text-stone-500 mt-0.5">{tr("marketplace_tagline")}</p>
        </div>
        <button onClick={() => go("myLibrary")} aria-label={tr("my_library")} className="p-2 rounded-full bg-white border border-stone-200 text-stone-500 shrink-0"><ShoppingBag className="w-4 h-4" /></button>
      </div>

      <div className="flex gap-2 items-start rounded-xl border border-amber-200 bg-amber-50 text-amber-900 p-2.5 text-xs"><CreditCard className="w-4 h-4 mt-0.5 shrink-0" /><p>{tr("demo_payments_notice")}</p></div>

      <div className="flex bg-stone-100 rounded-xl p-1">
        <button onClick={() => setTab("browse")} className={`flex-1 py-1.5 rounded-lg text-sm font-medium ${tab === "browse" ? "bg-white shadow-sm text-emerald-800" : "text-stone-500"}`}>{tr("marketplace_title")}</button>
        <button onClick={() => setTab("feed")} className={`flex-1 py-1.5 rounded-lg text-sm font-medium ${tab === "feed" ? "bg-white shadow-sm text-emerald-800" : "text-stone-500"}`}>{tr("feed_title")}</button>
      </div>

      {tab === "feed" ? (
        <FeedInner go={go} progress={progress} />
      ) : (
        <>
          {!isCreator ? (
            <button onClick={() => go("becomeCreator")} className="w-full text-left bg-emerald-800 text-white rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-900 flex items-center justify-center shrink-0"><Store className="w-5 h-5" /></div>
              <div className="flex-1"><p className="font-semibold">{tr("become_creator")}</p><p className="text-xs text-emerald-200">{tr("market_scope_notice")}</p></div>
              <DirChevron dir={dir} className="w-5 h-5 text-emerald-200 shrink-0" />
            </button>
          ) : (
            <button onClick={() => go("creatorDashboard")} className="w-full flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm font-medium text-stone-700">
              <Coins className="w-4 h-4 text-amber-600" /> {tr("creator_dashboard")} <DirChevron dir={dir} className="w-4 h-4 text-stone-300 ml-auto" />
            </button>
          )}

          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder={tr("market_search_placeholder")} className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1">
            <button onClick={() => setCategory("all")} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${category === "all" ? "bg-emerald-700 text-white border-emerald-700" : "border-stone-300 text-stone-600"}`}>{tr("all_categories")}</button>
            {MARKET_CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setCategory(c.id)} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${category === c.id ? "bg-emerald-700 text-white border-emerald-700" : "border-stone-300 text-stone-600"}`}>{categoryLabel(lang, c.id)}</button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon={ShoppingBag} title={tr("no_products_yet")} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} creator={findCreator(p.creatorId, creators)} owned={progress.purchasedProductIds.includes(p.id)} onClick={() => go("productDetail", p.id)} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ProductDetailScreen({ productId, profile, progress, go, back }) {
  const { t: tr, lang, dir, catalog, feed } = useApp();
  const product = findProduct(productId, catalog.products);
  const creator = findCreator(product?.creatorId, catalog.creators);
  const owned = progress.purchasedProductIds.includes(productId);
  const price = product ? formatTZS(product.price) : null;
  const linkedPost = (feed.posts || []).find(p => p.productId === productId);

  if (!product) return <div className="p-4"><BackButton onClick={back} label={tr("back")} /><EmptyState icon={ShoppingBag} title={tr("no_products_yet")} /></div>;

  return (
    <div className="pb-8">
      <div className={`h-40 ${product.coverColor || "bg-emerald-100"} flex items-center justify-center text-6xl relative`}>
        <div className="absolute top-4 left-4 print:hidden"><button onClick={back} aria-label={tr("back")} className="bg-white/80 backdrop-blur rounded-full p-2"><BackIcon dir={dir} /></button></div>
        {product.coverEmoji || "📘"}
      </div>
      <div className="p-4 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{categoryLabel(lang, product.categoryId)}</p>
          <h1 className="text-xl font-semibold text-stone-800 mt-1" style={displayFont}>{product.title}</h1>
          <button onClick={() => go("creatorStorefront", creator.id)} className="flex items-center gap-2 mt-2">
            <Avatar emoji={creator?.avatarEmoji} color={creator?.avatarColor} size="w-6 h-6" />
            <span className="text-sm text-stone-600">{tr("by_creator")} <span className="font-medium text-emerald-700">{creator?.name}</span></span>
          </button>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed">{product.description}</p>
        <p className="text-xs text-stone-400">{product.salesCount || 0} {tr("sales_count_label")}</p>

        <div className="bg-white rounded-2xl border border-stone-200 p-4 flex items-center justify-between">
          <span className={`text-xl font-semibold ${price ? "text-emerald-800" : "text-emerald-600"}`}>{price || tr("free_label")}</span>
          {owned ? (
            <a href={product.resourceUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-sm font-semibold flex items-center gap-1.5"><Upload className="w-4 h-4 rotate-180" /> {tr("open_resource")}</a>
          ) : (
            <button onClick={() => go("checkout", product.id)} className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-sm font-semibold">{product.price === 0 ? tr("get_free") : tr("buy_now")}</button>
          )}
        </div>

        {linkedPost && (
          <button onClick={() => go("marketplace")} className="w-full flex items-center gap-2 text-sm text-emerald-700 font-medium justify-center"><Heart className="w-4 h-4" /> {linkedPost.likeCount || 0} · <MessageCircle className="w-4 h-4" /> {(linkedPost.comments || []).length} — {tr("feed_title")}</button>
        )}
      </div>
    </div>
  );
}

function CheckoutScreen({ productId, actions, go, back }) {
  const { t: tr, dir, catalog } = useApp();
  const [method, setMethod] = useState(PAYMENT_METHODS[0].id);
  const [done, setDone] = useState(false);
  const product = findProduct(productId, catalog.products);
  if (!product) return null;
  const price = formatTZS(product.price);

  if (done) {
    return (
      <div className="p-4 pb-8 space-y-4 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center"><CheckCircle2 className="w-8 h-8" /></div>
        <p className="font-semibold text-stone-800">{tr("purchase_success")}</p>
        <button onClick={() => go("productDetail", productId)} className="w-full py-2.5 rounded-xl bg-emerald-700 text-white font-semibold">{product.title}</button>
        <button onClick={() => go("myLibrary")} className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-600 font-medium">{tr("my_library")}</button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-8 space-y-4">
      <BackButton onClick={back} label={tr("back")} />
      <h1 className="text-xl font-semibold text-stone-800" style={displayFont}>{tr("checkout_title")}</h1>
      <div className="flex gap-2 items-start rounded-xl border border-amber-200 bg-amber-50 text-amber-900 p-3 text-sm"><Info className="w-4 h-4 mt-0.5 shrink-0" /><p>{tr("demo_mode_banner")}</p></div>
      <div className="bg-white rounded-2xl border border-stone-200 p-4 flex items-center justify-between">
        <span className="font-medium text-stone-700 text-sm">{product.title}</span>
        <span className="font-semibold text-emerald-800">{price || tr("free_label")}</span>
      </div>
      {product.price > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-stone-500">{tr("payment_method_label")}</p>
          <div className="grid grid-cols-2 gap-2">
            {PAYMENT_METHODS.map(m => {
              const Icon = m.icon === "CreditCard" ? CreditCard : Smartphone;
              const selected = method === m.id;
              return (
                <button key={m.id} onClick={() => setMethod(m.id)} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-colors ${selected ? "border-emerald-600 bg-emerald-50" : "border-stone-200 hover:border-stone-300"}`}>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${m.badge}`}><Icon className="w-3.5 h-3.5" /></span>
                  <span className="flex-1 text-left text-stone-700 truncate">{m.label}</span>
                  {selected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <button onClick={() => { actions.purchaseProduct(productId); setDone(true); }} className="w-full py-3 rounded-xl bg-emerald-700 text-white font-semibold">{tr("confirm_purchase")}</button>
    </div>
  );
}

function BecomeCreatorScreen({ actions, back }) {
  const { t: tr } = useApp();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [emoji, setEmoji] = useState(AVATAR_EMOJI[0]);
  const [color, setColor] = useState(AVATAR_COLORS[0]);

  return (
    <div className="p-4 pb-8 space-y-4">
      <BackButton onClick={back} label={tr("back")} />
      <h1 className="text-xl font-semibold text-stone-800" style={displayFont}>{tr("become_creator")}</h1>
      <p className="text-sm text-stone-500">{tr("market_scope_notice")}</p>
      <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3">
        <div className="flex justify-center"><Avatar emoji={emoji} color={color} size="w-16 h-16" /></div>
        <div className="flex justify-center gap-1.5 flex-wrap">{AVATAR_EMOJI.map(e => (<button key={e} onClick={() => setEmoji(e)} className={`w-8 h-8 rounded-full flex items-center justify-center border ${emoji === e ? "border-emerald-600 bg-emerald-50" : "border-stone-200"}`}>{e}</button>))}</div>
        <div className="flex justify-center gap-1.5">{AVATAR_COLORS.map(c => (<button key={c} onClick={() => setColor(c)} className={`w-6 h-6 rounded-full ${c} ${color === c ? "ring-2 ring-offset-2 ring-emerald-600" : ""}`} />))}</div>
        <div><label className="text-xs text-stone-500">{tr("creator_name_label")}</label><input value={name} onChange={e => setName(e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" /></div>
        <div><label className="text-xs text-stone-500">{tr("creator_bio_label")}</label><textarea rows={2} value={bio} onChange={e => setBio(e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" /></div>
        <button disabled={!name.trim()} onClick={() => actions.becomeCreator(name.trim(), bio.trim(), emoji, color)} className="w-full py-2.5 rounded-lg bg-emerald-700 text-white text-sm font-semibold disabled:opacity-40">{tr("become_creator")}</button>
      </div>
    </div>
  );
}

function UploadProductScreen({ actions, back }) {
  const { t: tr, lang } = useApp();
  const [f, setF] = useState({ title: "", description: "", categoryId: MARKET_CATEGORIES[0].id, price: 0, resourceUrl: "", coverEmoji: "📘", coverColor: "bg-emerald-100" });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const covers = ["📘","📗","📙","📕","📖","🧮","🕋","📜"];
  const coverColors = ["bg-emerald-100","bg-amber-100","bg-teal-100","bg-stone-200","bg-rose-100","bg-sky-100"];

  function submit(e) {
    e.preventDefault();
    if (!f.title.trim() || !f.description.trim()) return;
    actions.uploadProduct({ ...f, title: f.title.trim(), description: f.description.trim(), price: Number(f.price) || 0 });
  }

  return (
    <div className="p-4 pb-8 space-y-4">
      <BackButton onClick={back} label={tr("back")} />
      <h1 className="text-xl font-semibold text-stone-800" style={displayFont}>{tr("upload_product")}</h1>
      <form onSubmit={submit} className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3">
        <div><label className="text-xs text-stone-500">{tr("product_title_label")}</label><input value={f.title} onChange={e => set("title", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" /></div>
        <div><label className="text-xs text-stone-500">{tr("product_description_label")}</label><textarea rows={3} value={f.description} onChange={e => set("description", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" /></div>
        <div>
          <label className="text-xs text-stone-500">{tr("category_label")}</label>
          <select value={f.categoryId} onChange={e => set("categoryId", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5 bg-white">
            {MARKET_CATEGORIES.map(c => <option key={c.id} value={c.id}>{categoryLabel(lang, c.id)}</option>)}
          </select>
        </div>
        <div><label className="text-xs text-stone-500">{tr("price_label")}</label><input type="number" min="0" step="500" value={f.price} onChange={e => set("price", e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" /></div>
        <div><label className="text-xs text-stone-500">{tr("resource_link_label")}</label><input value={f.resourceUrl} onChange={e => set("resourceUrl", e.target.value)} placeholder="https://drive.google.com/…" className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm mt-0.5" /></div>
        <div>
          <label className="text-xs text-stone-500">Cover</label>
          <div className="flex gap-1.5 flex-wrap mt-1">{covers.map(e => (<button key={e} type="button" onClick={() => set("coverEmoji", e)} className={`w-9 h-9 rounded-lg flex items-center justify-center border text-lg ${f.coverEmoji === e ? "border-emerald-600 bg-emerald-50" : "border-stone-200"}`}>{e}</button>))}</div>
          <div className="flex gap-1.5 mt-1.5">{coverColors.map(c => (<button key={c} type="button" onClick={() => set("coverColor", c)} className={`w-6 h-6 rounded-full ${c} ${f.coverColor === c ? "ring-2 ring-offset-2 ring-emerald-600" : ""}`} />))}</div>
        </div>
        <button type="submit" className="w-full py-2.5 rounded-lg bg-emerald-700 text-white text-sm font-semibold">{tr("publish_product")}</button>
      </form>
    </div>
  );
}

function CreatorStorefrontScreen({ creatorId, progress, actions, go, back }) {
  const { t: tr, lang, catalog } = useApp();
  const creator = findCreator(creatorId, catalog.creators);
  if (!creator) return <div className="p-4"><BackButton onClick={back} label={tr("back")} /></div>;
  const products = (catalog.products || []).filter(p => p.creatorId === creatorId);
  const following = progress.followedCreatorIds.includes(creatorId);
  const totalSales = products.reduce((s, p) => s + (p.salesCount || 0), 0);

  return (
    <div className="p-4 pb-8 space-y-4">
      <BackButton onClick={back} label={tr("back")} />
      <div className="text-center space-y-2">
        <div className="flex justify-center"><Avatar emoji={creator.avatarEmoji} color={creator.avatarColor} size="w-16 h-16" /></div>
        <h1 className="text-xl font-semibold text-stone-800" style={displayFont}>{creator.name}</h1>
        {creator.bio && <p className="text-sm text-stone-500 max-w-xs mx-auto">{creator.bio}</p>}
        <div className="flex justify-center gap-4 text-xs text-stone-500 pt-1">
          <span>{creator.followerCount || 0} {tr("followers_count_label")}</span>
          <span>{totalSales} {tr("sales_count_label")}</span>
        </div>
        <button onClick={() => actions.toggleFollow(creatorId)} className={`px-4 py-1.5 rounded-full text-sm font-medium ${following ? "bg-stone-100 text-stone-600" : "bg-emerald-700 text-white"}`}>{following ? tr("following_action") : tr("follow_action")}</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map(p => (<ProductCard key={p.id} product={p} creator={creator} owned={progress.purchasedProductIds.includes(p.id)} onClick={() => go("productDetail", p.id)} />))}
      </div>
    </div>
  );
}

function CreatorDashboardScreen({ profile, go, back }) {
  const { t: tr, lang, catalog } = useApp();
  const creator = findCreator(profile.creatorId, catalog.creators);
  if (!creator) return null;
  const products = (catalog.products || []).filter(p => p.creatorId === creator.id);
  const totalEarnings = products.reduce((s, p) => s + (p.price || 0) * (p.salesCount || 0) * CREATOR_SHARE, 0);
  const totalSales = products.reduce((s, p) => s + (p.salesCount || 0), 0);

  return (
    <div className="p-4 pb-8 space-y-4">
      <BackButton onClick={back} label={tr("back")} />
      <h1 className="text-xl font-semibold text-stone-800" style={displayFont}>{tr("creator_dashboard")}</h1>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-xl border border-stone-200 p-3 text-center"><Coins className="w-4 h-4 text-amber-500 mx-auto mb-1" /><p className="font-semibold text-stone-800">TZS {Math.round(totalEarnings).toLocaleString()}</p><p className="text-[11px] text-stone-500">{tr("total_earnings_demo")}</p></div>
        <div className="bg-white rounded-xl border border-stone-200 p-3 text-center"><ShoppingBag className="w-4 h-4 text-emerald-600 mx-auto mb-1" /><p className="font-semibold text-stone-800">{totalSales}</p><p className="text-[11px] text-stone-500">{tr("sales_count_label")}</p></div>
      </div>
      <button onClick={() => go("uploadProduct")} className="w-full py-2.5 rounded-xl bg-emerald-700 text-white text-sm font-semibold flex items-center justify-center gap-1.5"><Upload className="w-4 h-4" /> {tr("upload_product")}</button>
      <div>
        <p className="font-medium text-stone-700 text-sm mb-2">{tr("your_products")}</p>
        <div className="space-y-1.5">
          {products.map(p => (
            <button key={p.id} onClick={() => go("productDetail", p.id)} className="w-full flex items-center justify-between bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-left">
              <span className="text-sm text-stone-700 truncate">{p.title}</span>
              <span className="text-xs text-stone-400 shrink-0">{p.salesCount || 0} {tr("sales_count_label")}</span>
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => go("creatorStorefront", creator.id)} className="w-full text-sm text-emerald-700 font-medium text-center">{tr("view_store")}</button>
    </div>
  );
}

function FeedPostCard({ post, creator, product, liked, onLike, onComment, onOpenProduct }) {
  const { t: tr } = useApp();
  const [commentText, setCommentText] = useState("");
  function submitComment(e) { e.preventDefault(); if (!commentText.trim()) return; onComment(commentText.trim()); setCommentText(""); }
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Avatar emoji={creator?.avatarEmoji} color={creator?.avatarColor} size="w-8 h-8" />
        <div className="min-w-0"><p className="text-sm font-medium text-stone-800 truncate">{creator?.name}</p><p className="text-xs text-stone-400">{tr("published_new_product")}</p></div>
      </div>
      {product && (
        <button onClick={onOpenProduct} className="w-full flex items-center gap-3 bg-stone-50 rounded-xl p-2.5 text-left">
          <div className={`w-12 h-12 rounded-lg ${product.coverColor || "bg-emerald-100"} flex items-center justify-center text-xl shrink-0`}>{product.coverEmoji}</div>
          <div className="min-w-0"><p className="text-sm font-medium text-stone-800 truncate">{product.title}</p><p className="text-xs text-emerald-700 font-semibold">{formatTZS(product.price) || tr("free_label")}</p></div>
        </button>
      )}
      <div className="flex items-center gap-4 text-sm text-stone-500">
        <button onClick={onLike} className={`flex items-center gap-1.5 ${liked ? "text-rose-600" : ""}`}><Heart className={`w-4 h-4 ${liked ? "fill-rose-500 text-rose-600" : ""}`} /> {post.likeCount || 0}</button>
        <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4" /> {(post.comments || []).length}</span>
      </div>
      {(post.comments || []).length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-stone-100">
          {post.comments.slice(-3).map((c, i) => (<p key={i} className="text-xs text-stone-600"><span className="font-medium text-stone-800">{c.author}</span> {c.text}</p>))}
        </div>
      )}
      <form onSubmit={submitComment} className="flex gap-2">
        <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder={tr("comment_placeholder")} className="flex-1 border border-stone-300 rounded-full px-3 py-1.5 text-xs" />
        <button type="submit" className="text-xs text-emerald-700 font-semibold px-2">{tr("post_comment")}</button>
      </form>
    </div>
  );
}

function FeedInner({ go, progress }) {
  const { t: tr, catalog, feed, marketActions } = useApp();
  const posts = [...(feed.posts || [])].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
  const topCreators = (catalog.creators || []).slice(0, 5);
  return (
    <div className="space-y-3">
      {topCreators.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2 px-1">{tr("suggested_creators")}</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {topCreators.map(c => (
              <button key={c.id} onClick={() => go("creatorStorefront", c.id)} className="shrink-0 w-20 text-center">
                <Avatar emoji={c.avatarEmoji} color={c.avatarColor} size="w-12 h-12" />
                <p className="text-[11px] text-stone-600 mt-1 truncate">{c.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      {posts.length === 0 ? (
        <EmptyState icon={MessageCircle} title={tr("feed_title")} />
      ) : posts.map(post => (
        <FeedPostCard
          key={post.id}
          post={post}
          creator={findCreator(post.creatorId, catalog.creators)}
          product={findProduct(post.productId, catalog.products)}
          liked={progress.likedPostIds.includes(post.id)}
          onLike={() => marketActions.toggleLike(post.id)}
          onComment={(text) => marketActions.addComment(post.id, text)}
          onOpenProduct={() => go("productDetail", post.productId)}
        />
      ))}
    </div>
  );
}

function MyLibraryScreen({ progress, go, back }) {
  const { t: tr, catalog } = useApp();
  const owned = progress.purchasedProductIds.map(id => findProduct(id, catalog.products)).filter(Boolean);
  return (
    <div className="p-4 space-y-3 pb-6">
      <BackButton onClick={back} label={tr("back")} />
      <h1 className="text-xl font-semibold text-stone-800" style={displayFont}>{tr("my_library")}</h1>
      {owned.length === 0 && <EmptyState icon={ShoppingBag} title={tr("library_empty")} />}
      {owned.map(p => (
        <div key={p.id} className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${p.coverColor || "bg-emerald-100"} flex items-center justify-center text-xl shrink-0`}>{p.coverEmoji}</div>
          <p className="text-sm font-medium text-stone-800 flex-1 truncate">{p.title}</p>
          <a href={p.resourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-700 font-semibold shrink-0">{tr("open_resource")}</a>
        </div>
      ))}
    </div>
  );
}
