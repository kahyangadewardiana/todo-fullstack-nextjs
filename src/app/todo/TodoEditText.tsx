"use client"

import { useState } from "react"

type TodoEditTextProps = {
    todoId: number
    done: boolean
    currentText: string
    editAction: (id: number, formData: FormData ) => Promise<void>
}

export default function TodoEditText({todoId, done, currentText, editAction} : TodoEditTextProps) {
    const [isEditing, setIsEditing] =   useState(false)
    const [text, setText] = useState(currentText)
    
    if (isEditing) {
        return(
            <form action={editAction.bind(null, todoId)} className="flex gap-2 flex-1">
            <input 
                type="text"
                name="text"
                value={text}
                onChange={(e) => setText (e.target.value)}
                className="border p-1 rounded flex-1"
            />

            <button type="submit" className="text-green-600 hover:text-green-800">
                simpan
            </button>
            <button type="button" onClick={() => {
                setText(currentText)
                setIsEditing(false)
            }} className="text-gray-500 hover:text-gray-700">   
            Batal  
            </button>
        </form>
        )
    }

    return(
    <div className="flex items-center gap-2 flex-1">
        <span className={done ? "line-through text-gray-400" : ""}>{currentText}</span>

        <button 
            type="button"
            onClick={() => setIsEditing (true)}
            className="text-blue-600 hover:text-blue-800 text-sm"
            >
                Edit
        </button>
    </div>
)
}