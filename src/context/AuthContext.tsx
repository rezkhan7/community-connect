import { 
    createContext,
    Dispatch, 
    ReactElement,
    SetStateAction, 
    useEffect,
    useContext, 
    useState } from "react";
import { Hub } from "aws-amplify/utils";
import { getCurrentUser, AuthUser } from "aws-amplify/auth";

interface UserContextType{
    user: AuthUser | null;
    setUser: Dispatch<SetStateAction<AuthUser | null>>
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface Props {
    children: React.ReactElement

}

export default function AuthContext({ children }: Props): ReactElement {
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
        console.error(error)
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

export const useUser = (): UserContextType => useContext(UserContext)
