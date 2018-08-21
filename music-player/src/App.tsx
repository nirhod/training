import { Button, Icon, List,} from 'antd';
import 'antd/lib/list/style/css'
import * as React from 'react';
import './App.css';
import { songsList } from './data';
import { MusicControllerState, Song, State } from './types';


class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {currentSongIndex: 0};
    }

  public render() {
    return (
      <div className="musicPlayer">
          <header className="header">
            <h1>Music Player</h1>
              <MusicController currentSongIndex={this.state.currentSongIndex}
                               nextSong={this.nextSong} prevSong={this.prevSong}/>
          </header>
              <List
                  dataSource={songsList}
                  renderItem={this.songToComponent}
                  bordered={true}
              />
      </div>
    );
  }

  private songToComponent = (item: Song) => (
    this.state.currentSongIndex === item.index ?
        <List.Item><strong>{item.name}</strong></List.Item> :
        <List.Item>{item.name}</List.Item>
    );

    private nextSong = () => this.setState({
        currentSongIndex: (this.state.currentSongIndex + 1) % songsList.length});
    private prevSong = () => this.setState({
        currentSongIndex: this.state.currentSongIndex !== 0 ? (this.state.currentSongIndex - 1) : songsList.length - 1});


}

const MusicController = ({currentSongIndex, prevSong, nextSong}: MusicControllerState) => (
    <div>
    <h2>{getSongByIndex(currentSongIndex).name}</h2>
              <audio controls={true} key={currentSongIndex}>
                  <source src={`http://localhost:3000/songs/${getSongByIndex(currentSongIndex).name}`} type="audio/mpeg"/>
                  Your browser does not support the audio tag.
              </audio>
              <br/>
              <Button.Group>
                  <Button onClick={prevSong}><Icon type="step-backward" /></Button>
                  <Button onClick={nextSong}><Icon type="step-forward" /></Button>
              </Button.Group>
    </div>
);

const getSongByIndex = (index: number): Song =>
        songsList.filter((song: Song) => song.index === index)[0];

export default App;

