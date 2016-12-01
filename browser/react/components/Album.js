import React from 'react';
import Songs from '../components/Songs';
import axios from 'axios';

class Album extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      album: {}
    };

  }

  ComponentDidMount(){
    const albumId = this.props.routeParams.albumId;
    this.props.selectAlbum(albumId);
  }

  render(){
    console.log('PROPS',this.props.routeParams.albumId);
    console.log('selectedAlbum', this.props.selectAlbum);

     const albumId = this.props.routeParams.id;
    const album = this.props.album;
    const currentSong = this.props.currentSong;
    const isPlaying = this.props.isPlaying;
    const toggleOne = this.props.toggleOne;
    return (
      <div className="album">
        <div>
          <h3>{ album.name }</h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs
          songs={album.songs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          toggleOne={toggleOne} />
      </div>
  );
  }
}

export default Album;
