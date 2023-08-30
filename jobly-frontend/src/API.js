

import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


// API Class. Static class for tying together methods used to get/send to the API.
// No FE-specific code; no API-aware code in FE either.
class JoblyApi {
  // token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Get details on a company by handle name
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    console.log('RESPONSE FROM API.JS IS:', res);
    return res.company;
  }

  // Get list of all companies /w params
  static async getCompanies(name) {
    let res = await this.request(`companies/`, {name});
    return res.companies;
  }

  // Get list of all jobs
  static async getJobs (title) {
    let res = await this.request(`jobs/`, { title });
    return res.jobs;
  }

  // Get user by username
  static async getUser (username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // Register a new user
  static async register (data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  // Login a user
  static async login (data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  // Update user profile
  static async editProfile (username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }


}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;