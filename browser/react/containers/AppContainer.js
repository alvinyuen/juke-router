import React, { Component } from 'react';
import axios from 'axios';

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import { convertAlbum, convertAlbums, convertSong, skip } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.deselectAlbum = this.deselectAlbum.bind(this);
  }

  componentDidMount () {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(album => this.onLoad(convertAlbums(album)));

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));

    //get artists
    axios.get('/api/artists/')
      .then(res => res.data)
      .then(artists => {
        this.setState({artists: artists});
      });
  }

  onLoad (albums) {
    this.setState({
      albums: albums
    });
  }

  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: convertAlbum(album)
      }));
  }

  //get selected artist albums and songs
  selectArtist(artistId){
    Promise.all([
    axios.get(`/api/artists/${artistId}/`),
    axios.get(`/api/artists/${artistId}/albums`),
    axios.get(`/api/artists/${artistId}/songs`)
    ])
    .then(result => {
      const artistInfo = result[0].data;
      const artistAlbums = result[1].data;
      const artistSongs = result[2].data;
      let albumsWithImageUrl = artistAlbums.map(album=> {
        return convertAlbum(album)});
      let songsWithUrl = artistSongs.map(song=>{
        return convertSong(song)});
      artistInfo.albums = albumsWithImageUrl;
      artistInfo.songs = songsWithUrl;
      this.setState({selectedArtist: artistInfo})
    });
  }

  deselectAlbum () {
    this.setState({ selectedAlbum: {}});
  }

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar deselectAlbum={this.deselectAlbum} />
        </div>
        <div className="col-xs-10">
        {
          this.props.children ?
          React.cloneElement(this.props.children, {

          // Album (singular) component's props
          album: this.state.selectedAlbum,
          currentSong: this.state.currentSong,
          isPlaying: this.state.isPlaying,
          toggleOne: this.toggleOne,

          // Albums (plural) component's props
          albums: this.state.albums,
          selectAlbum: this.selectAlbum, // note that this.selectAlbum is a method, and this.state.selectedAlbum is the chosen album

          //All Artists, selected artist, selectArtist axios method
          artists: this.state.artists,
          selectedArtist: this.state.selectedArtist,
          selectArtist: this.selectArtist
        })
        : null
          // this.state.selectedAlbum.id ?
          // <Album
          //   album={this.state.selectedAlbum}
          //   currentSong={this.state.currentSong}
          //   isPlaying={this.state.isPlaying}
          //   toggleOne={this.toggleOne}
          // /> :
          // <Albums
          //   albums={this.state.albums}
          //   selectAlbum={this.selectAlbum}
          // />
        }
        </div>
        <Player
          currentSong={this.state.currentSong}
          currentSongList={this.state.currentSongList}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
