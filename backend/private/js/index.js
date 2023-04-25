console.log('index.js loaded')

// Inputs
const createUsername = document.getElementById('createUsername')
const createPassword = document.getElementById('createPassword')
const createBirthdate = document.getElementById('createBirthdate')
const readID = document.getElementById('readID')
const updateID = document.getElementById('updateID')
const updateMethod = document.getElementById('updateMethod')
const updateUsername = document.getElementById('updateUsername')
const updatePassword = document.getElementById('updatePassword')
const updateBirthdate = document.getElementById('updateBirthdate')
const updateHighscore = document.getElementById('updateHighscore')
const updateCoins = document.getElementById('updateCoins')
const updateSkinShip = document.getElementById('updateSkinShip')
const updateSkinLaser = document.getElementById('updateSkinLaser')
const deleteID = document.getElementById('deleteID')

// Buttons
const createButton = document.getElementById('createButton')
const readButton = document.getElementById('readButton')
const readButtonID = document.getElementById('readButtonID')
const updateButton = document.getElementById('updateButton')
const deleteButtonID = document.getElementById('deleteButtonID')

// Outputs
const createStatus = document.getElementById('createStatus')
const readStatus = document.getElementById('readStatus')
const updateStatus = document.getElementById('updateStatus')
const deleteStatus = document.getElementById('deleteStatus')
const createOutput = document.getElementById('createOutput')
const readOutput = document.getElementById('readOutput')
const updateOutput = document.getElementById('updateOutput')
const deleteOutput = document.getElementById('deleteOutput')

// ##################################################

// Create
createButton.addEventListener('click', async () => {
  const res = await fetch('http://localhost:5000/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: createUsername.value,
      password: createPassword.value,
      birthdate: createBirthdate.value
    })
  })
  const resPretty = JSON.stringify(await res.json(), null, 2)
  const resPrettyNBSP = resPretty.replace(/ /g, '\u00a0')
  createOutput.innerText = resPrettyNBSP
  createStatus.innerText = res.status
})

// Read
readButton.addEventListener('click', async () => {
  const res = await fetch('http://localhost:5000/account')
  const resPretty = JSON.stringify(await res.json(), null, 2)
  const resPrettyNBSP = resPretty.replace(/ /g, '\u00a0')
  readOutput.innerText = resPrettyNBSP
  readStatus.innerText = res.status
})

readButtonID.addEventListener('click', async () => {
  const res = await fetch(`http://localhost:5000/account/${readID.value}`)
  const resPretty = JSON.stringify(await res.json(), null, 2)
  const resPrettyNBSP = resPretty.replace(/ /g, '\u00a0')
  readOutput.innerText = resPrettyNBSP
  readStatus.innerText = res.status
})

// Update
updateButton.addEventListener('click', async () => {
  const res = await fetch(`http://localhost:5000/account/${updateID.value}/${updateMethod.value}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: updateUsername.value,
      password: updatePassword.value,
      birthdate: updateBirthdate.value,
      highscore: updateHighscore.value,
      coins: updateCoins.value,
      skinShip: updateSkinShip.value,
      skinLaser: updateSkinLaser.value
    })
  })
  console.log(res)
  const resPretty = JSON.stringify(await res.json(), null, 2)
  const resPrettyNBSP = resPretty.replace(/ /g, '\u00a0')
  updateOutput.innerText = resPrettyNBSP
  updateStatus.innerText = res.status
})

// Delete
deleteButtonID.addEventListener('click', async () => {
  const res = await fetch(`http://localhost:5000/account/${deleteID.value}`, {
    method: 'DELETE'
  })
  const resPretty = JSON.stringify(await res.json(), null, 2)
  const resPrettyNBSP = resPretty.replace(/ /g, '\u00a0')
  deleteOutput.innerText = resPrettyNBSP
  deleteStatus.innerText = res.status
})
