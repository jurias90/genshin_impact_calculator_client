import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { sizing } from "../styles/sizing";
import { fontSizing } from "../styles/fontSizing";

const Container = styled.div({
  height: "50vh",
  margin: "0 auto",
  maxWidth: "1080px",
});

const CardContainer = styled.div({
  margin: "0",
  display: "flex",
  flexFlow: "column wrap",
  height: "40%",
  overflowX: "scroll",
  msOverflowStyle: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

const Card = styled.div({
  border: "1px solid black",
  width: sizing["32"],
  height: sizing["44"],
  margin: `${sizing["3"]} ${sizing["3"]}`,
  backgroundColor: "#EBF3FF",
  boxShadow: "10px 5px 5px rgba(0,0,0,.5)",
  ":active": {
    boxShadow: "inset 0px 0px 5px rgba(0,0,0,.5)",
  },
});

const Name = styled.div({
  ...fontSizing.xl,
  textAlign: "center",
  fontFamily: "signikaL",
});

const TextContainer = styled.div({
  margin: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Description = styled.p({
  ...fontSizing.t4xl,
  textAlign: "center",
  fontFamily: "signikaSB",
  textShadow: "-2px 0 #001229, 0 2px #001229, 2px 0 #001229, 0 -2px #001229",
  color: "#EBF3FF",
});

const SortOptions = styled.div({
  display: "flex",
});
const Option = styled.p({
  marginRight: "5px",
  ":not(:first-of-type)": {
    margin: "0 5px",
  },
  fontFamily: "signikaSB",
  textShadow: "-2px 0 #001229, 0 2px #001229, 2px 0 #001229, 0 -2px #001229",
  color: "#EBF3FF",
});

const sortOptions = {
  name: "name",
  element: "element",
  weaponType: "weapon_type",
  location: "location",
  gender: "gender",
  rank: "rank",
};

export const Characters = ({ updateSelectedCharacter }) => {
  const [characters, setCharacters] = useState([]);
  const [sortBy, setSortBy] = useState(sortOptions.name);

  const sort = (d) => {
    let tempArray = [...d];
    tempArray.sort((a, b) =>
      a[sortBy] > b[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0
    );
    return tempArray;
  };

  useEffect(() => {
    fetch("http://localhost:80/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(sort(data.data));
      });
  }, []);

  useEffect(() => {
    setCharacters((c) => sort(c));
  }, [sortBy]);

  return (
    <Container>
      <TextContainer>
        <Description>Select your characters:</Description>
        <SortOptions>
          <Option>Sort By:</Option>
          <Option onClick={() => setSortBy(sortOptions.name)}>Name</Option>
          <Option onClick={() => setSortBy(sortOptions.element)}>
            Element
          </Option>
          <Option onClick={() => setSortBy(sortOptions.weaponType)}>
            WeaponType
          </Option>
          <Option onClick={() => setSortBy(sortOptions.location)}>
            Location
          </Option>
          <Option onClick={() => setSortBy(sortOptions.gender)}>Gender</Option>
          <Option onClick={() => setSortBy(sortOptions.rank)}>Rank</Option>
        </SortOptions>
      </TextContainer>
      <CardContainer>
        {characters.map((character) => (
          <Card
            key={character.id}
            onClick={() => updateSelectedCharacter("add", character)}
          >
            <img src={character.avatarurl} alt={character.name} />
            <Name>{character.name}</Name>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};
