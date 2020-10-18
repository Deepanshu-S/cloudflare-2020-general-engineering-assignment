const staticUrl = "https://static-links-page.signalnerve.workers.dev"
const avatarUrl = "https://avatars0.githubusercontent.com/u/17990162?s=460&u=0b1731fd4c428197d02a397e8d514c6e748fc519";
const bgURL = "https://images.unsplash.com/photo-1587033250551-9b1ab4533273?ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=80";
const links = [
  { "name": "Personal Website", "url": "https://DeepanshuSharma.com/" },
  { "name": "GitHub", "url": "https://DeepanshuSharma.com/" },
  { "name": "LinkedIn", "url": "https://DeepanshuSharma.com/" }
]

const socialLinks = [
  {
    "url":"https://www.linkedin.com/in/deepanshu-sharma/",
    "icon":"https://simpleicons.org/icons/linkedin.svg" },
  {
    "url":"GitHub",
    "icon":"https://simpleicons.org/icons/github.svg" }

]

class LinksTransformer{
  element(element){
    links.forEach(link => {element.append(`<a href=${link.url} target="_blank"> ${link.name}</a>`,
     {html:true});})
  }
}

class SocialTransformer{
  element(element){
    element.removeAttribute('style');
    socialLinks.forEach(link => {element.append(`<a href=${link.url} target="_blank"> <img src="${link.icon}" /> </a>`,
     {html:true});})
  }
}

const modify = new HTMLRewriter()
    .on("div#links", new LinksTransformer())
    .on("title", { element: e => e.setInnerContent("Deepanshu Sharma | Lots of Links") })
    .on("div#profile",{element : e =>e.removeAttribute('style')})
    .on("img#avatar",{element : e =>e.setAttribute('src',avatarUrl)})
    .on("body",{element : e =>e.setAttribute('style', `background: url(${bgURL}) center; background-size: cover;` )})
    .on("h1#name", { element: e => e.setInnerContent("Deepanshu Sharma") })
    .on("div#social",{element : e =>e.removeAttribute('style')})
    .on("div#social", new SocialTransformer())


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = new URL(request.url)
  if (url.pathname === '/links') {
  return new Response(JSON.stringify(links), {
    headers: { 'content-type': 'application/json' },
    })
  
  }
  else { 
    const response = modify.transform(await fetch(staticUrl));
    return new Response( await response.text(), {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    }) }
  }






