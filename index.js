
const host = "https://tutorial.cloudflareworkers.com"
const url = host + "/links"

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Response} response
 */
async function handleRequest(request) {

  if (request.url == url) {
    var linksList = [link1, link2, link3]
    var json = []
  
    for (i = 0; i < linksList.length; i++) {
      const item = JSON.stringify(linksList[i])
      json.push(item)
    }

    return response = new Response(json, {
      headers: { 'content-type': 'application/json' },
    })
  }
  

  return new Response("hello-workers", {
    headers: { 'content-type': 'application/json' },
  })
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