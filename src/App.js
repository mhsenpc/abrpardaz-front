import React from 'react';

export default function App(){
    const tokenOnLocalStorage = localStorage.getItem("token");
    if(!tokenOnLocalStorage){
        window.location.href = '/Login';
    }
    else{
        window.location.href = '/Dashboard';
    }
}