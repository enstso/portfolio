import {Button} from "@/components/ui/button"
import {notFound} from "next/navigation"

type ArticlePageProps = {
    params: Promise<{ id: string }>
}

export default async function Article({params}: ArticlePageProps) {
    const {id} = await params
    if (!id) notFound()
    return (
        <div>
            <h1>Article</h1>
            <Button>Click me {id}</Button>
        </div>
    )
}
