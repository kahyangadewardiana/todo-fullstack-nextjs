import { revalidatePath } from "next/cache"

let daftarnama = []
async function tambahData(formData) {
    "use server"

    const nama = formData.get("nama")
    daftarnama.push(nama)
    revalidatePath('/test-action')
}

export default function TestAction () {
    return(
        <div>
            <form action={tambahData}>
                <input type="text" name="nama"/>
                <button type="submit">Kirim</button>
            </form>

            <ul>
                {daftarnama.map((nama, index) => (
                    <li key={index}>{nama}</li>
                ))}
            </ul>
        </div>
    )
}