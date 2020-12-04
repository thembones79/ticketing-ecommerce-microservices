import axios from "axios";

const buildClient = ({ req }) => {
  const isServerEnvironment = typeof window === "undefined";
  if (isServerEnvironment) {
    // we are on the server!
    // requests should be made to http://ingress-nginx.ingress-nginx....
    // http://SERVICENAME.NAMESPACE.svc.cluster.local

    return axios.create({
      baseURL: "http://www.ticketing-app-prod.xyz/",
      headers: req.headers,
    });
  } else {
    // we are on the browser!
    // requests can be made with base url of ""

    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
