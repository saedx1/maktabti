import React, { createContext } from "react";
import Pool from "./UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const AccountContext = createContext();

const Account = (props) => {
  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject();
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err);
                } else {
                  const results = {};
                  for (let atts of attributes) {
                    const { Name, Value } = atts;
                    results[Name] = Value;
                  }
                  resolve(results);
                }
              });
            });
            resolve({ user, ...session, ...attributes });
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool,
      });
      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (data) => {
          resolve(data);
        },
      });
    });
  };
  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
};

const logout = () => {
  const user = Pool.getCurrentUser();
  if (user) {
    user.signOut();
  }
};
export { Account, AccountContext };
