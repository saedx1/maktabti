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

function readFileDataAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
}

function UploadFile({ idToken, file }) {
  // const data = readFileDataAsBase64(file);

  const options = {
    headers: {
      Authorization: idToken,
      "Content-Type": "application/pdf",
    },
  };
  axios
    .post(
      `https://m2ubr5mz28.execute-api.us-east-1.amazonaws.com/v1/uploadfile`,
      file,
      options
    )
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
          <form onSubmit={submitFile}>
            <DrawerHeader borderBottomWidth="1px">
              رفع ملف جديد
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <MyDropzone setFiles={setFiles} />
                </Box>
                <Box>
                  <Input
                    id="filname"
                    placeholder="أدخل اسماً للملف"
                  />
                </Box>

                <Box>
                  <Select
                    id="university"
                    placeholder="الجامعة"
                  ></Select>
                </Box>

                <Box>
                  <Select
                    id="college"
                    placeholder="الكلية"
                  ></Select>
                </Box>

                <Box>
                  <Select
                    id="major"
                    placeholder="التخصص"
                  ></Select>
                </Box>

                <Box>
                  <Select
                    id="Course"
                    placeholder="المساق"
                  ></Select>
                </Box>
                <Box>
                  <Select
                    id="Course"
                    placeholder="النوع"
                  ></Select>
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
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop });

  return (
    <Box {...getRootProps()} borderColor="black" borderWidth={3}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>قم باختيار ملف لرفعه</p>
      ) : (
        <p>اضغط هنا لاختيار ملف أو قم بحمله وإلقائه هنا لرفعه</p>
      )}
    </Box>
  );
}
