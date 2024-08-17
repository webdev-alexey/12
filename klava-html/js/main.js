const text = `На переднем плане, прямо перед нами, расположен был дворик, где стоял наполовину вычищенный автомобиль. Шофер Остин был на этот раз уволен окончательно и бесповоротно. Он раскинулся на земле, и большая черная ссадина на лбу свидетельствовала, по-видимому, о том, что он при падении ударился головою о подножку или щит.`;

const inputElement = document.querySelector("#input");
const textExampleElement = document.querySelector("#textExample");

const lines = getLines(text);

let letterId = 1;

update();

inputElement.addEventListener("keydown", function (event) {
  const currentLetter = getCurrentLetter();

  if (event.key === currentLetter.label) {
    letterId = letterId + 1;
    update();
  }
});

function getLines(text) {
  const lines = [];

  let line = [];
  let idCounter = 0;
  for (const letter of text) {
    idCounter = idCounter + 1;

    line.push({
      id: idCounter,
      label: letter,
      success: true,
    });

    if (line.length >= 70 || letter === "\n") {
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
