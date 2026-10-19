import { slide3 } from '../session3Helpers';
import type { Slide3 } from '../session3Types';

/**
 * Session 3, act 2: FROM AN IDEA TO A QUESTION (slides 11-22, 35 minutes).
 * Minutes: 1 + 2 + 2 + 5 + 4 + 3 + 4 + 4 + 4 + 1 + 2 + 3 = 35.
 * See course/teacher/session3-plan.md (v2).
 */
export const ACT_2_SLIDES: Slide3[] = [
  /* 11 · divider (1 min) */
  slide3(
    2,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 2,
      title: 'From an Idea to a Question',
      question: 'How do we turn an idea of an interface into something we can find out?',
      learn: [
        'When research happens, and where this course starts',
        'The assumptions hidden inside every idea',
        'What people say vs what they do, and how to pick a method',
        'How to write a research question',
      ],
    },
    {
      t: 1,
      points: [
        'Act 1 ended with your idea in one sentence and who you think uses it.',
        'Act 2 turns that idea into a question that real people can answer.',
        'Thread: idea, assumptions, question, method.',
      ],
      script:
        'You now have an idea written in one sentence. Next we turn it into a question we can really answer. First we spot what we are assuming. Then we choose how to find out.',
      tip: 'Short slide. Announce the act and move on. Nobody needs to answer anything.',
    },
  ),

  /* 12 · narrative: when do we research (2 min) */
  slide3(
    2,
    'concept_model',
    {
      kind: 'journey',
      heading: {
        title: 'When Do We Research?',
        subtitle: 'Before, during and after building',
        badge: { icon: 'route', label: 'Timeline', value: 'Before · During · After' },
      },
      steps: [
        { icon: 'compass', title: 'Before building', short: 'Find needs. This is where we start.', detail: 'We find needs. Who are the people, and what are they trying to do? This course starts here, for your project.' },
        { icon: 'flask', title: 'During building', short: 'Test ideas as they take shape.', detail: 'We test ideas. Does this version work for them? We check early versions before they are finished.' },
        { icon: 'flag', title: 'After building', short: 'Find what still hurts.', detail: 'We find what still hurts. What do people struggle with now, with the real product in their hands?' },
      ],
      footer: 'Today we are at “before”. Session 4 turns your findings into requirements.',
    },
    {
      t: 2,
      points: [
        'Before: discovery research, finding needs and context. During: testing ideas and early versions. After: finding what still hurts in the live product.',
        'Your team has a starting interface, but today you do not test it. You study the people who do the task.',
        'Session 4 (The Need) takes your study findings and turns them into personas, scenarios and requirements.',
      ],
      script:
        'Research happens at three moments. Before we build, we find needs. While we build, we test ideas. After we build, we find what still hurts. For your project, this course starts at the first one: before. In Session 4 you will turn what you find into requirements.',
      tip: 'Click the three steps in order: Before, During, After. At each step pause 5 seconds of silent thinking (“where would your project be?”) before reading the detail. No question to the room; curious students can ask you at their table.',
    },
  ),

  /* 13 · narrative: hidden assumptions (2 min) */
  slide3(
    2,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'Every Idea Hides Assumptions',
        subtitle: 'Things we believe without having checked them',
        badge: { icon: 'bulb', label: 'Key idea', value: 'Assumption' },
      },
      statement: '“An app to book study rooms” sounds simple, but it hides beliefs we have not checked. Some are safe. Some can sink the idea.',
      points: [
        { icon: 'users', lead: 'Who', text: 'We think students want it. Which students, and how often?' },
        { icon: 'target', lead: 'What task', text: 'We think booking a room is the real problem. Is it?' },
        { icon: 'compass', lead: 'Where and why', text: 'We think they book on a laptop, to study in a group.' },
      ],
      takeaway: 'The riskiest assumption is the one to check first.',
    },
    {
      t: 2,
      points: [
        'An assumption is a belief about users, their task, their context or their reasons that we have not checked.',
        'Most of them come from our own experience (the curse of knowing from Act 1).',
        'Not all are equal: the risky ones are those that, if wrong, break the idea, and that we know least about.',
      ],
      script:
        'Take the idea: an app to book study rooms. It hides many beliefs. Who needs it? Is booking really their problem? Do they book on a laptop or on a phone? We believe these, but we have not checked. The useful skill is to spot them, and then to pick the riskiest.',
      tip: 'Read the big statement, then click to reveal the three points one at a time. Before each click, give 5 seconds of silent thinking (“what else is hidden here?”). Then go to the demo. Do not ask the room for assumptions: they write their own on paper in the practice.',
    },
  ),

  /* 14 · custom AssumptionsDemo (5 min) */
  slide3(
    2,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: From Idea to Question',
        subtitle: 'I take one idea and find what it assumes',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer runs it' },
      },
      component: 'AssumptionsDemo',
    },
    {
      t: 5,
      points: [
        'The class idea is Study Room Booking (Imane). The lecturer starts from one idea sentence.',
        'The demo lists its hidden assumptions, picks the riskiest one, and ends with a research question.',
        'Before each reveal, students silently write their own guess on paper.',
      ],
      script:
        'Here is one idea sentence for Study Room Booking. Before I show anything, write on paper what you think it assumes. Now see the assumptions hidden in it. I pick the riskiest one: the one that would hurt most if it were wrong. And that turns into a research question.',
      tip: 'Leave a silent pause of about 30 seconds before the first reveal. Pairs may compare on paper. Never ask anyone to read their list aloud.',
    },
  ),

  /* 15 · activity: list 5 assumptions (4 min) */
  slide3(
    2,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Your Assumptions',
        subtitle: 'What do you believe about your users?',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 4 min' },
      },
      label: 'Practice · Act 2',
      chip: 'TEAM OF TWO · 4 MINUTES',
      title: 'List 5 assumptions and pick the riskiest',
      steps: [
        { text: 'Read your one-sentence idea from Act 1.' },
        { text: 'Write **5 assumptions** about your users: who, what task, where, why.' },
        { text: 'Circle the **riskiest**: the one that hurts most if it is wrong.' },
      ],
      timerSeconds: 240,
      timerLabel: 'Practice Clock',
      goal: 'See what you believe but have not checked, so you know what to find out first.',
      output: 'A list of 5 assumptions, with the riskiest one circled.',
    },
    {
      t: 4,
      points: [
        'Each team uses its own project and its Act 1 sentence. Good assumptions are specific: “users book on their phone between classes”, not “users like it”.',
        'Riskiest = if wrong the idea fails, and we know little about it.',
        'Papers are kept: the circled assumption becomes the research question in slide 22.',
      ],
      script:
        'Four minutes at your table. Take your sentence from before. Write five things you are assuming about your users. Then circle the one that would hurt most if you were wrong. Keep the paper: it is the start of your research question.',
      tip: 'Walk the room and read over shoulders. Help quietly at the table, for instance “who exactly?” or “how do you know?”. Never ask a team to read aloud.',
    },
  ),

  /* 16 · compare: say vs do (3 min) */
  slide3(
    2,
    'comparison_think',
    {
      kind: 'versus',
      heading: {
        title: 'What People Say, What They Do',
        subtitle: 'An opinion is not the same as a behaviour',
        badge: { icon: 'users', label: 'Research idea', value: 'Say-do gap' },
      },
      leftLabel: 'What people SAY',
      rightLabel: 'What people DO',
      leftTone: 'warn',
      rightTone: 'good',
      rows: [
        { icon: 'brain', left: 'Opinion: their memory, their guess', right: 'Behaviour: what you can see them do' },
        { icon: 'heart', left: 'They want to look good, so it is often kind and often wrong', right: 'Where they click, stop, go back or give up' },
        { icon: 'book', left: '“I always read the room rules before I book.”', right: 'Imane skips the rules and taps the first free room.' },
        { icon: 'scale', left: 'Useful, but not proof', right: 'Closer to the truth' },
      ],
      takeaway: 'People are not lying. They forget, guess, and want to be polite. So we watch as well as ask.',
    },
    {
      t: 3,
      points: [
        'The say-do gap is well documented in user research: self-reports of past behaviour and predictions of future behaviour are unreliable.',
        'Reasons: memory is partial, people explain after the fact, they want to give a good answer, and much behaviour is automatic.',
        'Both are useful: behaviour shows WHAT happens, talk helps explain WHY. The danger is using talk alone.',
      ],
      script:
        'Ask a student about the rules of a booking page and they will say they read them. Watch them and they skip straight to the button. They are not lying: they forget, they guess, they are polite. That is why researchers never rely on opinion alone. Next, you will feel this gap yourselves.',
      tip: 'Show the SAY side first and read a row; give 5 seconds of silent thinking (“what would they really do?”), then click the switch to reveal the DO side of that row. Repeat per row. Say clearly this applies to everybody, including the lecturer. Nobody answers aloud; keep it light.',
    },
  ),

  /* 17 · custom SayDoGapDemo (4 min) */
  slide3(
    2,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Say or Do?',
        subtitle: 'Answer on paper first, then see what people did',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer runs it' },
      },
      component: 'SayDoGapDemo',
    },
    {
      t: 4,
      points: [
        'Each question is answered privately on paper (or on the student’s own device) before anything is shown.',
        'Then the lecturer reveals what people did. One result is from a real, famous study; the others are illustrations: say so out loud.',
        'The point is the size of the gap, not any single number.',
      ],
      script:
        'I will show a question. Write your own answer on paper, and keep it. Do not say it aloud. Then I will show what people said and what they did. Compare it with what you wrote and with what your partner wrote.',
      tip: 'Give a clear silent pause (about 20 seconds) per question. Afterwards let teams compare quietly. Do not ask anyone to share an answer with the room.',
    },
  ),

  /* 18 · table: map of five methods (4 min) */
  slide3(
    2,
    'concept_model',
    {
      kind: 'tiles',
      heading: {
        title: 'A Map of Five Methods',
        subtitle: 'What each one tells you, and when to use it',
        badge: { icon: 'compass', label: 'Toolbox', value: '5 methods' },
      },
      tiles: [
        { icon: 'eye', name: 'Observe', tells: 'What people really do', when: 'You want to see where they get stuck in their own place.', tag: 'Practise' },
        { icon: 'users', name: 'Interview', tells: 'Their stories and reasons', when: 'You need to know why, or what happened last time.', tag: 'Practise' },
        { icon: 'brain', name: 'Think aloud', tells: 'Their live thoughts', when: 'You want to hear the moment an expectation fails.', tag: 'Practise' },
        { icon: 'list', name: 'Survey', tells: 'What many people say', when: 'You need quick answers from many, on simple questions.' },
        { icon: 'chart', name: 'Usage data', tells: 'What many people did', when: 'The product is live and you want counts: how often, where.' },
      ],
      takeaway: 'In this course you will practise the first three, with a pen and a partner.',
    },
    {
      t: 4,
      points: [
        'Observe, interview and think aloud need only a few people and a quiet table: they are the methods for the Milestone 2 study.',
        'Survey and usage data reach many people but only on simple, pre-set questions; usage data needs a live product with logging and shows what happened, never why.',
        'Watching tells you what happens; asking tells you why. Think aloud sits in between: you watch and hear the reasons at the same moment.',
      ],
      script:
        'Five methods, one line each. Observe: watch them. Interview: hear their stories. Think aloud: they speak their thoughts as they act. Survey: simple questions to many people. Usage data: counts from a live product. The first three are the ones you can do with a pen and a partner, so those are the ones we practise.',
      tip: 'Click the tiles one at a time, in the order Observe to Usage data. Before each click, name the method and give 5 seconds of silent thinking (“when would I use it?”), then read what it tells you. Do not ask students to memorise: it stays in the app for the studio.',
    },
  ),

  /* 19 · custom MethodPickerDemo (4 min) */
  slide3(
    2,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Pick the Method',
        subtitle: 'A question appears: decide silently, then see the answer',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer runs it' },
      },
      component: 'MethodPickerDemo',
    },
    {
      t: 4,
      points: [
        'Each question is shown without its answer. Students decide silently and write the method on paper before the reveal.',
        'After the reveal the lecturer explains WHY the method fits: what it can and cannot tell you.',
        'Some questions have more than one good answer: say so, and name the best first choice.',
      ],
      script:
        'A question will appear. Choose the best method on your paper. Do not call it out. After a pause I will show the best choice and explain why. If you chose differently, that is fine: check whether your reason was also good.',
      tip: 'Leave a clear silent pause before each reveal. Never ask who got it right or wrong. Let teams of two compare quietly if they wish.',
    },
  ),

  /* 20 · compare: watch vs ask (1 min) */
  slide3(
    2,
    'comparison_think',
    {
      kind: 'flipcards',
      heading: {
        title: 'Two Families of Questions',
        subtitle: 'Watch tells what happens, ask tells why',
        badge: { icon: 'eye', label: 'Rule of thumb', value: 'What / Why' },
      },
      cards: [
        {
          icon: 'eye',
          term: 'WATCH',
          front: 'Which questions are about what happens?',
          back: 'Questions about what people do, where things go wrong and how often. Methods: observe, usage data.',
          example: 'Where does Imane stop when she books a room?',
        },
        {
          icon: 'brain',
          term: 'ASK',
          front: 'Which questions are about why it happens?',
          back: 'Questions about why: reasons, worries, habits and stories. Methods: interview, survey.',
          example: 'Why do students book a room but never use it?',
        },
      ],
      takeaway: 'A good research question is specific and answerable. Watching shows the problem. Asking explains it.',
    },
    {
      t: 1,
      points: [
        'Watch = behaviour (what happens). Ask = reasons, attitudes, memories (why it happens).',
        'Think aloud is in between. Neither family is better: they answer different questions.',
        'A good research question is specific and answerable by one method in a few days.',
      ],
      script:
        'Two families of questions. Watch questions are about what happens. Ask questions are about why. A good research question is specific, and you can really answer it. The next slide shows how to write one.',
      tip: 'One minute only. Flip WATCH first, then ASK; before each flip give 5 seconds of silent thinking. The examples on the next slide do the real teaching.',
    },
  ),

  /* 21 · narrative: how to write a research question (2 min) */
  slide3(
    2,
    'concept_model',
    {
      kind: 'versus',
      heading: {
        title: 'How to Write a Research Question',
        subtitle: 'Start from your riskiest assumption',
        badge: { icon: 'bulb', label: 'Rule', value: 'Question first' },
      },
      leftLabel: 'Vague',
      rightLabel: 'Better',
      leftTone: 'warn',
      rightTone: 'good',
      rows: [
        { icon: 'target', left: '“Do students like booking?”', right: '“Why do first-years leave before confirming a booking?”' },
        { icon: 'users', left: 'Any user, any task, anywhere', right: 'One task, one kind of user, one place' },
        { icon: 'list', left: 'Starts with “Do”: a yes or no teaches little', right: 'Starts with What, Why or How' },
        { icon: 'compass', left: 'No clue which method to use', right: 'Watch for what, ask for why, count for how many' },
      ],
      takeaway: 'One question, then the method that fits it.',
    },
    {
      t: 2,
      points: [
        'A research question is not a topic (“booking”) and not a method (“do a survey”).',
        'Example for project 11: “What do students do when no room is free?” leads to observation; “Why do they leave before confirming?” leads to think aloud or interview.',
        'Many studies fail because they start from a tool. Start from the question.',
      ],
      script:
        'Take your riskiest assumption and turn it into one question. Compare: do students like booking, which is vague, with why first-year students leave before confirming, which is specific. The second one tells us exactly what to watch and whom to ask. The question picks the method.',
      tip: 'Show the Vague side of a row, give 5 seconds of silent thinking (“how could we improve it?”), then click the switch to reveal the Better side. Repeat per row. Students write their own on the next slide.',
    },
  ),

  /* 22 · activity: 2 research questions (3 min) */
  slide3(
    2,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Your Research Questions',
        subtitle: 'Two questions and a method for each',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 3 min' },
      },
      label: 'Practice · Act 2',
      chip: 'TEAM OF TWO · 3 MINUTES',
      title: 'Write 2 research questions',
      steps: [
        { text: 'Take your **riskiest assumption** from the last practice.' },
        { text: 'Write **2 research questions** about your users’ task. Start with **What**, **Why** or **How**.' },
        { text: 'Pick a method for each: **observe**, **interview**, **think aloud**, **survey** or **usage data**.' },
      ],
      timerSeconds: 180,
      timerLabel: 'Practice Clock',
      goal: 'Turn what you believe into something you can find out, with a method that fits.',
      output: 'Two research questions, each with one method, ready for the study plan.',
    },
    {
      t: 3,
      points: [
        'Check that each question names one user group and one task, and that the method fits: what goes with observe, why with interview or think aloud, how many with survey or usage data.',
        'Keep the papers: they feed the study plan in Act 3 and the studio.',
        'Models for project 11: “Where do students stop when booking a room for four?” (observe); “Why do they not use a room they booked?” (interview).',
      ],
      script:
        'Three minutes with your partner. Start from the assumption you circled. Write two questions, each beginning with What, Why or How. Then choose a method for each. Keep the paper, because we use it in the study plan.',
      tip: 'Walk past tables. Quietly ask “who exactly?” or “which task?” to teams with vague questions. Nobody reads aloud.',
    },
  ),
];
