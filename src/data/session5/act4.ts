import { slide5 } from '../session5Helpers';
import type { Slide5 } from '../session5Types';

/**
 * Session 5, act 4: STRUCTURE AND NAVIGATION (slides 28-38, 45 minutes).
 * Minutes: 1 + 3 + 5 + 3 + 5 + 3 + 3 + 6 + 9 + 3 + 4 = 45.
 * See course/teacher/session5-plan.md, session4-case.md and session5-case.md (Fresh Batch: structure tree, paths).
 * Step counting rule used on every slide of this act: one step = one tap from the home screen of the board.
 */
export const ACT_4_SLIDES: Slide5[] = [
  /* 28 · divider (1 min) */
  slide5(
    4,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 4,
      title: 'Structure and Navigation',
      question: 'How do we put the groups in order so people find things?',
      learn: [
        'IN: your groups from the card sort and your labels from the label test',
        'Breadth against depth, navigation patterns, wayfinding and the shapes of a structure',
        'OUT: a structure on paper and the paths of your main tasks',
      ],
    },
    {
      t: 1,
      points: [
        'Act 2 gave us groups, Act 3 gave them names. Act 4 puts the named groups into a structure: what sits at the top, what sits below, how many levels.',
        'Thread: groups and labels in, a structure and the paths of the main tasks out. Act 5 will test that structure.',
        'Everything today stays on paper, in words and indented lists. No screens.',
      ],
      script:
        'You have groups and you have names. Now we decide where each group sits, and how many steps it takes to reach each thing. Your groups and labels go in. A structure written on paper, plus the path of your main tasks, comes out.',
      tip: 'Short slide. Ask teams to have their groups and their labels from the previous acts on the table. Nobody answers anything.',
    },
  ),

  /* 29 · spotlight: structure is groups, order, depth (3 min) */
  slide5(
    4,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'Structure: Groups, Order, Depth',
        subtitle: 'Three choices decide how easy it is to find things',
        badge: { icon: 'layers', label: 'Key idea', value: 'Structure' },
      },
      statement:
        'A structure is the plan of where things sit: which groups, in what order, how many levels deep. People feel it whenever they search.',
      points: [
        { icon: 'grid', lead: 'Groups', text: 'What sits together. Your card sort already gave you these.' },
        { icon: 'list', lead: 'Order', text: 'What comes first. The most important task goes first.' },
        { icon: 'layers', lead: 'Depth', text: 'How many levels to go down before the goal.' },
      ],
      takeaway: 'In our case: four groups under one home, and every task reached in two steps or fewer.',
    },
    {
      t: 3,
      points: [
        'Structure (information architecture, in plain words) is the organisation of content: groups, the order of the groups, and the number of levels. It is not the look of the screen.',
        'Order should follow the importance of tasks, not the order of the company chart. Depth is the cost: each level is one more step.',
        'Fresh Batch example first: four groups (Now, Orders, Packing and loading, Night record) under one home. Then each team does the same with its own groups.',
      ],
      script:
        'Structure is the plan of where things sit. Three choices. Which groups exist: you made those with the card sort. In what order: the most important task goes first. And how deep: every level is one more step before you reach what you want. In our bakery, Hassan must see the next batch at once, so it sits at the top, not three levels down.',
      tip: 'Read the statement, then click the three points one at a time. Before each click give 5 seconds of silent thinking (“what would go wrong if this were bad?”). Nobody answers aloud. Say clearly: the example is the bakery, then you do it for your project.',
    },
  ),

  /* 30 · custom HierarchyDemo (5 min) */
  slide5(
    4,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Breadth or Depth?',
        subtitle: 'The same 24 items in three different structures',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer runs it' },
      },
      component: 'HierarchyDemo',
    },
    {
      t: 5,
      points: [
        'Breadth is how many choices each screen shows. Depth is how many levels you go down. For a fixed number of items, more of one means less of the other.',
        'Three structures for the same 24 items: flat (24 choices on one level), balanced (2 levels, 6 groups of 4) and deep (4 levels of about 3).',
        'Link to Session 2 (Hick’s law): the more choices on a screen, the longer the decision takes, as a rule of thumb. But a deep tree costs more steps and more chances to take a wrong turn. Balance wins: about 5 to 7 choices per level, 2 to 3 levels.',
      ],
      script:
        'Same 24 items, three structures. Flat: everything on one screen. Hick’s law from Session 2 says a long list takes longer to choose from. Deep: only three choices per screen, but four levels to go through, and every level is a chance to take the wrong turn. Balanced: six groups of four, two levels. For a baker 3 metres from the board, balanced is the answer.',
      tip: 'Click “Flat”, then “Find item”. Before the animation, give 5 seconds of silent thinking: “how long will this take?”. Then repeat for Balanced and Deep with the same target item and compare the meters (choices, clicks, scan time). Say “rule of thumb” when reading the time. Nobody answers aloud.',
    },
  ),

  /* 31 · flipcards: navigation patterns for the bakery (3 min) */
  slide5(
    4,
    'concept_model',
    {
      kind: 'flipcards',
      heading: {
        title: 'Four Ways to Move Around',
        subtitle: 'Navigation patterns and how they fit the bakery',
        badge: { icon: 'compass', label: 'Patterns', value: 'Hub · Tabs · Search · Trail' },
      },
      cards: [
        {
          icon: 'compass',
          term: 'Hub (home)',
          front: 'One start point with a way to every section',
          back: 'You always come back to the same home, then go to one section. Simple to learn, and nobody gets lost for long.',
          example: 'The board: a home with four sections.',
        },
        {
          icon: 'list',
          term: 'Tabs',
          front: 'All sections shown side by side, one tap each',
          back: 'The sections stay visible, so people see where they are and can switch in one tap. Works for 3 to 6 sections.',
          example: 'Now · Orders · Packing · Night record.',
        },
        {
          icon: 'eye',
          term: 'Search',
          front: 'Type a word and jump to the thing',
          back: 'Fast when you know the word, useless when you do not. It needs typing, which clean hands and gloves make hard.',
          example: 'Weak fit here: no typing with floury hands (R5).',
        },
        {
          icon: 'route',
          term: 'Breadcrumbs',
          front: 'A trail showing the way you came',
          back: 'A line such as Home > Packing > Packing order. It shows where you are and gives a way back in one tap.',
          example: 'Useful on a second level, not needed on the home.',
        },
      ],
      takeaway: 'Choose the pattern that fits the users’ hands, place and words. For the bakery: hub and tabs, with no search.',
    },
    {
      t: 3,
      points: [
        'A navigation pattern is a standard way of moving between parts of a structure. Hub, tabs, search and breadcrumbs are four common ones; they can be combined.',
        'The right pattern depends on the users and the place. In our case, no typing (floury hands, R5), no sound (80 dB, R9), big readable targets (3 m, R1). So: a hub with tabs, no search.',
        'Teams will choose patterns for their own project from their own constraints in the practice that follows; the pattern is a decision, not a default.',
      ],
      script:
        'Four ways to move around. A hub: one home, four sections. Tabs: the sections are always visible. Search: type and jump. Breadcrumbs: a trail showing where you came from. Now think about the bakery: hands floury, hall noisy, board read from 3 metres. Search needs typing, so it is a poor fit. A hub with visible sections is a good fit. Your own project’s constraints will point to a different mix.',
      tip: 'Flip the four cards in order. Before each flip give 5 seconds of silent thinking: “would this work with floury hands?”. Nobody answers aloud. Say clearly: our example is the bakery; your own constraints from the Requirements Pack decide for your project.',
    },
  ),

  /* 32 · custom WayfindingDemo (5 min) */
  slide5(
    4,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Do Not Get Lost',
        subtitle: 'Remove the cues one by one and watch the path',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer runs it' },
      },
      component: 'WayfindingDemo',
    },
    {
      t: 5,
      points: [
        'Wayfinding means finding your way inside a structure. Three questions must always have an answer: where am I, what is here, where can I go.',
        'Cues that answer them: a section title (where am I), the current section highlighted (where am I in the whole), a back button and a breadcrumb (where can I go).',
        'The simulated visitor looks for “Route order”. Without cues the path wanders and the lost meter rises (illustrative); with the cues back, the path reaches the goal.',
      ],
      script:
        'A structure is only useful if you do not get lost in it. Three questions: where am I, what is here, where can I go. Our visitor wants Route order. Watch what happens when I take the section title away, then the highlight, then the back button, then the trail. The path wanders and the lost meter climbs. Put the cues back and the visitor walks straight to the goal. In the hall, a baker with floury hands cannot afford to wander.',
      tip: 'Show the full screen first and name the three questions. Click “Remove cue” and, before each click, give 5 seconds of silent thinking: “which question can we no longer answer?”. A removed cue shows as a red dashed box with the cue struck through, exactly where it used to be. Click “Compare: show it with all cues” to flip back and forth so everyone sees what is missing. Nobody answers aloud. Then click “Restore all” and let the path reach the goal. The lost meter is illustrative.',
    },
  ),

  /* 33 · tiles: shapes of structure (3 min) */
  slide5(
    4,
    'concept_model',
    {
      kind: 'tiles',
      heading: {
        title: 'Four Shapes of Structure',
        subtitle: 'Most structures are one of these, or a mix',
        badge: { icon: 'shapes', label: 'Shapes', value: '4 kinds' },
      },
      tiles: [
        {
          icon: 'layers',
          name: 'Hierarchy',
          tells: 'Groups that contain groups, like a tree',
          when: 'Many items, clear groups: Packing > Packing order.',
          tag: 'Tree',
        },
        {
          icon: 'route',
          name: 'Sequence',
          tells: 'Steps in a fixed order, one after the other',
          when: 'A task that has an order: the handover steps.',
          tag: 'Steps',
        },
        {
          icon: 'compass',
          name: 'Hub and spoke',
          tells: 'One home; each section is a spoke off it',
          when: 'Separate tasks, like the board: four sections.',
          tag: 'Home',
        },
        {
          icon: 'grid',
          name: 'Tags',
          tells: 'No tree: items carry labels and you filter by them',
          when: 'Items that fit several groups, like a changed order.',
          tag: 'Labels',
        },
      ],
      takeaway: 'Pick the shape from the task. The bakery board is a hub with a small hierarchy under each spoke.',
    },
    {
      t: 3,
      points: [
        'Hierarchy: a tree of groups inside groups. Sequence: steps that must follow an order (a wizard, a checklist). Hub and spoke: a home from which separate sections are reached and left. Tags: items carry labels, and people filter.',
        'Fresh Batch uses a hub with four sections and a shallow hierarchy under each. A sequence fits the handover (read, add note, confirm). Tags fit “Order changes”, which belongs to Now and to Orders.',
        'Each team picks a main shape for its own project in the next practice; mixing shapes is normal.',
      ],
      script:
        'Four shapes. Hierarchy: a tree. Sequence: steps in order. Hub and spoke: a home and separate sections. Tags: no tree, items carry labels. Our bakery board is a hub with four sections and a tiny tree under each. The handover could be a sequence. And “Order changes” is the classic tag case: it belongs on Now and on Orders. Which shape does your project need? Think about it silently.',
      tip: 'Click the four tiles one at a time. Before each click give 5 seconds of silent thinking: “which of my tasks looks like this?”. Nobody answers aloud. Tell teams the shape choice happens in the next practice, on paper.',
    },
  ),

  /* 34 · journey: follow a task through the structure (3 min) */
  slide5(
    4,
    'concept_model',
    {
      kind: 'journey',
      heading: {
        title: 'Follow a Task Through the Map',
        subtitle: 'Start, path, goal: count the steps',
        badge: { icon: 'route', label: 'Path', value: 'Start · Path · Goal' },
      },
      steps: [
        {
          icon: 'flag',
          title: 'Start with a task',
          short: 'One real task, in the user’s words',
          detail: 'Pick a task a person really does, from your requirements. Bakery: “Youssef must see which shop to pack first” (R4).',
        },
        {
          icon: 'compass',
          title: 'Begin at the home',
          short: 'A path always starts at the home',
          detail: 'Place a finger on the home of your structure. A step is one tap from there. Anything already on the home costs zero steps.',
        },
        {
          icon: 'route',
          title: 'Follow the labels',
          short: 'Take the group whose label seems right',
          detail: 'At each level choose the label you think leads to the goal, as a user would. Write the labels as a path: Packing and loading > Packing order.',
        },
        {
          icon: 'target',
          title: 'Count and judge',
          short: 'Count the steps; too many: move it',
          detail: 'Bakery: two steps to the packing order. For the most important tasks, aim at two steps or fewer, and move the item up if it takes more.',
        },
      ],
      footer: 'Rule of the act: one step is one tap from the home screen.',
    },
    {
      t: 3,
      points: [
        'Tracing a task path is the quickest check of a structure: pick a task, start at the home, follow the labels, count the steps, check you arrive.',
        'A path is written as labels with arrows: Home > Packing and loading > Packing order is two steps. “See the next batch” sits on the home: zero steps, as R1 needs.',
        'The aim is not zero everywhere: the most important tasks get the shortest paths, rarer tasks may cost more.',
      ],
      script:
        'Take one task. Youssef wants to know which shop to pack first. Start at the home. Which label would he take? Packing and loading. Then? Packing order. Two steps. Hassan’s next batch is on the home itself: zero steps. This is the whole method: a task, a start, a path, a count. If the path for an important task is long, we move the thing closer to the home.',
      tip: 'Click the four steps in order. Before step 3, give 5 seconds of silent thinking: “which label would you take?”. Nobody answers aloud. Say clearly that in the practice each team traces its own tasks on its own paper tree.',
    },
  ),

  /* 35 · custom StructureBuilderDemo (6 min) */
  slide5(
    4,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Build the Bakery Structure',
        subtitle: 'Place the groups, then count the steps of three tasks',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer runs it' },
      },
      component: 'StructureBuilderDemo',
    },
    {
      t: 6,
      points: [
        'Four group tiles from the card sort and labels: Now, Orders, Packing and loading, Night record, each with its items. The lecturer places them under the home one by one.',
        'Then three tasks are traced from the home: R1 see the next batch, R2 see a changed order, R4 see the packing order. Each path shows its steps.',
        'Last step: “Order changes” moves onto Now. The R2 path drops from 2 steps to 1. The aha: the structure follows the most important tasks.',
      ],
      script:
        'Here are the four groups from our card sort. I place them under the home. Now three tasks. See the next batch: it is on Now, zero steps. See the packing order: Packing and loading, then Packing order, two steps. See a changed order: Orders, then Order changes, two steps. But a missed change is the worst failure of the bakery, notes 3 and 4. So I move Order changes onto Now. One step. A structure is not neutral: it favours some tasks. Choose which ones.',
      tip: 'Click “Place next group”, with 5 seconds of silent thinking before each: “where will this go?”. Then click each task to show its path and count the steps; say the count aloud. Finally click the move of “Order changes” and let the count drop. Nobody answers aloud.',
    },
  ),

  /* 36 · activity: write your structure (9 min) */
  slide5(
    4,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Write Your Structure',
        subtitle: 'An indented list, two or three levels',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 9 min' },
      },
      label: 'Practice · Act 4',
      chip: 'TEAM OF TWO · 9 MINUTES',
      title: 'Write your structure as an indented list on paper',
      steps: [
        { text: 'Take your **named groups** (Acts 2 and 3). On paper, write your home at the top, then each group below it, with its **label**. Keep to **5 to 7 groups** at most.' },
        { text: 'Under each group, indent the **items** that belong there (use your inventory). Add a third level only where a group has too many items. Never go deeper.' },
        { text: 'Choose a **shape** (hub, hierarchy, sequence, tags) and a **navigation pattern**. Put the items of your most important task **near the top**. Write both choices at the foot of the page.' },
      ],
      timerSeconds: 540,
      timerLabel: 'Practice Clock',
      goal: 'Give every thing in your inventory a place, so that the structure can be traced and tested next.',
      output: 'A paper structure: an indented list of 2 or 3 levels, with the shape and the navigation pattern written below.',
    },
    {
      t: 9,
      points: [
        'Each team works on its own project: the named groups from Acts 2 and 3, the inventory from Act 1, the requirements from Session 4. The broken interface is the starting point, never modified.',
        'Format example, bakery: Home (NOW) / Next batch per oven / Order changes (NEW) // ORDERS / Today’s orders by shop … Indentation shows the level. No drawing, no screens.',
        'Common trap: a group that has no label of its own (“Other”). Every thing must have a place; “Other” is a sign the card sort needs another look.',
      ],
      script:
        'Nine minutes at your table. Write your structure as an indented list. The home at the top, then your named groups, then the items inside each group. Two levels, three at most. Put the items of your most important task near the top, like we put Order changes on Now. Then write which shape and which navigation pattern you chose. Keep this paper: in the next slides you trace your tasks on it.',
      tip: 'Walk the room and read over shoulders. Help quietly: “where does this item go?”, “is there an Other group?”. Never ask a team to read aloud. Say when 3 minutes remain, and again when 1 minute remains.',
    },
  ),

  /* 37 · checklist: structure check (3 min) */
  slide5(
    4,
    'concept_model',
    {
      kind: 'checklist',
      heading: {
        title: 'Check Your Structure',
        subtitle: 'Four questions before anyone tests it',
        badge: { icon: 'check', label: 'Toolbox', value: '4 checks' },
      },
      items: [
        {
          icon: 'check',
          title: 'Every Must is reachable',
          text: 'Walk through R1 to R5 (or your Musts): each has a place, and none is missing.',
        },
        {
          icon: 'list',
          title: 'Few choices per level',
          text: 'About 5 to 7 on each level, 2 to 3 levels in all. Too many: group. Too deep: flatten.',
        },
        {
          icon: 'book',
          title: 'Labels from the label test',
          text: 'Each group name is a word your users used, checked with the five-question test.',
        },
        {
          icon: 'target',
          title: 'Top task within 2 steps',
          text: 'The most important task needs two steps or fewer from the home.',
        },
      ],
      footer: 'Bakery: R1 to R5 all reached; 4 groups; labels in the floor’s words; next batch on the home.',
    },
    {
      t: 3,
      points: [
        'Four checks to apply to the structure on paper before the tree test of Act 5: coverage of the Must requirements, a manageable number of choices per level, labels that passed the label test, the most important task within two steps.',
        'Coverage is the Session 4 link (traceability): from each Must requirement you can follow the items behind it to a place in the tree. If a Must has no place, the structure is incomplete.',
        'The checks are fast and catch obvious problems; they do not replace testing with people, which is Act 5.',
      ],
      script:
        'Four checks. One: every Must requirement has a place in the tree. Two: few choices per level, five to seven, two or three levels. Three: the labels come from your label test, not from your own words. Four: the most important task takes two steps or fewer. In our bakery: R1 to R5 all have a place, four groups, labels in the floor’s words, and the next batch is on the home. Hold your own paper next to this list.',
      tip: 'Click the items one at a time. After each, give 10 seconds of silent checking: students look at their own paper and tick or mark it. Nobody answers aloud, nobody shows anything. Say that the next practice is a first check of check four.',
    },
  ),

  /* 38 · activity: trace three tasks and count steps (4 min) */
  slide5(
    4,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Trace Your Tasks',
        subtitle: 'Three tasks, three paths, count the steps',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 4 min' },
      },
      label: 'Practice · Act 4',
      chip: 'TEAM OF TWO · 4 MINUTES',
      title: 'Trace three of your tasks through your structure',
      steps: [
        { text: 'Choose **three tasks** from your Must requirements, one of them your **most important**. Write each in the user’s words.' },
        { text: 'For each task start at the home of your paper structure. Write the **path** with labels and arrows, then **count the steps** (one step = one tap).' },
        { text: 'If the most important task takes **more than 2 steps**, or you reach no place at all, **move the item** and fix the list. Cross out and rewrite.' },
      ],
      timerSeconds: 240,
      timerLabel: 'Practice Clock',
      goal: 'Find out, before any test, whether your most important tasks can be reached quickly.',
      output: 'Three written paths with their step counts, and your structure fixed where a path was too long.',
    },
    {
      t: 4,
      points: [
        'Each team uses its own paper structure from the previous practice and its Must requirements from Session 4. Example format: Home > Packing and loading > Packing order = 2 steps.',
        'If a task cannot be reached at all, the structure has a hole: the item has no group, or the label does not point to it. This is the best finding of the exercise.',
        'These paths and counts go into the Structure Pack and prepare the tree test of Act 5, where other people follow the paths.',
      ],
      script:
        'Four minutes at your table. Pick three tasks, one of them your most important. For each, start at the home, write the path with labels and arrows, and count the steps. If your most important task takes more than two steps, move the item and fix your list. In the bakery, that is how Order changes ended up on Now. Keep this page: next act another person follows your paths.',
      tip: 'Walk the room and read over shoulders. Help quietly: “which label would a user take first?”, “can you move this up?”. Never ask a team to read aloud. Say when 1 minute remains. End by telling teams that in Act 5 someone else will follow these paths without help.',
    },
  ),
];
