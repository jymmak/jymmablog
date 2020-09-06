import axios from 'axios';
import { CARGANDO, TRAER_TODOS, ERROR } from '../types/usuariosTypes';

export const traerTodos = () => async (dispatch) => {
	dispatch({
		type: CARGANDO,
		
	});
	try {
		const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
		dispatch({
			type: TRAER_TODOS,
			payload: respuesta.data,
		});
	} catch(error) {
		dispatch({
			type: ERROR,
			payload: 'Algo salió mal intente más tarde.'
		});
	}
};
