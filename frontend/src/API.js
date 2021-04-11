const PUBLIC_URL = import.meta.env.SNOWPACK_PUBLIC_API_URL

const API = {
    PUBLIC_URL,
    UPLOAD_VIDEO: `${PUBLIC_URL}/upload`,
    DELETE_VIDEO: `${PUBLIC_URL}/delete`,
    PREDICT_VIDEO: `${PUBLIC_URL}/predict`
}

export default API