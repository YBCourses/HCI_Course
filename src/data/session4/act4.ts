import { slide4 } from '../session4Helpers';
import type { Slide4 } from '../session4Types';

/**
 * SESSION 4 · ACT 4 · TASKS, SCENARIOS, JOURNEYS (35 min), slides 28-36 of the plan.
 * Minutes per slide: 1 + 2 + 5 + 3 + 5 + 7 + 2 + 5 + 5 = 35.
 */
export const ACT_4_SLIDES: Slide4[] = [
  // 28 · divider (1 min)
  slide4(
    4,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 4,
      title: 'Tasks, Scenarios, Journeys',
      question: 'What does your persona do, one story at a time, and how does it feel?',
      learn: [
        'IN: your persona, their goals and their constraints (Act 3)',
        'Task, scenario, journey: three ways to describe what people do',
        'OUT: one scenario and a journey map, written in words, on paper',
      ],
    },
    {
      t: 1,
      points: [
        'Act 3 gave each team a persona, goals, constraints and an empathy map. Act 4 describes what that person actually does.',
        'Three words to keep apart: task, scenario, journey. Each one zooms in or out on the same person.',
        'Everything is on paper, in words. Nobody draws a screen.',
      ],
      script:
        'You now know who your person is and what limits them. In this act we follow that person through their work. We use three tools. A task says what they are trying to get done. A scenario tells one short story of one person doing one task. A journey follows the whole experience over time, with feelings. We build each one for Fresh Batch first, then you do it for your own persona.',
      tip: 'Short slide. Announce the three words and the output (a scenario and a journey map). Nobody answers anything here.',
    },
  ),

  // 29 · spotlight: tasks, not features (2 min)
  slide4(
    4,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'Tasks, Not Features',
        subtitle: 'Start from what people try to get done',
        badge: { icon: 'target', label: 'Task', value: 'A goal in action' },
      },
      statement: 'A task is what the person is trying to get done. It is not a button, a screen or a feature.',
      points: [
        { icon: 'target', lead: 'Task', text: 'What they try to get done: "run the night\'s bake"' },
        { icon: 'book', lead: 'Scenario', text: 'One story: Hassan, 03:20, a change arrives' },
        { icon: 'route', lead: 'Journey', text: 'The whole night, with feelings, from 01:00 to 06:00' },
      ],
      takeaway: 'Task = the what. Scenario = one story. Journey = the whole experience over time.',
    },
    {
      t: 2,
      points: [
        'Task: what the person is trying to get done, in a verb phrase ("know today\'s orders", "pack the crates"). It says nothing about how a tool would do it.',
        'Scenario: one story of one persona doing one task in one context. It has a time, a place and a trigger.',
        'Journey: the whole experience over time, many tasks in a row, with how the person feels at each step.',
        'Why start from tasks: a feature list asks "what can we build?"; a task list asks "what must people get done?".',
      ],
      script:
        'Think of zooming a camera. The task is a label on a box: what the person is trying to get done. For Hassan, run the night\'s bake. The scenario zooms in to one story: it is 03:20, shop 14 phones, Hassan must change the plan. The journey zooms out to the whole night, from 01:00 to 06:00, and adds how Hassan feels along the way. Same person, three distances. And notice that none of them mention a screen or a button. We design for what people get done, not for features.',
      tip: 'Click nothing, just read the three lines slowly. Give 5 seconds of silent thinking: each student writes one task that their own persona tries to get done. Then say the three words once more: what, one story, whole experience. No sharing in the room.',
    },
  ),

  // 30 · custom TaskBreakdownDemo (5 min)
  slide4(
    4,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Run the Night\'s Bake',
        subtitle: 'One task broken into steps, and where today fails',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'TaskBreakdownDemo',
    },
    {
      t: 5,
      points: [
        'Breaking a task into steps (task analysis): six main steps, each with 2 or 3 smaller ones, for "run the night\'s bake" in our case.',
        'Click a main step to expand it. The steps where today fails are 1.2 (check late changes), 2.3 (write the plan), 4.3 (tell the team), 5.1 (find the shop\'s crates) and 6.2 (tell the driver the route).',
        'The failing steps are where requirements will come from in Act 5. A step is not a feature: "tell the team" says what, not how.',
        'Your own team will do the same with its broken interface: a task, its steps, and the steps that fail today.',
      ],
      script:
        'Here is Hassan\'s whole job in one line: run the night\'s bake. That is too big to design for, so we break it down. Know the orders. Plan the batches. Bake. Handle a change. Pack. Load and hand over. I open each one to show the small steps inside. Now watch where today fails: checking late changes, writing the plan, telling the team about a change, finding the right crates, telling the driver the route. These are exactly the steps where our study notes showed trouble. The task list tells us where to look.',
      tip: 'Click one main step at a time and expand it. Before revealing the red steps, pause 5 seconds of silent thinking: teams of two guess on paper which steps will fail today, using the study notes. Then click to reveal. Finally, 20 seconds: each team writes the main task of its own persona in one verb phrase. Nobody speaks to the room.',
    },
  ),

  // 31 · flipcards: anatomy of a scenario (3 min)
  slide4(
    4,
    'concept_model',
    {
      kind: 'flipcards',
      heading: {
        title: 'Anatomy of a Scenario',
        subtitle: 'One persona, one task, one story',
        badge: { icon: 'book', label: 'Scenario', value: '6 parts' },
      },
      cards: [
        {
          icon: 'users',
          term: 'Who and goal',
          front: 'Which persona, and what do they want to get done?',
          back: 'Name one persona from your study and one goal. One persona and one task per scenario, never a crowd.',
          example: 'Hassan wants every van out at 06:00',
        },
        {
          icon: 'clock',
          term: 'Context and trigger',
          front: 'Where, when, and what starts the story?',
          back: 'Context is the place, time and conditions. The trigger is the event that makes the person act.',
          example: '03:20, loud hall, shop 14 phones',
        },
        {
          icon: 'route',
          term: 'Steps',
          front: 'What does the person do, in order?',
          back: 'A few plain steps, in words. Say what the person does, not which button they press.',
          example: 'Notes the change, checks Oven 2, tells the team',
        },
        {
          icon: 'flag',
          term: 'Outcome',
          front: 'How does the story end?',
          back: 'The result for the person: goal reached or not, and how they feel. Our scenario ends with a clear result.',
          example: 'Everyone bakes the new quantity',
        },
      ],
      takeaway: 'A scenario is a short story: who, goal, context, trigger, steps, outcome.',
    },
    {
      t: 3,
      points: [
        'A scenario is a short story of ONE persona doing ONE task in a context. Typically 4 to 8 sentences.',
        'Six parts: who, goal, context, trigger, steps, outcome. The trigger is what starts the story; the context is the conditions around it.',
        'A scenario is not a requirement and not a design: it never says which tool or screen. It describes the person\'s situation.',
        'Compare: task = "handle a change"; scenario = "Hassan, 03:20, shop 14 asks for 60 more baguettes while Oven 2 is mid-cycle"; journey = the whole night.',
      ],
      script:
        'A scenario has six parts. Who: Hassan. Goal: every van out at 06:00. Context: the hall at night, loud, hot, hands busy. Trigger: at 03:20, shop 14 phones and asks for 60 more baguettes. Steps: Hassan hears the call, checks Oven 2, which is mid-cycle with croissants, and has to tell the team. Outcome: either everyone bakes the new quantity, or Salma misses it. See how this differs from the task. The task is just "handle a change". The scenario is that one story, with a time, a place and a person.',
      tip: 'Flip one card at a time. Before each flip, 5 seconds of silent thinking on the question on the front. Read the Fresh Batch example aloud after each flip. At the end, teams of two quietly choose which of the six parts is usually forgotten (answer: the trigger). No cold-calling.',
    },
  ),

  // 32 · custom ScenarioBranchDemo (5 min)
  slide4(
    4,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: A Change at 03:20',
        subtitle: 'Three ways to handle one scenario, and what each costs',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'ScenarioBranchDemo',
    },
    {
      t: 5,
      points: [
        'The scenario: Hassan, 03:20. Shop 14 phones: 60 more baguettes. Oven 2 is mid-cycle with croissants. What must Hassan see and do?',
        'Option A, write on the board and shout: Salma misses it (note 4). Option B, change the plan where everyone sees it and mark it NEW: everyone knows in under a minute. Option C, call each baker: two bakers reached, one oven idles.',
        'One scenario can branch. Comparing the branches shows what a good outcome needs: this is where requirements come from, without designing anything yet.',
        'Branches are different ways the same story could go. They are not three products.',
      ],
      script:
        'Same story, three endings. It is 03:20, shop 14 wants 60 more baguettes, and Oven 2 is busy with croissants. Option A: Hassan writes it on the board and shouts. Salma does not see the new line and bakes the old quantity, exactly what we saw in our notes. Option B: the change is put where everyone can see it, marked NEW. Everybody knows within a minute. Option C: Hassan calls each baker. He reaches two, and one oven sits idle. Look at what we learn: the outcome we want is not "a tool", it is that every station learns about the change quickly. A scenario shows us what has to be true.',
      tip: 'Show the scenario first, hide the options. Give 15 seconds of silent thinking: each student writes on paper what Hassan should do. Then click each option one at a time and read the consequence aloud. Teams of two quietly compare their guess with the three options. Nobody speaks to the room.',
    },
  ),

  // 33 · activity: write one scenario (7 min)
  slide4(
    4,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Write One Scenario',
        subtitle: 'One persona, one task, one short story',
        badge: { icon: 'clock', label: 'Practice', value: '7 minutes' },
      },
      label: 'Practice · Scenarios',
      chip: 'TEAMS OF TWO · 7 MINUTES',
      title: 'Write one scenario for your persona',
      steps: [
        { text: 'Take your **persona card** and your **study report**. Choose **one task** that your persona does, and a **moment** where today\'s interface or process fails (look at your notes).' },
        { text: 'Fill the **six parts** in words: **who** and **goal**, **context**, **trigger**, **steps** (3 to 6, in order) and **outcome**. Say what the person does, not which button they press.' },
        { text: '**Reread** it as your persona: is it **one** person, **one** task, **one** moment? Mark with a star the line that comes from a **real note**. Fix any line that is a guess.' },
      ],
      timerSeconds: 420,
      timerLabel: 'Practice Clock',
      goal: 'Turn one real moment from your study into a short story that your whole team can picture.',
      output: 'One scenario on paper: who, goal, context, trigger, steps and outcome, with at least one starred real note.',
    },
    {
      t: 7,
      points: [
        'Fresh Batch model, to read aloud once: "Hassan wants every van out at 06:00. It is 03:20 in a loud hall. Shop 14 phones for 60 more baguettes; Oven 2 is mid-cycle. He notes the change, checks Oven 2 and has to tell the team. Today he writes it in a corner and shouts, and Salma keeps baking the old quantity."',
        'Each team uses its own persona from Act 2 and its own User Study Report from Session 3 as the input; the broken interface is the starting point.',
        'Common mistakes: two personas in one story, a task that is really a feature ("use the app"), a missing trigger, steps that describe buttons.',
        'Nothing to draw: no screens. Words only.',
      ],
      script:
        'Seven minutes, with your partner, at your table. Take your persona and your study notes. Choose one task and one moment where it goes wrong today. Write the six parts in plain words: who, goal, context, trigger, steps, outcome. Keep it to one person and one moment. Then reread it as your persona and put a star on the lines that come from a real note. If a line is a guess, fix it. No screens, no buttons. Just the story.',
      tip: 'Start the timer after reading the Fresh Batch model once. Walk the room quietly; read over shoulders only if invited. Privately hint at teams whose scenario has two personas, no trigger, or steps like "clicks on the app". At 1 minute left, say the time out loud.',
    },
  ),

  // 34 · spotlight: a journey map (2 min)
  slide4(
    4,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'A Journey Map',
        subtitle: 'The same story over time, with feelings',
        badge: { icon: 'route', label: 'Journey', value: '5 to 7 steps' },
      },
      statement: 'A journey map follows the whole experience, step by step, and shows how the person feels at each one.',
      points: [
        { icon: 'route', lead: '5 to 7 steps', text: 'The experience in order, from start to end' },
        { icon: 'heart', lead: 'A feeling each', text: '1 = stressed, 5 = calm; the low points stand out' },
        { icon: 'bulb', lead: 'Pain and chance', text: 'One pain and one opportunity per step' },
      ],
      takeaway: 'A scenario is one moment. A journey joins many moments and shows where it hurts most.',
    },
    {
      t: 2,
      points: [
        'Journey map: the whole experience of one persona over time, with their feelings. It zooms out from a scenario: many tasks and moments in a row.',
        'Our rule: 5 to 7 steps, one feeling per step (1 = stressed to 5 = calm), one pain and one opportunity per step.',
        'The lowest feelings point to the most urgent pains; the opportunities are first ideas for what must be true, not solutions.',
        'The scenario you just wrote is one moment of the journey, most likely one of its low points.',
      ],
      script:
        'A scenario is one story at one moment. A journey is all the moments, joined together. For Hassan, that is his whole night, from 01:00 to 06:00. We split it into five to seven steps. At each step we mark how he feels, from one, stressed, to five, calm. And we write one pain and one opportunity. When we join the feelings, we get a curve. The low point shows where it hurts most. The scenario you just wrote is probably one of those low points. Now let us see Hassan\'s curve.',
      tip: 'Click nothing; read the three lines slowly. Give 5 seconds of silent thinking: students guess which step of Hassan\'s night is the lowest. Do not take answers; the next demo reveals it. Nobody speaks to the room.',
    },
  ),

  // 35 · custom JourneyCurveDemo (5 min)
  slide4(
    4,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Hassan\'s Night',
        subtitle: 'An emotion curve with pains and opportunities',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'JourneyCurveDemo',
    },
    {
      t: 5,
      points: [
        'Seven steps in our case: Prepare 4, Plan 3, Bake 3, Change 1, Pack 2, Load 2, Handover 4 (1 = stressed, 5 = calm).',
        'Click a stage to see its pain and its opportunity. The lowest point is the Change at 03:30 (feeling 1: a change in a corner is missed).',
        'Where the curve dips, the pain is greatest: this is where requirements will be needed first. The opportunities are what must become possible, not a tool.',
        'Difference once more: task = what he gets done; scenario = one moment (03:20); journey = the whole night with feelings.',
      ],
      script:
        'Here is Hassan\'s night as one curve. Prepare at 01:00, he feels a four: orders are in front of him. Plan, a three: writing on the whiteboard takes eight minutes. Bake, a three: an oven waits six minutes for a decision. Change, a one: the change in a corner is missed. Pack, a two: "which shop first?" three times. Load, a two: the driver waits and calls Hassan. Handover at 06:00, a four: relief, if it worked. I click each stage to show its pain and its opportunity. The deepest dip is the change. That is the scenario we just studied. Journeys find the big problems; scenarios explain them.',
      tip: 'Before the reveal, 10 seconds of silent thinking: teams of two sketch a rough curve in words ("high, low, low...") on paper. Click the stages one at a time, left to right, and read the pain and the opportunity aloud. Then show the lowest dip and ask silently: does it match your guess? No sharing in the room.',
    },
  ),

  // 36 · activity: map your user's journey (5 min)
  slide4(
    4,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Map the Journey',
        subtitle: 'Five to seven steps, a feeling, a pain, an opportunity',
        badge: { icon: 'clock', label: 'Practice', value: '5 minutes' },
      },
      label: 'Practice · Journeys',
      chip: 'TEAMS OF TWO · 5 MINUTES',
      title: 'Map your persona\'s journey',
      steps: [
        { text: 'On paper, write **5 to 7 steps** of your persona\'s experience, **in order**, from start to end. Your scenario is **one** of them.' },
        { text: 'For each step write a **feeling from 1 to 5** (**1 = stressed**, **5 = calm**). Use your **empathy map** and your study **notes**, not your own guess.' },
        { text: 'For each step add **one pain** (what goes wrong) and **one opportunity** (what must become possible, **not** a tool). Circle the **lowest** feeling.' },
      ],
      timerSeconds: 300,
      timerLabel: 'Practice Clock',
      goal: 'See the whole experience of your persona, and find where it hurts most.',
      output: 'A journey on paper: 5 to 7 steps, each with a feeling (1 to 5), one pain and one opportunity, and the lowest point circled.',
    },
    {
      t: 5,
      points: [
        'Fresh Batch model to keep on screen in mind: 7 steps, Prepare 4, Plan 3, Bake 3, Change 1, Pack 2, Load 2, Handover 4; the lowest point is the Change.',
        'Each team uses its own persona, its Session 3 User Study Report as the input, and the broken interface as the starting point. Everything in words, on paper; no screens.',
        'Common mistakes: more than 7 steps, a feeling without a note behind it, an opportunity that is really a product ("a big screen"), no low point.',
        'This journey feeds Act 5: the pains will become requirements.',
      ],
      script:
        'Five minutes, with your partner. First, list five to seven steps of your persona\'s experience, in order. Your scenario is one of them. Second, for each step, write a feeling from one to five. One is stressed, five is calm. Base it on your notes and your empathy map. Third, for each step write one pain and one opportunity. An opportunity says what must become possible, not which tool to build. At the end, circle the lowest point. In the next act, those pains turn into requirements.',
      tip: 'Start the timer. Walk the room quietly, only reading over shoulders if invited. Privately hint at teams with more than 7 steps, with feelings that are all the same, or with opportunities such as "an app". Say the time at 1 minute left. Teams finishing early compare the lowest point with their scenario.',
    },
  ),
];
