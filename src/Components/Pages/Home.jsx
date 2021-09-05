import React, { useContext, useEffect, useState } from "react";
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
import { AccountContext } from "../User/Account";

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
      <SearchBox pb={10} hideadvancedbtn={0} />
    </>
  );
};
const MostPopular = ({ data }) => {
  const [token, setToken] = useState("");
  const { getSession } = useContext(AccountContext);
  useEffect(() => {
    getSession()
      .then(({ user }) => {
        user.getSession((err, session) => {
          if (err) {
            console.log(err);
          } else if (!session.isValid()) {
            console.log("Invalid session.");
          } else {
            const t = session.getIdToken().getJwtToken();
            setToken(t);
          }
        });
      })
      .catch(() => {});
  }, [getSession]);
  return (
    <Grid
      pt={10}
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(5, 1fr)",
      ]}
      gap={7}
      bg="primary.100"
      borderColor="black"
    >
      <GridItem colStart={[1, 1, 1, 2]}>
        <Card
          label="أشهر مساق"
          item={data && data.top_course.name}
          university={data && data.top_course.university}
          value={data && data.top_course.count + " تنزيلاً"}
          isDownload={false}
        ></Card>
      </GridItem>
      <GridItem colStart={[1, 1, 1, 3]}>
        <Card
          label="أشهر ملف"
          item={data && data.top_file.name}
          otheritem={data && data.top_file.course_name}
          university={data && data.top_file.university}
          value={data && data.top_file.count + " تنزيلاً"}
          link={data && data.top_file.link}
          id={data && data.top_file.id}
          token={token}
          isDownload={true}
        ></Card>
      </GridItem>
      <GridItem colStart={[1, 1, 1, 4]}>
        <Card
          label="أشهر تخصص"
          item={data && data.top_major.name}
          university={data && data.top_major.university}
          value={data && data.top_major.count + " تنزيلاً"}
          isDownload={false}
        ></Card>
      </GridItem>
    </Grid>
  );
};
const MainBody = () => {
  const { data } = useSWR("/get_stats");

  return (
    <Box bg="primary.500">
      <Center
        color="black"
        fontSize={{ base: "2xl", lg: "4xl" }}
        p={10}
        textColor="white"
        textAlign="center"
      >
        مبادرة تسعى لتسهيل عملية وصول الطلاب للمواد التعليمية المستخدمة في
        الجامعات الفلسطينية
      </Center>
      <SearchForm />
      <Grid
        templateColumns={["repeat(5, 1fr)", "repeat(11, 1fr)"]}
        bg={`linear-gradient(180deg, ${theme.colors.primary["500"]} 50%, ${theme.colors.primary["100"]} 50%)`}
        columnGap={2}
      >
        <GridItem colStart={[2, 5]}>
          <StatComponent label="المساقات" number={data && data.course_count} />
        </GridItem>
        <GridItem colStart={[3, 6]}>
          <StatComponent label="المستندات" number={data && data.file_count} />
        </GridItem>
        <GridItem colStart={[4, 7]}>
          <StatComponent label="الطلاب" number={data && data.student_count} />
        </GridItem>
      </Grid>

      <MostPopular data={data} />
    </Box>
  );
};

export default MainBody;
