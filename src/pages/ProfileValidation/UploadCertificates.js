import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {api_base, uploadBirthCertificate, uploadNationalCardBack, uploadNationalCardFront} from "../../Api";


export default function UploadCertificates(props) {
    const onChangeHandlerCardFront = event => {
        const data = new FormData()
        data.append('image', event.target.files[0])
        axios.post(api_base + uploadNationalCardFront, data)
            .then(res => {
                props.setResponse(res.data)
            })
    };

    const onChangeHandlerCardBack = event => {
        const data = new FormData()
        data.append('image', event.target.files[0])
        axios.post(api_base + uploadNationalCardBack, data)
            .then(res => {
                props.setResponse(res.data)

            })

    }

    const onChangeHandlerCertificate = event => {

        const data = new FormData()
        data.append('image', event.target.files[0])
        axios.post(api_base + uploadBirthCertificate, data)
            .then(res => {
                props.setResponse(res.data)

            })

    }


    function UploadNationalCardFrontForm() {
        return (
            <div>
                <span>تصویر جلوی کارت ملی</span>
                <Button
                    variant="contained"
                    component="label"
                >
                    بارگذاری فایل
                    <input
                        type="file"
                        name="file"
                        onChange={onChangeHandlerCardFront}
                        style={{display: "none"}}
                    />
                </Button>
            </div>
        )
    }

    function UploadNationalCardBackForm() {
        return (
            <div>
                <span>تصویر پشت کارت ملی</span>
                <Button
                    variant="contained"
                    component="label"
                >
                    بارگذاری فایل
                    <input
                        type="file"
                        name="file"
                        onChange={onChangeHandlerCardBack}
                        style={{display: "none"}}
                    />
                </Button>
            </div>
        )
    }

    function UploadBirthCertificateForm() {
        return (
            <div>
                <span>تصویر شناسنامه</span>

                <Button
                    variant="contained"
                    component="label"
                >
                    بارگذاری فایل
                    <input
                        type="file"
                        name="file"
                        onChange={onChangeHandlerCertificate}
                        style={{display: "none"}}
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

                    <Box p={2} width={700}>
                        {props.userInfo.profile.national_card_front == null &&
                        <UploadNationalCardFrontForm/>
                        }

                        {props.userInfo.profile.national_card_front_verified_at &&
                        <span>تصویر جلوی کارت ملی: تایید شده</span>
                        }

                        {(props.userInfo.profile.national_card_front && props.userInfo.profile.national_card_front_verified_at == null) &&
                        <span>تصویر جلوی کارت ملی: در انتظار تایید</span>
                        }

                        <br/>
                        {props.userInfo.profile.national_card_back == null &&
                        <UploadNationalCardBackForm/>
                        }

                        {props.userInfo.profile.national_card_back_verified_at &&
                        <span>تصویر پشت کارت ملی: تایید شده</span>
                        }

                        {(props.userInfo.profile.national_card_back && props.userInfo.profile.national_card_back_verified_at == null) &&
                        <span>تصویر پشت کارت ملی: در انتظار تایید</span>
                        }


                        <br/>

                        {props.userInfo.profile.birth_certificate == null &&
                        <UploadBirthCertificateForm/>
                        }

                        {props.userInfo.profile.birth_certificate_verified_at &&
                        <span>تصویر شناسنامه: تایید شده</span>
                        }

                        {(props.userInfo.profile.birth_certificate && props.userInfo.profile.birth_certificate_verified_at == null) &&
                        <span>تصویر شناسنامه: در انتظار تایید</span>
                        }

                    </Box>

                </Paper>
            </Grid>

        </div>

    )

}
















