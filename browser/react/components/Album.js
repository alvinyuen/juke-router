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

  componentDidMount(){
    const albumId = this.props.routeParams.albumId;
    this.props.selectAlbum(albumId);
  }

  render(){
    const album = this.props.album;
    const currentSong = this.props.currentSong;
    const isPlaying = this.props.isPlaying;
    const toggleOne = this.props.toggleOne;


    console.log('HOST:', window.location.href);
    var str = "this"
    var result = str.link(window.location.href);
    console.log(typeof result);
    const link = encodeURIComponent(window.location.href);

    return (
      <div className="album">
        <div>
          <h3>{ album.name }</h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
           <button type="button" className="btn btn-primary"><a  href={`mailto:?subject=Album Share&body=check ${link} out!`}>Send Email</a><i className="glyphicon glyphicon-share"></i>Share</button>
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
