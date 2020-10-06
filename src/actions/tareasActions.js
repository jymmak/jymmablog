import axios from 'axios';
import { CARGANDO, TRAER_TODAS, ERROR, CAMBIO_USUARIO, CAMBIO_TITULO, GUARDAR, ACTUALIZAR,LIMPIAR } from '../types/tareasTypes';

export const traerTodas = () => async (dispatch) => {
	dispatch({
		type: CARGANDO,
	});
	try {
		const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');

		const tareas = {};
		respuesta.data.map(
			(tar) =>
				(tareas[tar.userId] = {
					...tareas[tar.userId],
					[tar.id]: {
						...tar,
					},
				})
		);

		dispatch({
			type: TRAER_TODAS,
			payload: tareas,
		});
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: 'Información de tareas no disponible.',
		});
	}
};

export const cambioUsuarioId = (usuario_id) => (dispatch) => {
	dispatch({
		type: CAMBIO_USUARIO,
		payload: usuario_id,
	});
};

export const cambioTitle = (title) => (dispatch) => {
	dispatch({
		type: CAMBIO_TITULO,
		payload: title,
	});
};

export const agregar = (nueva_tarea) => async (dispatch) => {
	dispatch({
		type: CARGANDO,
	});

	try {
		await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea);

		dispatch({
			type: GUARDAR,
		});
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: 'Intente más tarde',
		});
	}
};

export const editar = (tarea_editada) => async (dispatch) => {
	dispatch({
		type: CARGANDO,
	});

	try {
		await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada);

		dispatch({
			type: GUARDAR,
		});
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: 'Intente más tarde',
		});
	}
};

export const cambioCheck = (usu_id, tar_id) => async (dispatch, getState) => {
	const { tareas } = getState().tareasReducer;
	const seleccionada = tareas[usu_id][tar_id];
	const actualizadas = {
		...tareas,
	};

	actualizadas[usu_id] = {
		...tareas[usu_id],
	};
	actualizadas[usu_id][tar_id] = {
		...tareas[usu_id][tar_id],
		completed: !seleccionada.completed,
	};
	dispatch({
		type: ACTUALIZAR,
		payload: 'Tareas actualizadas',
	});
};

export const eliminar = (tar_id) => async (dispatch) => {
	dispatch({
		type: CARGANDO,
	});

	try {
		await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`);

		dispatch({
			type: TRAER_TODAS,
			payload: {},
		});
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: 'Servicio no disponible',
		});
	}
};

export const limpiarForma = () => (dispatch) => {
	dispatch({
		type: LIMPIAR,
	});
};
