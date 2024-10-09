export interface Location {
  id: string
  path: string
  label: string
  gid: number // Google spreadsheet tab id
}

export let locations: Location[] = [
  { id: 'turku', path: 'turku', label: 'Turku', gid: 0 },
  { id: 'tampere', path: 'tampere', label: 'Tampere', gid: 2029815104 },
  { id: 'helsinki', path: 'helsinki', label: 'Helsinki', gid: 693080443 },
  { id: 'newyork', path: 'newyork', label: 'New York', gid: 2123432445 },
  { id: 'amsterdam', path: 'amsterdam', label: 'Amsterdam', gid: 1268787223 },
  { id: 'tokyo', path: 'tokyo', label: 'Tokyo', gid: 1004144369 },
  { id: 'stockholm', path: 'stockholm', label: 'Stockholm', gid: 1316456042 },
  { id: 'lisbon', path: 'lisbon', label: 'Lisbon', gid: 828757182 },
  { id: 'seinajoki', path: 'seinajoki', label: 'Seinäjoki', gid: 962120610 },
  { id: 'rovaniemi', path: 'rovaniemi', label: 'Rovaniemi', gid: 2134184409 },
]

export const backendUrl =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://lunch-api.fly.dev'
