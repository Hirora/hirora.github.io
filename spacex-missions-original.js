;(async function () {
  const widgetContentElement = document.querySelector('#spacex-launches')
  const refreshButtonElement = widgetContentElement.parentNode.querySelector('.widget-refresh-button')
  const listElement = widgetContentElement.querySelector('.list')

  const missionsCache = localStorage.getItem('missions')
  if (missionsCache) {
    loadCached()
  } else {
    await loadFromAPI()
  }

  refreshButtonElement.addEventListener('click', async () => loadFromAPI())

  function loadCached() {
    widgetContentElement.classList.add('widget-content-loading')
    injectIntoDOM(JSON.parse(missionsCache))
  }

  async function loadFromAPI() {
    listElement.innerHTML = ''
    widgetContentElement.classList.add('widget-content-loading')
    injectIntoDOM(await fetchMissions())
  }

  function injectIntoDOM(launches) {
    if (launches) {
      parseToHTML(launches).forEach((launch) => listElement.appendChild(launch))
      widgetContentElement.classList.remove('widget-content-loading')
    }
  }

  function parseToHTML(launches) {
    return launches.map((launch) => {
      const element = document.createElement('li')
      element.classList.add('list-item')
      element.innerHTML = `
        <p class="list-item-title">${launch.missionName.split(' ')[0]}</p>
        <p class="list-item-description">${launch.rocketName}</p>
        <time class="list-item-time" datetime="${launch.date}">${launch.date}</time>
      `
      return element
    })
  }

  async function fetchMissions() {
    const apiUrl = 'https://api.spacexdata.com/v3/launches/upcoming?sort=launch_date_local'
    try {
      const response = await fetch(apiUrl, { method: 'get' }).then((response) => response.json())
      const results = response.map((entry) => ({
        missionName: entry.mission_name,
        rocketName: entry.rocket.rocket_name,
        date: formatDate(entry.launch_date_local),
        patchSrc: entry.links.mission_patch_small,
      }))

      cacheMissions(results)
      return results
    } catch (error) {
      return null
    }
  }

  function formatDate(date) {
    return date ? date.slice(5, 10).split('-').reverse().join('-') + '-' + date.slice(0, 4) : 'N/A'
  }

  function cacheMissions(payload) {
    localStorage.setItem('missions', JSON.stringify(payload))
  }
})()
