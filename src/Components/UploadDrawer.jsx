import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Drawer,
  DrawerOverlay,
  DrawerBody,
  Box,
  Input,
  DrawerHeader,
  DrawerContent,
  Stack,
  DrawerFooter,
  Button,
  Select,
} from "@chakra-ui/react";
import axios from "axios";

function UploadFile({ idToken, file }) {
  const options = {
    headers: {
      Authorization: idToken,
    },
  };
  const data = new FormData();
  data.append("file", file);
  data.append("filename", "temp.pdf");
  axios
    .post(`${process.env.REACT_APP_SERVER_URL}upload_file`, data, options)
    .then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
}
export const UploadDrawer = ({ isOpen, onClose, idToken }) => {
  const [files, setFiles] = useState([]);
  const submitFile = (event) => {
    event.preventDefault();
    UploadFile({ idToken, file: files[0] });
  };
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <form onSubmit={submitFile} encType="multipart/form-data">
            <DrawerHeader borderBottomWidth="1px">رفع ملف جديد</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <MyDropzone setFiles={setFiles} />
                </Box>
                <Box>
                  <Input id="file" type="file"></Input>
                </Box>
                <Box>
                  <Input id="filname" placeholder="أدخل اسماً للملف" />
                </Box>

                <Box>
                  <Select id="university" placeholder="الجامعة"></Select>
                </Box>

                <Box>
                  <Select id="college" placeholder="الكلية"></Select>
                </Box>

                <Box>
                  <Select id="major" placeholder="التخصص"></Select>
                </Box>

                <Box>
                  <Select id="Course" placeholder="المساق"></Select>
                </Box>
                <Box>
                  <Select id="Course" placeholder="النوع"></Select>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
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
                mx={3}
              >
                تأكيد
              </Button>
              <Button variant="outline" onClick={onClose}>
                إلغاء
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

function MyDropzone({ setFiles }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box {...getRootProps()} borderColor="black" borderWidth={3}>
      <input {...getInputProps()} type="file" />
      {isDragActive ? (
        <p>اضغط هنا لاختيار ملف أو قم بحمله وإلقائه هنا لرفعه</p>
      ) : (
        <p>اضغط هنا لاختيار ملف</p>
      )}
    </Box>
  );
}
