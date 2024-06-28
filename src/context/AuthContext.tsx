import { createContext, ReactElement, useEffect, useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Hub } from "aws-amplify/utils";
import { getCurrentUser } from "aws-amplify/auth";

const UserContext = createContext();

interface Props {
    children: ReactElement
}

export default function AuthContext({}: Props): ReactElement {
  const [user, setUser] = useState<CognitoUser | null>(null)

  useEffect(()=>{
    Hub.listen('auth', ()=>{
        checkUser()
    })
  }, [])

  async function checkUser() {
    try{
        const user = await Amplify
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