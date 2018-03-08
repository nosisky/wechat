import React from 'react';
import { Link } from 'react-router-dom';
const OnlineLists = ({ username, id, userId }) => {
  return (
    <ul className="list-group">
      <li className="list-group-item">
        {userId !== id && <Link to={`/chat/${id}`}>{username}
          <img id="new-indicator"
            height="20px"
            width="20px" style={{ float: 'right', display: 'none' }}
            src="http://icon-park.com/imagefiles/new_circle_icon_red.png" />

          <img id="online-indicator" height="10px" width="10px" style={{ float: 'right' }}
            src="http://icons.veryicon.com/256/System/FS%20Ubuntu/Status%20tray%20online.png" />
        </Link>}
        {userId === id && <b>{username}</b>}
      </li>
    </ul>
  );
};

export default OnlineLists;
