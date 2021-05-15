import React from "react";
import Data from "../Data"
import Tile from "../Tile"

export default function Middle(props) {
    if (props.width >= 1104)
        return (
            <div
                id="middle"
                style={{
                    width: "600px",
                    left: (props.width * 1) / 2 - 300 + "px",
                }}
            >
                {Data.map((x, index) => (
                    <Tile
                        text={x.text}
                        author={x.author}
                        index={index}
                        pp={props.downloadProfilePicture}
                    />
                ))}
            </div>
        )
    else
        return (
            <div
                id="middle"
                style={{
                    width: "50%",
                    left: (props.width * 1) / 4 + "px",
                }}
            >
                {Data.map((x, index) => (
                    <div>
                        <Tile
                            author={x.author}
                            text={x.text}
                            index={index}
                            pp={props.downloadProfilePicture}
                        />
                    </div>
                ))}
            </div>
        )
}