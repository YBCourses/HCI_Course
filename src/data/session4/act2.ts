import { slide4 } from '../session4Helpers';
import type { Slide4 } from '../session4Types';

/**
 * Session 4, act 2: FROM EVIDENCE TO PERSONAS (slides 11-19, 35 minutes).
 * Minutes: 1 + 3 + 3 + 6 + 3 + 4 + 3 + 8 + 4 = 35.
 * See course/teacher/session4-plan.md and session4-case.md (Fresh Batch).
 */
export const ACT_2_SLIDES: Slide4[] = [
  /* 11 · divider (1 min) */
  slide4(
    2,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 2,
      title: 'Personas',
      question: 'How do we turn study notes into a person we can design for?',
      learn: [
        'IN: your User Study Report, with its audience profile (the group)',
        'What a persona is, what it holds, and how many we need',
        'OUT: persona cards on paper, every line backed by a note',
      ],
    },
    {
      t: 1,
      points: [
        'Act 1 ended with the gap: we know the group, but we still must decide.',
        'Act 2 turns the audience profile (a group) into persona cards (one made-up person built from evidence).',
        'Thread: study report in, persona cards out. The persona feeds goals, scenarios and requirements later today.',
      ],
      script:
        'In Session 3 you described a group of people. A group is hard to design for. Today we make it a person, built only from your notes. Your study report goes in. A persona card on paper comes out.',
      tip: 'Short slide. Announce the act, ask teams to have their Session 3 study report within reach on the table. Nobody answers anything.',
    },
  ),

  /* 12 · spotlight: what a persona is (3 min) */
  slide4(
    2,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'What Is a Persona?',
        subtitle: 'A person made from evidence, to help us decide',
        badge: { icon: 'users', label: 'Key idea', value: 'Persona' },
      },
      statement:
        'A persona is one made-up person who stands for a group of real users. We build every line of it from what we saw and heard.',
      points: [
        { icon: 'target', lead: 'A tool to decide', text: 'We ask: what would Hassan need here? It ends arguments.' },
        { icon: 'book', lead: 'Made from notes', text: 'Each line comes from an observation, a quote or a pattern.' },
        { icon: 'alert', lead: 'Not a real person', text: 'Not an average, not a stereotype, not a portrait of your friend.' },
      ],
      takeaway: 'In our case: Hassan, 52, head baker, built from notes 1, 3, 6 and 11.',
    },
    {
      t: 3,
      points: [
        'A persona is a fictional but evidence-based description of a typical user, used to keep design decisions focused on real needs.',
        'It is not a real individual, not a statistical average, and not a marketing segment with a stock photo.',
        'Fresh Batch example first: Hassan is built from four notes of the study (1, 3, 6, 11). Then each team does it with its own report.',
      ],
      script:
        'A persona is one made-up person who stands for a group. Made-up, but not invented: every line comes from your notes. We use it for one thing: to decide. When the team argues about a feature, we ask what Hassan needs. It is not a real person, and it is not a stereotype.',
      tip: 'Read the statement, then click the three points one at a time. Before each click give 5 seconds of silent thinking (“what would go wrong here?”). Nobody answers aloud. Say clearly: our example is the bakery, then you do it for your project.',
    },
  ),

  /* 13 · versus: guessed vs evidence-based persona (3 min) */
  slide4(
    2,
    'comparison_think',
    {
      kind: 'versus',
      heading: {
        title: 'Guessed or Evidence-Based?',
        subtitle: 'Two personas for the same bakery',
        badge: { icon: 'scale', label: 'Compare', value: 'Guess vs evidence' },
      },
      leftLabel: 'GUESSED persona',
      rightLabel: 'EVIDENCE-BASED persona',
      leftTone: 'warn',
      rightTone: 'good',
      rows: [
        { icon: 'users', left: '“Tech-loving baker, 30, wants a modern look”', right: 'Hassan, 52, 25 years a baker, glasses, reads two languages' },
        { icon: 'heart', left: 'Written in an hour, from our own ideas', right: 'Written from 12 notes from 2 nights in the hall' },
        { icon: 'book', left: '“He likes new gadgets and apps.”', right: '“I need to see the next thing, now.” (note 11)' },
        { icon: 'alert', left: 'Cannot be checked: who says so?', right: 'Every line has a note number you can go and read' },
      ],
      takeaway: 'Same bakery, different design. Only the evidence-based one leads to a board you read from 3 metres.',
    },
    {
      t: 3,
      points: [
        'A guessed persona usually describes the designer: young, comfortable with technology, likes what we like (the curse of knowing).',
        'An evidence-based persona can be traced: each line points to a note, a quote or a pattern.',
        'Consequence for design: the guessed one pushes towards a modern app; the real one points to something readable at a distance, with busy hands.',
      ],
      script:
        'Same bakery, two personas. On the left, we guessed: a young baker who loves gadgets. It sounds nice, but nobody can check it. On the right, Hassan: 52, glasses, his own words from note 11. Each line has a number. The first persona leads to a fashionable app. The second leads to a plan you can read from across the hall.',
      tip: 'Show the GUESSED side of a row, give 5 seconds of silent thinking (“is this checkable?”), then click the switch to reveal the evidence side. Repeat per row. No question to the room.',
    },
  ),

  /* 14 · custom PersonaBuilderDemo (6 min) */
  slide4(
    2,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Build Hassan from Notes',
        subtitle: 'Evidence goes in, a persona comes out',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer runs it' },
      },
      component: 'PersonaBuilderDemo',
    },
    {
      t: 6,
      points: [
        'The pool holds evidence notes from the Fresh Batch study (each with its number) and four guess cards, such as “likes football” or “drinks a lot of coffee”.',
        'The lecturer places the next card: evidence snaps into a slot (goal, context, behaviour, pain point, quote) with its note number; a guess card triggers the stereotype alarm and bounces out.',
        'End: a complete persona where every line is backed by a note. This is exactly what teams do on slide 18.',
      ],
      script:
        'Here are notes from our bakery study, and a few details nobody observed. Before I place each card, decide silently on paper: does it belong on Hassan’s card, and in which slot? Now I place it. Notice the alarm when a detail has no evidence behind it: we leave it out.',
      tip: 'Click “Place next”. Before each reveal give about 10 seconds of silent thinking: students write “belongs / does not belong” on paper. Pairs may compare quietly. Never ask who was right. After the last card, point at the counter: every line backed by evidence.',
    },
  ),

  /* 15 · flipcards: anatomy of a persona (3 min) */
  slide4(
    2,
    'concept_model',
    {
      kind: 'flipcards',
      heading: {
        title: 'Anatomy of a Persona Card',
        subtitle: 'Four parts and one quote, all from your notes',
        badge: { icon: 'list', label: 'Parts', value: 'Goal · Context · Behaviour · Pain' },
      },
      cards: [
        {
          icon: 'target',
          term: 'Goal',
          front: 'What is this person trying to get done?',
          back: 'The result they want, in their words, not a feature. One short sentence, starting with a verb.',
          example: 'Hassan: get every van out at 06:00 with the right quantities.',
        },
        {
          icon: 'compass',
          term: 'Context',
          front: 'Where, when and with what do they work?',
          back: 'The place, the tools, the limits of the body and the language. Only what changes a design choice.',
          example: 'Moves between hall and office, glasses, reads Arabic and French.',
        },
        {
          icon: 'eye',
          term: 'Behaviour',
          front: 'What do we see them do today?',
          back: 'Real actions we observed, not what they say they do. This is where the workaround shows.',
          example: 'Plans on the whiteboard, answers shouting with shouting.',
        },
        {
          icon: 'alert',
          term: 'Pain points + quote',
          front: 'What hurts, and what did they say?',
          back: 'Where today fails them, plus one exact quote. Tag each line with its note number.',
          example: '“I do not need more information. I need to see the next thing, now.” (11)',
        },
      ],
      takeaway: 'Short lines, no invented details, a note number after every line.',
    },
    {
      t: 3,
      points: [
        'Goal, context, behaviour and pain points are the parts that drive design decisions. A quote makes the person real and comes straight from an interview or think-aloud.',
        'Each line stays short and carries the number of the supporting note: that is how a persona stays honest.',
        'Name and age are fine as a handle for the team. A stock photo, hobbies and family details are decoration unless the notes show they matter.',
      ],
      script:
        'Four parts. Goal: what they try to get done. Context: where and with what. Behaviour: what we actually saw. Pain points: where it hurts, with one quote in their own words. After every line, write the number of the note it comes from. In our case, Hassan’s pain points come from notes 3 and 6, his quote from note 11.',
      tip: 'Flip the four cards in order. Before each flip give 5 seconds of silent thinking (“what would I write here for the baker?”). Do not ask students to answer aloud. Tell teams their cards go on paper in the practice, not on a screen.',
    },
  ),

  /* 16 · custom BadPersonaDemo (4 min) */
  slide4(
    2,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: A Flawed Persona',
        subtitle: 'Which details change a design decision?',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer runs it' },
      },
      component: 'BadPersonaDemo',
    },
    {
      t: 4,
      points: [
        'A flawed poster: stock photo, “loves football”, “drinks coffee”, “two kids”, “wants a modern look”.',
        'Test for each detail: would it change a design decision? Keep it or drop it, with a one-line reason.',
        'The pruned persona keeps only decision details: hands busy, reads French less easily, works 2 to 4 metres from the board.',
      ],
      script:
        'This poster looks nice but it is useless. For each detail ask one question: if this were different, would we design differently? Football: no. Two children: no. Hands busy and reading French with difficulty: yes, completely. Keep what changes a decision, drop the rest.',
      tip: 'Click each detail in turn. Before each verdict give 5 seconds of silent thinking: students write keep or drop on paper. Pairs may compare quietly. Nobody answers aloud. At the end, point at the usefulness meter.',
    },
  ),

  /* 17 · flipcards: how many personas (3 min) */
  slide4(
    2,
    'concept_model',
    {
      kind: 'flipcards',
      heading: {
        title: 'How Many Personas?',
        subtitle: 'Few is better: one to lead, one or two to support',
        badge: { icon: 'users', label: 'Choose', value: 'Primary · Secondary · Anti' },
      },
      cards: [
        {
          icon: 'flag',
          term: 'Primary persona',
          front: 'Who must the design work for, above all?',
          back: 'The one person whose needs decide the design when needs clash. If they are happy, the design works.',
          example: 'Hassan, head baker: he decides the night plan.',
        },
        {
          icon: 'users',
          term: 'Secondary persona',
          front: 'Who else uses it, with different needs?',
          back: 'A different user whose needs we add where they do not hurt the primary. Keep one or two at most.',
          example: 'Salma, oven baker: floury hands, 4 m from the board.',
        },
        {
          icon: 'hand',
          term: 'Anti-persona',
          front: 'Who are we NOT designing for?',
          back: 'Someone who asks for features but is not a target user. Naming him helps us say no politely.',
          example: 'The owner’s nephew who wants charts and dashboards.',
        },
      ],
      takeaway: 'One primary persona is enough to start. Your team writes one today.',
    },
    {
      t: 3,
      points: [
        'Too many personas dilute the focus: a small set (one primary, one or two secondary) is easier to design for and to keep in mind.',
        'The primary persona is chosen from the study: the user whose task is most central and whose problems are most frequent.',
        'An anti-persona is a useful boundary: in the case, the nephew’s wishes (charts, dashboards) have no user evidence, so they will be a Won’t later.',
      ],
      script:
        'How many personas? Fewer than you think. One primary: the person we design for first. Maybe a secondary with different needs. And an anti-persona: someone we are not designing for. In our bakery, Hassan is primary, Salma secondary, and the owner’s nephew, who wants dashboards, is the anti-persona. Today your team writes one primary persona.',
      tip: 'Flip the three cards in order. Before each flip give 5 seconds of silent thinking (“who would this be in the bakery?”). No question to the room. Tell teams: only the primary persona is written in the practice; secondary comes later if time allows.',
    },
  ),

  /* 18 · activity: write your persona card (8 min) */
  slide4(
    2,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Your Persona Card',
        subtitle: 'One primary persona, every line tagged',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 8 min' },
      },
      label: 'Practice · Act 2',
      chip: 'TEAM OF TWO · 8 MINUTES',
      title: 'Write your primary persona on paper',
      steps: [
        { text: 'Open your **Session 3 User Study Report**: the 12 or so observation notes, the quotes, the audience profile. Number every note.' },
        { text: 'Choose the **one user** your notes describe best. Give a first name and age. Write a **short line** for each part: **goal, context, behaviour, pain points**, and **one real quote**.' },
        { text: 'After every line write the **number of the note** that supports it, for example “(3, 6)”. Use only what you saw or heard.' },
        { text: 'Write on **paper**, in words. Do not draw a screen or a picture of the interface.' },
      ],
      timerSeconds: 480,
      timerLabel: 'Practice Clock',
      goal: 'Turn your study notes into one person your team can design for, with nothing made up.',
      output: 'One persona card on paper: goal, context, behaviour, pain points and a quote, each line with its note number.',
    },
    {
      t: 8,
      points: [
        'Input: each team’s own User Study Report from Session 3 (notes, quotes, audience profile). The broken interface they started from is never changed.',
        'Model first (done on slides 14 and 15): Hassan, with notes 1, 3, 6, 11. Teams now do the same with their own notes.',
        'Good card: about 5 short lines, every line with a note number, a real quote, no hobbies or family details unless a note shows they matter.',
      ],
      script:
        'Eight minutes, at your table. Take your study report and number your notes. Choose the one person your notes describe best. Write goal, context, behaviour, pain points and one quote. After every line, write the number of the note that supports it. On paper, in words. No screens, no drawings.',
      tip: 'Start the timer. Walk the room and read over shoulders; ask quietly “which note says that?” when a line has no number. Say at minute 6: finish your quote and your tags. Never ask a team to read its card aloud.',
    },
  ),

  /* 19 · activity: check your persona (4 min) */
  slide4(
    2,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Check Your Persona',
        subtitle: 'Find the guesses hiding in your card',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 4 min' },
      },
      label: 'Practice · Act 2',
      chip: 'TEAM OF TWO · 4 MINUTES',
      title: 'Mark every unsupported line as a guess',
      steps: [
        { text: 'Read your card **line by line**, together. For each line, find the note number and **read that note again**.' },
        { text: 'If a line has **no note**, or the note does not really say it, write **G** (guess) next to it and circle it.' },
        { text: 'For each G, choose: **find a note** that supports it, **change** the line to match the notes, or **cross it out**. Keep a list of the guesses you cannot check yet.' },
      ],
      timerSeconds: 240,
      timerLabel: 'Practice Clock',
      goal: 'Make sure your persona comes from evidence, and know which parts we still have to check with real people.',
      output: 'A checked persona card: every line has a note number, or is marked G with a decision, plus a short list of open guesses.',
    },
    {
      t: 4,
      points: [
        'This is the fact-or-guess habit from Session 3 applied to the persona: a line with no note is a guess, even if it sounds likely.',
        'Typical guesses: age and job details nobody asked, hobbies, “likes technology”, feelings that were never observed or said.',
        'Open guesses are not a failure: they become questions to check with 2 real people in the Milestone 3 homework. The card is used from now on in Acts 3 to 6.',
      ],
      script:
        'Four minutes. Read each line with your partner and find its note. If a line has no note, or the note does not really say it, write a G and circle it. Then decide: find a note, change the line, or cross it out. Guesses are fine, as long as we know they are guesses. Keep this card: we use it all afternoon.',
      tip: 'Walk past tables and quietly point at a line: “which note says that?”. Praise teams that cross lines out. Keep the cards: they are the input to Act 3. Never ask teams to share their guesses aloud.',
    },
  ),
];
