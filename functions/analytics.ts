// log the pageview with their URL
export const pageview = (url: any) => {
  if(typeof window !== undefined && (window as any).gtag) {
    (window as any)?.gtag('config', 'G-PEWLQXVEKL', {
      page_path: url,
    })
  }
}

// log specific events happening.
export const event = (action: any, params: any) => {
  (window as any)?.gtag('event', action, params)
}

