const text = `На переднем плане, прямо перед нами, расположен был дворик, где стоял наполовину вычищенный автомобиль. Шофер Остин был на этот раз уволен окончательно и бесповоротно. Он раскинулся на земле, и большая черная ссадина на лбу свидетельствовала, по-видимому, о том, что он при падении ударился головою о подножку или щит.`;

const inputElement = document.querySelector("#input");
const textExampleElement = document.querySelector("#textExample");

const lines = getLines(text);

let letterId = 1;

init();

function init() {
  update();

  inputElement.focus();

  inputElement.addEventListener("keydown", function (event) {
    const currentLineNumber = getCurrentLineNumber();
    const element = document.querySelector(
      '[data-key="' + event.key.toLowerCase() + '"]'
    );
    const currentLetter = getCurrentLetter();

    if (event.key.startsWith("F") && event.key.length > 1) {
      return;
    }

    if (element) {
      element.classList.add("hint");
    }

    const isKey = event.key === currentLetter.original;
    const isEnter = event.key === "Enter" && currentLetter.original === "\n";

    if (isKey || isEnter) {
      letterId = letterId + 1;
      update();
    } else {
      event.preventDefault();
    }

    if (currentLineNumber !== getCurrentLineNumber()) {
      inputElement.value = "";
      event.preventDefault();
    }
  });

  inputElement.addEventListener("keyup", function (event) {
    const element = document.querySelector(
      '[data-key="' + event.key.toLowerCase() + '"]'
    );
    if (element) {
      element.classList.remove("hint");
    }
  });
}

function getLines(text) {
  const lines = [];

  let line = [];
  let idCounter = 0;
  for (const originalLetter of text) {
    idCounter = idCounter + 1;

    let letter = originalLetter;

    if (letter === " ") {
      letter = "°";
    }

    if (letter === "\n") {
      letter = "¶\n";
    }

    line.push({
      id: idCounter,
      label: letter,
      original: originalLetter,
      success: true,
    });

    if (line.length >= 70 || letter === "¶\n") {
      lines.push(line);
      line = [];
    }
  }

  if (line.length > 0) {
    lines.push(line);
  }

  return lines;
}

function lineToHtml(line) {
  const divElement = document.createElement("div");
  divElement.classList.add("line");

  for (const letter of line) {
    const spanElement = document.createElement("span");
    spanElement.textContent = letter.label;

    divElement.append(spanElement);

    if (letterId > letter.id) {
      spanElement.classList.add("done");
    }
  }

  return divElement;
}

function getCurrentLineNumber() {
  for (let i = 0; i < lines.length; i++) {
    for (const letter of lines[i]) {
      if (letter.id === letterId) {
        return i;
      }
    }
  }
}

function update() {
  const currentLineNumber = getCurrentLineNumber();
  textExampleElement.innerHTML = "";

  for (let i = 0; i < lines.length; i++) {
    const html = lineToHtml(lines[i]);
    textExampleElement.append(html);

    if (i < currentLineNumber || i > currentLineNumber + 2) {
      html.classList.add("hidden");
    }
  }
}

function getCurrentLetter() {
  for (const line of lines) {
    for (const letter of line) {
      if (letterId === letter.id) {
        return letter;
      }
    }
  }
}
