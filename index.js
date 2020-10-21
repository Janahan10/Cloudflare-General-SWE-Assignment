
const host = "https://linktree-site.janahanravi.workers.dev"
const URL = "https://static-links-page.signalnerve.workers.dev"

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Response} response
 */
async function handleRequest(request) {
  if (request.url == host + "/links") {
    return new Response(linksRequest(), {
      headers: { 'content-type': 'application/json' },
    })
  } 

  const response = await fetch(URL)
  return new HTMLRewriter()
    .on('#links', new LinksTransformer(linksList))
    .on('#profile', new DisplayTransformer('style'))
    .on('#avatar', new ImageTransformer())
    .on('#name', new NameTransformer)
    .transform(response)
}

class NameTransformer {
  async element (element) {
    element.append('Janahan Ravi')
  }
}

class ImageTransformer {
  async element (element) {
    element.setAttribute('src','https://janahan10.github.io/portfolio/assets/img/aboutMe.png')
    element.setAttribute('alt', 'profile image')
  }
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
    "name": "Github",
    "url": "https://github.com/Janahan10"
  },
  {
    "name": "Linkedin",
    "url": "https://www.linkedin.com/in/janahan-ravi/"
  },
  {
    "name": "Portfolio",
    "url": "https://janahan10.github.io/portfolio/"
  }
]