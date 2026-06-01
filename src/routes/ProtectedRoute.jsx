
import { UseFirebaseContext } from '../Context/Firebaseprovider'
import { Navigate, Outlet } from 'react-router-dom'


export default function ProtectedRoute() {

    const { user, loading } = UseFirebaseContext()
   //  console.log(user)
   if(loading){
      return <h1 className='text-2xl font-bold text-center mt-52'>Loading...</h1>
   }

   return(
    user?<Outlet/>:<Navigate to="/userlogin"/>
   )
}
