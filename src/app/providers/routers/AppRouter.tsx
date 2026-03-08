import { Routes, Route } from 'react-router-dom';
import Main from '@/pages/main/ui/Main'; 
import Search from '@/pages/search/ui/Search'; 

const AppRouter = () =>{
    return(
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/search' element={<Search/>}/>
        </Routes>
    );
};

export default AppRouter;