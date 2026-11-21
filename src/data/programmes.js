// Programme catalogue shown on /programmes.
// Add new programmes here: `format` must be one of the ids in navigation.js
// (programmeFormats), `domains` any of the domain filters. `alsoIn` lists other
// formats whose page also shows the programme. `details` (optional) fills the
// expandable "Roles & live projects" panel on the card.

const INTERNSHIP_META = ['7, 10, 14, 21 or 30 days · full-time', 'On campus, hybrid or online', 'Open to all departments'];
const INTERNSHIP_NOTE =
  'Every plan runs in four stages: onboard, learn, build on a live partner project, and showcase on the final day. You leave with a co-branded Edutou + industry partner certificate and a GitHub portfolio. Fees depend on the plan; scholarships are available.';

export const programmes = [
  {
    id: 'internship-ai-native-software',
    title: 'Industry Internship: AI-Native Software Engineering',
    format: 'courses',
    alsoIn: ['internship-programmes'],
    domains: ['AI', 'CSE'],
    meta: INTERNSHIP_META,
    summary:
      'Build, secure and ship real software with AI, alongside teams doing it today. Plan with AI, code with AI agents, then review, test and ship on live partner briefs, in collaboration with 9 industry partners.',
    highlights: [
      'AI-native dev workflow',
      'Full-stack web',
      'Mobile apps',
      'LLM apps & agents',
      'Web data & pipelines',
      'Cloud & DevOps',
      'Cybersecurity essentials',
      'Low-code enterprise AI (elective)',
    ],
    tools: ['Cursor', 'Claude Code', 'GitHub Copilot', 'Python', 'TypeScript', 'React', 'Next.js', 'Node.js', 'FastAPI', 'Flutter', 'PostgreSQL', 'MongoDB', 'LangChain', 'Docker', 'AWS', 'Burp Suite', 'Mendix'],
    details: {
      roles: ['AI-native full-stack developer', 'LLM / AI application engineer', 'Mobile app developer', 'Data engineer', 'Security analyst', 'DevOps / cloud engineer'],
      projects: [
        'Research agent that pulls live web data into structured JSON',
        'Agent that drafts a weekly SEO report for an agency client',
        'Attack-surface scan of a test domain, with a fix-it report',
        'Support voice agent that answers from company documents',
        'Document-AI app that reads invoices into structured data',
        'Seller onboarding dashboard on ONDC',
      ],
      note: INTERNSHIP_NOTE,
    },
    // Source: Edutou Industry Internship AI-Development.pdf
  },
  {
    id: 'internship-electronics-technology',
    title: 'Industry Internship: Electronics Technology',
    format: 'courses',
    alsoIn: ['internship-programmes'],
    domains: ['ECE', 'EEE', 'VLSI', 'PCB'],
    meta: INTERNSHIP_META,
    summary:
      'Design, build and test real electronics, from schematic to a working connected product: PCB, EDA, VLSI, embedded and IoT, on real partner hardware with 3 industry partners.',
    highlights: [
      'Electronics design basics',
      'PCB design with EDA tools',
      'Embedded firmware',
      'IoT systems',
      'VLSI & digital design',
      'Prototyping & fabrication',
      'Test, debug & bring-up',
      'Electronics for robotics',
    ],
    tools: ['KiCad', 'Altium Designer', 'EasyEDA', 'LTspice', 'PlatformIO', 'ESP-IDF', 'STM32CubeIDE', 'Verilog', 'Vivado', 'ModelSim', 'MQTT', 'Fusion 360', 'Oscilloscope', 'Logic analyser'],
    details: {
      roles: ['PCB design engineer', 'Embedded firmware engineer', 'IoT engineer', 'VLSI / RTL design engineer', 'Hardware test & validation engineer', 'Electronics product engineer'],
      projects: [
        'Design a 2-layer ESP32 IoT controller board, from schematic to Gerbers',
        'Industrial IoT sensor node that streams readings to a live dashboard',
        'CanSat-style telemetry board that logs and sends flight data',
        'Design a UART controller in Verilog, simulate it and run it on an FPGA',
        'Connected device prototype: PCB, firmware and a 3D-printed enclosure',
        'Battery-monitoring and sensor-interface board for a mobile robot',
      ],
      note: INTERNSHIP_NOTE,
    },
    // Source: Edutou Industry Internship-Electronics Technology.pdf
  },
  {
    id: 'internship-robotics-autonomous',
    title: 'Industry Internship: Robotics & Autonomous Technologies',
    format: 'courses',
    alsoIn: ['internship-programmes'],
    domains: ['Robotics', 'AMR', 'Drone'],
    meta: INTERNSHIP_META,
    summary:
      'Build robots that see, map and move on their own, with teams deploying them today. Work with Corelyn Robotics, Qbitio and ACETECH on robotics, AMRs and drones.',
    highlights: [
      'Robot fundamentals',
      'Mechanical design & fabrication',
      'Robot electronics & control',
      'ROS 2 & simulation',
      'Perception & SLAM',
      'Navigation & fleet operations',
      'Drones',
      'Industrial automation',
    ],
    tools: ['ROS 2', 'Gazebo', 'RViz', 'Nav2', 'Python', 'C++', 'OpenCV', 'LiDAR SLAM', 'Arduino', 'ESP32', 'STM32', 'Fusion 360', 'SolidWorks', 'PX4', 'ArduPilot', 'QGroundControl', 'PLC'],
    details: {
      roles: ['Robotics software engineer (ROS 2)', 'Autonomy & navigation engineer', 'Robot hardware & integration engineer', 'Drone engineer', 'Automation engineer', 'Field robotics engineer'],
      projects: [
        'Map a warehouse floor with LiDAR SLAM and run autonomous pick-and-drop routes',
        'Test obstacle-aware re-routing and report fleet metrics',
        'Connect an AMR task queue to a warehouse management system',
        'Motor-control and sensor board for a small mobile robot',
        'Vision-based robot that sorts objects by colour or shape',
        'Autonomous waypoint mission for a drone, simulated first',
        'Automate one step of an assembly line',
      ],
      note: INTERNSHIP_NOTE,
    },
    // Source: Edutou Industry Internship-Robotics.pdf
  },
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
