import {withRoomConsumer} from "../context";
import {React} from "react";
import Loading from "../components/Loading";
import RoomFilter from "../components/RoomFilter";
import RoomsList from "../components/RoomsList";

function RoomContainer({context}){
     const{loading,sortedRooms, rooms} = context;
     if(loading){
        return <Loading/>;
    }
    return (
     <>
   <RoomFilter rooms={rooms}/>
   <RoomsList rooms={sortedRooms}/>
    </>
       );
    
}

export default withRoomConsumer(RoomContainer)



/* import React from 'react';
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import {RoomConsumer} from "../context";
import Loading from "../components/Loading"

export default function RoomsContainer() {
    return (
        <RoomConsumer>
            {
                (value)=>{
                    const {loading, sortedRooms, rooms} = value;
                    if(loading){
                        return <Loading/>;
                    }
                    return (
                     <div>
                     Hello from rooms Container
                   <RoomsFilter rooms={rooms}/>
                   <RoomsList rooms={sortedRooms}/>
                    </div>
                    );
                }
            }
        </RoomConsumer>
       
    )
}

 */