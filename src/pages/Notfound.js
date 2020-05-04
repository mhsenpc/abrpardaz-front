import React, {Component} from 'react'
import {user_title_postfix} from "../consts";

export default class Notfound extends Component {
    render() {
        return (
            <div>
                <title>صفه مورد نظر یافت نشد{user_title_postfix}</title>


                <center>
                    <h1>404</h1>
                </center>
                <br/>
                <center>
                    <h2>صفحه مورد نظر شما یافت نشد</h2>
                </center>

                <center>
                    <h3>ابرپرداز</h3>
                </center>

            </div>
        )
    }
}