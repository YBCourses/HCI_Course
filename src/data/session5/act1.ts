import { slide5 } from '../session5Helpers';
import type { Slide5 } from '../session5Types';

/**
 * Session 5, act 1 · FROM REQUIREMENTS TO THINGS (35 min). See course/teacher/session5-plan.md.
 * Input: each team's Requirements Pack (Session 4). Output: a list of things (information, actions, words)
 * and where users expect to find them. Case: Fresh Batch (session4-case.md + session5-case.md).
 * Minutes: 1 + 3 + 3 + 2 + 5 + 3 + 3 + 6 + 6 + 3 = 35.
 */
export const ACT_1_SLIDES: Slide5[] = [
  // 1 · hero
  slide5(
    1,
    'title',
    {
      kind: 'hero',
      sessionLabel: 'SESSION 05',
      pill: 'Master Course · Human-Centered Systems',
      title: 'Structure',
      subtitle: 'Card Sorting · Navigation · Labels · Wayfinding',
      cta: 'Begin Session 5',
    },
    {
      t: 1,
      points: [
        'This is the Session 4 teaser made real: “Structure”. Session 4 ended with a Requirements Pack; today we give every requirement a home.',
        'Today we build the structure of an interface in words and on paper: things, groups, names, a tree, and a test. No screens, no drawing.',
        'Everything is done in teams of two at your own table. Nobody has to speak in front of the room.',
      ],
      script:
        'Last week you wrote down what the system must do. Today we ask: where does everything live, and what is it called? We will build a map of the interface, on paper, in words. The Fresh Batch bakery is our example, and your own project is where you practise.',
      tip: 'Start on time. Say that the lecturer runs all demos, teams work at their own tables, and nobody presents.',
    },
  ),

  // 2 · quiz (Session 4 recall, silent)
  slide5(
    1,
    'question',
    {
      kind: 'quiz',
      heading: {
        title: 'Session 4 Recall',
        subtitle: 'Write your answers on paper first, then compare',
        badge: { icon: 'brain', label: 'Retrieval practice', value: '3 minutes' },
      },
      items: [
        {
          q: 'What is the difference between a need and a solution?',
          a: 'A need says **what people must achieve**. A solution says **how** (a screen, an app).',
        },
        {
          q: 'What makes a requirement testable?',
          a: 'A **measure and a target**, so we can answer yes or no: “read from 3 m in 3 s”.',
        },
        {
          q: 'What do Must, Should, Could and Won’t mean?',
          a: '**MoSCoW**: what we do first, then next, if time allows, and **not now**.',
        },
        {
          q: 'What is traceability?',
          a: 'Each requirement links back to **evidence** (a pain point) and forward to a **measure**.',
        },
      ],
    },
    {
      t: 3,
      points: [
        'Need vs solution: “see the next batch from 3 metres” is a need; “a big screen” is a solution in disguise (Session 4, Act 3).',
        'Testable: one measure and one target (R1 in our case: 6 of 8 staff read it from 3 m within 3 s). Priorities: Must R1-R5, Should R6-R9, Could R10, Won’t R11-R12.',
        'Traceability: pain point “changes get lost” -> R2, R3 -> measures -> business goal. R11 (sales charts) is the orphan with no evidence. Today’s input is the Requirements Pack.',
      ],
      script:
        'One minute alone with a sheet of paper. Write what you remember for each of the four questions, no phones. Then compare with your partner. I will show the answers in a moment. The ones that felt fuzzy are the ones to look at again tonight.',
      tip: 'Stay silent for the first minute, then give 1 minute for pairs to compare on paper. Reveal the answers one by one after the pause. Never call on anyone.',
    },
  ),

  // 3 · spotlight: a good interface starts with a good map
  slide5(
    1,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'Requirements Need a Home',
        subtitle: 'A good interface starts with a good map',
      },
      statement:
        'Before any screen exists, every task and every piece of information needs a place, a name and a path.',
      points: [
        { icon: 'list', lead: 'Requirements', text: 'What the night team must be able to do or see.' },
        { icon: 'grid', lead: 'A home for each thing', text: 'Where would a baker look for the next batch?' },
        { icon: 'route', lead: 'A path to it', text: 'How many steps from the start to the packing order?' },
      ],
      takeaway: 'A map first, screens later: structure comes before design.',
    },
    {
      t: 3,
      points: [
        'The Fresh Batch requirements are clear: R1 next batch from 3 m, R2 changes reach all in 1 minute, R4 packing order visible. But nothing says where the packing order sits or what it is called (in our case).',
        'Structure is the map of the interface: what things exist, how they are grouped, what they are called, and how people move between them. It is written as lists and indented trees, not as screens.',
        'Today’s thread: Requirements Pack -> things -> groups -> names -> structure -> test -> Structure Pack. Each team does it for its own project, starting from its Session 4 pack.',
      ],
      script:
        'Think of a shop with no signs and no aisles. Everything is in the building, but nobody can find anything. Our requirements are the list of goods. Today we build the aisles and the signs. Before I click each point, think about the bakery: where would the packing order live?',
      tip: 'Read the statement, then click once per point. Before each click, give 5 seconds of silent thinking. Remind teams that their Requirements Pack from Session 4 is the input today. Nobody answers aloud.',
    },
  ),

  // 4 · journey: what goes in and out
  slide5(
    1,
    'concept_model',
    {
      kind: 'journey',
      heading: { title: 'From Requirements to Structure', subtitle: 'What goes in and what comes out' },
      steps: [
        {
          icon: 'list',
          title: 'Requirements',
          short: 'In: your Requirements Pack',
          detail: 'Musts, Shoulds and Coulds with measures, from Session 4. They say what people must achieve, but not yet what the interface holds.',
        },
        {
          icon: 'grid',
          title: 'Things',
          short: 'Out: a list of things',
          detail: 'The information to see, the actions to do and the words people use. Every requirement hides several things: R1 needs next batch, timers and quantities.',
        },
        {
          icon: 'layers',
          title: 'Structure',
          short: 'Later: groups, names, paths',
          detail: 'Things become groups, groups get names, names form a tree with paths. We test it on paper. The result goes to Session 6, Interaction.',
        },
      ],
      footer: 'Today’s first stage: requirements in, a list of things out.',
    },
    {
      t: 2,
      points: [
        'The full chain of the session: requirements -> things -> groups -> names -> structure. Act 1 covers the first arrow; the next acts cover the rest.',
        'In: the Requirements Pack. Out of Act 1: an inventory of things (information, actions, words) and where users expect each one. Out of the session: the Structure Pack for Session 6.',
        'Fresh Batch: 12 requirements become 19 things (in our case).',
      ],
      script:
        'Here is the plan for the session in three steps. We start from the requirements. First we find the things behind them. Then we group them, name them and build the structure. Before I click, think: what could be hiding behind one requirement like “see the next batch”?',
      tip: 'Click the three steps in order. Before each click, 5 seconds of silent thinking. Keep this to two minutes; the next demo shows the first arrow in detail.',
    },
  ),

  // 5 · custom ContentInventoryDemo
  slide5(
    1,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: The Hidden Things',
        subtitle: 'Click a requirement: tasks, information and actions pop out',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'ContentInventoryDemo',
    },
    {
      t: 5,
      points: [
        'R1 (next batch from 3 m) hides: next batch per oven, oven timers, quantities per product. R2 hides: order changes, confirm a change was seen, the 03:30 deadline. R4 hides: packing order, crates per shop, route order.',
        'Duplicates merge: “order changes” appears behind both R2 and R3. The board ends with about 19 things in two columns: information and actions (in our case).',
        'R11 and R12 (sales charts, weather) are Won’t: they get no home now. Aha: without this list nothing has a home.',
      ],
      script:
        'Look at the requirements on the left. Each one looks short, but it hides several things. I will open them one by one. Before each click, think what the requirement needs people to see or do. Then watch the things fly into the inventory. At the end, count them.',
      tip: 'Click “Show next requirement” one at a time. Before each click, give 5 seconds of silent thinking: what is behind this requirement? Pause on the counter at the end. Nobody answers aloud.',
    },
  ),

  // 6 · flipcards: three kinds of things
  slide5(
    1,
    'concept_model',
    {
      kind: 'flipcards',
      heading: {
        title: 'Three Kinds of Things',
        subtitle: 'What an interface holds, does and says',
      },
      cards: [
        {
          icon: 'eye',
          term: 'Information',
          front: 'What do people need to see?',
          back: 'Facts to read: quantities, times, orders, status. Each one needs a place where people expect it.',
          example: 'Next batch per oven, oven timers, packing order.',
        },
        {
          icon: 'hand',
          term: 'Actions',
          front: 'What do people need to do?',
          back: 'Things people do or confirm: mark, confirm, add. Few and clear, so they work even with busy hands.',
          example: 'Mark a batch as done, add a handover note.',
        },
        {
          icon: 'book',
          term: 'Words',
          front: 'What do we call each thing?',
          back: 'The names people read to decide where to go. They should be the users’ own words.',
          example: 'Next batch, or Fournée suivante?',
        },
      ],
      takeaway: 'List what to see, what to do and what to call it.',
    },
    {
      t: 3,
      points: [
        'Information: the facts the system shows. Actions: what people do with it. Words: the names of both. Every thing in the inventory is one of the first two, and every one needs a name.',
        'Fresh Batch: 16 information items, 3 actions (mark a batch as done, confirm a change was seen, add a handover note), in our case. Wishes kept out: sales charts, weather.',
        'Names come later (Act 3). Here we only note the words users already use; a team’s interviews and notes are the source.',
      ],
      script:
        'An interface is made of three kinds of things. Information to see, actions to do, and words that name them. For each card, think of one example from the bakery before I flip it. Today we list information and actions first. The words come in the third part.',
      tip: 'Flip the cards one at a time. Before each flip, give 5 seconds of silent thinking: one example from the bakery or from your own project. Nobody answers aloud.',
    },
  ),

  // 7 · spotlight: mental models (links to Session 2)
  slide5(
    1,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'Mental Models',
        subtitle: 'What people expect versus how the system works',
      },
      statement:
        'People carry a picture in their head of how something works, and they look for things where that picture says they are. When the picture and the system differ, people get lost.',
      points: [
        { icon: 'brain', lead: 'A picture in the head', text: 'Like turning a thermostat to the maximum to heat faster.' },
        { icon: 'compass', lead: 'Different heads', text: 'The baker, the packer and the driver each expect different places.' },
        { icon: 'target', lead: 'Serve the task', text: 'Put things where the main users’ task expects them, then test.' },
      ],
      takeaway: 'Do not guess where people look: find out, then test it.',
    },
    {
      t: 3,
      points: [
        'Link to Session 2: a mental model is the picture a person has of how a thing works. The thermostat example: many people think a higher setting heats faster, like a gas pedal, but it only sets the target (a rule of thumb about common behaviour).',
        'Structure is where mental models meet the system. If the packing order sits under “Orders” but the packer expects “Packing”, the packer is lost even though the information exists.',
        'Teams’ own interviews show the same thing: different roles use different words and expect different places. Fresh Batch: the next demo shows four roles and six items (in our case).',
      ],
      script:
        'In Session 2 we met mental models: the picture in your head of how something works. A thermostat is the classic example. Many people turn it to maximum to heat a room faster, as if it were a gas pedal. It is not, but their picture says so. A structure faces the same problem: people look where their picture tells them. Before each click, think where you would look.',
      tip: 'Read the statement, then click once per point. Before each click, give 5 seconds of silent thinking. Say plainly that Session 2 introduced this idea and that today we apply it to where things live. Nobody answers aloud.',
    },
  ),

  // 8 · custom MentalModelDemo
  slide5(
    1,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Where Would You Look?',
        subtitle: 'Which drawer would each person open?',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'MentalModelDemo',
    },
    {
      t: 6,
      points: [
        'Six items: packing order, order changes (NEW), oven timers, handover notes, crates per shop, waste count. Four roles: Hassan, Salma, Youssef, Amine (illustrative, from the interviews, in our case).',
        'Packing order: Salma expects “Orders”, Youssef “Packing”, Amine “Route”. Order changes: Hassan on the main screen, Salma under “Ovens”, Youssef and Amine under “Orders”.',
        'Each drawer is a place in the future tool; a green tick means two or more people expect the same drawer. Aha: the same item sits in different drawers in different heads; the structure can only choose one, so it must serve the main users’ task and be tested.',
      ],
      script:
        'Here are six things from the bakery. First, think about where you would look for each one. Then I reveal which drawer Hassan, Salma, Youssef and Amine would open. A green tick means two people expect the same drawer. No answer is wrong: this is exactly why we test structures instead of trusting our own head.',
      tip: 'For each item, say “Where would you look for it?” and leave 5 seconds of silent thinking. Click “Reveal”: the four chips drop into their drawers. Then “Next item”. After the sixth item click “All six” for the overview. Stay longer on the packing order and order changes. Use Reset at the end. Nobody answers aloud.',
    },
  ),

  // 9 · activity: list the things your requirements need
  slide5(
    1,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Your Things',
        subtitle: 'List what your requirements need',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 6 min' },
      },
      label: 'Practice · Act 1',
      chip: 'TEAM OF TWO · 6 MINUTES',
      title: 'Write the inventory of things for your project',
      steps: [
        { text: 'Take your **Must requirements** from Session 4. Under each one, write the **tasks** it needs: what people do, in short lines.' },
        { text: 'For each task, list the **information** people must see and the **actions** they must do. Mark each line **I** (information) or **A** (action).' },
        { text: 'Merge duplicates, then **cross out** anything no requirement asks for. Count your things and write the number at the top.' },
      ],
      timerSeconds: 360,
      timerLabel: 'Practice Clock',
      goal: 'Know every piece of information and every action your requirements need, before deciding where they live.',
      output: 'A numbered list of things on paper, each marked I or A, with its requirement written beside it.',
    },
    {
      t: 6,
      points: [
        'Each team works on its own project, starting from its Session 4 Requirements Pack and the broken interface it studied. The broken interface is a source of ideas but is never modified.',
        'Fresh Batch example: R1 gave next batch per oven, oven timers, quantities per product. Teams do the same chain on paper, in words, with no screens.',
        'A good list has 15 to 25 things; fewer usually means a requirement was not opened up. The list feeds the card sort in Act 2.',
      ],
      script:
        'Six minutes at your table. Take your Must requirements first. For each one, write the tasks behind it, then the information to see and the actions to do. Mark each with I or A. Merge duplicates, cross out what nobody needs, and count. Keep this list: next we group it.',
      tip: 'Walk the room and read over shoulders. Help quietly with prompts like “what does a person need to see here?”. Never ask a team to read aloud. Announce the time at 3 minutes and at 1 minute.',
    },
  ),

  // 10 · activity: where would the user expect each thing
  slide5(
    1,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Where Would They Look?',
        subtitle: 'Guess where your user expects each thing',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 3 min' },
      },
      label: 'Practice · Act 1',
      chip: 'TEAM OF TWO · 3 MINUTES',
      title: 'Write where your user would look for each thing',
      steps: [
        { text: 'Next to each thing on your list, write **where your main user would expect to find it**, in the user’s own words, not yours.' },
        { text: 'Mark with a **star** any thing where two different users would expect **different places**. Use your Session 3 notes as evidence.' },
        { text: 'Mark with a **question mark** every guess you cannot back up. These are what we test later.' },
      ],
      timerSeconds: 180,
      timerLabel: 'Practice Clock',
      goal: 'Capture the mental model of your users, so your structure starts from their expectations.',
      output: 'Your list with an expected place for each thing, stars where users differ and question marks where you guess.',
    },
    {
      t: 3,
      points: [
        'Same list as the previous slide; teams add one column: the expected place, in the user’s words. Marks: star for disagreement between users, question mark for a guess.',
        'Fresh Batch: packing order was “Orders” for Salma, “Packing” for Youssef, “Route” for Amine: a star, and a question for the structure (in our case).',
        'The starred and questioned things are the best material for the card sort in Act 2: we ask real people instead of guessing.',
      ],
      script:
        'Three minutes. Beside each thing, write where your main user would look for it, in their words. Put a star where two users would differ. Put a question mark where you are only guessing. Be honest: the question marks are valuable, because that is what we will go and check.',
      tip: 'Walk the room quietly. Prompt with “where did you see that in your notes?”. Never ask a team to read aloud. At the end say that the list goes straight into Act 2, the card sort.',
    },
  ),
];
