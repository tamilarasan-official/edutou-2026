// Content for the Career and About pages.
// Photos are the campus gallery images (public/images/gallery-XX.jpg).
// Items marked TODO need real details from the Edutou team.

export const career = [
  {
    id: 'internships',
    title: 'Internships',
    lead: 'Apply what you learn in a real working environment.',
    body: 'Internships put learners into hands-on roles where they contribute to real work, guided by mentors, and leave with experience they can show employers.',
    photos: ['27', '25'],
    cta: 'Enquire about internships',
    // TODO: add internship duration, domains and eligibility.
  },
  {
    id: 'live-projects',
    title: 'Live Projects',
    lead: 'Build real things, not just assignments.',
    body: 'From circuit boards to working applications, learners build projects end to end: plan, design, build, test and present, with mentors reviewing the work along the way.',
    photos: ['03', '07'],
    cta: 'Enquire about live projects',
    // TODO: list current live project tracks.
  },
  {
    id: 'industry-exposure',
    title: 'Industry Exposure',
    lead: 'See how technology teams really work.',
    body: 'Sessions led by practitioners, industry-standard tools and team workflows show learners what professional work looks like beyond the classroom.',
    photos: ['16', '19'],
    cta: 'Enquire about industry sessions',
  },
  {
    id: 'career-development',
    title: 'Career Development',
    lead: 'Turn skills into your first role.',
    body: 'Portfolio building, presentation practice and guidance on interviews and role readiness help learners take the step from learning to working.',
    photos: ['31', '13'],
    cta: 'Talk to us about careers',
    // TODO: add placement / career-support specifics if offered.
  },
];

export const values = ['Adaptability', 'Practicality', 'Community', 'Future-Readiness'];

export const about = {
  story: {
    lead: 'Education isn’t just about knowledge, it’s about transformation.',
    body: [
      'At Edutou, we combine cutting-edge technology, personalized learning, and real-world projects to help learners thrive in the digital economy.',
      'Through Edutou UpSkill Hub we work with colleges to ignite curiosity, confidence and real-world readiness in students, giving them a hands-on first taste of building with technology.',
    ],
    photo: '05',
  },
  founder: {
    role: 'Co-Founder & CEO, Edutou Skill Academy',
    name: 'Dr. Annie Grace Vimala',
    tagline: 'The educator who decided to',
    highlight: 'rethink education.',
    photo: '/team/annie-grace-vimala.jpg',
    stats: [
      { value: '25+', label: 'Years of experience' },
      { value: 'Principal', label: 'Of a well-known engineering college' },
      { value: 'Ph.D.', label: 'Electronics & Communication Engg.' },
    ],
    // Each column is a list of paragraphs; `kind` styles the question and the vision line.
    columns: [
      [
        { text: 'For years, she was part of the very education system she eventually decided to challenge.' },
        {
          text: 'With more than 25 years in academia, a Ph.D. in Electronics and Communication Engineering, extensive teaching experience, research contributions, patents, and numerous international publications, she has witnessed education from almost every perspective. Today, she also serves as the Principal of a well-known engineering college.',
        },
        { text: 'But somewhere along the journey, one question became impossible to ignore:' },
        {
          kind: 'question',
          text: 'Why are students spending years studying, yet struggling to apply what they learn in the real world?',
        },
        {
          text: 'Conventional education has mastered the art of teaching subjects, conducting examinations, awarding degrees, and measuring academic performance. But has it truly prepared students to build, innovate, solve problems, and create meaningful careers?',
        },
      ],
      [
        { text: 'She believed there was a better way.' },
        { text: 'That belief became the foundation of Edutou – The Skill Academy.' },
        {
          text: 'Edutou was born from the conviction that education should go beyond textbooks, classrooms, marks, and certificates. Learning should be immersive, practical, industry-driven, and built around the skills that the world actually needs.',
        },
        {
          text: 'Rather than asking students to memorise what already exists, Edutou encourages them to experiment, build, break things, solve real-world problems, and create things that do not exist yet.',
        },
        {
          kind: 'vision',
          text: 'The vision is simple but ambitious: to bridge the widening gap between what institutions teach and what industries expect.',
        },
        {
          text: 'Edutou is not an attempt to replace education with more education. It is an attempt to redefine what learning should look like.',
        },
      ],
    ],
    closing: {
      text: "Because the next generation doesn't just need graduates. It needs creators, engineers, innovators, and problem solvers.",
      highlight: 'And that is why Edutou exists.',
    },
  },
  team: {
    lead: 'A team that builds alongside its learners.',
    body: 'The Edutou team designs the programmes, runs the campus sessions and supports learners from their first class to their final demo.',
    photos: ['/team/edutou-team.jpg', '04'],
    // TODO: add team member names, roles and photos.
  },
  mentors: {
    lead: 'Taught by people who build.',
    body: 'Our sessions are led by practitioners who teach by doing: on stage, at the smart board, and one-on-one at the workstation.',
    photos: ['18', '28', '26'],
    // TODO: add mentor profiles.
  },
  partners: {
    lead: 'Institutions we have worked with.',
    photo: '12', // Edutou trainers with college faculty
    body: 'We run programmes on campus with colleges and universities. Interested in bringing Edutou to your institution?',
    // Institution names come from `institutions` in site.js.
  },
};
