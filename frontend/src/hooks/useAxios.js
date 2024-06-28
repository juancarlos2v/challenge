import { useState } from "react";
import axios from "axios";

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = (options) => {
    const { url, method = "GET", data = null } = options;

    setLoading(true);
    return axios({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: data ?? null,
    })
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.response);
        setLoading(false);
      });
  };

  return { response, error, loading, fetchData };
};

export default useAxios;
