import instance from "./instance";

const signin = (userInfo: { [key: string]: any }) => {
  return instance.post("/signin", userInfo);
};

const signup = (userInfo: { [key: string]: any }) => {
  return instance.post("/signup", userInfo);
};

export { signin, signup };
