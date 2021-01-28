let URL = 'https://cemasapi.herokuapp.com';


const getData = async ({ url, params, id }) => {

    let urlAPI = URL;
    let string_params = '';

    if (params.length === 1) {

        for (let param of params) {

            string_params += `/${param.key}/${param.value}`;

        }

    } else if (id) {
        string_params += `/${id}`;
    }



    const urlComplete = `${urlAPI}${url}${encodeURI(string_params)}`;
    const resp = await fetch(urlComplete);
    const { data } = await resp.json();




    return data;
};

const postData = async (url, data) => {
    let urlAPI = URL;

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return await fetch(`${urlAPI}${url}`, requestOptions);
};



export {
    URL,
    postData,
    getData,
};