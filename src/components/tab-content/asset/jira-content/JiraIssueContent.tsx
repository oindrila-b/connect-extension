import { JiraIssueModel } from "../models/JiraIssueModel";

export function JiraIssueContent(props: JiraIssueModel) {
   

    return(
        <>
        <div className="content">
        <a href={props._url}>
                    <span>Project Name - {props._projectName}</span>
                    <p> Summary - {props._summary}</p>
                    <span>Status - {props._status}</span>
                </a>
        </div>
          
        </>
    )
}