export const TOPICS = {
  code: ['code', 'bug', 'semicolon', 'error', 'crash', 'compile', 'deploy', 'git', 'debug', 'build', 'app'],
  deadline: ['deadline', 'due', 'late', 'submit', 'presentation', 'exam', 'hurry', 'time'],
  inbox: ['email', 'inbox', 'mail', 'unread', 'reply', 'slack', 'message'],
  meeting: ['meeting', 'call', 'zoom', 'standup', 'sync', 'agenda'],
  brain: ['tired', 'brain', 'focus', 'sleep', 'exhausted', 'tabs', 'burnout', 'stuck'],
  bored: ['bored', 'boring', 'nothing', 'spreadsheet', 'slow', 'monday'],
};

export const ROASTS = {
  code: [
    'A developer has stared at one semicolon for three hours. The semicolon is reportedly considering permanent residency.',
    'Your code works on your machine, which is the programming equivalent of "but it worked in my dream."',
    'You have 47 browser tabs open to fix one bug. Tab number 31 is now legally your roommate.',
    'The bug has been there so long it has started paying rent.',
  ],
  deadline: [
    'The deadline is not approaching. The deadline has parked outside and is honking.',
    'Your to-do list has become a dramatic novel, and the villain is tomorrow at 9 AM.',
    'You work best under pressure, which explains why you wait until you are a human pressure cooker.',
  ],
  inbox: [
    'Your inbox has 9,999 unread emails. At this point it is not an inbox, it is a lifestyle.',
    'You replied "Per my last email" to yourself. Growth.',
    'Your unread count has its own zip code and a small local government.',
  ],
  meeting: [
    'That meeting could have been an email. That email could have been a nap. The nap would have been better.',
    'You joined the call with your camera off and your soul quietly leaving through the window.',
    'The agenda says 30 minutes. The universe says "lol."',
  ],
  brain: [
    'Your brain has 47 tabs open and one of them is playing music. Nobody knows which.',
    'You have read the same sentence six times. It still says the same thing. Rude of it, honestly.',
    'Your focus has left the chat and did not even leave a read receipt.',
  ],
  bored: [
    'You have refreshed the same page so many times it has started to feel judged.',
    'Your boredom is so powerful it could run a small spreadsheet. Oh wait, it already does.',
    'You stared at the clock until it blinked first. That is honestly a win.',
  ],
  other: [
    'Whatever happened today, it clearly had a flair for the dramatic. Five stars for chaos, zero for kindness.',
    'Your day has more plot twists than a soap opera written by a printer.',
    'Today called. It wants to apologize, but it is on hold with itself.',
  ],
};

export const CHEERS = {
  code: [
    'Every great developer has stared down a missing semicolon. You are in excellent company, and you will find it.',
    'The bug has a hiding spot, you have a brain. One of you is about to lose, and it is not you.',
    'Fixed bugs make the best stories. Yours is just in the "dramatic middle" chapter.',
  ],
  deadline: [
    'You have survived every deadline so far. Your record is flawless. Keep it going.',
    'Pick the smallest next step and do only that. Deadlines are just tiny steps wearing a big hat.',
    'Future you is already thanking you. They are very proud, and slightly tired.',
  ],
  inbox: [
    'You do not need inbox zero. You need the three emails that matter, and you can find them.',
    'Five minutes, one email at a time. The hydra loses a head every time you press send.',
    'An overflowing inbox just means you are important. Annoying, but important.',
  ],
  meeting: [
    'You made it through another meeting. That counts as cardio.',
    'Take a breath, stretch, drink some water. You earned a tiny victory lap.',
    'Next meeting, next chance to quietly doodle a fantastic monster. You got this.',
  ],
  brain: [
    'A tired brain still beats a lot of rested ones. Take a ten-minute reset and come back shining.',
    'Rest is part of the work, not a break from it. Close a few tabs, drink some water.',
    'You are not behind. You are in the loading screen of your best idea.',
  ],
  bored: [
    'Boredom is just your brain asking for a better quest. Time to give it one.',
    'Do one small thing differently today. Even the tiniest new route counts as an adventure.',
    'Slow days are rare treasures. Use one to do something you enjoy.',
  ],
  other: [
    'Whatever today threw at you, you are still standing. That is genuinely impressive.',
    'You are doing better than you think. Take a breath, grab some water, and keep going.',
    'Hard days do not last, but people with your stubbornness do.',
  ],
};

export function detectTopic(text, presetId) {
  const t = (text || '').toLowerCase();
  for (const [topic, words] of Object.entries(TOPICS)) {
    if (words.some((w) => t.includes(w))) return topic;
  }
  const map = { code: 'code', deadline: 'deadline', inbox: 'inbox', brain: 'brain', bored: 'bored' };
  return map[presetId] || 'other';
}
