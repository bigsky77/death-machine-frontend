import React, { useState, useRef, useEffect, useMemo } from "react";
import { Box } from '@mui/material';
import ShipState, { ShipStatus, ShipType } from "../types/ShipState";
import Grid from "../types/Grid";
import { useSpring, animated } from "react-spring";

export default function Ship ({ shipState, frames, animationFrame, shipInitPositions}) {

    if (!shipState) return <></>

    const lastShipGridRef = useRef<Grid>({x:0,y:0});

    useEffect(() => {
    const ship = frames[animationFrame].ships.find(ship => ship.id === shipState.id);
        if (ship) {
            lastShipGridRef.current = ship;
        }
    lastShipGridRef.current = shipState.index;
    }, [animationFrame, shipInitPositions, frames, shipState]);

    const gap_offset = 3.2;

    const { left } = useSpring({
        from: {left: 845 + gap_offset + lastShipGridRef.current.x * (32+gap_offset*2)},
        left: 845 + gap_offset + shipState.index.x * (32+gap_offset*2)
    })
    const { top } = useSpring({
        from: {top: 190 + gap_offset + lastShipGridRef.current.y * (32+gap_offset*2)},
        top: 190 + gap_offset + shipState.index.y * (32+gap_offset*2)
    })

    // remember ship index in useRef
    lastShipGridRef.current = shipState

    const shipClassName = shipState.status == ShipStatus.OPEN ? 'grabberOpen' : 'grabberClose'

    const ship_id = "🚀"

    return (
        <animated.div
            className={`${shipClassName}`}
            style={{
            position: 'absolute',
            border: '1px solid white',
            left: left,
            top: top,
            width: 32,
            height: 32,
            fontSize: '26px',
            textAlign: "center",
            alignItems: 'center',
            //lineHeight: '1rem',
            zIndex: '30',
            transformStyle:'preserve-3d',
        }}>
            <div>{ship_id}</div>
        </animated.div>
    );
}
