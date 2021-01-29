import React, { useState, useEffect } from 'react'
import { postData, getCursosByCode, URL } from './api';
import { useForm } from './useForm';

function Reporte(props) {

    const initialState = {
        cursos: [],
    };

    const [values, handleInputChange] = useForm({ periodo: '' });
    const { periodo } = values;

    const [state, setstate] = useState(initialState)

    const update = () => {
        getCursosByCode([{
            key: 'codigo_periodo',
            value: periodo
        }]).then(data => setstate(
            state => {

                console.log(state.periodo, data);
                return ({
                    ...state,
                    message: `${data?.length} Curso${data?.length < 2 ? '' : 's'} obtenido${data?.length < 2 ? '' : 's'} de  BD.`,
                    cursos: data
                })


            })).catch((err) => setstate(state => {
                return ({
                    ...state,
                    cursos: [],
                    message: 'Revisar el internet!',
                })
            }))

    }



    useEffect(() => {

        //cargar lista de cursos creados por el usuario
        console.log('Cargar todos los cursos creados por el usuario');
        update();


    }, [])





    const hadledUpdate = (reporte) => {

       

        postData('/reportes/create', reporte)
            .then((res) => { return res.json() })
            .then((data) => {

                console.log('Reportes', data);
                if (data.create) {
                    setstate({
                        ...state,
                        message: `Los reportes de ${reporte.curso} fueron actualizados!`,

                    })
                    window.alert('Actualizacion completada!')
                } else {
                    setstate({
                        ...state,
                        message: `No existen boletines para ${reporte.curso}!`,

                    })
                }

            })
    }



    const hadledPDF = (reporte) => {

        const urlComplete = `${URL}${'/reporte/pdf'}/${reporte._id}`;
        console.log('GET PDF', urlComplete)

        window.open(urlComplete)

    }


    const renderCursos = state.cursos?.map((curso) => {


        const query = {
            _id: curso._id,
            curso: curso.codigo_curso,
            titular: curso.codigo_titular,
            periodo: curso.codigo_periodo,
            centro: curso.codigo_centro

        }


        return (


            < div key={curso._id} className="card border-dark mb-3 mt-3 ml-3 mr-3" style={{ "width": "18rem" }
            }>
                <div className="card-body">
                    <h5 className="card-title">Reporte</h5>
                    <h6 className="card-subtitle mb-2 text-muted"> {`${curso.codigo_curso}`}</h6>
                    <p className="card-text"> Periodo Educativo: {curso.codigo_periodo}</p>
                    <p className="card-text"> Titular: {curso.nombre_titular}</p>
                    <button
                        onClick={() => hadledUpdate(query)}
                        className="btn btn-outline-danger mr-1"
                    >Actualizar</button>
                    <button
                        onClick={() => hadledPDF(query)}
                        className="btn btn-outline-success ml-1"
                    >PDF</button>
                </div>
            </div >
        );
    });


    return (
        <div className="container mt-3 mb-5" >

            <div classNamme="col">

                <div className="row mt-3 form-group">
                    <h1>Reportes: </h1>
                    <div className="input-group mt-3 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name='periodo'
                            placeholder="Buscar por peridodo, ejem: 2020-2021"
                            value={periodo}
                            onChange={handleInputChange}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={update}
                            >
                                Buscar
                            </button>
                        </div>
                    </div>

                </div>



                <div className="row justify-content-center">

                        {renderCursos}
                </div>


            </div>


        </div>
    )
}

export default Reporte;