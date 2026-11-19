// Programme catalogue shown on /programmes.
// Add new programmes here: `format` must be one of the ids in navigation.js
// (programmeFormats), `domains` any of the domain filters.

export const programmes = [
  {
    id: 'bootup-vibe-coding',
    title: 'BootUp: 3-Day Vibe Coding Bootcamp',
    format: 'bootcamps',
    domains: ['AI', 'CSE'],
    meta: ['3 days', 'For first-year engineering students'],
    summary:
      'A high-impact bootcamp that gives students their first taste of software development: build real applications with AI tools and a visual-first approach, even if you have never coded before.',
    highlights: [
      'Think Like a Builder',
      'Logic Over Luck: Decode Prompting',
      'From Prototype to Production',
      'The Art of the Demo: Deploy or Die',
    ],
    tools: ['Cursor', 'Lovable', 'Emergent'],
    // Source: BootUp-3_Day-Brochure_2.pdf
  },
  {
    id: 'data-science-gen-ai',
    title: 'Advanced Data Science & Generative AI',
    format: 'courses',
    domains: ['AI', 'CSE'],
    meta: ['6 months', '120+ learning hours', 'Live sessions'],
    summary:
      'Go from data foundations to building and deploying intelligent, real-world AI solutions, with end-to-end project work.',
    highlights: [
      'Python, SQL & data handling',
      'Statistics, machine learning & deep learning',
      'NLP, LLMs, RAG & AI agents',
      'MLOps & cloud deployment',
    ],
    tools: [],
    // Source: Data_Science_Gen_AI.pdf (an HCL GUVI programme brochure).
    // TODO: confirm how Edutou offers this programme before promoting it widely.
  },
];
