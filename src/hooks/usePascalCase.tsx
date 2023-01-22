/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// Language: typescript
// Path: src\hooks\usePascalCase.tsx

import { useEffect, useRef } from 'react'

const usePascalCase = (str: string | undefined) => {
  const ref = useRef(str)

  // managing undefineds and nulls
  if (ref.current !== str) {
    ref.current = str
  }

  useEffect(() => {
    if (ref.current) {
      ref.current = ref.current.replace(/\w+/g, (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
      })
    } else {
      ref.current = ''
    }
  }, [str])
  return ref.current
}
export default usePascalCase
