import { slide3 } from '../session3Helpers';
import type { Slide3 } from '../session3Types';

/**
 * Session 3, act 5 · MAKING SENSE (40 min, slides 50-60 of the plan).
 * Minutes: 1 + 3 + 4 + 7 + 3 + 4 + 2 + 3 + 3 + 4 + 6 = 40.
 */
export const ACT_5_SLIDES: Slide3[] = [
  // 50 · divider (1 min)
  slide3(
    5,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 5,
      title: 'Making Sense',
      question: 'What do all these notes tell us about our users?',
      learn: [
        'Group notes to find patterns',
        'Turn a pattern into one clear sentence',
        'Assemble insights into an audience profile',
      ],
    },
    {
      t: 1,
      points: [
        'Announce the act: we have learned to watch and to ask; now we turn the notes into knowledge about a group of users.',
        'The act ends with an audience profile, the main thing Session 4 will start from.',
        'Everything is done on paper notes, in words only: no screens to draw.',
      ],
      script:
        'You now know how to plan a study, how to watch people and how to ask them. But a pile of notes is not an answer. This part turns notes into a clear picture of who your users are. That picture is what we hand to the next session.',
      tip: 'Pause for a breath: topic switch. Nobody needs to speak.',
    },
  ),

  // 51 · narrative (3 min)
  slide3(
    5,
    'concept_model',
    {
      kind: 'spotlight',
      heading: { title: 'A Pile of Notes Is Not Yet Knowledge', subtitle: 'Look for what comes back again and again' },
      statement: 'One note is a story. The same thing seen many times is a pattern, and a pattern is what you can trust.',
      points: [
        { icon: 'list', lead: 'Collect', text: 'One idea per note, in the words you heard or saw.' },
        { icon: 'layers', lead: 'Group', text: 'Put notes that say a similar thing next to each other.' },
        { icon: 'flag', lead: 'Name', text: 'Give each group a short name: that name is your pattern.' },
      ],
      takeaway: 'Let the groups come from the notes, not from what you expected to find.',
    },
    {
      t: 3,
      points: [
        'Affinity diagramming: write one observation per note, move notes into groups by similarity, then name each group. It is a standard method in design research.',
        'Groups should emerge from the data. Forcing notes into groups chosen in advance is confirmation bias, as warned in Act 4.',
        'A pattern seen with several people is stronger than one vivid story from one person.',
      ],
      script:
        'Imagine fifty notes spread on a table. Reading them one by one tells you little. Now put similar notes together. Suddenly you see that many people hesitated at the same place. That repeated thing is a pattern. Next, I will show you how it looks.',
      tip: 'Read the big statement aloud, then click to reveal Collect, Group and Name one at a time; pause 5 seconds of silent thinking before each. Use Study Room Booking and Imane as the example. Do not ask the room anything.',
    },
  ),

  // 52 · AffinityWallDemo (4 min)
  slide3(
    5,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: The Affinity Wall',
        subtitle: 'Watch me group notes about Imane into patterns',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'AffinityWallDemo',
    },
    {
      t: 4,
      points: [
        'Sample notes come from the Study Room Booking project. They are illustrative sample data, not real research.',
        'Move notes one at a time and say aloud why a note belongs to a group. Include one note that does not fit, and say so.',
        'Finish by naming each group in a few words. Those names are the patterns.',
      ],
      script:
        'Here are notes about people trying to book a room. I read one. I read the next. This one is similar, so I put it next to the first. Watch the groups appear. Now I give each group a name. Those names are our patterns. In a moment, you will do the same with your partner.',
      tip: 'Think out loud while you move notes, so students hear the reasoning. Do not ask anyone to suggest a group: you do the dragging and talking.',
    },
  ),

  // 53 · activity: team affinity (7 min)
  slide3(
    5,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Group the Notes',
        subtitle: 'Find the patterns in your own notes with your partner',
        badge: { icon: 'clock', label: 'Practice', value: '7 minutes' },
      },
      label: 'Affinity · Team of two',
      chip: 'TEAM OF TWO · 7 MINUTES',
      title: 'Sort your own notes into groups',
      steps: [
        { text: 'Gather **your own notes** from the replay, the think-aloud and the interview. Write **one idea per paper strip**.' },
        { text: 'Read them **quietly**. Put strips that say a **similar thing** next to each other.' },
        { text: 'End with **3 to 5 groups**. A strip that fits nowhere can stay alone.' },
        { text: 'Write a **short name** for each group on paper.' },
      ],
      timerSeconds: 420,
      timerLabel: 'Practice Clock',
      goal: 'Find what comes back again and again in a pile of notes.',
      output: 'Three to five named groups of paper strips on your table.',
    },
    {
      t: 7,
      points: [
        'No handout: each team uses its own notes from the three earlier practices (replay notes, think-aloud notes, interview notes), about 10 to 15 observations per team. They tear notebook paper into strips, one idea per strip.',
        'Healthy result: 3 to 5 groups, a few strips left alone. Warning signs: one giant group, or a group for every single strip.',
        'Group names should describe the problem (“could not tell if the room was held”), not the topic (“rooms”).',
      ],
      script:
        'Take the notes you wrote today: the replay, the think-aloud and the interview. Write one idea on each paper strip. Read them quietly, move similar strips together, then name each group. Work with your partner. There is no right answer, only groups you can explain. You have seven minutes.',
      tip: 'Before the clock starts, remind teams to tear a page into strips (or use sticky notes). A team with no paper can number its notes and write the numbers into 3 or 4 boxes. A team with very few notes can add what it remembers from the replay. Walk between tables and speak quietly, asking “why are these two together?”. Never ask a team to present.',
    },
  ),

  // 54 · InsightBuilderDemo (3 min)
  slide3(
    5,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: From Pattern to Insight',
        subtitle: 'Watch me turn one group into a clear sentence',
        badge: { icon: 'bulb', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'InsightBuilderDemo',
    },
    {
      t: 3,
      points: [
        'An insight sentence has three parts: [Who] needs [what] because [why]. It says what the person needs and the reason, not a feature.',
        'Build one sentence from the Study Room Booking pattern, showing a weak version first (“the screen is confusing”), then the strong one.',
        'Check each part: Who is specific? Is the need free of a solution? Does the why come from the notes?',
      ],
      script:
        'A pattern is a group name. An insight is a sentence you can act on. Watch: Who? Imane, a student. What does she need? To know right away that her room is held. Why? Because otherwise she keeps checking and cannot study. That sentence is something a team can use.',
      tip: 'Fill the three parts yourself, slowly. Point out that the sentence does not say how to fix it: fix ideas come later, in words.',
    },
  ),

  // 55 · activity: one insight sentence (4 min)
  slide3(
    5,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Write One Insight',
        subtitle: 'One sentence from your biggest group',
        badge: { icon: 'clock', label: 'Practice', value: '4 minutes' },
      },
      label: 'Insight · Team of two',
      chip: 'TEAM OF TWO · 4 MINUTES',
      title: 'Write your insight sentence',
      steps: [
        { text: 'Pick the **biggest group** of strips on your table.' },
        { text: 'Write on paper: **[Who]** needs **[what]** because **[why]**.' },
        { text: 'Read it with your partner. Does it say **what the person needs**, not what to build? Improve it together.' },
      ],
      timerSeconds: 240,
      timerLabel: 'Practice Clock',
      goal: 'Say what you learned in one sentence that others can use.',
      output: 'One insight sentence on paper.',
    },
    {
      t: 4,
      points: [
        'Common errors: a solution inside the need (“needs a bigger button”), a vague who (“users”), a why that is only a guess.',
        'The same group can give more than one insight; one is enough today.',
        'These sentences are raw material for the audience profile and the Milestone 2 report: keep the paper.',
      ],
      script:
        'Choose your biggest group. Write the sentence: who needs what, because why. Then read it with your partner and ask: does it say what the person needs, or what we should build? Four minutes.',
      tip: 'Walk the room. Read over shoulders and give private hints such as “who exactly?”. Do not collect or read sentences aloud.',
    },
  ),

  // 56 · rules: triangulation (2 min)
  slide3(
    5,
    'concept_model',
    {
      kind: 'flipcards',
      heading: { title: 'Never Trust One Source Alone', subtitle: 'Triangulation: three ways to look at the same thing' },
      cards: [
        {
          icon: 'eye',
          term: 'Seen',
          front: 'What did you watch people do?',
          back: 'What you watched people do: hesitations, wrong clicks, workarounds.',
          example: 'Method: observation',
        },
        {
          icon: 'users',
          term: 'Heard',
          front: 'What did people tell you?',
          back: 'What people told you: their stories, reasons and surprises.',
          example: 'Method: interview, think aloud',
        },
        {
          icon: 'chart',
          term: 'Measured',
          front: 'What do the numbers show?',
          back: 'What the numbers show: how many people, how often, how long.',
          example: 'Method: survey, usage data',
        },
      ],
      takeaway: 'When seen, heard and measured agree, you can trust the finding. When they differ, dig deeper.',
    },
    {
      t: 2,
      points: [
        'Triangulation: confirm a finding with different methods, sources or people. Each method has blind spots; others cover them.',
        'Link back to the say-do gap in Act 2: what people say can differ from what they do, so pair interviews with observation.',
        'A disagreement is not a failure: it is where the most interesting discoveries are.',
      ],
      script:
        'One user can mislead you. One method can mislead you. So we look from three sides: what we saw, what we heard, what we measured. If they agree, trust it. If they disagree, ask why.',
      tip: 'Flip the cards one at a time (Seen, Heard, Measured); before each flip, give 5 seconds of silent thinking on the front question. Give a quick Imane example: she says the app is fine (heard), but you saw her re-check three times (seen). Keep it a lecturer story, no questions to the room.',
    },
  ),

  // 57 · PriorityMatrixDemo (3 min)
  slide3(
    5,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: What Matters Most',
        subtitle: 'How often it happens against how bad it is',
        badge: { icon: 'grid', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'PriorityMatrixDemo',
    },
    {
      t: 3,
      points: [
        'Two questions per finding: how often does it happen, and how bad is it when it does? Place it on a 2x2 grid.',
        'Often and bad goes first into the profile. Rare and mild can wait. Often but mild and rare but severe need a judgement call.',
        'The problems on the grid are illustrative samples for Study Room Booking. Teams do this with their own findings, in words.',
      ],
      script:
        'You will always find more problems than you can report. So ask two questions: how often does it happen, and how bad is it? I place each problem on the grid. Top right matters most. This tells us what the profile of our users must say clearly.',
      tip: 'Move the problems yourself and give the reason for each position. Close by saying that the strongest findings go into the audience profile next.',
    },
  ),

  // 58 · narrative: from insights to an audience profile (3 min)
  slide3(
    5,
    'concept_model',
    {
      kind: 'tiles',
      heading: { title: 'From Insights to an Audience Profile', subtitle: 'One short picture of the group you study, not one invented person' },
      tiles: [
        { icon: 'users', name: 'Who they are', tells: 'The group, in a few plain words.', when: 'Describe many people, not one person.', tag: 'Part 1' },
        { icon: 'target', name: 'What they do', tells: 'Their main task and goal.', when: 'The task many of them share.', tag: 'Part 2' },
        { icon: 'compass', name: 'Where and when', tells: 'The place, the moment, the device.', when: 'The context seen in your notes.', tag: 'Part 3' },
        { icon: 'bulb', name: 'What they need', tells: 'Needs, taken from your insights.', when: 'Say the need, not the solution.', tag: 'Part 4' },
        { icon: 'alert', name: 'What hurts', tells: 'Pain points, taken from your insights.', when: 'Back each one with a note, or mark a guess.', tag: 'Part 5' },
      ],
      takeaway: 'Every line comes from your notes. If you cannot point to a note, it is a guess: mark it as one.',
    },
    {
      t: 3,
      points: [
        'The profile describes a group: the people who share a task and a context. It is not a persona. Personas (one described character built from the profile) come in Session 4.',
        'Five parts: who they are, what they try to do, where and when, what they need, what hurts. Needs and pain points come straight from the insight sentences.',
        'It is the first section of the User Study Report and the main input of Session 4. Unsupported lines must be marked as guesses.',
      ],
      script:
        'Now we put the insights together. An audience profile is a short description of the group of people who do the task: who they are, what they try to do, where and when, what they need, and what hurts. It is about a group, not one made-up person. Making a persona is Session 4. This profile is what Session 4 starts from.',
      tip: 'Click the five tiles in order, pausing 5 seconds of silent thinking before each one. Say clearly and twice that it is a group, not a persona, and that it is the main input of Session 4. Keep the example on Imane’s group (students who book study rooms). No questions to the room.',
    },
  ),

  // 59 · AudienceProfileDemo (4 min)
  slide3(
    5,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Build an Audience Profile',
        subtitle: 'Watch scattered insights become one profile card',
        badge: { icon: 'users', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'AudienceProfileDemo',
    },
    {
      t: 4,
      points: [
        'Scattered insights about Imane’s group (students booking study rooms) assemble, one by one, into the five parts of a profile card. The notes are illustrative sample data.',
        'Say where each line comes from: which insight or note supports it. Mark one line as a guess to check.',
        'The card describes the group. Keep it short: one line per part.',
      ],
      script:
        'Here are the insights we found about students who book study rooms. I move each one to the part of the profile where it belongs: who they are, what they try to do, where and when, what they need, what hurts. Notice that every line comes from a note. This one is only a guess, so I mark it. This is one card for the whole group.',
      tip: 'You do all the clicking and talking. Point at the source note for each line. Tell teams they will do the same on paper in a moment, alone with their partner.',
    },
  ),

  // 60 · activity: draft the audience profile (6 min)
  slide3(
    5,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Draft Your Audience Profile',
        subtitle: 'Five lines about the group of your own users',
        badge: { icon: 'clock', label: 'Practice', value: '6 minutes' },
      },
      label: 'Audience profile · Team of two',
      chip: 'TEAM OF TWO · 6 MINUTES',
      title: 'Write your 5-line profile card',
      steps: [
        { text: 'Write **one line for each part**: who they are, what they try to do, where and when, what they need, what hurts.' },
        { text: 'Use **your own notes** and insight sentence. Mark any line you cannot back with a note as a **guess**.' },
        { text: 'Read the card with your partner. It must describe a **group**, not one person.' },
      ],
      timerSeconds: 360,
      timerLabel: 'Practice Clock',
      goal: 'Describe the group of people you study, with evidence from your notes.',
      output: 'A 5-line profile card on paper, one line per part.',
    },
    {
      t: 6,
      points: [
        'Teams use their Session 2 audit notes, their idea sentence from Act 1 and the notes and insight from this act.',
        'Common errors: describing one person by name, writing “everyone”, putting solutions in the needs line.',
        'The card is the first draft of section one of the User Study Report. Teams will refine it with real data from their study. Keep the paper.',
      ],
      script:
        'Write your profile card: five lines, one for each part. Use your own notes. If a line is only a guess, mark it. It describes a group of people, not one person. Six minutes. This card is what you bring to the studio and, later, to Session 4.',
      tip: 'Walk the room and give private hints such as “is this a group or one person?”. If a team has few notes, let them mark more lines as guesses. Never ask teams to read their card aloud.',
    },
  ),
];
