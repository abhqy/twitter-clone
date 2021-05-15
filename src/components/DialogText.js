import React from "react"
import Dialog from "@material-ui/core/Dialog";
import { IconButton } from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
import "../App.css"

function pasteAsPlainText(e) {
    e.preventDefault();

    // get text representation of clipboard
    var text = (e.originalEvent || e).clipboardData.getData('text/plain');

    // insert text manually
    document.execCommand("insertHTML", false, text);
}


class Text extends React.Component {

    componentDidMount() {
        window.addEventListener('paste', pasteAsPlainText)
    }

    componentWillUnmount() {
        window.removeEventListener('paste', pasteAsPlainText)
    }
    render() {
        return (
            <div id="textbox" contentEditable="true"></div>
        )
    }
}

export default function DialogText(props) {
    return (
        <Dialog
            open={props.open}
            modal={true}
            fullWidth={true}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    maxWidth: "100%",
                    height: "130%"
                }
            }}
        >
            <IconButton onClick={props.setOpen} style={{ position: "fixed", zIndex: "2", top: "20px", left: "20px" }}>
                <CloseIcon />
            </IconButton>
            <div id="table">
                <Text />
            </div>
        </Dialog>
    )
}