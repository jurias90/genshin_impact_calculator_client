import { useContext, useEffect } from "react";
import { CharacterContext } from "../context/characterContaxt";
import styled from "@emotion/styled";

const Container = styled.div({
  height: "70vh",
});

export const Characters = ({ updateCharacters }) => {
  const characters = useContext(CharacterContext);

  useEffect(() => {
    if (!characters) {
      fetch("http://localhost:4001/characters")
        .then((res) => res.json())
        .then((data) => {
          updateCharacters(data.rows);
        });
    }
  }, [characters, updateCharacters]);

  return (
    <Container>
      <div>
        {characters.map((character) => (
          <div>
            <p>{character.name}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};
