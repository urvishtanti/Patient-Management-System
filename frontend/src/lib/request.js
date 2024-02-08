import axios from "axios";

export default function request(url, method, params = {}, data = {}) {
	return new Promise((resolve, reject) => {
		const headers = {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json"
		};
		const accessToken = localStorage.getItem("USER");
		if (accessToken) {
			headers["Authorization"] = `Bearer ${accessToken}`;
		}
		axios({
			method: method,
			url: `${process.env.REACT_APP_BASE_URL}/${url}`,
			headers,
			params: params,
			data: data,
		})
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((exception) => {
				if (exception && exception.response && exception.response.status === 403) {
					localStorage.removeItem("USER");
				}
				reject({ data: exception.response.data });
			})
	})
}
