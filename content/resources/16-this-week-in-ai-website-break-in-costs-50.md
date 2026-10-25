---
title: "This Week in AI for Contractors and Home Services: Breaking Into a Website Now Costs About $50"
seoTitle: "This Week in AI: Breaking Into a Website Costs $50"
metaDescription: "October 19–25 for contractors: breaking into a website now costs about $50, a flaw hit the software behind most sites, and an assistant chases unpaid invoices."
slug: "this-week-in-ai-website-break-in-costs-50"
category: "This Week in AI"
contentType: "guide"
tags:
  - AI for contractors
  - contractor website security
  - WordPress for contractors
  - AI for home service businesses
  - unpaid invoices
  - PHP website security
date: "2026-10-24"
author: "Levron Partners"
readingTime: "6 min"
coverImage: "/images/this-week-in-ai-oct-19-25-2026.jpg"
dek: "Plus a flaw in the software behind most contractor websites, and an assistant that chases unpaid invoices. October 19th to the 25th."
---

Four things happened in AI between October 19th and the 25th that are worth five minutes of your time if you run a trade or home service business.

Three of them are about the same thing: AI made attacking a business cheaper and faster. The fourth is AI doing your office work, with your sign off.

## Monday: One hacker used AI agents to break into more than 100 company websites

On Monday, Reuters reported on findings from Snorre Fagerland, a researcher at the security firm NorForge. A single Chinese speaking hacker set a team of AI agents loose on online shops in the US, Canada, Japan, and Australia. The agents tried more than 1,200 websites and got into more than 100.

Fagerland estimated the whole campaign cost about $5,000 in AI usage, roughly $50 per successful break in. He called that a rough figure. A successful break in took about 23 hours, with the agents working on their own the whole time.

Reuters named Deere, SharkNinja, and Cummins among the targets, and two smaller businesses confirmed they were hit. Deere said it saw no sign that sensitive information was accessed. SharkNinja said the attack hit a standalone product support site and was contained. Cummins said it was looking into a possible attack on a website run by one of its vendors. Reuters could not establish how much data, if any, was taken.

In one case, the agents found no way into a company's main website, so they went after a control panel connected to it and got in after hours of trial and error. "It's not script kiddie stuff," Fagerland told Reuters, meaning this was not amateur work.

**What that tells you:** these were online shops, not contractor websites. But the math is what matters. Hacking used to cost a skilled person's time, so attackers picked big targets. At about $50 a success, with software working overnight, a roofing company's website is worth a try too. Notice where the agents got in: not always the main site, but the thing bolted onto it. For a contractor, that's the quote request form, the booking widget, or the plugin someone installed three years ago and never thought about again.

## Wednesday: A flaw in the software behind most contractor websites, found with help from AI

On Wednesday, PHP released fixes for two serious flaws. PHP is the software that runs WordPress, Joomla, and Magento, and it powers nearly 70% of websites whose server software is known, according to W3Techs. The flaws let an attacker run commands on a web server without logging in.

The security firm Wiz, which found them, says every version of PHP released in the last decade is affected, and it showed the attack working against a standard WordPress setup. Wiz credits AI with much of the work. It says Google's Gemini "made an invaluable contribution to finding the vulnerability," and that AI cut the effort needed to turn the flaws into a working attack. One researcher did in a week what would have taken a team months.

Attackers did not wait for the fix. Amazon says its security sensors caught an attempt to use the flaw on October 17th, four days before it was made public, and public attack code appeared hours before the fix came out. Amazon says it is not yet clear whether any of those attempts succeeded against real websites. PHP 8.1 and older versions get no official update.

**What that tells you:** a lot of contractor websites run on WordPress, built years ago by an agency, a freelancer, or a family member, and not touched since. You don't need to know what PHP is. You need to know who keeps your site updated. If the honest answer is "nobody," that site is the kind most at risk. The time between a fix coming out and attackers trying the flaw has shrunk from weeks to hours.

## Wednesday: Attackers used an AI tool to reach Microsoft 365 accounts through ConnectWise

On Wednesday, Microsoft said a hacking group it links to the Chinese state broke into ConnectWise, an IT services company, through its Cloud Backup service. It was part of a campaign against hundreds of organizations around the world.

The group used ARTEX, a free tool built for testing a company's defenses. It can run on any AI model and carry out steps on its own, such as scanning, guessing passwords, and pulling out data. From ConnectWise, the attackers reached customers' Microsoft 365 email and files through apps those customers had already approved, without anyone signing in. In some cases, Microsoft says, they went from first target to administrator access in under three hours.

Microsoft says most of the attempts failed, and that this was not caused by a flaw in its own products. ConnectWise's CEO said the company has contained the problem and is restoring service in phases, but that "those actions do not remove unauthorized access that may have already been established." Customers have to check their own accounts.

**What that tells you:** the attackers didn't break down the front door. They came in through a tool the customer had already trusted. Think about what sits in your email: bids, change orders, signed contracts, customer addresses, payment details from suppliers. Every app connected to it, whether it's backup, scheduling, job management, or accounting, holds a key. If an IT company manages your email, this is the kind of week they should be bringing up with you, not the other way around.

## Wednesday: Anthropic launched an assistant that chases your unpaid invoices

Also on Wednesday, Anthropic, the company behind Claude, released Claude Duet. It's an assistant that works in the background instead of waiting for you to ask. It connects to apps like Gmail, Google Calendar, Slack, and Stripe, sends you a short brief each morning, and checks in every few hours when something needs your attention.

The examples Anthropic gives: finding unpaid invoices and drafting the reminders, preparing payroll for you to review, and getting contracts ready to send. MacRumors reports it's built for professionals and small business owners with too much to track.

It asks for your approval before it sends a message, makes a payment, signs a document, or deletes a file. Anthropic says it doesn't see your passwords. It also admits the assistant can misread a thread or misjudge what's urgent.

For now, it's a waitlist preview for paying Claude subscribers in the US, on the web and iPhone. It uses your existing plan's limits, and its background checks count toward them.

**What that tells you:** chasing money owed is one of the jobs owners put off longest, and it's the first example Anthropic chose. That's worth noticing. It only works with what it can connect to, so if your invoices live in software it can't reach, it can't chase them. And it's the other side of the first three stories: an AI with access to your accounts, working for you. The same question applies: what can it touch without asking? Here, anything involving money, messages, or signatures waits for you. It's a waitlist preview, so it's worth watching, not planning around.

## Putting it together

This week, AI made breaking in cheaper and faster. Software ran attacks around the clock for about $50 a success, found holes in the code behind most websites, and reached business email through tools the businesses had already trusted. In the same week, the first assistants built to run your office started asking for the keys.

> The weak spot is rarely the thing you look at every day. It's the thing connected to it that nobody has checked in a year.

None of this means you need a security team. It means knowing three things: who keeps your website updated, which apps can reach your email, and what any AI assistant you invite in can do without asking.

P.S. Text whoever built your website one question: "Did our site get the PHP update that came out Wednesday?" If the answer is "What update?", that's your answer.

Aristotle Taylor is CEO and co-founder of Levron Labs, where he and his team help businesses put AI to work.

---

## Sources

### AI agents break into 100+ websites (October 19)

- [Reuters, via the Honolulu Star-Advertiser, the campaign, cost, victims, and company responses](https://www.staradvertiser.com/2026/10/19/breaking-news/how-one-hacker-used-ai-agents-to-break-into-over-100-company-websites/)
- [The Next Web, NorForge's findings and the control panel detail](https://thenextweb.com/news/ai-agents-hacker-cairn-100-sites-deere-norforge)

### PHP2Shell (October 21)

- [Wiz, the flaws, affected versions, the WordPress demonstration, and AI's role](https://www.wiz.io/blog/php2shell-php-rce)
- [Amazon Web Services Security Blog, the attempt four days before disclosure](https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/)
- [Cybernews, the WordPress risk, PHP's share of websites, and fixed versions](https://cybernews.com/security/wordpress-php-severe-rce-flaws-emergency-patches/)

### ConnectWise and Storm-0940 (October 21)

- [Microsoft Security Blog, the ARTEX campaign and timing](https://www.microsoft.com/en-us/security/blog/2026/10/21/storm-0940-uses-artex-agentic-ai-connectwise-supply-chain-compromise/)
- [Reuters via WHTC, the breach and the ConnectWise CEO's statement](https://whtc.com/2026/10/21/chinese-linked-hackers-compromise-connectwise-target-hundreds-in-global-attack-microsoft-says/)

### Claude Duet (October 21)

- [MacRumors, features, approvals, availability, and audience](https://www.macrumors.com/2026/10/21/anthropic-claude-duet/)
- [SiliconANGLE, launch coverage](https://siliconangle.com/2026/10/22/anthropic-introduces-claude-duet-a-proactive-ai-agent-for-professionals/)
