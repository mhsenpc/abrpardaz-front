import axios from "axios";
import swal from "sweetalert";
import {withStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import {api_base, redirectToGooglePath} from "./Api";

export function SetupAxios() {
    axios.defaults.headers.common['Accept'] = 'application/json';
    const tokenOnLocalStorage = localStorage.getItem("token");
    const tokenOnSessionStorage = sessionStorage.getItem("token");
    if (tokenOnLocalStorage && !tokenOnSessionStorage) {
        //load everything from localstorage
        sessionStorage.setItem('user_id', localStorage.getItem("user_id"));
        sessionStorage.setItem('permissions', localStorage.getItem("permissions"));
        sessionStorage.setItem('token', tokenOnLocalStorage);
    }
    let token = sessionStorage.getItem("token");
    if (token) {
        token = atob(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        axios.defaults.headers.common['Authorization'] = null;
    }

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (401 === error.response.status) {
            swal("توکن منقضی شده است", "شما نیاز به احراز هویت مجدد دارید!", "warning").then((value) => {
                window.location.href = '/Login';
            });
            return Promise.reject(error);
        } else if (403 === error.response.status) {
            if (error.response.data.code === 'certificates') {
                swal('احراز هویت تکمیل نشده است', 'کاربر گرامی' + '\n' + 'به ابرپرداز خوش آمدید' + "\n" + 'برای استفاده از خدمات ابرپرداز نیاز به تکمیل کردن مدارک می باشد', 'warning').then(function () {
                    window.location.href = '/Profile';
                });
            }
            else if (error.response.data.code === 'mobile_validation' || error.response.data.code === 'national_code' || error.response.data.code === 'postal_code' ||  error.response.data.code === 'basic_info' ) {
                swal(error.response.data.message,'', 'warning').then(function () {
                    window.location.href = '/ProfileValidationWizard';
                });
            }
            else if(error.response.data.message){
                swal(error.response.data.message,'','error');
            }
            else{
                swal("خطا", "در پردازش درخواست شما مشکلی وجود دارد", "error");
            }

            return Promise.reject(error);
        } else {
            swal("خطا", "در پردازش درخواست شما مشکلی وجود دارد", "error");
            return Promise.reject(error);
        }
    });
}

export const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

export function fancyTimeFormat(AllSeconds)
{
    // Hours, minutes and seconds
    var hrs = ~~(AllSeconds / 3600);
    var mins = ~~((AllSeconds % 3600) / 60);
    var secs = ~~AllSeconds % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

export function redirectToGoogle() {
    axios.get(api_base + redirectToGooglePath)
        .then(res => {
            window.location.href = res.data.url;
        })
}
