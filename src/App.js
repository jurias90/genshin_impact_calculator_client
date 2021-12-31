import React, { useState } from "react";
import styled from "@emotion/styled";
import image from "./assets/backgroundScaled.jpg";
import { CharacterProvider } from "./context/characterContaxt";
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

  const updateCharacters = (c) => {
    setCharacters(c);
  };

  return (
    <CharacterProvider value={characters}>
      <Background>
        <Welcome />
        <Characters updateCharacters={updateCharacters} />
        <Selection />
      </Background>
    </CharacterProvider>
  );
}

export default App;
