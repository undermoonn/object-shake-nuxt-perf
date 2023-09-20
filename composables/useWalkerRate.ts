export function useWalkerRate() {
  const rate = useCookie<number>('walker-rate', { default: () => 1 })
  return { rate }
}
