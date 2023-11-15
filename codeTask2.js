const table = document.getElementById('myTable')
const colorPicker = document.getElementById('colorPicker')
const colorInput = document.getElementById('colorInput')
const colorApplyButton = document.getElementById('colorApplyButton')

// Генеруємо таблицю 6x6
for (let i = 1; i <= 6; i++) {
  const row = table.insertRow()
  for (let j = 1; j <= 6; j++) {
    const cell = row.insertCell()
    cell.textContent = (i - 1) * 6 + j
  }
}

table.addEventListener('mouseover', (event) => {
  let target = event.target
  if (target.nodeName === 'TD') {
    target.style.background = getRandomColor()
  }
})

table.addEventListener('mouseout', (event) => {
  let target = event.target
  if (target.nodeName === 'TD') {
    target.style.background = ''
  }
})

let clickTimer = null;
table.addEventListener('click', function(event) {
  if (!clickTimer) {
    clickTimer = setTimeout(() => {
      clickTimer = null;
      showColorPicker(event);
    }, 500); // Часовий інтервал для перевірки подвійного кліку
  } else {
    clearTimeout(clickTimer);
    clickTimer = null;
  }
});

table.addEventListener('dblclick', function(event) {
  clearTimeout(clickTimer);
  clickTimer = null;
  changeColumnColor(event); // Викликати метод, який має спрацювати при подвійному кліку
});

colorApplyButton.addEventListener('click', applyCustomColor)

// Функція для отримання випадкового кольору
function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// Функція, яка показує палітру кольорів при кліку
function showColorPicker(event) {
  const cell = event.target
  colorPicker.style.display = 'flex'
  colorInput.focus()
  colorPicker.targetCell = cell // Зберігаю елемент, на якому було викликано палітру
}

// Функція для застосування користувацького кольору
function applyCustomColor() {
  const cell = colorPicker.targetCell
  const customColor = colorInput.value
  cell.style.backgroundColor = customColor
  colorPicker.style.display = 'none' // Ховаю палітру після використання
}

// Функція для зміни кольору клітинок в обраному стовпці таблиці
function changeColumnColor(event) {
  const cell = event.target
  const columnIndex = cell.cellIndex
  const rowIndex = cell.parentNode.rowIndex

  const color = getRandomColor()
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i]
    const targetCell = row.cells[columnIndex]

    // Змінюю кольор клітинки, якщо вона відповідає обраному стовпцю та рядку
    if (i === rowIndex) {
      targetCell.style.backgroundColor = color
    } else if ((i - rowIndex) % 2 === 0 && i - rowIndex >= 0) {
      // Змінюю кольор клітинок через одну, починаючи з обраної
      targetCell.style.backgroundColor = color
    }
  }
}
