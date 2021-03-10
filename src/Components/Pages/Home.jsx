import React from "react";
import {
  Box,
  Center,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { SearchBox } from "../SearchBox";
import { Card } from "../Card";
import theme from "../../theme";
import useSWR from "swr";

const StatComponent = (props) => {
  return (
    <Box bg="primary.200" textAlign="center" boxShadow={"2xl"} rounded={"md"}>
      <Stat>
        <StatLabel fontSize="xl">{props.label}</StatLabel>
        <StatNumber fontSize="xl">
          {props.number} <StatArrow type="increase" />
        </StatNumber>
        <StatHelpText></StatHelpText>
      </Stat>
    </Box>
  );
};
const SearchForm = () => {
  return (
    <>
      <SearchBox pb={10} />
    </>
  );
};
const MostPopular = () => {
  return (
    <Grid
      pt={10}
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(5, 1fr)",
      ]}
      gap={6}
      bg="primary.100"
      borderColor="black"
    >
      <GridItem colStart={[1, 1, 1, 2]}>
        <Card
          label="الأكثر تحميلاً"
          item="فيزياء ١"
          university="جامعة بوليتكنيك فلسطين"
          value="20,000"
        ></Card>
      </GridItem>
      <GridItem colStart={[1, 1, 1, 3]}>
        <Card
          label="الأكثر زيارةً"
          item="فيزياء ١"
          university="جامعة بوليتكنيك فلسطين"
          value="20,000"
        ></Card>
      </GridItem>
      <GridItem colStart={[1, 1, 1, 4]}>
        <Card
          label="الأكثر بحثاً"
          item="فيزياء ١"
          university="جامعة بوليتكنيك فلسطين"
          value="20,000"
        ></Card>
      </GridItem>
    </Grid>
  );
};
const MainBody = () => {
  const { data } = useSWR("/get_stats");

  return (
    <Box bg="primary.500">
      <Center color="black">
        <Box fontSize="4xl" pt={10} pb={10} textColor="white">
          مبادرة تسعى لتسهيل عملية وصول الطلاب للمواد التعليمية المستخدمة في
          الجامعات الفلسطينية
        </Box>
      </Center>
      <SearchForm />
      <Grid
        templateColumns="repeat(11, 1fr)"
        spacing="40px"
        bg={`linear-gradient(180deg, ${theme.colors.primary["500"]} 50%, ${theme.colors.primary["100"]} 50%)`}
        columnGap={2}
      >
        <GridItem colStart={5}>
          <StatComponent label="المساقات" number={data && data.course_count} />
        </GridItem>
        <GridItem colStart={6}>
          <StatComponent label="المستندات" number={data && data.file_count} />
        </GridItem>
        <GridItem colStart={7}>
          <StatComponent label="الطلاب" number="12" />
        </GridItem>
      </Grid>

      <MostPopular />
    </Box>
  );
};

export default MainBody;
