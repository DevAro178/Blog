import { useEffect, useState } from "react";

const useFetch = (EndPointUrl) => {
  const [data, setData] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortConst = new AbortController();

    setTimeout(() => {
      fetch(EndPointUrl, { signal: abortConst.signal })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw Error("Could not fetch data");
          }
        })
        .then((data) => {
          setData(data);
          setisPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setisPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    return () => {
      abortConst.abort();
    };
  }, [EndPointUrl]);

  return { data, isPending, error };
};

export default useFetch;
