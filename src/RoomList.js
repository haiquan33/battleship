import React, { Component } from 'react';


import RoomItem from './RoomItem';
class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRoomJoined: false,

        }
        this.JoinRoomT = this.JoinRoomT.bind(this);
    }

    JoinRoomT(roomName) {
        
        this.props.JoinRoom(roomName);
    }

    render() {
        const listRoom = this.props.roomList.map((room) =>
            <div>
                <RoomItem key={room.roomName} room={room} />
                <div onClick={()=>this.JoinRoomT(room.roomName)} >Join Room</div>
            </div>
        );
        return (
            <div className="RoomList">
                Danh sách phòng
         {listRoom}
            </div>

        );
    }
}

export default RoomList;
