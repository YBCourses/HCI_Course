import { slide4 } from '../session4Helpers';
import type { Slide4 } from '../session4Types';

/**
 * Session 4, act 6: priorities, value and studio (see course/teacher/session4-plan.md).
 * Minutes: 1 + 3 + 6 + 3 + 4 + 5 + 3 + 2 + 8 + 8 + 8 + 4 + 3 + 1 + 1 = 60.
 */
export const ACT_6_SLIDES: Slide4[] = [
  // 48 · divider (1)
  slide4(
    6,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 6,
      title: 'Priorities, Value and Studio',
      question: 'You cannot build everything: what comes first?',
      learn: [
        'IN: your testable requirements. Choose what comes first: must, should, could, won\'t',
        'Measure success, write a value sentence, then build your Requirements Pack',
        'OUT: the Requirements Pack (Milestone 3) that feeds Session 5',
      ],
    },
    {
      t: 1,
      points: [
        'Last part of Session 4: choose, measure, promise, then build the pack in a studio.',
        'IN: the requirements written in Act 5. OUT: the Requirements Pack, the input of Session 5.',
      ],
      script:
        'Last part of today. You now have requirements. But a team never has the time or money to build all of them. So first we choose. Then we decide how we will know it worked. Then you build your own pack, with your partner, at your table.',
      tip: 'Say that the studio in this act is in teams of two at their own tables and nobody presents. Pause 3 seconds, then move on.',
    },
  ),

  // 49 · spotlight (3)
  slide4(
    6,
    'concept_model',
    {
      kind: 'spotlight',
      heading: { title: 'We Cannot Build Everything', subtitle: 'Choose with evidence and cost' },
      statement: 'Every yes is also a no to something else.',
      points: [
        { icon: 'scale', lead: 'Time and money are limited', text: 'Fresh Batch has about 2,000 euros and 3 months in our case.' },
        { icon: 'users', lead: 'Evidence says what matters', text: 'A pain seen in many notes comes before a single wish.' },
        { icon: 'gauge', lead: 'Cost says what fits', text: 'Rate each requirement: how much it helps, how much it costs.' },
      ],
      takeaway: 'Priority = how much it helps users, weighed against what it costs.',
    },
    {
      t: 3,
      points: [
        'Fresh Batch example first: 12 requirements, a budget of about 2,000 euros and a go-live in 3 months (numbers in our case).',
        'Two questions decide the order: how strongly does the evidence from users support it, and what does it cost? A wish nobody asked for comes last.',
        'Teams of two will do the same with their own requirements in the studio, on paper.',
      ],
      script:
        'Imagine the bakery has twelve requirements and only two thousand euros. You cannot do all twelve. So how do you choose? Do not choose by who shouts loudest, or by what sounds exciting. Choose with evidence, what users really struggled with, and with cost. Think about it silently for a moment: which requirements would you protect first?',
      tip: 'Show the statement and pause 5 seconds in silence. Then click each point one at a time. Students answer the last question privately on paper, then compare with their partner. Nobody answers aloud.',
    },
  ),

  // 50 · custom PrioritizerDemo (6)
  slide4(
    6,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Spend a 2,000 Euro Budget',
        subtitle: 'Twelve requirements, four boxes, one budget bar',
        badge: { icon: 'scale', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'PrioritizerDemo',
    },
    {
      t: 6,
      points: [
        'Twelve Fresh Batch requirements (R1 to R12) with a rating and a cost in euros (in our case). Four boxes: Must, Should, Could, Won\'t (not now).',
        'The five Musts (R1 to R5) cost 1,300 euros. As the Shoulds are added the budget bar overflows, so some Shoulds must wait: that is the trade-off.',
        'R11 (sales charts) and R12 (weather) are Won\'t: the wish of the anti-persona and no evidence from users.',
      ],
      script:
        'Here are the twelve requirements of Fresh Batch, each with a cost. Before I place a card, think silently: Must, Should, Could or Won\'t? Now I place the next card and show the reason. Watch the budget bar. The five Musts take thirteen hundred euros. When we add the Shoulds, the bar overflows. We cannot have everything, so something waits. Notice that a Won\'t is not forever: it is not now.',
      tip: 'Click "Place next" once per card. Before each click, pause 5 seconds so everyone decides silently on paper. Do the Musts quickly, then slow down on the Shoulds when the bar overflows. Use Reset only at the end if time allows. Nobody answers aloud.',
    },
  ),

  // 51 · flipcards (3)
  slide4(
    6,
    'concept_model',
    {
      kind: 'flipcards',
      heading: { title: 'Must, Should, Could, Won\'t', subtitle: 'MoSCoW: four boxes for every requirement' },
      cards: [
        {
          icon: 'alert',
          term: 'Must',
          front: 'Without it, the product fails its main job.',
          back: 'Essential. If it is missing, users cannot do their key task or the product is unsafe. Keep the Musts few and fund them first.',
          example: 'Changes reach everyone within 1 minute.',
        },
        {
          icon: 'flag',
          term: 'Should',
          front: 'Important, but a workaround exists.',
          back: 'Valuable and wanted soon. People can manage without it for a while. It goes in the plan if time and money allow.',
          example: 'Works when the network is weak.',
        },
        {
          icon: 'bulb',
          term: 'Could',
          front: 'Nice to have if there is room left.',
          back: 'Adds comfort but little harm if missing. It is the first thing dropped when time or money runs short.',
          example: 'A record of the night for the next shift.',
        },
        {
          icon: 'hourglass',
          term: 'Won\'t (not now)',
          front: 'Agreed to leave out for now.',
          back: 'Not in this version, and everybody knows it. Writing it down avoids silent promises. It can come back later.',
          example: 'Sales charts: no evidence from users.',
        },
      ],
      takeaway: 'MoSCoW: Must, Should, Could, Won\'t. A shared way to say what comes first.',
    },
    {
      t: 3,
      points: [
        'MoSCoW is a common method to sort requirements into Must, Should, Could and Won\'t (have this time). The lowercase o\'s only make the word readable.',
        'Test for a Must: if it is missing, does the product fail its main job? If people can work around it, it is a Should.',
        'Won\'t does not mean never: it is a decision for this version, written down. Rule of thumb: keep Musts to the few that really cannot be dropped.',
      ],
      script:
        'Four boxes. Must: without it the product fails. Should: important, but people can manage for a while. Could: nice to have, first to go when money runs out. Won\'t: we agree to leave it for now. Look at each card and think of a bakery example before I turn it.',
      tip: 'Show the four fronts and pause 5 seconds so students predict silently. Then flip the cards one at a time, left to right, reading the example. Students note on paper which box their own favourite requirement belongs in. Nothing is said aloud.',
    },
  ),

  // 52 · tiles (4)
  slide4(
    6,
    'concept_model',
    {
      kind: 'tiles',
      heading: { title: 'How Do We Know It Worked?', subtitle: 'Success measures: effective, efficient, satisfying' },
      tiles: [
        {
          icon: 'target',
          name: 'Effective',
          tells: 'Can people reach their goal, correctly?',
          when: 'In our case: 6 of 8 read the next batch from 3 m in 3 s',
          tag: 'Effectiveness',
        },
        {
          icon: 'timer',
          name: 'Efficient',
          tells: 'How much time and effort does it take?',
          when: 'In our case: plan entry under 3 minutes (today 8)',
          tag: 'Efficiency',
        },
        {
          icon: 'heart',
          name: 'Satisfying',
          tells: 'Do people find it comfortable and trust it?',
          when: 'In our case: 8 of 8 understand every label without help',
          tag: 'Satisfaction',
        },
        {
          icon: 'chart',
          name: 'Business result',
          tells: 'Does the goal of the owner move?',
          when: 'In our case: waste 6% to 3%, late deliveries 3 to 1 a month',
          tag: 'Goal',
        },
      ],
      takeaway: 'A measure has a number and a way to check it. Every Must gets one.',
    },
    {
      t: 4,
      points: [
        'ISO 9241-11 defines usability as how effectively, efficiently and satisfactorily specified users reach specified goals in a specified context. We take its three words as three kinds of success measure (link back to Session 1).',
        'Fresh Batch examples (in our case): R1 is effectiveness (6 of 8 read it correctly), R8 is efficiency (plan entry under 3 minutes, today 8), R6 is satisfaction (8 of 8 understand labels without help). The fourth tile links to the owner\'s goals: waste from 6% to 3%, late deliveries from 3 a month to at most 1.',
        'A good measure has a number, a method to check it, and a threshold that says done. Rule: every Must gets one.',
      ],
      script:
        'How will we know a requirement is met? Three questions, from the usability definition we met in session one. Effective: do people get it right? Efficient: how much time or effort? Satisfying: is it comfortable, do they trust it? In our bakery case, six of eight people read the next batch from three metres in three seconds. Plan entry takes under three minutes instead of eight. All eight understand the labels. And the owner cares about waste and late deliveries.',
      tip: 'Click the tiles from left to right. At each tile, pause 5 seconds and let students privately guess one possible number for their own project. They write it on paper. After the last tile, ask them silently to name one Must from their project and its number.',
    },
  ),

  // 53 · custom ValuePropDemo (5)
  slide4(
    6,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: The Value Sentence',
        subtitle: 'One promise to one specific person',
        badge: { icon: 'bulb', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'ValuePropDemo',
    },
    {
      t: 5,
      points: [
        'A value sentence: "For [who] who [need], [name] is [what] that [benefit], unlike [today]." The Fresh Batch pieces fill in one at a time.',
        'Weak versus strong: "a great app for bakeries" promises nothing to anybody; the evidence-based sentence names the user, the need and the difference from today.',
        'Three-tick check: names the user, names the need, says what is different from today.',
      ],
      script:
        'A value sentence is one promise to one specific person. Watch it appear piece by piece: for night-shift bakery staff who must get every van out at six, Fresh Batch Board is a shared plan that can be read from across the hall and updates for everyone at once, unlike the whiteboard and shouting, where changes get lost. Compare it with a weak one: a great app for bakeries. Which one could you test?',
      tip: 'Click "Next" to add one piece at a time and pause 5 seconds before each reveal so students try to guess the piece silently. Then show the weak versus strong comparison and the three ticks. Students write their own sentence draft on paper; no sharing aloud.',
    },
  ),

  // 54 · custom ProcessMapEnd (3)
  slide4(
    6,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'You Are Here: End of Session 4',
        subtitle: 'What Session 5 takes from your pack',
        badge: { icon: 'route', label: 'Process map', value: 'Lecturer-run' },
      },
      component: 'ProcessMapEnd',
    },
    {
      t: 3,
      points: [
        'The map shows the whole process: Session 4 ends with personas, journeys and prioritised requirements.',
        'Session 5 takes the Requirements Pack and turns it into structure: how content is organised, named and found.',
        'Link to the studio: the pack is not homework paperwork, it is the input of the next stage. Without it, Session 5 has nothing to organise.',
      ],
      script:
        'Let us look at the map again. We started with an idea, studied humans, then our users. Today we turned that into the need. The Requirements Pack is what comes out of this stage and what goes into the next. In session five, it tells you what the structure must support. So your pack matters. Now you build it.',
      tip: 'Click through the stages: first the ones already done, then the "you are here" marker, then the arrow toward Session 5. Pause 5 seconds, then say the studio starts now. No questions to the room.',
    },
  ),

  // 55 · activity: studio rules (2)
  slide4(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio: Your Requirements Pack',
        subtitle: 'Four steps, all inside your team of two',
        badge: { icon: 'clock', label: 'Studio', value: '4 steps · 28 min' },
      },
      label: 'Studio · Rules',
      chip: 'TEAMS OF TWO · FOUR STEPS',
      title: 'Your pack in four steps',
      steps: [
        { text: '**Step 1 (8 min):** finish your **persona** and your **journey summary**.' },
        { text: '**Step 2 (8 min):** write your **requirements**: a need, not a solution, and testable.' },
        { text: '**Step 3 (8 min):** sort **must / should / could / won\'t**, then add a **success measure** to every must.' },
        { text: '**Step 4 (4 min):** run the **traceability check** and write your **value sentence**.' },
      ],
      timerSeconds: 120,
      timerLabel: 'Read the rules',
      goal: 'Turn your user study into a pack you can design from.',
      output: 'Your Requirements Pack: persona, journey summary, requirements, priorities, a measure for every must, traceability check and value sentence.',
    },
    {
      t: 2,
      points: [
        'The pack has seven parts: persona, journey summary, requirements (need not solution, testable), priorities (must / should / could / won\'t), a success measure for every Must, a traceability check, a value sentence.',
        'Steps: 8, 8, 8 and 4 minutes. Everything is words on paper or a shared text file: no screens, no drawings of interfaces.',
        'Work on your own project: the broken interface is the starting point and the User Study Report from Session 3 is the input. Use the Fresh Batch example only as a model.',
      ],
      script:
        'Now you build your pack for your own project. Four steps. One: finish your persona and journey summary. Two: write your requirements, each one a need, not a solution, and testable. Three: sort them into must, should, could and won\'t, and give every must a success measure. Four: check that every requirement traces back to a pain point, and write your value sentence. Words only, no screens. Your study report is your source.',
      tip: 'Stay silent for 2 minutes while they read. Then start the clock for step 1. Nobody presents; you walk around and answer quietly at tables. Keep Fresh Batch slides ready if a team needs a model.',
    },
  ),

  // 56 · step 1 (8)
  slide4(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 1: Persona and Journey',
        subtitle: 'Get your two foundations ready',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 1 · 8 min' },
      },
      label: 'Studio · Step 1 of 4',
      chip: 'TEAMS OF TWO · 8 MINUTES',
      title: 'Finish your persona and journey summary',
      steps: [
        { text: 'Take your **persona card** from Act 2. Tick that every line has a **note** that supports it.' },
        { text: 'Write a **journey summary**: 5 to 7 steps in one line each, with the **worst moment** circled.' },
        { text: 'Add the **goal** and the **biggest constraint** of your persona at the top.' },
      ],
      timerSeconds: 480,
      timerLabel: 'Step 1 Clock',
      goal: 'Have one person and one story that your requirements will come from.',
      output: 'A checked persona card and a one-page journey summary with the worst moment marked.',
    },
    {
      t: 8,
      points: [
        'Fresh Batch model: Hassan (primary persona) and his night: Prepare, Plan, Bake, Change, Pack, Load, Handover. The worst moment is the Change at 03:30 (feeling 1).',
        'Teams reuse what they made in Acts 2, 3 and 4: persona card, goals and constraints sheet, journey map. This step tidies and summarises; it is not new research.',
        'Every persona line must point to a note from the team\'s own User Study Report; lines without evidence are marked as guesses.',
      ],
      script:
        'Step one. Take your persona card and check that every line has a note behind it. Then summarise your journey in five to seven short lines and circle the worst moment, the way we circled the change at three thirty for Hassan. Add the goal and the biggest constraint. You have eight minutes. Write it, then compare with your partner.',
      tip: 'Start the clock. Walk the room quietly and read over shoulders. Gently point out persona lines with no supporting note and journeys with more than 7 steps. Announce 2 minutes left, then the end.',
    },
  ),

  // 57 · step 2 (8)
  slide4(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 2: Your Requirements',
        subtitle: 'Write them, then fix them',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 2 · 8 min' },
      },
      label: 'Studio · Step 2 of 4',
      chip: 'TEAMS OF TWO · 8 MINUTES',
      title: 'Write and fix your requirements',
      steps: [
        { text: 'For each **pain point** of your journey, write a **requirement** that says what is needed.' },
        { text: 'Check each one: **a need, not a solution** (no "add a button") and **one thing only**.' },
        { text: 'Make it **testable**: add a number, a time or a distance that someone could check.' },
      ],
      timerSeconds: 480,
      timerLabel: 'Step 2 Clock',
      goal: 'Say clearly what your users need, in a way you can check later.',
      output: 'A numbered list of 6 to 10 requirements, each a need, testable, tied to a pain point.',
    },
    {
      t: 8,
      points: [
        'Fresh Batch model: "A big screen" becomes "The next batch can be read from 3 metres in 3 seconds" (R1). Pain: note 2.',
        'Quick test for a solution: if it names a thing to build (screen, app, button, voice), rewrite it as what the user needs to do or see.',
        'Teams reuse the five requirements from Act 5 and add more from the remaining pain points. A requirement with no number is not finished yet.',
      ],
      script:
        'Step two. Go through the pain points of your journey and write a requirement for each one. Say what is needed, not what to build. One thing per requirement. Then make it testable: add a number, a time, a distance. Not fast, but readable from three metres in three seconds. You have eight minutes.',
      tip: 'Start the clock. Look for requirements that name a technology or contain "and" twice. Ask the pair quietly: could a stranger check this? At 2 minutes left, remind them to give each requirement a number (R1, R2...).',
    },
  ),

  // 58 · step 3 (8)
  slide4(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 3: Priorities and Measures',
        subtitle: 'Choose what comes first, define success',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 3 · 8 min' },
      },
      label: 'Studio · Step 3 of 4',
      chip: 'TEAMS OF TWO · 8 MINUTES',
      title: 'Prioritise and measure',
      steps: [
        { text: 'Mark each requirement **Must**, **Should**, **Could** or **Won\'t (not now)**. Keep the **Musts few**.' },
        { text: 'Write the **reason** next to each choice: evidence from your study, and rough cost.' },
        { text: 'Give every **Must** a **success measure**: effective, efficient or satisfying, with a number.' },
      ],
      timerSeconds: 480,
      timerLabel: 'Step 3 Clock',
      goal: 'Decide what to protect first and know how you will check it.',
      output: 'Every requirement marked Must / Should / Could / Won\'t, with a reason, and a measure for each Must.',
    },
    {
      t: 8,
      points: [
        'Fresh Batch model: R1 to R5 are Musts (1,300 euros in our case). Each has a measure, for example R2 "from change to seen by all within 60 seconds".',
        'Test for a Must: if it is missing, does the product fail its main job? If people can work around it, it is a Should. A wish with no evidence is a Won\'t.',
        'A measure has a number and a way to check: who, how many, how long, how far. Use effective, efficient or satisfying as a starting point (ISO 9241-11).',
      ],
      script:
        'Step three. Sort your requirements into must, should, could and won\'t. Write your reason: what did you see in your study and what might it cost? Keep the musts few. Then give every must a success measure with a number: how many people, how fast, how often. You have eight minutes. Decide alone first, then compare with your partner.',
      tip: 'Start the clock. If a team has more than 5 Musts, ask quietly which one could be a Should. If a Must has no number, ask: how will you know it worked? Remind that Won\'t is a decision, not a failure. Announce 2 minutes left.',
    },
  ),

  // 59 · step 4 (4)
  slide4(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 4: Check and Promise',
        subtitle: 'Trace every line, then write one sentence',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 4 · 4 min' },
      },
      label: 'Studio · Step 4 of 4',
      chip: 'TEAMS OF TWO · 4 MINUTES',
      title: 'Check traceability and write your value',
      steps: [
        { text: 'For each requirement, draw a line back to a **pain point** and a **note** in your study. No line? **Cut it or find the evidence.**' },
        { text: 'Check forward: each **Must** has a **measure** linked to a **goal** of your persona or business.' },
        { text: 'Write your **value sentence**: **For** [who] **who** [need], [name] **is** [what] **that** [benefit], **unlike** [today].' },
      ],
      timerSeconds: 240,
      timerLabel: 'Step 4 Clock',
      goal: 'Be sure nothing is invented and say your promise in one sentence.',
      output: 'A traceability check with orphans removed, and one value sentence.',
    },
    {
      t: 4,
      points: [
        'Fresh Batch model: pain "changes get lost" (notes 3, 4, 6) leads to R2 and R3, then to the measures "within 60 seconds" and "zero lost order lines", then to the business goal "late deliveries at most 1 a month". R11 (sales charts) is the orphan: no pain point behind it.',
        'An orphan requirement has no evidence behind it. Cut it, mark it Won\'t, or go back and look for the evidence.',
        'The value sentence names the user, names the need and says what is different from today. Use the Fresh Batch sentence as a model.',
      ],
      script:
        'Last step. Check every requirement. Can you draw a line back to a pain point and a real note? If not, it is an orphan: cut it or find evidence. Check forward too: each must has a measure and serves a goal. Then write your value sentence: for who, who needs what, your name is what, that does what, unlike today. Four minutes.',
      tip: 'Start the clock. Keep it moving: only 4 minutes. In the last minute, remind teams to save the pack in one file both partners can open. Remind that the pack will be finished and checked with real people as homework. Nobody presents.',
    },
  ),

  // 60 · tiles: homework (3)
  slide4(
    6,
    'concept_model',
    {
      kind: 'tiles',
      heading: {
        title: 'Homework: Requirements Pack',
        subtitle: 'Milestone 3: five parts, words and paper only',
        badge: { icon: 'flag', label: 'Due', value: 'Before Session 5' },
      },
      tiles: [
        { icon: 'users', name: 'Persona', tells: 'One primary person, built from your evidence.', when: 'Every line backed by a note from your study.', tag: 'Part 1' },
        { icon: 'route', name: 'Journey', tells: 'Their steps over time, with the worst moment.', when: '5 to 7 steps, a feeling, one pain, one opportunity.', tag: 'Part 2' },
        { icon: 'list', name: 'Requirements', tells: 'What is needed, not how to build it.', when: 'Each one testable and linked to a pain point.', tag: 'Part 3' },
        { icon: 'scale', name: 'Priorities, measures', tells: 'Must, should, could, won\'t; a measure per must.', when: 'With a reason and a number for every must.', tag: 'Part 4' },
        { icon: 'bulb', name: 'Value sentence', tells: 'One promise to one specific person.', when: 'Names the user, the need and what is different.', tag: 'Part 5' },
        { icon: 'check', name: 'Check with people', tells: 'Test 3 requirements with 2 real people.', when: 'Outside class: anonymous notes, ask consent first.', tag: 'Also' },
      ],
      takeaway: 'One pack per team of two, due before Session 5. Words and paper only, no screens.',
    },
    {
      t: 3,
      points: [
        'Deliverable: Milestone 3, the Requirements Pack, one per team of two, due before Session 5. Five parts: persona, journey, requirements, priorities and measures, value sentence.',
        'Also: read 3 of your requirements to 2 real people outside class (not experts, not close friends). Ask: is this true for you? Is something missing? Keep it anonymous and ask consent first; people may stop at any time.',
        'Words and paper only: no screens, wireframes or interface drawings. Fix ideas are written as needs, not solutions.',
        'The pack is the input of Session 5, where it becomes content structure.',
      ],
      script:
        'Your homework is Milestone 3: the Requirements Pack, in five parts. Persona, journey, requirements, priorities with measures, and your value sentence. Also, check three of your requirements with two real people outside class. Always ask permission and keep it anonymous. Words and paper only, no screens. It is due before session five.',
      tip: 'Click the six tiles one at a time, from Part 1 to the check, reading the short line of each. Pause 5 seconds after the last tile for silent note-taking. Confirm the template and the consent text are on the course portal. Take written questions at the lectern afterwards, not in front of the room.',
    },
  ),

  // 61 · spotlight: three ideas (1)
  slide4(
    6,
    'summary_takeaway',
    {
      kind: 'spotlight',
      heading: { title: 'Three Ideas to Remember', subtitle: 'From evidence to a clear need' },
      statement: 'Personas show who, requirements show what, priorities show first.',
      points: [
        { icon: 'users', lead: 'Evidence first', text: 'Personas and journeys come from notes, not from guesses.' },
        { icon: 'target', lead: 'Need, not solution', text: 'A good requirement says what is needed and can be tested.' },
        { icon: 'scale', lead: 'Choose and measure', text: 'Must, should, could, won\'t; a number for every must.' },
      ],
      takeaway: 'Your Requirements Pack is the hand-off to Session 5.',
    },
    {
      t: 1,
      points: [
        'Idea 1: personas and journeys built from evidence (Acts 2 to 4). Idea 2: requirements that are needs and testable (Act 5). Idea 3: priorities and measures (Act 6).',
        'Students can write each idea in their own notes.',
      ],
      script:
        'Three sentences to keep. Build personas and journeys from evidence, not guesses. Write needs, not solutions, and make them testable. Choose what comes first, and give every must a number.',
      tip: 'Show the statement and pause 5 seconds. Then click to reveal the three points one at a time. Students copy each idea silently; no repeating aloud.',
    },
  ),

  // 62 · teaser (1)
  slide4(
    6,
    'preview_next',
    {
      kind: 'teaser',
      label: 'Conclusion & Next Class',
      icon: 'layers',
      kicker: 'Previewing Session 5 · Next Class',
      title: 'Structure',
      subtitle: 'Card Sorting · Navigation · Labels · Wayfinding',
      blurb:
        'Your requirements become structure: how people expect things to be organised, named and found.',
      thanks: 'Thank you for Session 4 · Questions & Discussion Open at Lectern',
    },
    {
      t: 1,
      points: [
        'Session 5: Structure and Mental Models (card sorting, navigation, labels, wayfinding).',
        'The Requirements Pack is the raw material: the needs and priorities decide what has to be organised and found.',
        'Reminder: Milestone 3, the Requirements Pack, is due before Session 5.',
      ],
      script:
        'Today you turned what you learned about real people into clear, prioritised needs. Next time we organise them: how people expect things to be grouped, named and found. See you then.',
      tip: 'Stay for questions at the lectern; teams with doubts about their pack should come to you now.',
    },
  ),
];
