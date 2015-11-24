export function createQueryArray(name, array){
	let query = '';
	array.forEach( (value) => {
		query += `${name}[]=${value}`;
	});
}
