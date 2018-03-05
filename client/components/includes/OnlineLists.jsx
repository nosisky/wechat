import React from 'react';
import { Link } from 'react-router-dom';
const OnlineLists = ({ username, id, userId }) => {
  return (
    <ul className="list-group">
      <li className="list-group-item">
        {userId !== id && <Link to={`/chat/${id}`}>{username}</Link>}
        {userId === id && <Link to={`/chat`}>{username}</Link>}
      </li>
    </ul>

  );
};

export default OnlineLists;
