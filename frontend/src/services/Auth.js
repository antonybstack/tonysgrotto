//exports component that has a bunch of authentication functions
export default {
  // logout: () => {
  //   return fetch("/api/users/logout")
  //     .then((res) => res.json())
  //     .then((data) => data);
  // },
  //to persist authentication, when react application may close
  // isAuthenticated: () => {
  //   return fetch("/api/users/authenticated").then((res) => {
  //     if (res.status !== 401) return res.json().then((data) => data);
  //     else return { isAuthenticated: false, user: { username: "", role: "" } };
  //   });
  // },
  //login function that takes in user object which has username and password
  // login: (user) => {
  //   return fetch("/api/users/login", {
  //     method: "post",
  //     body: JSON.stringify(user),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => {
  //     if (res.status !== 401) return res.json().then((data) => data);
  //     else return { isAuthenticated: false, user: { username: "", role: "" } };
  //   });
  // },
  // register: (user) => {
  //   return fetch("/api/users/register", {
  //     method: "post",
  //     body: JSON.stringify(user),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => data);
  // },
  // getUser: (user) => {
  //   return fetch("/api/users/getuser").then((res) => {
  //     if (res.status !== 401) return res.json().then((data) => data);
  //   });
  // },
};
