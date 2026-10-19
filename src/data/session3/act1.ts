import { slide3 } from '../session3Helpers';
import type { Slide3 } from '../session3Types';

/** Session 3, act 1 · Who is a user? (30 min). See course/teacher/session3-plan.md. */
export const ACT_1_SLIDES: Slide3[] = [
  slide3(
    1,
    'title',
    {
      kind: 'hero',
      sessionLabel: 'SESSION 03',
      pill: 'Master Course · Human-Centered Systems',
      title: 'The User',
      subtitle: 'Observe · Interview · Think Aloud · Find Patterns',
      cta: 'Begin Session 3',
    },
    {
      t: 1,
      points: [
        'This is the Session 2 teaser made real: “The User”.',
        'Session 2 explained how people see, remember, point and understand. Session 3 is about who these people are and how to find out.',
        'Today ends with each team of two preparing a real study of the people who use its own project.',
      ],
      script:
        'Last week we studied how people work in general. Today we ask who your users really are, and how to find out what they do, think and need. By the end, your team of two will have a plan for a real study.',
      tip: 'Start on time. Say that everything today is done in your team of two, at your own table, and nobody has to speak in front of the room.',
    },
  ),
  slide3(
    1,
    'question',
    {
      kind: 'quiz',
      heading: {
        title: 'Session 2 Recall',
        subtitle: 'Write your answers on paper first, then compare',
        badge: { icon: 'brain', label: 'Retrieval practice', value: '3 minutes' },
      },
      items: [
        {
          q: 'How fast do we react? How much can we hold in mind?',
          a: 'A reaction takes about **a quarter of a second**. Working memory holds only about **4 chunks** at a time.',
        },
        {
          q: 'What makes a target easy to hit? (Fitts)',
          a: 'A target that is **big** and **close**. Small and far away is slow and easy to miss.',
        },
        {
          q: 'What makes a choice fast? (Hick)',
          a: '**Fewer choices.** Every extra option on a screen adds thinking time.',
        },
        {
          q: 'What is a mental model?',
          a: 'The picture in the user’s head of **how the system works**. It decides what they expect to happen.',
        },
      ],
    },
    {
      t: 3,
      points: [
        'Reaction time: about 0.25 s for one perceive-decide-act loop. Working memory: about 4 chunks (modern estimates, lower than the old “7 ± 2”).',
        'Fitts: big and close targets are fast. Hick: fewer choices decide faster.',
        'Mental model: what the user believes the system does. Today it becomes the thing we go and look for.',
      ],
      script:
        'One minute alone with a sheet of paper. Write what you remember, no phones. Then compare with your partner. I will show the answers in a moment. Notice which ones felt fuzzy: they are the ones to revisit.',
      tip: 'Stay silent for the first minute. Show the answers only after the pause. Never call on anyone: pairs check each other privately.',
    },
  ),
  slide3(
    1,
    'course_roadmap',
    {
      kind: 'agenda',
      heading: { title: 'What You Will Be Able to Do', subtitle: 'By the end of today' },
      outcomes: [
        { icon: 'users', title: 'Know your user', text: 'Say who uses your project, what they want and where they use it.' },
        { icon: 'eye', title: 'Turn an idea into questions', text: 'Find the assumptions in your idea and ask what to check.' },
        { icon: 'layers', title: 'Plan a user study', text: 'Choose who to study, with which method, and how many people.' },
      ],
      note: 'You will leave with a plan to study the people behind your own project.',
    },
    {
      t: 1,
      points: [
        'Three outcomes: know your user, turn an idea into questions, plan a user study.',
        'Every part of the day ends in something the team of two can use on its own project.',
        'Homework is the real study: three to five people outside class. Its report feeds Session 4.',
      ],
      script:
        'Three outcomes. You will know who your user is. You will turn your idea into questions worth asking. And you will plan a study to answer them. Everything we do today serves one of these three.',
      tip: 'Keep it short and do not show a time plan. The outcomes matter more than the schedule.',
    },
  ),
  slide3(
    1,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Tappers and Listeners',
        subtitle: 'I tap a famous song; you write what you hear',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'TapSongDemo',
    },
    {
      t: 4,
      points: [
        'The lecturer taps only the rhythm of a famous song on the table. A tapper hears the whole song in their head; a listener hears knocks.',
        'Before the reveal, every student writes a private guess on paper. Then the room sees how rarely listeners get it right.',
        'This is the experiment of Elizabeth Newton (1990, Stanford): tappers predicted listeners would guess far more often than they did.',
      ],
      script:
        'I will tap the rhythm of a song you all know. Do not say anything. Write your guess on paper, then compare with your partner. Now see how often listeners got it. I knew the song, so to me the taps were obvious. That is exactly the trap.',
      tip: 'Song buttons: Song 1 = Happy Birthday, Song 2 = Twinkle Twinkle, Song 3 = Jingle Bells. Nobody says a guess aloud. Pairs compare on paper only. Reveal the score of the room as a number, never as names.',
    },
  ),
  slide3(
    1,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'You Are Not the User',
        subtitle: 'Once you know something, you cannot unknow it',
      },
      statement: 'The tapper could not imagine not hearing the song. You know your idea, so you cannot see it with fresh eyes: this is the curse of knowing.',
      points: [
        { icon: 'brain', lead: 'You know the system', text: 'You know where things are and what words mean, so it feels obvious.' },
        { icon: 'users', lead: 'The user does not', text: 'They come with another goal, other habits and another picture.' },
        { icon: 'eye', lead: 'You cannot guess it', text: 'Thinking harder does not help. Watch real people and ask them.' },
      ],
      takeaway: 'You are not the user: find out, do not assume.',
    },
    {
      t: 3,
      points: [
        'The curse of knowing: once we know something, it is very hard to imagine not knowing it (a cognitive bias often linked to experts and designers).',
        'This is the Session 1 idea “you are not the user”, now with a reason: the problem is in our own head, not in the user.',
        'Designers and developers are the worst judges of their own work, because they know every label and every hidden step.',
      ],
      script:
        'The tappers were not careless. They simply could not unhear the song. You are the tappers of your project: you chose it, you know it. Your users hear only the knocks. So guessing will not work, and we need a method.',
      tip: 'Link back to the demo with one sentence. Say that being fooled is normal and happens to every expert, so nobody should feel bad about their guess. Read the big statement, then click once per point (know the system, the user does not, cannot guess it). Before each click, give 5 seconds of silent thinking.',
    },
  ),
  slide3(
    1,
    'concept_model',
    {
      kind: 'flipcards',
      heading: {
        title: 'What Is a User?',
        subtitle: 'A real person, not “everyone”',
      },
      cards: [
        {
          icon: 'target',
          term: 'Goals',
          front: 'What does this person want to get done today?',
          back: 'What they want to get done, and why it matters to them today.',
          example: 'Imane needs a room for 4 people tomorrow, 14:00 to 16:00.',
        },
        {
          icon: 'brain',
          term: 'Abilities',
          front: 'What do they know, and what do they find hard?',
          back: 'What they know, what they can see and hear, and what they find hard.',
          example: 'Imane is a student. How well does she know this tool?',
        },
        {
          icon: 'compass',
          term: 'Context',
          front: 'Where, when and on what device are they?',
          back: 'Where, when and on what device, and who or what interrupts them.',
          example: 'Imane is walking between two classes, phone in hand.',
        },
      ],
      takeaway: 'A user is one person in one situation, not “everybody”: describe goals, abilities and context.',
    },
    {
      t: 3,
      points: [
        '“Everyone” is not a user: a design for everyone is usually a design for nobody in particular.',
        'Goals, abilities and context are the three things that change how the same screen is experienced.',
        'Example: Imane, a student, books a study room for four people tomorrow 14:00 to 16:00, between two classes (Project 11, Study Room Booking).',
      ],
      script:
        'When I say “user”, I do not mean everybody. I mean one person with a goal, some abilities and a place and moment. Take Imane: she needs a room for four people tomorrow afternoon, she is a student, and she is walking between classes. Those three things shape everything she does.',
      tip: 'Flip the cards one at a time (goals, abilities, context); before each flip, give 5 seconds of silent thinking. Use Imane as the only example. After the third card, invite pairs to silently write the same three words for the user of their own project, on paper, no sharing aloud.',
    },
  ),
  slide3(
    1,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Same App, Four Users',
        subtitle: 'I flip each card: goals, abilities, context',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'AudienceVarietyDemo',
    },
    {
      t: 4,
      points: [
        'The same app has four very different users: a new student in a hurry, a regular, a staff member, and a student with low vision on a phone in bright sun.',
        'Each card is flipped by the lecturer. Before the flip, pairs silently write what they expect for goals, abilities and context.',
        'The point: one interface, four situations, four different experiences. One “average user” hides all of them.',
      ],
      script:
        'Here is one app and four people. Before I flip a card, write on paper what you think this person wants, can do and where they are. Now see the card. Notice how different the four are, and how a design for the average would fail most of them.',
      tip: 'Flip one card at a time and leave a silent pause before each flip. Pairs compare on paper only. Do not ask anyone to guess aloud.',
    },
  ),
  slide3(
    1,
    'concept_model',
    {
      kind: 'journey',
      heading: { title: 'Kinds of Users', subtitle: 'Not everyone who matters touches the screen' },
      steps: [
        {
          icon: 'users',
          title: 'Direct users',
          short: 'The people who use it',
          detail: 'They do the task with it, again and again. Example: students who book rooms. Start your study here.',
        },
        {
          icon: 'landmark',
          title: 'Decision makers',
          short: 'The people who decide or pay',
          detail: 'They choose, buy or approve it. Example: the library manager.',
        },
        {
          icon: 'heart',
          title: 'Affected people',
          short: 'The people who feel the result',
          detail: 'They never open it, but feel its result. Example: staff who get angry about empty rooms.',
        },
      ],
      footer: 'List all three kinds, then decide who to study first.',
    },
    {
      t: 3,
      points: [
        'Direct users, people who decide or pay, and people who are affected. The same person can be more than one.',
        'Studying only the direct users can miss a constraint set by those who decide, or a cost carried by those affected.',
        'Start the study with direct users: they are the ones who meet the problem. The others add context.',
      ],
      script:
        'A system has more than one kind of user. Students book rooms. The manager decides how the system is run. Staff feel the result of empty rooms. For your project, write all three kinds on paper, then circle the group you most need to understand first.',
      tip: 'Click the three steps in order (direct users, decision makers, affected people); before each click, give 5 seconds of silent thinking about who that is for their project. After the last click, give 30 seconds of silent writing in pairs at their tables. Do not ask for answers aloud. Walk by and read over shoulders.',
    },
  ),
  slide3(
    1,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Watch Imane Try',
        subtitle: 'A recorded user books a study room. Predict first.',
        badge: { icon: 'flask', label: 'Recorded replay', value: 'Lecturer-run' },
      },
      component: 'SessionReplayWatch',
    },
    {
      t: 4,
      points: [
        'The replay is scripted: Imane tries the class task of Study Room Booking (book a room for 4 people tomorrow, 14:00 to 16:00) with the tool as it exists today.',
        'Before and during the replay, each student silently writes down where they think it will go wrong. No annotations appear on screen.',
        'After the replay, pairs compare their predictions on paper. The lecturer only says what happened, not who was right.',
      ],
      script:
        'Now you will watch a recording of Imane, a student, doing her task with the current tool. Do not tell me anything. Write down on paper where you think she will get stuck. Then compare with your partner: where did you both look, and what did you miss?',
      tip: 'Run the replay once without comments. Keep silence while it plays. Afterwards, give a minute of private comparison in pairs and take no answers aloud.',
    },
  ),
  slide3(
    1,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Your Idea in One Sentence',
        subtitle: 'What it is, for whom, to do what',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 4 min' },
      },
      label: 'Practice · One sentence',
      chip: 'TEAM OF TWO · 4 MINUTES',
      title: 'Write your idea in one sentence',
      steps: [
        { text: 'Write **one sentence**: what your project is, for whom, to do what.' },
        { text: 'Under it, write **who you think uses it**: goals, abilities, context.' },
        { text: 'Keep the paper. We will **check it** in the next part.' },
      ],
      timerSeconds: 240,
      timerLabel: 'Practice Clock',
      goal: 'Put your idea and your picture of the user in words, so we can test it later.',
      output: 'One idea sentence and a short description of who you think uses it.',
    },
    {
      t: 4,
      points: [
        'Each team writes its idea sentence for its own listed project: what it is, for whom, to do what. In words only, no drawings.',
        'The user description uses the three words from this act: goals, abilities, context.',
        'The papers are kept: in Act 2 the same sentence is used to find hidden assumptions and research questions.',
      ],
      script:
        'Four minutes. With your partner, write one sentence about your project: what it is, for whom, to do what. Then write who you think uses it. Be specific. Keep the paper: we will use this sentence in the next part.',
      tip: 'Walk between tables and read over shoulders. Ask “which person exactly?” to teams that write “everyone”. Do not ask anyone to read aloud.',
    },
  ),
];
