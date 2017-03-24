import React from 'react';
import festivalImage from '../../public/assets/img/festivals.jpg';
import foodImage from '../../public/assets/img/food.jpg';
import comedyImage from '../../public/assets/img/comedy.jpg';
import musicImage from '../../public/assets/img/music.jpg';
import filmImage from '../../public/assets/img/film.jpg';
import sportsImage from '../../public/assets/img/sports.jpg';


class ImageHeader extends React.Component {
    render() {
        return (
            <div className="imageheader-content">
                    <img id="image-header" src={musicImage} />
                    <img id="image-header" src={foodImage} />
                    <img id="image-header" src={comedyImage} />
                    <img id="image-header" src={festivalImage} />
                    <img id="image-header" src={sportsImage} />
                    <img id="image-header" src={filmImage} />
            </div>
        )
    }
}

export default ImageHeader;