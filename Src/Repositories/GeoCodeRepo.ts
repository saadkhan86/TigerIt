import ErrorHandler from "../ErrorHandler/ErrorHandler"
import axios from 'axios'

class GeoCodeRepo {
    public async getRoadDistance(pickupPlaceId: string, dropPlaceId: string) {
        const url = 'https://maps.googleapis.com/maps/api/distancematrix/json'
        const { data } = await axios.get(url, {
            params: {
                origins: `place_id:${pickupPlaceId}`,
                destinations: `place_id:${dropPlaceId}`,
                key: process.env.GOOGLE_API_KEY,
            },
        })
        const element = data.rows[0]?.elements[0]
        if (!element || element.status !== 'OK') {
            throw new ErrorHandler(404, 'Distance not found')
        }
        return element.distance.value / 1000
    }
}
export default new GeoCodeRepo()