/**
 * @param {string} type
 * @returns {string}
 * @throws {Error}
 */
const endPoint = `https://api.themoviedb.org/3/trending/`
const apiKey = `44ee5523e457e74020effc2bddc4592e`

export default function Link(type) {
    if (!type)
        throw new Error('Missing Required Parameter')
    return `${endPoint}${type}/day?api_key=${apiKey}`
}