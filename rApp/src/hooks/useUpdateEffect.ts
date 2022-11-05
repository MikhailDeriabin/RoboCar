import { DependencyList, EffectCallback, useEffect, useRef } from 'react';


function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    else{
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useUpdateEffect
