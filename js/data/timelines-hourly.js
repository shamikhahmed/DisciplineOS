'use strict';
/* Hourly body-healing milestones for first 72 hours — merged into RECOVERY_TIMELINES at load */
const HOURLY_72H = {
  smoking: [
    { hours: 1, title: 'Blood Pressure Easing', body: 'Heart rate begins dropping. Circulation to extremities improving within the first hour.', system: 'Cardiovascular', level: 'scientific', icon: '❤️' },
    { hours: 2, title: 'Nicotine Halving', body: 'Blood nicotine levels drop by roughly 50%. Early withdrawal sensations may begin.', system: 'Neurological', level: 'scientific', icon: '🧠' },
    { hours: 4, title: 'Body Temperature Normalising', body: 'Peripheral circulation improving. Hands and feet warming as vessels relax.', system: 'Circulation', level: 'scientific', icon: '🩸' },
    { hours: 6, title: 'Carbon Monoxide Falling', body: 'CO levels in blood measurably decreasing. Oxygen delivery to tissues improving.', system: 'Lungs', level: 'scientific', icon: '🫁' },
    { hours: 10, title: 'Craving Waves Peak', body: 'Nicotine withdrawal cravings often peak in waves every 1–2 hours. Each wave passes in ~3 minutes.', system: 'Neurological', level: 'scientific', icon: '⚡' },
    { hours: 18, title: 'Sleep Architecture Shifting', body: 'REM sleep may be disrupted tonight as nicotine leaves your system. This is temporary.', system: 'Sleep', level: 'reported', icon: '🌙' },
    { hours: 20, title: 'Bronchial Irritation Easing', body: 'Airway inflammation from last smoke begins to calm. Cough may temporarily increase as lungs clear.', system: 'Lungs', level: 'scientific', icon: '🫁' },
    { hours: 36, title: 'Anxiety Plateau', body: 'Peak anxiety from nicotine withdrawal often occurs around 36–48 hours. You are in the hardest window.', system: 'Mental Health', level: 'scientific', icon: '🧘' },
    { hours: 60, title: 'Energy Returning', body: 'Many report a noticeable energy lift by hour 60 as oxygen saturation fully normalises.', system: 'Metabolic', level: 'reported', icon: '⚡' },
  ],
  vape: [
    { hours: 1, title: 'Nicotine Declining', body: 'Blood nicotine from your last puff dropping rapidly. First craving wave may hit within 60 minutes.', system: 'Neurological', level: 'scientific', icon: '🧠' },
    { hours: 2, title: 'Heart Rate Dropping', body: 'Cardiovascular system responding to reduced stimulant load. Resting heart rate normalising.', system: 'Cardiovascular', level: 'scientific', icon: '❤️' },
    { hours: 4, title: 'Hand-to-Mouth Urge', body: 'The behavioural habit of raising device to mouth peaks. Keep hands busy with water or a fidget.', system: 'Behavioural', level: 'reported', icon: '✋' },
    { hours: 6, title: 'Cotinine Processing', body: 'Liver metabolising nicotine into cotinine. Metabolic clearance accelerating.', system: 'Metabolic', level: 'scientific', icon: '🔬' },
    { hours: 10, title: 'Irritability Peak', body: 'Nicotine withdrawal irritability often peaks around hours 8–12. This is chemistry, not character.', system: 'Mental Health', level: 'scientific', icon: '⚡' },
    { hours: 18, title: 'Airway Recovery Begins', body: 'Vaping-related airway irritation starting to resolve. Deep breaths feel slightly easier.', system: 'Lungs', level: 'scientific', icon: '🫁' },
    { hours: 36, title: 'Dopamine Crash', body: 'Dopamine baseline at its lowest. The flatline feeling is your brain recalibrating — temporary.', system: 'Neurological', level: 'scientific', icon: '📉' },
    { hours: 60, title: 'Taste Buds Waking', body: 'Taste receptor recovery accelerating. Food may start tasting noticeably richer.', system: 'Sensory', level: 'reported', icon: '👅' },
  ],
  alcohol: [
    { hours: 1, title: 'Blood Alcohol Clearing', body: 'Liver processing ethanol. Hydration now significantly speeds clearance and reduces hangover severity.', system: 'Liver', level: 'scientific', icon: '🫀' },
    { hours: 3, title: 'Glutamate Rebound', body: 'Brain glutamate activity surging as depressant effect wears off. Anxiety and tremor possible.', system: 'Neurological', level: 'scientific', icon: '🧠' },
    { hours: 6, title: 'Sleep REM Rebound', body: 'Alcohol suppresses REM. As it clears, vivid dreams and fragmented sleep are common.', system: 'Sleep', level: 'scientific', icon: '🌙' },
    { hours: 12, title: 'Blood Sugar Stabilising', body: 'Hypoglycaemia risk from alcohol metabolism resolving. Eat protein-rich food.', system: 'Metabolic', level: 'scientific', icon: '📊' },
    { hours: 18, title: 'GABA System Recalibrating', body: 'Your calming neurotransmitter system beginning to restore balance without alcohol.', system: 'Neurological', level: 'scientific', icon: '🧘' },
    { hours: 24, title: 'Liver Enzymes Active', body: 'ALT and GGT inflammation from last drink beginning to decrease. Liver healing starts immediately.', system: 'Liver', level: 'scientific', icon: '🫀' },
    { hours: 36, title: 'Withdrawal Risk Window', body: 'For heavy drinkers, hours 24–72 carry highest withdrawal risk. Seek medical help if severe symptoms.', system: 'Safety', level: 'scientific', icon: '⚠️' },
    { hours: 48, title: 'Blood Pressure Improving', body: 'Alcohol-induced hypertension beginning to resolve. Cardiovascular strain reducing.', system: 'Cardiovascular', level: 'scientific', icon: '❤️' },
    { hours: 60, title: 'Skin Hydration Returning', body: 'Alcohol is a diuretic. Skin plumpness and colour improving as hydration normalises.', system: 'Skin', level: 'reported', icon: '✨' },
  ],
  porn: [
    { hours: 1, title: 'Urge Wave Passing', body: 'The first post-quit urge typically peaks within 20 minutes and fades within an hour if not acted on.', system: 'Neurological', level: 'reported', icon: '🌊' },
    { hours: 3, title: 'Prefrontal Cortex Engaging', body: 'Decision-making centres re-engaging as immediate dopamine demand subsides.', system: 'Cognitive', level: 'scientific', icon: '🎯' },
    { hours: 6, title: 'Restlessness Peak', body: 'Boredom and restlessness common at hour 6. Physical movement breaks the loop.', system: 'Behavioural', level: 'reported', icon: '🏃' },
    { hours: 12, title: 'Dopamine Baseline Dropping', body: 'Without artificial stimulation, dopamine feels low. This discomfort is the healing process.', system: 'Neurological', level: 'scientific', icon: '📉' },
    { hours: 18, title: 'Sleep Quality Shifting', body: 'Night-time urges often peak. Phone out of bedroom significantly reduces relapse risk.', system: 'Sleep', level: 'reported', icon: '🌙' },
    { hours: 36, title: 'Flatline Onset', body: 'Low libido and motivation common at 36–72h. Brain downregulating hyperstimulation.', system: 'Neurological', level: 'reported', icon: '📉' },
    { hours: 48, title: 'Social Anxiety Easing', body: 'Eye contact and social presence often improve within 48 hours of quitting.', system: 'Social', level: 'reported', icon: '👥' },
    { hours: 60, title: 'Focus Returning', body: 'Sustained attention spans lengthening. Brain fog beginning to lift.', system: 'Cognitive', level: 'reported', icon: '💡' },
  ],
  masturbation: [
    { hours: 1, title: 'Urge Surfing', body: 'Initial urge peaks and falls within 60 minutes. Observe it without acting — it will pass.', system: 'Neurological', level: 'reported', icon: '🌊' },
    { hours: 4, title: 'Dopamine Dip', body: 'Prolactin and dopamine rebalancing. Temporary low mood is normal.', system: 'Neurological', level: 'scientific', icon: '🧠' },
    { hours: 8, title: 'Energy Redistribution', body: 'Many report increased physical energy within 8 hours as dopamine is not spent on release.', system: 'Metabolic', level: 'reported', icon: '⚡' },
    { hours: 12, title: 'Testosterone Rhythm', body: 'Natural hormonal rhythms restoring. Morning energy and drive may feel different.', system: 'Hormonal', level: 'reported', icon: '🔥' },
    { hours: 24, title: 'Confidence Shift', body: 'Reduced shame cycle. Self-esteem often improves within the first day of commitment.', system: 'Mental Health', level: 'reported', icon: '💪' },
    { hours: 36, title: 'Flatline Window', body: 'Low motivation and libido common days 2–5. This is neurochemical recalibration, not permanent.', system: 'Neurological', level: 'reported', icon: '📉' },
    { hours: 48, title: 'Social Presence Up', body: 'Reduced social anxiety and improved eye contact reported by hour 48.', system: 'Social', level: 'reported', icon: '👥' },
    { hours: 60, title: 'Drive Returning', body: 'Motivation for real-world goals beginning to resurface as dopamine baseline rises.', system: 'Cognitive', level: 'reported', icon: '🎯' },
  ],
  social_media: [
    { hours: 1, title: 'Phantom Vibrations', body: 'Your brain expects a notification hit. The itch to check is the addiction speaking.', system: 'Neurological', level: 'reported', icon: '📱' },
    { hours: 4, title: 'Boredom Discomfort', body: 'Without constant stimulation, boredom feels intense. This is your attention span rebuilding.', system: 'Cognitive', level: 'reported', icon: '🧘' },
    { hours: 8, title: 'FOMO Peak', body: 'Fear of missing out peaks around hour 8. Nothing urgent is happening — your brain is lying.', system: 'Mental Health', level: 'reported', icon: '😰' },
    { hours: 12, title: 'First Focus Window', body: 'A 15-minute uninterrupted focus block becomes possible for the first time.', system: 'Cognitive', level: 'reported', icon: '🎯' },
    { hours: 24, title: 'Dopamine Sensitivity Up', body: 'Small real-world pleasures start registering again after 24 hours without scrolling.', system: 'Neurological', level: 'scientific', icon: '🧠' },
    { hours: 36, title: 'Sleep Pressure Building', body: 'Without late-night scrolling, natural melatonin production improving.', system: 'Sleep', level: 'scientific', icon: '🌙' },
    { hours: 48, title: 'Anxiety Reduction', body: 'Social comparison anxiety measurably lower after 48 hours offline.', system: 'Mental Health', level: 'scientific', icon: '🌤️' },
    { hours: 60, title: 'Deep Work Capacity', body: '45+ minute focus sessions becoming achievable by hour 60.', system: 'Cognitive', level: 'reported', icon: '🔥' },
  ],
  weed: [
    { hours: 1, title: 'THC Metabolising', body: 'Active THC clearing from bloodstream. CB1 receptors beginning to desensitise less.', system: 'Neurological', level: 'scientific', icon: '🧠' },
    { hours: 4, title: 'Appetite Shifting', body: 'Cannabis-stimulated hunger fading. Natural appetite cues returning.', system: 'Metabolic', level: 'scientific', icon: '🍎' },
    { hours: 8, title: 'Irritability Rising', body: 'Early withdrawal irritability common. Exercise is the fastest mood stabiliser.', system: 'Mental Health', level: 'scientific', icon: '⚡' },
    { hours: 18, title: 'REM Rebound Tonight', body: 'Vivid dreams likely tonight as REM sleep recovers from cannabis suppression.', system: 'Sleep', level: 'scientific', icon: '🌙' },
    { hours: 36, title: 'Anxiety Peak', body: 'Cannabis withdrawal anxiety often peaks at 48–72h. This is temporary.', system: 'Mental Health', level: 'scientific', icon: '😰' },
    { hours: 60, title: 'Clarity Emerging', body: 'Brain fog lifting. Conversations feel sharper and more present.', system: 'Cognitive', level: 'reported', icon: '💡' },
  ],
  caffeine: [
    { hours: 1, title: 'Adenosine Surge', body: 'Without caffeine blocking receptors, adenosine causes drowsiness. This is normal.', system: 'Neurological', level: 'scientific', icon: '😴' },
    { hours: 4, title: 'Headache Building', body: 'Cerebral blood vessel dilation causes withdrawal headache. Hydrate and rest.', system: 'Neurological', level: 'scientific', icon: '⚡' },
    { hours: 8, title: 'Fatigue Peak', body: 'Energy at its lowest around hour 8–12 without caffeine. Nap if possible.', system: 'Metabolic', level: 'scientific', icon: '📉' },
    { hours: 18, title: 'Headache Easing', body: 'Vascular headaches typically resolve after 24–48 hours.', system: 'Neurological', level: 'scientific', icon: '🌤️' },
    { hours: 36, title: 'Natural Alertness', body: 'Morning alertness without caffeine beginning to return.', system: 'Metabolic', level: 'reported', icon: '☀️' },
    { hours: 60, title: 'Sleep Depth Improving', body: 'Deep sleep cycles lengthening. Waking more refreshed.', system: 'Sleep', level: 'scientific', icon: '🌙' },
  ],
  sugar: [
    { hours: 1, title: 'Blood Sugar Crashing', body: 'Insulin spike from last sugar hit reversing. Energy dip and irritability common.', system: 'Metabolic', level: 'scientific', icon: '📉' },
    { hours: 4, title: 'Craving Intensity', body: 'Sugar cravings peak every 3–4 hours initially. Protein snack breaks the cycle.', system: 'Neurological', level: 'scientific', icon: '🍬' },
    { hours: 12, title: 'Inflammation Dropping', body: 'Systemic inflammation from sugar beginning to decrease within hours.', system: 'Inflammation', level: 'scientific', icon: '🔬' },
    { hours: 24, title: 'Energy Stabilising', body: 'Blood glucose swings less extreme. Fewer afternoon crashes.', system: 'Metabolic', level: 'scientific', icon: '⚡' },
    { hours: 48, title: 'Taste Buds Resetting', body: 'Natural sweetness in fruit becomes more pronounced.', system: 'Sensory', level: 'reported', icon: '👅' },
    { hours: 60, title: 'Gut Bacteria Shifting', body: 'Microbiome beginning to favour bacteria that crave whole foods over sugar.', system: 'Gut', level: 'scientific', icon: '🦠' },
  ],
  gaming: [
    { hours: 1, title: 'Dopamine Demand', body: 'Brain demanding game stimulation. The urge is strongest in the first hour.', system: 'Neurological', level: 'reported', icon: '🎮' },
    { hours: 4, title: 'Restlessness', body: 'Hands and mind seeking stimulation. Replace with physical activity.', system: 'Behavioural', level: 'reported', icon: '🏃' },
    { hours: 12, title: 'Boredom Tolerance', body: 'Sitting with boredom without reaching for a screen — first practice.', system: 'Cognitive', level: 'reported', icon: '🧘' },
    { hours: 24, title: 'Sleep Improvement', body: 'Blue light and stimulation removed. Falling asleep faster tonight.', system: 'Sleep', level: 'reported', icon: '🌙' },
    { hours: 48, title: 'Real-World Interest', body: 'Non-digital activities starting to feel engaging again.', system: 'Cognitive', level: 'reported', icon: '🌍' },
    { hours: 60, title: 'Motivation Shift', body: 'Goal-directed behaviour in real life increasing.', system: 'Neurological', level: 'reported', icon: '🔥' },
  ],
  nicotine_pouches: [
    { hours: 1, title: 'Nicotine Declining', body: 'Blood nicotine dropping. First craving wave within 30–60 minutes.', system: 'Neurological', level: 'scientific', icon: '🧠' },
    { hours: 4, title: 'Gum Sensation Changing', body: 'Oral tissue no longer irritated by pouch. Tingly gum feeling fading.', system: 'Oral', level: 'reported', icon: '🦷' },
    { hours: 12, title: 'Nicotine Cleared', body: 'Nicotine eliminated from blood. Pure psychological habit remains.', system: 'Metabolic', level: 'scientific', icon: '✨' },
    { hours: 24, title: 'Irritability Peak', body: 'Peak irritability at 24–48h. Warn people close to you — it passes.', system: 'Mental Health', level: 'scientific', icon: '⚡' },
    { hours: 48, title: 'Oral Healing', body: 'Gum recession irritation reversing. Oral blood flow normalising.', system: 'Oral', level: 'reported', icon: '🦷' },
    { hours: 60, title: 'Dopamine Stabilising', body: 'Mood swings reducing. Natural reward sensitivity returning.', system: 'Neurological', level: 'scientific', icon: '🧠' },
  ],
  shisha: [
    { hours: 1, title: 'CO Peaking Down', body: 'Charcoal monoxide from session clearing. Oxygen saturation recovering.', system: 'Cardiovascular', level: 'scientific', icon: '❤️' },
    { hours: 4, title: 'Airway Inflammation', body: 'Bronchial tubes irritated from smoke. Cough may increase as lungs clear.', system: 'Lungs', level: 'scientific', icon: '🫁' },
    { hours: 12, title: 'CO Eliminated', body: 'Carbon monoxide fully cleared from blood. Full oxygen capacity restored.', system: 'Cardiovascular', level: 'scientific', icon: '✨' },
    { hours: 24, title: 'Heart Rate Normal', body: 'Cardiovascular system stabilising after heavy smoke exposure.', system: 'Cardiovascular', level: 'scientific', icon: '❤️' },
    { hours: 48, title: 'Lung Cilia Active', body: 'Mucus clearing mechanisms reactivating. Productive cough is healing.', system: 'Lungs', level: 'scientific', icon: '🫁' },
    { hours: 60, title: 'Heavy Metal Processing', body: 'Liver and kidneys processing lead and cadmium from charcoal smoke.', system: 'Metabolic', level: 'scientific', icon: '🔬' },
  ],
  custom: [
    { hours: 1, title: 'First Hour Clean', body: 'The hardest urges often strike in the first hour. You are past the first wave.', system: 'Neurological', level: 'reported', icon: '⚡' },
    { hours: 6, title: 'Withdrawal Building', body: 'Your brain is adjusting to the absence of the habit. Discomfort is healing.', system: 'Neurological', level: 'reported', icon: '🧠' },
    { hours: 12, title: 'Half a Day', body: 'Twelve hours of commitment. Neural pathways beginning to weaken.', system: 'Cognitive', level: 'reported', icon: '💪' },
    { hours: 24, title: 'One Full Day', body: 'A complete day without the habit. Dopamine system beginning to recalibrate.', system: 'Neurological', level: 'scientific', icon: '🎯' },
    { hours: 36, title: 'Peak Discomfort', body: 'Many habits have a 36–72h peak withdrawal window. You are in it.', system: 'Mental Health', level: 'reported', icon: '📉' },
    { hours: 48, title: 'Two Days Strong', body: 'Physical withdrawal symptoms often begin easing after 48 hours.', system: 'Overall', level: 'reported', icon: '✨' },
    { hours: 60, title: 'Momentum Building', body: 'Each hour strengthens your new identity. The habit has less grip.', system: 'Behavioural', level: 'reported', icon: '🔥' },
  ],
};

function mergeHourlyTimelines() {
  if (!window.RECOVERY_TIMELINES || !window.HOURLY_72H) return;
  Object.keys(HOURLY_72H).forEach(type => {
    const existing = RECOVERY_TIMELINES[type] || [];
    const hourly = HOURLY_72H[type];
    const after72 = existing.filter(m => m.hours > 72);
    const merged = [...hourly, ...after72];
    const seen = new Set();
    RECOVERY_TIMELINES[type] = merged.filter(m => {
      const k = m.hours + m.title;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    }).sort((a, b) => a.hours - b.hours);
  });
}

window.HOURLY_72H = HOURLY_72H;
mergeHourlyTimelines();
