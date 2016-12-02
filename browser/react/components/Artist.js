import React from 'react';

import Albums from './Albums';
import Songs from './Songs';
import {Link} from 'react-router';


class Artist extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const artistId = this.props.routeParams.artistId;
        this.props.selectArtist(artistId);
    }

    render(){
        const artistId = this.props.routeParams.artistId;
        const artistInfo = this.props.selectedArtist;

        const currentSong = this.props.currentSong;
        const isPlaying = this.props.isPlaying;
        const toggleOne = this.props.toggleOne;

        const children = this.props.children;
        const propsToPassToChildren = {
            albums:artistInfo.albums,
            songs: artistInfo.songs,
            currentSong: currentSong,
            isPlaying: isPlaying,
            toggleOne: toggleOne
        }

        return (
            <div>
            <h3>{artistInfo.name}</h3>
            <ul className="nav nav-tabs">
                <li><Link to={`/artists/${artistId}/albums`}>ALBUMS</Link></li>
                <li><Link to={`/artists/${artistId}/songs`}>SONGS</Link></li>
            </ul>
            { children && React.cloneElement(children, propsToPassToChildren) }
            </div>
            );
    }
}

export default Artist;

            // <Albums albums={artistInfo.albums}/>
            // <Songs
            //     songs={artistInfo.songs}
            //     currentSong={currentSong}
            //     isPlaying={isPlaying}
            //     toggle={toggle}/>