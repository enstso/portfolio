import { z } from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postData, urls } from "@/lib/utils";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),

  verif: z.string().min(4, { message: "the verification is not good." }),
});


type LoginFormValues = z.infer<typeof loginFormSchema>;

const defaultValues: Partial<LoginFormValues> = {
    username:"",
    password:"",
    verif:""
}

export function LoginForm(){
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues,
    });

 

function onSubmit(data: LoginFormValues | any){
        if(data){
            postData(urls.login,data).then(()=>{
                form.reset({});
            });   
        }
    }

    return (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Enter your username" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="password" render={({field})=>(
                <FormItem>
                    <FormControl>
                        <Input {...field} placeholder="Enter your password"/>
                    </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="verif" render={({field})=>(
                <FormItem>
                    <FormControl>
                        <Input {...field} placeholder="Enter your verif"/>
                    </FormControl>
                </FormItem>
              )} />
              <Button type="submit">submit</Button>
            </form>
          </Form>
        </>
      );      
}