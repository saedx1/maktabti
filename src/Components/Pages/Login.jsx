import React, { useState, useContext } from "react";
import { useHistory } from "react-router";

import { AccountContext } from "../User/Account";

// const Login = () => {

//   return (
//     <Center bg="primary.100">
//       <Box>
//         <form onSubmit={onSubmit}>
//           <Input
//             bg="white"
//             placeholder="البريد الإلكتروني"
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//             m={2}
//           ></Input>
//           <Input
//             bg="white"
//             placeholder="كلمة المرور"
// value={password}
// onChange={(event) => setPassword(event.target.value)}
//             mb={2}
//             mr={2}
//             ml={2}
//           ></Input>
//           <Center>
//             <Stack>
//               <Button bg="primary.300" type="submit">
//                 تسجيل الدخول
//               </Button>
//               <Link to="/signup">
//                 <Center
//                   _hover={{
//                     color: "primary.600",
//                   }}
//                 >
//                   مستخدم جديد؟
//                 </Center>
//               </Link>
//             </Stack>
//           </Center>
//         </form>
//       </Box>
//     </Center>
//   );
// };
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";

export default function SimpleCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate } = useContext(AccountContext);
  const history = useHistory();

  const loginToHome = () => history.push("/");

  const onSubmit = (event) => {
    event.preventDefault();
    authenticate(email, password)
      .then((data) => {
        loginToHome();
      })
      .catch((err) => {
        console.error("Failed to login", err);
      });
  };

  return (
    <Flex align={"center"} justify={"center"} bg={"primary.100"}>
      <Stack width="100%" spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>البريد الإلكتروني (@edu أو @edu.ps)</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>كلمة المرور</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link color={"primary.400"}>نسيت كلمة المرور؟</Link>
                  <Link
                    onClick={() => history.push("/signup")}
                    color={"primary.400"}
                  >
                    <Center
                      _hover={{
                        color: "primary.600",
                      }}
                    >
                      مستخدم جديد؟
                    </Center>
                  </Link>
                </Stack>
                <Button
                  bg={"primary.400"}
                  color={"white"}
                  _hover={{
                    bg: "primary.500",
                  }}
                  type="submit"
                >
                  دخول
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
// export default Login;
