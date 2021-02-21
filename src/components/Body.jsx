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
  Button,
} from "@chakra-ui/react";

import { SearchBox } from "./SearchBox";
import { Card } from "./Card";
const StatComponent = (props) => {
  return (
    <Box bg="primary.200" textAlign="center">
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
const SearchForm = (props) => {
  return (
    <>
      <SearchBox pb={10} />
    </>
  );
};
const MostPopularComponenent = (props) => {
  return (
    <Grid
      pt={10}
      templateColumns="repeat(5, 1fr)"
      gap={6}
      bg="primary.100"
      borderColor="black"
    >
      <GridItem colStart={2}>
        <Card
          label="الأكثر تحميلاً"
          item="فيزياء ١"
          university="جامعة بوليتكنيك فلسطين"
        ></Card>
      </GridItem>
      <GridItem colStart={3}>
        <Card
          label="الأكثر زيارةً"
          item="فيزياء ١"
          university="جامعة بوليتكنيك فلسطين"
        ></Card>
      </GridItem>
      <GridItem colStart={4}>
        <Card
          label="الأكثر بحثاً"
          item="فيزياء ١"
          university="جامعة بوليتكنيك فلسطين"
        ></Card>
      </GridItem>
    </Grid>
  );
};
export const MainBody = ({ isLoggedIn }) => {
  return (
    <Box bg="primary.100">
      <Center color="black">
        <Box fontSize="4xl" pt={10} pb={10}>
          مبادرة تسعى لتسهيل عملية وصول الطلاب للمواد التعليمية المستخدمة في
          الجامعات الفلسطينية
        </Box>
      </Center>
      {isLoggedIn ? <SearchForm /> : null}
      <Grid
        templateColumns="repeat(11, 1fr)"
        spacing="40px"
        bg="primary.100"
        columnGap={2}
      >
        <GridItem colStart={5}>
          <StatComponent label="المساقات" number="25" />
        </GridItem>
        <GridItem colStart={6}>
          <StatComponent label="المستندات" number="528" />
        </GridItem>
        <GridItem colStart={7}>
          <StatComponent label="الطلاب" number="12" />
        </GridItem>
      </Grid>

      {isLoggedIn ? <MostPopularComponenent /> : null}
    </Box>
  );
};
