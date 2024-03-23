import { useState } from "react";
import { GithubRepo } from "../models/GithubRepoModel";


export function GithubContentItem(props: GithubRepo) {
   let noOwner =  props._owner?.length === undefined ? true : false;

    return(
        <>
            
           { !noOwner ? <div  className="content">
                <a href={props._url}>
                    <span>Project Name - {props._name}</span>
                    <br/>
                    <span>Owned By - {props._owner}</span>
                </a>
            </div> 
            : null}
            { noOwner ? <div className="content">
            <a href={props._url}>
                    <span>Project Name - {props._name}</span>
                </a>
            </div>: null}
          
        </>
    )
}