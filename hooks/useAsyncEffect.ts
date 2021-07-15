import { useEffect } from 'react'

type UseEffectAsync = (fn: () => Promise<any>, deps: any[]) => void;

// react hook for async useEffect
const useEffectAsync: UseEffectAsync = (fn, deps) => {
  useEffect(() => {
    fn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useEffectAsync;