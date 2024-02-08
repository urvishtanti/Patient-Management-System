import React, { useState } from "react";
import { SubFooterContactUsComponent } from "../components/sub-footer/contact-us";

export default function ContactUs(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const onSubmit = (e) => {

    }

    return <SubFooterContactUsComponent
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        message={message}
        setMessage={setMessage}
        onSubmit={onSubmit}
    />
}