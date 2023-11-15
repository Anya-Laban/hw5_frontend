const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let error = formValidate(form)

  if (error > 0) {
    alert('Некоректно заповненні поля що підсвічені')
  } else {
    const dataContent = document.querySelector('.data .data__content')

    let div = document.createElement('div')
    div.className = 'data__element'
    div.insertAdjacentHTML(
      'beforeend',
      `
    <p>ПІБ: ${form.elements.name.value}</p>
    <p>ID-card: ${form.elements.id.value}</p>
    <p>Факультет: ${form.elements.faculty.value}</p>
    <p>Дата народження ${form.elements.birth.value}</p>
    <p>Адреса: ${form.elements.address.value}</p>
    `
    )
    dataContent.append(div)

    const [...formElements] = form.elements
    formElements.forEach((input) => {
      input.value = ''
    })
  }
})

function formValidate(form) {
  let error = 0
  let formReq = form.querySelectorAll('input')

  for (let index = 0; index < formReq.length; index++) {
    const input = formReq[index]
    formRemoveError(input)

    if (input.name === 'name') {
      if (
        !validateTest(
          new RegExp('^[а-яА-ЯA-Za-zіїІЇ]{2,} [А-ЯA-Z]{1}.[А-ЯA-Z]{1}.$'),
          input
        )
      ) {
        formAddError(input)
        error++
      }
    } else if (input.name === 'id') {
      if (!validateTest(new RegExp('^[а-яА-ЯA-Za-z]{2} [0-9]{6}$'), input)) {
        formAddError(input)
        error++
      }
    } else if (input.name === 'faculty') {
      if (!validateTest(new RegExp('^[а-яА-ЯA-Za-z]{4}$'), input)) {
        formAddError(input)
        error++
      }
    } else if (input.name === 'birth') {
      if (!validateTest(new RegExp('^[0-9]{2}.[0-9]{2}.[0-9]{4}$'), input)) {
        formAddError(input)
        error++
      }
    } else if (input.name === 'address') {
      if (!validateTest(new RegExp('^[мс]{1}. [0-9]{6}$'), input)) {
        formAddError(input)
        error++
      }
    }
  }
  return error
}

function formRemoveError(input) {
  input.nextElementSibling.classList.remove('_error')
  input.classList.remove('_error')
}
function formAddError(input) {
  input.nextElementSibling.classList.add('_error')
  input.classList.add('_error')
  console.dir(input)
  console.dir(input.nextElementSibling)
}
function validateTest(reg, input) {
  return reg.test(input.value)
}
