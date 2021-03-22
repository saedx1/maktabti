import React from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useToast,
  Tooltip,
} from "@chakra-ui/react";

import { LoadingComponent } from "../../App";
import { CopyIcon, DownloadIcon } from "@chakra-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function FileDetails() {
  let { file_id } = useParams();
  const { data } = useSWR("/get_details/" + file_id);
  console.log(data);
  return (
    <Box>
      {!data ? (
        <LoadingComponent text="جاري تحميل البيانات، الرجاء اﻹنتظار ..." />
      ) : (
        <SocialProfileSimple {...data.files[0]} />
      )}
    </Box>
  );
}

function SocialProfileSimple({
  name,
  courseByCourse,
  majorByMajor,
  collegeByCollege,
  universityByUniversity,
  download,
  username,
  created_at,
  year,
  link,
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Heading fontSize={"xl"} mb={2}>
          {name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4} fontSize={"xl"}>
          {courseByCourse.name} - {year}
        </Text>
        <Text textAlign={"center"} px={3} fontSize={"xl"}>
          {majorByMajor.name}
        </Text>

        <Stack align={"center"} justify={"center"} direction={"column"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
            fontSize={"xl"}
          >
            {"الناشر: " + username}
          </Badge>

          <Badge
            px={2}
            py={1}
            bg="primary.100"
            fontWeight={"400"}
            fontSize={"xl"}
          >
            {new Date(Number(created_at * 1000)).toISOString().split("T")[0]}
          </Badge>

          <Badge
            px={2}
            py={1}
            bg="primary.100"
            fontWeight={"400"}
            fontSize={"xl"}
          >
            {collegeByCollege.name} - {universityByUniversity.name}
          </Badge>
        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}>
          <CopyToClipboard
            text={window.location}
            onCopy={() => {
              toast({
                title: "تم نسخ الرابط بنجاح",
                status: "success",
                duration: 5000,
                isClosable: true,
                fontSize: 100,
              });
            }}
          >
            <Button
              flex={1}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
              _hover={{
                bg: "gray.200",
              }}
              fontSize={"xl"}
              rightIcon={<CopyIcon />}
            >
              مشاركة
            </Button>
          </CopyToClipboard>

          <Button
            flex={1}
            rounded={"full"}
            bg={"primary.400"}
            color={"white"}
            _hover={{
              bg: "primary.500",
            }}
            _focus={{
              bg: "primary.500",
            }}
            fontSize={"xl"}
            rightIcon={<DownloadIcon />}
            onClick={() => {
              window.location = link;
            }}
          >
            تنزيل
          </Button>
        </Stack>
      </Box>
      {/* <ShareModal isOpen={isOpen} onClose={onClose} /> */}
    </Center>
  );
}

function ShareModal({ isOpen, onClose }) {
  const toast = useToast();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} dir="rtl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>مشاركة الملف</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>رابط الملف</FormLabel>
              <Input disabled={true} value={window.location} />
            </FormControl>
          </ModalBody>

          <ModalFooter textAlign="center">
            <CopyToClipboard
              text={window.location}
              onCopy={() => {
                toast({
                  title: "تم نسخ الرابط بنجاح",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              }}
            >
              <Button
                flex={1}
                rounded={"full"}
                bg={"primary.400"}
                color={"white"}
                _hover={{
                  bg: "primary.500",
                }}
                _focus={{
                  bg: "primary.500",
                }}
                fontSize={"xl"}
              >
                تنزيل
              </Button>
            </CopyToClipboard>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
