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
        this.setState({ isRoomJoined: true,currentRoom:this.props.username })
    }

    JoinRoom(roomName){
        
        ClientJoinRoom(roomName);
        this.setState({isRoomJoined:true,currentRoom:roomName})
    }
    
    render() {
       const body=this.state.isRoomJoined?<Room/>: <RoomList JoinRoom={this.JoinRoom} roomList={this.state.roomList}/>;
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
