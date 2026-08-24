type CharacterDetailData = {
    name: string
    image: string
    status: string
    origin : {
        name: string
    }
}

type CharacterDetailProps = {
    params: Promise<{id: string}>
}

export default async function CharacterDetail ({params} : CharacterDetailProps){
    const {id} = await params;

    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const character: CharacterDetailData = await response.json();

    return(
        <div className="text-2xl text-center">
            <h1>{character.name}</h1>
            <img className="w-64 mx-auto mt-4" src={character.image} alt={character.name}/>
            <p className="mt-4 space-x-1">Status : {character.status}</p>
            <p>Origin : {character.origin.name}</p>
        </div>
    )
}