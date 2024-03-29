import React, {useRef, useEffect} from "react"

const useInterval = (callback, delay) => {
  const savedCallback = useRef(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {savedCallback.current()}

    if (delay !== null){
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval