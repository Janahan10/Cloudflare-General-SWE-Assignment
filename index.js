
const host = "https://tutorial.cloudflareworkers.com"
const URL = "https://static-links-page.signalnerve.workers.dev"

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Response} response
 */
async function handleRequest(request) {
  console.log("REQUEST URL ======>", request.url)
  if (request.url == host + "/links") {
    return new Response(linksRequest(), {
      headers: { 'content-type': 'application/json' },
    })
  } 

  const response = await fetch(URL)
  return new HTMLRewriter()
    .on('#links', new LinksTransformer(linksList))
    .on('#profile', new DisplayTransformer('style'))
    .transform(response)
}

class DisplayTransformer {
  constructor(attributeName) {
    this.attributeName = attributeName
  }

  async element(element) {
    const attribute = element.getAttribute(this.attributeName)
    if (attribute) {
      element.setAttribute (
        this.attributeName, 
        attribute.replace('none', 'block')
      )
    }
  }
}

class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  async element(element) {
    
    if (element) {
      for (let link of this.links) {
        console.log("LINKSSS ======>", link["name"])
        element.append(`<a href="${link["url"]}">${link['name']}</a>`, {html: true})
      }
    }
  }
}
function linksRequest() {
var links = []
  
  for (i = 0; i < linksList.length; i++) {
    const item = JSON.stringify(linksList[i])
    links.push(item)
  }
  return links
}

var linksList = [
  {
    "name": "Twitch",
    "url": "https://www.twitch.tv/"
  },
  {
    "name": "Youtube",
    "url": "https://www.youtube.com/"
  },
  {
    "name": "Maps",
    "url": "https://www.google.com/maps"
  }
]