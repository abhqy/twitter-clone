import React from "react"
import Dialog from "@material-ui/core/Dialog";
import Crop from "./Crop"
import CircularProgress from "@material-ui/core/CircularProgress";

export default function DialogProfile(props) {
    return (
        <Dialog
            open={props.profile}
            modal={true}
            fullWidth={true}
            style={{ backgroundColor: "#0000008a" }}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    maxWidth: "100%",
                    height: "100%"
                }
            }}
        >
            <div
                style={{
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                }}
                overlayStyle={{ backgroundColor: 'transparent' }}
            >
                <h3>username</h3>
                {props.changePP ? (
                    <div>
                        {props.url ? (
                            <img
                                style={{
                                    margin: "auto",
                                    width: "200px",
                                    height: "200px",
                                    borderRadius: "100%",
                                }}
                                src={props.url}
                                alt=""
                            ></img>
                        ) : (
                                <CircularProgress />
                            )}
                        <br></br>
                        <button
                            onClick={props.setChangePP}
                        >
                            Change PP
              </button>
                    </div>
                ) : (
                        <Crop
                            download={() => props.downloadProfilePicture()}
                            toggle={() => {
                                props.setProfile();
                                props.setChangePP();
                            }}
                        ></Crop>
                    )}
            </div>
        </Dialog>
    )
}