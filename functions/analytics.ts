// log the pageview with their URL
export const pageview = (url: any) => {
  window.gtag('config', 'G-PEWLQXVEKL', {
    page_path: url,
  })
}

// log specific events happening.
export const event = (action: any, params: any) => {
  window.gtag('event', action, params)
}