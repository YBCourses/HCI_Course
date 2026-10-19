import { slide3 } from '../session3Helpers';
import type { Slide3 } from '../session3Types';

/**
 * SESSION 3 · ACT 4 · METHODS IN PRACTICE (65 min, slides 31-49 of the v2 plan).
 * Merges the old observe, think aloud and interview acts.
 * Minutes per slide: 1 + 3 + 3 + 4 + 3 + 2 + 3 + 4 + 4 + 2 + 3 + 3 + 10 + 2 + 2 + 3 + 3 + 2 + 8 = 65.
 */
export const ACT_4_SLIDES: Slide3[] = [
  // 31 · divider (1 min)
  slide3(
    4,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 4,
      title: 'Methods in Practice',
      question: 'How do we watch, listen and ask so that we learn something true?',
      learn: [
        'Watch people at work, and tell what you saw from what you think',
        'Hear thoughts with think aloud, and collect stories in an interview',
        'Practise both with your partner, at your own table',
      ],
    },
    {
      t: 1,
      points: [
        'You chose methods in the last act. This act is about doing them well: watching, thinking aloud, interviewing.',
        'Three long practice slots follow. All of them happen in the team of two, seated together, never in front of the room.',
      ],
      script:
        'You know which method fits which question. Now we learn the craft. First how to watch someone do a task, then how to hear their thoughts, then how to ask for their stories.',
      tip: 'Say clearly that every practice is private, inside the team of two. Nobody will perform for the room.',
    },
  ),

  // 32 · narrative (3 min)
  slide3(
    4,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'Go to the User',
        subtitle: 'Master and apprentice',
        badge: { icon: 'users', label: 'Method', value: 'Contextual inquiry' },
      },
      statement: 'The user is the master. You are the apprentice. Watch them work in their own place and ask when you do not understand.',
      points: [
        { icon: 'users', lead: 'Master', text: 'The user knows the work and shows it.' },
        { icon: 'eye', lead: 'Apprentice', text: 'You watch and learn. You do not teach.' },
        { icon: 'compass', lead: 'Real place', text: 'Their desk, their phone, their noise.' },
      ],
      takeaway: 'Do not ask people to describe their work. Ask them to show it.',
    },
    {
      t: 3,
      points: [
        'Contextual inquiry comes from Beyer and Holtzblatt (Contextual Design, 1998): learn about work by watching it where it happens.',
        'The master and apprentice picture is their own image for the relationship between researcher and user.',
        'In class we cannot visit Imane in the library, so the recorded replay stands in for her real place.',
      ],
      script:
        'Think of a craftsman and a new apprentice. The apprentice does not give a lecture. They stand close, watch the hands, and ask: why did you do that? You will do the same with the people you study. Their place, their tools, their pace.',
      tip: 'Show the big statement first and tell the craftsman story. Then click to reveal the three points one at a time. No question to the room: before the last point, give 5 seconds of silent thinking, and students may jot down the one place where they would watch their own users.',
    },
  ),

  // 33 · rules (3 min)
  slide3(
    4,
    'concept_model',
    {
      kind: 'journey',
      heading: { title: 'Four Rules of Watching Well', subtitle: 'Rules from contextual inquiry, in plain words' },
      steps: [
        {
          icon: 'compass',
          title: 'In their place',
          short: 'Context: where the task really happens',
          detail: 'Watch people where they really do the task, with their own tools and their own noise.',
        },
        {
          icon: 'users',
          title: 'As partners',
          short: 'Partnership: you learn together',
          detail: 'The user is the expert on the work. You learn together. You are not testing them.',
        },
        {
          icon: 'check',
          title: 'Check what you think',
          short: 'Interpretation: say your guess aloud',
          detail: 'Say what you think you saw and let them correct you.',
        },
        {
          icon: 'target',
          title: 'Stay on a goal',
          short: 'Focus: one task per visit',
          detail: 'Keep the visit on one task, so your notes stay easy to compare.',
        },
      ],
      footer: 'Watch in their place, as partners, check what you think, and stay on one goal.',
    },
    {
      t: 3,
      points: [
        'Beyer and Holtzblatt name four principles: context, partnership, interpretation, focus. The third card carries two of them.',
        'Partnership means the user is not a test subject: if they feel judged, they hide their real habits.',
        'Interpretation: the observer shares a guess ("it looks like you wanted the room list first") and the user confirms or corrects it.',
        'Focus: one task per visit, such as "hold a study room", so the notes stay comparable.',
      ],
      script:
        'Four rules. In their place. As partners. Check what you think. Stay on a goal. The first two are about where and how you stand. The last two are about what you do with what you see.',
      tip: 'Click the four steps one at a time, in order. Before opening each detail, give 5 seconds of silent thinking about what the rule could mean. At the end, students write privately which rule they would find hardest, then compare with their partner for 30 seconds. No sharing in the room.',
    },
  ),

  // 34 · demo ObserverCompareDemo (4 min)
  slide3(
    4,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Two Observers',
        subtitle: 'The same person, one observer who helps and one who waits',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'ObserverCompareDemo',
    },
    {
      t: 4,
      points: [
        'Two recordings side by side: an observer who interrupts and helps, and an observer who stays silent.',
        'Before the reveal, each student writes on paper which observer learned more, and why.',
        'The aha: the helping observer hides the very problems the study was meant to find.',
      ],
      script:
        'Same person, same task, two observers. On your paper, write which observer will learn more about how this person really works, and why. Take a moment. Now let us watch both. Notice what the helpful observer never gets to see.',
      tip: 'Run both recordings yourself. Give 30 seconds of silent writing, then 30 seconds with the partner. Nobody has to speak to the room.',
    },
  ),

  // 35 · compare (3 min)
  slide3(
    4,
    'comparison_think',
    {
      kind: 'versus',
      heading: { title: 'I Saw, or I Think?', subtitle: 'A fact can be recorded. A guess cannot.' },
      leftLabel: 'I saw (a fact)',
      rightLabel: 'I think (a guess)',
      leftTone: 'good',
      rightTone: 'warn',
      rows: [
        {
          icon: 'eye',
          left: 'What a camera could record: actions, words, times.',
          right: 'A guess about a feeling, a belief or a cause.',
        },
        {
          icon: 'users',
          left: 'Anyone watching would write the same.',
          right: 'Another observer might guess differently.',
        },
        {
          icon: 'clock',
          left: 'Example: “She pauses 6 seconds, then clicks Hold.”',
          right: 'Example: “She is confused.”',
        },
        {
          icon: 'flag',
          left: 'Keep it as written.',
          right: 'Mark it, then check it.',
        },
      ],
      takeaway: 'Write facts first. Put every “I think” in its own column, then check it.',
    },
    {
      t: 3,
      points: [
        'Test for a fact: could a camera record it? If yes, it is a fact. If it needs a mind to read, it is an interpretation.',
        'Interpretations are not bad. They become useful once they are marked as guesses and later checked with the person.',
        'Words like confused, annoyed, lazy, obviously and probably are the usual signs of a guess hiding in a fact column.',
        'Three columns will be used in the practice: SAW (facts with a time), FELT (what they seem to feel), THOUGHT (why you think it happened).',
      ],
      script:
        'Two sentences can look the same and be very different. She pauses six seconds: that is a fact. She is confused: that is my guess. Both are fine in your notes, as long as you know which is which, and you keep them apart.',
      tip: 'Start on the "I saw" side and click the switch to "I think" for each row. Before each switch, give 5 seconds of silent thinking: what would the other side say? Students silently sort two example sentences on paper, then compare with their partner. The lecturer gives the answer.',
    },
  ),

  // 36 · rules (2 min)
  slide3(
    4,
    'concept_model',
    {
      kind: 'flipcards',
      heading: { title: 'Three Biases That Spoil Notes', subtitle: 'Three ways a good observer goes wrong' },
      cards: [
        {
          icon: 'eye',
          term: 'The observer effect',
          front: 'Why might a person act differently when watched?',
          back: 'People act differently when they know they are watched. They try harder or hide mistakes.',
          example: 'Cure: stay calm, stay quiet.',
        },
        {
          icon: 'hand',
          term: 'Leading the user',
          front: 'How can a nod or a question put words in their mouth?',
          back: 'A hint, a nod or a question like “Is it hard to find?” puts your answer in their head.',
          example: 'Cure: no hints, no nods.',
        },
        {
          icon: 'brain',
          term: 'Seeing what you expected',
          front: 'What do we notice when we already have an idea?',
          back: 'You notice what fits your idea and miss the rest. This is called confirmation bias.',
          example: 'Cure: note the surprises.',
        },
      ],
      takeaway: 'You cannot remove these biases. You can reduce them, and write down when they may have acted.',
    },
    {
      t: 2,
      points: [
        'Observer effect: close to the Hawthorne effect, where people change behaviour because they are being studied. Reduce it by saying the study is about the task, not about them.',
        'Leading: any hint or question that suggests the answer, including body language.',
        'Confirmation bias: we favour evidence that agrees with what we already believe. Counter it by writing down what surprised you.',
      ],
      script:
        'Three traps. First, people change when watched. Second, we lead them without meaning to. Third, we see what we expected. You cannot delete these, but you can know them, and say in your notes: here I may have led the person.',
      tip: 'Flip the cards one at a time. Before each flip, read the question on the front and give 5 seconds of silent thinking. After each flip, add a short example of your own. The next slide lets students find them silently, so no questions now.',
    },
  ),

  // 37 · demo SpotTheBiasDemo (3 min)
  slide3(
    4,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Spot the Bias',
        subtitle: 'Short lines from research notes: which bias is hiding?',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'SpotTheBiasDemo',
    },
    {
      t: 3,
      points: [
        'The lecturer shows one short statement from research notes at a time.',
        'Each student writes the bias on paper (observer effect, leading, expected) before the reveal.',
        'Some statements hide no bias at all: that is part of the exercise.',
      ],
      script:
        'A line from someone’s notes. Read it. On your paper, write which bias is hiding in it, or none. Now compare with your partner. Then I show you the answer, and where in the sentence it hides.',
      tip: 'Control the pace: about 20 seconds of silent thinking per statement. Never ask a student to give an answer aloud.',
    },
  ),

  // 38 · demo SessionReplayTimeline (4 min)
  slide3(
    4,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Imane’s Day, With a Timeline',
        subtitle: 'The same task again, with the pauses and back-steps marked',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'SessionReplayTimeline',
    },
    {
      t: 4,
      points: [
        'Same recording as in Act 1: Imane doing her task today (holding a study room), now with a timeline of pauses, back-steps and wrong clicks.',
        'Students compare what the timeline shows with the predictions they wrote in Act 1.',
        'The timeline shows where time was lost, not why. The why is for think aloud and interviews.',
      ],
      script:
        'You watched Imane do her task at the start of the day. Now I add a timeline. Every dot is a moment: a pause, a step back, a click that did nothing. Look at your own predictions: where were you right, and where were you surprised?',
      tip: 'Play it once through, then click a few dots yourself and read the sentence aloud. Students check their Act 1 predictions silently with the partner. Say nothing about causes yet.',
    },
  ),

  // 39 · activity: notes in three columns (4 min)
  slide3(
    4,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Take Notes',
        subtitle: 'Three columns: saw, felt, thought',
        badge: { icon: 'clock', label: 'Practice', value: '4 minutes' },
      },
      label: 'Practice · Observation notes',
      chip: 'TEAMS OF TWO · 4 MINUTES',
      title: 'Watch Imane and take notes',
      steps: [
        { text: 'Each of you takes a page and draws **three columns**: **SAW**, **FELT**, **THOUGHT**.' },
        { text: 'Watch Imane do her task in **silence**. In **SAW**, write the **time** and what happened.' },
        { text: 'In **FELT**, what she seems to feel. In **THOUGHT**, **why** you think it happened. Write **alone**.' },
        { text: 'When it ends, keep your page and compare it with your partner.' },
      ],
      timerSeconds: 240,
      timerLabel: 'Notes Clock',
      goal: 'Practise keeping what you saw apart from what you think.',
      output: 'Two note pages with three columns, to compare with the lecturer’s notes.',
    },
    {
      t: 4,
      points: [
        'The lecturer plays Imane’s recording once more without commentary (go back one slide, press Restart, do not click the dots). Students write alone.',
        'Common mistake: guesses in the SAW column (“she is lost”). Do not correct it now: the next slide does that.',
        'After the replay, partners compare pages for about 2 minutes.',
      ],
      script:
        'Take a page. Three columns. Saw, felt, thought. I play Imane’s task again. In the first column only facts with a time. Your feelings and your reasons go in the other two. Write alone. After the replay, compare with your partner.',
      tip: 'Walk the room quietly and read over shoulders only if invited. Do not comment on pages yet: the lecturer’s notes come next.',
    },
  ),

  // 40 · table: lecturer's notes (2 min)
  slide3(
    4,
    'debrief',
    {
      kind: 'factcheck',
      heading: {
        title: 'My Notes of the Replay',
        subtitle: 'Which lines are facts, and which are guesses?',
        badge: { icon: 'list', label: 'Reveal', value: 'Lecturer notes' },
      },
      rows: [
        {
          note: '0:06 Opens Rooms, returns at 0:10, types a code',
          verdict: 'fact',
          why: 'A camera records it. She left the form and came back to type the code.',
        },
        {
          note: '0:29 Hovers on Hold for 6 s',
          verdict: 'fact',
          why: 'A clock and a cursor show it. The note says what happened, not why.',
        },
        {
          note: 'She thinks Hold means booked',
          verdict: 'guess',
          why: 'We cannot see thoughts. Write “I think”, then ask her afterwards.',
        },
        {
          note: 'The orange banner distracts her',
          verdict: 'guess',
          why: 'She clicked the banner once and nothing changed. Why is our guess.',
        },
        {
          note: '0:35 Clicks Hold: message goes, nothing changes',
          verdict: 'fact',
          why: 'No confirmation appears. A solid fact, worth asking about.',
        },
      ],
      footer: 'Check your own SAW column: if a camera could not record it, it is a guess.',
    },
    {
      t: 2,
      points: [
        'These are the lecturer’s own notes of Imane’s recording (hold a study room). Three lines are facts, two are interpretations.',
        'Test for each line: could a camera record it? Times, clicks and pauses yes; beliefs and causes no.',
        'The interpretations are not wrong. They are guesses that need checking, for example with think aloud or an interview.',
        'A guess about the person (“bad with computers”) never belongs in the notes: it blames the person instead of looking at the task.',
      ],
      script:
        'Here are my notes of the same replay. Three lines are facts. Two are guesses: that she thinks Hold means booked, and that the banner distracted her. Now look at your SAW column. Which of your lines would a camera not record? Move those to the THOUGHT column.',
      tip: 'Read each note aloud and give 5 seconds of silent thinking (fact or guess?) before you click the row to reveal FACT or GUESS and the reason. Students then check their own pages privately, then with the partner. Nobody has to say how many lines they moved.',
    },
  ),

  // 41 · rules: think aloud + facilitator rules (3 min)
  slide3(
    4,
    'concept_model',
    {
      kind: 'checklist',
      heading: { title: 'Think Aloud: Say What You Think', subtitle: 'A person talks while doing the task' },
      items: [
        {
          icon: 'activity',
          title: 'The person speaks',
          text: 'They say what they look at, expect and find confusing, like a sports commentator.',
        },
        {
          icon: 'hand',
          title: 'You do not help',
          text: 'No hints, no explaining, no “try this”. Help hides what you came to learn.',
        },
        {
          icon: 'timer',
          title: 'Say “keep talking”',
          text: 'If they go quiet, say only those words, then wait.',
        },
        {
          icon: 'brain',
          title: 'Answer with a question',
          text: 'If they ask “Is this right?”, ask “What do you think?”.',
        },
      ],
      footer: 'You cannot see a thought, but you can hear it. Stay quiet and let them talk.',
    },
    {
      t: 3,
      points: [
        'Think aloud is a standard method: the person verbalises thoughts while doing a task; the observer records.',
        'Neutral prompts only: “keep talking”, “what are you thinking now?”. Never “try the blue button”.',
        'Caveat: talking can slightly change how people work, and people forget to talk on hard steps. Remind them gently.',
        'If a person is stuck for a long time, the stuck moment is the finding: note it, wait, and move on only after a long silence.',
      ],
      script:
        'In think aloud, a person does the task and says out loud what they think. Imagine Imane saying: I expected a confirmation here, but nothing changed. Now we know why she hesitated. As the observer, your job is hard: do not help, do not explain, and if she goes silent say only: keep talking.',
      tip: 'Click once per item to tick the next rule in. Pause 5 seconds of silent thinking before each click (what would you do as observer?), then say the rule with Imane as the example. Do not ask anyone to demonstrate. Warn them: in the practice that follows, every observer will feel the urge to help.',
    },
  ),

  // 42 · demo ThinkAloudTranscriptDemo (3 min)
  slide3(
    4,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: A Think-Aloud Transcript',
        subtitle: 'Imane thinks aloud; find where her hope breaks',
        badge: { icon: 'flask', label: 'Live demo', value: 'Scripted recording' },
      },
      component: 'ThinkAloudTranscriptDemo',
    },
    {
      t: 3,
      points: [
        'The transcript is scripted (Study Room Booking, persona Imane holding a room). No student plays the user.',
        'Think first: each person silently picks the line where Imane’s expectation fails, then compares with their partner.',
        'Then the lecturer clicks the lines and shows the moment the expectation failed and what she had hoped for.',
      ],
      script:
        'Read Imane’s words quietly. Find the line where she expects one thing and gets another. Pick it silently and compare with your partner. In a moment I will click the lines and show you.',
      tip: 'Wait a full minute of silence before the reveal. Then click through the lines yourself; do not ask anyone to say their answer aloud.',
    },
  ),

  // 43 · activity: think aloud in pairs (10 min)
  slide3(
    4,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Think Aloud in Pairs',
        subtitle: 'One does a task and talks, the other watches in silence',
        badge: { icon: 'clock', label: 'Practice', value: 'Pairs · 10 min' },
      },
      label: 'Practice · Think aloud',
      chip: 'TEAMS OF TWO · 10 MINUTES',
      title: 'Think aloud, then swap',
      steps: [
        { text: '**Task:** on your phone, find **tomorrow’s weather** for a city you have never visited. Use your usual app.' },
        { text: '**Round 1 (4 min): A** does the task and says **every thought out loud**. **B** only **watches and writes**.' },
        { text: '**B** must **NOT** help, hint, explain or point. If A goes silent, say only “keep talking”.' },
        { text: '**Round 2 (4 min):** swap roles, pick another city. Last **2 min:** compare your notes.' },
      ],
      timerSeconds: 600,
      timerLabel: 'Think-aloud Clock',
      goal: 'Hear what a person thinks while doing a task, not only see what they do.',
      output: 'Two note sheets: what each person did and what they said aloud.',
    },
    {
      t: 10,
      points: [
        'Seated together at your own table, private. Rhythm: 4 minutes round 1, 4 minutes round 2, 2 minutes to compare notes. Announce the swap at the 4 and 8 minute marks.',
        'Alternative if the weather task is too easy: find the opening hours of a shop you have never been to. Harmless, no account or payment.',
        'Observer must NOT: help, hint, explain, point at the screen, answer questions, laugh or sigh. The observer writes what A does and says, in three columns: SAW, FELT, THOUGHT.',
        'Common errors: A explains instead of thinking aloud; B starts coaching; both stop talking. “Keep talking” is the only allowed sentence.',
      ],
      script:
        'Ten minutes, in your team of two, seated together. A does the task on the phone and talks the whole time. B stays completely silent and writes. B does not help, even if A is lost. After about four minutes you swap and use another city. The last two minutes are for comparing notes.',
      tip: 'Walk slowly and listen from a distance; do not stand over a pair. Intervene only to remind an observer to stay silent. Nobody reports to the room.',
    },
  ),

  // 44 · narrative: interviews collect stories (2 min)
  slide3(
    4,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'Interviews Collect Stories',
        subtitle: 'Ask about the last time, not about opinions',
        badge: { icon: 'users', label: 'Method', value: 'Interview' },
      },
      statement: 'An opinion is a guess about the future. A story about the last time is something they really lived.',
      points: [
        { icon: 'alert', lead: 'Opinion', text: '“Would you use a booking app?” People often say yes to be polite.' },
        { icon: 'book', lead: 'Story', text: '“Tell me about the last time you looked for a study room.”' },
        { icon: 'bulb', lead: 'Why it works', text: 'Stories hold details, problems and workarounds nobody mentioned.' },
      ],
      takeaway: 'Ask about the past. People predict their future badly.',
    },
    {
      t: 2,
      points: [
        'Interviews give the why behind behaviour and capture what you cannot observe: past events, feelings, context.',
        'Memory is imperfect, so ask about a recent, specific episode rather than “usually” or “in general”.',
        'People are poor at predicting their own future behaviour; this links back to the say-do gap.',
      ],
      script:
        'Do not ask people what they would do. Ask what they did. Would you use a booking app? Everybody says yes. Tell me about the last time you looked for a room: now you hear the queue, the wrong floor, the friend who booked for you.',
      tip: 'Read the statement, then click to reveal the three points one at a time. Before the "Story" point, give 5 seconds of silent thinking. Link back to the say-do gap. Invite each person to think silently of one question they were once asked that they answered just to be nice.',
    },
  ),

  // 45 · rules: three kinds of question (2 min)
  slide3(
    4,
    'concept_model',
    {
      kind: 'flipcards',
      heading: { title: 'Three Kinds of Question', subtitle: 'Closed, open and leading' },
      cards: [
        {
          icon: 'hand',
          term: 'Closed',
          front: 'What kind of answer does it get?',
          back: 'Answered with yes, no or one word. Quick, but you learn very little.',
          example: '“Did you find a room?”',
        },
        {
          icon: 'compass',
          term: 'Open',
          front: 'What does it invite the person to do?',
          back: 'Invites a story. Starts with how, what, or “tell me about”.',
          example: '“How did you book?”',
        },
        {
          icon: 'alert',
          term: 'Leading',
          front: 'What is hidden inside it?',
          back: 'Hides the answer you hope for. People tend to agree with it.',
          example: '“Was it easy to book?”',
        },
      ],
      takeaway: 'Prefer open questions. Never lead.',
    },
    {
      t: 2,
      points: [
        'Closed questions are fine for facts (age, how often); they are poor for finding out why.',
        'Open questions start with how, what, tell me about. They let the person choose what matters.',
        'Leading questions contain the answer or an opinion (“easy”, “confusing”, “don’t you think”). Answers to them are biased.',
      ],
      script:
        'Three kinds of question. Closed: yes or no. Open: tell me how. Leading: you put the answer in the question, like, was it easy to book? Almost everyone says yes. So we avoid it.',
      tip: 'Flip the cards one at a time. Before each flip, read the question on the front and give 5 seconds of silent thinking. Then ask each person to silently label one question from their past week as closed, open or leading. Do not collect the answers.',
    },
  ),

  // 46 · demo QuestionRewriterDemo (3 min)
  slide3(
    4,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Fix the Question',
        subtitle: 'A leading question appears; fix it in your head first',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'QuestionRewriterDemo',
    },
    {
      t: 3,
      points: [
        'The lecturer runs the demo; the questions are about Study Room Booking and are scripted.',
        'Think first: each person silently writes a better version, then compares with their partner.',
        'Reveal the rewrite and name what changed: the opinion word is gone and the question asks for a story.',
      ],
      script:
        'A leading question will appear on the screen. Do not say anything. Write your own better version on paper. Compare with your partner. Then I will show one possible rewrite and we will see what changed.',
      tip: 'Give a clear pause of about 30 seconds per question. Never ask anyone to read their rewrite aloud.',
    },
  ),

  // 47 · activity: rewrite five questions (3 min)
  slide3(
    4,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Rewrite Five Questions',
        subtitle: 'Turn bad questions about your users’ task into good ones',
        badge: { icon: 'clock', label: 'Practice', value: 'Teams of two · 3 min' },
      },
      label: 'Practice · Questions',
      chip: 'TEAMS OF TWO · 3 MINUTES',
      title: 'Rewrite five bad questions',
      steps: [
        { text: 'Write **5 questions** you could ask the people who do the task of your project. Write the first ones that come to mind.' },
        { text: 'Mark each one: **closed**, **open** or **leading**.' },
        { text: 'Rewrite the closed or leading ones as **open** questions: “Tell me about the last time you…”' },
      ],
      timerSeconds: 180,
      timerLabel: 'Questions Clock',
      goal: 'Practise asking so people tell stories, not polite yes-answers.',
      output: 'Five open questions about your users’ task, ready for your interview guide.',
    },
    {
      t: 3,
      points: [
        'Teams work on their own project from the list of ten interfaces, about the task its users do, not about the interface.',
        'Checkpoints: five questions written at 1 minute; marking done at 1.5; rewriting done by 2.5; then partners swap papers for a quick check.',
        'Common error: “Do you think the menu is confusing?” rewritten as “Is the menu confusing for you?” (still leading and closed). Remind them to ask for a story.',
      ],
      script:
        'Three minutes with your partner. Write five questions you might ask the people who do this task. Label each one. Then rewrite the weak ones as open questions about the last time. These questions will go into your interview guide later.',
      tip: 'Circulate and read over shoulders quietly. Point at a question and ask: “Where is the answer hidden in this question?”',
    },
  ),

  // 48 · table: interview guide with probing (2 min)
  slide3(
    4,
    'concept_model',
    {
      kind: 'journey',
      heading: {
        title: 'A Five-Part Interview Guide',
        subtitle: 'Same order every time, and how to dig without leading',
        badge: { icon: 'list', label: 'Use it on', value: 'Your interview' },
      },
      steps: [
        {
          icon: 'sprout',
          title: '1. Warm-up',
          short: '3 min: easy questions to relax them',
          detail: 'Good: “Tell me a little about your studies.” Start easy so the person feels at ease.',
        },
        {
          icon: 'book',
          title: '2. Story',
          short: '10 min: ask for the last time',
          detail: 'Bad: “Is booking easy?” Good: “Tell me about the last time you booked a room.”',
        },
        {
          icon: 'route',
          title: '3. Step by step',
          short: '7 min: dig with neutral words',
          detail: 'Probe: “Tell me more.” “What happened next?” Then wait five seconds.',
        },
        {
          icon: 'zap',
          title: '4. Magic wand',
          short: '5 min: collect wishes, not solutions',
          detail: 'Bad: “Would a map help?” Good: “With a magic wand, what would you change?”',
        },
        {
          icon: 'flag',
          title: '5. Wrap-up',
          short: '2 min: thank them, one last question',
          detail: 'Thank them. Ask: “Is there anything I should have asked?”',
        },
      ],
      footer: 'Never finish their sentence. Silence is not a problem: it is where the best details come.',
    },
    {
      t: 2,
      points: [
        'Structure: warm-up, story, step by step, magic wand (what would you change), wrap-up. The times are a guide for a 25-30 minute interview.',
        'Probing means following up with their own words and neutral prompts: tell me more, what happened next, what made you choose that? Never offer options (“was it the colour or the size?”).',
        'Silence feels long to the interviewer and short to the person thinking. Count to five in your head.',
        'The magic-wand question collects wishes without asking the person to design the solution; the designer still decides.',
      ],
      script:
        'Here is a guide you can reuse. Start easy. Then ask for the story. Then walk through it step by step, and dig with neutral words: tell me more, what happened next. Then wait. Then the magic wand. Then thank them and ask if you missed anything.',
      tip: 'Click the five steps in order. At each step, give 5 seconds of silent thinking (what would you ask here?) before you click to open its detail. Say that this exact guide is what they will finalise in the studio and use with real people. Nobody is asked to read an example aloud.',
    },
  ),

  // 49 · activity: interview each other (8 min)
  slide3(
    4,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Interview Your Partner',
        subtitle: 'One asks and listens, the other tells a story',
        badge: { icon: 'clock', label: 'Practice', value: 'Teams of two · 8 min' },
      },
      label: 'Practice · Interview',
      chip: 'TEAMS OF TWO · 8 MINUTES',
      title: 'Interview, then swap',
      steps: [
        { text: '**Round 1 (3 min): A** asks **B**: “Tell me about the last time you did a task like your project’s.”' },
        { text: 'A asks only **open questions**, then probes: “tell me more”, “what happened next?”. A writes **their words**.' },
        { text: 'A must **NOT** suggest answers, give opinions or fill the silences. B answers honestly; “I don’t remember” is fine.' },
        { text: '**Round 2 (3 min):** swap roles. Last **2 min:** tell each other one thing you learned.' },
      ],
      timerSeconds: 480,
      timerLabel: 'Interview Clock',
      goal: 'Feel what it is like to ask for a story and to hold your own ideas back.',
      output: 'Notes of one interview in your partner’s own words, and one note on what was hard to hold back.',
    },
    {
      t: 8,
      points: [
        'Seated together at your own table, private. Rhythm: 3 minutes round 1, 3 minutes round 2, 2 minutes to share a learning. Announce the swap at the 3 and 6 minute marks.',
        'The person telling picks a real, harmless episode: the last time they booked a ticket, ordered food or filled in a form. Nothing private is required.',
        'Interviewer must NOT: suggest answers, offer opinions, comment on the story, finish sentences, or interrupt silence. Only open questions and neutral probes.',
        'Common errors: starting with “Do you like…”; asking three questions at once; agreeing out loud (“yes, I hate that too”).',
      ],
      script:
        'Eight minutes, in your team of two, seated together. A is the interviewer: ask for the last time B did a similar task, and keep digging with neutral words. Write down B’s own words. Do not suggest, do not judge, do not fill the silences. After three minutes you swap. The last two minutes: tell each other one thing you learned.',
      tip: 'Listen from a distance and step in only to remind an interviewer to stay neutral. Nobody reports to the room. Close by saying they will use this skill with real people for homework.',
    },
  ),
];
