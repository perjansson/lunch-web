export interface Location {
  id: string
  path: string
  label: string
}

export let locations: Location[] = [
  { id: 'turku', path: 'turku', label: 'Turku' },
  { id: 'tampere', path: 'tampere', label: 'Tampere' },
  { id: 'helsinki', path: 'helsinki', label: 'Helsinki' },
  { id: 'newyork', path: 'newyork', label: 'New York' },
  { id: 'amsterdam', path: 'amsterdam', label: 'Amsterdam' },
  { id: 'tokyo', path: 'tokyo', label: 'Tokyo' },
  { id: 'stockholm', path: 'stockholm', label: 'Stockholm' },
  { id: 'lisbon', path: 'lisbon', label: 'Lisbon' },
  { id: 'seinajoki', path: 'seinajoki', label: 'Seinäjoki' },
]

export const backendUrl =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://lunch-api.fly.dev'
