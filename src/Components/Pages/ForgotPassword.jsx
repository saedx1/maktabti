import {
  Stack,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import Pool from "../User/UserPool";

function ForgotPassword() {
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [match, setMatch] = useState(true);
  const toast = useToast();

  const onSubmit = (event) => {
    event.preventDefault();
    var userData = {
      Username: email,
      Pool: Pool,
    };
    var cognitoUser = new CognitoUser(userData);
    if (stage === 1) {
      cognitoUser.forgotPassword({
        onSuccess: () => {
          toast({
            title: "تم ارسال كود التفعيل",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setStage(2);
        },
        onFailure: (err) => {
          toast({
            title: "تم ارسال كود التفعيل",
            description: err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      });
    } else {
      if (match) {
        cognitoUser.confirmPassword(code, password1, {
          onSuccess: () => {
            toast({
              title: "تم تغيير كلمة المرور بنجاح",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            setStage(3);
          },
          onFailure: () => {
            toast({
              title: "حصل خلل خلال تغيير كلمة المرور",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          },
        });
      }
    }
  };
  return (
    <Flex align={"center"} justify={"center"} bg={"primary.100"}>
      <Stack width="100%" spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>البريد الإلكتروني (@edu أو @edu.ps)</FormLabel>
                <Input type="email" value={email} disabled={stage !== 1} />
              </FormControl>
              <FormControl id="code" display={stage === 1 ? "none" : ""}>
                <FormLabel>رمز التحقق</FormLabel>
                <Input
                  type="number"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  disabled={stage === 3}
                />
              </FormControl>
              <FormControl id="code" display={stage === 1 ? "none" : ""}>
                <FormLabel>كلمة المرور الجديدة</FormLabel>
                <Input
                  type="password"
                  value={password1}
                  onChange={(event) => setPassword1(event.target.value)}
                  disabled={stage === 3}
                />
              </FormControl>
              <FormControl id="code" display={stage === 1 ? "none" : ""}>
                <FormLabel>كلمة المرور الجديدة - مرة أخرى</FormLabel>
                <Input
                  type="password"
                  value={password2}
                  onChange={(event) => {
                    setPassword2(event.target.value);
                    setMatch(event.target.value === password1);
                  }}
                  disabled={stage === 3}
                />
              </FormControl>
              <Button
                bg={"primary.400"}
                color={"white"}
                _hover={{
                  bg: "primary.500",
                }}
                type="submit"
                _focus={{
                  outline: "none",
                  border: "none",
                }}
                disabled={stage === 3}
              >
                {stage === 1 ? "ارسال رمز التحقق" : "تأكيد"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default ForgotPassword;
