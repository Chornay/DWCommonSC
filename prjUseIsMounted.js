
import { useEffect, useRef } from 'react'

//hook returns true when called and false on return. IE true only iff mounted
export function useIsMounted() {
   const isMountedRef = useRef(true)
   useEffect(() => {
      isMountedRef.current = true
      return () => { isMountedRef.current = false }
   }, [])
   return isMountedRef
}