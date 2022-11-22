export const getMax = (arr) => {
	return arr.reduce((prev, curr, index) => {
		if (!prev || curr > prev) { return { value: prev, index } }
		return { value: curr, index }
	}, null)
}

export const getMin = (arr) => {
	return arr.reduce((prev, curr, index) => {
		if (!prev || curr < prev) { return { value: prev, index } }
		return { value: curr, index }
	}, null)
}

export const maxMin = (matrix) => {
	const min = []
	for (let i = 0; i < matrix.length; i++) {
		min.push(getMin(matrix[i]))
	}
	return getMax(min)
}

export function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;;
}