
import React, { Suspense,lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Header from "./components/header/Header"
const AddUser=lazy(()=>import("./features/users/AddUser"));
const UserList=lazy(()=>import("./features/users/UserList"));

function App() {
  return (
     <BrowserRouter>
     <Header />
        <Suspense fallback={<div>lodding...</div>}>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/add" element={<AddUser />} />
              <Route path="/update-user" element={<AddUser />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    
  );
}

export default App;
