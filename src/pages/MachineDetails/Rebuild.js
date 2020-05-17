import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import {api_base, imagesList} from "../../Api";
import {user_title_postfix} from "../../consts";

export default function Rebuild(props) {
    const [imageItems, setImageItems] = React.useState([]);
    const [imageId, setImageId] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + imagesList)
            .then(res => {
                const list = res.data.pagination.data;
                setImageItems(list);
                if(list.length>0)
                    setImageId(list[0].id);
            });
    }, []);

    function requestRebuild() {
        axios.post(api_base + 'machines/' + props.id.toString() + '/rebuild'  , {image_id : imageId})
            .then(res => {
                props.setResponse(res.data);
                window.location.href = '/servers/' + props.machine.project_id ;
            })
    }

    return (
        <div>
            <title>نصب مجدد{user_title_postfix}</title>

            <Grid item xs={12}>
                <Paper>
                    <Box p={1}>
                        <h2>نصب مجدد سیستم عامل</h2>
                        <p>
                            در این بخش می توانید سیستم عامل سرور خود را مجددا نصب نمایید.
                        </p>
                        <p>
                            توجه: تمامی اطلاعات قبلی سرور حذف می گردد!

                        </p>
                        <Select value={imageId} onChange={(event)=> setImageId(event.target.value)}>
                            {imageItems.map(row=>(
                                <MenuItem value={row.id} >{row.name} {row.version}</MenuItem>
                            ))}
                        </Select>
                        <br/>
                        <br/>
                        <Button onClick={requestRebuild} variant="contained" color="primary">نصب مجدد</Button>
                    </Box>
                </Paper>

            </Grid>

        </div>
    )
}