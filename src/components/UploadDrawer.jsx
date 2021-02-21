import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Drawer,
  DrawerOverlay,
  DrawerBody,
  Box,
  FormLabel,
  Input,
  DrawerHeader,
  DrawerCloseButton,
  DrawerContent,
  Stack,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  DrawerFooter,
  Button,
  Select,
  Textarea,
} from "@chakra-ui/react";

export const UploadDrawer = ({ isOpen, onClose }) => {
  console.log("Type:", typeof onClose);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          {/* <DrawerCloseButton /> */}

          <DrawerHeader borderBottomWidth="1px">رفع ملف جديد</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <MyDropzone />
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
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button bg="primary.400" mr={3}>
              تأكيد
            </Button>
            <Button variant="outline" onClick={onClose}>
              إلغاء
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
