import React, {Component} from 'react'
import {user_title_postfix} from "../consts";
import Grid from "@material-ui/core/Grid";

export default class Notfound extends Component {
    render() {
        return (
            <div>
                <title>صفه مورد نظر یافت نشد{user_title_postfix}</title>

                صفحه مورد نظر شما یافت نشد
            </div>
        )
    }
}