import { slide5 } from '../session5Helpers';
import type { Slide5 } from '../session5Types';

/**
 * Session 5, act 6: studio and handoff (see course/teacher/session5-plan.md).
 * Minutes: 1 + 4 + 3 + 10 + 12 + 14 + 6 + 3 + 1 + 1 = 55.
 */
export const ACT_6_SLIDES: Slide5[] = [
  // 47 · divider (1)
  slide5(
    6,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 6,
      title: 'Studio and Handoff',
      question: 'Can you build and test the structure of your own project?',
      learn: [
        'IN: your Requirements Pack, plus everything from Acts 1 to 5: things, groups, labels, structure, tree test',
        'Build your Structure Pack: inventory, groups, labels, structure and test results',
        'OUT: the Structure Pack (Milestone 4) that feeds Session 6, where the structure gets behaviour',
      ],
    },
    {
      t: 1,
      points: [
        'Last part of Session 5: a long studio where each team builds its own Structure Pack, in words and on paper.',
        'IN: the Requirements Pack from Session 4. OUT: the Structure Pack, the input of Session 6.',
      ],
      script:
        'Last part of today. You have seen the whole path: things, groups, names, structure, and a test. Now you do it for your own project, with your partner, at your table. Nobody presents. At the end you will have a Structure Pack that Session 6 will bring to life.',
      tip: 'Say that the studio is in teams of two at their own tables and nobody presents. Pause 3 seconds, then click to the next slide.',
    },
  ),

  // 48 · custom ProcessMapStructure (4)
  slide5(
    6,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'You Are Here: End of Session 5',
        subtitle: 'What Session 6 takes from your Structure Pack',
        badge: { icon: 'route', label: 'Process map', value: 'Lecturer-run' },
      },
      component: 'ProcessMapStructure',
    },
    {
      t: 4,
      points: [
        'The map shows the whole process: Session 4 gave the Requirements Pack, Session 5 turns it into a structure that has been checked with a tree test.',
        'Fresh Batch example: the inventory of 19 things, four groups (Now, Orders, Packing and Loading, Night Record), their labels, the tree and the tree-test results. That is the pack that goes to Session 6.',
        'Session 6 takes the Structure Pack and gives it behaviour: what happens when people act and what the interface says back. Without a structure there is nothing to give behaviour to.',
      ],
      script:
        'Let us look at the map again. We started with people, then needs. In session four you wrote requirements. Today you gave every requirement a place, a name and a path, and you checked the path with a test. For the bakery, that is twenty things, four groups, their names, a tree and the test results. This Structure Pack is what comes out of this stage and goes into the next one. In session six we make it move: what happens when someone acts, and what the interface says back. So your pack matters. Now you build it.',
      tip: 'Click through the stages: first the ones already done, then the "you are here" marker on Structure, then the arrow toward Session 6. Pause 5 seconds for silent thinking, then say the studio starts now. No questions to the room.',
    },
  ),

  // 49 · activity: studio rules (3)
  slide5(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio: Your Structure Pack',
        subtitle: 'Four steps, all inside your team of two',
        badge: { icon: 'clock', label: 'Studio', value: '4 steps · 42 min' },
      },
      label: 'Studio · Rules',
      chip: 'TEAMS OF TWO · FOUR STEPS',
      title: 'Your pack in four steps',
      steps: [
        { text: '**Step 1 (10 min):** list your **things** from your Requirements Pack and **group** them.' },
        { text: '**Step 2 (12 min):** **name** each group, then write your **structure** as an indented list.' },
        { text: '**Step 3 (14 min):** **test** your structure with find-it tasks, then **fix** it.' },
        { text: '**Step 4 (6 min):** check that **every Must** requirement can be reached, then **save** the pack.' },
      ],
      timerSeconds: 180,
      timerLabel: 'Read the rules',
      goal: 'Turn your requirements into a structure you can check and hand on.',
      output: 'Your Structure Pack: inventory, groups, labels, structure (indented list) and test results.',
    },
    {
      t: 3,
      points: [
        'The pack has five parts: inventory of things, groups, labels, structure, test results. Steps of 10, 12, 14 and 6 minutes.',
        'Everything is words on paper or in a shared text file: indented lists and notes. No screens, no drawings of interfaces.',
        'Work on your own project: the Requirements Pack from Session 4 is the input and the broken interface stays untouched. Use the Fresh Batch slides only as a model.',
      ],
      script:
        'Now you build your Structure Pack for your own project. Four steps. One: list the things your requirements need and group them. Two: name each group and write your structure as an indented list. Three: test it with find-it tasks, then fix what you find. Four: check that every Must requirement can be reached, and save the pack. Words only, no screens. Your Requirements Pack is your source. Read these rules silently now.',
      tip: 'Stay silent for 3 minutes while teams read. Then start the clock for step 1. Nobody presents; walk around and answer quietly at tables. Keep the Fresh Batch slides ready if a team needs a model.',
    },
  ),

  // 50 · step 1 (10)
  slide5(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 1: Things and Groups',
        subtitle: 'List what your users need, then group it',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 1 · 10 min' },
      },
      label: 'Studio · Step 1 of 4',
      chip: 'TEAMS OF TWO · 10 MINUTES',
      title: 'Inventory your things and group them',
      steps: [
        { text: 'For each requirement, list the **information**, **actions** and **words** behind it. Write **one thing per card or line**.' },
        { text: 'Each of you **sorts the cards alone** into groups that feel natural. Then compare with your partner.' },
        { text: 'Settle on **4 to 6 groups**. Note any card that **split you**: that is a design question.' },
      ],
      timerSeconds: 600,
      timerLabel: 'Step 1 Clock',
      goal: 'Know every thing your project must hold or do, and how people would group it.',
      output: 'An inventory of things (about 15 to 25) and 4 to 6 groups, with the splits marked.',
    },
    {
      t: 10,
      points: [
        'Fresh Batch model: 19 things behind R1 to R10 (next batch per oven, oven timers, order changes, packing order and so on) grouped into Now, Orders, Packing and Loading, Night Record. Cards 8, 3, 4 and 14 split people.',
        'Teams reuse the work from Acts 1 and 2: the things list and the card sort of their own project. This step tidies and finishes it; it is not new research.',
        'Every requirement of the Requirements Pack must have at least one thing behind it. A thing with no requirement behind it is a candidate to drop.',
      ],
      script:
        'Step one. Go through your requirements one by one and write the things behind each: what must be seen, what must be done, which words come up. One thing per card. Then sort them silently, each of you alone, and compare. Settle on four to six groups. Mark the cards where you disagreed: those are the real design questions. You have ten minutes.',
      tip: 'Start the clock. Walk the room quietly. Gently point out teams with a requirement that has no thing behind it, or with more than 7 groups. Announce 2 minutes left, then the end.',
    },
  ),

  // 51 · step 2 (12)
  slide5(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 2: Labels and Structure',
        subtitle: 'Name the groups, then build the tree',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 2 · 12 min' },
      },
      label: 'Studio · Step 2 of 4',
      chip: 'TEAMS OF TWO · 12 MINUTES',
      title: 'Name the groups and build the structure',
      steps: [
        { text: 'Write a **label** for each group in your **users\' own words**. Check it: **specific**, **consistent**, **no jargon**.' },
        { text: 'Write your **structure** as an **indented list**: sections, then items, **2 or 3 levels** at most.' },
        { text: 'Keep **5 to 7 choices** on each level. Show the **most important tasks** first and closest.' },
      ],
      timerSeconds: 720,
      timerLabel: 'Step 2 Clock',
      goal: 'Give every group a clear name and put everything in a structure people can follow.',
      output: 'A list of labels and one indented structure with every thing placed.',
    },
    {
      t: 12,
      points: [
        'Fresh Batch model: NOW (next batch per oven, oven timers, oven status, mark a batch as done, order changes), ORDERS, PACKING AND LOADING, NIGHT RECORD. A hub with four sections, depth 2.',
        'Label check from Act 3: use the words people use on the floor, in their language; one meaning per label; the same word for the same thing everywhere.',
        'Structure check from Act 4: few choices per level, the main tasks close to the start. Show the tree as a text list, never as a screen or a drawing of an interface.',
      ],
      script:
        'Step two. First, write a name for each group, in the words your users really use, not the words of the project team. Then write your structure as an indented list: sections at the first level, items below. Two or three levels, five to seven choices on each. Put your most important tasks where they are easiest to reach. Twelve minutes.',
      tip: 'Start the clock. Look for labels that are vague ("Other", "Misc") or office words, and for lists that go beyond 3 levels. Ask quietly: would your user choose this word? At 3 minutes left, remind them every thing must have a place.',
    },
  ),

  // 52 · step 3 (14)
  slide5(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 3: Test and Fix',
        subtitle: 'Do not trust your map: check it',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 3 · 14 min' },
      },
      label: 'Studio · Step 3 of 4',
      chip: 'TEAMS OF TWO · 14 MINUTES',
      title: 'Test your structure and fix it',
      steps: [
        { text: 'Write **3 find-it tasks** in your users\' words. Your partner, who did not write the tree, **reads only the paper tree** and says where they would look.' },
        { text: 'Record each **path**, whether it **succeeded**, and whether it was **direct**. Swap roles and run all three tasks again with the other person.' },
        { text: '**Fix one thing at a time:** change the label or move the item where people went wrong, then **retest** that task.' },
      ],
      timerSeconds: 840,
      timerLabel: 'Step 3 Clock',
      goal: 'Find where people get lost in your structure and repair it.',
      output: 'Test results: 3 tasks, paths, success and directness, the problem node and what you changed.',
    },
    {
      t: 14,
      points: [
        'Fresh Batch model: task 2 "where do you see that shop 14 changed its order?" only 7 of 12 succeeded; 5 went to ORDERS first. Fix, one change: also list Order changes under ORDERS, then retest.',
        'Within the team of two this is a mini tree test on paper: success (right place) and directness (no backtracking). The partner must not be told the answer.',
        'Change one thing at a time and retest, otherwise you cannot tell which change helped.',
      ],
      script:
        'Step three, the longest one. Write three find-it tasks for your own project, like where would you check which shop to pack first. Your partner reads only the paper tree and tells you where they would look. You write down their path, and whether it worked first time. Then swap. Where did someone go wrong? That is your problem node. Fix one thing, and retest it. Fourteen minutes.',
      tip: 'Start the clock. Remind them that the person who wrote the tree stays silent and does not hint. Announce 5 minutes left (time to swap roles) and 2 minutes left. Check quietly that each team records the problem node and the change.',
    },
  ),

  // 53 · step 4 (6)
  slide5(
    6,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Studio Step 4: Coverage Check',
        subtitle: 'Every Must reachable, then save',
        badge: { icon: 'clock', label: 'Studio', value: 'Step 4 · 6 min' },
      },
      label: 'Studio · Step 4 of 4',
      chip: 'TEAMS OF TWO · 6 MINUTES',
      title: 'Check coverage and save your pack',
      steps: [
        { text: 'Take your **Must** requirements. For each, write the **path** in your structure that reaches it and **count the steps**.' },
        { text: 'No path, or too many steps? **Move the item** or **add a second route**, then note the change.' },
        { text: '**Save** the five parts in **one file** that both of you can open: inventory, groups, labels, structure, test results.' },
      ],
      timerSeconds: 360,
      timerLabel: 'Step 4 Clock',
      goal: 'Be sure nothing important is lost and the pack is ready to hand on.',
      output: 'A coverage table (each Must, its path, its steps) and the saved Structure Pack.',
    },
    {
      t: 6,
      points: [
        'Fresh Batch model: R1 reached through NOW > Next batch per oven (1 step); R2 through NOW > Order changes (1 step after the fix); R4 through PACKING AND LOADING > Packing order (1 step from the hub).',
        'A Must with no path is a hole in the structure. A Must that takes many steps is a candidate for a shortcut or a move toward the start.',
        'Remind teams that the pack will be finished as homework (Milestone 4) with a small card sort with real people. Save in one shared file.',
      ],
      script:
        'Last step. Take your Must requirements and, for each one, write the path that reaches it in your structure, and count the steps. If there is no path, or it takes too many steps, move the item or add a second route. Then save your pack in one file you both can open. Six minutes.',
      tip: 'Start the clock. Keep it moving: only 6 minutes. In the last minute, remind teams to save the pack in one file and name it with both team names. Nobody presents; take written questions at the lectern afterwards.',
    },
  ),

  // 54 · tiles: homework (3)
  slide5(
    6,
    'concept_model',
    {
      kind: 'tiles',
      heading: {
        title: 'Homework: Structure Pack',
        subtitle: 'Milestone 4: five parts, words and paper only',
        badge: { icon: 'flag', label: 'Due', value: 'Before Session 6' },
      },
      tiles: [
        { icon: 'list', name: 'Inventory', tells: 'Every thing your project must hold or do.', when: 'Each one tied to a requirement.', tag: 'Part 1' },
        { icon: 'layers', name: 'Groups', tells: 'How people group the things.', when: '4 to 6 groups, with the splits marked.', tag: 'Part 2' },
        { icon: 'book', name: 'Labels', tells: 'A clear name for each group.', when: 'In your users\' own words.', tag: 'Part 3' },
        { icon: 'route', name: 'Structure', tells: 'An indented list of 2 or 3 levels.', when: 'Every Must reachable in few steps.', tag: 'Part 4' },
        { icon: 'check', name: 'Test results', tells: 'Tasks, paths, success and the fixes.', when: 'Three tasks, problem node, retest.', tag: 'Part 5' },
        { icon: 'users', name: 'Card sort with people', tells: 'Run a small card sort with 3 to 5 real people.', when: 'Outside class: anonymous, ask consent first.', tag: 'Also' },
      ],
      takeaway: 'One pack per team of two, due before Session 6. Words and paper only, no screens.',
    },
    {
      t: 3,
      points: [
        'Deliverable: Milestone 4, the Structure Pack, one per team of two, due before Session 6. Five parts: inventory, groups, labels, structure, test results.',
        'Also: run a small card sort with 3 to 5 real people outside class (not experts, not close friends). Give them your cards, ask them to group and name the groups, and compare with your groups. Keep it anonymous and ask consent first; people may stop at any time.',
        'Words and paper only: no screens, wireframes or interface drawings. The structure is an indented list.',
        'The pack is the input of Session 6, where the structure gets flows, states and feedback.',
      ],
      script:
        'Your homework is Milestone 4: the Structure Pack, in five parts. The inventory of things, the groups, the labels, the structure, and your test results. Also, run a small card sort with three to five real people outside class. Always ask permission and keep it anonymous. Words and paper only, no screens. It is due before session six.',
      tip: 'Click the six tiles one at a time, from Part 1 to the card sort, reading the short line of each. Pause 5 seconds after the last tile for silent note-taking. Confirm the template and the consent text are on the course portal. Take written questions at the lectern afterwards, not in front of the room.',
    },
  ),

  // 55 · spotlight: three ideas (1)
  slide5(
    6,
    'summary_takeaway',
    {
      kind: 'spotlight',
      heading: { title: 'Three Ideas to Remember', subtitle: 'From needs to a map people can follow' },
      statement: 'Things get groups, groups get names, names get a place.',
      points: [
        { icon: 'users', lead: 'Ask people to group', text: 'Their groups, not ours, decide the structure.' },
        { icon: 'book', lead: 'Use their words', text: 'A label is a promise: choose the words people use.' },
        { icon: 'check', lead: 'Test the map', text: 'Check the paths, find where people go wrong, fix one thing.' },
      ],
      takeaway: 'Your Structure Pack is the hand-off to Session 6.',
    },
    {
      t: 1,
      points: [
        'Idea 1: card sorting shows how people group things (Act 2). Idea 2: labels in the words people use (Act 3). Idea 3: test the structure and fix it (Acts 4 and 5).',
        'Students can write each idea in their own notes.',
      ],
      script:
        'Three sentences to keep. Ask people how they group things, because their groups matter more than ours. Use their words for the labels. And test the map, find where people go wrong, and fix one thing at a time.',
      tip: 'Show the statement and pause 5 seconds. Then click to reveal the three points one at a time. Students copy each idea silently; no repeating aloud.',
    },
  ),

  // 56 · teaser (1)
  slide5(
    6,
    'preview_next',
    {
      kind: 'teaser',
      label: 'Conclusion & Next Class',
      icon: 'layers',
      kicker: 'Previewing Session 6 · Next Class',
      title: 'Interaction',
      subtitle: 'Flows · States · Feedback · Error Recovery',
      blurb:
        'The structure gets behaviour: what happens when people act, and what the interface says back.',
      thanks: 'Thank you for Session 5 · Questions & Discussion Open at Lectern',
    },
    {
      t: 1,
      points: [
        'Session 6: Interaction Design and Norman Principles (flows, states, feedback, error recovery).',
        'The Structure Pack is the raw material: the structure says where things live, Session 6 says what happens when people act on them.',
        'Reminder: Milestone 4, the Structure Pack with the small card sort, is due before Session 6.',
      ],
      script:
        'Today you gave your requirements a place, a name and a path, and you checked it. Next time the structure starts to move: what happens when someone acts, and what the interface says back. See you then.',
      tip: 'Stay for questions at the lectern; teams with doubts about their pack should come to you now.',
    },
  ),
];
