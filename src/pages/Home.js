import React from 'react';
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import {Link} from "react-router-dom";
import Services from "../components/Serivces"
import FeaturedRooms from "../components/FeaturedRooms";
import Button from "../components/StyledHero"; 
 
export default function Home(){
    return (
        <React.Fragment>
        <Hero>
            <Banner title="luxurious rooms" subtitle="deluxe rooms starting at RM299">
            <Link to="/rooms" className="btn-primary">
                our rooms
            </Link>
            </Banner>
        </Hero>
        <Services></Services>
        <FeaturedRooms/>
        <Button>
            hello
        </Button>
        </React.Fragment>
    )
}

