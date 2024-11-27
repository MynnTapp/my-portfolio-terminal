const font = "Dancing Font";
figlet.defaults({ fontPath: "https://unpkg.com/figlet/fonts/" });
figlet.preloadFonts([font], ready);
const user = "guest";
const server = "http://localhost:5500/";

function prompt() {
  return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}
const formatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
  exit: false,
});
const root = "~";
let cwd = root;

const directories = {
  education: [
    "",
    "<pink>Education</pink>",
    '*<a href="https://www.logan.edu/"> Logan University </a> 2022-2024 <pink> Bachelor of Science in Human Biology </pink>',
    '*<a href="https://www.appacademy.io/"> App Academy </a> May 2024 - December 2024 <pink> Certification in Software Engineering </pink>',
    "",
  ],

  certifications: [
    "",
    "<pink>Certification</pink>",
    '<a href="https://www.freecodecamp.org/certification/fccb432e555-2c68-4769-a9b0-f219a69331bc/responsive-web-design"> Responsive Web Design </a>',
    '<a href="https://www.freecodecamp.org/certification/fccb432e555-2c68-4769-a9b0-f219a69331bc/javascript-algorithms-and-data-structures-v8"> JavaScript Algorithms and Data Structures </a>',
    '<a href="https://www.freecodecamp.org/certification/fccb432e555-2c68-4769-a9b0-f219a69331bc/front-end-development-libraries"> Front-End Development Libraries </a>',
    "",
  ],

  projects: [
    "",
    "<pink>My Personal Projects</pink>",
    [
      ["South Park Quote Machine", "https://github.com/MynnTapp/South-Park-Quote-Machine", "Quote Machine that generates South Park quotes"],
      ["React Calculator", "https://github.com/MynnTapp/my-react-calculator", "a calulator made using React"],
      ["Markdown Previewer", "https://github.com/MynnTapp/Markdown-Previewer", "a markdown previewer to turn code into markdown"],
      ["25 + 5 timer", "https://github.com/MynnTapp/my-25-5-timer", "a kind of pomodoro timer that is used for studying"],
      ["My Keyboard Drum set", "https://github.com/MynnTapp/Drum-Machine", "A drum set you can play with your keyboard"],
    ].map(([name, url, description = ""]) => {
      return `<a href="${url}"> ${name} </a> &mdash; <pink> ${description} </pink>`;
    }),
  ].flat(),
  skills: [
   [["Python", "Javascript", "SQL", "HTML", "CSS"],
    ["React", "Redux", "Postgres SQL", "JQuery", "Bootstrap", "SASS", "Flask"],
    ["Linux", "Git"],
  ].map(([languages, libraries, tools], i) => {
  return `Coding languages I know are: <pink>${languages}</pink>`
  }),
  ].flat(),
  resume: [`file:///C:/Users/Desmy/Downloads/Desmynn_Tappin_Resume%20(1).pdf`].map((resume, i) => {
    return `This is my resume: <a href="${resume}"><pink>${resume}</pink></a>`
  }),

  aboutMe:
    ["Welcome to my personal portfolio! I am a dedicated and driven software engineer, transitioning from a path in physician science to a career where I can channel my problem-solving skills into developing innovative software solutions. This portfolio showcases my journey, skills, and projects, reflecting my passion for tackling complex challenges and creating meaningful impact through code. My diverse background enables me to approach problem-solving with unique perspectives, and I aim to leverage my skills to drive positive change across industries—healthcare and beyond.Feel free to explore my projects and connect with me as I continue to grow in this exciting field!"].map((aboutMe) => {return `<pink>${aboutMe}</pink>`}),

  contact_Info: ["501-697-6028", "DesmynnMJC@gmail.com", "https://www.linkedin.com/in/desmynn-j-tappin-975822233/", "https://github.com/MynnTapp"].map(([phoneNumber, email, LinkedIn, Github]) => {
    return `<pink>my phoneNumber is: ${phoneNumber}\n my email is: ${email}\n
    my LinkedIn: ${LinkedIn}\n my GitHub: ${Github} <pink>`;
  }),
};

const url = "https://v2.jokeapi.dev/joke/Programming";


//ISSUE/////////////////////////////////////////////////////////////////////////////
function print_dirs() {
  term.echo(
    Object.keys(directories).map((dir) => {
        return `<blue class="directory">${dir}</blue>`;
      }).join("\n")
  );
}
//////////////////////////////////////////////////////////////////
const commands = {
  help() {
    term.echo(`Available commands: ${help}`);
  },
  echo(...args) {
    if (args.length > 0) {
      term.echo(args.join(" "));
    }
  },
  cd(dir = null) {
    if (dir === null || (dir === ".." && cwd !== root)) {
      cwd = root;
    } else if (dir.startsWith("~/") && dir.includes(dir.substring(2))) {
      cwd = dir;
    } else if (dir.includes(dir)) {
      cwd = root + "/" + dir;
    } else {
      this.error("Wrong directory");
    }
  },

  ls(dir = null) {
    if (dir) {
      if (dir.match(/^~\/?$/)) {
        // ls ~ or ls ~/
        print_dirs();
      } else if (dir.startsWith("~/")) {
        const path = dir.substring(2);
        const dirs = path.split("/");
        if (dirs.length > 1) {
          this.error("Invalid directory");
        } else {
          const dir = dirs[0];
          this.echo(directories[dir].join("\n"));
        }
      } else if (cwd === root) {
        if (dir in directories) {
          this.echo(directories[dir].join("\n"));
        } else {
          this.error("Invalid directory");
        }
      } else if (dir === "..") {
        print_dirs();
      } else {
        this.error("Invalid directory");
      }
    } else if (cwd === root) {
      print_dirs();
    } else {
      const dir = cwd.substring(2);
      this.echo(directories[dir].join("\n"));
    }
  },

  async joke() {
    const res = await fetch(url);
    const data = await res.json();
    if (data.type == "twopart") {
      this.animation(async () => {
        await this.echo(`Q: ${data.setup}`, {
          delay: 50,
          typing: true,
        });
        await this.echo(`A: ${data.delivery}`, {
          delay: 50,
          typing: true,
        });
      });
    } else if (data.type === "single") {
      this.echo(data.joke, {
        delay: 50,
        typing: true,
      });
    }
  },

  credits() {
    return [
      "",
      "<white>Used libraries:</white>",
      '* <a href="https://terminal.jcubic.pl">jQuery Terminal</a>',
      '* <a href="https://github.com/patorjk/figlet.js/">Figlet.js</a>',
      '* <a href="https://github.com/jcubic/isomorphic-lolcat">Isomorphic Lolcat</a>',
      '* <a href="https://jokeapi.dev/">Joke API</a>',
      "",
    ].join("\n");
  },
};

const command_list = Object.keys(commands);
const clearTerminal = ["clear"].concat(Object.keys(commands));
const term = $("body").terminal(commands, {
  greetings: false,
  checkArity: false,
  completion(string) {
    const cmd = this.get_command();
    const { name, rest } = $.terminal.parse_command(cmd);
    if (["cd", "ls"].includes(name)) {
      if (rest.startsWith("~/")) {
        return dir.map((dir) => `~/${dir}`);
      }
      if (cwd === root) {
        return dir;
      }
    }
    return Object.keys(commands);
  },
  prompt,
});
const formattedList = command_list.map((cmd) => {
  return `<pink class="command">${cmd}</pink>`;
});

const re = new RegExp(`^\s*(${command_list.join("|")}) (.*)`);

$.terminal.new_formatter(function (string) {
  return string.replace(re, function (_, command, args) {
    return `<pink>${command}</pink> <orange>${args}</orange>`;
  });
});

const help = formatter.format(formattedList);

term.on("click", ".command", function () {
  const command = $(this).text();
  term.exec(command);
});

function render(text) {
  const cols = term.cols();
  return figlet.textSync(text, {
    font: font,
    width: cols,
    whitespaceBreak: true,
  });
}

function rand(max) {
  return Math.floor(Math.random() * (max + 1));
}

function rainbow(string, seed) {
  return lolcat.rainbow(
      function (char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
      },
      string,
      seed
    ).join("\n");
}



function hex(color) {
  return (
    "#" +
    [color.red, color.green, color.blue].map((n) => {
        return n.toString(16).padStart(2, "0");
      }).join("")
  );
}

$.terminal.xml_formatter.tags.blue = (attrs) => {
  return `[[;#f542aa;;${attrs.class}]`;
};

term.on("click", ".directory", function () {
  const dir = $(this).text();
  term.exec(`cd ~/${dir}`);
});

term.pause();

function ready() {
  const seed = rand(256);
  term.echo(() => {
      const introduction = rainbow(render("Desmynn's Portfolio"), seed);

      return `${introduction} Welcome to my portfolio\n`;
    }).resume();
}
