import { slide3 } from '../session3Helpers';
import type { Slide3 } from '../session3Types';

/**
 * Session 3, act 6: studio and handoff (see course/teacher/session3-plan.md).
 * Minutes: 1 + 2 + 8 + 9 + 10 + 6 + 2 + 1 + 1 = 40.
 */
export const ACT_6_SLIDES: Slide3[] = [
  // 61 · divider (1)
  slide3(
    6,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 6,
      title: 'Studio and Handoff',
      question: 'How do you get ready to meet your users?',
      learn: ['A studio to prepare your user study with your partner', 'What to hand in for Session 4', 'The three ideas to keep'],
    },
    {
      t: 1,
      points: [
        'Last part of the session: teams prepare their own user study, then homework and a short close.',
        'Everything in the studio happens inside the team of two, at their own table.',
      ],
      script:
        'Last part. Now you prepare your own user study. You work with your partner, at your table. I walk around and help.',
      tip: 'Ask for laptops to be open. Nobody presents anything to the room today.',
    },
  ),

  // 62 · studio rules (2)
  slide3(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio: Prepare Your User Study',
        subtitle: 'Four steps, all inside your team of two',
        badge: { icon: 'clock', label: 'Studio', value: '4 steps · 33 min' },
      },
      label: 'Studio · Rules',
      chip: 'PAIRS · FOUR STEPS',
      title: 'Your study in four steps',
      steps: [
        { text: '**Step 1:** sharpen your **research question** and name your **target group**.' },
        { text: '**Step 2:** build your **kit**: recruiting, consent, task sheet, notes sheet.' },
        { text: '**Step 3:** **pilot** it with your partner, then swap roles.' },
        { text: '**Step 4:** finalise your **interview guide** and **save your study plan**.' },
      ],
      timerSeconds: 120,
      timerLabel: 'Read the rules',
      goal: 'Get ready to study real people after class.',
      output: 'A saved study plan: question, target group, kit and interview guide.',
    },
    {
      t: 2,
      points: [
        'Four steps, one after the other: sharpen the question (8 min), build the kit (9 min), pilot with your partner (10 min), finalise (6 min).',
        'The output is the study plan each team will use with 3 to 5 people outside class.',
        'The class example is Project 11 (Study Room Booking, Imane): teams can look back at it, but they work on their own project. They study the people who do the task, not the interface.',
      ],
      script:
        'You will build the plan for your user study. Four steps. Step one: sharpen your question and name your target group. Step two: build your kit. Step three: test it on your partner. Step four: finalise your interview guide and save your plan. Everything stays inside your team of two.',
      tip: 'Stay silent while they read for a minute or two. Then start the clock for step 1. Nobody presents; you walk around and answer at the table.',
    },
  ),

  // 63 · step 1 (8)
  slide3(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 1: Question and Group',
        subtitle: 'Decide what you want to learn and from whom',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 1 · 8 min' },
      },
      label: 'Studio · Step 1 of 4',
      chip: 'PAIRS · 8 MINUTES',
      title: 'Sharpen your question and group',
      steps: [
        { text: 'Take your riskiest assumption and write **one research question** about your users.' },
        { text: 'Pick **one method** that can answer it: observe, interview or think aloud.' },
        { text: 'Name your **target group** in 3 lines: who they are, their task, their place.' },
      ],
      timerSeconds: 480,
      timerLabel: 'Step 1 Clock',
      goal: 'One clear question and one clear group tell you what to watch and whom to ask.',
      output: 'One research question, one method and a 3-line target group.',
    },
    {
      t: 8,
      points: [
        'Reuse the work from Acts 2 and 3: the riskiest assumption, the two research questions, the audience description.',
        'A good question is specific and answerable, and about people, not about the screen: “How do students find a free room when in a hurry?”, not “Is the app good?”.',
        'Check that the method fits the question: watching for what happens, asking for why.',
      ],
      script:
        'First, one question. Start from the assumption you fear the most. Write one research question and pick the method that can answer it. Then describe your target group in three lines. You have eight minutes. Write it down, then compare it with your partner.',
      tip: 'Walk the room and read questions over shoulders. Gently reword vague ones (“Is it good?”) into a how or why question about the people.',
    },
  ),

  // 64 · step 2 (9)
  slide3(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 2: Build Your Kit',
        subtitle: 'The sheets you carry to every session',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 2 · 9 min' },
      },
      label: 'Studio · Step 2 of 4',
      chip: 'PAIRS · 9 MINUTES',
      title: 'Build your kit',
      steps: [
        { text: 'Write a **screening question** and a short **recruiting message**.' },
        { text: 'Write your **consent** lines: who you are, why, anonymous notes, free to stop.' },
        { text: 'Make a **task sheet** (one goal, no clicks explained) and a **notes sheet**: saw, felt, thought.' },
      ],
      timerSeconds: 540,
      timerLabel: 'Step 2 Clock',
      goal: 'Be ready to run a session without improvising.',
      output: 'A screening question, a recruiting message, consent lines, a task sheet and a notes sheet.',
    },
    {
      t: 9,
      points: [
        'The kit has five parts: screening question and recruiting message (Act 3), consent (ethics slide, Act 3), task sheet and notes sheet (saw / felt / thought, Act 4).',
        'The task is a goal, not instructions: it must not tell the person where to click.',
        'Notes stay anonymous: use “P1, P2, P3”, never real names or personal data.',
      ],
      script:
        'Now build your kit. First, one screening question and a short message to invite people. Then your consent lines: who you are, why you ask, notes are anonymous, the person can stop at any moment. Finally a task sheet with one small goal and a notes sheet with three columns.',
      tip: 'Check the task sheets first: the most common error is a task that already explains the steps. Ask: would a stranger know where to start?',
    },
  ),

  // 65 · step 3 (10)
  slide3(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 3: Pilot with Your Partner',
        subtitle: 'Try your kit on each other, then swap',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 3 · 10 min' },
      },
      label: 'Studio · Step 3 of 4',
      chip: 'PAIRS · 10 MINUTES',
      title: 'Run a pilot, then swap',
      steps: [
        { text: 'Partner A **thinks aloud** on the task (2 min). Partner B **watches** and takes notes.' },
        { text: 'Then B **interviews** A about the last time A did this task (2 min).' },
        { text: '**Swap roles** and do both parts again. Note what **did not work** in your kit.' },
      ],
      timerSeconds: 600,
      timerLabel: 'Step 3 Clock',
      goal: 'Find the problems in your kit before you meet real people.',
      output: 'Two short practice rounds and a list of things to fix in your kit.',
    },
    {
      t: 10,
      points: [
        'A pilot is a rehearsal: its goal is to test the kit, not to collect research findings.',
        'Each round is 2 min of think-aloud plus 2 min of interview, so both rounds take about 8 minutes; the last 2 minutes are for the hand-over and noting what did not work.',
        'Remind the rules from Act 4: do not help, say “keep talking”, ask for stories not opinions, no leading questions.',
      ],
      script:
        'Test your kit on each other. First round: A does the task and thinks aloud, B watches and writes. Then B interviews A. When I say swap, change roles and repeat. At the end, write what did not work: a task that was unclear, a sheet that was too small, a question that led.',
      tip: 'Call the swap clearly after the first round. Walk around and listen: stay quiet if a pair is working, step in only when they are stuck.',
    },
  ),

  // 66 · step 4 (6)
  slide3(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 4: Final Study Plan',
        subtitle: 'Finalise your interview guide, then save',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 4 · 6 min' },
      },
      label: 'Studio · Step 4 of 4',
      chip: 'PAIRS · 6 MINUTES',
      title: 'Finalise and save your plan',
      steps: [
        { text: 'Fix what did not work in your pilot: **task sheet**, **notes sheet**, **consent**.' },
        { text: 'Finalise your **interview guide**: open questions about stories, **never leading**.' },
        { text: '**Save** your study plan in one file you both can open.' },
      ],
      timerSeconds: 360,
      timerLabel: 'Step 4 Clock',
      goal: 'Leave the room with a plan you can run this week.',
      output: 'A saved study plan with your final interview guide.',
    },
    {
      t: 6,
      points: [
        'Use the five parts of the guide from Act 4 (warm-up, story, task recall, magic wand, wrap-up) and add probing.',
        'Check that no question suggests the answer (“Don’t you find it confusing?”).',
        'The saved plan is the starting point of the report: both partners need a copy.',
      ],
      script:
        'Last step. Fix what the pilot showed you. Finalise your interview guide and check that none of the questions suggests the answer. Then save your study plan in one file and send it to both of you. You will use it with real people.',
      tip: 'In the last two minutes, remind teams to save and share the file. Do not ask anyone to show their plan to the room.',
    },
  ),

  // 67 · homework (2)
  slide3(
    6,
    'concept_model',
    {
      kind: 'tiles',
      heading: {
        title: 'Homework: User Study Report',
        subtitle: 'Study real people and write what you learn',
        badge: { icon: 'flag', label: 'Due', value: 'Before Session 4' },
      },
      tiles: [
        { icon: 'users', name: 'Audience profile', tells: 'Who your users are, in a short profile.', when: 'Include their goals and abilities.', tag: 'Page 1' },
        { icon: 'compass', name: 'Task and context', tells: 'What they try to do.', when: 'Say where, when and with what they do it.', tag: 'Page 1' },
        { icon: 'alert', name: 'Pain points', tells: 'What you saw them do and where it hurts.', when: 'Show the patterns you found.', tag: 'Page 2' },
        { icon: 'list', name: 'Evidence', tells: 'Anonymous quotes and notes (P1, P2, P3).', when: 'Every point needs evidence that supports it.', tag: 'Page 3' },
        { icon: 'bulb', name: 'Open questions', tells: 'What you still do not know.', when: 'Add fix ideas in words, no new screens.', tag: 'Page 4' },
      ],
      takeaway: 'One 4-page PDF per team of two, due before Session 4. Study 3 to 5 people outside class: ask consent, keep notes anonymous.',
    },
    {
      t: 2,
      points: [
        'Deliverable: a 4-page User Study Report per team of two, due before Session 4.',
        'Run the study with 3 to 5 people outside class (not experts, not close friends): ask consent first, keep notes anonymous, people may stop at any time.',
        'The report is the handoff to Session 4: personas, scenarios and requirements are built from it.',
        'Students have not learned to design screens yet: do not accept redrawn interfaces; fix ideas are written in words.',
      ],
      script:
        'Your homework is the User Study Report. Four pages. You run your study with three to five people outside class. Always ask permission and keep the notes anonymous. The report tells who your users are, what they try to do, what you saw and where it hurts, your evidence with anonymous quotes, and what you still do not know. Ideas in words only: no drawing yet.',
      tip: 'Click the five tiles one at a time, from Page 1 to Page 4, and read the short line of each. Pause a few seconds after the last tile for silent note-taking. Confirm that the report template and the consent text are posted on the course portal. Take written questions at the lectern afterwards, not in front of the room.',
    },
  ),

  // 68 · three ideas (1)
  slide3(
    6,
    'summary_takeaway',
    {
      kind: 'spotlight',
      heading: { title: 'Three Ideas to Remember', subtitle: 'Carry them into every project' },
      statement: 'Meet your users, ask a sharp question, find the pattern.',
      points: [
        { icon: 'users', lead: 'You are not the user', text: 'A user has goals, abilities and a context. Go and meet them.' },
        { icon: 'target', lead: 'Ask a sharp question', text: 'Turn your riskiest assumption into one question, then pick a method.' },
        { icon: 'layers', lead: 'Patterns draw a profile', text: 'One note is a story. Many notes make a pattern.' },
      ],
      takeaway: 'Your patterns become your audience profile: the hand-off to Session 4.',
    },
    {
      t: 1,
      points: [
        'Idea 1: we are not our users (Act 1). Idea 2: assumptions, research questions and methods (Acts 2 to 4). Idea 3: patterns, insights and the audience profile (Act 5).',
        'Students can write each idea in their own notes.',
      ],
      script:
        'Three sentences to keep. You are not the user, so go and meet them. Every idea hides assumptions: turn the riskiest into one sharp question. And many notes make a pattern, and patterns draw your audience profile.',
      tip: 'Show the big statement first and pause. Then click to reveal the three points one at a time, reading each slowly and pausing 5 seconds. Students copy each idea silently into their notes; no repeating aloud.',
    },
  ),

  // 69 · teaser (1)
  slide3(
    6,
    'preview_next',
    {
      kind: 'teaser',
      label: 'Conclusion & Next Class',
      icon: 'users',
      kicker: 'Previewing Session 4 · Next Class',
      title: 'The Need',
      subtitle: 'Persona · Scenario · Requirement · Journey',
      blurb:
        'Your study report becomes the raw material. You will turn what you learned about real people into personas, scenarios and clear requirements for your project.',
      thanks: 'Thank you for Session 3 · Questions & Discussion Open at Lectern',
    },
    {
      t: 1,
      points: [
        'Session 4: requirements and personas (persona, scenario, requirement, journey).',
        'The User Study Report is the raw material: the audience profile and the pain points become personas and requirements.',
        'Reminder: the report is due before Session 4.',
      ],
      script:
        'Today you learned to know your users and planned a study. Next time we turn your report into personas and requirements. See you then.',
      tip: 'Stay for questions at the lectern; teams with doubts about their study should come to you now.',
    },
  ),
];
