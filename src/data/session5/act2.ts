import { slide5 } from '../session5Helpers';
import type { Slide5 } from '../session5Types';

/**
 * Session 5, act 2: GROUPING WITH CARD SORTING (slides 11-20, 45 minutes).
 * Minutes: 1 + 3 + 3 + 7 + 3 + 6 + 3 + 3 + 12 + 4 = 45.
 * See course/teacher/session5-plan.md, session4-case.md and session5-case.md (Fresh Batch).
 */
export const ACT_2_SLIDES: Slide5[] = [
  /* 11 · divider (1 min) */
  slide5(
    2,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 2,
      title: 'Card Sorting',
      question: 'How do people group the things our interface must hold?',
      learn: [
        'IN: your list of things (tasks, information, actions) from Act 1',
        'What a card sort is: open, closed and hybrid, and how to read it',
        'OUT: groups that come from people’s own sorting, not from our guess',
      ],
    },
    {
      t: 1,
      points: [
        'Act 1 ended with a list of things: every task, piece of information and action behind the requirements.',
        'Act 2 gives those things groups, and the groups come from how people sort them (a card sort), not from how we would sort them.',
        'Thread: list of things in, groups out. Act 3 will name the groups, Act 4 will build the structure.',
      ],
      script:
        'You have a list of things. A long list is not a structure. Now we group it, but not the way we would group it: the way people do. A list of things goes in. Groups from people’s own sorting come out.',
      tip: 'Short slide. Announce the act and ask teams to keep their list of things from Act 1 on the table. Nobody answers anything.',
    },
  ),

  /* 12 · spotlight: people group their own way (3 min) */
  slide5(
    2,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'People Group Things Their Own Way',
        subtitle: 'A card sort asks them, instead of guessing',
        badge: { icon: 'grid', label: 'Key idea', value: 'Card sort' },
      },
      statement:
        'A card sort gives people cards, one thing per card, and asks them to put the cards into groups that make sense to them.',
      points: [
        { icon: 'users', lead: 'Their groups, not ours', text: 'We know the system too well. Users do not think like us.' },
        { icon: 'list', lead: 'Cheap and fast', text: 'Paper cards, a table and a few people. No screen needed.' },
        { icon: 'target', lead: 'Groups to design from', text: 'The result tells us what belongs together, before we build.' },
      ],
      takeaway: 'In our case: three bakery staff, 16 cards, three different sets of groups.',
    },
    {
      t: 3,
      points: [
        'A card sort is a method where participants organise cards (each card is one item of content or one task) into groups, so we see how people expect things to be organised.',
        'The risk it removes: grouping by the company’s org chart or by our own logic. The designer’s mental model is not the user’s.',
        'Fresh Batch example first: Salma, Youssef and Amine each sort the same 16 cards. Then each team does it with its own things.',
      ],
      script:
        'You know your project well, and that is the problem: you group things the way you think. Your users do not. A card sort is simple. One thing per card, and someone puts the cards into piles that make sense to them. We watch the piles. In our bakery, the oven baker, the packer and the driver will each make different piles for the same cards.',
      tip: 'Read the statement, then click the three points one at a time. Before each click give 5 seconds of silent thinking (“how would I group my own list?”). Nobody answers aloud. Say clearly: first the bakery, then your project.',
    },
  ),

  /* 13 · flipcards: open, closed, hybrid (3 min) */
  slide5(
    2,
    'concept_model',
    {
      kind: 'flipcards',
      heading: {
        title: 'Open, Closed and Hybrid Sorts',
        subtitle: 'Who decides the group names?',
        badge: { icon: 'shapes', label: 'Types', value: 'Open · Closed · Hybrid' },
      },
      cards: [
        {
          icon: 'sprout',
          term: 'Open sort',
          front: 'Group the cards and name the groups yourself.',
          back: 'People make their own groups and give each a name. Best when we do not yet know the groups. It shows how people think.',
          example: 'Fresh Batch: Salma makes six groups and names them herself.',
        },
        {
          icon: 'flag',
          term: 'Closed sort',
          front: 'Put each card into groups we already chose.',
          back: 'The group names are fixed in advance. People only place cards. Best to check a structure we already have.',
          example: 'Fresh Batch: sort 16 cards into NOW, ORDERS, PACKING, NIGHT RECORD.',
        },
        {
          icon: 'layers',
          term: 'Hybrid sort',
          front: 'Fixed groups, but you may add your own.',
          back: 'We give starting groups, and people can rename them or add new ones when a card does not fit. A middle way.',
          example: 'Fresh Batch: the four groups plus a free pile for cards that do not fit.',
        },
      ],
      takeaway: 'Start open to discover the groups. Use closed or hybrid later to check them.',
    },
    {
      t: 3,
      points: [
        'Open sort: participants create and name their own groups. Use it early, when the structure is unknown. It reveals mental models and the words people use.',
        'Closed sort: the groups are given. Use it to test an existing or proposed structure: do the cards land where we expected?',
        'Hybrid sort: given groups plus the right to add or rename. Useful when we have a first idea but want to allow for what we missed. Today teams run an open sort.',
      ],
      script:
        'Three kinds. Open: you make the groups and you name them. We use it first, when we do not know the groups yet. Closed: we give you the group names and you only place the cards. We use it to check a structure we already have. Hybrid: we give you groups, but you may add your own when a card does not fit. Today we run an open sort.',
      tip: 'Flip the three cards in order. Before each flip give 5 seconds of silent thinking (“who decides the names here?”). Do not ask anyone to answer aloud. Tell teams: your sort in the practice is an open sort.',
    },
  ),

  /* 14 · custom CardSortDemo (7 min) */
  slide5(
    2,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Three People, Three Sorts',
        subtitle: 'Salma, Youssef and Amine sort the same 16 cards',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer runs it' },
      },
      component: 'CardSortDemo',
    },
    {
      t: 7,
      points: [
        'A pile of 16 bakery cards (next batch per oven, oven timers, packing order, route order, handover notes, and so on). Three tabs: Salma (oven baker), Youssef (packer), Amine (driver).',
        '“Sort” animates the cards into that person’s groups, with the names they chose. Salma groups by where she stands and when, Youssef by the packing table, Amine by the route.',
        '“Compare the three” shows the sorts side by side and highlights the pairs that stayed together for all three: next batch with oven timers, order changes with the late-change deadline, packing order with crates.',
      ],
      script:
        'Here are 16 cards from our bakery. Before I sort, think silently: how would you group them? Now watch Salma, the oven baker. Then Youssef, the packer. Then Amine, the driver. Same cards, three different sets of groups, because each stands in a different place. Now the comparison: some pairs always stay together. Others, like Route order or Shop contacts, go to different places for each person.',
      tip: 'Show the pile first and give 10 seconds of silent thinking on paper (“my groups”). Click the Salma tab, then “Sort”. Repeat for Youssef and Amine, pausing 5 seconds each time. Finish with “Compare the three” and point at the highlighted pairs, then at the cards that moved. No question to the room.',
    },
  ),

  /* 15 · versus: how we group vs how they group (3 min) */
  slide5(
    2,
    'comparison_think',
    {
      kind: 'versus',
      heading: {
        title: 'Our Groups or Their Groups?',
        subtitle: 'Same cards, two ways to decide',
        badge: { icon: 'scale', label: 'Compare', value: 'Our guess vs their sort' },
      },
      leftLabel: 'HOW WE WOULD GROUP',
      rightLabel: 'HOW THEY GROUP',
      leftTone: 'warn',
      rightTone: 'good',
      rows: [
        { icon: 'brain', left: 'By the company’s own words and departments', right: 'By what they do and where they stand' },
        { icon: 'users', left: 'One tidy set of groups, decided by the team', right: 'Several sets, one per person, that we compare' },
        { icon: 'book', left: 'Names made of our jargon', right: 'Names in the words people say on the floor' },
        { icon: 'alert', left: 'We find the problem after the build', right: 'We see the unclear cards before anything is built' },
      ],
      takeaway: 'In our case: a team grouping by departments would miss that bakers group by moment and place.',
    },
    {
      t: 3,
      points: [
        'Designers tend to group by internal logic (departments, data types, how the system stores things). Users group by tasks, places and moments.',
        'A card sort does not give one right answer: it gives several sorts. Our job is to look for the patterns across them.',
        'Consequence in our case: bakers group by where they stand and when (ovens now, packing, route), so a structure by data type would be hard for them.',
      ],
      script:
        'On the left, how we would group: by departments, in our words, one tidy answer. On the right, how people actually group: by what they do and where they stand, in several different ways. In the bakery, nobody sorted by department. Salma grouped by where she stands and when. The sort shows us this before we build anything.',
      tip: 'Show the left side of a row, give 5 seconds of silent thinking (“would my users do this?”), then click the switch to reveal the right side. Repeat per row. No question to the room.',
    },
  ),

  /* 16 · custom SortResultsDemo (6 min) */
  slide5(
    2,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Many Sorts Become a Map',
        subtitle: '12 people, 16 cards, one heatmap of agreement',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer runs it' },
      },
      component: 'SortResultsDemo',
    },
    {
      t: 6,
      points: [
        'How to read it: the rows and the columns are the same 16 cards. One square is one pair of cards. The number in it is how many of the 12 participants put that pair in the same group; darker means more agreement. Each pair appears once. The numbers are illustrative, in our case.',
        '“Read one square”: a worked example (Oven timers with Next batch per oven: 11 of 12). “Strong pairs”: pairs grouped together by at least 10 of 12, such as next batch with oven timers, order changes with the late-change deadline, packing order with crates.',
        '“Cluster” reorders the matrix into groups and suggests working names. “Splits” marks the cards that split people (Route order, Quantities per product, Today’s orders, Shop contacts): these are the real design questions.',
      ],
      script:
        'One sort is a story. Twelve sorts are a map. Each square says how many of the twelve put two cards together. Dark squares are agreement. Now the strong pairs: nearly everyone put the next batch with the timers. Now we cluster: the dark squares form groups. Last, the splits: Route order, Quantities, Today’s orders and Shop contacts divide people. Those are the cards that need a decision and a test.',
      tip: 'Show the plain heatmap and give 10 seconds of silent thinking (“where do I see agreement?”). Click “Add the 12 sorts”, then “Read one square” and read the example slowly (rows and columns are the same cards, one square is one pair, the number counts people). Then “Strong pairs”, pause, “Cluster”, pause, “Splits”. Say “in our case” when you read the numbers. Nobody answers aloud.',
    },
  ),

  /* 17 · checklist: how to run a card sort (3 min) */
  slide5(
    2,
    'concept_model',
    {
      kind: 'checklist',
      heading: {
        title: 'How to Run a Card Sort',
        subtitle: 'Five steps, on paper, in plain words',
        badge: { icon: 'list', label: 'Method', value: '5 steps' },
      },
      items: [
        { icon: 'book', title: 'One thing per card', text: 'Write each thing on its own paper strip, in the words users know. Not too many: about 20 to 40.' },
        { icon: 'compass', title: 'Pick the type', text: 'Open to find groups, closed to check groups, hybrid to check and allow additions.' },
        { icon: 'hand', title: 'Brief, then stay quiet', text: 'Say “group them as you see fit”. Do not hint, do not defend a card. Let them think.' },
        { icon: 'eye', title: 'Record every sort', text: 'Copy the groups and their names on paper, then shuffle the cards for the next person.' },
        { icon: 'grid', title: 'Compare the sorts', text: 'Look for pairs that stay together, pairs that split people, and sorts that are different.' },
      ],
      footer: 'Never explain a card while someone is sorting: if a card is unclear, that is a finding.',
    },
    {
      t: 3,
      points: [
        'Cards: one item per card, wording as users say it, no duplicates. A real study often uses 30 to 60 cards, in class about 16 to 20.',
        'The facilitator stays quiet: no hints, no corrections. Thinking aloud can be encouraged, but the sorter decides. A card that confuses is data.',
        'Record each result before shuffling. Then compare: agreement, disagreement, outliers. The next slide says how many people to ask.',
      ],
      script:
        'Five steps. One thing per card, in the words users know. Choose open, closed or hybrid. Give a short brief and then stay quiet: no hints. Write down each result, then shuffle. Finally compare the sorts. If a card confuses someone, do not explain it: write that down, it is a finding.',
      tip: 'Click the five items one by one. After the third item give 5 seconds of silent thinking (“could I stay silent?”). Tell teams: the practice uses these steps. Nobody answers aloud.',
    },
  ),

  /* 18 · tiles: how many people and what to look for (3 min) */
  slide5(
    2,
    'concept_model',
    {
      kind: 'tiles',
      heading: {
        title: 'How Many People, What to Look For',
        subtitle: 'Numbers are rules of thumb, not laws',
        badge: { icon: 'users', label: 'Reading', value: 'People and patterns' },
      },
      tiles: [
        {
          icon: 'users',
          name: 'A real card sort',
          tells: 'About 15 to 30 participants (rule of thumb)',
          when: 'Enough sorts to see stable pairs, not just one view.',
          tag: 'People',
        },
        {
          icon: 'hand',
          name: 'In class today',
          tells: 'A pair: you and your partner',
          when: 'Only for practice. Too few to trust, enough to learn.',
          tag: 'People',
        },
        {
          icon: 'route',
          name: 'Your homework',
          tells: '3 to 5 real people from your audience',
          when: 'A small sort, read for signs. Honest: not a proof.',
          tag: 'People',
        },
        {
          icon: 'check',
          name: 'Agreement',
          tells: 'Cards most people put together',
          when: 'Strong pairs become the core of a group. Keep them.',
          tag: 'Look for',
        },
        {
          icon: 'scale',
          name: 'Disagreement',
          tells: 'Cards that split people in different groups',
          when: 'A real design question: decide it and test it later.',
          tag: 'Look for',
        },
        {
          icon: 'alert',
          name: 'Outliers',
          tells: 'One sort or one card unlike all the others',
          when: 'Check before discarding: a different user, or an unclear card.',
          tag: 'Look for',
        },
      ],
      takeaway: 'More people give steadier patterns; a few people still show where the problems are.',
    },
    {
      t: 3,
      points: [
        'A well-run card sort usually has about 15 to 30 participants. This is a rule of thumb from practice, not a law. Fewer people give a rough view, more people give a steadier one.',
        'Our levels: in class a pair (practice only); for homework 3 to 5 real people; a professional study 15 to 30. Say clearly that 3 to 5 is a small check, not statistics.',
        'Reading results: agreement (pairs together), disagreement (cards that split people), outliers (an unusual sort or card; check whether it is a different kind of user or an unclear card).',
      ],
      script:
        'How many people? In a real card sort, about fifteen to thirty. That is a rule of thumb. In class you have a pair, only for practice. For homework, three to five real people: a small check, not a proof. Then what do we look for? Agreement: cards that most people put together. Disagreement: cards that split people. Outliers: a sort or a card that looks different from all the others. Do not throw an outlier away before you ask why.',
      tip: 'Click the three “People” tiles first, then the three “Look for” tiles. Give 5 seconds of silent thinking before the “Look for” tiles (“which cards would split people?”). Mention the bakery: Route order and Shop contacts were the splits. Nobody answers aloud.',
    },
  ),

  /* 19 · activity: sort your own project's cards (12 min) */
  slide5(
    2,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Sort Your Own Cards',
        subtitle: 'Silent sort alone, then compare with your partner',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 12 min' },
      },
      label: 'Practice · Act 2',
      chip: 'TEAM OF TWO · 12 MINUTES',
      title: 'Run an open sort on your list of things',
      steps: [
        { text: 'Take your **list of things** from Act 1. Write **each thing on its own paper strip**, in clear words (about 16 to 20 things; pick the most important if you have more). Together, **4 minutes**.' },
        { text: '**Partner A sorts, in silence**, into groups that make sense to them and **writes a name on each group**. Partner B only watches and does not help. Write down the groups, then **shuffle the strips**. About **3 minutes**.' },
        { text: '**Partner B sorts the same strips, in silence**, and names the groups. Write them down. About **3 minutes**.' },
        { text: '**Compare the two sorts side by side**, without defending your own. Mark the pairs you both grouped together and the strips that went to different places. About **2 minutes**. Do **not** ask a real participant yet: that is homework.' },
      ],
      timerSeconds: 720,
      timerLabel: 'Practice Clock',
      goal: 'See, with your own things, that two people group the same cards differently, and find what you both agree on.',
      output: 'Two written sorts (groups and names) on paper, with the agreed pairs and the split strips marked.',
    },
    {
      t: 12,
      points: [
        'Input: each team’s list of things from Act 1 (tasks, information, actions behind its Requirements Pack). The broken interface they started from is never changed.',
        'Model first (done on slide 14): Salma, Youssef and Amine sorting the 16 bakery cards. Teams now do an open sort with a pair: each partner sorts alone and silently, then they compare.',
        'No handouts and no real participant today: paper strips made by the team, words only, no screens and no drawings of an interface. A real sort with 3 to 5 people is the homework.',
      ],
      script:
        'Twelve minutes, at your table. First, write each of your things on its own strip of paper. Then one of you sorts in silence while the other only watches, and writes the group names. Shuffle. The other one sorts. Then compare the two sorts. You will see that you do not group the same way. That is the lesson. Everything on paper, in words.',
      tip: 'Start the timer. Say at minute 4: strips done, Partner A starts. At minute 7: swap. At minute 10: compare. Walk the room; if someone explains a strip while the other sorts, quietly remind them to stay silent. Never ask a team to read its groups aloud.',
    },
  ),

  /* 20 · activity: agreement, outliers and working names (4 min) */
  slide5(
    2,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Agreement and Outliers',
        subtitle: 'Decide your groups and give them working names',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 4 min' },
      },
      label: 'Practice · Act 2',
      chip: 'TEAM OF TWO · 4 MINUTES',
      title: 'Turn two sorts into one set of groups',
      steps: [
        { text: 'List the **pairs of strips you both put together**. These are your **agreement**: they form the core of a group.' },
        { text: 'Find the strips that **went to different groups**, and any group in only one sort. These are your **disagreements and outliers**. For each, write **why** it might split people.' },
        { text: 'Write **one set of groups**: keep the agreed core, and **decide** where each split strip goes for now. Give each group a **working name**; real labels come in Act 3.' },
      ],
      timerSeconds: 240,
      timerLabel: 'Practice Clock',
      goal: 'Get one first set of groups from two different sorts, and know which strips are still open questions.',
      output: 'A list of groups on paper with working names, the agreed pairs, and a short list of split strips to check with real people.',
    },
    {
      t: 4,
      points: [
        'Fresh Batch example: strong pairs next batch with oven timers, order changes with the late-change deadline; splits Route order, Quantities per product, Today’s orders and Shop contacts.',
        'Teams decide for now, but note the splits: they are the questions to take to 3 to 5 real people in the homework (Milestone 4) and to test in the tree test in Act 5.',
        'The groups and working names are the input to Act 3, where we write proper labels. Keep the paper.',
      ],
      script:
        'Four minutes. List the pairs you both put together: that is your agreement. Then list the strips that went to different places, and any outlier. For each one, write why it might split people. Finally write one set of groups with a working name each. They are working names: we will do the real labels in the next act. Keep the paper.',
      tip: 'Start the timer. Walk past tables and quietly ask “which strip did you disagree on?”. Praise teams that note the splits instead of hiding them. Say at minute 3: names for every group. Keep the papers: they are the input to Act 3. Never ask teams to share their groups aloud.',
    },
  ),
];
