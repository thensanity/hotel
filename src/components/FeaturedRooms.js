import React, { Component } from 'react';
import {RoomContext} from "../context";
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";
import PropTypes from 'prop-types'


export default class FeaturedRooms extends Component {
    static contextType= RoomContext
    render() {
       let {featuredRooms: rooms, loading} = this.context;
        rooms = rooms.map((room)=> {
            return <Room key={room.id} room={room}/>
        }) 
        console.log(rooms)
        return (
            <section className="featured-rooms">
              <Title title="featured rooms"/>
              <div className="featured-rooms-center">
                  {loading? <Loading/>: rooms}
              </div>
            </section>
        )
    }
}

Room.propTypes ={
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired,
    })
}