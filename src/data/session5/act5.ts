import { slide5 } from '../session5Helpers';
import type { Slide5 } from '../session5Types';

/**
 * SESSION 5 · ACT 5 · CHECKING THE STRUCTURE (30 min), slides 39-46 of the plan.
 * Minutes per slide: 1 + 3 + 3 + 6 + 3 + 5 + 8 + 1 = 30.
 */
export const ACT_5_SLIDES: Slide5[] = [
  // 39 · divider (1 min)
  slide5(
    5,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 5,
      title: 'Checking the Structure',
      question: 'Can people find things in your map, before anything is built?',
      learn: [
        'IN: a structure, written as an indented list (Act 4)',
        'Tree testing: tasks, paths, success and directness',
        'OUT: evidence that people can find things, and fixes',
      ],
    },
    {
      t: 1,
      points: [
        'Act 4 gave every team a structure on paper. Act 5 asks the only question that matters: can people find things in it?',
        'The test uses words only: no screens, no drawings. That is why we can run it today, in minutes.',
        'Fresh Batch example first (lecturer-run), then each team tests its own structure.',
      ],
      script:
        'You now have a map of your interface, written as a list. A map can look neat and still send people the wrong way. In this act we test it. We use only the words of the structure, so there is nothing to build and nothing to draw. We test the bakery first, then you test yours with your partner.',
      tip: 'Short slide. Read the three bullets. Nobody answers anything here.',
    },
  ),

  // 40 · spotlight: do not trust the map (3 min)
  slide5(
    5,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'Do Not Trust the Map: Test It',
        subtitle: 'Tree testing asks people to find things in the words',
        badge: { icon: 'compass', label: 'Key idea', value: 'Tree testing' },
      },
      statement:
        'A tree test gives people the structure as a plain text list, with no design, and asks them where they would look to do a task.',
      points: [
        { icon: 'eye', lead: 'Only the words', text: 'No colours, no layout: we test the structure, not the look.' },
        { icon: 'target', lead: 'Real tasks', text: 'Each person gets a task and chooses where they would go.' },
        { icon: 'flag', lead: 'Cheap and early', text: 'It runs on paper, before anything is built, so a fix costs minutes.' },
      ],
      takeaway: 'In our case: the bakery tree has 4 sections. Does the team find the packing order? Let us see.',
    },
    {
      t: 3,
      points: [
        'Tree testing (also called reverse card sorting) checks a hierarchy: can people find an item by following the labels, without any visual design to help?',
        'It tests the structure and the labels together. If people fail here, a nice screen will not save them later.',
        'It is different from a card sort: a card sort asks how people group things; a tree test asks if they can find things in the groups we chose.',
        'Fresh Batch: the four sections NOW, ORDERS, PACKING AND LOADING, NIGHT RECORD. Each team has its own tree from Act 4.',
      ],
      script:
        'You made the map. Do not trust it yet. The map is clear to you because you drew it. A tree test removes everything except the words. We give a person a task, like where would you look to see which shop to pack first, and they choose where to go, level by level. If they get lost in plain words, they will get lost on a screen too. And it costs almost nothing, because it is a list on paper.',
      tip: 'Read the statement. Click the three points one at a time. Before each click give 5 seconds of silent thinking (“what could go wrong here?”). Nobody answers aloud. Say clearly: our example is the bakery, then you test your own tree.',
    },
  ),

  // 41 · flipcards: anatomy of a tree test (3 min)
  slide5(
    5,
    'concept_model',
    {
      kind: 'flipcards',
      heading: {
        title: 'Anatomy of a Tree Test',
        subtitle: 'Four words you will use today',
        badge: { icon: 'layers', label: 'Click a card', value: '4 terms' },
      },
      cards: [
        {
          icon: 'flag',
          term: 'Task and tree',
          front: 'What do we give the person?',
          back: 'A task in everyday words (“where do you see…?”) and the tree as a text list. Never use the label itself in the task.',
          example: 'Task: “Where do you see which shop to pack first?”',
        },
        {
          icon: 'route',
          term: 'Path',
          front: 'What do we record?',
          back: 'The list of places the person opens, in order, until they stop: the sections and items they choose, including wrong turns.',
          example: 'ORDERS > back > PACKING AND LOADING > Packing order',
        },
        {
          icon: 'check',
          term: 'Success',
          front: 'Did they end in the right place?',
          back: 'Success means the final answer is the item where the task belongs. Count how many people out of all who tried.',
          example: 'In our case: 11 of 12 succeeded.',
        },
        {
          icon: 'zap',
          term: 'Directness',
          front: 'Did they go straight there?',
          back: 'Direct means no backtracking: the right section first, the right item next. A low number means hesitation, even if they succeeded.',
          example: 'In our case: 9 of 12 went directly.',
        },
      ],
      takeaway: 'Success tells you if they arrived. Directness tells you how hard the way was.',
    },
    {
      t: 3,
      points: [
        'Four words: task (what we ask), tree (the structure as a text list), path (the route a person takes), success and directness (the two scores).',
        'A good task is a goal in the person’s own words, not the label from the tree. If the task says “open Packing order”, the test measures nothing.',
        'Success: they reached the right item. Directness: they reached it without backtracking. Both matter: someone can succeed after three wrong turns.',
        'Small numbers are only hints. We use 12 people in our example; the bakery numbers are illustrative.',
      ],
      script:
        'Four words. First, the task and the tree: a goal in everyday words, and the structure as a list. Second, the path: every place the person opens, in order, wrong turns included. Third, success: did they end in the right place. Fourth, directness: did they get there without going back. Someone can succeed and still have wandered through two wrong sections. That wandering is the signal.',
      tip: 'Click one card at a time, read the back, then give 5 seconds of silent thinking before the next. Nobody answers aloud. At the end, ask silently: which of these four can you collect with a pen and paper? (All of them.)',
    },
  ),

  // 42 · custom TreeTestDemo (6 min)
  slide5(
    5,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Test the Bakery Tree',
        subtitle: 'Twelve people, four tasks: who finds it and who gets lost',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'TreeTestDemo',
    },
    {
      t: 6,
      points: [
        'The text-only bakery tree with four tasks and 12 scripted participants (illustrative numbers, in our case). Click “Run task n” to watch the dots walk their paths.',
        'Task 1, packing order: 11 of 12 succeed, 9 directly. Task 3, route order for the van: 8 succeed, 6 directly. Task 4, note for the next shift: 12 succeed, 11 directly.',
        'Task 2, “where do you see that shop 14 changed its order?”: only 7 of 12 succeed, 3 directly; 5 go to ORDERS first. The problem node is ORDERS versus NOW: the label “Orders” attracts them.',
        '“Show the fix” re-runs task 2 on the fixed tree (illustrative better numbers): one change: Order changes also listed under ORDERS.',
        'Your own team will do the same with its tree and its own tasks, on paper.',
      ],
      script:
        'Here is the bakery tree, words only. Four tasks, twelve people. Task one: which shop to pack first. Watch the dots. Most go straight to Packing and loading. Good. Now task two: where do you see that shop 14 changed its order? Think for a moment about where you would go. Now watch. Only seven succeed and only three go directly. Five went to Orders first. They did not fail because they are careless. The label Orders promised them the answer. The fix is one change: also list Order changes under Orders. Then we test again.',
      tip: 'Run task 1 first, as a calm example. Before running task 2, give 5 seconds of silent thinking: teams of two decide on paper where they would look. Then click Run task 2, point at the ORDERS node, and read the one-line reading. Finally click Show the fix, and say aloud that its numbers are illustrative. Nobody speaks to the room.',
    },
  ),

  // 43 · factcheck: reading the results (3 min)
  slide5(
    5,
    'debrief',
    {
      kind: 'factcheck',
      heading: {
        title: 'Reading the Results',
        subtitle: 'Which statements are facts, and which are guesses?',
        badge: { icon: 'list', label: 'Reveal', value: 'Tree-test notes' },
      },
      rows: [
        {
          note: 'Task 2: 7 of 12 succeeded, only 3 went directly',
          verdict: 'fact',
          why: 'Counted from the paths. The numbers say what happened, not why.',
        },
        {
          note: 'Task 2: 5 of 12 opened ORDERS first',
          verdict: 'fact',
          why: 'Recorded in the paths. This is where people went wrong.',
        },
        {
          note: 'They chose ORDERS because they read carelessly',
          verdict: 'guess',
          why: 'We saw where they went, not why. The label “Orders” may promise the answer.',
        },
        {
          note: 'Task 3 is fine: 8 of 12 succeeded',
          verdict: 'guess',
          why: '4 of 12 failed and 3 looked in ORDERS. “Fine” is our opinion: look at the paths.',
        },
        {
          note: 'Task 4: 12 of 12 succeeded, 11 directly',
          verdict: 'fact',
          why: 'Counted. A strong result, in our case, for this one task.',
        },
      ],
      footer: 'A count is a fact. A reason or a verdict is a guess until you test it again.',
    },
    {
      t: 3,
      points: [
        'Same test as Session 3 notes: could a clipboard record it? Counts and paths are facts. Reasons and verdicts (“fine”, “careless”) are guesses.',
        'The reading of results: success first, directness second, then the node where people go wrong.',
        'A guess is not forbidden. It is a hypothesis for the fix, and the retest will confirm or reject it.',
        'Numbers are illustrative, from 12 people in our case. A team of two with 4 test persons gets hints, not proof.',
      ],
      script:
        'Here are five statements about the bakery results. Read each one in silence and decide: fact or guess? Then I reveal. Counts are facts: seven of twelve, five opened Orders first. Why they did it is a guess. And task three is fine is a guess too: four of twelve failed, and three of them looked in Orders. When you read your own results, keep the counts apart from the reasons.',
      tip: 'Read each note aloud and give 5 seconds of silent thinking (fact or guess?) before you click the row to reveal the verdict and the reason. Teams check privately with the partner. Nobody has to say how many they got right.',
    },
  ),

  // 44 · activity: write three find-it tasks (5 min)
  slide5(
    5,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Write Three Find-It Tasks',
        subtitle: 'Goals in everyday words, one right answer each',
        badge: { icon: 'clock', label: 'Practice', value: '5 minutes' },
      },
      label: 'Practice · Tree test tasks',
      chip: 'TEAMS OF TWO · 5 MINUTES',
      title: 'Write three find-it tasks for your structure',
      steps: [
        { text: 'Take your **structure** and your **Requirements Pack**. Pick **three Must tasks** that your user does. Write each as a question: **“Where would you find…?”**' },
        { text: 'Use the user’s **own words**: do **not** copy a label from your tree. Check that **one item** is the right answer.' },
        { text: 'For each task write the **correct path** (for example **Section > Item**) and what you expect: **will it be easy or hard**? Write it **before** the test.' },
      ],
      timerSeconds: 300,
      timerLabel: 'Practice Clock',
      goal: 'Turn three important tasks into questions that a tree test can check.',
      output: 'Three tasks on paper, each with the correct path and your expectation of easy or hard.',
    },
    {
      t: 5,
      points: [
        'Fresh Batch model, to read aloud once: “Where do you see which shop to pack first?” Correct path: PACKING AND LOADING > Packing order. “Where do you leave a note for the next shift?” Correct path: NIGHT RECORD > Add a handover note.',
        'Each team uses its own structure from Act 4 and the Must requirements of its own Requirements Pack; the broken interface is the starting point.',
        'Common mistakes: the task contains the label (“open Packing order”), the task has two right answers, a task that is not a Must, a vague task like “explore the app”.',
        'Writing the expectation first is practice for honest reading: we want to be surprised by the result.',
      ],
      script:
        'Five minutes, with your partner. Take your structure and your Must requirements. Pick three tasks that matter. Write each one as a question, where would you find, in your user’s own words. Do not use the label from your tree, or the question gives the answer away. For each task write the correct path, and write down whether you think it will be easy or hard. Do it now, before the test. That way the result can surprise you.',
      tip: 'Read the Fresh Batch model once, then start the timer. Walk the room quietly; read over shoulders only if invited. Privately hint at teams whose task contains a label or has two right answers. Say the time at 1 minute left.',
    },
  ),

  // 45 · activity: run the test (8 min)
  slide5(
    5,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Run the Test',
        subtitle: 'Your partner clicks through your paper tree',
        badge: { icon: 'clock', label: 'Practice', value: '8 minutes' },
      },
      label: 'Practice · Paper tree test',
      chip: 'TEAMS OF TWO · 8 MINUTES',
      title: 'Test your structure on paper, then swap',
      steps: [
        { text: '**Owner** puts the **paper tree** on the table and reads task 1 aloud, only the **question**. **Partner** follows the tree **with a finger**, one level at a time, and says out loud where they would go.' },
        { text: 'The owner **records the path silently**: every section opened, every **wrong turn**, every **back**. **No hints, no explaining, no nodding.** Then tasks 2 and 3. About **4 minutes** each.' },
        { text: '**Swap** roles and test your partner’s tree. Then for each task, mark **success** (right place?) and **direct** (no backtracking?). Circle the **worst** node.' },
      ],
      timerSeconds: 480,
      timerLabel: 'Practice Clock',
      goal: 'Practise a tree test: see where someone gets lost, using only your tree on paper.',
      output: 'Three recorded paths on your own tree, marked success and direct, with the worst node circled.',
    },
    {
      t: 8,
      points: [
        'This is practice, not research: one partner is not a sample. The point is to learn the gesture (task, finger, silent path) and to see one wrong turn with your own eyes. The real test with 3 to 5 people comes in the Studio and the homework.',
        'The partner must not have designed this tree. Ideally they have seen it for the first time; ask the owner to cover the correct paths.',
        'The owner stays silent. A hint, a nod or a sigh changes the path. Record what you saw, not what you think.',
        'Fresh Batch result to keep in mind: the paths of task 2 showed ORDERS as the problem node. Teams look for the same thing: the node where the finger went wrong.',
        'Everything on paper, in words: no screens.',
      ],
      script:
        'Eight minutes. Owner, put your tree on the table and read the first question, only the question. Partner, follow the tree with your finger, level by level, and say where you would go. Owner, write the path in silence: every section, every wrong turn, every back. No hints, no nodding. After four minutes, swap. At the end, mark each task: did they succeed, and was it direct? Circle the node where the finger went wrong. This is practice: one partner is not a study. We run the real test later with a few more people.',
      tip: 'Start the timer. At 4 minutes say “swap” aloud. Walk the room quietly; read over shoulders only if invited. Privately remind owners who give hints or explain a label. Say the time at 1 minute left. Teams finishing early compare their circled nodes.',
    },
  ),

  // 46 · spotlight: fix and retest (1 min)
  slide5(
    5,
    'summary_takeaway',
    {
      kind: 'spotlight',
      heading: {
        title: 'Fix and Retest',
        subtitle: 'Change one thing at a time, then test again',
        badge: { icon: 'check', label: 'Rule', value: 'One change' },
      },
      statement:
        'Find the node where people go wrong, change one thing, and test again with the same task. Only then do you know if the fix worked.',
      points: [
        { icon: 'target', lead: 'Start at the worst node', text: 'The place where most fingers went wrong comes first.' },
        { icon: 'layers', lead: 'One change', text: 'A new label or a moved item. Two changes hide which one helped.' },
        { icon: 'activity', lead: 'Retest the same task', text: 'If the numbers improve, keep it. If not, try another change.' },
      ],
      takeaway: 'In our case: one change, Order changes also listed under ORDERS, then the same task again.',
    },
    {
      t: 1,
      points: [
        'Fix the worst node first: the place where the most people went wrong, not the one you like least.',
        'Change one thing at a time, so you know what helped. Then repeat the same task on the changed tree.',
        'The Studio (Act 6, step 3) is where each team tests its structure and fixes it.',
      ],
      script:
        'Test, fix, retest. Find the node where people went wrong. Change one thing. Test the same task again. In the bakery we made one change: Order changes is now also listed under ORDERS. Then we repeat the same task. If people still go wrong, the next single change could be the label. In the Studio you will test your structure and fix it.',
      tip: 'Short slide. Click the three points quickly. Nobody answers. Announce that the Studio comes next and that testing and fixing is step 3.',
    },
  ),
];
