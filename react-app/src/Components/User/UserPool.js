import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_sUdOL4MZl",
  ClientId: "1e3fi179legtiq394d1ttqkga1",
};

export default new CognitoUserPool(poolData);
