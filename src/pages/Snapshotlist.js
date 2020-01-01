import React from 'react';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function Snapshotlist() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (

        <div>
            <Box width={700}  p={1} my={0.5} borderRadius="borderRadius">
            <Button variant="contained">ایجاد سرور + </Button>
            <p style={{direction:"rtl"}}>تصاویر آنی شما </p>
            </Box>
            <Box width={700} style={{border: "solid 1px gray"}}  p={1} my={0.5} borderRadius="borderRadius">

                <p style={{direction:"rtl"}}>
                    ساخت تصویرآنی

                    <br/>
                    <br/>
                    لطفاقبل از گرفتن تصویر آنی سرور خود را خاموش کنید!
                </p>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                        Age
                    </InputLabel>
                    <Select
                        native
                        value={state.age}
                        onChange={handleChange('age')}
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'age',
                            id: 'outlined-age-native-simple',
                        }}
                    >
                        <option value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </Select>
                </FormControl>
                <p style={{border: "solid 1px red",direction:"rtl"}}>
                    هم اکنون سروری برای حساب کاربری شما وجود ندارد.
                </p>
                <Button variant="contained">                        ساخت تصویرآنی
                </Button>
                <hr/>
                <p style={{color:"red",direction:"rtl" }}  >
                    قوانین نامگذاری تصویر آنی:
                    <ul>
                        <li>
                            نام تصویر آنی باید انگلیسی وارد شود
                        </li>
                        <li>
                            نام تصویر آنی باید انگلیسی وارد شود</li>
                        <li>
                            نام تصویر آنی باید انگلیسی وارد شود</li>
                        <li>
                            نام تصویر آنی باید انگلیسی وارد شود</li>

                    </ul>

                </p>
            </Box>
            <Box width={700} style={{border: "solid 1px gray"}}  p={1} my={0.5} borderRadius="borderRadius">
            <p style={{direction:"rtl"}}>
                تصاویر آنی
                <br/>
                تاکنون تصویر آنی ساخته نشده است.

            <table>
                <tr>
                    <td>لوگو</td>

                    <td>نام تصویر آنی</td>

                    <td>تاریخ ایجاد</td>

                    <td>وضعیت</td>
                </tr>
            </table>
            </p>
            </Box>
        </div>
    );

}
