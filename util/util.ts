export const codeToURL = (code: string) => code.replace(' ', '').replace('/', '%2F').toLowerCase()

export const URLToCode = (url: string) => {
  const [uni, code] = url.split('/');
  const courseCode = (code || '').replace('%2F', '/').toUpperCase()
  const index = courseCode.indexOf((courseCode.match(/([A-Z])[0-9]/) as any)[0]) + 1

  const res = {
    university: uni,
    code: `${courseCode.slice(0, index)  } ${courseCode.slice(index)}`,
    id: '0',
  }
  return res;
}