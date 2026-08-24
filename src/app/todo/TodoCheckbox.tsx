"use client"

import { useTransition } from "react"

type TodoCheckboxProps = {
  todoId: number
  done: boolean
  toggleAction: (id: number, done: boolean) => Promise<void>
}

export default function TodoCheckbox({ todoId, done, toggleAction }: TodoCheckboxProps) {
  const [isPending, startTransition] = useTransition()

  const handleChange = () => {
    startTransition(async () => {
      await toggleAction(todoId, done)
    })
  }

  return (
    <input
      type="checkbox"
      checked={done}
      onChange={handleChange}
      disabled={isPending}
      className="w-5 h-5"
    />
  )
}