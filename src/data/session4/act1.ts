import { slide4 } from '../session4Helpers';
import type { Slide4 } from '../session4Types';

/**
 * Session 4, act 1 · BRIDGE: The story so far (30 min). See course/teacher/session4-plan.md.
 * A simulation of Sessions 1-3 on a NEW case, Fresh Batch (see course/teacher/session4-case.md).
 * Minutes: 1 + 3 + 3 + 3 + 2 + 4 + 3 + 4 + 3 + 4 = 30 (hard maximum).
 */
export const ACT_1_SLIDES: Slide4[] = [
  // 1 · hero
  slide4(
    1,
    'title',
    {
      kind: 'hero',
      sessionLabel: 'SESSION 04',
      pill: 'Master Course · Human-Centered Systems',
      title: 'The Need',
      subtitle: 'Persona · Scenario · Requirement · Journey',
      cta: 'Begin Session 4',
    },
    {
      t: 1,
      points: [
        'This is the Session 3 teaser made real: “The Need”. Session 3 ended with a user study; today we turn it into requirements.',
        'The first 30 minutes are a bridge: a quick simulation of everything so far on a brand new case, a bakery called Fresh Batch.',
        'Today ends with each team of two writing a Requirements Pack for its own project (Milestone 3).',
      ],
      script:
        'Last week you learned how to study users. Today we ask what to do with what we found. We start with a short story that connects Sessions 1, 2 and 3 on a new example, then we build the need step by step.',
      tip: 'Start on time. Say that everything today is done in teams of two at your own tables, and nobody has to speak in front of the room.',
    },
  ),
  // 2 · quiz (Session 3 recall, silent)
  slide4(
    1,
    'question',
    {
      kind: 'quiz',
      heading: {
        title: 'Session 3 Recall',
        subtitle: 'Write your answers on paper first, then compare',
        badge: { icon: 'brain', label: 'Retrieval practice', value: '3 minutes' },
      },
      items: [
        {
          q: 'What is a user?',
          a: 'One real person in one situation: their **goals**, **abilities** and **context**. Not “everyone”.',
        },
        {
          q: 'What is a good research question?',
          a: 'Open, about what people do and why, and **one study can answer** it.',
        },
        {
          q: 'Name one bias that spoils a study.',
          a: 'A **leading question**, or **confirmation bias**: we notice only what we expected.',
        },
        {
          q: 'What are an insight and a profile?',
          a: 'An insight says **what people need and why**. A profile describes **the group** we design for.',
        },
      ],
    },
    {
      t: 3,
      points: [
        'User: goals, abilities, context (Session 3, Act 1). Research question: open, answerable, about people not about our solution.',
        'Bias: leading questions, confirmation bias, and the others seen in the study design act. Insight: need plus because, grounded in patterns.',
        'Audience profile: the group-level summary written at the end of the study. It is the input of today.',
      ],
      script:
        'One minute alone with a sheet of paper. Write what you remember for each of the four questions, no phones. Then compare with your partner. I will show the answers in a moment. The ones that felt fuzzy are the ones to look at again tonight.',
      tip: 'Stay silent for the first minute, then give 1 minute for pairs to compare on paper. Reveal the answers one by one after the pause. Never call on anyone.',
    },
  ),
  // 3 · spotlight: meet Fresh Batch
  slide4(
    1,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'Meet Fresh Batch',
        subtitle: 'A new case: an idea, and nothing built yet',
      },
      statement:
        'Fresh Batch is an industrial bakery. It has an idea for a shared board for the night team. Nothing is built: no screens, no technology. We will follow the idea from the start.',
      points: [
        { icon: 'bulb', lead: 'Only an idea', text: 'A board that says what to bake next and where each shop goes.' },
        { icon: 'users', lead: 'A real night team', text: 'Eight people bake, pack and load 12,000 items a night.' },
        { icon: 'flag', lead: 'Interface comes later', text: 'First we understand people. Screens come much later.' },
      ],
      takeaway: 'Idea first, interface much later: that is the order of good design.',
    },
    {
      t: 3,
      points: [
        'The case: Fresh Batch bakes bread and pastries overnight for 30 shops and 4 hotels; every van must leave at 06:00. About 12,000 items a night, a night shift of 8 people (in our case).',
        'The idea, “Fresh Batch Board”: a simple shared board that tells the team what to bake next, passes on last-minute order changes, and shows packers and the driver which shop goes first. IDEA ONLY.',
        'Why a new case: your own projects already have a broken interface. Fresh Batch starts before any interface exists, which shows that the people and the need come first. This case will return as short bridges in Sessions 7, 10 and 12.',
      ],
      script:
        'Meet Fresh Batch, a bakery that works at night. The owner has an idea, but nothing exists yet: no screen, no tool. We use this case because it lets us see the whole process, from an idea to a real need. And do not forget it: Fresh Batch will come back in short bridges in Sessions 7, 10 and 12.',
      tip: 'Read the statement, then click once per point (idea, team, interface later). Before each click, give 5 seconds of silent thinking. Say clearly that the case will come back in Sessions 7, 10 and 12. Numbers are case numbers, not real statistics.',
    },
  ),
  // 4 · custom BakeryCaseDemo
  slide4(
    1,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: The Fresh Batch Case File',
        subtitle: 'People, the hall, the night, and today’s problems',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'BakeryCaseDemo',
    },
    {
      t: 3,
      points: [
        'People: Hassan the head baker, Salma the oven baker, Youssef the packer, Amine the driver, Nadia the order manager (in our case).',
        'The hall: mixing, three ovens with 40-minute cycles, cooling racks, packing table, loading dock. About 80 dB of noise, flour dust, heat, wet floor.',
        'The night: 01:00 shift starts, 02:00 first bake, 03:30 deadline for order changes, 04:30 packing, 06:00 the vans leave. Today: paper sheet, whiteboard, shouting; waste about 6%, about 3 late deliveries a month.',
      ],
      script:
        'This is the case file. Look at the people first, then the hall, then the night, then how it works today. Do not look for a screen: the problem is the whole situation, not an interface. Think for a moment about which problem you would solve first.',
      tip: 'Click the four tabs in order: People, Place, Night (press “Play the night”), Today. Before each tab, give 5 seconds of silent thinking about what could go wrong there. The anti-persona stays hidden. Nobody answers aloud.',
    },
  ),
  // 5 · flipcards: foundations (Session 1)
  slide4(
    1,
    'concept_model',
    {
      kind: 'flipcards',
      heading: {
        title: 'Foundations in the Bakery',
        subtitle: 'What Session 1 tells us before we do anything',
      },
      cards: [
        {
          icon: 'target',
          term: 'Usability',
          front: 'What three things make a tool usable?',
          back: 'Effective (the job gets done right), efficient (without wasted time), satisfying (people feel fine using it).',
          example: 'The right quantity, baked on time, without stress.',
        },
        {
          icon: 'users',
          term: 'You are not the user',
          front: 'Why is the owner a poor judge here?',
          back: 'The owner works in an office, not in the hot, loud hall. What looks clear on a desk may be useless at the oven.',
          example: 'So we go and watch the night team.',
        },
        {
          icon: 'activity',
          term: 'The loop',
          front: 'Goal, action, feedback: where does it break?',
          back: 'People set a goal, act, and need feedback. If the change is written in a corner, there is no feedback, and the loop breaks.',
          example: 'Salma keeps baking the old quantity.',
        },
      ],
      takeaway: 'Usability, “you are not the user” and the loop: the base we keep using.',
    },
    {
      t: 2,
      points: [
        'Simulation stage 1, Session 1 foundations. Idea: the Fresh Batch Board. Thought: does the owner know how the night works? Goal: understand what “good” means here. Decision: define success as effective, efficient, satisfying. Result: a yardstick we can use later.',
        'You are not the user: the person with the idea is not the night worker. The loop goal, action, feedback explains why a lost change matters.',
        'Keep it quick: two minutes. These are reminders of Session 1, not new theory.',
      ],
      script:
        'Session 1 gave us three tools. Usability means effective, efficient and satisfying. Then, you are not the user: the owner is not in the hall at night. And the loop: goal, action, feedback. Think about which of the three is most at risk in a noisy bakery, then I flip the cards.',
      tip: 'Flip the cards one at a time; before each flip, give 5 seconds of silent thinking. Move fast: this slide has only two minutes. No one answers aloud.',
    },
  ),
  // 6 · custom BakeryHumanDemo
  slide4(
    1,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: People in the Hall',
        subtitle: 'Session 2 meets 80 dB, gloves and flour',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'BakeryHumanDemo',
    },
    {
      t: 4,
      points: [
        'Simulation stage 2, the human (Session 2). Idea: the board. Thought: what can a person in this hall actually do? Goal: know the limits of the people. Decision: design for gloved hands, 2 to 4 metres, no sound, few items at once. Result: limits written as facts.',
        'Four mini-experiments: gloves vs target size (Fitts), reading distance (rule of thumb only), noise vs a sound alert, working memory under stress (about 4 chunks).',
        'Before each reveal, students think silently. The lecturer reveals the decision after the thinking pause. The hall’s limits are the limits of people.',
      ],
      script:
        'Session 2 explained how people see, point, hear and remember. Now put those limits into the hall. Gloves: how big must a button be? Distance: can you read the whiteboard from the oven? Noise: will a beep be heard? Memory: how many order lines stick? For each one, think first, then I show the decision.',
      tip: 'Use the four tabs: Gloves, Distance, Noise, Memory. Before each result, 5 seconds of silent thinking; for Memory, students write what they remember on paper, nobody says it aloud. Reveal the decision after the pause. Reading-distance numbers are a rule of thumb.',
    },
  ),
  // 7 · journey: the user study (Session 3)
  slide4(
    1,
    'concept_model',
    {
      kind: 'journey',
      heading: { title: 'The User Study in 4 Steps', subtitle: 'What Session 3 added to the bakery' },
      steps: [
        {
          icon: 'bulb',
          title: 'Assumptions',
          short: 'What do we think we know?',
          detail: 'The owner thinks staff need more information. This is a guess, not a fact: it is a belief we must check before we build.',
        },
        {
          icon: 'compass',
          title: 'Research question',
          short: 'What do we need to find out?',
          detail: 'How does the night team find out what to bake next, and what happens when an order changes? One open question, answerable by watching.',
        },
        {
          icon: 'users',
          title: 'Who to study',
          short: 'The night shift, not the office',
          detail: 'Study the night team: head baker, oven baker, packer, driver. Go to them, in the hall, at night, with their real work.',
        },
        {
          icon: 'eye',
          title: 'What we saw',
          short: 'Two nights, three interviews',
          detail: 'We shadowed 2 nights, interviewed 3 people and watched a packer think aloud. This gave 12 notes on what really happens.',
        },
      ],
      footer: 'Check the idea against real people before building anything.',
    },
    {
      t: 3,
      points: [
        'Simulation stage 3, the user study (Session 3). Idea: the board. Thought: “staff need more information” is an assumption. Goal: replace guesses with evidence. Decision: shadow 2 nights, interview Hassan, Salma and Amine, ask Youssef to think aloud while packing. Result: 12 observation notes.',
        'The four steps match Session 3: assumptions, research question, who to study, methods. The result is raw material, not yet a decision.',
        'In our case the study found, for instance, that people read the board from 4 metres, and changes get missed.',
      ],
      script:
        'Session 3 gave us a method in four steps. First, name the assumption: the owner believes staff need more information. Second, turn it into a question. Third, choose who to study: the night team. Fourth, go and watch. Before I click each step, think what you would have chosen. Then I show what the team chose.',
      tip: 'Click the four steps in order. Before each click, 5 seconds of silent thinking: what would you decide here? Reveal the case decision after the pause. Pairs compare on paper only.',
    },
  ),
  // 8 · custom BakeryStudyDemo
  slide4(
    1,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: From Notes to Profile',
        subtitle: 'One night of notes becomes patterns and insights',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer-run' },
      },
      component: 'BakeryStudyDemo',
    },
    {
      t: 4,
      points: [
        'The chain: 12 observation notes -> 5 patterns -> 4 insight sentences -> 1 audience profile (in our case).',
        'Example insight: night bakers need to see the next batch from where they stand, because they work 2 to 4 metres from the board and their hands are busy.',
        'The profile ends with open questions: what does Hassan decide first when an order changes, how do the two shifts hand over, what would the owner accept to spend? Today we start answering them.',
      ],
      script:
        'Here are the notes from one night. Alone, look for what repeats. Now watch them slide into five patterns, then four insight sentences, then one audience profile. Each step throws away detail and keeps meaning. And look at the end: the profile still leaves questions open.',
      tip: 'Click Next four times: notes, patterns, insights, profile. Before the patterns step, give 10 seconds of silent thinking: what repeats in these notes? Reveal after the pause. Nobody answers aloud.',
    },
  ),
  // 9 · custom ProcessMapBridge
  slide4(
    1,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'The Whole Process on One Map',
        subtitle: 'You are here: we know the user, not yet the need',
        badge: { icon: 'route', label: 'Process map', value: 'You are here' },
      },
      component: 'ProcessMapBridge',
    },
    {
      t: 3,
      points: [
        'The map: Idea, Humans (S2), User (S3), Need (S4), Structure (S5), Interaction (S6), UI (S7), Prototype (S8), Evaluate (S9), Inclusive (S10), Emerging (S11), Showcase (S12). Each stage takes something IN and gives something OUT.',
        'Done so far: Humans gave a baseline and the limits of people; User gave a study report with an audience profile. “You are here” is after Session 3.',
        'What is missing is the need: a clear, written list of what the system must do. Output of Session 4 is the Requirements Pack, which feeds Session 5.',
      ],
      script:
        'Here is the whole course on one map. Every stage takes something in and gives something out, and the output of one is the input of the next. We have the humans and the user. We do not yet have the need. That is today. Look for a moment at the map and see what we would have to guess if we skipped today.',
      tip: 'Click “Replay the journey” once, then click Humans, User and Need to show IN and OUT. Pause 5 seconds of silent thinking before opening “Need”. Say that Fresh Batch will return as short bridges in Sessions 7, 10 and 12, always on this map.',
    },
  ),
  // 10 · spotlight: open questions
  slide4(
    1,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'Knowing Is Not Deciding',
        subtitle: 'What the study told us, and what is still open',
      },
      statement:
        'We know a lot about the night team, but a study does not tell us what to build. Between what we know and what we decide, we need a clear statement of the need.',
      points: [
        { icon: 'list', lead: 'What first?', text: 'What does Hassan decide first when an order changes?' },
        { icon: 'clock', lead: 'The handover', text: 'How do the two shifts hand over to each other?' },
        { icon: 'scale', lead: 'The money', text: 'What would the owner accept to spend on the idea?' },
      ],
      takeaway: 'Next: turn what we know into the need that guides every decision.',
    },
    {
      t: 4,
      points: [
        'Open questions from the case: what does Hassan decide first when an order changes? How do the two shifts hand over? What would the owner accept to spend? (budget about 2,000 euros, live in 3 months, in our case).',
        'Simulation result so far: idea, human limits, user evidence. The decision “what must the system do?” is still open. Knowing is not deciding: a pile of notes does not choose for us.',
        'Plan for today: evidence -> personas -> goals, constraints, feelings -> tasks, scenarios, journeys -> good requirements -> priorities and value. Each team does it for its own project; Fresh Batch comes back in short bridges in Sessions 7, 10 and 12.',
      ],
      script:
        'We have a lot of knowledge now. But try this: with only the study in your hands, could you say exactly what the board must do first? Think for a moment. Probably not. Three questions are still open. That gap between knowing and deciding is the need, and building it is the job of this session. We will also meet Fresh Batch again in Sessions 7, 10 and 12.',
      tip: 'Read the statement, then click once per open question. Before each click, give 5 seconds of silent thinking: what would you decide? End by saying that today each team of two does the same chain on its own project, starting from its Session 3 study report, and that Fresh Batch returns in Sessions 7, 10 and 12.',
    },
  ),
];
