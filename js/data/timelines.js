const TIMELINES = {
  smoking: [
    { hours: 0.33, title: "Carbon Monoxide Clears", body: "Your blood CO levels begin dropping within 20 minutes. Heart rate and blood pressure start returning to normal.", system: "Cardiovascular", level: "scientific", icon: "❤️" },
    { hours: 8,    title: "Oxygen Restored", body: "Blood oxygen levels have normalized. Nicotine and CO levels drop by more than half. You can breathe slightly easier.", system: "Lungs", level: "scientific", icon: "🫁" },
    { hours: 12,   title: "Heart Rate Stabilizes", body: "Carbon monoxide fully cleared. Heart no longer has to work overtime to supply oxygen to tissues.", system: "Cardiovascular", level: "scientific", icon: "💓" },
    { hours: 24,   title: "Heart Attack Risk Drops", body: "Just one day smoke-free significantly reduces your risk of a heart attack. Your body is already healing.", system: "Cardiovascular", level: "scientific", icon: "🛡️" },
    { hours: 48,   title: "Nerve Endings Regenerate", body: "Nerve endings damaged by smoking begin to regrow. Your sense of smell and taste start returning.", system: "Nervous System", level: "scientific", icon: "🧠" },
    { hours: 72,   title: "Nicotine Gone", body: "Nicotine has completely left your body. Bronchial tubes relax and breathing becomes noticeably easier. Energy levels increase.", system: "Lungs", level: "scientific", icon: "💨" },
    { hours: 168,  title: "One Week Warrior", body: "Cilia in your lungs are recovering, improving mucus clearance. Circulation improves. Withdrawal peaks and then subsides.", system: "Lungs", level: "scientific", icon: "⚡" },
    { hours: 336,  title: "Two Weeks Strong", body: "Lung function improving significantly. Walking feels easier. Circulation continues to improve markedly.", system: "Cardiovascular", level: "scientific", icon: "🏃" },
    { hours: 720,  title: "One Month Free", body: "Coughing, shortness of breath, and sinus congestion decrease dramatically. Lung cilia fully functional.", system: "Lungs", level: "scientific", icon: "🌿" },
    { hours: 2160, title: "90 Days — Rewired", body: "Brain's dopamine pathways have significantly restructured. Cravings are manageable. You've broken the chemical dependency.", system: "Brain", level: "scientific", icon: "🧬" },
    { hours: 4320, title: "Six Months of Freedom", body: "Lung capacity increases by up to 10%. Former smokers report dramatically reduced cravings and improved mood stability.", system: "Lungs", level: "reported", icon: "🌟" },
    { hours: 8760, title: "One Year Clean", body: "Risk of coronary heart disease is now half that of a smoker. Lungs have healed substantially. You've reclaimed your health.", system: "Cardiovascular", level: "scientific", icon: "🏆" },
  ],

  porn: [
    { hours: 24,   title: "Dopamine Reset Begins", body: "Your brain starts recalibrating dopamine receptors. You may feel restless or anxious — this is normal detox.", system: "Brain", level: "scientific", icon: "🧠" },
    { hours: 72,   title: "Flatline Phase", body: "Many report a 'flatline' — low motivation and libido. This is your brain recalibrating. It passes. Stay the course.", system: "Brain", level: "reported", icon: "📉" },
    { hours: 168,  title: "Week One — Clarity Emerging", body: "Social anxiety may reduce slightly. Some notice increased eye contact comfort and reduced shame. Urges remain but are manageable.", system: "Brain", level: "reported", icon: "👁️" },
    { hours: 336,  title: "Two Weeks — Real Emotions Return", body: "Ability to feel genuine emotional responses improving. Motivation for real-world activities increases. Brain chemistry shifting.", system: "Brain", level: "reported", icon: "💚" },
    { hours: 720,  title: "30 Days — Rewiring in Progress", body: "Prefrontal cortex reengages. Decision-making improves. Many report stronger desire to pursue real relationships and goals.", system: "Brain", level: "reported", icon: "🔋" },
    { hours: 1440, title: "60 Days — Confidence Rising", body: "Social confidence and eye contact become natural. Many report feeling more present, energized, and purposeful.", system: "Brain", level: "reported", icon: "⬆️" },
    { hours: 2160, title: "90 Days — The Hard Reset", body: "Clinically, 90 days is considered a full neural recalibration period. Dopamine sensitivity largely restored. Real attraction returns.", system: "Brain", level: "scientific", icon: "🎯" },
    { hours: 4320, title: "Six Months — New Baseline", body: "New neural pathways firmly established. The old compulsion feels distant. You've reprogrammed your reward system.", system: "Brain", level: "reported", icon: "🌅" },
  ],

  weed: [
    { hours: 24,   title: "THC Clearance Begins", body: "THC levels dropping. Vivid dreams may begin tonight as REM sleep rebounds. Mild irritability is normal.", system: "Brain", level: "scientific", icon: "🌙" },
    { hours: 48,   title: "Sleep Intensifies", body: "REM sleep rebounds strongly. You may experience very vivid or strange dreams. Appetite begins returning to normal.", system: "Brain", level: "scientific", icon: "💤" },
    { hours: 72,   title: "Appetite Normalizing", body: "Hunger cues returning to natural rhythm. Mild anxiety and irritability peak around day 3 then begin subsiding.", system: "Digestive", level: "scientific", icon: "🍎" },
    { hours: 168,  title: "Motivation Returns", body: "Anandamide production normalizing. Intrinsic motivation — the kind that doesn't need a high — starts coming back.", system: "Brain", level: "scientific", icon: "🔥" },
    { hours: 720,  title: "30 Days — Cognition Sharpens", body: "Working memory, processing speed, and focus measurably improve. Mental fog lifts. Many feel 'like themselves' again.", system: "Brain", level: "scientific", icon: "🧩" },
    { hours: 2160, title: "90 Days — Full Clarity", body: "Cognitive function fully restored. Studies show executive function, memory, and emotional regulation return to baseline.", system: "Brain", level: "scientific", icon: "💡" },
  ],

  social_media: [
    { hours: 24,   title: "Dopamine Detox Begins", body: "Your brain adjusts to the absence of constant validation loops. You may feel bored or restless — this is the detox.", system: "Brain", level: "scientific", icon: "📵" },
    { hours: 72,   title: "Attention Span Recovering", body: "Your ability to sustain focus for longer periods begins returning. Boredom tolerance improves. Anxiety may spike temporarily.", system: "Brain", level: "reported", icon: "🎯" },
    { hours: 168,  title: "Present Awareness Returns", body: "You notice more about your environment. Conversations feel richer. FOMO begins declining. Genuine boredom feels okay.", system: "Brain", level: "reported", icon: "🌿" },
    { hours: 720,  title: "30 Days — Deep Work Possible", body: "Sustained focus sessions become natural again. Creativity increases. Sleep quality often improves without blue-light doom-scrolling.", system: "Brain", level: "reported", icon: "💻" },
  ],

  sugar: [
    { hours: 24,   title: "Blood Sugar Stabilizes", body: "Energy stops spiking and crashing. Your pancreas gets a break. Cravings will peak around day 2-3.", system: "Metabolic", level: "scientific", icon: "📊" },
    { hours: 72,   title: "Cravings Peak", body: "Day 3 is the hardest — your gut bacteria that thrive on sugar are sending distress signals. Push through.", system: "Digestive", level: "scientific", icon: "⚠️" },
    { hours: 168,  title: "Week One — Taste Returns", body: "Taste receptors recalibrating. Natural foods taste sweeter. Gut microbiome starts shifting toward healthier bacteria.", system: "Digestive", level: "scientific", icon: "🍓" },
    { hours: 720,  title: "30 Days — Metabolic Reset", body: "Insulin sensitivity improves. Energy is consistent. Inflammation markers drop. Skin may visibly improve.", system: "Metabolic", level: "scientific", icon: "✨" },
    { hours: 2160, title: "90 Days — New Normal", body: "Cravings largely extinguished. Gut microbiome significantly healthier. Metabolic health measurably improved.", system: "Metabolic", level: "scientific", icon: "🏅" },
  ],

  caffeine: [
    { hours: 24,   title: "Adenosine Surge", body: "Adenosine receptors flood — expect headache and fatigue. Your brain is learning to regulate sleep pressure naturally.", system: "Brain", level: "scientific", icon: "😴" },
    { hours: 48,   title: "Withdrawal Peak", body: "Headache and fatigue at their worst. Hydrate heavily. This is the hardest 24 hours.", system: "Brain", level: "scientific", icon: "💊" },
    { hours: 96,   title: "Natural Energy Returns", body: "Withdrawal symptoms mostly gone. Your natural adenosine system begins regulating sleep-wake cycle without chemical dependency.", system: "Brain", level: "scientific", icon: "☀️" },
    { hours: 336,  title: "Sleep Architecture Improves", body: "Deep sleep quality increases significantly. Natural energy feels more stable and consistent throughout the day.", system: "Brain", level: "scientific", icon: "💤" },
    { hours: 720,  title: "Baseline Reset Complete", body: "Adenosine receptors fully recalibrated. You are no longer dependent on caffeine to feel awake. Natural alertness restored.", system: "Brain", level: "scientific", icon: "⚡" },
  ],

  vape: [
    { hours: 0.33, title: "Nicotine Levels Begin Dropping", body: "Blood nicotine starts to fall within 20 minutes. Heart rate and blood pressure begin to normalize toward healthy baseline.", system: "Cardiovascular", level: "scientific", icon: "❤️" },
    { hours: 8,    title: "Carbon Monoxide Reduces", body: "CO levels drop significantly — especially relevant for high-power devices and heated aerosol. Oxygen delivery to tissues improving.", system: "Lungs", level: "scientific", icon: "🫁" },
    { hours: 12,   title: "Intense Cravings Peak", body: "Nicotine withdrawal reaches its first peak. Irritability and anxiety are normal physiological responses. This will pass.", system: "Brain", level: "scientific", icon: "🧠" },
    { hours: 24,   title: "Nicotine Cleared", body: "Nicotine itself has been fully metabolized from your bloodstream. What remains is cotinine and the psychological habit pattern.", system: "Brain", level: "scientific", icon: "✨" },
    { hours: 48,   title: "Cotinine Eliminated", body: "Nicotine's primary metabolite is gone. Taste and smell sensitivity beginning to return. Your body is genuinely clean.", system: "Nervous System", level: "scientific", icon: "👃" },
    { hours: 72,   title: "Withdrawal Peak Passes", body: "Most intense physical withdrawal is behind you. Lung cilia beginning to recover and clear accumulated aerosol residue.", system: "Lungs", level: "scientific", icon: "💪" },
    { hours: 168,  title: "Lung Cilia Recovering", body: "Airways clearing as cilia regain function. You may cough more than usual — this is your lungs actively cleaning themselves.", system: "Lungs", level: "scientific", icon: "🫁" },
    { hours: 336,  title: "Circulation Improving", body: "Blood flow and cardiovascular function measurably improved. Nicotine-induced vasoconstriction reversing. Energy levels rising.", system: "Cardiovascular", level: "scientific", icon: "🩸" },
    { hours: 720,  title: "Dopamine Baseline Shifting", body: "Brain reward system recalibrating to natural stimuli. Nicotine-hijacked dopamine pathways weakening. Natural pleasures returning.", system: "Brain", level: "scientific", icon: "🧬" },
    { hours: 1440, title: "Lung Inflammation Reducing", body: "Airways less inflamed. Breathing measurably easier. Risk factors associated with vaping-induced lung injury beginning to decline.", system: "Lungs", level: "scientific", icon: "🌬️" },
    { hours: 2160, title: "Neural Pathways Rewiring", body: "Craving frequency and intensity significantly reduced. New neural baseline forming without nicotine dependency reinforcement.", system: "Brain", level: "scientific", icon: "🧠" },
    { hours: 4320, title: "Half Year Clean", body: "Vascular health substantially improved. Risk of nicotine-related cardiovascular disease dropping measurably. Lung function gains consolidating.", system: "Cardiovascular", level: "scientific", icon: "🏆" },
    { hours: 8760, title: "One Year Milestone", body: "Full nicotine receptor normalization achieved. Heart disease risk approaching that of a non-vaper. A full year of clean breathing.", system: "Cardiovascular", level: "scientific", icon: "🎯" },
  ],
};

if (typeof module !== 'undefined') module.exports = TIMELINES;
