export interface Event {
  id: number;
  title: string;
  description: string;
  details: string[];
  difficulty: 1 | 2 | 3;
  difficultyLabel: 'Easy' | 'Medium' | 'Hard';
  duration?: string;
}

export const events: Event[] = [
  {
    id: 1,
    title: 'Shoot Your First Short',
    description: 'Students form small groups, pick a quick prompt, and shoot a 30-second short film using the DJI Osmo Pocket or Lumix cameras.',
    details: [
      'Form small groups',
      'Pick a quick prompt',
      'Shoot 30-second short film',
      'Watch together at the end'
    ],
    difficulty: 2,
    difficultyLabel: 'Medium',
    duration: '60–90 mins'
  },
  {
    id: 2,
    title: 'Campus Music Video Challenge',
    description: 'Pick one song (copyright-free). Students produce a 1-minute music video around campus.',
    details: [
      'Copyright-free song selection',
      '1-minute music video production',
      'Campus locations',
      'Team edits final montage'
    ],
    difficulty: 3,
    difficultyLabel: 'Hard'
  },
  {
    id: 3,
    title: 'Create-Your-Own Karaoke Video Night',
    description: 'Students pick songs → you record them in front of your backdrop → your team builds karaoke-style lyrics overlays.',
    details: [
      'Song selection',
      'Recording with backdrop',
      'Karaoke-style lyrics overlays',
      'Karaoke showcase'
    ],
    difficulty: 2,
    difficultyLabel: 'Medium'
  },
  {
    id: 4,
    title: 'One-Shot Film Workshop',
    description: 'Teach students how to make a film using only one continuous shot.',
    details: [
      'Continuous shot technique',
      'Blocking and movement',
      'Camera confidence',
      'Simple editing'
    ],
    difficulty: 2,
    difficultyLabel: 'Medium'
  },
  {
    id: 5,
    title: 'TikTok/Short-Form Content Masterclass',
    description: 'How to shoot trends, transitions, voiceovers, and storytelling with just a phone + ring light.',
    details: [
      'Trend shooting',
      'Transitions and voiceovers',
      'Storytelling techniques',
      'Live clip creation'
    ],
    difficulty: 1,
    difficultyLabel: 'Easy'
  },
  {
    id: 6,
    title: 'Creative Media Gear Petting Zoo',
    description: 'Hands-on open house. Students try drones, cameras, gimbals, lights, audio recorders, etc.',
    details: [
      'Hands-on equipment trial',
      'Drones, cameras, gimbals',
      'Lights and audio recorders',
      'Staff demonstrations'
    ],
    difficulty: 1,
    difficultyLabel: 'Easy'
  },
  {
    id: 7,
    title: 'Live Audio Recording & Podcasting Session',
    description: 'Teach students mic types, room treatment tricks, and recording basics. Then have everyone record a 1-minute "mini-podcast."',
    details: [
      'Mic types and selection',
      'Room treatment tricks',
      'Recording basics',
      '1-minute mini-podcast creation'
    ],
    difficulty: 1,
    difficultyLabel: 'Easy'
  },
  {
    id: 8,
    title: 'Color Grading Mini-Workshop',
    description: 'Use DaVinci Resolve or Premiere. Show beginners how color transforms footage.',
    details: [
      'DaVinci Resolve / Premiere',
      'Color transformation techniques',
      'Hands-on color correction',
      'Sample clip practice'
    ],
    difficulty: 1,
    difficultyLabel: 'Easy'
  },
  {
    id: 9,
    title: 'Shoot With What You Have',
    description: 'Teach how to make cinematic shots with only a phone.',
    details: [
      'Cinematic phone techniques',
      'Framing and angles',
      'Slow motion',
      'Natural lighting tips'
    ],
    difficulty: 1,
    difficultyLabel: 'Easy'
  },
  {
    id: 10,
    title: 'Student Playlist + Dance Party',
    description: 'Students submit songs → Creative Media team turns it into a visualizer playlist → dance/social night.',
    details: [
      'Song submissions',
      'Visualizer playlist creation',
      'Dance and social night',
      'Low creative prep'
    ],
    difficulty: 1,
    difficultyLabel: 'Easy'
  },
  {
    id: 11,
    title: 'Movie Night + Behind-The-Scenes Breakdown',
    description: 'Watch a movie, then discuss cinematography, color, lighting, editing, and sound design.',
    details: [
      'Film screening',
      'Cinematography analysis',
      'Color and lighting discussion',
      'Editing and sound design'
    ],
    difficulty: 1,
    difficultyLabel: 'Easy'
  },
  {
    id: 12,
    title: 'Photography Walk on Campus',
    description: 'Use your cameras or theirs. Walk around campus and teach composition, shutter/aperture, portraits, and motion shots.',
    details: [
      'Campus photography walk',
      'Composition techniques',
      'Shutter and aperture',
      'Portraits and motion shots'
    ],
    difficulty: 3,
    difficultyLabel: 'Hard',
    duration: 'Golden Hour'
  },
  {
    id: 13,
    title: 'Shoot a Product Ad Challenge',
    description: 'Provide random objects (cereal box, sneakers, water bottle). Students shoot a 15-sec "commercial."',
    details: [
      'Random object selection',
      '15-second commercial creation',
      'Indoor shooting',
      'Creative and fun'
    ],
    difficulty: 1,
    difficultyLabel: 'Easy'
  },
  {
    id: 14,
    title: 'Stop-Motion Animation Event',
    description: 'Using phone cameras. Small props + paper + clay. Students create short stop-motion scenes.',
    details: [
      'Phone camera stop-motion',
      'Props, paper, and clay',
      'Short scene creation',
      'Table setups and lighting'
    ],
    difficulty: 2,
    difficultyLabel: 'Medium'
  },
  {
    id: 15,
    title: 'Green Screen Experiments Night',
    description: 'Students shoot clips in your green screen room and pick backgrounds: news anchor, superhero fly-through, movie scenes, exotic locations.',
    details: [
      'Green screen room',
      'Background selection',
      'News anchor, superhero, movie scenes',
      'Exotic locations'
    ],
    difficulty: 1,
    difficultyLabel: 'Easy'
  },
  {
    id: 16,
    title: 'Sound Effects & Foley Studio Night',
    description: 'Let students recreate sound effects using random objects. Record footsteps, whooshes, impacts, etc.',
    details: [
      'Sound effect recreation',
      'Random object usage',
      'Footsteps, whooshes, impacts',
      'Funny soundscape creation'
    ],
    difficulty: 1,
    difficultyLabel: 'Easy'
  },
  {
    id: 17,
    title: 'Creative Headshot Session',
    description: 'Students come dressed how they want. Use proper lighting + backdrop to give them professional photos for LinkedIn or portfolios.',
    details: [
      'Professional headshots',
      'Proper lighting and backdrop',
      'LinkedIn and portfolio ready',
      'Individual sessions'
    ],
    difficulty: 2,
    difficultyLabel: 'Medium'
  },
  {
    id: 18,
    title: 'Digital Art Jam Session',
    description: 'Partner with art students. Bring tablets/iPads. Create illustrations or graphic posters to a theme (e.g., "Baylor Stories").',
    details: [
      'Partner with art students',
      'Tablets and iPads',
      'Illustrations and graphic posters',
      'Theme-based creation'
    ],
    difficulty: 1,
    difficultyLabel: 'Easy'
  },
  {
    id: 19,
    title: 'Adobe Crash Course Night',
    description: 'Teach 2–3 extremely practical skills: remove background, fix audio, add motion text.',
    details: [
      'Photoshop / Premiere / After Effects',
      'Remove background',
      'Fix audio',
      'Add motion text'
    ],
    difficulty: 1,
    difficultyLabel: 'Easy'
  },
  {
    id: 20,
    title: '24-Hour Reel Challenge Launch Night',
    description: 'Kickoff event where students draw a random theme. They have 24 hours to make a 30-second reel.',
    details: [
      'Random theme selection',
      '24-hour challenge',
      '30-second reel creation',
      'Campus social media feature'
    ],
    difficulty: 3,
    difficultyLabel: 'Hard'
  },
  {
    id: 21,
    title: 'Create Your Own Movie Poster',
    description: 'Give students a template, photo studio space, and props. They pose → you take pictures → they design posters.',
    details: [
      'Template provided',
      'Photo studio space',
      'Props and posing',
      'Poster design'
    ],
    difficulty: 2,
    difficultyLabel: 'Medium'
  },
  {
    id: 22,
    title: 'Insta360 Creative Shots Workshop',
    description: 'A hands-on event focused entirely on one device: the Insta360 camera.',
    details: [
      'How 360° filming works',
      'How to frame shots after filming using the Insta360 app',
      'Create fun effects: Tiny Planet, Horizon Flip, Follow Cam (AI tracking)',
      'How the Invisible Selfie Stick works'
    ],
    difficulty: 2,
    difficultyLabel: 'Medium'
  },
  {
    id: 23,
    title: 'Interviewing Someone on Camera',
    description: 'Teach framing, 3-point lighting, lav mic placement. Let students interview each other on camera.',
    details: [
      'Framing techniques',
      '3-point lighting',
      'Lav mic placement',
      'Student interviews'
    ],
    difficulty: 1,
    difficultyLabel: 'Easy'
  },
  {
    id: 24,
    title: 'Creative Media Game Night',
    description: 'Interactive challenges: Guess the Film from the Frame, Sound Guessing Game, Camera Angles Trivia, Editing Speed Race.',
    details: [
      'Guess the Film from the Frame',
      'Sound Guessing Game',
      'Camera Angles Trivia',
      'Editing Speed Race'
    ],
    difficulty: 1,
    difficultyLabel: 'Easy'
  },
  {
    id: 25,
    title: 'End-of-Semester Film Festival',
    description: 'Students submit any project made during events. Awards + popcorn + social hangout.',
    details: [
      'Project submissions',
      'Awards ceremony',
      'Popcorn and social hangout',
      'Screening setup'
    ],
    difficulty: 3,
    difficultyLabel: 'Hard'
  }
];

