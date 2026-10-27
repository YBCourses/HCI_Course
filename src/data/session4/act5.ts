import { slide4 } from '../session4Helpers';
import type { Slide4 } from '../session4Types';

/** Session 4, act 5: Good requirements, slides 37-47, 45 min (see course/teacher/session4-plan.md). */
export const ACT_5_SLIDES: Slide4[] = [
  /* 37 · divider (1 min) */
  slide4(
    5,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 5,
      title: 'Good Requirements',
      question: 'How do we say what people need, without deciding how to build it?',
      learn: [
        'IN: the pains from your journey and your scenarios',
        'Need or solution, kinds of requirements, what makes one good',
        'OUT: a list of clear, testable, traceable requirements',
      ],
    },
    {
      t: 1,
      points: [
        'Act 4 ended with a journey: steps, feelings, one pain and one opportunity per step.',
        'Act 5 turns each pain into a requirement: a sentence that says what is needed.',
        'Thread: pain point, requirement, success measure, goal.',
      ],
      script:
        'You now have a journey with pains. Next we turn those pains into requirements. A requirement says what people need, not how we will build it. We will learn to write good ones, first with the bakery, then for your own persona.',
      tip: 'Short slide. Announce the act and move on. Nobody needs to answer anything.',
    },
  ),

  /* 38 · spotlight: from pain to requirement (3 min) */
  slide4(
    5,
    'concept_model',
    {
      kind: 'spotlight',
      heading: { title: 'From Pain to Requirement', subtitle: 'Say WHAT is needed, not HOW to build it' },
      statement: 'A requirement says what people need. The team decides later how to deliver it.',
      points: [
        { icon: 'alert', lead: 'Start from a pain', text: 'In our case: Salma cannot read the board from the oven.' },
        { icon: 'target', lead: 'Say what is needed', text: 'The next batch can be read from 3 metres.' },
        { icon: 'bulb', lead: 'Keep the how open', text: 'Screen, board, light? We choose later, with the user.' },
      ],
      takeaway: 'A pain is a problem. A requirement is the need behind it. A solution is one way to meet it.',
    },
    {
      t: 3,
      points: [
        'Fresh Batch first: note 2, Salma squints at the whiteboard from 4 metres and walks over to read it.',
        'Pain: cannot read the plan from the oven. Requirement: the next batch for each oven can be read from 3 metres.',
        'If we write "a big screen" we close the door on cheaper or better ideas, and we may have no budget (about 2,000 euros in our case).',
        'Teams: the broken interface is the starting point, and your journey pains are the input.',
      ],
      script:
        'Look at one pain from the bakery: Salma cannot read the board from the oven. What is needed? That she can read the next batch from where she stands, about three metres away. Notice we did not say screen, projector or paper. That choice comes later. A requirement keeps the door open to many solutions.',
      tip: 'Click the three points one at a time. After the first, pause 5 seconds of silent thinking: "what does Salma really need?" Then reveal the second. Nobody answers aloud.',
    },
  ),

  /* 39 · versus: need vs solution (3 min) */
  slide4(
    5,
    'comparison_think',
    {
      kind: 'versus',
      heading: { title: 'Need or Solution?', subtitle: 'Two ways to write the same idea' },
      leftLabel: 'Solution (the how)',
      rightLabel: 'Need (the what)',
      leftTone: 'warn',
      rightTone: 'good',
      rows: [
        { icon: 'pointer', left: 'Add a big screen', right: 'See the next batch from 3 m' },
        { icon: 'hand', left: 'Build a mobile app', right: 'Learn about a change within a minute' },
        { icon: 'zap', left: 'Use voice commands', right: 'Use it with floury or gloved hands' },
        { icon: 'users', left: 'Send everyone a message', right: 'Everyone sees a change at once' },
      ],
      takeaway: 'Test: ask "why?" or "what for?" until you reach what the person needs to get done.',
    },
    {
      t: 3,
      points: [
        'Each row is the same idea twice: the left is one way to build it, the right is what the user needs.',
        'Solutions are not bad ideas. They are answers, written too early and without a reason.',
        'The quick test: ask "what for?". A big screen, for what? To see the next batch from far away.',
      ],
      script:
        'Same idea, two ways to write it. On the left a solution: a big screen. On the right the need behind it: see the next batch from three metres. If you write the need, the team can find the best way. If you write the solution, you may build the wrong thing. Ask "what for?" and you reach the need.',
      tip: 'Start on the left side. For each row, pause 5 seconds of silent thinking ("what is the need behind this?"), then click the switch to reveal the right side. Do not ask anyone to answer aloud.',
    },
  ),

  /* 40 · custom NeedOrSolutionDemo (5 min) */
  slide4(
    5,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Need or Solution?',
        subtitle: 'Sort bakery statements, then rewrite the solutions',
        badge: { icon: 'flask', label: 'Demo', value: 'Lecturer-run' },
      },
      component: 'NeedOrSolutionDemo',
    },
    {
      t: 5,
      points: [
        'Statements come from the Fresh Batch case: "a big screen", "a mobile app", "voice commands", "a touchscreen" are solutions; "see the next batch from 3 m" is a need.',
        'For each solution, ask "what for?" and rewrite it as a need.',
        'Rewrites stay in plain words: who, what they need to get done, no technology named.',
        'Preparing practice 44, where teams do the same on paper.',
      ],
      script:
        'Here are statements about the bakery. For each one, think silently: is it a need or a solution? Then we will check it together. For every solution we ask what for, and we rewrite it as a need. A touchscreen, for what? For someone with floury hands? Then a touchscreen is the wrong answer, and the need is: use it without touching.',
      tip: 'Read each statement, then wait 5 seconds in silence so everyone decides privately. Click to reveal the verdict, then click the rewrite. Keep the tempo brisk: 5 minutes for the full list.',
    },
  ),

  /* 41 · flipcards: kinds of requirements (4 min) */
  slide4(
    5,
    'concept_model',
    {
      kind: 'flipcards',
      heading: { title: 'Kinds of Requirements', subtitle: 'Not only what it does: also how well and for whom' },
      cards: [
        {
          icon: 'check',
          term: 'What it must do',
          front: 'Functional: the actions and information people need',
          back: 'The things the idea must let people do or see. Each one is a task or a piece of information.',
          example: 'Every order change reaches all stations within 1 minute.',
        },
        {
          icon: 'gauge',
          term: 'How well',
          front: 'Quality: how easy, fast and safe it must feel',
          back: 'Usability, speed, reliability, safety. Quality is where "good enough" must be said in numbers.',
          example: 'Nothing important can be erased by accident.',
        },
        {
          icon: 'heart',
          term: 'For whom',
          front: 'Accessibility and language: who must be able to use it',
          back: 'Different abilities, languages and situations: noise, glasses, gloves. Accessibility is a requirement, not an extra.',
          example: 'Numbers and icons, not long sentences (Arabic and French).',
        },
        {
          icon: 'scale',
          term: 'Under which limits',
          front: 'Constraints: budget, time, rules, place, technology',
          back: 'Limits we cannot change. They shape every solution. Ethics and safety belong here too.',
          example: 'It still works when the network is weak near the ovens.',
        },
      ],
      takeaway: 'A full list mixes all four kinds. If one kind is missing, ask why.',
    },
    {
      t: 4,
      points: [
        'Four kinds, all from the Fresh Batch set: R2 (what it does), R3 (how well), R6 (for whom: language), R7 (under which limits: network).',
        'Quality includes usability and performance. Accessibility and language are requirements too, not decoration.',
        'Ethics are requirements: privacy, fairness, no pressure on people. We study them in Session 10.',
        'Teams: when you write five requirements, try to have at least three different kinds.',
      ],
      script:
        'Requirements come in four kinds. What it must do. How well it must do it. For whom: different abilities, languages, and situations. And under which limits: budget, time, network, rules. Notice that accessibility is a requirement, like any other, and so are safety and ethics. If the bakery list only had features, we would forget the gloves and the noise.',
      tip: 'Flip one card at a time. Before each flip, pause 5 seconds so the room can think of an example privately. After the fourth card, tell teams to keep these four kinds in mind for practice 46.',
    },
  ),

  /* 42 · checklist: what makes a requirement good (3 min) */
  slide4(
    5,
    'concept_model',
    {
      kind: 'checklist',
      heading: { title: 'What Makes a Requirement Good', subtitle: 'Five quick checks' },
      items: [
        { icon: 'list', title: 'Clear', text: 'One reading only. No "easy", "fast" or "nice" without a number.' },
        { icon: 'target', title: 'One thing', text: 'One need per sentence. If it has "and", split it in two.' },
        { icon: 'flask', title: 'Testable', text: 'We can say yes or no: a person, a time, a number.' },
        { icon: 'users', title: 'User-centred', text: 'About what the person needs, not how the system works inside.' },
        { icon: 'book', title: 'Backed by evidence', text: 'A note, a quote or a pain point from the study is behind it.' },
      ],
      footer: 'Bakery example: "The next batch for each oven can be read from 3 metres in 3 seconds."',
    },
    {
      t: 3,
      points: [
        'The five checks: clear, one thing, testable, user-centred, backed by evidence.',
        'Apply them to R1: clear (3 m, 3 s), one thing (reading the next batch), testable (6 of 8 staff read it correctly), user-centred (staff), evidence (note 2).',
        'Test words to avoid without a number: easy, fast, intuitive, modern, nice, user-friendly.',
        'The checks are used again in practice 46 and in studio (Act 6).',
      ],
      script:
        'Five checks for a good requirement. Clear: only one meaning. One thing: if you see "and", split it. Testable: we can say yes or no. User-centred: about the person, not about the machine. And backed by evidence: a note from your study stands behind it. Let us tick them one by one on the bakery requirement.',
      tip: 'Click to tick each check one by one. At each, pause 5 seconds for private thinking: "does R1 pass?". Tell teams to copy the five checks onto their paper for the next practice.',
    },
  ),

  /* 43 · custom RequirementTesterDemo (5 min) */
  slide4(
    5,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Make It Testable',
        subtitle: 'Turn vague words into something we can check',
        badge: { icon: 'flask', label: 'Demo', value: 'Lecturer-run' },
      },
      component: 'RequirementTesterDemo',
    },
    {
      t: 5,
      points: [
        'Vague wording from the bakery: "fast", "easy to read", "everyone is told", "works in the hall".',
        'Each becomes measurable: "fast" becomes "read from 3 m in 3 s"; "everyone is told" becomes "within 60 seconds, all stations".',
        'A good measure names who, what, how many and how long. In our case, 6 of 8 staff is the sample.',
        'The checks from slide 42 are used on every sentence.',
      ],
      script:
        'Here is a vague sentence from the bakery: "It must be easy to read." Think silently: how would you check that? You cannot. Now we add a person, a distance and a time: six of eight staff read it correctly from three metres in three seconds. Now we can test it and say yes or no.',
      tip: 'Show the vague wording and pause 5 seconds of silent thinking: "how would you check this?". Then click to reveal the measurable version. Repeat for each sentence. Do not ask anyone to propose a number aloud.',
    },
  ),

  /* 44 · activity: rewrite three solution statements (6 min) */
  slide4(
    5,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Solution to Need',
        subtitle: 'Rewrite three solutions as needs',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 6 min' },
      },
      label: 'Practice · Act 5',
      chip: 'TEAM OF TWO · 6 MINUTES',
      title: 'Rewrite 3 solutions as needs',
      steps: [
        { text: 'Take the three bakery statements: **“a big screen”**, **“a mobile app”**, **“voice commands”**.' },
        { text: 'For each one, ask **“what for?”** until you reach what the person needs. Write it as a **need**, with no technology in it.' },
        { text: 'Check each need with the five checks: **clear, one thing, testable, user-centred, evidence**. Add a number where you can.' },
      ],
      timerSeconds: 360,
      timerLabel: 'Practice Clock',
      goal: 'Learn to hear the need behind a solution, so the team stays free to find the best way to meet it.',
      output: 'Three needs written in plain words, each one with a way to check it.',
    },
    {
      t: 6,
      points: [
        'The three statements come from the Fresh Batch case. Possible answers: big screen becomes "see the next batch from 3 m"; mobile app becomes "learn about a change within a minute, wherever I stand"; voice commands becomes "use it with floury or gloved hands, in 80 dB noise".',
        'Several wordings are fine as long as there is no technology in the sentence.',
        'Teams that finish early: do the same with one solution statement from their own project.',
        'Teams keep the paper: it prepares practice 46.',
      ],
      script:
        'Six minutes with your partner. Take the three statements: a big screen, a mobile app, voice commands. Ask what for, again and again, until you reach what the person needs. Write it as a need with no technology in it. Then check it with the five checks and add a number if you can.',
      tip: 'Walk between tables and read over shoulders. Quiet hints only: "what for?", "can you check that?". Voice commands in 80 dB noise are a good hint for slow teams. Never ask a team to read aloud.',
    },
  ),

  /* 45 · spotlight: user story and acceptance (3 min) */
  slide4(
    5,
    'concept_model',
    {
      kind: 'spotlight',
      heading: { title: 'User Story and Acceptance', subtitle: 'A short sentence plus how we will know' },
      statement: 'As [who] I need [what] so that [why]. Then add: how will we know it works?',
      points: [
        { icon: 'users', lead: 'Who', text: 'A real person from your study, such as Salma, oven baker.' },
        { icon: 'target', lead: 'What, and why', text: 'Read the next batch from my oven, so I never bake the old quantity.' },
        { icon: 'check', lead: 'Acceptance', text: 'We know it works when 6 of 8 staff read it from 3 m in 3 s.' },
      ],
      takeaway: 'The story keeps the person and the reason. The acceptance makes it testable. Checked later with real users.',
    },
    {
      t: 3,
      points: [
        'The user story is one common way to write a requirement: As [who] I need [what] so that [why]. Written in words, no screens.',
        'Acceptance: the test that tells us the story is done. In our case: 6 of 8 staff read it correctly from 3 m within 3 s.',
        'Fresh Batch example: As Hassan, head baker, I need every order change to reach all stations, so that no oven bakes the old quantity. Acceptance: change seen by all in 60 seconds or less.',
        'Not every requirement must be a story (constraints are fine as plain sentences), but each needs a measure.',
        'Homework: requirements are later checked with real users (3 requirements, 2 people).',
      ],
      script:
        'A popular way to write a requirement is the user story. As who, I need what, so that why. For example: as Salma, I need to read the next batch from my oven, so that I never bake the old quantity. Then we add how we will know: six of eight staff read it from three metres in three seconds. Later, you will check these with real users. That is your homework.',
      tip: 'Click each point in order and pause 5 seconds after "Who" so teams think of their own persona privately. Do not ask anyone to say their story aloud. Mention that teams will write stories in practice 46.',
    },
  ),

  /* 46 · activity: five requirements (8 min) */
  slide4(
    5,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Your Requirements',
        subtitle: 'Five requirements from your journey pains',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 8 min' },
      },
      label: 'Practice · Act 5',
      chip: 'TEAM OF TWO · 8 MINUTES',
      title: 'Write 5 requirements for your persona',
      steps: [
        { text: 'Open your **journey** and take **5 pain points** of your persona. Next to each, write the **note** from your study that proves it.' },
        { text: 'For each pain, write one **requirement**: **“As [who] I need [what] so that [why]”**. Say the need, not the solution.' },
        { text: 'Under each, add **how we will know**: a number, a time, or a count of people. Aim for **at least 3 different kinds**: do, how well, for whom, limits.' },
      ],
      timerSeconds: 480,
      timerLabel: 'Practice Clock',
      goal: 'Turn the pains you found into clear, testable needs for your own persona, each one tied to evidence.',
      output: 'Five written requirements, each with its pain point, its evidence note and how you will know.',
    },
    {
      t: 8,
      points: [
        'Each team uses its OWN persona and journey from Acts 2 and 4, and its Session 3 User Study Report as evidence. The broken interface stays untouched. Everything is in words on paper.',
        'Each requirement keeps a link to its pain and note: this is used in the traceability demo (slide 47) and in studio.',
        'Check the five checks, accessibility and language count as requirements: ask teams "who might not be able to use it?".',
        'Requirements stay as drafts: they are fixed in studio and checked with real people in the homework.',
      ],
      script:
        'Eight minutes with your partner. Take five pain points from your journey. For each one, find the note that proves it. Then write one requirement: as who, I need what, so that why. Say the need, not the solution. Under each one, write how we will know it works: a number, a time, a count. Try to cover different kinds, including accessibility.',
      tip: 'Walk between tables and read over shoulders. Quiet prompts: "what for?", "how will you test it?", "which note proves it?". Watch for hidden solutions (app, screen, button) and for "fast" or "easy". Never ask a team to read aloud.',
    },
  ),

  /* 47 · custom TraceabilityDemo (4 min) */
  slide4(
    5,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Follow the Thread',
        subtitle: 'Pain, requirement, measure, goal: spot the orphan',
        badge: { icon: 'route', label: 'Demo', value: 'Lecturer-run' },
      },
      component: 'TraceabilityDemo',
    },
    {
      t: 4,
      points: [
        'Traceability in plain words: every requirement can be followed back to a pain and forward to a measure and a goal.',
        'Fresh Batch example: pain "changes get lost" (notes 3, 4, 6), requirements R2 and R3, measures "<= 60 s" and "zero lost lines", business goal "late deliveries at most 1 a month".',
        'The orphan: R11 (sales charts). No pain, no evidence: the anti-persona wanted it. It is a candidate for "won\'t" in Act 6.',
        'Teams: check each of your five requirements for a pain behind it and a measure.',
      ],
      script:
        'Every good requirement has a thread. Back to a pain you saw in your study. Forward to a measure. And up to a goal. Follow the thread for the bakery: changes get lost, so we need R2 and R3, which we measure in seconds and lost lines, and which serve fewer late deliveries. Now look for the one with no thread. That one is the orphan, and we should ask why we want it.',
      tip: 'Let the thread draw one link at a time. Before revealing the orphan, pause 5 seconds of silent thinking: "which requirement has no pain behind it?". Then click. After the demo, tell teams to check their own five requirements the same way. They will do so in studio.',
    },
  ),
];
