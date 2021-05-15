import React from "react"
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IconButton } from "@material-ui/core/";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

export default function Left(props) {
    return (
        <div id="left">
            <div id="icons-pad">
                <IconButton
                    onClick={() => {
                        props.setOpen();
                        document.body.style.overflowY = "hidden";
                    }}
                    style={{
                        width: "50px",
                        margin: "auto",
                        backgroundColor: "#3F51B5",
                        color: "#ffffff",
                    }}
                >
                    <CreateOutlinedIcon
                        style={{ fontSize: 25 }}
                    ></CreateOutlinedIcon>
                </IconButton>
                <IconButton
                    style={{ width: "50px", margin: "auto", color: "#afa9a1" }}
                >
                    <HomeOutlinedIcon></HomeOutlinedIcon>
                </IconButton>
                <IconButton
                    style={{ width: "50px", margin: "auto", color: "#afa9a1" }}
                >
                    <SettingsOutlinedIcon></SettingsOutlinedIcon>
                </IconButton>
                <IconButton
                    style={{ width: "50px", margin: "auto", color: "#afa9a1" }}
                >
                    <HelpOutlineOutlinedIcon></HelpOutlineOutlinedIcon>
                </IconButton>
                <IconButton
                    style={{ margin: "auto" }}
                    onClick={() => {
                        props.setProfile();
                    }}
                >
                    {props.url ? (
                        <img
                            style={{
                                margin: "auto",
                                width: "30px",
                                height: "30px",
                                borderRadius: "100%",
                                position: "relative",
                            }}
                            src={props.url}
                            alt=""
                        ></img>
                    ) : (
                            <CircularProgress
                                style={{ width: "30px", height: "30px" }}
                            />
                        )}
                </IconButton>
            </div>
        </div>)
}
