import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import PetsGrid from '../presentation/pets/PetsGrid';

class HomeLayout extends Component {

    renderPets(props) {
        if (props.isLoading) {
            return (<p>Loading your pets...</p>);
        } else if (props.error) {
            return (<p>Theres been an error!</p>);
        }

        return (
            <div>
                <h2>There are {this.props.pets.length} pets listed...</h2>
                <PetsGrid pets={props.pets} />
            </div>
        );
    }

    render() {
        return (
            <section>
                {this.renderPets(this.props)}
            </section>
        );
    }
}

HomeLayout.propTypes = {
    pets: PropTypes.array
};

const mapStateToProps = state => ({ ...state.pets });

export default connect(mapStateToProps)(HomeLayout);
