// Creating custom hooks that can fetch data or API

import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {

  // ALso we need to use hook useState here to store the data and render it 

  const [data, setData] = useState({})

  // we need a hook that can be used to call api whenever we need 
  // So we will use useEffect that renders only when required

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
    )
    .then((res) => res.json())
    .then((res) => setData(res[currency]))
  }, [currency])

  return data
}

export default useCurrencyInfo;