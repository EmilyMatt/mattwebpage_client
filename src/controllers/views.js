const updateButtons = (pages, name) => {

  pages.forEach(element => {
        document.getElementById(`${element}Button`).classList.remove('active')
  })
  if (name != null)
      document.getElementById(`${name}Button`).classList.add("active")
}

const reformX  = (screen) => {

    if (screen < 480)
        return "+ 10vw"
    if (screen < 1100)
        return ""
    return "- 17vw"
}

module.exports = {
    updateButtons,
  reformX,
}
