import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {
    api_base,
    getUserInfo,
    uploadBirthCertificate,
    uploadNationalCardBack,
    uploadNationalCardFront
} from "../../Api";


export default function Page3() {
    const [item, setItem] = React.useState({profile:[]});

    React.useEffect(() => {
        axios.get(api_base + getUserInfo)
            .then(res => {
                const userInfo = res.data.user;
                setItem(userInfo);
            })
    }, []);

    const onChangeHandlerCardFront=event=>{

        const data = new FormData()
        data.append('image', event.target.files[0])
        axios.post(api_base + uploadNationalCardFront, data)
            .then(res => {
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
                /*
                const msg = res.data.data.message;

                alert(msg)*/

            })

    }



 /*  const onChangeHandler=event=>{

        console.log(event.target.files[0])

    }*/

    function uploadNationalCardFrontForm(){
        return(
            <div>
                <TextField id="outlined-basic" label="تصویر جلوی کارت ملی" variant="outlined" />
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
            </div>
        )
    }

    return (

        <div>

            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>

                    <Box  p={2} width={700}>



                        {item.profile.national_card_front == null &&
                        <uploadNationalCardFrontForm />
                        }

                        {item.profile.national_card_front_verified_at &&
                        <div>تایید شده</div>
                        }

                        {(item.profile.national_card_front && item.profile.national_card_front_verified_at == null ) &&
                        <div>در انتظار تایید</div>
                        }

                        <TextField id="outlined-basic" label="تصویر پشت کارت ملی" variant="outlined" />
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

                        <TextField id="outlined-basic" label="تصویر شناسنامه" variant="outlined" />

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
















