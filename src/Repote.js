import React, { useState, useEffect } from 'react'


import getCursosByCode from './getCursosByCode';
import { postData, URL } from './api';


function Reporte(props) {

    const initialState = {
        cursos: [],
        user: getUser(),
        error: false,
        success: false,
        message: '',

    };


    const [state, setstate] = useState(initialState)



    useEffect(() => {

        //cargar lista de cursos creados por el usuario
        console.log('Cargar todos los cursos creados por el usuario');
        let username = getUser().username
        getCursosByCode([{
            key: 'codigo_titular',
            value: username
        }]).then(data => setstate(
            state => {
                return ({
                    ...state,
                    error: false,
                    success: true,
                    message: `${data.length} Curso${data.length < 2 ? '' : 's'} obtenido${data.length < 2 ? '' : 's'} de  BD.`,
                    cursos: data
                })
            })).catch((err) => setstate(state => {
                return ({
                    ...state,
                    cursos: [],
                    message: 'Revisar el internet!',
                    error: true,
                    success: false,
                })
            }))

    }, [])


    const hadledUpdate = (reporte) => {

        console.log('UPDATE REPORTES')

        postData('/reportes/create', reporte)
            .then((res) => { return res.json() })
            .then((data) => {

                console.log('Reportes', data);
                if (data.create) {
                    setstate({
                        ...state,
                        message: `Los reportes de ${reporte.curso} fueron actualizados!`,
                        error: false,
                        success: true,
                    })
                    window.alert('Actualizacion completada!')
                } else {
                    setstate({
                        ...state,
                        message: `No existen boletines para ${reporte.curso}!`,
                        error: true,
                        success: false,
                    })
                }

            })
    }


    const hadledPDF = (reporte) => {

        const urlComplete = `${URL}${'/reporte/pdf'}/${reporte._id}`;
        console.log('GET PDF', urlComplete)

        window.open(urlComplete)

    }


    const renderCursos = state.cursos.map((curso) => {


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

            <h1>Reportes:
                
            </h1>

          
            <div className="row">

            </div>

        </div>
    )
}

export default Reporte;