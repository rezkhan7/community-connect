import { 
    createContext,
    Dispatch, 
    ReactElement,
    SetStateAction, 
    useEffect,
    useContext, 
    useState } from "react";
import { Hub } from "aws-amplify/utils";
import { getCurrentUser, AuthUser, GetCurrentUserOutput} from "aws-amplify/auth";

interface UserContextType{
    user: GetCurrentUserOutput | null;
    setUser: Dispatch<SetStateAction<GetCurrentUserOutput | null>>;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface Props {
    children: React.ReactElement

}

export default function AuthContext({ children }: Props): ReactElement {
  const [user, setUser] = useState<GetCurrentUserOutput | null>(null)

  useEffect(() => {
    checkUser(); // Initial user check

    const listener = Hub.listen('auth', () => {
        console.log("Auth event triggered");
        checkUser(); // Re-check user on auth events
    });

    // Clean up the listener when the component unmounts
    return listener();
}, []);

  const checkUser = async ():Promise<void> => {
    try{
        const amplifyUser = await getCurrentUser()
        console.log("Amplify User: ", amplifyUser)

        if(amplifyUser){

            setUser(amplifyUser)
            console.log("User set to: ", amplifyUser);
        }

    }
    catch(error){
        console.error(error)
        console.log("Not working here")
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
