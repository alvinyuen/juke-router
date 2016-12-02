import React from 'react';
import {Link} from 'react-router';

const Sidebar = (props) => {

  const deselectAlbum = props.deselectAlbum;

  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item">
          <Link activeClassName="active" to="/albums">ALBUMS</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
        <Link activeClassName="active" href="#" to="/artists">ARTISTS</Link>
        </h4>
      </section>
    </sidebar>
  );
}

export default Sidebar;
