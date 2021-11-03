import React, { useEffect } from "react";
import { subscribeDOM } from "dom-pubsub";

import { V } from "./V";

export const App = () => {
    useEffect(() => {
        subscribeDOM('YO', payload => {
            if (payload.from !== 'REACT') {
                console.log(`REACT: получил от ${payload.from}`);
            }
        })
    }, [])

    return (
        <V/>
    );
}