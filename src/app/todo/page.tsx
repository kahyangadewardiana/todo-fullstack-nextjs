import { prisma } from "@/lib/prisma";  
import { revalidatePath } from "next/cache";
import TodoCheckbox from "./TodoCheckbox";
import TodoEditText from "./TodoEditText";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Priority } from "@/generated/prisma/enums";
import Link from "next/link";


type TodoPageProps = {
    searchParams: Promise<{filter?: string}>
}

async function tambahTodo(formData : FormData) : Promise<void> {
    "use server"

    const session = await auth.api.getSession({headers: await headers()})

    if (!session) return;

    const text = formData.get("text") as string
    const priority = formData.get("priority") as Priority
    const deadlineInput = formData.get("deadline") as string | null;
    const deadline = deadlineInput ? new Date(deadlineInput) : null
    if (!text || text.trim() === "") return;

    await prisma.todo.create({
        data: {text, priority, deadline, userId: session.user.id}
    })

    revalidatePath("/todo")
}

async function hapusTodo(id: number) : Promise<void> {
    "use server"

    await prisma.todo.delete({
        where: {id}
    })

    revalidatePath("/todo")
}

async function toggleTodo(id: number, doneSaatIni: boolean) : Promise<void> {
    "use server"
    
    await prisma.todo.update({
        where: {id},
        data: {
            done: !doneSaatIni,
        },
    })

    revalidatePath("/todo")

}

async function editTodo(id: number, formData: FormData) : Promise<void> {
    "use server"

    const text = formData.get("text") as string
    if (!text || text.trim() === "") return

    await prisma.todo.update({
        where: {id},
        data: {text}
    })

    revalidatePath("/todo")
}

export default async function TodoPage({searchParams} : TodoPageProps) {
    const params = await searchParams
    const filter = params.filter || "semua"
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session){
        redirect("/login")
    }

    const doneFilter = filter === "belum" ? {done: false}
                    : filter === "selesai" ? {done: true}
                    : {}

    const todos = await prisma.todo.findMany({
        where: {userId: session.user.id, ...doneFilter},
        orderBy: {createdAt: "desc"}
    })
    
    const allTodos = await prisma.todo.findMany({
        where: {userId: session.user.id}
    })
    const totalTodos = allTodos.length;
    const completedTodos = allTodos.filter(todo => todo.done === true).length
    const persentase = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

    return(
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">To-Do List (Database)</h1>

            <form action={tambahTodo} className="flex gap-2 mb-6">
                <input type="text" name="text" placeholder="Tugas Baru..." 
                className="border p-2 rounded flex-1"/>
                <select name="priority" className="border p-2 rounded" defaultValue="SEDANG">
                    <option value="RENDAH">Rendah</option>
                    <option value="SEDANG">Sedang</option>
                    <option value="TINGGI">Tinggi</option>
                </select>
                <input  type="date" name="deadline" className="border p-2 rounded"/>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Tambah</button>
            </form>

            <p className="text-sm text-gray-600 mb-1 font-medium">{completedTodos} dari {totalTodos} selesai ({Math.round (persentase)}%)</p>

            <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{width: `${persentase}%`}}
                />
            </div>

            <div className="flex gap-4 my-4">
                <Link href="/todo">Semua</Link>
                <Link href="/todo?filter=belum" className={`transition-colors ${filter === "belum" ? "font-bold underline" : ""}`}>Belum</Link>
                <Link href="/todo?filter=selesai">Selesai</Link>
            </div>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className="flex items-center justify-between bg-gray-100 p-3 rounded mb-2">
                        <span className={todo.priority === "TINGGI"
                            ? "bg-red-100 text-red-700"
                            : todo.priority === "SEDANG"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }>
                            {todo.priority}
                        </span>
                        {todo.deadline && (
                            <span className="text-sm text-gray-500">
                                {todo.deadline.toLocaleDateString("id-ID")}
                            </span>
                            )}
                        <TodoEditText todoId={todo.id} currentText={todo.text} done={todo.done} editAction={editTodo}/>
                        <TodoCheckbox todoId={todo.id} done={todo.done} toggleAction={toggleTodo}/>
                        <form action={hapusTodo.bind(null, todo.id)}>
                            <button type="submit" className="text-red-600 hover:text-red-700">Hapus</button>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    )
}