import CharacterList from "./character/CharacterList";

type Karakter = {
  id: number;
  name: string;
};

export default async function Home() {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();

  const karakters: Karakter[] = data.results;

  return <CharacterList karakters={karakters} />;
}