import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';
import Spinner from '../general/Spinner';
import Error from '../general/Error';
import Tabla from '../Usuarios/Tabla';

class Usuarios extends Component {
	componentDidMount() {
		this.props.traerTodos();
	}
	ponerContenido = () => {
		if (this.props.cargando) {
			return <Spinner />;
		}
		if (this.props.error) {
			return <Error mensaje={this.props.error} />;
		}
		return <Tabla />;
	};

	render() {
		return <div>{this.ponerContenido()}</div>;
	}
}

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer;
};
export default connect(mapStateToProps, usuariosActions)(Usuarios);
