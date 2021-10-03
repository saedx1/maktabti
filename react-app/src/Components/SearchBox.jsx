import { Input, Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export const SearchBox = (props) => {
  const [query, setQuery] = useState(props.query || "");
  const history = useHistory();
  const submitSearch = () => {
    const data = { query, page: 1 };

    if (history.location.pathname === "/search") {
      history.replace({
        pathname: "/search",
        state: data,
      });
    } else {
      history.push({
        pathname: "/search",
        state: data,
      });
    }
  };

  return (
    <Box textAlign="center" mt={5} mb={3} {...props}>
      <form onSubmit={submitSearch}>
        <Input
          placeholder="بحث (اسم مساق، امتحان، سلايدات، ...)"
          bg="white"
          w={{ base: "85%", lg: "50%" }}
          size="lg"
          me={2}
          rounded={"full"}
          zIndex={3}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            props.setquery && props.setquery(event.target.value);
          }}
        ></Input>
        <Button
          size="lg"
          fontSize="xl"
          textColor="white"
          bg={["primary.700"]}
          _hover={{
            bg: ["primary.400"],
          }}
          me={3}
          ml="-4.4em"
          mb={0.5}
          _focus={{
            outline: "none",
            border: "none",
          }}
          rounded={"full"}
          zIndex={4}
          type="submit"
        >
          بحث
        </Button>
        <Link to="/advancedsearch">
          <Button
            size="lg"
            fontSize="xl"
            color={["primary.500"]}
            bg={["primary.white"]}
            _hover={{
              bg: ["primary.100"],
            }}
            _focus={{
              outline: "none",
              border: "none",
            }}
            rounded={"full"}
            hidden={props.hideadvancedbtn}
            mt={[3, 3, 0, 0]}
          >
            تصفح المحتوى
          </Button>
        </Link>
      </form>
    </Box>
  );
};
