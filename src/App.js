import React from 'react';

export default function App(){
    const tokenOnLocalStorage = localStorage.getItem("token");
    const tokenOnSessionStorage = sessionStorage.getItem("token");
    if(!tokenOnSessionStorage && !tokenOnLocalStorage){
        window.location.href = '/login';
    }
    else{
        window.location.href = '/Dashboard';
    }
}