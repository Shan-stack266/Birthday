export const gift = {
  pin: '110907',
  recipient: 'Marlisang',
  title: 'HAPPY BIRTHDAY, {name}!',
  greeting: '{name}, welcome to your little purple world. I made every chapter just for you.',
  sender: 'Wishing you the best, SHAN M.',
  sharedMemory: '', // Add a true favorite memory here; it appears near the start of the letter.
  insideJokes: [] as string[], // Add your own little jokes to the happiness jar.
  closingLine: 'Another year of you, and I’m so lucky to be here for it.',
  musicDedication: 'This song reminds me of you.',
  spotify: { trackId: '5rDXfGMWI6S8wkXR0MHsvv', title: 'love.', artist: 'wave to earth' },
  letter: [
    `It's your dayyy!!! Happy 18th Birthday, Marlisang! 💜`,
    `I just want to say na I'm very thankful nga naila taka, despite all these kahadloks of mine nga mo-meet ug someone new after everything that happened to me in the past. I never thought I'd say this to you, especially since bag-o pa sad ta ga-talk, pero I'm already very, very comfortable with you. It's like we have this connection nga mura'g dugay na kaayo ta nagkaila.`,
    `Everything before you felt grey and lifeless, including my own world. Pero pag-abot bitaw nimo, it's like you brought color and meaning into my life without even realizing it. You made things feel lighter, happier, and a little more beautiful. And the best part is, you didn't even have to try. It just happened naturally.`,
    `I'm genuinely grateful that we started talking and that I got the chance to know someone like you. You have this way of making ordinary days feel special, even through the simplest conversations. Sometimes, it's the unexpected people who bring the most unexpected happiness, and for me, you're one of them.`,
    `Ug asa man gani ta dad-on aning atong nasugdan karon, unta walay magbag-o sa way nato pagtratar sa usag usa. I don't want to rush anything. I just want to enjoy what we have right now and see where life takes us. Whatever happens, I hope we continue to be comfortable, honest, and happy with each other.`,
    `Again, Happy 18th Birthday, Marlisang! I wish you nothing but genuine happiness, peace of mind, good health, and all the beautiful things this life has to offer. I hope this new chapter of your life brings you closer to your dreams and gives you countless reasons to smile.`,
    `You deserve a birthday filled with love, laughter, and beautiful memories. And I hope you know how special you are, even on the days you don't feel like it.`,
    `Enjoy your special dayyy, Marlisang! 💜`
  ],
  letterEmphasis: [6],
  letterPhotos: [
    { id: 1, src: '/photos/marlisang-1.jpg', objectPosition: '50% 50%', caption: 'Your smile makes everything a little brighter.' },
    { id: 2, src: '/photos/marlisang-2.jpg', objectPosition: '55% 50%', caption: "You're effortlessly beautiful, inside and out." },
    { id: 3, src: '/photos/marlisang-3.jpg', objectPosition: '50% 45%', caption: "There's something about you that feels like magic." },
    { id: 4, src: '/photos/marlisang-4.jpg', objectPosition: '55% 45%', caption: 'You make ordinary moments feel special.' },
    { id: 5, src: '/photos/marlisang-5.jpg', objectPosition: '50% 35%', caption: "You're one of the prettiest surprises life has given me." }
  ],
  jarMessages: [
    'You make my world a little softer.', 'Your smile is my favorite kind of sunshine.',
    'The way you care about the little things is really nice.', 'You deserve to feel appreciated every day.',
    'Talking with you feels easy and comfortable.', 'You make even quiet moments special.',
    'Your laugh is a little bit of magic.', 'I’m so proud of the person you are becoming.',
    'You deserve people who are as kind as you are.', 'You make the ordinary feel extraordinary.',
    'Every day with you is a little gift.', 'You have the most beautiful way of being yourself.',
    'Your eyes light up when you’re happy, and it’s nice to see.', 'It’s always nice hearing from you.',
    'The world is brighter because you are in it.', 'I’m glad we got the chance to know each other.',
    'You deserve all the good things coming your way.', 'Here’s your reminder: you are enough, exactly as you are.'
  ],
  finalWish: 'May your life always be filled with happiness, beautiful moments, and everything your heart wishes for. You deserve all the love and wonderful things in the world.'
};

export function personalize(text:string){return text.replaceAll('{name}',gift.recipient)}
