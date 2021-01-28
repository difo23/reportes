import { getData } from './api';


const getCursosByCode = async (props) => {
    
    let res = await getData({
        url: '/curso',
        params: props
    });



    return res;
};

export default getCursosByCode;