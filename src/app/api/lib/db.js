const db = {
  campaigns: [],
};

export const messageBank = [
  "Find friends who share your love for art, crafts, and creativity.",
  "Build connections as strong as your passion for LEGO.",
  "Write your next chapter with friends who inspire your storytelling.",
  "From the court to the craft table, meet people who match your energy.",
  "Discover a community that loves reading as much as you do.",
  "Team up with eco-conscious friends making a difference together.",
  "Celebrate your passions in an LGBTQ-friendly community.",
  "Find basketball buddies who can discuss novels and environmental causes after the game.",
  "Connect over shared passions like crafting, writing, and standing up for the planet.",
  "Meet friends who love art, books, and building worlds—LEGO or otherwise!",
];

export const recipients = [
  {
    id: 1,
    name: "Irene",
    gender: "female",
    generation: "GenX",
    status: "<1 visit per month",
    info: "She is interested in crafts, writing, dogs, cats, and art.",
    email: [
      { section_id: 1, generated: false, string: "Hello Irene" },
      {
        section_id: 2,
        generated: true,
        string:
          "Connect with friends interested in art, writing, and animals today",
      },
      {
        section_id: 3,
        generated: true,
        string: "Friends to create crafts with are just a week away",
      },
      {
        section_id: 4,
        generated: false,
        string: "Sign up for Just Friends now!",
      },
      {
        section_id: 5,
        generated: false,
        string: "Your friends and Just Friends",
      },
    ],
  },
  {
    id: 2,
    name: "Bob",
    gender: "male",
    generation: "GenX",
    status: "<1 visit per month",
    info: "He likes playing basketball, eating Korean food, and board game nights.",
    email: [
      { section_id: 1, generated: false, string: "Hello Bob" },
      {
        section_id: 2,
        generated: true,
        string: "Play basketball with new people today!",
      },
      {
        section_id: 3,
        generated: false,
        string: "Sign up for Just Friends now!",
      },
      {
        section_id: 4,
        generated: false,
        string: "Your friends and Just Friends",
      },
    ],
  },
  {
    id: 3,
    name: "Chris",
    gender: "male",
    generation: "GenZ",
    status: "<1 visit per month",
    info: "He likes playing guitar, reading books, martial arts, and cats",
    email: [
      { section_id: 1, generated: false, string: "Hello Chris" },
      {
        section_id: 2,
        generated: true,
        string: "Jam and spar with friends today!",
      },
      {
        section_id: 3,
        generated: false,
        string: "Sign up for Just Friends now!",
      },
      {
        section_id: 4,
        generated: false,
        string: "Your friends and Just Friends",
      },
    ],
  },
  {
    id: 4,
    name: "Kim",
    gender: "female",
    generation: "GenZ",
    status: "<1 visit per month",
    info: "She considers herself radicalized and a political advocate. She identifies as queer and works planting trees",
    email: [
      { section_id: 1, generated: false, string: "Hello Kim" },
      {
        section_id: 2,
        generated: true,
        string:
          "Find poeple to advocate for environmental protection with today.",
      },
      {
        section_id: 3,
        generated: false,
        string: "Sign up for Just Friends now!",
      },
      {
        section_id: 4,
        generated: false,
        string: "Your friends and Just Friends",
      },
    ],
  },
  {
    id: 5,
    name: "Mary",
    gender: "female",
    generation: "Milennial",
    status: "<1 visit per month",
    info: "She is a cat mom and plant lover. Shes motivated by building community and environmentalism",
    email: [
      { section_id: 1, generated: false, string: "Hello Mary" },
      {
        section_id: 2,
        generated: true,
        string: "Create the community you've been looking for today",
      },
      {
        section_id: 3,
        generated: false,
        string: "Sign up for Just Friends now!",
      },
      {
        section_id: 4,
        generated: false,
        string: "Your friends and Just Friends",
      },
    ],
  },
  {
    id: 6,
    name: "Josh",
    gender: "Male",
    generation: "GenZ",
    status: "<1 visit per month",
    info: "He loves baking and building legos.",
    email: [
      { section_id: 1, generated: false, string: "Hello Josh" },
      {
        section_id: 2,
        generated: true,
        string: "Start a baking club with others who love baking!",
      },
      {
        section_id: 3,
        generated: false,
        string: "Sign up for Just Friends now!",
      },
      {
        section_id: 4,
        generated: false,
        string: "Your friends and Just Friends",
      },
    ],
  },
];

export default db;
