import React, { Component } from 'react';
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from "react-icons/fa";
import Title from "./Title"

export default class Serivces extends Component {
    state={
        services:[
            {
                icon:<FaCocktail/>,
                title: "free CockTail",
                info: "Lorem ipsum dor amem"
            },
            {
                icon:<FaHiking/>,
                title: " Hiking",
                info: "Lorem ipsum dor amem"
            },
            {
                icon:<FaShuttleVan/>,
                title: " Van",
                info: "Lorem ipsum dor amem"
            },
            {
                icon:<FaBeer/>,
                title: " Beer",
                info: "Lorem ipsum dor amem"
            }
        ]
    }
    render() {
        return (
            <section className="services">
               <Title title="services"/>
               <div className="services-center">
                   {this.state.services.map((item,index)=> {
                        return <article key={index} className="service">
                            <span>{item.icon}</span>
                           <h6>{item.title}</h6>
                           <p>{item.info}</p>
                        </article>
                   })}
               </div>
            </section>
        )
    }
}
