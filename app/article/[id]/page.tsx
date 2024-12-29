import { Button } from "@/components/ui/button"

export default function Article({id}:any) {
  return (
    <div>
      <h1>Article</h1>
      <Button>Click me {id}</Button>
    </div>
  )
}
