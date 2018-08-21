import { Button, Icon, List,} from 'antd';
import 'antd/lib/list/style/css'
import * as React from 'react';
import './App.css';
import { songsList } from './data';

type State = { songIndex: number, isPlaying: boolean }

type Song = { name: string, index: number }

class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {songIndex: 0, isPlaying:true};
    }

  public render() {
    return (
      <div className="musicPlayer">
          <header className="header">
            <h1>Music Player</h1>
              <Button.Group className='control'>
                  <Button onClick={this.prevSong}><Icon type="step-backward" /></Button>
                  <Button onClick={this.nextSong}><Icon type="step-forward" /></Button>
              </Button.Group>
          </header>
              <List
                  dataSource={songsList}
                  renderItem={this.itemToComponent}
                  bordered={true}
              />
      </div>
    );
  }

  private itemToComponent = (item: Song) => (
    this.state.songIndex === item.index && this.state.isPlaying ?
        <List.Item><strong>{item.name}</strong></List.Item> :
        <List.Item>{item.name}</List.Item>
    );

    private nextSong = () => this.setState({'songIndex': (this.state.songIndex + 1) % songsList.length});
    private prevSong = () => this.setState({
        'songIndex': this.state.songIndex !== 0 ? (this.state.songIndex - 1) : songsList.length - 1});
}

export default App;

