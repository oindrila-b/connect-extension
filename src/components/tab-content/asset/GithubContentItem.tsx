import { useState } from "react";
import { GithubProp } from "./GithubProp";

export function GithubContentItem(props: GithubProp) {
   let noOwner =  props.owner?.length === undefined ? true : false;

    return(
        <>
            
           { !noOwner ? <div  className="content">
                <a href={props.url}>
                    <span>Project Name - {props.name}</span>
                    <br/>
                    <span>Owned By - {props.owner}</span>
                </a>
            </div> 
            : null}
            { noOwner ? <div className="content">
            <a href={props.url}>
                    <span>Project Name - {props.name}</span>
                </a>
            </div>: null}
          
        </>
    )
}