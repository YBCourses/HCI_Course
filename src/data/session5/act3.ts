import { slide5 } from '../session5Helpers';
import type { Slide5 } from '../session5Types';

/**
 * Session 5, act 3: NAMES AND LABELS (slides 21-27, 30 minutes).
 * Minutes: 1 + 3 + 7 + 3 + 3 + 10 + 3 = 30.
 * See course/teacher/session5-plan.md. Case: course/teacher/session4-case.md + session5-case.md (Fresh Batch).
 */
export const ACT_3_SLIDES: Slide5[] = [
  /* 21 · divider (1 min) */
  slide5(
    3,
    'concept_model',
    {
      kind: 'divider',
      actNumber: 3,
      title: 'Names and Labels',
      question: 'What do we call each group, so people know where to go?',
      learn: [
        'IN: your groups from Act 2 (cards sorted by real people)',
        'Labels: the words people read to decide where to click',
        'OUT: a label for every group, checked on paper with your partner',
      ],
    },
    {
      t: 1,
      points: [
        'Act 2 gave us groups of cards. A group without a name is not yet usable: people need words to choose where to go.',
        'Thread: things, then groups, now NAMES. Next comes the structure itself (Act 4).',
        'Fresh Batch first (lecturer-run), then each team of two works on its own project.',
      ],
      script:
        'You have groups. But a group has no name yet, and nobody can click on a pile of cards. In this act we find the words. First the bakery, then your own project.',
      tip: 'Short slide. Announce the act and move on. Nobody needs to answer anything.',
    },
  ),

  /* 22 · spotlight: a label is a promise (3 min) */
  slide5(
    3,
    'concept_model',
    {
      kind: 'spotlight',
      heading: {
        title: 'A Label Is a Promise',
        subtitle: 'People read the words to decide where to go',
        badge: { icon: 'compass', label: 'Key idea', value: 'Information scent' },
      },
      statement:
        'People follow words that smell like what they want. A label promises what is behind it; if the promise is wrong, people get lost.',
      points: [
        { icon: 'eye', lead: 'Scent', text: 'We click the word that seems closest to our goal.' },
        { icon: 'route', lead: 'A trail', text: 'Each good label leads to the next one, until we arrive.' },
        { icon: 'alert', lead: 'Weak scent', text: 'A vague word makes people guess, backtrack or give up.' },
      ],
      takeaway: 'In our case: a baker who wants "what to bake next" looks for those exact words.',
    },
    {
      t: 3,
      points: [
        'Information scent: people judge each label by how close it seems to the thing they want, and they follow the strongest scent. A strong scent leads straight to the goal; a weak one makes people wander.',
        'A label is a short promise. "Orders" promises orders; if the changes are inside, people looking for changes may never find them.',
        'Fresh Batch example: Salma wants to know what to bake next. She looks for the words she uses on the floor, not the words of the office. Teams will check their own labels later in the act.',
      ],
      script:
        'Think of a label as a promise. When you look for something, you read the words and click the one that smells closest to what you want. That is called information scent. A strong scent takes you straight there. A weak scent makes you guess. Let us see how this works for a baker who wants to know what to bake next.',
      tip: 'Click the three points one at a time. Before each click, give 5 seconds of silent thinking: "when did a word on a website send me the wrong way?". Nobody answers aloud. Then read the bakery takeaway.',
    },
  ),

  /* 23 · custom LabelTestDemo (7 min) */
  slide5(
    3,
    'experiment',
    {
      kind: 'custom',
      heading: {
        title: 'Demo: Five Names, One Thing',
        subtitle: 'Which label would a baker click? Then languages and icons',
        badge: { icon: 'flask', label: 'Live demo', value: 'Lecturer runs it' },
      },
      component: 'LabelTestDemo',
    },
    {
      t: 7,
      points: [
        'Step 1: the thing is "what to bake next". Five labels: Next batch, Production plan, Fournée suivante, الدفعة التالية, Prochaine cuisson. Silently guess which one a baker would click, then reveal the bars (illustrative results from 12 bakers: Fournée suivante 6, الدفعة التالية 3, Next batch 2, Prochaine cuisson 1, Production plan 0).',
        'Step 2: "Order changes" with candidates (Changes, Modifications, Update, NEW). A NEW badge works across languages, because the badge is a symbol, not a sentence.',
        'Step 3: numbers and icons help people who read little. Lesson: use the words people use on the floor, in their language, and test labels with the users, not with ourselves.',
      ],
      script:
        'Here is one thing: what to bake next. And five names for it. Think quietly: which would a baker click? Now the results from 12 bakers, in our case. The office word, Production plan, got nobody. The French word from the floor won. Then we see that a badge like NEW works in every language, and that numbers and icons help people who read less. The lesson: use their words, and test them.',
      tip: 'Click "Reveal" only after 10 seconds of silent guessing; teams may compare guesses quietly at their table. Then click through step 2 and step 3. Point out that the Arabic label is read right to left. Nobody is asked to read or say anything in front of the room.',
    },
  ),

  /* 24 · flipcards: label rules (3 min) */
  slide5(
    3,
    'concept_model',
    {
      kind: 'flipcards',
      heading: {
        title: 'Four Rules for Good Labels',
        subtitle: 'Click a card to turn it over',
      },
      cards: [
        {
          icon: 'users',
          term: 'Use their words',
          front: 'Whose words do we write: ours or theirs?',
          back: 'Take words from your card sorts, interviews and notes. People find what they can name in their own language.',
          example: 'Bakers say "fournée", not "production plan".',
        },
        {
          icon: 'target',
          term: 'Be specific',
          front: 'Can one word cover everything?',
          back: 'Say what is inside. A broad word like "Other" or "Info" hides things and sends people the wrong way.',
          example: '"Packing order" beats "Other".',
        },
        {
          icon: 'grid',
          term: 'Be consistent',
          front: 'Same thing, same name, everywhere?',
          back: 'Use one name for one thing, with the same style. Two names for the same thing look like two different things.',
          example: 'Not "Changes" here and "Updates" there.',
        },
        {
          icon: 'book',
          term: 'No jargon',
          front: 'Would a new night baker understand it?',
          back: 'Jargon is an insider word that outsiders do not know. If the user would not say it, do not write it.',
          example: '"Dispatch module" becomes "Route order".',
        },
      ],
      takeaway: 'Short, plain and the same everywhere. If in doubt, test it with a user.',
    },
    {
      t: 3,
      points: [
        'Rule 1, user words: the best source is what people said in the card sort and the interviews. Rule 2, specific: a label must say what is inside; "Other" is a warning sign.',
        'Rule 3, consistent: one name per thing, in the same style and the same language logic. Rule 4, no jargon: words from the office or the project team are not words from the floor.',
        'In our case (Fresh Batch): "Production plan" lost to "Fournée suivante", and "Other" was where Salma, Youssef and Amine put the handover notes because nothing else fit.',
      ],
      script:
        'Four rules for a label. Use their words. Be specific. Be consistent. And no jargon. Turn each card over and see the bakery example. The bakers say fournée, not production plan. Other is the word we use when we have not decided yet, and people cannot find anything inside it.',
      tip: 'Click the four cards in order. Give 5 seconds of silent thinking on the front of each card before flipping it. No one answers aloud. Tell teams that their own labels in the next practice will be checked against these four rules.',
    },
  ),

  /* 25 · versus: vague vs clear (3 min) */
  slide5(
    3,
    'concept_model',
    {
      kind: 'versus',
      heading: {
        title: 'Vague or Clear?',
        subtitle: 'Same bakery group, two ways to name it',
        badge: { icon: 'scale', label: 'Compare', value: 'Weak vs strong scent' },
      },
      leftLabel: 'VAGUE label',
      rightLabel: 'CLEAR label',
      leftTone: 'warn',
      rightTone: 'good',
      rows: [
        { icon: 'list', left: '"Other" (handover notes inside)', right: '"Night record" (handover, waste, late log)' },
        { icon: 'clock', left: '"Production plan" (office word)', right: '"Next batch" (what bakers say)' },
        { icon: 'flag', left: '"Orders" for everything about orders', right: '"Today’s orders" and a NEW badge on changes' },
        { icon: 'book', left: '"Dispatch module"', right: '"Route order" (for the driver)' },
      ],
      takeaway: 'A clear label says what is inside, in words the user already says.',
    },
    {
      t: 3,
      points: [
        'Vague labels fail in two ways: they are too broad ("Other", "Info", "Tools") or they use the office\'s words, not the floor\'s.',
        'In our case: "Orders" attracted people who wanted order changes (5 of 12 went there first in the tree test later); one fix is a NEW badge on the Now screen, then test again.',
        'A clear label is not always longer. It is the word the person expects, and it differs from its neighbours.',
      ],
      script:
        'Here are the same four groups in the bakery. Left side: vague names. Right side: clear names. Other hides the handover notes; Night record tells you what is there. Production plan is the office\'s word; Next batch is the baker\'s word. Look at the Orders label: it is so broad that people looking for changes end up there by mistake. We will see that again in Act 5.',
      tip: 'Use the switch to show the left side first, then the right side. Pause 5 seconds of silent thinking on each row before moving on: "where would I click?". Nobody answers aloud. Tell teams the next practice will let them try exactly this on their own labels.',
    },
  ),

  /* 26 · activity: write and test labels (10 min) */
  slide5(
    3,
    'activity_timer',
    {
      kind: 'activity',
      heading: {
        title: 'Practice: Label It, Then Test It',
        subtitle: 'One label per group, tested on paper with your partner',
        badge: { icon: 'clock', label: 'Practice', value: 'Team of two · 10 min' },
      },
      label: 'Practice · Act 3',
      chip: 'TEAM OF TWO · 10 MINUTES',
      title: 'Write a label for each group, then run a label test',
      steps: [
        {
          text: 'Take your groups from Act 2. Write **one label per group** on its own line, using the words your users said. Check each one against the four rules: **user words, specific, consistent, no jargon**.',
        },
        {
          text: 'Write **three tasks** your user does, each on a small slip of paper (for example, “find out what to do next”). Cover the contents of your groups so that **only the labels** are visible.',
        },
        {
          text: 'Silent test: **your partner reads one task**, then points to the label they would click, without speaking. Mark a tick if it was the right group, a cross if not. Swap roles, then **rewrite every label that got a cross**.',
        },
      ],
      timerSeconds: 600,
      timerLabel: 'Practice Clock',
      goal: 'Find out, before building anything, whether people could find things from the labels alone.',
      output: 'A list of labels (one per group) with three tested tasks and any labels you rewrote.',
    },
    {
      t: 10,
      points: [
        'Each team uses the groups it made in Act 2 and the words from its own card sort and Session 3 notes. The broken interface it started from can give vocabulary, good or bad.',
        'A label test on paper works like this: the tester sees only the labels, and says (here: silently points to) where they would click for a task. If they point to the wrong label, the label has a weak scent.',
        'Do not explain a label to your partner during the test: if you have to explain it, it is not clear. Rewrite labels that fail, then retest the same task if time allows.',
      ],
      script:
        'Ten minutes at your table. First, one label per group. Use the words your users use. Check each one against the four rules. Then write three tasks on slips of paper, and hide what is inside the groups, so only the labels show. Your partner reads a task and points to the label they would click, without speaking. A tick if right, a cross if not. Then swap. Finally, fix the labels that failed.',
      tip: 'Walk the room and read over shoulders. Quiet prompts: "whose word is that: yours or the user\'s?", "what does the label hide?". Never ask a team to read aloud. Announce the time at 5 minutes (swap roles) and at 2 minutes. Move on when most pages have at least one tested label.',
    },
  ),

  /* 27 · checklist: five label questions (3 min) */
  slide5(
    3,
    'concept_model',
    {
      kind: 'checklist',
      heading: {
        title: 'Five Questions for a Label',
        subtitle: 'A quick check before you keep a name',
        badge: { icon: 'check', label: 'Toolbox', value: '5 questions' },
      },
      items: [
        {
          icon: 'users',
          title: 'Is it their word?',
          text: 'Would a user say it? Take it from the card sort or interviews, not from us.',
        },
        {
          icon: 'target',
          title: 'Is it specific?',
          text: 'Does it say what is inside? "Other" and "Info" fail this test.',
        },
        {
          icon: 'grid',
          title: 'Is it consistent?',
          text: 'One name for one thing, the same style everywhere in the interface.',
        },
        {
          icon: 'compass',
          title: 'Is it different?',
          text: 'Could it be mixed up with a neighbour? Two similar labels make people guess.',
        },
        {
          icon: 'eye',
          title: 'Did a user find it?',
          text: 'In the label test, did the partner point to the right group on the first try?',
        },
      ],
      footer: 'Also check: language (Arabic and French in the bakery) and whether a number or an icon helps.',
    },
    {
      t: 3,
      points: [
        'Five questions: their word, specific, consistent, different from its neighbours, and found by a real person in a test.',
        'The fifth question is the most important: the other four are good habits, but only a test shows whether the label works.',
        'In our case, a label that passes: "Fournée suivante" (their word, specific, tested with 12 bakers). Languages and icons: when users mix two languages, test both and keep numbers or badges (NEW) for people who read little.',
      ],
      script:
        'Five quick questions for any label. Is it their word? Is it specific? Is it consistent? Is it different from its neighbours? And did a user find it? Try them on the bakery: Fournée suivante passes all five. Other fails at least two. Keep these five in front of you: you will use them again when you build your structure.',
      tip: 'Click to tick the five questions one by one. At each one, pause 5 seconds of silent thinking: "which of my labels would fail this?". Do not ask anyone to answer aloud. Tell teams to run the five questions over their labels one more time before the next act.',
    },
  ),
];
