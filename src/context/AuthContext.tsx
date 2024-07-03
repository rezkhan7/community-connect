import { createContext, ReactElement, useEffect, useState } from "react";
import { Hub } from "aws-amplify/utils";
import { getCurrentUser, AuthUser } from "aws-amplify/auth";

const UserContext = createContext();

interface Props {
    children: ReactElement
}

export default function AuthContext({}: Props): ReactElement {
  const [user, setUser] = useState<AuthUser | null>(null)
  
  useEffect(()=>{
    checkUser();
  }, [])

  useEffect(()=>{
    Hub.listen('auth', ()=>{
        checkUser();
    })
  }, [])

  async function checkUser() {
    try{
        const amplifyUser = await getCurrentUser()
        if(amplifyUser){
            setUser(amplifyUser)
        }

    }
    catch(error){
        setUser(null)
    }
  }

  return (
    <UserContext.Provider
     value = {{user, setUser}}
    >
        {children}
    </UserContext.Provider>
  )
}