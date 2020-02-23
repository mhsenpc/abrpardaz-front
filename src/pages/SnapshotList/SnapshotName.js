import React from "react";
import axios from "axios";
import {api_base} from "../../Api";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";

export default function SnapshotName(props) {
    const [editMode, setEditMode] = React.useState(false);
    const [snapshotName, setSnapshotName] = React.useState('');

    React.useEffect(() => {
        setSnapshotName(props.row.name)
    }, []);

    function requestRenameSnapshot(id) {
        axios.post(api_base + "snapshots/" + id.toString() + "/rename", {name: snapshotName})
            .then(res => {
                props.setResponse(res.data)
                setEditMode(false);
            })
    }

    if (editMode) {
        return (
            <div>
                <TextField
                    id="outlined-full-width"
                    name="name"
                    label="نام جدید"
                    placeholder=""
                    variant="outlined"
                    value={snapshotName}
                    onChange={event => setSnapshotName(event.target.value)}
                />
                <Button variant="contained" color="primary" onClick={() => requestRenameSnapshot(props.row.id)}>
                    تغییر نام
                </Button>
                <CancelIcon onClick={() => setEditMode(false)}/>
            </div>
        )
    } else {
        return (
            <span onClick={() => setEditMode(true)}>
                    {snapshotName}
                </span>
        )
    }
}