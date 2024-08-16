const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/restaurants`

const index = async () => {
    try {
        const res = await fetch(BACKEND_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const show = async (restuarantId) => {
    try {
        const res = await fetch(`${BACKEND_URL}/${restuarantId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const create = async (restaurantId, foodFormData) => {
    try {
        const res = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(foodFormData)
        })
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

const deleteRestaurant = async (restuarantId) => {
    try {
        const res = await fetch(`${BACKEND_URL}/${restuarantId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

async function update(restuarantId, restaurantData) {
    try {
        const res = await fetch(`${BACKEND_URL}/${restuarantId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(restaurantData),
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const createFood = async (restaurantId, foodFormData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/${restaurantId}/foods`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foodFormData)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export {
    index,
    show,
    create,
    deleteRestaurant,
    update,
    createFood,
}