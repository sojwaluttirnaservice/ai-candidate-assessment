const sequelize = require("../config/sequelize");
const Sequelize = require("sequelize");

// Define the Skill schema
const skillSchema = sequelize.define("skill", {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for each skill",
    },

    skill_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            len: [2, 50], // Ensures the skill name is between 2 and 50 characters
        },
        comment: "Name of the skill (must be unique)",
    },

    description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Optional description of the skill",
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the skill was created",
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Timestamp when the skill was last updated",
    },
}, {
    timestamps: true, // Enables createdAt & updatedAt fields
    comment: "Table storing the skills",
});

// Export the model
module.exports = skillSchema;


/**
 [
  { "skill_name": "JavaScript", "description": "A versatile programming language for web development." },
  { "skill_name": "Python", "description": "A high-level programming language popular for data science and web development." },
  { "skill_name": "Java", "description": "A widely-used programming language known for its platform independence." },
  { "skill_name": "C#", "description": "A modern, object-oriented programming language developed by Microsoft." },
  { "skill_name": "C++", "description": "A high-performance programming language used for system/software development." },
  { "skill_name": "HTML5", "description": "The latest version of HTML, used for structuring content on the web." },
  { "skill_name": "CSS3", "description": "Cascading Style Sheets, used to design and layout web pages." },
  { "skill_name": "SQL", "description": "A standard language used for managing and querying relational databases." },
  { "skill_name": "NoSQL", "description": "Non-relational databases that store data in a variety of formats." },
  { "skill_name": "React", "description": "A JavaScript library for building user interfaces, primarily for web apps." },
  { "skill_name": "Vue.js", "description": "A progressive JavaScript framework for building user interfaces." },
  { "skill_name": "Angular", "description": "A platform for building mobile and desktop web applications using TypeScript." },
  { "skill_name": "Node.js", "description": "A runtime environment that allows JavaScript to be run on the server side." },
  { "skill_name": "Express.js", "description": "A minimalist web framework for Node.js, ideal for building web APIs." },
  { "skill_name": "Ruby", "description": "A dynamic, open-source programming language known for its simplicity." },
  { "skill_name": "PHP", "description": "A popular server-side scripting language used for web development." },
  { "skill_name": "Swift", "description": "A programming language developed by Apple for building iOS and macOS applications." },
  { "skill_name": "Kotlin", "description": "A statically typed programming language used for Android app development." },
  { "skill_name": "TypeScript", "description": "A superset of JavaScript that adds static typing to the language." },
  { "skill_name": "Flutter", "description": "A UI toolkit from Google to build natively compiled applications for mobile, web, and desktop." },
  { "skill_name": "Git", "description": "A version control system for tracking changes in source code during software development." },
  { "skill_name": "Docker", "description": "A tool designed to make it easier to create, deploy, and run applications by using containers." },
  { "skill_name": "AWS", "description": "Amazon Web Services, a comprehensive and widely adopted cloud platform." },
  { "skill_name": "Azure", "description": "Microsoft's cloud computing service offering a wide range of cloud services." },
  { "skill_name": "Google Cloud", "description": "Google's cloud platform that provides infrastructure, application development, and cloud-based services." },
  { "skill_name": "DevOps", "description": "A culture and set of practices that bring together software development and IT operations." },
  { "skill_name": "CI/CD", "description": "Continuous Integration and Continuous Deployment, practices for automating code integration and delivery." },
  { "skill_name": "GraphQL", "description": "A query language for your API, and a runtime for executing those queries with your existing data." },
  { "skill_name": "REST API", "description": "An architectural style for designing networked applications, relying on stateless communication." },
  { "skill_name": "Jenkins", "description": "An open-source automation server that supports building, deploying, and automating software projects." },
  { "skill_name": "Sass", "description": "A preprocessor scripting language that is interpreted or compiled into CSS." },
  { "skill_name": "Webpack", "description": "A module bundler for JavaScript applications, often used with React and Angular." },
  { "skill_name": "JQuery", "description": "A fast, small, and feature-rich JavaScript library that simplifies HTML document traversal." },
  { "skill_name": "Bootstrap", "description": "A front-end framework for building responsive, mobile-first websites." },
  { "skill_name": "Tailwind CSS", "description": "A utility-first CSS framework for rapidly building custom user interfaces." },
  { "skill_name": "SEO", "description": "Search Engine Optimization, the practice of optimizing websites to rank better in search engine results." },
  { "skill_name": "UI/UX Design", "description": "The design of user interfaces and user experiences to create visually appealing and functional websites or apps." },
  { "skill_name": "Figma", "description": "A collaborative design tool for UI/UX design, prototyping, and wireframing." },
  { "skill_name": "Photoshop", "description": "A graphics editing program used for creating, editing, and enhancing visual designs." },
  { "skill_name": "Illustrator", "description": "A vector graphics editor used to create scalable illustrations and designs." },
  { "skill_name": "Agile Methodology", "description": "A project management methodology for software development that emphasizes iterative progress." },
  { "skill_name": "Scrum", "description": "An Agile framework for developing, delivering, and sustaining complex products." }
]

 */