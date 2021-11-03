import React, { useCallback } from "react";
import { publishDOM } from 'dom-pubsub';

export const V = () => {

    const onClick = useCallback(() => {
        console.log('REACT: отправил');
        publishDOM('YO', {
            from: 'REACT'
        })
    }, []);

    return (
        <span onClick={onClick}>В</span>
    );
}