import { useEffect,useState } from "react"
import { Button } from "@/components/ui/button"
import { getData,urls } from "@/lib/utils"
import 'dotenv/config'

export default function Project({id}:number) {
   
    return (
      <div>
        <Button>Click me</Button>
      </div>
    )
}