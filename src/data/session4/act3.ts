import { slide4 } from '../session4Helpers';
import type { Slide4 } from '../session4Types';

/**
 * Session 4, act 3: GOALS, CONSTRAINTS AND FEELINGS (slides 20-27, 35 minutes).
 * Minutes: 1 + 3 + 5 + 3 + 5 + 8 + 3 + 7 = 35.
 * See course/teacher/session4-plan.md. Case: course/teacher/session4-case.md (Fresh Batch).
 */
export const ACT_3_SLIDES: Slide4[] = [
  /* 20 · divider (1 min) */
  slide4(
    3,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 3,
      title: 'Goals, Constraints and Feelings',
      question: 'What do people want, what limits us, and how does it feel to be them?',
      learn: [
        'IN: your persona cards from Act 2 (a person built from evidence)',
        'Goals, constraints, needs and wishes: how to tell them apart',
        'OUT: a goals and constraints sheet and an empathy map for your persona',
      ],
    },
    {
      t: 1,
      points: [
        'Act 2 gave us a persona card. Act 3 adds what that person wants, what limits the project, and what the person feels.',
        'Thread: persona in, then goals, constraints and an empathy map out.',
        'Fresh Batch first (lecturer-run), then each team of two works on its own project.',
      ],
      script:
        'You now have a persona card. Now we ask three things. What does this person want to get done? What limits us? And how does it feel to be them? We start with the bakery, then you do the same for your own project.',
      tip: 'Short slide. Announce the act and move on. Nobody needs to answer anything.',
    },
  ),

  /* 21 · tiles: who wants what (3 min) */
  slide4(
    3,
    'concept_model',
    {
      kind: 'tiles',
      heading: {
        title: 'Who Wants What?',
        subtitle: 'Users, the business and others all want something',
        badge: { icon: 'target', label: 'Goals', value: '3 kinds' },
      },
      tiles: [
        {
          icon: 'users',
          name: 'User goals',
          tells: 'What the person is trying to get done',
          when: 'Hassan: “Get the right quantity baked on time.”',
          tag: 'People',
        },
        {
          icon: 'chart',
          name: 'Business goals',
          tells: 'What the organisation wants to reach',
          when: 'Waste from 6% to 3%. Late deliveries from 3 a month to 1.',
          tag: 'Business',
        },
        {
          icon: 'landmark',
          name: 'Other stakeholders',
          tells: 'Others who care or are affected, not users',
          when: 'The owner pays. Nadia takes the shop orders by phone.',
          tag: 'Others',
        },
      ],
      takeaway: 'A good design serves the user goal first, and still has to fit the business goal.',
    },
    {
      t: 3,
      points: [
        'A goal is a result someone wants. User goals describe the task from the person’s side; business goals describe what the organisation wants to reach (in our case, waste down from 6% to 3%).',
        'A stakeholder is anyone with an interest in the project: the owner who pays, the order manager, the shops. They are not always users.',
        'When goals pull in different directions, we write them all down. We do not decide yet: decisions come with priorities in Act 6.',
      ],
      script:
        'Three kinds of wants. First the user: Hassan wants the right quantity baked on time. Second the business: the bakery wants waste down from 6 percent to 3. Third the others: the owner who pays, and Nadia on the phone. Everyone wants something. Our job is to see all of them clearly.',
      tip: 'Click the tiles one at a time, in order. Before each click give 5 seconds of silent thinking (“what would this person want?”). Then read the bakery example. No one answers aloud. In their own project, teams will find all three kinds at their table later.',
    },
  ),

  /* 22 · custom GoalsConstraintsDemo (5 min) */
  slide4(
    3,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Need, Goal, Constraint or Wish?',
        subtitle: 'Sort each bakery statement on paper first',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer runs it' },
      },
      component: 'GoalsConstraintsDemo',
    },
    {
      t: 5,
      points: [
        'Each bakery statement is sorted privately on paper (or on a student’s own device) into need, goal, constraint or wish before the lecturer reveals the answer.',
        'Need: what users need, no solution. Goal: a result someone wants. Constraint: a limit we must live with. Wish: nice, but not needed.',
        'Mixed-up statements are normal: “a big screen” is a solution, not a need. We fix those in Act 5.',
      ],
      script:
        'I will show a statement from the bakery. Write on paper if it is a need, a goal, a constraint or a wish. Do not say it aloud. Then I will reveal the answer. Compare with your partner, quietly.',
      tip: 'Leave about 10 seconds of silence per statement before the reveal. Click the reveal yourself. Let teams compare quietly at the table; never ask anyone to share their answer with the room. If the demo has a tip line, read it after the last statement.',
    },
  ),

  /* 23 · tiles: kinds of constraints (3 min) */
  slide4(
    3,
    'concept_model',
    {
      kind: 'tiles',
      heading: {
        title: 'Six Kinds of Constraints',
        subtitle: 'Limits we cannot change, only design around',
        badge: { icon: 'alert', label: 'Limits', value: '6 kinds' },
      },
      tiles: [
        {
          icon: 'users',
          name: 'People',
          tells: 'Skills, habits, hands, comfort with technology',
          when: 'Hands are floury or gloved; some staff dislike technology.',
          tag: 'Who',
        },
        {
          icon: 'compass',
          name: 'Place',
          tells: 'Where it is used: noise, light, dust, distance',
          when: 'The hall is 80 dB, hot, dusty; people stand 2 to 4 m away.',
          tag: 'Where',
        },
        {
          icon: 'clock',
          name: 'Time',
          tells: 'Deadlines and the pace of the work',
          when: 'Vans leave at 06:00. Shops can change orders until 03:30.',
          tag: 'When',
        },
        {
          icon: 'book',
          name: 'Rules',
          tells: 'Laws, safety and hygiene rules, policies',
          when: 'Dirty hands cannot touch shared surfaces; no distractions.',
          tag: 'Must',
        },
        {
          icon: 'server',
          name: 'Technology',
          tells: 'What equipment and networks allow',
          when: 'The network is weak near the ovens; screens must wipe clean.',
          tag: 'How',
        },
        {
          icon: 'scale',
          name: 'Money',
          tells: 'Budget for building and running it',
          when: 'About 2,000 euros for the whole tool, live in 3 months.',
          tag: 'Cost',
        },
      ],
      takeaway: 'A constraint is a limit, not a wish. It does not say what to build, it says what the answer must survive.',
    },
    {
      t: 3,
      points: [
        'A constraint is a limit we cannot change in this project. Six common families help us find them: people, place, time, rules, technology and money.',
        'In our case (illustrative numbers): about 80 dB noise, 40 degrees near the ovens, 2,000 euros, 3 months.',
        'Constraints are useful, not bad: they cut the list of possible answers early and keep us honest.',
      ],
      script:
        'Constraints are the limits we must live with. Think of six families: people, place, time, rules, technology and money. In the bakery: floury hands, a loud hot hall, a 06:00 deadline, hygiene rules, weak network, a small budget. Each one already rules out some ideas, before we draw anything.',
      tip: 'Click the six tiles in order. After each click, give 5 seconds of silent thinking (“which idea does this rule out?”) before moving on. Do not ask for answers aloud. Remind teams that their own project has its own six, which they will write later.',
    },
  ),

  /* 24 · custom EmpathyMapDemo (5 min) */
  slide4(
    3,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Hassan at 03:30',
        subtitle: 'Says, thinks, does, feels: and the gap between them',
        badge: { icon: 'heart', label: 'Live demo', value: 'Lecturer runs it' },
      },
      component: 'EmpathyMapDemo',
    },
    {
      t: 5,
      points: [
        'An empathy map has four parts: what the person says, thinks, does and feels. It is built from evidence (observation notes, quotes), not from our imagination.',
        'Scene: 03:30, a change has just arrived. Says: “Everyone look at the board!” Thinks: “Did everyone hear me?” Does: writes in a corner, shouts, walks to each station. Feels: stressed and rushed.',
        'The gap between says and does (and thinks and feels) shows where the design can help. This links back to the say-do gap in Session 3.',
      ],
      script:
        'It is 03:30. A change has just arrived. Before I show anything, think about Hassan and write on paper what you think he says, thinks, does and feels. Now see the map. Look at the gap: he says everyone should look, but he does a lot of walking and shouting. That gap is where our design can help.',
      tip: 'Leave a silent pause of about 20 seconds before the first reveal so everyone writes a guess on paper. Click the four parts in order. Teams compare quietly. Never ask anyone to read their guess aloud.',
    },
  ),

  /* 25 · activity: your empathy map (8 min) */
  slide4(
    3,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Your Empathy Map',
        subtitle: 'Says, thinks, does and feels for your persona',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 8 min' },
      },
      label: 'Practice · Act 3',
      chip: 'TEAM OF TWO · 8 MINUTES',
      title: 'Draw and fill an empathy map for your persona',
      steps: [
        { text: 'On paper, draw a cross: four boxes called **Says**, **Thinks**, **Does**, **Feels**. Write your persona’s name in the middle.' },
        { text: 'Pick one moment from your study notes. Fill each box with 2 to 3 short lines, using **quotes and notes** from your report.' },
        { text: 'Look for a **gap**: say against do, or think against feel. Circle it and write one line: “This is where we could help.”' },
      ],
      timerSeconds: 480,
      timerLabel: 'Practice Clock',
      goal: 'Feel what it is like to be your persona at a hard moment, and find where help is needed.',
      output: 'An empathy map on paper with a circled gap and one “where we could help” line.',
    },
    {
      t: 8,
      points: [
        'Each team uses its own project, its persona card from Act 2 and its Session 3 User Study Report. Lines should come from real notes; mark a guess with a question mark.',
        '“Thinks” and “feels” are not seen directly. They come from quotes, tone and behaviour, so keep them modest.',
        'The circled gap is the best material for Act 4 (journey) and Act 5 (requirements).',
      ],
      script:
        'Eight minutes at your table. Take your persona and one moment from your notes, like the 03:30 moment we just saw. Draw the four boxes. Fill them with lines from your evidence. Then find the gap and circle it. Keep this paper: you will use it in the next acts.',
      tip: 'Walk the room and read over shoulders. Help quietly with prompts like “where did you see that?” or “did they say it, or did you guess?”. Never ask a team to read aloud. Say when 2 minutes remain.',
    },
  ),

  /* 26 · checklist: four tests (3 min) */
  slide4(
    3,
    'concept_model',
    {
      kind: 'checklist',
      heading: {
        title: 'Need, Goal, Constraint or Wish?',
        subtitle: 'Four quick tests to tell them apart',
        badge: { icon: 'check', label: 'Toolbox', value: '4 tests' },
      },
      items: [
        {
          icon: 'users',
          title: 'Who benefits?',
          text: 'The person doing the task: a need or user goal. The organisation: a business goal.',
        },
        {
          icon: 'hand',
          title: 'Can we change it?',
          text: 'No, we must live with it: a constraint (budget, noise, hygiene rules).',
        },
        {
          icon: 'alert',
          title: 'Is it a limit?',
          text: 'It says what the answer must survive, not what people want: a constraint.',
        },
        {
          icon: 'bulb',
          title: 'Is it nice to have?',
          text: 'Nobody’s task breaks without it, and users showed no evidence: a wish.',
        },
      ],
      footer: 'Also check: does it name a gadget, like “a big screen”? That is a solution. Rewrite it as a need.',
    },
    {
      t: 3,
      points: [
        'Four questions sort most statements: Who benefits? Can we change it? Is it a limit? Is it nice to have?',
        'Need: something the user cannot do without (“see the next batch from 3 metres”). Goal: a result wanted. Constraint: a limit. Wish: nice but not needed, like a colourful dashboard with no evidence behind it.',
        'A statement that names a gadget (“a touchscreen”) is a solution in disguise. We will rewrite those as needs in Act 5.',
      ],
      script:
        'Here are four quick tests you can use on any sentence. Who benefits: the user or the business? Can we change it? Is it a limit? Is it only nice to have? Try them on the bakery: “budget 2,000 euros” is a limit we cannot change, so it is a constraint. “Weather forecast” is nice to have, so it is a wish.',
      tip: 'Click to tick the four tests one by one. At each one, pause 5 seconds of silent thinking: “which statement from the demo fits this?”. Do not ask anyone to answer aloud. Tell teams to keep these four questions in front of them for the next activity.',
    },
  ),

  /* 27 · activity: goals and constraints sheet (7 min) */
  slide4(
    3,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Goals and Constraints',
        subtitle: 'One sheet for your project',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 7 min' },
      },
      label: 'Practice · Act 3',
      chip: 'TEAM OF TWO · 7 MINUTES',
      title: 'Write your goals and constraints sheet',
      steps: [
        { text: 'Divide a page into four parts: **User goals**, **Business goals**, **Constraints**, **Wishes**. Write 2 to 3 lines in each, from your report and persona.' },
        { text: 'For constraints, go through the six families: **people, place, time, rules, technology, money**. Write at least one each, if you can.' },
        { text: 'Run the **four tests** on every line. Move any line that is in the wrong part, and cross out gadgets: rewrite them as a need.' },
      ],
      timerSeconds: 420,
      timerLabel: 'Practice Clock',
      goal: 'Know what your users want, what limits you, and what is only nice to have, before you write requirements.',
      output: 'A one-page sheet: user goals, business goals, constraints (by family) and wishes.',
    },
    {
      t: 7,
      points: [
        'Each team works on its own project with its Session 3 User Study Report and its persona. Where a line has no evidence, mark it with a question mark.',
        'Business goals and budgets may be unknown: teams write a guess and mark it as one. They can ask the lecturer or check the project brief.',
        'This sheet feeds Act 4 (what the persona does) and Act 5 (requirements) and the final Requirements Pack.',
      ],
      script:
        'Seven minutes at your table. Make one page with four parts: user goals, business goals, constraints and wishes. Then use the six families of constraints to find limits you forgot. Finally, run the four tests on each line, and fix the wrong ones. Keep this page: it goes into your Requirements Pack.',
      tip: 'Walk the room and read over shoulders. Help quietly: “who benefits from this line?”. Never ask a team to read aloud. Announce the time at 4 minutes and at 1 minute. Move to Act 4 only when most pages have all four parts.',
    },
  ),
];
