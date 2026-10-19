import type { Slide3 } from '../session3Types';
import { slide3 } from '../session3Helpers';

/**
 * SESSION 3 · ACT 3 · FINDING YOUR USERS (30 min), slides 23-30 of the plan.
 * Minutes per slide: 1 + 3 + 3 + 4 + 5 + 2 + 4 + 8 = 30.
 */
export const ACT_3_SLIDES: Slide3[] = [
  // 23 · divider (1 min)
  slide3(
    3,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 3,
      title: 'Finding Your Users',
      question: 'Who exactly will you study, and how do you reach them?',
      learn: [
        'The people you want are not always the people you can reach',
        'Choose 3 to 5 people, with the edges included',
        'Turn it all into a one-page study plan',
      ],
    },
    {
      t: 1,
      points: [
        'Act 2 gave each team a research question and a method. Act 3 answers: who will we ask, or watch?',
        'The act ends with a one-page study plan that each team of two writes at its own table.',
      ],
      script:
        'You have a question and a method. Now you need people. Who exactly? How many? How do you reach them without cheating yourself? By the end of this act, you will have a one-page plan for your own study.',
      tip: 'Short slide: announce the act and move on. Nobody needs to answer anything here.',
    },
  ),

  // 24 · compare: target audience vs reachable people (3 min)
  slide3(
    3,
    'comparison_think',
    {
      kind: 'versus',
      heading: {
        title: 'Who You Want, Who You Can Reach',
        subtitle: 'The two groups are almost never the same',
        badge: { icon: 'users', label: 'Research idea', value: 'Audience' },
      },
      leftLabel: 'Target audience: who you want',
      rightLabel: 'People you can reach: who is at hand',
      leftTone: 'accent',
      rightTone: 'warn',
      rows: [
        { icon: 'users', left: 'People who really do the task', right: 'Friends, classmates, your own team' },
        { icon: 'target', left: 'Your work is made for them', right: 'Easy to ask, but they know your project' },
        { icon: 'book', left: 'Example: students who book a study room for a group task', right: 'Example: the classmate who helped build the project' },
        { icon: 'check', left: 'Describe them first, in a few lines', right: 'Then check how well they match' },
      ],
      takeaway: 'Start from the audience you want. Then find the nearest people who really match it.',
    },
    {
      t: 3,
      points: [
        'Convenience sampling (asking whoever is at hand) is the usual trap in small studies: it is fast, but it can hide the real problems.',
        'Classmates and friends know the project, its words and its habits: they stumble less than a stranger does.',
        'The goal is not a perfect match but a close one, and to write down honestly where it is not close.',
      ],
      script:
        'First picture the audience you want: who really does this task? Then look at who you can reach this week. Often these are different. Your best friend is easy to ask, but he knows your project. A stranger who books study rooms is harder to find and far more useful.',
      tip: 'Show the two labels, then give 10 seconds of silent thinking: students write the first person they would ask. Click through the rows one at a time, then switch sides. Students check on paper: real user or convenient friend? No sharing in the room.',
    },
  ),

  // 25 · rules: who to study (3 min)
  slide3(
    3,
    'concept_model',
    {
      kind: 'flipcards',
      heading: {
        title: 'Who to Study',
        subtitle: 'A small group, chosen with care',
        badge: { icon: 'users', label: 'Sample', value: '3 to 5 people' },
      },
      cards: [
        {
          icon: 'users',
          term: '3 to 5 people',
          front: 'How many people do you need for one kind of user?',
          back: 'A small group is enough to see the main problems. More people mostly repeat them.',
          example: 'One round, one kind of user',
        },
        {
          icon: 'compass',
          term: 'Include the edges',
          front: 'Who shows problems that others hide?',
          back: 'Add one who uses it all the time, one who barely uses it, one with a disability.',
          example: 'The edges teach the most',
        },
        {
          icon: 'hand',
          term: 'A proxy if needed',
          front: 'What if the real user is out of reach?',
          back: 'Use a proxy: someone close to the real user. Say so in your notes.',
          example: 'Second best, but written down',
        },
      ],
      takeaway: 'Few people, some at the edges, and an honest note when someone is only a stand-in.',
    },
    {
      t: 3,
      points: [
        'Three to five people per group of users is a rule of thumb for one round (Nielsen); it is not a guarantee. If there are two very different groups, study each.',
        'Extreme users: people at the edges of the range, such as a heavy user, someone who hardly uses the tool, or someone with a disability. The average user hides problems that they cannot avoid.',
        'A proxy is a stand-in who is close to the real user, for example a student helper for a first-year. A proxy is a second choice: record who it was and why.',
      ],
      script:
        'Three to five people per kind of user. Then think about the edges. Someone who uses the tool all day finds the little frictions. Someone who barely uses it finds the things that are not obvious. Someone with low vision or a motor impairment finds what the average person works around without noticing. And if you truly cannot reach the real user, a close stand-in is fine, as long as you write it down.',
      tip: 'Flip the cards one at a time; before each flip, give 5 seconds of silent thinking on the question on the front. Say the examples aloud. After the edges card, teams of two write privately which edge person they could reach this week. No cold-calling.',
    },
  ),

  // 26 · custom RecruitScreenerDemo (4 min)
  slide3(
    3,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Who Fits?',
        subtitle: 'Eight people, one question: who is in, who is an edge?',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'RecruitScreenerDemo',
    },
    {
      t: 4,
      points: [
        'Eight candidate cards for the Project 11 study. One screening question sorts them: who really fits, who is an extreme, who is only a proxy.',
        'Before the reveal, each student writes on paper which candidates they would keep, and why.',
        'The point: a good screening question is short, neutral and about behaviour, not about opinions.',
      ],
      script:
        'Here are eight people. On your paper, write who you would invite for a study of how students book study rooms. Now I ask one screening question and click to see who fits. Notice who is an extreme, and who is only a proxy.',
      tip: 'Give 30 seconds of silent writing, then 30 seconds with the partner. The lecturer clicks and explains. Nobody speaks to the room.',
    },
  ),

  // 27 · activity: audience, recruiting message, screening question (5 min)
  slide3(
    3,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Find Your People',
        subtitle: 'Audience, recruiting message, one screening question',
        badge: { icon: 'clock', label: 'Practice', value: '5 minutes' },
      },
      label: 'Practice · Finding users',
      chip: 'TEAMS OF TWO · 5 MINUTES',
      title: 'Describe your audience and invite them',
      steps: [
        { text: 'Write **3 lines** about your audience: **who** they are, **what task** they do, **where** they do it.' },
        { text: 'Write a **short message** that invites one person to help: who you are, what you ask, how long it takes.' },
        { text: 'Add **one screening question** about what people do, not what they think. Example: “When did you last book a room?”' },
      ],
      timerSeconds: 300,
      timerLabel: 'Practice Clock',
      goal: 'Say who you want, and write the words you will use to reach them.',
      output: 'Three lines about your audience, a short invitation, and one screening question.',
    },
    {
      t: 5,
      points: [
        'Model for Project 11: “Students who need a quiet room for a group task, on campus.” Message: “Hi, I am a student doing a short study (15 minutes) on booking study rooms. May I watch you do it once? Your name will not be written down.” Screening question: “When did you last book a room?”',
        'A screening question asks about behaviour, not opinion, and has an answer that tells you whether the person fits.',
        'The message must be short, state the time needed, and say that notes are anonymous (see the ethics slide).',
      ],
      script:
        'Five minutes. First, three lines: who is your audience, what task, where. Then a short invitation as if you were texting a student you do not know. Last, one question that tells you if the person really does the task. Write it with your partner, at your table.',
      tip: 'Walk the room quietly and read over shoulders only if invited. Hint privately at teams whose screening question asks for an opinion.',
    },
  ),

  // 28 · rules: ethics in one minute (2 min)
  slide3(
    3,
    'concept_model',
    {
      kind: 'checklist',
      heading: {
        title: 'Ethics in One Minute',
        subtitle: 'Three promises to every person',
        badge: { icon: 'heart', label: 'Respect', value: 'Always' },
      },
      items: [
        {
          icon: 'hand',
          title: 'Ask and explain',
          text: 'Say who you are, what you are studying and how long it takes. Get a clear yes first.',
        },
        {
          icon: 'heart',
          title: 'Free to stop',
          text: '“This is not a test of you. You may stop at any time, with no reason.”',
        },
        {
          icon: 'check',
          title: 'Keep it private',
          text: 'No names in your notes: use P1, P2, P3. Record only if they say yes.',
        },
      ],
      footer: 'Read the consent words in your own voice to every person, before you begin.',
    },
    {
      t: 2,
      points: [
        'Core principles: informed consent, voluntary participation, the right to withdraw, privacy of the notes.',
        'Record audio or video only with clear permission. Keep notes anonymous with codes.',
        'The consent words go into the study kit in the studio (Act 6).',
      ],
      script:
        'One minute on ethics. Ask permission and explain. Tell them they can stop at any time and that you are not testing them. Write no names: use P1, P2, P3. If you want to record, ask first. That is the whole script.',
      tip: 'Click once per promise so the items tick in one by one; pause 5 seconds of silent thinking before each click. Model the consent sentence calmly in your own voice. Nobody practises in front of the room: partners will practise it at their table in the studio.',
    },
  ),

  // 29 · custom UsersVsProblemsDemo (4 min)
  slide3(
    3,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: How Many People?',
        subtitle: 'Guess first, then see the curve',
        badge: { icon: 'users', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'UsersVsProblemsDemo',
    },
    {
      t: 4,
      points: [
        'Before the reveal, students write a guess on paper: how many people do we need to find most problems?',
        'Rule of thumb from Nielsen and Landauer: about 5 users in one round of testing find most problems, not all. It assumes one user group and one round, so repeat with new rounds and study each type of user.',
        'The curve on screen is illustrative: it rises fast at first, then flattens. By the fifth person you mostly see what you saw before.',
      ],
      script:
        'Quietly write on paper how many people you think you need to find most of the problems. Now the curve. The first people show many new problems. By the fifth, you mostly see things you saw before. Five is a rule of thumb, not a law.',
      tip: 'Pause a full ten seconds for private guesses, then let partners compare quietly. Do not ask anyone for a number aloud.',
    },
  ),

  // 30 · activity: one-page study plan (8 min)
  slide3(
    3,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Your Study Plan',
        subtitle: 'One page, five lines: question, who, method, how many, when',
        badge: { icon: 'clock', label: 'Practice', value: '8 minutes' },
      },
      label: 'Practice · One-page study plan',
      chip: 'TEAMS OF TWO · 8 MINUTES',
      title: 'Draft your one-page study plan',
      steps: [
        { text: 'Take one page. Write **5 labels**: **Question**, **Who**, **Method**, **How many**, **When**.' },
        { text: '**Question**: your best research question. **Who**: your audience, with one person at the edge.' },
        { text: '**Method**: watch, interview or think aloud. **How many**: 3 to 5 people.' },
        { text: '**When**: the days and places this week. Check that each line answers the one above.' },
      ],
      timerSeconds: 480,
      timerLabel: 'Plan Clock',
      goal: 'Know exactly what you will study, with whom, and when, before you start.',
      output: 'A one-page plan with five lines. You will sharpen it in the studio and use it for Milestone 2.',
    },
    {
      t: 8,
      points: [
        'Model for Project 11: Question: why do students fail to book a room? Who: students who book study rooms, plus one first-year and one student with low vision. Method: watch, then a short interview. How many: 4. When: Tuesday and Wednesday at the library.',
        'Check coherence: the method must answer the question, and the people must match the audience.',
        'This plan is the starting point of the studio in Act 6; keep the page.',
      ],
      script:
        'Eight minutes. One page, five lines. Question, who, method, how many, when. Write the question you chose in Act 2. Then who you will ask, with at least one person at the edge. Then the method, then three to five people, then real days. Read it with your partner: does each line answer the line above?',
      tip: 'Walk the room and read plans quietly. Ask privately: who exactly is this person, and where will you meet them? Do not read plans aloud.',
    },
  ),
];
