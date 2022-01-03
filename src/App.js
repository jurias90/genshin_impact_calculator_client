import React, { useState } from "react";
import styled from "@emotion/styled";
import image from "./assets/backgroundScaled.jpg";
import { CharacterProvider } from "./context/characterContaxt";
import { SelectedCharacterProvider } from "./context/selectedCharacterContext";
import { Characters } from "./components/Characters";
import { Welcome } from "./components/Welcome";
import { Selection } from "./components/Selection";

const Background = styled.div({
  backgroundImage: `url(${image})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
});

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState([]);

  const updateCharacters = (c) => {
    setCharacters(c);
  };
  const updateSelectedCharacters = (c, action) => {
    if (action === "add") {
      setSelectedCharacter((a) => [...a, c]);
    }
    console.log(selectedCharacter);
  };

  return (
    <CharacterProvider value={characters}>
      <SelectedCharacterProvider value={selectedCharacter}>
        <Background>
          <Welcome />
          <Characters
            updateCharacters={updateCharacters}
            updateSelectedCharacter={updateSelectedCharacters}
          />
          <Selection />
        </Background>
      </SelectedCharacterProvider>
    </CharacterProvider>
  );
}

export default App;
