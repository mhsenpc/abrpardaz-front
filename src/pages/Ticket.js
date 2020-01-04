import React from 'react';
import Button from "@material-ui/core/Button";



function Ticket() {
    return (
        <div>
        <Button variant="contained" color="primary" href="#contained-buttons">
           تیکت جدید
        </Button>
            <h1 style={{direction:"rtl"}}> تیکت های شما </h1>
            <p style={{borderStyle:"solid",padding:12}}>
               این تیکت بسته شده،شما میتوانید به سادگی با پاسخ دادن این تیکت را به جریان بیاندازید
            </p>
            <p>
                مشکل من
            </p>

        </div>

    );
}

export default Ticket;