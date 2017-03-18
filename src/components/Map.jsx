import React, { Component } from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'

class Map extends Component {
    render() {
        const mapContainer = <div style={{height:'100%', width:'100%'}}></div>

        const events = this.props.events.map((venue, i) => {
            
            const marker = {
                position: {
                    lat: venue.location.lat,
                    lng: venue.location.lng
                }
            }

            return <Marker key={i} {...marker} />
        })

        return (
            <GoogleMapLoader
                containerElement = { mapContainer }
                googleMapElement = {
                    <GoogleMap
                        defaultZoom={15}
                        defaultCenter={this.props.center}
                        options={{streetViewControl: false, mapTypeControl: false}}>
                        { events }
                    </GoogleMap>
                } />
        )
    }
}

export default Map