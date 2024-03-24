import { useState } from "react";
import { GithubRepo } from "../models/GithubRepoModel";


export function GithubContentItem(props: GithubRepo) {

    return (
        <>
            <div className="content">
                <a href={props._url}>
                    <span>Project Name - {props._name}</span>
                    <br />
                    <span>Owned By - {props._owner}</span>
                </a>
            </div>

        </>
    )
}