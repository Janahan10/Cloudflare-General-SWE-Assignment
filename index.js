
const host = "https://tutorial.cloudflareworkers.com"

addEventListener('fetch', event => {
  event.respondWith(fetch("https://static-links-page.signalnerve.workers.dev"))
})

/**
 * Respond with hello worker text
 * @param {Response} response
 */
async function handleRequest(request) {

  if (request.url == host + "/links") {
    
    var json = linksRequest()

    response = new Response(json, {
      headers: { 'content-type': 'application/json' },
    })
  } else {

    response = new Response("hello-workers", {
      headers: { 'content-type': 'application/json' },
    })

  }
  
  return response
}

function linksRequest() {
  var linksList = [link1, link2, link3]
  var links = []
  
  for (i = 0; i < linksList.length; i++) {
    const item = JSON.stringify(linksList[i])
    links.push(item)
  }
  return links
}

var link1 = {
  "name": "Link 1",
  "url": "https://linkurl1"
}

var link2 = {
  "name": "Link 2",
  "url": "https://linkurl2"
}

var link3 = {
  "name": "Link 3",
  "url": "https://linkurl3"
}