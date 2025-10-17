export function myopenAIkey(): string {
  const key = import.meta.env.VITE_MYOPENAIKEY as string | undefined
  if (!key || key.trim().length === 0) {
    console.warn('VITE_MYOPENAIKEY is not set. Set it in your .env file.')
    return ''
  }
  return key
}


