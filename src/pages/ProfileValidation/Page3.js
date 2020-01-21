import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {api_base, uploadBirthCertificate, uploadNationalCardBack, uploadNationalCardFront} from "../../Api";


export default function Page3() {

    const onChangeHandlerCardFront=event=>{

        const data = new FormData()
        data.append('image', event.target.files[0])
        axios.post(api_base + uploadNationalCardFront, data)
            .then(res => {
                console.log(res.data);
                /*
                const msg = res.data.data.message;

                alert(msg)*/

            })

    }

    const onChangeHandlerCardBack=event=>{

        const data = new FormData()
        data.append('image', event.target.files[0])
        axios.post(api_base + uploadNationalCardBack, data)
            .then(res => {
                console.log(res.data);
                /*
                const msg = res.data.data.message;

                alert(msg)*/

            })

    }

    const onChangeHandlerCertificate=event=>{

        const data = new FormData()
        data.append('image', event.target.files[0])
        axios.post(api_base + uploadBirthCertificate, data)
            .then(res => {
                console.log(res.data);
                /*
                const msg = res.data.data.message;

                alert(msg)*/

            })

    }



 /*  const onChangeHandler=event=>{

        console.log(event.target.files[0])

    }*/


    return (

        <div>

            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>

                    <Box  p={2} width={700}>

                        <label p={2}>تصویر جلوی کارت ملی</label>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                name="file"
                                onChange={onChangeHandlerCardFront}
                                style={{ display: "none" }}
                            />
                        </Button>
                        <br/><br/>
                        <label p={2}>تصویر پشت کارت ملی</label>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                name="file"
                                onChange={onChangeHandlerCardBack}
                                style={{ display: "none" }}
                            />
                        </Button>

                        <br/><br/>
                        <label p={2}>تصویر شناسنامه</label>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />

                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                name="file"
                                onChange={onChangeHandlerCertificate}
                                style={{ display: "none" }}
                            />
                        </Button>

                    </Box>

                </Paper>
            </Grid>

        </div>

    )

}
















