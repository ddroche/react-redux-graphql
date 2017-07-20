import React, { PropTypes } from 'react';

import GridTile from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';

const styles = {
    listItem: {
        width: 400,
        height: 400,
        margin: 8,
        float: 'left'
    }
};

export default function PetsGrid(props) {
    return (
        <div>
            {
                props.pets.map(pet => (
                    <GridTile
                        key={pet.id}
                        title={pet.name}
                        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                        style={styles.listItem}
                    >
                        <img alt={pet.name} src={pet.profilePicture} />
                    </GridTile>
                ))
            }
        </div>
    );
}

PetsGrid.propTypes = {
    pets: PropTypes.array.isRequired
};
