import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { api } from "@/lib/axios";

interface Prompts {
    id: string
    title: string
    template: string
}

interface PromptSelectedProps {
    onPromptSelected: (template: string) => void
}

export function PromptSelected(props: PromptSelectedProps) {
    const [prompts, setPrompts] = useState<Prompts[] | null>(null)

    useEffect(() => {
        api.get('/prompts').then(response => {
            setPrompts(response.data)
        })
    }, [])

    function handlePromptSelected(promptId: string) {
        const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

        if (!selectedPrompt) {
            return
        }

        props.onPromptSelected(selectedPrompt.template)
    }

    return (
        <Select onValueChange={handlePromptSelected}>
            <SelectTrigger>
                <SelectValue placeholder="Selecione um prompt..." />
            </SelectTrigger>
            <SelectContent>
                {prompts?.map(prompts => {
                    return (
                        <SelectItem key={prompts.id} value={prompts.id}>
                            {prompts.title}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}