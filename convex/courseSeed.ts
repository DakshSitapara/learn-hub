import type { Doc } from "./_generated/dataModel";

type CourseSeed = Omit<Doc<"courses">, "_id" | "_creationTime">;

export const courseSeeds: CourseSeed[] = [
  {
    id: "product-design",
    title: "Product Design Essentials",
    category: "Design",
    level: "Beginner",
    duration: "1h 14m",
    description:
      "Build a clear design process from first sketch to thoughtful, accessible interface. Learn the small decisions that make digital products feel effortless.",
    instructor: "Mina Park",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=85",
    accent: "#c8e7d7",
    lessons: [
      {
        id: "design-hierarchy",
        title: "Visual hierarchy that guides",
        duration: "18 min",
        summary:
          "Give every screen a clear first, second, and third thing to notice.",
        content: [
          "Type scale, spacing, contrast, and grouping guide attention before anyone reads a word.",
          "Start with the user's primary task. When every element is emphasized, nothing is.",
        ],
      },
      {
        id: "design-color",
        title: "Color with a purpose",
        duration: "24 min",
        summary:
          "Create a compact color system that communicates state and meaning.",
        content: [
          "Assign colors semantic roles such as surface, action, success, and warning.",
          "Check contrast and reserve saturated accents for moments that need attention.",
        ],
      },
      {
        id: "design-accessibility",
        title: "Accessible interaction states",
        duration: "32 min",
        summary:
          "Design focus, hover, disabled, and error states as part of the interface.",
        content: [
          "People need clear feedback when a control is focused, pressed, unavailable, or waiting.",
          "Pair color changes with icons, labels, or borders and test the full keyboard path.",
        ],
      },
    ],
    quizMinutes: 4,
    quiz: [
      {
        prompt: "What should carry the strongest visual weight?",
        options: [
          "The user's primary task",
          "Every element equally",
          "The longest paragraph",
          "The brand mark only",
        ],
        answer: 0,
        explanation: "The primary task should lead the visual hierarchy.",
      },
      {
        prompt: "Why assign semantic roles to colors?",
        options: [
          "To use more colors",
          "To keep meaning and state consistent",
          "To avoid contrast testing",
          "To make actions identical",
        ],
        answer: 1,
        explanation:
          "Semantic color roles make actions and states predictable.",
      },
      {
        prompt: "How should state changes be communicated accessibly?",
        options: [
          "Color only",
          "Hide focus indicators",
          "Pair color with another cue",
          "Brighten disabled controls",
        ],
        answer: 2,
        explanation:
          "A second visual cue ensures color is not the only signal.",
      },
    ],
  },
  {
    id: "typescript-practice",
    title: "TypeScript for Real Projects",
    category: "Development",
    level: "Intermediate",
    duration: "1h 32m",
    description:
      "Use TypeScript to make everyday application code safer, easier to change, and easier to understand.",
    instructor: "Leo Martinez",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
    accent: "#d5e4f7",
    lessons: [
      {
        id: "ts-narrowing",
        title: "Narrowing unknown data",
        duration: "26 min",
        summary:
          "Turn untrusted input into useful types with checks and guards.",
        content: [
          "Data from a network or form starts uncertain; treat it as unknown until its shape is verified.",
          "Use runtime checks and type guards instead of assertions that only silence the compiler.",
        ],
      },
      {
        id: "ts-unions",
        title: "Model states with unions",
        duration: "29 min",
        summary:
          "Represent loading, success, and failure without impossible combinations.",
        content: [
          "Optional fields can describe states that should never exist together.",
          "A discriminated union makes each state explicit and supports exhaustive handling.",
        ],
      },
      {
        id: "ts-generics",
        title: "Generics that earn their keep",
        duration: "37 min",
        summary:
          "Reuse behavior while preserving the relationship between input and output.",
        content: [
          "Generics help reusable functions preserve information about specific values.",
          "Keep constraints small and prefer a direct type when abstraction adds no value.",
        ],
      },
    ],
    quizMinutes: 5,
    quiz: [
      {
        prompt: "What is the safest default type for untrusted input?",
        options: ["any", "unknown", "never", "object"],
        answer: 1,
        explanation:
          "Unknown requires verification before a value can be used.",
      },
      {
        prompt: "What does a discriminated union help prevent?",
        options: [
          "Readable switches",
          "Impossible state combinations",
          "All runtime errors",
          "Interfaces",
        ],
        answer: 1,
        explanation:
          "Each union member contains only fields valid for its state.",
      },
      {
        prompt: "When is a generic most useful?",
        options: [
          "It preserves a useful type relationship",
          "Every function has a parameter",
          "To avoid naming types",
          "When validation is unnecessary",
        ],
        answer: 0,
        explanation:
          "Generics enable reuse while preserving meaningful type information.",
      },
    ],
  },
  {
    id: "user-research",
    title: "Research to Roadmap",
    category: "Product",
    level: "Beginner",
    duration: "1h 08m",
    description:
      "Turn interviews and observations into a focused product direction without losing the human story.",
    instructor: "Aisha Okafor",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    accent: "#f2d8cd",
    lessons: [
      {
        id: "research-interviews",
        title: "Ask better interview questions",
        duration: "21 min",
        summary:
          "Learn from real behavior instead of leading people toward opinions.",
        content: [
          "Ask about a recent real example; people recall what happened better than they predict future behavior.",
          "Keep questions open and neutral, and let pauses give participants room to think.",
        ],
      },
      {
        id: "research-synthesis",
        title: "Synthesize without flattening",
        duration: "23 min",
        summary:
          "Find repeated needs while keeping useful differences visible.",
        content: [
          "Group observations by the need or situation they reveal, not just similar words.",
          "Keep exceptions and evidence visible so a theme does not erase important context.",
        ],
      },
      {
        id: "research-roadmap",
        title: "Make a research-led roadmap",
        duration: "24 min",
        summary: "Connect user needs to outcomes before choosing features.",
        content: [
          "A roadmap is a set of outcome-focused bets, not a fixed promise of features.",
          "Use small experiments to reduce uncertainty and revisit assumptions as evidence changes.",
        ],
      },
    ],
    quizMinutes: 4,
    quiz: [
      {
        prompt: "Which interview prompt uncovers useful evidence?",
        options: [
          "Would you use this?",
          "Tell me about the last time you tried this.",
          "You found this difficult, right?",
          "Do you like our design?",
        ],
        answer: 1,
        explanation:
          "A concrete recent example reveals behavior better than predictions.",
      },
      {
        prompt: "What should synthesis keep visible?",
        options: [
          "Only the common opinion",
          "Patterns, exceptions, and evidence",
          "Feature requests only",
          "The preferred solution",
        ],
        answer: 1,
        explanation:
          "Patterns guide decisions while exceptions and evidence preserve context.",
      },
      {
        prompt: "A roadmap is best understood as:",
        options: [
          "A fixed feature promise",
          "A stakeholder-ranked list",
          "Outcome-focused bets that evolve with evidence",
          "A replacement for discovery",
        ],
        answer: 2,
        explanation:
          "A useful roadmap connects work to outcomes and leaves room to learn.",
      },
    ],
  },
  {
    id: "data-storytelling",
    title: "Make Data Tell a Story",
    category: "Data",
    level: "Intermediate",
    duration: "1h 21m",
    description:
      "Choose the right chart, frame a clear takeaway, and move from numbers to decisions people can explain.",
    instructor: "Jonah Reed",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    accent: "#eadfb4",
    lessons: [
      {
        id: "data-question",
        title: "Start with the decision",
        duration: "25 min",
        summary: "Let the question determine which data deserves attention.",
        content: [
          "Write down the decision your audience needs to make before opening a charting tool.",
          "Check metric definitions and time ranges so your comparisons answer the real question.",
        ],
      },
      {
        id: "data-chart",
        title: "Choose a chart that fits",
        duration: "28 min",
        summary: "Use position and shape to make comparisons easy to read.",
        content: [
          "Use lines for change over time, bars for categories, and scatter plots for relationships.",
          "Direct labels and clear units reduce effort; remove decoration that competes with data.",
        ],
      },
      {
        id: "data-story",
        title: "Write the takeaway first",
        duration: "28 min",
        summary:
          "Make the main insight clear before supporting it with detail.",
        content: [
          "A useful headline states what changed and why it matters.",
          "Show evidence, name uncertainty, and finish with the decision or action it supports.",
        ],
      },
    ],
    quizMinutes: 5,
    quiz: [
      {
        prompt: "What should you identify before choosing a chart?",
        options: [
          "The color palette",
          "The audience's decision",
          "The biggest dataset",
          "The last chart used",
        ],
        answer: 1,
        explanation: "The decision determines which comparisons are relevant.",
      },
      {
        prompt: "Which chart is a good default for change over time?",
        options: ["Line chart", "Pie chart", "Word cloud", "Icon grid"],
        answer: 0,
        explanation: "A line chart makes sequential movement easy to scan.",
      },
      {
        prompt: "What makes a data-story headline useful?",
        options: [
          "Repeating the chart title",
          "Saying what changed and why it matters",
          "Listing every metric",
          "Avoiding uncertainty",
        ],
        answer: 1,
        explanation:
          "A takeaway-first headline gives the conclusion before the details.",
      },
    ],
  },
  {
    id: "ux-writing",
    title: "UX Writing That Works",
    category: "Writing",
    level: "Beginner",
    duration: "1h 06m",
    description:
      "Write interface language that helps people understand what is happening and what to do next.",
    instructor: "Nora Ellis",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
    accent: "#f2dfbf",
    lessons: [
      {
        id: "writing-voice",
        title: "Find a useful product voice",
        duration: "20 min",
        summary: "Make a consistent voice fit both the product and the moment.",
        content: [
          "A product voice should be recognizable without getting in the way of the task.",
          "Adjust tone for context while keeping the underlying personality consistent.",
        ],
      },
      {
        id: "writing-labels",
        title: "Name actions clearly",
        duration: "22 min",
        summary: "Use concise labels that explain the result of an action.",
        content: [
          "Start buttons with concrete verbs and describe the outcome users can expect.",
          "Avoid vague labels such as 'Submit' when a specific action is available.",
        ],
      },
      {
        id: "writing-errors",
        title: "Write helpful error messages",
        duration: "24 min",
        summary: "Explain the issue and give people a useful next step.",
        content: [
          "A useful error says what happened without blaming the person using the product.",
          "Offer a recovery action and preserve any work that can safely be kept.",
        ],
      },
    ],
    quizMinutes: 4,
    quiz: [
      {
        prompt: "What should a useful button label communicate?",
        options: [
          "The visual style",
          "The action and its outcome",
          "The engineering owner",
          "The page URL",
        ],
        answer: 1,
        explanation: "Specific labels set clear expectations for the action.",
      },
      {
        prompt: "How should error copy treat the user?",
        options: [
          "Assign blame",
          "Explain the issue and offer a next step",
          "Hide the cause",
          "Use technical jargon",
        ],
        answer: 1,
        explanation: "Helpful errors explain what happened and how to recover.",
      },
      {
        prompt: "What is the best approach to product tone?",
        options: [
          "Use one tone in every situation",
          "Adapt tone while keeping voice consistent",
          "Avoid all personality",
          "Use humor in every error",
        ],
        answer: 1,
        explanation:
          "Tone adapts to context while the product voice remains recognizable.",
      },
    ],
  },
  {
    id: "web-accessibility",
    title: "Accessible Web Foundations",
    category: "Development",
    level: "Beginner",
    duration: "1h 18m",
    description:
      "Build web experiences that work with keyboards, assistive technology, and a wider range of needs.",
    instructor: "Samira Patel",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
    accent: "#d6e9e5",
    lessons: [
      {
        id: "a11y-semantics",
        title: "Use meaningful HTML",
        duration: "25 min",
        summary:
          "Give controls and page regions semantics browsers can understand.",
        content: [
          "Native elements provide keyboard behavior and accessibility information by default.",
          "Use headings and landmarks to make page structure easier to navigate.",
        ],
      },
      {
        id: "a11y-keyboard",
        title: "Support keyboard navigation",
        duration: "26 min",
        summary: "Make every interactive task possible without a pointer.",
        content: [
          "Keep focus order predictable and make the focused control easy to see.",
          "Do not trap keyboard users; test menus, dialogs, and forms with Tab and Escape.",
        ],
      },
      {
        id: "a11y-contrast",
        title: "Check contrast and feedback",
        duration: "27 min",
        summary: "Keep information legible and state changes easy to notice.",
        content: [
          "Text and controls need sufficient contrast against their backgrounds.",
          "Pair color with visible labels, icons, or shapes when showing a status.",
        ],
      },
    ],
    quizMinutes: 5,
    quiz: [
      {
        prompt: "Why prefer a native button element?",
        options: [
          "It adds a gradient",
          "It provides built-in semantics and keyboard behavior",
          "It removes labels",
          "It is always smaller",
        ],
        answer: 1,
        explanation:
          "Native elements include expected browser interaction and semantics.",
      },
      {
        prompt: "What should a visible focus indicator do?",
        options: [
          "Show the current keyboard target",
          "Decorate every paragraph",
          "Replace the page title",
          "Only appear on touch",
        ],
        answer: 0,
        explanation: "Visible focus helps keyboard users track their place.",
      },
      {
        prompt: "How should an important status be conveyed?",
        options: [
          "Color alone",
          "Color plus another clear cue",
          "A hidden tooltip",
          "Animation only",
        ],
        answer: 1,
        explanation:
          "More than one signal makes status understandable to more people.",
      },
    ],
  },
  {
    id: "react-foundations",
    title: "React Foundations",
    category: "Development",
    level: "Beginner",
    duration: "1h 24m",
    description:
      "Learn to compose user interfaces from components and model interactive state with confidence.",
    instructor: "Ethan Brooks",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=85",
    accent: "#d7e8f0",
    lessons: [
      {
        id: "react-components",
        title: "Compose with components",
        duration: "27 min",
        summary: "Break interfaces into pieces with clear responsibilities.",
        content: [
          "Components package markup and behavior into reusable interface units.",
          "Choose boundaries around coherent pieces of UI rather than making every line a component.",
        ],
      },
      {
        id: "react-props",
        title: "Pass data with props",
        duration: "28 min",
        summary:
          "Make components reusable by passing the information they need.",
        content: [
          "Props let a parent configure a child without coupling it to a specific screen.",
          "Keep data flow explicit and avoid duplicating values that can be derived.",
        ],
      },
      {
        id: "react-state",
        title: "Model interaction with state",
        duration: "29 min",
        summary: "Update the interface in response to user actions.",
        content: [
          "State represents information that changes over time and affects what the user sees.",
          "Update state through its setter and derive display values from the current state.",
        ],
      },
    ],
    quizMinutes: 5,
    quiz: [
      {
        prompt: "What is a React component?",
        options: [
          "A reusable UI unit",
          "A database table",
          "A CSS selector",
          "A network request",
        ],
        answer: 0,
        explanation:
          "Components describe reusable pieces of interface and behavior.",
      },
      {
        prompt: "How does a parent configure a child component?",
        options: [
          "With props",
          "With a global variable",
          "With a CSS reset",
          "With a route redirect",
        ],
        answer: 0,
        explanation: "Props pass the values a component needs from its parent.",
      },
      {
        prompt: "When should a value be state?",
        options: [
          "Whenever it is a string",
          "When it changes and affects the UI",
          "For every constant",
          "Only after a network call",
        ],
        answer: 1,
        explanation:
          "State is for changing information that affects rendered output.",
      },
    ],
  },
  {
    id: "product-strategy",
    title: "Practical Product Strategy",
    category: "Product",
    level: "Intermediate",
    duration: "1h 12m",
    description:
      "Connect customer needs, business goals, and evidence to make clearer product bets.",
    instructor: "Ravi Shah",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85",
    accent: "#eedbd2",
    lessons: [
      {
        id: "strategy-outcomes",
        title: "Choose meaningful outcomes",
        duration: "24 min",
        summary: "Define the change your product work should create.",
        content: [
          "Outcomes describe a change for customers or the business, not a list of shipped features.",
          "Choose measures that can show whether the change actually happened.",
        ],
      },
      {
        id: "strategy-bets",
        title: "Make explicit product bets",
        duration: "23 min",
        summary:
          "State assumptions and uncertainty before committing to a solution.",
        content: [
          "A product bet links a customer problem to an expected outcome and a proposed action.",
          "Write down the assumptions that matter most so they can be tested early.",
        ],
      },
      {
        id: "strategy-learning",
        title: "Learn and adapt",
        duration: "25 min",
        summary: "Use evidence to adjust direction without losing momentum.",
        content: [
          "Set review points where new evidence can change your plan.",
          "Share what was learned, including outcomes that did not match expectations.",
        ],
      },
    ],
    quizMinutes: 4,
    quiz: [
      {
        prompt: "What does a product outcome describe?",
        options: [
          "A shipped feature",
          "A change for customers or the business",
          "A meeting schedule",
          "A design file",
        ],
        answer: 1,
        explanation: "Outcomes describe impact rather than output.",
      },
      {
        prompt: "Why write down assumptions?",
        options: [
          "To avoid user research",
          "To identify what needs testing",
          "To guarantee success",
          "To increase scope",
        ],
        answer: 1,
        explanation:
          "Explicit assumptions can be tested before they become expensive.",
      },
      {
        prompt: "When should strategy change?",
        options: [
          "Never",
          "When meaningful new evidence changes the picture",
          "At every meeting",
          "Only at launch",
        ],
        answer: 1,
        explanation:
          "A strategy should adapt when new evidence warrants a change.",
      },
    ],
  },
  {
    id: "sql-essentials",
    title: "SQL Essentials for Analysis",
    category: "Data",
    level: "Beginner",
    duration: "1h 16m",
    description:
      "Query relational data, combine useful records, and summarize results for everyday analysis.",
    instructor: "Talia Morgan",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=85",
    accent: "#dce8cc",
    lessons: [
      {
        id: "sql-select",
        title: "Select and filter rows",
        duration: "25 min",
        summary: "Retrieve just the columns and records your question needs.",
        content: [
          "SELECT names the columns to return, while WHERE keeps rows that match a condition.",
          "Use explicit columns and check the result size before expanding a query.",
        ],
      },
      {
        id: "sql-joins",
        title: "Join related tables",
        duration: "26 min",
        summary: "Combine records through keys that represent a relationship.",
        content: [
          "A join matches rows across tables using related key values.",
          "Check key uniqueness and join type to avoid losing or multiplying records.",
        ],
      },
      {
        id: "sql-aggregates",
        title: "Summarize with aggregates",
        duration: "25 min",
        summary: "Group records and calculate useful counts or averages.",
        content: [
          "Aggregate functions summarize many rows into values such as counts and averages.",
          "GROUP BY defines the segments and HAVING filters the grouped results.",
        ],
      },
    ],
    quizMinutes: 5,
    quiz: [
      {
        prompt: "Which clause filters individual rows?",
        options: ["WHERE", "ORDER BY", "SELECT", "AS"],
        answer: 0,
        explanation: "WHERE applies conditions to rows before grouping.",
      },
      {
        prompt: "What does a join use to relate tables?",
        options: [
          "Matching key values",
          "Matching colors",
          "The row order",
          "Column labels only",
        ],
        answer: 0,
        explanation: "Joins match records using related key values.",
      },
      {
        prompt: "Which clause filters grouped aggregate results?",
        options: ["HAVING", "WHERE", "LIMIT", "FROM"],
        answer: 0,
        explanation: "HAVING filters groups after aggregation.",
      },
    ],
  },
  {
    id: "clear-communication",
    title: "Clear Communication at Work",
    category: "Communication",
    level: "Beginner",
    duration: "58 min",
    description:
      "Share ideas with structure, listen for what matters, and make collaboration easier across a team.",
    instructor: "Morgan Lee",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    accent: "#f0d8c8",
    lessons: [
      {
        id: "communication-structure",
        title: "Lead with the point",
        duration: "19 min",
        summary:
          "Put the key message first and support it with the right detail.",
        content: [
          "State the decision or request early so readers know why the message matters.",
          "Add only the context needed to understand the recommendation.",
        ],
      },
      {
        id: "communication-listening",
        title: "Listen to understand",
        duration: "20 min",
        summary:
          "Use questions and reflection to uncover the other person's meaning.",
        content: [
          "Give the speaker room to finish before deciding what they mean.",
          "Reflect the key point and ask a clarifying question when details are unclear.",
        ],
      },
      {
        id: "communication-feedback",
        title: "Give actionable feedback",
        duration: "19 min",
        summary: "Describe specific observations and a constructive next step.",
        content: [
          "Anchor feedback in a specific behavior and its observable impact.",
          "Make a clear request and leave room for the other person's perspective.",
        ],
      },
    ],
    quizMinutes: 4,
    quiz: [
      {
        prompt: "Where should the key message usually appear?",
        options: [
          "At the beginning",
          "Only in a footnote",
          "After every detail",
          "In a separate document",
        ],
        answer: 0,
        explanation:
          "Leading with the point helps readers understand the purpose quickly.",
      },
      {
        prompt: "What supports active listening?",
        options: [
          "Interrupting early",
          "Reflecting and clarifying",
          "Planning a rebuttal",
          "Changing the subject",
        ],
        answer: 1,
        explanation:
          "Reflection and questions help confirm shared understanding.",
      },
      {
        prompt: "What makes feedback actionable?",
        options: [
          "A general judgment",
          "A specific observation and next step",
          "A comparison to a coworker",
          "An unclear hint",
        ],
        answer: 1,
        explanation:
          "Specific behavior, impact, and a request give feedback a useful direction.",
      },
    ],
  },
];
