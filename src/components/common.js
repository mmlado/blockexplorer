import { Link } from "react-router-dom";

export const Detail = (props) => {
    var value = props.value;
    if (props.link) {
        value = <Link to={`${props.link}`}>{props.value}</Link>
    }
    return <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: 24,
        fontSize: 14,
    }}>
        <p style={{
            marginLeft: 10,
            marginRight: 10,
            fontWeight: "bold"
        }}>{props.name}:</p>
        <p>{value}</p>
    </div>

}