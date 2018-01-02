import React, { Component } from 'react';



class RoomItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRoomJoined: false,
        }

    }



    render() {
        const roomName=this.props.room.roomName;
        return (
            <div className="RoomItem" style={styles.Container}>
                <div>{roomName}</div>
            

            </div>
        );
    }
}


const styles = {
    Container: {
        display: 'flex',
        flexDirection: 'row'
    }
}

export default RoomItem;
