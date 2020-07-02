;(async function quotesIIFE() {
  const response = await fetch(
    `https://starter-page-2a0de.firebaseio.com/quotes.json?orderBy=%22random%22&limitToFirst=1&startAt=${Math.random()}`,
    { method: 'get' },
  ).then((res) => res.json())
  const quoteElement = document.querySelector('.quote')
  const quoteContentElement = quoteElement.querySelector('.quote-content')

  if (response) {
    const quote = response.find((item) => item)
    if (quote) {
      quoteContentElement.innerHTML = `
      ${quote.content} <cite class="quote-author">${quote.author}</cite>
    `
    }
  } else {
    console.log('here')
    quotesIIFE()
  }
})()
