const font = "Dancing Font";
figlet.defaults({ fontPath: "https://unpkg.com/figlet/fonts/" });
figlet.preloadFonts([font], ready);
const formatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});
const commands = {
  help() {
    term.echo(`Available commands: ${help}`);
  },
};

const command_list = Object.keys(commands);
const help = formatter.format(command_list);
const term = $("body").terminal(commands, { greetings: false });

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
  return lolcat
    .rainbow(
      function (char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
      },
      string,
      seed
    )
    .join("\n");
}

function hex(color) {
  return (
    "#" +
    [color.red, color.green, color.blue]
      .map((n) => {
        return n.toString(16).padStart(2, "0");
      })
      .join("")
  );
}

term.pause();

function ready() {
  const seed = rand(256);
  term
    .echo(() => {
      const introduction = rainbow(render("Desmynn's Portfolio"), seed);

      return `${introduction} Welcome to my portfolio\n`;
    })
    .resume();
}
