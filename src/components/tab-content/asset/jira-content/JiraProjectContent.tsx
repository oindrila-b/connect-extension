
import { useState } from "react";
import { JiraProjectModel } from "../models/JiraProjectModel";

export function JiraProjectContent(props: JiraProjectModel) {

    return(
        <>
          <div className="content">
        <a href={props._url}>
                    <span>Project Name - {props._name}</span>
                    <p> Last Updated - {props._last_modified}</p>
                    <span>Number of Issues - {props._number_of_issues}</span>
                </a>
        </div>
        </>
    )
}