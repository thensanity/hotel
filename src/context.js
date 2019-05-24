import React, { Component } from 'react';
import items from "./data";
import Client from "./Contentful";
import { async } from 'q';

const RoomContext =React.createContext();

export default class RoomProvider extends Component {
    state={
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        laoding: true,
        type:"all",
        capacity:1,
        price:0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }

    //getData
    getData = async () => {
        try{
           let response = await Client.getEntries({
               content_type: "beachResortWeb",
               /* order: "sys.createdAt" */
               order: "-fields.price"
           });

           let rooms = this.formatData(response.items);
        let maxPrice = Math.max(...rooms.map(item=>item.price));
        let maxSize = Math.max(...rooms.map(item=>item.size))
        let featuredRooms = rooms.filter(room => room.featured === true);
        this.setState({
            rooms, featuredRooms, sortedRooms: rooms, laoding: false, price: maxPrice, maxPrice, maxSize
        })
           
        } catch(error){
            console.log(error)
        }
    }

    componentDidMount(){
        this.getData()
    }

    formatData(items){
        let tempItems = items.map((item)=>{
           let id = item.sys.id;
           let images = item.fields.images.map(image => image.fields.file.url);
           let room = {
               ...item.fields, images, id
           }
           return room
        })
        return tempItems
    }

    getRoom=(slug)=> {
       let tempRooms = [...this.state.rooms];
       const room = tempRooms.find(room => room.slug===slug);
       return room;
    }

    handleChange= event => {
        const target =event.target;
        const value= target.type==="checkbox" ? target.checked: target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        }, this.filterRooms)
    }

    filterRooms=()=>{
      let{rooms, type, capacity, price,minSize, maxSize, breakfast,pets} = this.state;
      //all the rooms 
      let tempRooms= [...rooms];
      //transform value
      capacity = parseInt(capacity);
      price = parseInt(price);
      //filter by capacity
      if(capacity !== 1){
          tempRooms = tempRooms.filter(room => room.capacity >= capacity)
      }
      //filter by type
      if(type !== "all"){
          tempRooms = tempRooms.filter(room => room.type === type)
      }
      //filter by price
      tempRooms =tempRooms.filter(room => room.price <= price);
      //filter by size
      tempRooms = tempRooms.filter(room => room.size >= minSize && room.szie <= maxSize)
      //filter by breakfast
      if(breakfast){
          tempRooms = tempRooms.filter(room => room.breakfast === true)
      }
      //fiter by pets
      if(pets){
        tempRooms = tempRooms.filter(room => room.pets === true)
    }
      //change state
      this.setState({
          sortedRooms: tempRooms
      })
    }

    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component){
  return function ConsumerWrapper(props){
      return<RoomConsumer>
          {value => <Component {...props} context={value}/>}
      </RoomConsumer>
  }
}

export {RoomProvider, RoomConsumer, RoomContext};
