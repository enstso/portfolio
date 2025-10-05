import {Button} from "@/components/ui/button"

import {notFound} from "next/navigation"

type ArticlePageProps = {
    params: { id: string }
}

export default function Article({params}: ArticlePageProps) {
    const {id} = params
    if (!id) notFound()
    return (
        <div>
            <h1>Article</h1>
            <Button>Click me {id}</Button>
        </div>
    )
}
