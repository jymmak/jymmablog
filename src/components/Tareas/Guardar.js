import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tareasActions from '../../actions/tareasActions';
import Spinner from '../General/Spinner';
import Error from '../General/Error';
import { Redirect } from 'react-router-dom';

class Guardar extends Component {
	componentDidMount() {
		const {
			match: {
				params: { usu_id, tar_id },
			},
			tareas,
			cambioUsuarioId,
			cambioTitle,
			limpiarForma
		} = this.props;

		if (usu_id && tar_id) {
			const tarea = tareas[usu_id][tar_id];
			cambioUsuarioId(tarea.userId);
			cambioTitle(tarea.title);
		}else{
			limpiarForma();
		}
	}
	cambioUsuarioId = (event) => {
		this.props.cambioUsuarioId(event.target.value);
	};
	cambioTitle = (event) => {
		this.props.cambioTitle(event.target.value);
	};
	guardar = () => {
		const {
			match: {
				params: { usu_id, tar_id },
			},
			tareas,
			usuario_id,
			title,
			agregar,
			editar,
		} = this.props;

		const nueva_tarea = {
			userId: usuario_id,
			title: title,
			completed: false,
		};

		if (usu_id && tar_id) {
			const tarea = tareas[usu_id][tar_id];
			const tarea_editada = {
				...nueva_tarea,
				completed: tarea.completed,
				id: tarea.id,
			};
			editar(tarea_editada);
		} else {
			agregar(nueva_tarea);
		}
	};

	deshabilitar = () => {
		const { title, usuario_id, cargando } = this.props;
		if (cargando) {
			return true;
		}

		if (!usuario_id || !title) {
			return true;
		}
		return false;
	};

	mostrarAccion = () => {
		const { cargando, error } = this.props;
		if (cargando) {
			return <Spinner />;
		}
		if (error) {
			return <Error mensaje={this.props.error} />;
		}
	};
	render() {
		return (
			<div>
				{this.props.regresar ? <Redirect to="/tareas" /> : ''}
				<h1>Guardar Tarea</h1>
				Usuario id:
				<input type="number" defaultValue={this.props.usuario_id} onChange={this.cambioUsuarioId} />
				<br />
				<br />
				Título:
				<input defaultValue={this.props.title} onChange={this.cambioTitle} />
				<br />
				<br />
				<button disabled={this.deshabilitar()} onClick={this.guardar}>
					Guardar
				</button>
				{this.mostrarAccion()}
			</div>
		);
	}
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);
