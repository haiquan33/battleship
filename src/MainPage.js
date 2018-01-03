import React, { Component } from 'react';


import RoomList from './RoomList';
import Room from './Room';
import { ClientGetRoom,ClientJoinRoom, ClientCreateRoom } from './api/api.js';
import RoomItem from './RoomItem';
class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRoomJoined: false,
            isRoomOwner:false,
            roomList:[],
            currentRoom:''
        }
        this.CreateRoom = this.CreateRoom.bind(this);
        this.JoinRoom=this.JoinRoom.bind(this);
        ClientGetRoom((roomList) => this.setState({
            roomList
        }));
    }

 
    CreateRoom() {
        ClientCreateRoom(this.props.username);
        this.setState({ isRoomJoined: true,currentRoom:this.props.username,isRoomOwner:true })
    }

    JoinRoom(roomName){
        
        ClientJoinRoom(roomName);
        this.setState({isRoomJoined:true,currentRoom:roomName})
    }
    
    render() {
       const body=this.state.isRoomJoined?<Room isRoomOwner={this.state.isRoomOwner} roomList={this.state.roomList} currentRoom={this.state.currentRoom} />: <RoomList JoinRoom={this.JoinRoom} roomList={this.state.roomList}/>;
        return (
            <div className="MainPage">
                <div className="Header">ShipBattle</div>
                {this.state.isRoomJoined?null:<div onClick={this.CreateRoom}>Tạo phòng</div>}
                {body}
               
            </div>
        );
    }
}

export default MainPage;
