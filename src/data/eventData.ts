// Event data configuration
export const EVENT_CONFIG = {
  name: "VORTEX 2025",
  tagline: "The Ultimate Tech Fest & Hackathon Experience",
  aiTagline: "Where Innovation Meets Imagination",
  date: new Date('2025-02-15T09:00:00'),
  endDate: new Date('2025-02-16T18:00:00'),
  venue: "Indian Institute of Technology, Delhi",
  registrationDeadline: new Date('2025-02-10T23:59:59'),
  prizePool: "₹5,00,000+",
  participants: "500+",
  duration: "36 Hours",
};

export const TRACKS = [
  {
    id: 1,
    name: "The Gate",
    subtitle: "AI & Machine Learning",
    description: "Open portals to new dimensions with artificial intelligence",
    icon: "🌀",
    color: "from-red-600 to-red-900",
    challenges: ["Build an AI that predicts anomalies", "Create a neural network for pattern recognition", "Develop an ML model for real-time detection"]
  },
  {
    id: 2,
    name: "Hawkins Lab",
    subtitle: "Web3 & Blockchain",
    description: "Experiment with decentralized technologies",
    icon: "🔬",
    color: "from-purple-600 to-purple-900",
    challenges: ["Smart contract for secure communications", "Decentralized identity verification", "NFT marketplace for digital artifacts"]
  },
  {
    id: 3,
    name: "The Void",
    subtitle: "Cybersecurity",
    description: "Protect the world from shadow threats",
    icon: "🛡️",
    color: "from-blue-600 to-blue-900",
    challenges: ["Intrusion detection system", "Secure communication protocol", "Vulnerability assessment tool"]
  },
  {
    id: 4,
    name: "Eleven's Mind",
    subtitle: "Brain-Computer Interface",
    description: "Unlock the power of the human mind",
    icon: "🧠",
    color: "from-pink-600 to-pink-900",
    challenges: ["EEG signal processing", "Mind-controlled applications", "Cognitive load detection"]
  },
  {
    id: 5,
    name: "The Upside Down",
    subtitle: "AR/VR & Metaverse",
    description: "Create alternate realities and immersive experiences",
    icon: "🌌",
    color: "from-emerald-600 to-emerald-900",
    challenges: ["Virtual world exploration", "AR treasure hunt", "Mixed reality collaboration tool"]
  },
  {
    id: 6,
    name: "Walkie-Talkie",
    subtitle: "IoT & Hardware",
    description: "Build devices that communicate across dimensions",
    icon: "📡",
    color: "from-yellow-600 to-yellow-900",
    challenges: ["Smart alert system", "Connected sensor network", "Hardware communication protocol"]
  }
];

export const SCHEDULE = [
  {
    day: "Day 1 - February 15",
    events: [
      { time: "08:00 AM", title: "Gates Open", description: "Registration & Kit Collection", type: "registration" },
      { time: "09:30 AM", title: "Opening Ceremony", description: "Welcome to the Upside Down", type: "ceremony" },
      { time: "10:30 AM", title: "Hackathon Kickoff", description: "Problem statements revealed", type: "hackathon" },
      { time: "12:30 PM", title: "Lunch Break", description: "Refuel at Benny's Burgers", type: "break" },
      { time: "02:00 PM", title: "Workshop: AI Demystified", description: "By Dr. Martin Brenner", type: "workshop" },
      { time: "04:00 PM", title: "Mentorship Round 1", description: "Get guidance from experts", type: "mentorship" },
      { time: "06:00 PM", title: "Cultural Event", description: "80s Retro Night", type: "cultural" },
      { time: "08:00 PM", title: "Dinner & Networking", description: "Connect with fellow hackers", type: "break" },
      { time: "10:00 PM", title: "Midnight Coding", description: "The real magic begins", type: "hackathon" },
    ]
  },
  {
    day: "Day 2 - February 16",
    events: [
      { time: "06:00 AM", title: "Sunrise Yoga", description: "Energize your mind", type: "break" },
      { time: "08:00 AM", title: "Breakfast", description: "Eggo Waffles Special", type: "break" },
      { time: "10:00 AM", title: "Code Freeze", description: "Final submissions due", type: "hackathon" },
      { time: "11:00 AM", title: "Demo Preparations", description: "Polish your presentations", type: "hackathon" },
      { time: "01:00 PM", title: "Lunch", description: "Last meal before battle", type: "break" },
      { time: "02:00 PM", title: "Final Presentations", description: "Show what you built", type: "ceremony" },
      { time: "05:00 PM", title: "Closing Ceremony", description: "Awards & Recognition", type: "ceremony" },
      { time: "06:30 PM", title: "Farewell Party", description: "Until next dimension!", type: "cultural" },
    ]
  }
];

export const SPEAKERS = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "AI Research Lead",
    company: "DeepMind",
    topic: "Neural Networks & The Unknown",
    image: new URL('../images/mentor/download.jpg', import.meta.url).href,
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Blockchain Architect",
    company: "Ethereum Foundation",
    topic: "Decentralized Dimensions",
    image: new URL('../images/mentor/images.jpg', import.meta.url).href,
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Cybersecurity Expert",
    company: "CrowdStrike",
    topic: "Defending Against Shadow Threats",
    image: new URL('../images/mentor/images (1).jpg', import.meta.url).href,
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: 4,
    name: "Dr. James Park",
    role: "Neuroscience Professor",
    company: "MIT Media Lab",
    topic: "Brain-Computer Interfaces",
    image: new URL('../images/mentor/images (2).jpg', import.meta.url).href,
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "VR/AR Developer",
    company: "Meta Reality Labs",
    topic: "Building the Metaverse",
    image: new URL('../images/mentor/images (3).jpg', import.meta.url).href,
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: 6,
    name: "Tom Anderson",
    role: "IoT Pioneer",
    company: "Arduino",
    topic: "Connected Everything",
    image: new URL('../images/mentor/download.jpg', import.meta.url).href,
    social: { twitter: "#", linkedin: "#" }
  }
];

export const FAQ_DATA = [
  {
    question: "What is VORTEX 2025?",
    answer: "VORTEX is a 36-hour hackathon and college fest inspired by Stranger Things. It combines coding challenges, workshops, cultural events, and networking opportunities in an immersive 80s-themed experience."
  },
  {
    question: "Who can participate?",
    answer: "Students from any college, working professionals, and coding enthusiasts are welcome! Teams can have 2-4 members. Solo participation is also allowed."
  },
  {
    question: "Is there a registration fee?",
    answer: "Early bird registration is FREE until January 31st. After that, a nominal fee of $10 applies to cover food and swag."
  },
  {
    question: "What should I bring?",
    answer: "Bring your laptop, charger, student ID, and enthusiasm! We'll provide food, drinks, sleeping arrangements, and all the 80s vibes you need."
  },
  {
    question: "Are there prizes?",
    answer: "Yes! Over $50,000 in prizes including cash awards, internship opportunities, gadgets, and exclusive Stranger Things merchandise."
  },
  {
    question: "Can I participate virtually?",
    answer: "Absolutely! We have a dedicated online track. Virtual participants will have access to all workshops, mentorship sessions, and can submit projects remotely."
  },
  {
    question: "What if I don't have a team?",
    answer: "No worries! We have a team formation event on Day 0 where you can meet other participants and form teams based on shared interests."
  },
  {
    question: "Will food be provided?",
    answer: "Yes! We've got you covered with Eggo waffles for breakfast, Benny's Burgers for lunch, and plenty of snacks and energy drinks throughout."
  }
];

export const SPONSORS = {
  title: [
    { name: "Hawkins Lab", logo: "🔬", tier: "Title Sponsor" }
  ],
  platinum: [
    { name: "Netflix", logo: "📺", tier: "Platinum" },
    { name: "Google", logo: "🔍", tier: "Platinum" },
  ],
  gold: [
    { name: "Microsoft", logo: "💻", tier: "Gold" },
    { name: "Amazon", logo: "📦", tier: "Gold" },
    { name: "Meta", logo: "♾️", tier: "Gold" },
  ],
  silver: [
    { name: "GitHub", logo: "🐙", tier: "Silver" },
    { name: "Vercel", logo: "▲", tier: "Silver" },
    { name: "MongoDB", logo: "🍃", tier: "Silver" },
    { name: "Figma", logo: "🎨", tier: "Silver" },
  ],
  community: [
    { name: "Dev.to", logo: "👩‍💻", tier: "Community" },
    { name: "Hashnode", logo: "📝", tier: "Community" },
    { name: "ProductHunt", logo: "🐱", tier: "Community" },
  ]
};

export const HIGHLIGHTS = [
  {
    icon: "💰",
    title: "₹5 Lakh+ in Prizes",
    description: "Cash awards, internships & gadgets"
  },
  {
    icon: "👥",
    title: "500+ Participants",
    description: "Network with top tech talent"
  },
  {
    icon: "🎓",
    title: "Industry Mentors",
    description: "Guidance from Google, Microsoft & more"
  },
  {
    icon: "🍕",
    title: "Free Food & Swag",
    description: "All meals, snacks & exclusive goodies"
  },
  {
    icon: "🏆",
    title: "6 Innovation Tracks",
    description: "AI, Web3, Security, AR/VR & more"
  },
  {
    icon: "🎉",
    title: "Cultural Night",
    description: "Live performances & DJ night"
  }
];

export const WHO_IS_THIS_FOR = [
  {
    title: "Students",
    description: "College students looking to apply their skills in real-world challenges",
    icon: "🎓"
  },
  {
    title: "Developers",
    description: "Experienced coders wanting to build something extraordinary",
    icon: "👨‍💻"
  },
  {
    title: "Designers",
    description: "Creative minds who can bring ideas to life visually",
    icon: "🎨"
  },
  {
    title: "Innovators",
    description: "Anyone with a passion for technology and problem-solving",
    icon: "💡"
  }
];

export const ACHIEVEMENTS_LIST = [
  { id: 'first-portal', name: 'First Portal', description: 'Toggle to the Upside Down', icon: '🌀' },
  { id: 'secret-hunter', name: 'Secret Hunter', description: 'Find 5 hidden secrets', icon: '🔍' },
  { id: 'early-bird', name: 'Early Bird', description: 'Register before deadline', icon: '🐦' },
  { id: 'explorer', name: 'Explorer', description: 'Visit all sections', icon: '🗺️' },
  { id: 'social-butterfly', name: 'Social Butterfly', description: 'Share the event', icon: '🦋' },
  { id: 'konami-master', name: 'Konami Master', description: 'Enter the secret code', icon: '🎮' },
  { id: 'eleven', name: 'Eleven', description: 'Click the title 11 times', icon: '011' },
  { id: 'night-owl', name: 'Night Owl', description: 'Visit at midnight', icon: '🦉' },
];
