'use strict';
const KNOWLEDGE_DB = [
  {
    id: 'k1', category: 'Nicotine', title: 'Why Nicotine is So Hard to Quit',
    preview: 'Nicotine hijacks the brain\'s dopamine system more efficiently than almost any other substance.',
    evidence: 'High-quality evidence',
    content: `
<h2>The Neuroscience of Nicotine Addiction</h2>
<p>Nicotine binds to acetylcholine receptors in the brain and triggers a release of dopamine — the neurotransmitter associated with pleasure, motivation, and reward. This dopamine release happens within 10-20 seconds of inhaling, making nicotine one of the most rapidly reinforcing substances known.</p>
<h3>Why the Brain Adapts</h3>
<p>With repeated use, the brain responds to the artificial dopamine floods by creating more nicotine receptors — a process called upregulation. This means you need more nicotine to get the same effect. When you stop, those excess receptors are left empty, causing withdrawal symptoms: irritability, anxiety, difficulty concentrating, and intense cravings.</p>
<h3>The Psychological Layer</h3>
<p>Beyond chemistry, smoking and vaping become deeply embedded in behavioural routines. Morning coffee, after meals, stress — these cues become neurologically linked to the habit. Breaking the chemical dependency is one thing; breaking the cue-routine-reward loop is another.</p>
<h3>What Recovery Looks Like</h3>
<p>Within 72 hours, nicotine is fully cleared from your bloodstream. The physical withdrawal is largely complete within 2-4 weeks. After that, what you're managing is psychological habit — and that is where most relapses occur. Environment restructuring, craving surfing, and replacement behaviours are the evidence-based tools for this phase.</p>
`
  },
  {
    id: 'k2', category: 'Vaping', title: 'Vaping vs Smoking: What\'s Actually Different',
    preview: 'Vaping is less harmful than smoking — but not harmless. Here\'s what the science actually says.',
    evidence: 'Emerging evidence',
    content: `
<h2>The Science of Vaping</h2>
<p>Vaping eliminates combustion — which removes the tar, carbon monoxide, and most carcinogens in cigarette smoke. In that sense, switching from smoking to vaping reduces immediate respiratory risk significantly. This is why the NHS recognises vaping as a smoking cessation tool.</p>
<h3>What Vaping Still Does</h3>
<p>Vaping still delivers nicotine — often at higher concentrations than cigarettes, especially with nicotine salt (nic salt) formulations. Nic salts deliver nicotine to the brain 2.5x faster than freebase nicotine in cigarettes. The dependency is just as real, and often stronger.</p>
<p>EVALI (e-cigarette or vaping product use-associated lung injury) emerged in 2019 as a serious concern, primarily linked to vitamin E acetate in illicit THC cartridges, but some cases involved nicotine vapes too.</p>
<h3>Quitting Vaping</h3>
<p>The withdrawal experience from vaping is clinically identical to smoking cessation. The same NRT (nicotine replacement therapy) strategies apply. Most people find the psychological habit (the hand-to-mouth action, the flavour, the ritual) as challenging as the chemical dependency.</p>
`
  },
  {
    id: 'k3', category: 'Vaping', title: 'Nicotine Salt vs Freebase: Why Nic Salts Are More Addictive',
    preview: 'The chemistry behind why modern pod vapes are so much harder to quit than older vaping devices.',
    evidence: 'High-quality evidence',
    content: `
<h2>The Nic Salt Revolution — and Its Cost</h2>
<p>Traditional freebase nicotine in cigarettes and early vapes has a high pH, making it harsh at high concentrations. In 2015, Juul Labs introduced benzoic acid to nicotine, creating nicotine salt — a smoother formula that allows much higher nicotine concentrations (20-50mg/mL vs 3-6mg/mL in freebase vapes).</p>
<h3>Why This Matters for Addiction</h3>
<p>Nic salts deliver nicotine to the brain in approximately 6-7 seconds — significantly faster than cigarettes. The speed of delivery is a primary driver of addiction potential. The faster the dopamine hit, the stronger the conditioned response.</p>
<p>A 50mg/mL pod can deliver the equivalent of a pack of cigarettes in nicotine within 200-300 puffs. Many vapers far exceed this.</p>
<h3>Recovery</h3>
<p>The neurological recovery from nic salt dependency follows the same timeline as smoking. However, the deep conditioning from faster delivery may make psychological triggers more intense. Expect strong cravings in specific contexts (car, after food, stress) for the first 4-6 weeks.</p>
`
  },
  {
    id: 'k4', category: 'Dopamine', title: 'Dopamine: The Molecule You\'ve Been Abusing',
    preview: 'Every addiction follows the same dopamine circuit. Understanding it changes how you fight it.',
    evidence: 'High-quality evidence',
    content: `
<h2>Your Brain's Reward System</h2>
<p>Dopamine is a neurotransmitter primarily manufactured in the ventral tegmental area (VTA) and sent throughout the brain via the mesolimbic pathway. It is released in response to rewards — food, sex, social connection, achievement — and in anticipation of them.</p>
<h3>How Addiction Hijacks This</h3>
<p>Addictive substances and behaviours (nicotine, pornography, gambling, social media) trigger dopamine release at a magnitude far beyond what natural rewards produce. A cigarette might spike dopamine 200% above baseline. Cocaine spikes it 350%. Compared to food (100% above baseline), these are supernormal stimuli.</p>
<p>The brain responds by downregulating — reducing receptor sensitivity and baseline dopamine production. This creates tolerance, and it means everyday life feels grey and unrewarding. This is the hallmark of addiction.</p>
<h3>Recovery: The Timeline</h3>
<p>Dopamine receptor sensitivity begins recovering within 2-4 weeks of abstinence. Most people notice significant improvement in baseline motivation and pleasure at 90 days. Full recovery can take 6-18 months depending on the substance and duration of use. Exercise accelerates this process significantly.</p>
`
  },
  {
    id: 'k5', category: 'Recovery', title: 'The 90-Day Rule: Why Three Months Changes Everything',
    preview: 'The first 90 days of recovery are neurologically different from anything that comes after.',
    evidence: 'High-quality evidence',
    content: `
<h2>Why 90 Days Is the Turning Point</h2>
<p>Recovery research consistently identifies 90 days as a threshold for neurological change. Within this window, the brain undergoes measurable structural and functional recovery — dopamine receptor sensitivity returns, prefrontal cortex function improves, and the default mode network (responsible for self-referential thought) rebalances.</p>
<h3>What Changes at 90 Days</h3>
<p>Studies using fMRI show that at 90 days, the brain scans of former addicts begin to resemble those of people who never used the substance. White matter integrity improves. Decision-making circuits strengthen. Impulsivity decreases.</p>
<p>Behaviourally, most people report that at 90 days, cravings have significantly reduced in frequency and intensity. The automatic nature of the urge weakens substantially.</p>
<h3>The Work After 90 Days</h3>
<p>90 days is not a finish line — it is the point where recovery becomes significantly easier and the brain becomes an ally rather than an adversary. The years that follow involve consolidation, occasional cravings in high-stress periods, and the building of identity as someone who doesn't use.</p>
`
  },
  {
    id: 'k6', category: 'Weed', title: 'Cannabis Withdrawal: What No One Warns You About',
    preview: 'Cannabis withdrawal is real, clinically recognised, and often underestimated.',
    evidence: 'High-quality evidence',
    content: `
<h2>Cannabis Use Disorder and Withdrawal</h2>
<p>The idea that cannabis is "not addictive" is outdated. The DSM-5 formally recognises Cannabis Use Disorder, and physical withdrawal is listed as a diagnostic criterion since 2013.</p>
<h3>Withdrawal Symptoms</h3>
<p>Peak withdrawal occurs at 2-3 days after cessation and includes: irritability, anxiety, sleep disturbance, decreased appetite, restlessness, and depressed mood. These symptoms are most intense in people who used daily for extended periods.</p>
<h3>The Sleep Factor</h3>
<p>Cannabis suppresses REM sleep. After quitting, REM rebound occurs — vivid, intense dreams are extremely common. Some find this disturbing; it is in fact a sign of neural recovery. Full sleep normalisation typically takes 3-4 weeks.</p>
<h3>Modern Potency</h3>
<p>THC concentrations in cannabis have tripled since the 1990s. This means today's withdrawal is significantly more intense than research from 20 years ago suggested. High-potency daily users should prepare for a more challenging first week than older literature indicates.</p>
`
  },
  {
    id: 'k7', category: 'Porn', title: 'Porn and the Brain: The Evidence',
    preview: 'What brain scans of heavy porn users actually show — and what reverses it.',
    evidence: 'Emerging evidence',
    content: `
<h2>Pornography and Neural Adaptation</h2>
<p>Multiple neuroimaging studies have found that heavy pornography use correlates with structural changes in the brain similar to those seen in substance addiction: reduced grey matter in the prefrontal cortex, hyperactivation of the reward circuit in response to pornographic cues, and reduced dopamine D2 receptor binding.</p>
<h3>The Escalation Pattern</h3>
<p>Because the brain habituates to repeated stimuli, many users report escalation — needing increasingly novel or extreme content to achieve the same arousal response. This is classic tolerance, the hallmark of addiction.</p>
<h3>Recovery Evidence</h3>
<p>The research on recovery from pornography use is still emerging, but neuroplasticity evidence is clear: the brain can and does rewire. Most users report significant improvements in focus, motivation, mood, and real-world intimate relationships at the 90-day mark. The brain's reward response to normal stimuli returns gradually.</p>
<h3>A Note on Evidence</h3>
<p>The pornography addiction field has more debate than nicotine. Some researchers dispute the addiction framing. What is agreed: heavy use is correlated with negative outcomes, and reduced use is correlated with positive ones.</p>
`
  },
  {
    id: 'k8', category: 'Sleep', title: 'How Every Addiction Destroys Your Sleep',
    preview: 'Every substance and behavioural addiction disrupts sleep architecture in measurable ways.',
    evidence: 'High-quality evidence',
    content: `
<h2>Sleep and Addiction</h2>
<p>Sleep architecture consists of four stages — N1, N2, N3 (deep sleep), and REM — cycling approximately every 90 minutes. Addictive substances disrupt these cycles in specific, predictable ways.</p>
<h3>Nicotine</h3>
<p>Nicotine is a stimulant. It reduces total sleep time, delays sleep onset, and fragments sleep by causing arousal as nicotine levels drop during the night. Smokers and vapers report significantly poorer sleep quality than non-users.</p>
<h3>Cannabis</h3>
<p>THC suppresses REM sleep, reducing dreaming. While this can initially feel like "better sleep" (fewer dreams, faster onset), it deprives the brain of the repair, emotional processing, and memory consolidation that REM provides.</p>
<h3>Social Media and Screens</h3>
<p>Blue light from screens suppresses melatonin production. Combined with the dopaminergic stimulation of social media, night-time screen use delays sleep onset by 30-90 minutes and reduces sleep quality.</p>
<h3>Recovery</h3>
<p>In most cases, sleep quality substantially improves within 2-4 weeks of quitting the addictive behaviour. This is one of the earliest and most motivating benefits of recovery.</p>
`
  },
  {
    id: 'k9', category: 'Cravings', title: 'Urge Surfing: The Technique That Beats Cravings',
    preview: 'A mindfulness-based technique with clinical evidence for craving reduction.',
    evidence: 'High-quality evidence',
    content: `
<h2>What Is Urge Surfing?</h2>
<p>Urge surfing is a mindfulness technique developed by psychologist Alan Marlatt as part of Mindfulness-Based Relapse Prevention (MBRP). The premise is simple but powerful: instead of fighting or giving in to a craving, you observe it like a wave — letting it rise, peak, and fall without acting on it.</p>
<h3>The Science</h3>
<p>Cravings are not constant — they have a predictable lifecycle. They typically build to a peak at 3-5 minutes and then naturally subside, regardless of whether you act on them. Most people have never experienced this because they give in before the peak.</p>
<h3>The Technique</h3>
<p>When a craving hits: pause. Notice where in your body you feel it. Describe it to yourself without judgement — its intensity, location, quality. Watch it intensify, and then watch it pass. You are not your craving. You are the observer of it.</p>
<h3>Evidence</h3>
<p>Randomised controlled trials show urge surfing reduces craving intensity by up to 40% compared to control groups. With practice, cravings become shorter and less intense. The technique literally rewires the fear/craving response.</p>
`
  },
  {
    id: 'k10', category: 'Finance', title: 'The Real Cost of Your Habit',
    preview: 'What your habit actually costs over 1, 5, and 10 years — and what that money could buy.',
    evidence: 'Calculation',
    content: `
<h2>The Financial Reality</h2>
<p>Most people dramatically underestimate the long-term cost of their habit because they think in daily amounts. The compounding reality is stark.</p>
<h3>Smoking: UK Averages</h3>
<p>At 10 cigarettes per day and £12 per pack: £6/day, £2,190/year, £10,950 over 5 years, £21,900 over 10 years. That's a car, a deposit on a flat, or a decade of gym membership and holidays.</p>
<h3>Vaping</h3>
<p>Pod systems: 2 pods per week at £4/pod = £8/week, £416/year. Box mods with juice: £15-30/week, £780-1,560/year. Plus devices, coils, replacements.</p>
<h3>Shisha</h3>
<p>Three sessions per week at £15/session = £45/week, £2,340/year. In bars and lounges, this can be £50-100/session — £7,800+/year.</p>
<h3>The Opportunity Cost</h3>
<p>The savings from quitting, invested at 7% annual return (historical stock market average), grow significantly. £2,000/year saved for 10 years at 7% return = approximately £27,600.</p>
`
  },
  {
    id: 'k11', category: 'Nicotine', title: 'Nicotine Replacement Therapy: What Works',
    preview: 'NRT doubles your chances of quitting. Here\'s what the evidence shows for each type.',
    evidence: 'High-quality evidence',
    content: `
<h2>The Evidence for NRT</h2>
<p>Nicotine Replacement Therapy works by reducing withdrawal symptoms without the harmful chemicals in smoke or vapour. Meta-analyses show NRT approximately doubles the likelihood of successful quit attempts compared to willpower alone.</p>
<h3>Forms of NRT</h3>
<p><strong>Patches:</strong> Slow release, 24-hour, reduces background cravings well. Less effective for acute cravings. Best for steady smokers.</p>
<p><strong>Gum/Lozenges:</strong> Fast-acting, handles acute cravings. Technique matters — chew then park, don't chew continuously.</p>
<p><strong>Mouth spray:</strong> Fastest NRT (nicotine in 60 seconds). Best for acute, intense cravings.</p>
<h3>Combination Therapy</h3>
<p>Combining a patch (background) with a fast-acting form (gum/spray) for acute cravings is significantly more effective than either alone. This is the recommended approach for heavy users.</p>
`
  },
  {
    id: 'k12', category: 'Recovery', title: 'The Habit Loop: How to Break It',
    preview: 'Charles Duhigg\'s habit loop model and how to use it to break any addiction.',
    evidence: 'High-quality evidence',
    content: `
<h2>Cue → Routine → Reward</h2>
<p>Every habit — good or bad — follows a three-part neurological loop identified by MIT researchers and popularised by Charles Duhigg: a cue that triggers the brain, a routine or behaviour, and a reward that tells the brain the loop was worth remembering.</p>
<h3>Identifying Your Loop</h3>
<p>For most addictions: the cue might be stress, boredom, a specific time of day, a place, or an emotion. The routine is using the substance. The reward is the relief, stimulation, or escape.</p>
<h3>Breaking the Loop</h3>
<p>The most effective strategy is not eliminating the loop, but replacing the routine while keeping the cue and reward. Craving stress relief at 3pm? Keep the cue (3pm break). Keep the reward (relaxation). Replace smoking with a 5-minute walk. The brain accepts this substitution much more readily than pure abstinence.</p>
<h3>Environment Architecture</h3>
<p>Changing your physical environment disrupts cues powerfully. If you always smoked in your car, the car is a cue. Changing the car's smell, moving where you sit, or taking public transport temporarily removes the cue entirely.</p>
`
  },
  {
    id: 'k13', category: 'Recovery', title: 'Relapse: What the Research Says',
    preview: 'Relapse is part of recovery for most people. Here\'s how to make it a stepping stone, not a full stop.',
    evidence: 'High-quality evidence',
    content: `
<h2>Relapse Is Normal</h2>
<p>Studies consistently show that 40-60% of people in recovery relapse at some point. This is not failure — it is the statistical reality of changing deeply ingrained neurological patterns. The average person makes several quit attempts before achieving long-term abstinence.</p>
<h3>The Abstinence Violation Effect</h3>
<p>The most dangerous aspect of relapse is not the relapse itself but the psychological response to it — what researchers call the Abstinence Violation Effect (AVE). This is the "I've already ruined it, I might as well give up" thinking that turns a single lapse into a full return to use.</p>
<h3>What to Do After a Relapse</h3>
<p>Log it. Analyse the trigger — what cue preceded it? What emotional state were you in? What time was it? This data is valuable. Recommit immediately. The days of recovery you had before the relapse are not lost — your body kept healing during every clean hour.</p>
<h3>Pattern Recognition</h3>
<p>Multiple relapses reveal patterns. Friday nights. High-stress periods. Certain social environments. Identifying these patterns is not discouraging — it is the intelligence that makes the next attempt smarter.</p>
`
  },
  {
    id: 'k14', category: 'Dopamine', title: 'How to Rebuild Your Dopamine System Naturally',
    preview: 'Practical interventions with strong evidence for restoring dopamine sensitivity.',
    evidence: 'High-quality evidence',
    content: `
<h2>Natural Dopamine Restoration</h2>
<p>After heavy addiction, the brain's dopamine system is depleted: fewer receptors, lower baseline production, blunted response to everyday rewards. Recovery is possible, but it requires active lifestyle choices — the brain doesn't restore itself in the presence of a sedentary, stimulus-rich environment.</p>
<h3>Exercise — The Most Powerful Tool</h3>
<p>Aerobic exercise increases dopamine synthesis and receptor density. Crucially, unlike drugs, it does this without downregulation — each session improves baseline capacity rather than depleting it. 20-30 minutes of moderate-intensity exercise produces measurable dopamine effects within hours.</p>
<h3>Cold Exposure</h3>
<p>Cold water immersion (cold showers, ice baths) increases dopamine by approximately 250% above baseline, with a sustained effect lasting several hours. This is among the largest dopamine increases of any non-pharmacological intervention.</p>
<h3>Sleep</h3>
<p>Dopamine production requires adequate sleep. Deep sleep is when the brain synthesises dopamine precursors and clears metabolic waste. Every clean night of good sleep accelerates recovery.</p>
<h3>Diet</h3>
<p>Tyrosine (dopamine precursor) is found in eggs, dairy, meat, legumes, and nuts. Omega-3 fatty acids support dopamine receptor health. Magnesium deficiency is linked to reduced dopamine function.</p>
`
  },
  {
    id: 'k15', category: 'Social Media', title: 'Social Media and the Attention Economy',
    preview: 'How social media apps are engineered to create addiction — and how to take back control.',
    evidence: 'High-quality evidence',
    content: `
<h2>Designed for Addiction</h2>
<p>Social media platforms are optimised for one metric: time on platform. To maximise this, they apply the same behavioural conditioning principles used in slot machines — variable reward schedules. You scroll to find something rewarding, but the reward comes unpredictably, which is the most powerful conditioning schedule known in psychology.</p>
<h3>The Neurological Effects</h3>
<p>Each scroll is a small dopamine hit — curiosity, novelty, social validation. Hundreds of these per day condition the brain to expect rapid, low-effort stimulation. Over time, sustained concentration becomes difficult. The ability to tolerate boredom atrophies.</p>
<h3>The Evidence for Harm</h3>
<p>Multiple large studies link heavy social media use with increased anxiety, depression, loneliness, and sleep disruption. Adolescents are disproportionately affected. Adults show measurable attention and mood impacts with 2+ hours of daily use.</p>
<h3>Recovery</h3>
<p>Studies show measurable mood improvement within 1 week of reduced social media use. Attention span improves within 1 month. The key is deliberate use — checking with intent at specific times — rather than reflexive scrolling.</p>
`
  },
  {
    id: 'k16', category: 'Cravings', title: 'The 4-7-8 Breathing Technique',
    preview: 'A simple breathing exercise that activates your parasympathetic nervous system within seconds.',
    evidence: 'High-quality evidence',
    content: `
<h2>4-7-8 Breathing</h2>
<p>The 4-7-8 technique was popularised by Dr Andrew Weil and is based on pranayama breathing from yoga tradition. It activates the parasympathetic nervous system — the body's "rest and digest" state — which directly counteracts the fight-or-flight stress response that drives cravings.</p>
<h3>How to Do It</h3>
<p><strong>Inhale</strong> through your nose for 4 seconds. <strong>Hold</strong> your breath for 7 seconds. <strong>Exhale</strong> completely through your mouth for 8 seconds. Repeat 4 cycles.</p>
<h3>Why It Works</h3>
<p>The extended exhale activates the vagus nerve, triggering parasympathetic response. Heart rate slows. Cortisol drops. The physiological stress state that makes cravings feel urgent is directly interrupted. This is not relaxation theatre — it is neurological intervention.</p>
<h3>The Evidence</h3>
<p>Controlled breathing techniques show robust evidence for reducing acute anxiety, stress, and craving intensity. They are now a standard component of addiction treatment protocols.</p>
`
  },
  {
    id: 'k17', category: 'Shisha', title: 'Shisha: The Most Underestimated Harm',
    preview: 'Shisha is widely perceived as safer than cigarettes. The data says otherwise.',
    evidence: 'High-quality evidence',
    content: `
<h2>The Shisha Myth</h2>
<p>The water pipe (shisha, hookah, narghile) is widely perceived as safer than cigarettes because the smoke passes through water. This is a misconception with serious health consequences.</p>
<h3>The Smoke Volume Problem</h3>
<p>A typical 45-60 minute shisha session involves 200 puffs. A cigarette involves approximately 8-12 puffs. The total smoke volume from one shisha session is equivalent to 100-200 cigarettes.</p>
<h3>What the Water Doesn't Filter</h3>
<p>While water cools the smoke, it does not significantly filter nicotine, carbon monoxide, heavy metals (lead, arsenic, cadmium from charcoal), or cancer-causing chemicals. CO levels in shisha smoke are significantly higher than in cigarette smoke due to the charcoal combustion.</p>
<h3>The Secondhand Smoke Problem</h3>
<p>Shisha sessions are social — everyone in the room is exposed to secondhand smoke for the entire session. CO levels in shisha lounges often exceed WHO safety limits.</p>
<h3>Recovery</h3>
<p>Despite the higher per-session exposure, the recovery trajectory for shisha users who quit is broadly similar to ex-smokers. Cardiovascular risk halves within 1 year.</p>
`
  },
  {
    id: 'k18', category: 'Recovery', title: 'Building Your Recovery Environment',
    preview: 'The environment you live in determines more of your recovery success than willpower does.',
    evidence: 'High-quality evidence',
    content: `
<h2>Environment as Architecture</h2>
<p>Behavioural research consistently shows that environment — physical, social, and digital — is a more powerful determinant of behaviour than conscious willpower. This is not an excuse; it is intelligence you can use.</p>
<h3>Physical Environment</h3>
<p>Remove all paraphernalia. The sight of a lighter, a vape, an ashtray, or a grinder is a cue. Clean your space. Change what you can — rearrange furniture, open windows, use different mugs, drive different routes.</p>
<h3>Social Environment</h3>
<p>Social contagion is real: you are more likely to use if people around you use. This doesn't require cutting people off — but it does require having direct conversations about your recovery, or avoiding specific situations temporarily.</p>
<h3>Digital Environment</h3>
<p>Unfollow accounts that feature your habit. Use app blockers during high-risk times. Set your phone to greyscale — it reduces the visual reward of apps significantly.</p>
<h3>The 20-Second Rule</h3>
<p>Adding 20 seconds of friction to a bad habit reduces its occurrence dramatically. Removing 20 seconds of friction from a good habit increases it. Architecture your environment so the good choice is the easy choice.</p>
`
  },
  {
    id: 'k19', category: 'Nicotine', title: 'The Vaping Lung Health Crisis: What We Know',
    preview: 'EVALI, popcorn lung, and the long-term respiratory effects of vaping — current evidence.',
    evidence: 'Emerging evidence',
    content: `
<h2>Vaping and Lung Health</h2>
<p>The 2019 EVALI (E-cigarette or Vaping product use-Associated Lung Injury) outbreak hospitalised over 2,800 people in the US and caused 68 deaths. While most cases were linked to vitamin E acetate in illicit THC cartridges, the outbreak demonstrated that inhaled aerosols can cause acute, severe lung injury.</p>
<h3>Diacetyl and Popcorn Lung</h3>
<p>Some e-liquid flavours contain diacetyl — a buttery flavour compound linked to bronchiolitis obliterans ("popcorn lung"), an irreversible lung condition. Reputable manufacturers have removed diacetyl, but regulation is inconsistent, especially in unregulated markets.</p>
<h3>Long-Term Effects</h3>
<p>Vaping has existed for approximately 15 years. Long-term data (20-30 years) simply doesn't exist yet. What we know: vaping causes airway inflammation, measurable decreases in lung function in some users, and exposure to formaldehyde at high wattages.</p>
<h3>Recovery</h3>
<p>Most airway inflammation from vaping resolves within weeks to months of cessation. Lung function measurably improves within 6-12 months. The earlier you stop, the more complete the recovery.</p>
`
  },
  {
    id: 'k20', category: 'Weed', title: 'Cannabis and Mental Health: The Current Evidence',
    preview: 'What the research shows about cannabis, anxiety, depression, and psychosis risk.',
    evidence: 'High-quality evidence',
    content: `
<h2>Cannabis and the Mind</h2>
<p>Cannabis has complex effects on mental health that depend on frequency of use, potency, age of onset, and individual genetic vulnerability. The relationship is not simple.</p>
<h3>Anxiety and Depression</h3>
<p>While cannabis can temporarily reduce anxiety (this is why many use it), regular use is associated with increased baseline anxiety and depression over time. The mechanism is dopaminergic: chronic THC exposure reduces dopamine synthesis and receptor sensitivity, contributing to anhedonia and anxiety disorders.</p>
<h3>Psychosis Risk</h3>
<p>High-potency cannabis (>10% THC) significantly increases the risk of psychotic episodes, particularly in those with genetic predisposition. The Lancet Psychiatry found daily high-potency cannabis users are 5 times more likely to develop psychosis than non-users.</p>
<h3>The Motivation Myth</h3>
<p>"Amotivational syndrome" — the stereotyped cannabis-related loss of drive — has been studied extensively. Chronic heavy users show measurable reductions in dopamine synthesis in the striatum, directly impairing motivation and reward. This reverses with abstinence.</p>
<h3>Recovery</h3>
<p>Mental health outcomes substantially improve with cannabis cessation. Anxiety and depression symptoms typically improve within 4-6 weeks. In those with cannabis-induced psychosis, full recovery is common with abstinence.</p>
`
  },
  {
    id: 'k21', category: 'Recovery', title: 'The Neuroscience of Willpower',
    preview: 'Willpower is a finite resource — but it can be trained. Here\'s how.',
    evidence: 'High-quality evidence',
    content: `
<h2>Ego Depletion and the Glucose Model</h2>
<p>Early willpower research by Roy Baumeister proposed the "ego depletion" model — willpower is a finite resource that gets used up. While some aspects of this model have been contested, the practical insight holds: making multiple decisions or resisting multiple urges in a day depletes cognitive resources available for later decisions.</p>
<h3>The Prefrontal Cortex</h3>
<p>Willpower resides primarily in the prefrontal cortex (PFC) — the region responsible for rational decision-making, impulse control, and long-term thinking. Stress, sleep deprivation, and addiction all compromise PFC function, making resistance harder.</p>
<h3>Building Willpower</h3>
<p>The PFC responds to training like a muscle. Each time you resist an impulse — regardless of magnitude — you strengthen the neural circuits of self-regulation. Starting with small wins (making your bed, closing apps on time) builds toward larger ones.</p>
<h3>Minimising Willpower Requirements</h3>
<p>The smarter approach is to reduce the number of willpower battles through environment design. If your vape isn't in the house, you don't need willpower to not vape at home. Decision architecture beats willpower every time.</p>
`
  },
  {
    id: 'k22', category: 'Caffeine', title: 'Caffeine Dependency: The Most Accepted Addiction',
    preview: 'Caffeine is the world\'s most widely used psychoactive drug. Here\'s the full picture.',
    evidence: 'High-quality evidence',
    content: `
<h2>Caffeine: The Socially Acceptable Addiction</h2>
<p>Caffeine is consumed by approximately 80% of the world's adult population daily. It is the most widely consumed psychoactive substance on earth. Its mechanism is well understood: caffeine blocks adenosine receptors in the brain, preventing the buildup of tiredness signal and increasing alertness.</p>
<h3>Tolerance and Dependency</h3>
<p>With regular use, the brain upregulates adenosine receptors to compensate — creating tolerance. Without caffeine, excess adenosine floods these new receptors, causing profound fatigue, headaches, and irritability. This is physical dependency.</p>
<h3>The Withdrawal Curve</h3>
<p>Withdrawal begins within 12-24 hours of last use. Headaches peak at 20-51 hours and resolve within 2-9 days. Sleep quality dramatically improves within the first week without caffeine.</p>
<h3>The Case for Reduction</h3>
<p>Beyond dependency, excess caffeine is associated with: anxiety, heart palpitations, elevated blood pressure, acid reflux, and disrupted sleep (caffeine's half-life is 5-7 hours — an afternoon coffee is still 50% active at midnight).</p>
<h3>Cutting Down</h3>
<p>A gradual taper (reducing by 10% per week) eliminates withdrawal symptoms almost entirely. Cold turkey, while faster, involves significant discomfort.</p>
`
  },
];
window.KNOWLEDGE_DB = KNOWLEDGE_DB;
